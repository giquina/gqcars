# Deployment Guide - GQ Security Services

## Overview
This guide covers the complete deployment process for GQ Security Services web and mobile applications, including pre-deployment checklist, deployment procedures, and post-deployment verification.

## Pre-Deployment Checklist

### Code Quality Gates
- [ ] All unit tests passing (>70% coverage)
- [ ] All integration tests passing
- [ ] All end-to-end tests passing
- [ ] Code review completed and approved
- [ ] No security vulnerabilities (Snyk scan clean)
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Cross-browser testing completed
- [ ] Mobile device testing completed

### Technical Requirements
- [ ] Database migrations reviewed and tested
- [ ] Environment variables configured
- [ ] SSL certificates valid and configured
- [ ] CDN configuration updated
- [ ] API endpoints documented and tested
- [ ] Third-party integrations verified
- [ ] Monitoring and logging configured
- [ ] Error tracking (Sentry) configured
- [ ] Analytics tracking verified

### Content and Documentation
- [ ] Content review completed
- [ ] SEO meta tags updated
- [ ] Images optimized and compressed
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Release notes prepared

## Deployment Environments

### Environment Hierarchy
```Development → Testing → Staging → Production
```

### Environment Configurations

#### Development Environment
- **URL**: http://localhost:3000
- **Purpose**: Local development and initial testing
- **Database**: Local SQLite/PostgreSQL
- **Features**: Debug mode, hot reload, mock services

#### Testing Environment
- **URL**: https://test.gqsecurity.co.uk
- **Purpose**: QA testing and bug verification
- **Database**: Test database with sample data
- **Features**: Error logging, performance monitoring

#### Staging Environment
- **URL**: https://staging.gqsecurity.co.uk
- **Purpose**: Final testing before production
- **Database**: Production-like data
- **Features**: Identical to production configuration

#### Production Environment
- **URL**: https://gqsecurity.co.uk
- **Purpose**: Live application for users
- **Database**: Production database
- **Features**: Full monitoring, error tracking, analytics

## Web Application Deployment

### Next.js Deployment (Vercel)

#### Automatic Deployment
```bash
# Connect repository to Vercel
# Deployments trigger automatically on:
# - Push to main branch (production)
# - Push to develop branch (staging)
# - Pull request creation (preview)
```

#### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel --target staging

# Deploy to production
vercel --prod
```

#### Environment Variables Setup
```bash
# Required environment variables for production:
NEXT_PUBLIC_API_URL=https://api.gqsecurity.co.uk
NEXT_PUBLIC_SITE_URL=https://gqsecurity.co.uk
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
DATABASE_URL=postgresql://...
EMAIL_SERVICE_API_KEY=...
STRIPE_SECRET_KEY=sk_live_...
SENTRY_DSN=https://...
```

### Alternative Deployment (Self-hosted)

#### Build Process
```bash
# Install dependencies
npm ci

# Run tests
npm run test
npm run test:e2e

# Build application
npm run build

# Start production server
npm start
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build and deploy with Docker
docker build -t gq-security-web .
docker run -p 3000:3000 -d gq-security-web
```

## Mobile Application Deployment

### iOS Deployment (App Store)

#### Prerequisites
- Apple Developer Account
- Valid certificates and provisioning profiles
- App Store Connect access

#### Build Process
```bash
# Install dependencies
cd mobile
npm install

# iOS build
npx react-native run-ios --configuration Release

# Create archive
xcodebuild -workspace ios/GQSecurity.xcworkspace \
           -scheme GQSecurity \
           -configuration Release \
           -archivePath build/GQSecurity.xcarchive \
           archive

# Export IPA
xcodebuild -exportArchive \
           -archivePath build/GQSecurity.xcarchive \
           -exportPath build \
           -exportOptionsPlist ios/ExportOptions.plist
```

#### App Store Submission
1. Upload build to App Store Connect
2. Complete app metadata and screenshots
3. Submit for App Store review
4. Monitor review status
5. Release to App Store upon approval

### Android Deployment (Google Play)

#### Prerequisites
- Google Play Developer Account
- Signing keys configured
- Google Play Console access

#### Build Process
```bash
# Generate signed APK
cd mobile/android
./gradlew assembleRelease

