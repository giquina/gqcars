export const authConfig = {
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: '15m', // Access token expires in 15 minutes
    refreshExpiresIn: '7d', // Refresh token expires in 7 days
  },
  
  // Password Configuration
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    bcryptRounds: 12,
  },
  
  // Rate Limiting
  rateLimit: {
    maxAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes in milliseconds
    windowMs: 15 * 60 * 1000, // 15 minute window
  },
  
  // Session Configuration
  session: {
    maxSessions: 5, // Maximum concurrent sessions per user
    inactivityTimeout: 30 * 60 * 1000, // 30 minutes
  },
  
  // 2FA Configuration
  twoFactor: {
    issuer: 'GQ Cars LTD',
    window: 2, // Allow 2 time steps before and after current time
    backupCodeLength: 8,
    backupCodeCount: 10,
  },
  
  // Email Configuration
  email: {
    verificationExpiry: 24 * 60 * 60 * 1000, // 24 hours
    resetPasswordExpiry: 1 * 60 * 60 * 1000, // 1 hour
  },
  
  // SMS Configuration (Twilio)
  sms: {
    verificationExpiry: 10 * 60 * 1000, // 10 minutes
    resendDelay: 1 * 60 * 1000, // 1 minute between resends
  },
  
  // Security Headers
  security: {
    enableHelmet: true,
    enableCors: true,
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  }
}