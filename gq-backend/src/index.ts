import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { config } from './config';
import { database } from './database/connection';
import { redis } from './database/redis';
import { migrator } from './database/migrate';
import { logger, requestLogger } from './utils/logger';
import { securityHeaders, checkRateLimit } from './middleware/auth';

// Import route handlers
import authRoutes from './routes/auth';
// import userRoutes from './routes/users';
// import bookingRoutes from './routes/bookings';
// import quoteRoutes from './routes/quotes';
// import paymentRoutes from './routes/payments';
// import messageRoutes from './routes/messages';
// import emergencyRoutes from './routes/emergency';

class GQSecurityServer {
  private app: Application;
  private server: any;
  private io: SocketServer;
  private isShuttingDown: boolean = false;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new SocketServer(this.server, {
      cors: {
        origin: config.client.allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true
      },
      transports: ['websocket', 'polling']
    });

    this.setupMiddleware();
    this.setupRoutes();
    this.setupWebSocket();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'"],
          fontSrc: ["'self'"],
          objectSrc: ["'none'"],
          mediaSrc: ["'self'"],
          frameSrc: ["'none'"],
        },
      },
      crossOriginEmbedderPolicy: false
    }));

    // Custom security headers
    this.app.use(securityHeaders);

    // CORS configuration
    this.app.use(cors({
      origin: config.client.allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset']
    }));

    // Global rate limiting
    const globalRateLimit = rateLimit({
      windowMs: config.security.rateLimitWindowMs,
      max: config.security.rateLimitMaxRequests,
      message: {
        success: false,
        message: 'Too many requests, please try again later',
        error: 'Rate limit exceeded',
        timestamp: new Date().toISOString()
      },
      standardHeaders: true,
      legacyHeaders: false,
      skip: (req) => {
        // Skip rate limiting for health checks
        return req.path === '/health' || req.path === '/api/health';
      }
    });
    this.app.use(globalRateLimit);

    // Body parsing middleware
    this.app.use(express.json({ 
      limit: '10mb',
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      }
    }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging middleware
    this.app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const responseTime = Date.now() - start;
        requestLogger(req, res, responseTime);
      });
      next();
    });

    // Trust proxy (for deployment behind load balancers)
    this.app.set('trust proxy', 1);
  }

  private setupRoutes(): void {
    // Health check endpoint
    this.app.get('/health', this.healthCheck.bind(this));
    this.app.get('/api/health', this.healthCheck.bind(this));

    // API version prefix
    const apiRouter = express.Router();
    this.app.use(`/api/${config.API_VERSION}`, apiRouter);

    // Authentication routes
    apiRouter.use('/auth', authRoutes);

    // Protected routes (to be implemented)
    // apiRouter.use('/users', userRoutes);
    // apiRouter.use('/bookings', bookingRoutes);
    // apiRouter.use('/quotes', quoteRoutes);
    // apiRouter.use('/payments', paymentRoutes);
    // apiRouter.use('/messages', messageRoutes);
    // apiRouter.use('/emergency', emergencyRoutes);

    // API welcome endpoint
    apiRouter.get('/', (req: Request, res: Response) => {
      res.json({
        success: true,
        message: 'GQ Security Services API',
        version: config.API_VERSION,
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        endpoints: {
          health: '/health',
          documentation: '/api/v1',
          authentication: '/api/v1/auth',
          // bookings: '/api/v1/bookings',
          // quotes: '/api/v1/quotes',
          // payments: '/api/v1/payments'
        }
      });
    });

    // 404 handler for API routes
    apiRouter.use('*', (req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: 'API endpoint not found',
        error: `Route ${req.method} ${req.originalUrl} not found`,
        timestamp: new Date().toISOString()
      });
    });

    // Root redirect
    this.app.get('/', (req: Request, res: Response) => {
      res.redirect(`/api/${config.API_VERSION}`);
    });
  }

  private setupWebSocket(): void {
    // WebSocket authentication middleware
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
        
        if (!token) {
          return next(new Error('Authentication error'));
        }

        // Verify token and attach user info
        // const user = await authService.verifyAccessToken(token);
        // socket.userId = user.userId;
        // socket.userRole = user.role;
        
        next();
      } catch (error) {
        logger.error('WebSocket authentication error:', error);
        next(new Error('Authentication error'));
      }
    });

    // WebSocket connection handling
    this.io.on('connection', (socket) => {
      logger.info('WebSocket client connected', {
        socketId: socket.id,
        userId: socket.data.userId || 'anonymous'
      });

      // Join user-specific room
      if (socket.data.userId) {
        socket.join(`user:${socket.data.userId}`);
      }

      // Handle real-time events
      socket.on('join_booking', (bookingId: string) => {
        socket.join(`booking:${bookingId}`);
        logger.debug('User joined booking room', {
          userId: socket.data.userId,
          bookingId,
          socketId: socket.id
        });
      });

      socket.on('leave_booking', (bookingId: string) => {
        socket.leave(`booking:${bookingId}`);
      });

      socket.on('emergency_alert', async (data) => {
        // Handle emergency alerts
        logger.warn('Emergency alert received', {
          userId: socket.data.userId,
          data
        });
        
        // Broadcast to admin users
        this.io.to('role:admin').emit('emergency_alert', {
          userId: socket.data.userId,
          ...data,
          timestamp: new Date().toISOString()
        });
      });

      socket.on('disconnect', (reason) => {
        logger.info('WebSocket client disconnected', {
          socketId: socket.id,
          userId: socket.data.userId || 'anonymous',
          reason
        });
      });

      socket.on('error', (error) => {
        logger.error('WebSocket error:', {
          socketId: socket.id,
          userId: socket.data.userId || 'anonymous',
          error: error.message
        });
      });
    });
  }

  private setupErrorHandling(): void {
    // Global error handler
    this.app.use((error: any, req: Request, res: Response, next: any) => {
      logger.error('Global error handler:', {
        error: error.message,
        stack: error.stack,
        url: req.url,
        method: req.method,
        ip: req.ip
      });

      // Don't leak error details in production
      const isDevelopment = config.NODE_ENV === 'development';

      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Internal server error',
        error: isDevelopment ? error.stack : 'Internal server error',
        timestamp: new Date().toISOString()
      });
    });

    // Unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('Unhandled Promise Rejection:', {
        reason,
        promise
      });
    });

    // Uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('Uncaught Exception:', error);
      this.gracefulShutdown('UNCAUGHT_EXCEPTION');
    });

    // Graceful shutdown signals
    process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => this.gracefulShutdown('SIGINT'));
  }

  private async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      const checks = {
        server: 'healthy',
        database: await database.checkHealth() ? 'healthy' : 'unhealthy',
        redis: redis.isHealthy() ? 'healthy' : 'unhealthy',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
      };

      const isHealthy = checks.database === 'healthy' && checks.redis === 'healthy';

      res.status(isHealthy ? 200 : 503).json({
        success: isHealthy,
        message: isHealthy ? 'Service healthy' : 'Service degraded',
        data: checks
      });
    } catch (error) {
      logger.error('Health check failed:', error);
      res.status(503).json({
        success: false,
        message: 'Health check failed',
        error: 'Unable to perform health checks',
        timestamp: new Date().toISOString()
      });
    }
  }

  private async gracefulShutdown(signal: string): Promise<void> {
    if (this.isShuttingDown) {
      return;
    }

    this.isShuttingDown = true;
    logger.info(`Received ${signal}. Starting graceful shutdown...`);

    // Set a timeout for forced shutdown
    const shutdownTimeout = setTimeout(() => {
      logger.error('Forced shutdown due to timeout');
      process.exit(1);
    }, 30000); // 30 seconds

    try {
      // Stop accepting new connections
      this.server.close(async () => {
        logger.info('HTTP server closed');

        // Close WebSocket connections
        this.io.close(() => {
          logger.info('WebSocket server closed');
        });

        // Close database connections
        await database.disconnect();
        logger.info('Database connections closed');

        // Close Redis connections
        await redis.disconnect();
        logger.info('Redis connections closed');

        clearTimeout(shutdownTimeout);
        logger.info('Graceful shutdown completed');
        process.exit(0);
      });
    } catch (error) {
      logger.error('Error during graceful shutdown:', error);
      clearTimeout(shutdownTimeout);
      process.exit(1);
    }
  }

  public async start(): Promise<void> {
    try {
      // Initialize database connections
      logger.info('Connecting to database...');
      await database.connect();

      // Initialize Redis connections
      logger.info('Connecting to Redis...');
      await redis.connect();

      // Run database migrations
      logger.info('Running database migrations...');
      await migrator.runMigrations();

      // Start HTTP server
      this.server.listen(config.PORT, () => {
        logger.info(`🚀 GQ Security Services API started`, {
          port: config.PORT,
          environment: config.NODE_ENV,
          apiVersion: config.API_VERSION,
          nodeVersion: process.version
        });

        logger.info('🔗 Available endpoints:', {
          health: `http://localhost:${config.PORT}/health`,
          api: `http://localhost:${config.PORT}/api/${config.API_VERSION}`,
          auth: `http://localhost:${config.PORT}/api/${config.API_VERSION}/auth`,
          websocket: `ws://localhost:${config.PORT}`
        });
      });

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  public getApp(): Application {
    return this.app;
  }

  public getServer(): any {
    return this.server;
  }

  public getIO(): SocketServer {
    return this.io;
  }
}

// Create and start server
const server = new GQSecurityServer();

if (require.main === module) {
  server.start();
}

export default server;
export { GQSecurityServer };