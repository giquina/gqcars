import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000'),
  API_VERSION: process.env.API_VERSION || 'v1',

  // Database Configuration
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    name: process.env.DB_NAME || 'gq_security',
    user: process.env.DB_USER || 'gq_admin',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production',
  },

  // Redis Configuration
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
    expire: process.env.JWT_EXPIRE || '24h',
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '7d',
  },

  // Email Configuration
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASS || '',
    from: process.env.FROM_EMAIL || 'admin@gqsecurity.co.uk',
    fromName: process.env.FROM_NAME || 'GQ Security Services',
  },

  // Payment Configuration
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },

  // Security Configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },

  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
    uploadDir: process.env.UPLOAD_DIR || 'uploads',
  },

  // Client Configuration
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  },

  // Emergency Services Configuration
  emergency: {
    phone: process.env.EMERGENCY_PHONE || '+44123456789',
    email: process.env.EMERGENCY_EMAIL || 'emergency@gqsecurity.co.uk',
  },

  // Business Configuration
  business: {
    name: process.env.COMPANY_NAME || 'GQ Security Services',
    phone: process.env.COMPANY_PHONE || '+44123456789',
    email: process.env.COMPANY_EMAIL || 'info@gqsecurity.co.uk',
    address: process.env.COMPANY_ADDRESS || 'London, UK',
  },
};