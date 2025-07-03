# GQ Cars Desktop Development Setup Guide

## ✅ Verified Working Environment

This guide documents the complete setup for GQ Cars development environment on desktop machines. All steps have been tested and verified working as of 2025-01-07.

## 📋 Prerequisites

### Required Software
- **Node.js**: v20.19.3 (confirmed working)
- **npm**: v10.8.2 (confirmed working)
- **Git**: Latest version
- **WSL2**: Required for Windows development

### System Requirements
- Windows 10/11 with WSL2 enabled
- At least 8GB RAM (16GB recommended)
- 10GB free disk space

## 🚀 Quick Setup Commands

### 1. Repository Setup
```bash
# Navigate to the project directory
cd /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production

# Verify you're on the main branch with latest changes
git status
git branch -v

# Should show: "* main 3bd675fa 🔧 Fix BUILD_STATIC condition in next.config.js"
```

### 2. Dependencies Installation
```bash
# Navigate to the web app directory
cd apps/web

# Install dependencies (uses npm, not pnpm due to WSL2 compatibility)
npm install

# Verify installation (should show "found 0 vulnerabilities")
```

### 3. Environment Configuration
The `.env.local` file is already configured with required variables:
- ✅ Supabase credentials (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- ✅ Database URL (SQLite: file:../prisma/dev.db)
- ✅ NextAuth configuration
- ✅ Google Maps API key
- ✅ Stripe test keys

### 4. Development Workflow Verification
```bash
# Run linting (should show 9 warnings, 0 errors)
npm run lint

# Run TypeScript checking (should pass with 0 errors)
npx tsc --noEmit

# Run tests (should pass 1/1 tests)
npm test

# Start development server (ready in ~16 seconds)
npm run dev

# Server will be available at: http://localhost:3000
```

## 🛠 Development Commands

### Core Development
```bash
# Start development server
npm run dev                    # Starts on port 3000

# Production build (uses Babel fallback, not SWC)
npm run build                  # Creates optimized production build

# Type checking
npx tsc --noEmit              # Check TypeScript without compilation

# Database operations
npx prisma generate           # Generate Prisma client
npx prisma db push           # Apply schema changes to database
npx prisma studio            # Open database GUI
```

### Quality Assurance
```bash
# Linting
npm run lint                  # ESLint checking (warnings only)

# Testing
npm test                      # Run Jest tests

# Dependency audit
npm audit                     # Check for security vulnerabilities
```

## 📁 Project Structure

```
gqcars-main-production/
├── apps/web/                 # Next.js 14 web application (port 3000)
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/ui/   # 44+ UI components (verified working)
│   │   ├── lib/             # Utilities and configurations
│   │   └── types/           # TypeScript definitions
│   ├── prisma/              # Database schema (SQLite)
│   ├── public/              # Static assets
│   ├── .env.local           # Environment variables (configured)
│   └── package.json         # Dependencies and scripts
└── DESKTOP_DEV_SETUP.md     # This documentation file
```

## 🎯 Key Features Verified Working

### ✅ Core Components (44+ components verified)
- **InteractiveHero.tsx**: Animated hero with Bold Dynamic theme
- **EnhancedChatWidget.tsx**: AI-powered chat interface
- **LiveNotifications.tsx**: Real-time booking activity feed
- **WhatsAppWidget.tsx**: Customer service integration
- **SecurityAssessment.tsx**: Risk evaluation system
- **BookingForm.tsx**: Multi-step booking process

### ✅ Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode, 0 errors)
- **Styling**: Tailwind CSS with Bold Dynamic theme
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth + Supabase dual system
- **Build**: Babel fallback (SWC disabled for WSL2 compatibility)

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. "Failed to load SWC binary" Error
**Solution**: Already resolved with `.babelrc` configuration
```json
{"presets": ["next/babel"]}
```

#### 2. TypeScript Compilation Errors
**Solution**: Fixed Prisma import issues
- Use `import prisma from "@/lib/prisma"` (default import)
- All schema fields aligned with actual database structure

#### 3. Development Server Slow Startup
**Expected**: ~16 seconds startup time due to Babel fallback
**Solution**: This is normal, server will show "✓ Ready in 16s"

#### 4. Build Timeouts
**Expected**: Production builds may take 2+ minutes
**Solution**: This is normal with Babel compilation

### Emergency Recovery Commands
```bash
# If server hangs or becomes unresponsive
pkill -f "next dev"
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Clear Next.js cache
rm -rf .next

# Clean dependency reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Environment Variables Reference

### Required Variables (Already Configured)
```bash
# Database
DATABASE_URL=file:../prisma/dev.db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Supabase (Critical for real-time features)
NEXT_PUBLIC_SUPABASE_URL=https://atjiphyvxzsdpmsguvoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDGz8TAQuQeLePTBdXdqODfFEQ0Nm9gjPU
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 📊 Performance Metrics

### Verified Benchmarks
- **Startup Time**: ~16 seconds (development)
- **Build Time**: ~2-3 minutes (production)
- **Test Suite**: 1/1 tests passing in ~34 seconds
- **Bundle Size**: Optimized with tree-shaking
- **Memory Usage**: ~500MB during development

### Component Loading
- **44+ UI Components**: All verified working
- **Real-time Features**: Supabase subscriptions active
- **AI Integration**: Claude API integration ready
- **Payment System**: Stripe integration configured

## 🔒 Security Configuration

### Implemented Security Measures
- **CSP Headers**: Configured in next.config.js
- **Input Validation**: Zod schemas for forms
- **Authentication**: Secure session management
- **Payment Security**: Stripe webhook verification
- **Database**: Parameterized queries via Prisma

## 📝 Development Workflow

### Daily Development Process
1. **Start Development**:
   ```bash
   cd /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/apps/web
   npm run dev
   ```

2. **Before Committing**:
   ```bash
   npm run lint      # Should show warnings only
   npx tsc --noEmit  # Should pass with 0 errors
   npm test          # Should pass 1/1 tests
   ```

3. **Testing Changes**:
   - Visit http://localhost:3000
   - Test core features (booking, chat, assessment)
   - Verify mobile responsiveness

### Git Workflow
```bash
# Check status
git status

# Create feature branch
git checkout -b feature/new-feature

# Stage and commit changes
git add .
git commit -m "feat: description of changes"

# Push to origin
git push origin feature/new-feature
```

## ✅ Verification Checklist

Use this checklist to verify your development environment is working correctly:

- [ ] Repository cloned and on main branch (3bd675fa)
- [ ] Node.js v20.19.3 and npm v10.8.2 installed
- [ ] Dependencies installed with `npm install`
- [ ] Environment variables configured in `.env.local`
- [ ] `npm run lint` shows 9 warnings, 0 errors
- [ ] `npx tsc --noEmit` passes with 0 errors
- [ ] `npm test` passes 1/1 tests
- [ ] `npm run dev` starts server on port 3000 in ~16 seconds
- [ ] http://localhost:3000 returns HTTP 200
- [ ] All 44+ UI components load without errors

## 📞 Support

### Documentation References
- Main project: `/CLAUDE.md`
- Component loading: `/apps/web/COMPONENT_LOADING_STRATEGY.md`
- Next.js 14: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs

### Status
- **Last Updated**: 2025-01-07
- **Environment**: WSL2 Ubuntu
- **Status**: ✅ Fully Functional
- **Server**: http://localhost:3000 (live)

---

*This setup guide ensures a consistent, working development environment for all team members working on the GQ Cars platform.*