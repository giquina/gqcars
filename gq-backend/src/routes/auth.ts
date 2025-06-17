import { Router } from 'express';
import { authController } from '../controllers/auth';
import { 
  authenticate, 
  optionalAuth, 
  requireVerified, 
  checkRateLimit,
  trackActivity,
  securityHeaders
} from '../middleware/auth';
import {
  validateRegistration,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validateChangePassword,
  validateProfileUpdate,
  validateVerificationToken,
  validateRefreshToken,
  validateSecureInput
} from '../validators/auth';

const router = Router();

// Apply security headers to all auth routes
router.use(securityHeaders);

// Apply activity tracking to authenticated routes
router.use(trackActivity);

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user account
 * @access  Public
 * @rateLimit 5 requests per 15 minutes
 */
router.post('/register', 
  checkRateLimit(15, 5), // Strict rate limiting for registration
  validateSecureInput,
  validateRegistration,
  authController.register
);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user and return JWT tokens
 * @access  Public
 * @rateLimit 10 requests per 15 minutes
 */
router.post('/login',
  checkRateLimit(15, 10), // Rate limiting for login attempts
  validateSecureInput,
  validateLogin,
  authController.login
);

/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token using refresh token
 * @access  Public
 * @rateLimit 20 requests per 15 minutes
 */
router.post('/refresh',
  checkRateLimit(15, 20),
  validateRefreshToken,
  authController.refreshToken
);

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user and revoke refresh token
 * @access  Private
 */
router.post('/logout',
  authenticate,
  authController.logout
);

/**
 * @route   GET /api/v1/auth/verify/:token
 * @desc    Verify user account with verification token
 * @access  Public
 * @rateLimit 10 requests per hour
 */
router.get('/verify/:token',
  checkRateLimit(60, 10), // 10 verification attempts per hour
  validateVerificationToken,
  authController.verifyAccount
);

/**
 * @route   POST /api/v1/auth/password-reset-request
 * @desc    Request password reset email
 * @access  Public
 * @rateLimit 3 requests per hour
 */
router.post('/password-reset-request',
  checkRateLimit(60, 3), // Very strict rate limiting for password reset requests
  validateSecureInput,
  validatePasswordResetRequest,
  authController.requestPasswordReset
);

/**
 * @route   POST /api/v1/auth/password-reset
 * @desc    Reset password with reset token
 * @access  Public
 * @rateLimit 5 requests per hour
 */
router.post('/password-reset',
  checkRateLimit(60, 5),
  validateSecureInput,
  validatePasswordReset,
  authController.resetPassword
);

/**
 * @route   GET /api/v1/auth/profile
 * @desc    Get current user profile
 * @access  Private (Verified users only)
 */
router.get('/profile',
  authenticate,
  requireVerified,
  authController.getProfile
);

/**
 * @route   PUT /api/v1/auth/profile
 * @desc    Update user profile
 * @access  Private (Verified users only)
 */
router.put('/profile',
  authenticate,
  requireVerified,
  validateSecureInput,
  validateProfileUpdate,
  authController.updateProfile
);

/**
 * @route   POST /api/v1/auth/change-password
 * @desc    Change user password
 * @access  Private (Verified users only)
 * @rateLimit 5 requests per hour
 */
router.post('/change-password',
  authenticate,
  requireVerified,
  checkRateLimit(60, 5), // Limit password changes
  validateSecureInput,
  validateChangePassword,
  authController.changePassword
);

/**
 * @route   GET /api/v1/auth/me
 * @desc    Get current user basic info (lightweight endpoint)
 * @access  Private (Optional auth for public features)
 */
router.get('/me',
  optionalAuth,
  (req, res) => {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      message: 'User info retrieved',
      data: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive
      },
      timestamp: new Date().toISOString()
    });
  }
);

/**
 * @route   POST /api/v1/auth/resend-verification
 * @desc    Resend account verification email
 * @access  Private (Unverified users only)
 * @rateLimit 3 requests per hour
 */
router.post('/resend-verification',
  authenticate,
  checkRateLimit(60, 3),
  async (req, res) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          timestamp: new Date().toISOString()
        });
      }

      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: 'Account is already verified',
          timestamp: new Date().toISOString()
        });
      }

      // Generate new verification token
      const { authService } = await import('../utils/auth');
      const verificationToken = await authService.generateVerificationToken(user.id);

      res.json({
        success: true,
        message: 'Verification email sent',
        data: { verificationToken }, // In production, send via email only
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to resend verification',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

/**
 * @route   POST /api/v1/auth/check-email
 * @desc    Check if email is available for registration
 * @access  Public
 * @rateLimit 20 requests per 15 minutes
 */
router.post('/check-email',
  checkRateLimit(15, 20),
  validateSecureInput,
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
          timestamp: new Date().toISOString()
        });
      }

      const { database } = await import('../database/connection');
      const result = await database.query(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      const isAvailable = result.rows.length === 0;

      res.json({
        success: true,
        message: 'Email availability checked',
        data: { 
          email: email.toLowerCase(),
          isAvailable 
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to check email availability',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

/**
 * @route   GET /api/v1/auth/session-status
 * @desc    Check if current session is valid
 * @access  Private
 */
router.get('/session-status',
  authenticate,
  (req, res) => {
    const user = req.user;
    
    res.json({
      success: true,
      message: 'Session is valid',
      data: {
        userId: user?.id,
        email: user?.email,
        role: user?.role,
        isVerified: user?.isVerified,
        sessionValid: true,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      },
      timestamp: new Date().toISOString()
    });
  }
);

/**
 * @route   DELETE /api/v1/auth/account
 * @desc    Delete user account (soft delete)
 * @access  Private (Verified users only)
 * @rateLimit 1 request per day
 */
router.delete('/account',
  authenticate,
  requireVerified,
  checkRateLimit(1440, 1), // 1 request per day
  async (req, res) => {
    try {
      const user = req.user;
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          timestamp: new Date().toISOString()
        });
      }

      const { database } = await import('../database/connection');
      const { authService } = await import('../utils/auth');
      const { logger } = await import('../utils/logger');

      // Soft delete user account
      await database.query(
        'UPDATE users SET is_active = false, email = $1 WHERE id = $2',
        [`deleted_${Date.now()}_${user.email}`, user.id]
      );

      // Revoke all refresh tokens
      await authService.revokeRefreshToken(user.id);

      logger.info('User account deleted', {
        userId: user.id,
        email: user.email,
        ip: req.ip
      });

      res.json({
        success: true,
        message: 'Account deleted successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete account',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }
);

export default router;