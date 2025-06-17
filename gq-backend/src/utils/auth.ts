import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';
import { database } from '../database/connection';
import { redis } from '../database/redis';
import { logger, securityLogger } from './logger';
import { User, JWTPayload, AuthTokens } from '../types';

export class AuthService {
  
  // Password Management
  async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = config.security.bcryptRounds;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      logger.error('Password hashing failed:', error);
      throw new Error('Password hashing failed');
    }
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      logger.error('Password verification failed:', error);
      throw new Error('Password verification failed');
    }
  }

  // JWT Token Management
  generateAccessToken(user: User): string {
    try {
      const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expire,
        issuer: 'gq-security-api',
        audience: 'gq-security-client'
      } as jwt.SignOptions);
    } catch (error) {
      logger.error('Access token generation failed:', error);
      throw new Error('Token generation failed');
    }
  }

  generateRefreshToken(userId: string): string {
    try {
      const payload = {
        userId,
        tokenId: uuidv4(),
        type: 'refresh'
      };

      return jwt.sign(payload, config.jwt.refreshSecret, {
        expiresIn: config.jwt.refreshExpire,
        issuer: 'gq-security-api'
      } as jwt.SignOptions);
    } catch (error) {
      logger.error('Refresh token generation failed:', error);
      throw new Error('Refresh token generation failed');
    }
  }

  async generateTokenPair(user: User): Promise<AuthTokens> {
    try {
      const accessToken = this.generateAccessToken(user);
      const refreshToken = this.generateRefreshToken(user.id);

      // Store refresh token hash in database
      await this.storeRefreshToken(user.id, refreshToken);

      // Cache user session
      await this.cacheUserSession(user.id, {
        userId: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive
      });

      return { accessToken, refreshToken };
    } catch (error) {
      logger.error('Token pair generation failed:', error);
      throw new Error('Authentication failed');
    }
  }

  async verifyAccessToken(token: string): Promise<JWTPayload> {
    try {
      const decoded = jwt.verify(token, config.jwt.secret, {
        issuer: 'gq-security-api',
        audience: 'gq-security-client'
      }) as JWTPayload;

      // Check if user session is still valid
      const cachedSession = await this.getUserSession(decoded.userId);
      if (!cachedSession || !cachedSession.isActive) {
        throw new Error('Session expired or user deactivated');
      }

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid token');
      }
      throw error;
    }
  }

  async verifyRefreshToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, config.jwt.refreshSecret) as any;
      
      // Check if refresh token exists and is not revoked
      const tokenHash = await bcrypt.hash(token, 1);
      const result = await database.query(
        'SELECT user_id FROM refresh_tokens WHERE user_id = $1 AND is_revoked = false AND expires_at > NOW()',
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Refresh token not found or expired');
      }

      return decoded.userId;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Refresh token expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error('Invalid refresh token');
      }
      throw error;
    }
  }

  // Refresh Token Storage
  private async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    try {
      const tokenHash = await bcrypt.hash(refreshToken, 1);
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

      // Clean up old refresh tokens for this user
      await database.query(
        'UPDATE refresh_tokens SET is_revoked = true WHERE user_id = $1',
        [userId]
      );

      // Store new refresh token
      await database.query(
        'INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, $3)',
        [userId, tokenHash, expiresAt]
      );
    } catch (error) {
      logger.error('Failed to store refresh token:', error);
      throw error;
    }
  }

  async revokeRefreshToken(userId: string, token?: string): Promise<void> {
    try {
      if (token) {
        // Revoke specific token
        const tokenHash = await bcrypt.hash(token, 1);
        await database.query(
          'UPDATE refresh_tokens SET is_revoked = true WHERE user_id = $1 AND token_hash = $2',
          [userId, tokenHash]
        );
      } else {
        // Revoke all tokens for user
        await database.query(
          'UPDATE refresh_tokens SET is_revoked = true WHERE user_id = $1',
          [userId]
        );
      }

      // Clear user session cache
      await this.clearUserSession(userId);
    } catch (error) {
      logger.error('Failed to revoke refresh token:', error);
      throw error;
    }
  }

  // Session Management
  private async cacheUserSession(userId: string, sessionData: any): Promise<void> {
    try {
      await redis.setSession(`user:${userId}`, sessionData, 24 * 60 * 60); // 24 hours
    } catch (error) {
      logger.error('Failed to cache user session:', error);
      // Don't throw - session caching is not critical
    }
  }

  private async getUserSession(userId: string): Promise<any> {
    try {
      return await redis.getSession(`user:${userId}`);
    } catch (error) {
      logger.error('Failed to get user session:', error);
      return null;
    }
  }

  private async clearUserSession(userId: string): Promise<void> {
    try {
      await redis.deleteSession(`user:${userId}`);
    } catch (error) {
      logger.error('Failed to clear user session:', error);
      // Don't throw - session clearing is not critical
    }
  }

  // User Authentication
  async authenticateUser(email: string, password: string, ipAddress?: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      // Get user from database
      const result = await database.query(
        'SELECT * FROM users WHERE email = $1 AND is_active = true',
        [email.toLowerCase()]
      );

      if (result.rows.length === 0) {
        securityLogger.authFailure(email, ipAddress || 'unknown', 'User not found');
        throw new Error('Invalid credentials');
      }

      const user = result.rows[0] as User;

      // Verify password
      const isValidPassword = await this.verifyPassword(password, user.password);
      if (!isValidPassword) {
        securityLogger.authFailure(email, ipAddress || 'unknown', 'Invalid password');
        throw new Error('Invalid credentials');
      }

      // Check if account is verified
      if (!user.isVerified) {
        throw new Error('Account not verified');
      }

      // Update last login
      await database.query(
        'UPDATE users SET last_login = NOW() WHERE id = $1',
        [user.id]
      );

      // Generate tokens
      const tokens = await this.generateTokenPair(user);

      logger.info('User authenticated successfully', {
        userId: user.id,
        email: user.email,
        ipAddress
      });

      return { user, tokens };
    } catch (error) {
      logger.error('User authentication failed:', error);
      throw error;
    }
  }

  // Token Refresh
  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const userId = await this.verifyRefreshToken(refreshToken);
      
      // Get user data
      const result = await database.query(
        'SELECT * FROM users WHERE id = $1 AND is_active = true',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('User not found or inactive');
      }

      const user = result.rows[0] as User;

      // Generate new token pair
      const tokens = await this.generateTokenPair(user);

      logger.info('Tokens refreshed successfully', {
        userId: user.id,
        email: user.email
      });

      return tokens;
    } catch (error) {
      logger.error('Token refresh failed:', error);
      throw error;
    }
  }

  // Security Utilities
  generateSecureToken(length: number = 32): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  generateOTP(length: number = 6): string {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return otp;
  }

  // Account Verification
  async generateVerificationToken(userId: string): Promise<string> {
    try {
      const token = this.generateSecureToken(64);
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await redis.set(`verification:${token}`, userId, 24 * 60 * 60);

      return token;
    } catch (error) {
      logger.error('Failed to generate verification token:', error);
      throw error;
    }
  }

  async verifyAccount(token: string): Promise<boolean> {
    try {
      const userId = await redis.get(`verification:${token}`);
      
      if (!userId) {
        return false;
      }

      // Update user verification status
      const result = await database.query(
        'UPDATE users SET is_verified = true WHERE id = $1',
        [userId]
      );

      if (result.rowCount === 0) {
        return false;
      }

      // Delete verification token
      await redis.del(`verification:${token}`);

      logger.info('Account verified successfully', { userId });
      return true;
    } catch (error) {
      logger.error('Account verification failed:', error);
      return false;
    }
  }

  // Password Reset
  async generatePasswordResetToken(email: string): Promise<string | null> {
    try {
      const result = await database.query(
        'SELECT id FROM users WHERE email = $1 AND is_active = true',
        [email.toLowerCase()]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const userId = result.rows[0].id;
      const token = this.generateSecureToken(64);
      
      await redis.set(`password_reset:${token}`, userId, 60 * 60); // 1 hour

      return token;
    } catch (error) {
      logger.error('Failed to generate password reset token:', error);
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const userId = await redis.get(`password_reset:${token}`);
      
      if (!userId) {
        return false;
      }

      const hashedPassword = await this.hashPassword(newPassword);
      
      const result = await database.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [hashedPassword, userId]
      );

      if (result.rowCount === 0) {
        return false;
      }

      // Delete reset token
      await redis.del(`password_reset:${token}`);

      // Revoke all refresh tokens for security
      await this.revokeRefreshToken(userId);

      logger.info('Password reset successfully', { userId });
      return true;
    } catch (error) {
      logger.error('Password reset failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();