# Generate signed AAB (recommended)
./gradlew bundleRelease
```

#### Google Play Submission
1. Upload AAB to Google Play Console
2. Complete store listing
3. Submit for review
4. Release to Google Play

## Database Deployment

### Migration Process
```bash
# Review pending migrations
npm run db:migrate:status

# Run migrations (staging first)
npm run db:migrate

# Verify migration success
npm run db:verify

# Rollback if needed
npm run db:migrate:rollback
```

### Backup Procedures
```bash
# Create backup before deployment
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Verify backup integrity
pg_restore --list backup_*.sql
```

## Post-Deployment Verification

### Automated Checks
```bash
# Health check endpoint
curl https://gqsecurity.co.uk/api/health

# Performance monitoring
npm run lighthouse:production

# Security scan
npm run security:scan
```

### Manual Verification Checklist

#### Functionality Testing
- [ ] Homepage loads correctly
- [ ] All service pages accessible
- [ ] Contact forms working
- [ ] Booking system functional
- [ ] Payment processing working
- [ ] Email notifications sending
- [ ] Mobile app launching correctly
- [ ] Push notifications working

#### Performance Verification
- [ ] Page load times < 3 seconds
- [ ] Core Web Vitals meeting targets
- [ ] Mobile performance acceptable
- [ ] API response times < 500ms
- [ ] Image loading optimized

#### Security Verification
- [ ] SSL certificate valid
- [ ] Security headers present
- [ ] API authentication working
- [ ] CORS policies correct
- [ ] No sensitive data exposed

#### Monitoring Setup
- [ ] Error tracking active (Sentry)
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured
- [ ] Log aggregation working
- [ ] Alert notifications configured

## Rollback Procedures

### Web Application Rollback
```bash
# Vercel automatic rollback
vercel rollback [deployment-url]

# Or redeploy previous version
git checkout [previous-commit]
vercel --prod
```

### Mobile Application Rollback
- **iOS**: Use App Store Connect to remove current version
- **Android**: Use Google Play Console phased rollout controls

### Database Rollback
```bash
# Restore from backup
pg_restore --clean --if-exists -d $DATABASE_URL backup_*.sql

# Or run rollback migrations
npm run db:migrate:rollback
```

## Monitoring and Alerting

### Key Metrics to Monitor
- Application uptime (>99.9%)
- Response time (<500ms)
- Error rate (<0.1%)
- Core Web Vitals
- Conversion rates
- User satisfaction scores

### Alert Configurations
- **Critical**: Application down, database unavailable
- **High**: High error rate, slow response times
- **Medium**: Performance degradation, API errors
- **Low**: Warning thresholds, capacity planning

### Monitoring Tools
- **Uptime**: UptimeRobot, Pingdom
- **Performance**: New Relic, DataDog
- **Errors**: Sentry, LogRocket
- **Analytics**: Google Analytics, Mixpanel

## Release Communication

### Internal Communication
1. Notify development team of deployment start
2. Update project management tools (Jira/Linear)
3. Communicate with customer support team
4. Update status page if maintenance required

### External Communication
1. Schedule maintenance windows during low traffic
2. Notify users via email/app notifications if needed
3. Update social media if major feature release
4. Prepare press releases for significant updates

## Emergency Procedures

### Incident Response
1. **Identify**: Monitor alerts and user reports
2. **Assess**: Determine severity and impact
3. **Respond**: Immediate fixes or rollback
4. **Communicate**: Update stakeholders and users
5. **Resolve**: Implement permanent fix
6. **Review**: Post-incident analysis

### Emergency Contacts
- **On-call Developer**: [Contact information]
- **DevOps Engineer**: [Contact information]
- **Product Manager**: [Contact information]
- **Customer Support**: [Contact information]

## Compliance and Security

### Data Protection
- GDPR compliance for EU users
- Data encryption in transit and at rest
- Regular security audits
- User data handling procedures

### Industry Standards
- SIA compliance for security industry
- PCI DSS for payment processing
- WCAG 2.1 AA for accessibility
- SOC 2 for security controls

---

*This deployment guide should be reviewed and updated with each major release to ensure accuracy and completeness.*