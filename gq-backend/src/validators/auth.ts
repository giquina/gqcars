import { body, param } from 'express-validator';
import { UserRole } from '../types';

// Registration validation
export const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('phone')
    .optional()
    .isMobilePhone('en-GB')
    .withMessage('Please provide a valid UK phone number'),
  
  body('role')
    .optional()
    .isIn(Object.values(UserRole))
    .withMessage('Invalid user role'),
  
  body('companyName')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Company name must not exceed 100 characters'),
  
  body('industry')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Industry must not exceed 50 characters')
];

// Login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Password reset request validation
export const validatePasswordResetRequest = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

// Password reset validation
export const validatePasswordReset = [
  body('token')
    .notEmpty()
    .withMessage('Reset token is required')
    .isLength({ min: 32, max: 128 })
    .withMessage('Invalid reset token format'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
];

// Change password validation
export const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error('New password must be different from current password');
      }
      return true;
    })
];

// Profile update validation
export const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('phone')
    .optional()
    .isMobilePhone('en-GB')
    .withMessage('Please provide a valid UK phone number')
];

// Verification token validation
export const validateVerificationToken = [
  param('token')
    .notEmpty()
    .withMessage('Verification token is required')
    .isLength({ min: 32, max: 128 })
    .withMessage('Invalid verification token format')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Verification token contains invalid characters')
];

// Refresh token validation
export const validateRefreshToken = [
  body('refreshToken')
    .notEmpty()
    .withMessage('Refresh token is required')
    .isJWT()
    .withMessage('Invalid refresh token format')
];

// Additional security validations
export const validateSecureInput = [
  // Prevent XSS and injection attacks
  body('*')
    .custom((value) => {
      if (typeof value === 'string') {
        // Check for potential XSS patterns
        const xssPatterns = [
          /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
          /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
          /javascript:/gi,
          /vbscript:/gi,
          /onload\s*=/gi,
          /onerror\s*=/gi
        ];
        
        for (const pattern of xssPatterns) {
          if (pattern.test(value)) {
            throw new Error('Invalid input detected');
          }
        }
        
        // Check for SQL injection patterns
        const sqlPatterns = [
          /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
          /(--|#|\/\*|\*\/)/g,
          /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi
        ];
        
        for (const pattern of sqlPatterns) {
          if (pattern.test(value)) {
            throw new Error('Invalid input detected');
          }
        }
      }
      return true;
    })
];

// IP address validation (for whitelisting)
export const validateIPAddress = [
  body('ipAddress')
    .optional()
    .isIP()
    .withMessage('Invalid IP address format')
];

// Rate limiting validation
export const validateRateLimit = [
  body('windowMinutes')
    .optional()
    .isInt({ min: 1, max: 1440 })
    .withMessage('Window must be between 1 and 1440 minutes'),
  
  body('maxRequests')
    .optional()
    .isInt({ min: 1, max: 10000 })
    .withMessage('Max requests must be between 1 and 10000')
];

// File upload validation (for profile pictures, documents)
export const validateFileUpload = [
  body('fileType')
    .optional()
    .isIn(['image', 'document', 'video'])
    .withMessage('Invalid file type'),
  
  body('mimeType')
    .optional()
    .custom((value) => {
      const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ];
      
      if (!allowedMimeTypes.includes(value)) {
        throw new Error('File type not allowed');
      }
      return true;
    })
];

// Emergency contact validation
export const validateEmergencyContact = [
  body('emergencyContact.name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Emergency contact name must be between 2 and 100 characters'),
  
  body('emergencyContact.relationship')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Relationship must be between 2 and 50 characters'),
  
  body('emergencyContact.phone')
    .optional()
    .isMobilePhone('en-GB')
    .withMessage('Please provide a valid UK phone number for emergency contact'),
  
  body('emergencyContact.email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email for emergency contact')
];

// Company/business validation
export const validateBusinessInfo = [
  body('companyName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z0-9\s&.,'-]+$/)
    .withMessage('Company name contains invalid characters'),
  
  body('industry')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Industry must be between 2 and 50 characters')
    .isIn([
      'finance',
      'technology',
      'healthcare',
      'entertainment',
      'real_estate',
      'retail',
      'manufacturing',
      'consulting',
      'government',
      'non_profit',
      'other'
    ])
    .withMessage('Invalid industry selection'),
  
  body('businessAddress')
    .optional()
    .isObject()
    .withMessage('Business address must be an object'),
  
  body('businessAddress.street')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Street address must be between 5 and 200 characters'),
  
  body('businessAddress.city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  
  body('businessAddress.postcode')
    .optional()
    .trim()
    .matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i)
    .withMessage('Please provide a valid UK postcode'),
  
  body('businessAddress.country')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country must be between 2 and 50 characters')
];