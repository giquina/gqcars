# GQ Security Services - Backend API

Enterprise-level backend API for GQ Security Services providing professional close protection, private hire, and VIP security services.

## 🚀 Features

### Core Features
- **🔐 Authentication & Authorization**: JWT-based auth with refresh tokens
- **👥 User Management**: Multi-role user system (Client, Agent, Admin, Super Admin)
- **📅 Booking System**: Comprehensive booking management for security services
- **💰 Payment Integration**: Stripe integration for secure payment processing
- **📱 Real-time Communication**: WebSocket support for live updates and messaging
- **🚨 Emergency Services**: Emergency alert system for critical situations
- **📊 Quote Management**: Automated quote generation and management
- **🔒 Security Features**: Rate limiting, encryption, audit logging, input validation

### Security Features
- **Enterprise-grade security** with bcrypt password hashing
- **Rate limiting** to prevent abuse and attacks
- **Input validation** and XSS/SQL injection prevention
- **Security headers** and CORS configuration
- **Audit logging** for all sensitive operations
- **Session management** with Redis caching
- **Role-based access control** (RBAC)

### Technical Features
- **PostgreSQL Database** with optimized indexes and relationships
- **Redis Caching** for session management and performance
- **WebSocket Support** for real-time features
- **Comprehensive Logging** with Winston
- **Type Safety** with TypeScript
- **Input Validation** with express-validator
- **API Documentation** with detailed endpoints

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 13+
- **Cache**: Redis 6+
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io WebSockets
- **Validation**: express-validator
- **Security**: Helmet, CORS, bcrypt
- **Logging**: Winston
- **Payments**: Stripe API
- **Email**: SMTP with Nodemailer

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js 18+** installed
- **PostgreSQL 13+** running
- **Redis 6+** running
- **Git** for version control

## ⚙️ Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd gq-backend

# Install dependencies
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb gq_security_dev

# Run migrations (creates tables and seeds data)
npm run db:migrate
```

### 4. Start Development Server

```bash
# Start in development mode
npm run dev

# Or start with debugging
npm run dev:debug
```

## 🗃️ Database Schema

### Core Tables
- **users**: Authentication and basic user info
- **clients**: Client-specific profiles and preferences
- **agents**: Security agent profiles and availability
- **bookings**: Service bookings and scheduling
- **quotes**: Price quotes and estimates
- **payments**: Payment records and transactions
- **messages**: Secure communications
- **emergency_alerts**: Emergency situation handling

### Security Tables
- **refresh_tokens**: JWT refresh token management
- **audit_logs**: Security audit trail
- **file_uploads**: Document and image management

## 🌐 API Endpoints

### Authentication (`/api/v1/auth`)
```
POST   /register              # Register new user
POST   /login                 # User login
POST   /refresh               # Refresh access token
POST   /logout                # User logout
GET    /verify/:token         # Verify account
POST   /password-reset-request # Request password reset
POST   /password-reset        # Reset password
GET    /profile               # Get user profile
PUT    /profile               # Update user profile
POST   /change-password       # Change password
GET    /me                    # Get current user info
POST   /resend-verification   # Resend verification email
POST   /check-email           # Check email availability
GET    /session-status        # Check session validity
DELETE /account               # Delete user account
```

### Bookings (`/api/v1/bookings`) *[To be implemented]*
```
GET    /                      # List user bookings
POST   /                      # Create new booking
GET    /:id                   # Get booking details
PUT    /:id                   # Update booking
DELETE /:id                   # Cancel booking
POST   /:id/confirm           # Confirm booking
GET    /:id/status            # Get booking status
```

### Quotes (`/api/v1/quotes`) *[To be implemented]*
```
GET    /                      # List quotes
POST   /                      # Request new quote
GET    /:id                   # Get quote details
PUT    /:id                   # Update quote
POST   /:id/accept            # Accept quote
POST   /:id/reject            # Reject quote
```

### Payments (`/api/v1/payments`) *[To be implemented]*
```
POST   /create-intent         # Create payment intent
POST   /confirm               # Confirm payment
GET    /history               # Payment history
POST   /refund                # Process refund
```

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:debug        # Start with debugging enabled

# Building
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with test data

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking
npm run test             # Run tests (when implemented)
```

## 🔒 Security Considerations

### Production Deployment
- Change all default passwords and secrets
- Use strong JWT secrets (256-bit minimum)
- Enable SSL/TLS encryption
- Configure proper CORS origins
- Set up database SSL connections
- Use Redis AUTH password
- Configure firewall rules
- Set up monitoring and alerting

### Environment Variables
- Never commit `.env` files to version control
- Use different secrets for each environment
- Rotate JWT secrets regularly
- Use strong database passwords
- Configure proper SMTP settings

### Rate Limiting
- Authentication endpoints: 5-10 requests per 15 minutes
- Password reset: 3 requests per hour
- Registration: 5 requests per 15 minutes
- General API: 100 requests per 15 minutes

## 📊 Monitoring & Logging

### Log Levels
- **Error**: System errors and failures
- **Warn**: Security events and warnings
- **Info**: General application events
- **Debug**: Detailed debugging information (dev only)

### Log Files
- `logs/error.log`: Error-level logs only
- `logs/combined.log`: All log levels
- Console output in development

### Health Checks
- `GET /health`: Basic health check
- `GET /api/health`: Detailed health status
- Monitors: Database, Redis, memory usage

## 🚀 Deployment

### Production Checklist
- [ ] Update all environment variables
- [ ] Configure production database
- [ ] Set up Redis with persistence
- [ ] Configure email service (SendGrid, SES, etc.)
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring (PM2, Docker, etc.)
- [ ] Configure backup strategies
- [ ] Set up CI/CD pipeline

### Recommended Hosting
- **App**: Railway, Heroku, DigitalOcean, AWS
- **Database**: Railway, Heroku Postgres, AWS RDS
- **Redis**: Railway, Heroku Redis, AWS ElastiCache
- **Files**: AWS S3, Cloudinary, DigitalOcean Spaces

## 🧪 Testing

*Testing framework to be implemented*

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 📁 Project Structure

```
gq-backend/
├── src/
│   ├── config/              # Configuration management
│   ├── controllers/         # Request handlers
│   ├── database/           # Database connections & migrations
│   ├── middleware/         # Express middleware
│   ├── models/             # Data models (to be implemented)
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── validators/         # Input validation schemas
│   └── index.ts            # Application entry point
├── logs/                   # Application logs
├── uploads/                # File uploads directory
├── .env                    # Environment variables
├── .env.example            # Environment template
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Write comprehensive tests for new features
3. Update documentation for API changes
4. Use meaningful commit messages
5. Ensure all security checks pass

## 📄 License

Proprietary - GQ Security Services

## 📞 Support

For technical support or questions:
- **Development Team**: dev@gqsecurity.co.uk
- **Security Issues**: security@gqsecurity.co.uk
- **General Support**: support@gqsecurity.co.uk

---

**Built with 🛡️ for professional security services**