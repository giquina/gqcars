import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';

import { authService } from '../utils/auth';
import { database } from '../database/connection';
import { logger, securityLogger } from '../utils/logger';
import { AuthenticatedRequest, User, UserRole, ApiResponse, AuthTokens } from '../types';

export class AuthController {

  // User Registration
  async register(req: Request, res: Response): Promise<void> {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data',
          validationErrors: errors.array(),
          timestamp: new Date().toISOString()
        });
        return;
      }

      const { 
        email, 
        password, 
        firstName, 
        lastName, 
        phone, 
        role = UserRole.CLIENT,
        companyName,
        industry 
      } = req.body;

      // Check if user already exists
      const existingUser = await database.query(
        'SELECT id FROM users WHERE email = $1',
        [email.toLowerCase()]
      );

      if (existingUser.rows.length > 0) {
        res.status(409).json({
          success: false,
          message: 'Registration failed',
          error: 'Email address already registered',
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Hash password
      const hashedPassword = await authService.hashPassword(password);

      // Start database transaction
      await database.transaction(async (client) => {
        // Create user
        const userResult = await client.query(
          `INSERT INTO users (email, password_hash, first_name, last_name, phone, role) 
           VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
          [email.toLowerCase(), hashedPassword, firstName, lastName, phone, role]
        );

        const user = userResult.rows[0] as User;

        // Create client profile if role is client
        if (role === UserRole.CLIENT) {
          await client.query(
            `INSERT INTO clients (user_id, company_name, industry, vip_level, preferences, emergency_contact, billing_address) 
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              user.id,
              companyName || null,
              industry || null,
              'standard',
              JSON.stringify({
                communicationMethod: 'email',
                languagePreference: 'en',
                securityLevel: 'standard'
              }),
              JSON.stringify({}),
              JSON.stringify({})
            ]
          );
        }

        // Generate verification token
        const verificationToken = await authService.generateVerificationToken(user.id);

        logger.info('User registered successfully', {
          userId: user.id,
          email: user.email,
          role: user.role,
          ip: req.ip
        });

        res.status(201).json({
          success: true,
          message: 'Registration successful',
          data: {
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isVerified: user.isVerified,
            verificationToken: verificationToken // In production, send this via email
          },
          timestamp: new Date().toISOString()
        });
      });

    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // User Login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data',
          validationErrors: errors.array(),
          timestamp: new Date().toISOString()
        });
        return;
      }

      const { email, password } = req.body;
      const ipAddress = req.ip;

      // Authenticate user
      const { user, tokens } = await authService.authenticateUser(email, password, ipAddress);

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isVerified: user.isVerified,
            lastLogin: user.lastLogin
          },
          tokens
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Login error:', error);
      
      let statusCode = 500;
      let message = 'Login failed';
      
      if (error instanceof Error) {
        if (error.message.includes('Invalid credentials')) {
          statusCode = 401;
          message = 'Invalid email or password';
        } else if (error.message.includes('not verified')) {
          statusCode = 403;
          message = 'Please verify your account before logging in';
        }
      }

      res.status(statusCode).json({
        success: false,
        message,
        error: 'Authentication failed',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Refresh Token
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          message: 'Refresh token required',
          error: 'No refresh token provided',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const tokens = await authService.refreshTokens(refreshToken);

      res.json({
        success: true,
        message: 'Tokens refreshed successfully',
        data: { tokens },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Token refresh error:', error);
      res.status(401).json({
        success: false,
        message: 'Token refresh failed',
        error: 'Invalid or expired refresh token',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Logout
  async logout(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'User not authenticated',
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Revoke refresh token
      await authService.revokeRefreshToken(userId, refreshToken);

      logger.info('User logged out successfully', {
        userId,
        ip: req.ip
      });

      res.json({
        success: true,
        message: 'Logout successful',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        success: false,
        message: 'Logout failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Verify Account
  async verifyAccount(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;

      if (!token) {
        res.status(400).json({
          success: false,
          message: 'Verification token required',
          error: 'No verification token provided',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const isVerified = await authService.verifyAccount(token);

      if (!isVerified) {
        res.status(400).json({
          success: false,
          message: 'Verification failed',
          error: 'Invalid or expired verification token',
          timestamp: new Date().toISOString()
        });
        return;
      }

      res.json({
        success: true,
        message: 'Account verified successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Account verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Verification failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Request Password Reset
  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data',
          validationErrors: errors.array(),
          timestamp: new Date().toISOString()
        });
        return;
      }

      const { email } = req.body;

      const resetToken = await authService.generatePasswordResetToken(email);

      // Always return success to prevent email enumeration
      res.json({
        success: true,
        message: 'If the email exists, a password reset link has been sent',
        data: resetToken ? { resetToken } : undefined, // In production, send via email only
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Password reset request error:', error);
      res.status(500).json({
        success: false,
        message: 'Password reset request failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Reset Password
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data',
          validationErrors: errors.array(),
          timestamp: new Date().toISOString()
        });
        return;
      }

      const { token, newPassword } = req.body;

      const isReset = await authService.resetPassword(token, newPassword);

      if (!isReset) {
        res.status(400).json({
          success: false,
          message: 'Password reset failed',
          error: 'Invalid or expired reset token',
          timestamp: new Date().toISOString()
        });
        return;
      }

      res.json({
        success: true,
        message: 'Password reset successful',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Password reset error:', error);
      res.status(500).json({
        success: false,
        message: 'Password reset failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Get Current User Profile
  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const user = req.user;

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'User not authenticated',
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Get additional profile data based on role
      let profileData: any = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      };

      if (user.role === UserRole.CLIENT) {
        const clientResult = await database.query(
          'SELECT * FROM clients WHERE user_id = $1',
          [user.id]
        );
        
        if (clientResult.rows.length > 0) {
          profileData.clientProfile = clientResult.rows[0];
        }
      } else if (user.role === UserRole.AGENT) {
        const agentResult = await database.query(
          'SELECT * FROM agents WHERE user_id = $1',
          [user.id]
        );
        
        if (agentResult.rows.length > 0) {
          profileData.agentProfile = agentResult.rows[0];
        }
      }

      res.json({
        success: true,
        message: 'Profile retrieved successfully',
        data: profileData,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Update User Profile
  async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data',
          validationErrors: errors.array(),
          timestamp: new Date().toISOString()
        });
        return;
      }

      const user = req.user;
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'User not authenticated',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const { firstName, lastName, phone } = req.body;

      const result = await database.query(
        'UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE id = $4 RETURNING *',
        [firstName, lastName, phone, user.id]
      );

      const updatedUser = result.rows[0];

      logger.info('User profile updated', {
        userId: user.id,
        email: user.email,
        ip: req.ip
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          phone: updatedUser.phone,
          role: updatedUser.role
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Profile update failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Change Password
  async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          error: 'Invalid input data',
          validationErrors: errors.array(),
          timestamp: new Date().toISOString()
        });
        return;
      }

      const user = req.user;
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'User not authenticated',
          timestamp: new Date().toISOString()
        });
        return;
      }

      const { currentPassword, newPassword } = req.body;

      // Verify current password
      const isValidPassword = await authService.verifyPassword(currentPassword, user.password);
      if (!isValidPassword) {
        res.status(400).json({
          success: false,
          message: 'Password change failed',
          error: 'Current password is incorrect',
          timestamp: new Date().toISOString()
        });
        return;
      }

      // Hash new password
      const hashedNewPassword = await authService.hashPassword(newPassword);

      // Update password
      await database.query(
        'UPDATE users SET password_hash = $1 WHERE id = $2',
        [hashedNewPassword, user.id]
      );

      // Revoke all refresh tokens for security
      await authService.revokeRefreshToken(user.id);

      logger.info('User password changed', {
        userId: user.id,
        email: user.email,
        ip: req.ip
      });

      res.json({
        success: true,
        message: 'Password changed successfully',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Change password error:', error);
      res.status(500).json({
        success: false,
        message: 'Password change failed',
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    }
  }
}

export const authController = new AuthController();