import winston from 'winston';
import { config } from '../config';

// Custom log format for production
const productionFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Custom log format for development
const developmentFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Create logger instance
export const logger = winston.createLogger({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  format: config.NODE_ENV === 'production' ? productionFormat : developmentFormat,
  defaultMeta: { 
    service: 'gq-security-api',
    environment: config.NODE_ENV 
  },
  transports: [
    // Console transport
    new winston.transports.Console({
      handleExceptions: true,
      handleRejections: true,
    }),
    
    // File transport for errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    }),
    
    // Combined log file
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true
    })
  ],
  exitOnError: false
});

// Create logs directory if it doesn't exist
import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Add request logging helper
export const requestLogger = (req: any, res: any, responseTime: number) => {
  logger.info('HTTP Request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    statusCode: res.statusCode,
    responseTime: `${responseTime}ms`
  });
};

// Security event logger
export const securityLogger = {
  authFailure: (email: string, ip: string, reason: string) => {
    logger.warn('Authentication failure', {
      email,
      ip,
      reason,
      type: 'auth_failure'
    });
  },
  
  suspiciousActivity: (userId: string, activity: string, metadata: any) => {
    logger.warn('Suspicious activity detected', {
      userId,
      activity,
      metadata,
      type: 'suspicious_activity'
    });
  },
  
  dataAccess: (userId: string, resource: string, action: string) => {
    logger.info('Data access', {
      userId,
      resource,
      action,
      type: 'data_access'
    });
  }
};

export default logger;