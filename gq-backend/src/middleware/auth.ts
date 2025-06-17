import { Request, Response, NextFunction } from 'express';
import { authService } from '../utils/auth';
import { database } from '../database/connection';
import { redis } from '../database/redis';
import { logger, securityLogger } from '../utils/logger';
import { AuthenticatedRequest, User, UserRole } from '../types';

// Extract token from Authorization header
const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return null;
  }

  // Support both "Bearer token" and "token" formats
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  return authHeader;
};

// Basic authentication middleware
export const authenticate = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractToken(req);
    
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'No token provided',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Verify JWT token
    const decoded = await authService.verifyAccessToken(token);
    
    // Get full user data from database
    const result = await database.query(
      'SELECT * FROM users WHERE id = $1 AND is_active = true',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        error: 'User not found or inactive',
        timestamp: new Date().toISOString()
      });
      return;
    }

    const user = result.rows[0] as User;

    // Attach user to request
    req.user = user;

    // Log successful authentication
    securityLogger.dataAccess(user.id, 'authentication', 'token_verified');

    next();
  } catch (error) {
    logger.error('Authentication middleware error:', error);
    
    let message = 'Authentication failed';
    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        message = 'Token expired';
      } else if (error.message.includes('invalid')) {
        message = 'Invalid token';
      }
    }

    res.status(401).json({
      success: false,
      message,
      error: 'Authentication failed',
      timestamp: new Date().toISOString()
    });
  }
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = extractToken(req);
    
    if (token) {
      try {
        const decoded = await authService.verifyAccessToken(token);
        
        const result = await database.query(
          'SELECT * FROM users WHERE id = $1 AND is_active = true',
          [decoded.userId]
        );

        if (result.rows.length > 0) {
          req.user = result.rows[0] as User;
        }
      } catch (error) {
        // Silently ignore authentication errors in optional auth
        logger.debug('Optional authentication failed:', error);
      }
    }

    next();
  } catch (error) {
    logger.error('Optional authentication middleware error:', error);
    next();
  }
};

// Role-based authorization middleware
export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'User not authenticated',
        timestamp: new Date().toISOString()
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      securityLogger.suspiciousActivity(
        req.user.id,
        'unauthorized_access_attempt',
        {
          userRole: req.user.role,
          requiredRoles: allowedRoles,
          endpoint: req.path,
          method: req.method
        }
      );

      res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
        error: 'Access denied',
        timestamp: new Date().toISOString()
      });
      return;
    }

    next();
  };
};

// Admin-only access
export const adminOnly = authorize(UserRole.ADMIN, UserRole.SUPER_ADMIN);

// Agent access (includes admin)
export const agentAccess = authorize(UserRole.AGENT, UserRole.ADMIN, UserRole.SUPER_ADMIN);

// Client access (all authenticated users)
export const clientAccess = authorize(UserRole.CLIENT, UserRole.AGENT, UserRole.ADMIN, UserRole.SUPER_ADMIN);

// Account verification middleware
export const requireVerified = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'Authentication required',
      error: 'User not authenticated',
      timestamp: new Date().toISOString()
    });
    return;
  }

  if (!req.user.isVerified) {
    res.status(403).json({
      success: false,
      message: 'Account verification required',
      error: 'Please verify your account before accessing this resource',
      timestamp: new Date().toISOString()
    });
    return;
  }

  next();
};

// Resource ownership middleware (for clients accessing their own resources)
export const requireOwnership = (resourceField: string = 'clientId') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
        error: 'User not authenticated',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Admin and super admin can access any resource
    if (req.user.role === UserRole.ADMIN || req.user.role === UserRole.SUPER_ADMIN) {
      next();
      return;
    }

    // For clients, check if they own the resource
    if (req.user.role === UserRole.CLIENT) {
      try {
        // Get client ID for this user
        const clientResult = await database.query(
          'SELECT id FROM clients WHERE user_id = $1',
          [req.user.id]
        );

        if (clientResult.rows.length === 0) {
          res.status(404).json({
            success: false,
            message: 'Client profile not found',
            error: 'No client profile associated with this user',
            timestamp: new Date().toISOString()
          });
          return;
        }

        const clientId = clientResult.rows[0].id;
        const resourceId = req.params.id || req.body[resourceField];

        // Check if resource belongs to client
        if (resourceField === 'clientId' && resourceId !== clientId) {
          securityLogger.suspiciousActivity(
            req.user.id,
            'unauthorized_resource_access',
            {
              requestedResource: resourceId,
              userClientId: clientId,
              endpoint: req.path
            }
          );

          res.status(403).json({
            success: false,
            message: 'Access denied',
            error: 'You can only access your own resources',
            timestamp: new Date().toISOString()
          });
          return;
        }
      } catch (error) {
        logger.error('Ownership verification error:', error);
        res.status(500).json({
          success: false,
          message: 'Authorization check failed',
          error: 'Internal server error',
          timestamp: new Date().toISOString()
        });
        return;
      }
    }

    next();
  };
};

// Rate limiting check middleware
export const checkRateLimit = (windowMinutes: number = 15, maxRequests: number = 100) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const identifier = req.user?.id || req.ip;
      const key = `rate_limit:${identifier}`;
      const windowSeconds = windowMinutes * 60;

      const current = await redis.incrementCounter(key, windowSeconds);

      if (current > maxRequests) {
        securityLogger.suspiciousActivity(
          req.user?.id || 'anonymous',
          'rate_limit_exceeded',
          {
            ip: req.ip,
            attempts: current,
            window: windowMinutes,
            endpoint: req.path
          }
        );

        res.status(429).json({
          success: false,
          message: 'Too many requests',
          error: `Rate limit exceeded. Try again in ${windowMinutes} minutes.`,
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Add rate limit headers
      res.set({
        'X-RateLimit-Limit': maxRequests.toString(),
        'X-RateLimit-Remaining': Math.max(0, maxRequests - current).toString(),
        'X-RateLimit-Reset': new Date(Date.now() + windowSeconds * 1000).toISOString()
      });

      next();
    } catch (error) {
      logger.error('Rate limit check error:', error);
      // Continue on rate limit errors to avoid blocking legitimate requests
      next();
    }
  };
};

// IP whitelist middleware (for admin endpoints)
export const ipWhitelist = (allowedIPs: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const clientIP = req.ip || req.connection.remoteAddress || 'unknown';
    
    if (!allowedIPs.includes(clientIP)) {
      securityLogger.suspiciousActivity(
        'unknown',
        'ip_not_whitelisted',
        {
          ip: clientIP,
          endpoint: req.path,
          userAgent: req.get('User-Agent')
        }
      );

      res.status(403).json({
        success: false,
        message: 'Access denied',
        error: 'IP address not authorized',
        timestamp: new Date().toISOString()
      });
      return;
    }

    next();
  };
};

// Security headers middleware
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  });
  
  next();
};

// Session activity tracking
export const trackActivity = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  if (req.user) {
    try {
      // Update last activity in Redis
      await redis.set(`activity:${req.user.id}`, Date.now().toString(), 30 * 60); // 30 minutes
      
      // Log significant actions
      if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        securityLogger.dataAccess(req.user.id, req.path, req.method.toLowerCase());
      }
    } catch (error) {
      logger.error('Activity tracking error:', error);
      // Don't block request on tracking errors
    }
  }
  
  next();
};