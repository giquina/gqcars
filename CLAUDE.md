# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a **Next.js 14 monorepo** for GQ Cars LTD - an AI-powered security taxi service with SIA Licensed Close Protection Officers. The codebase is a single-page application with comprehensive service pages, trust badges, real-time notifications, and security-focused booking systems.

### ✅ **WEBSITE STATUS: FULLY FUNCTIONAL**
- **Port**: 3000 (development server) 
- **Build Status**: ✅ Working with Babel fallback (SWC disabled due to WSL2 compatibility)
- **Database**: ✅ SQLite with Prisma ORM (file:../prisma/dev.db)
- **Components**: ✅ 45+ UI components verified and working 
- **Service Pages**: ✅ All 12 service pages complete and functional
- **Trust Badges**: ✅ SIA/TFL certification badges integrated
- **AI Integration**: ✅ Claude AI chat, security assessment, real-time features
- **Authentication**: ✅ Dual system (NextAuth + Supabase)
- **🎨 Design Theme**: ✅ **BOLD DYNAMIC** - High-energy, animated, game-like interface

## 🎨 **BOLD DYNAMIC DESIGN SYSTEM**

### **Theme Selection: Bold Dynamic (#3)**
The website uses the **Bold Dynamic** design system, chosen for its high-energy, modern appeal that perfectly represents GQ Cars' premium security transport service.

### **Key Design Elements**
- **Background**: Blue-purple gradient (from-blue-900 via-purple-900 to-black)
- **Typography**: font-black with gradient text effects
- **Animations**: Ping circles, bouncing particles, lightning bolts
- **Colors**: Blue/purple/black with yellow/orange accents
- **Interactivity**: Hover scaling, real-time counters, dynamic effects
- **Style**: Energetic, premium, game-like interface

### **Component Hierarchy**
- **Hero**: `/apps/web/src/components/ui/InteractiveHero.tsx` (Bold Dynamic active)
- **Variants**: 
  - `InteractiveHero_ClassicPremium.tsx` (Design #1 - backup)
  - `InteractiveHero_ModernMinimal.tsx` (Design #2 - backup) 
  - `InteractiveHero_BoldDynamic.tsx` (Design #3 - source)

### **Animation Features**
- 6 ping circles with staggered delays
- 30 bouncing particles with random positions
- 8 lightning bolt effects
- Real-time live activity counters
- Hover scaling effects on typography and CTAs
- Pulsing badges and gradient animations

## Common Development Commands

### 🚀 **Quick Start (UPDATED - WORKING SOLUTION)**
```bash
# CRITICAL: Website is now LIVE and working on port 3000
cd /mnt/c/Users/Student/Documents/Development_Projects/gqcars-main-production/apps/web

# Start development server (uses Babel fallback, NOT SWC)
npm run dev

# Server will be ready at: http://localhost:3000
# Log output: "Ready in ~10s" indicates successful startup
```

### Workspace Management (Note: npm works better than pnpm in this environment)
```bash
# Install dependencies (use npm, not pnpm due to WSL2 compatibility)
npm install

# Database operations
npx prisma generate    # Generate Prisma client
npx prisma db push    # Apply schema changes

# Type checking (fixed - all errors resolved)
npx tsc --noEmit

# Build for production
npm run build
```

### Database Operations
```bash
# Push schema changes to database
pnpm db:push

# Open Prisma Studio (database GUI)
pnpm db:studio

# Generate Prisma client after schema changes
cd apps/web && npx prisma generate
```

### Development Troubleshooting
```bash
# Clean install if dependencies are corrupted (common issue)
rm -rf node_modules apps/*/node_modules packages/*/node_modules
rm pnpm-lock.yaml
pnpm install

# Check TypeScript compilation errors
cd apps/web && npx tsc --noEmit

# Fix corrupted @types/react (frequent issue)
rm -rf node_modules/@types
pnpm install
```

## Project Architecture

### 🎯 **SERVICE PAGES** (Complete & Functional)

All service pages are fully implemented with consistent design:
- **Location**: `/apps/web/src/app/services/[service]/page.tsx`  
- **Routing**: Fixed - all "Learn More" buttons work correctly
- **Services**: airport, close-protection, corporate, diplomatic, family-office, lifestyle, private-hire, professional-support, shopping, taxi, vip, weddings

### 🛡️ **TRUST & CREDIBILITY SYSTEM** 

- **TrustBadges Component**: `/apps/web/src/components/ui/TrustBadges.tsx`
- **Certifications**: SIA Licensed, TFL Approved, DBS Checked, ISO Certified, 5-Star Rated
- **Integration**: Added to homepage, available for all service pages
- **Variants**: horizontal, grid, compact layouts

## 🎯 **VERIFIED WORKING COMPONENTS** (All Present & Functional)

### 📍 **Component Location**: `/apps/web/src/components/ui/` (44+ components)

#### **🔥 Core Interactive Features**
```typescript
// All verified working on port 3000
✅ LiveNotifications.tsx       // Real-time booking activity feed
✅ WhatsAppWidget.tsx         // Interactive customer service widget  
✅ InteractiveHero.tsx        // Animated hero section with CTAs
✅ EnhancedChatWidget.tsx     // AI-powered chat interface
✅ InteractiveFeaturesShowcase.tsx  // Service feature highlights
✅ InteractiveTestimonials.tsx      // Customer testimonials carousel
✅ InteractiveMap.tsx         // Google Maps integration
```

#### **🛡️ Security & Booking Features**
```typescript
✅ SecurityAssessment.tsx           // Risk evaluation system
✅ SecurityAssessmentResults.tsx    // Assessment display
✅ BookingForm.tsx                  // Multi-step booking process
✅ QuoteWidget.tsx                  // Instant quote calculator
✅ LocationBasedQuotes.tsx          // GPS-based pricing
✅ GameifiedBooking.tsx             // Interactive booking experience
```

#### **📱 Mobile & CTA Components**
```typescript
✅ MobileAppBanner.tsx              // PWA promotion
✅ MobileMenu.tsx                   // Responsive navigation
✅ SmartCTAManager.tsx              // Dynamic call-to-action system
✅ CallToActionPanel.tsx            // Conversion-optimized CTAs
✅ FloatingActionButton.tsx         // Sticky action buttons
✅ FloatingWhatsAppButton.tsx       // WhatsApp quick access
```

#### **🎨 UI & Layout Components**
```typescript
✅ Header.tsx                       // Main navigation
✅ Footer.tsx                       // Site footer with links
✅ ServicesOverview.tsx             // Service grid display
✅ TestimonialsSection.tsx          // Customer reviews
✅ Loader.tsx                       // Loading animations
✅ OptimizedImage.tsx               // Performance-optimized images
```

### Technology Stack (Updated)
- **Framework**: Next.js 14 with App Router ✅
- **Language**: TypeScript with strict mode ✅
- **Styling**: Tailwind CSS with custom theme ✅
- **Animation**: Framer Motion for interactive components ✅
- **Database**: Prisma ORM with SQLite ✅ (Updated from PostgreSQL)
- **Authentication**: NextAuth with credentials ✅
- **Build System**: Babel (SWC fallback) ✅
- **Development**: Fully working on port 3000 ✅

### Monorepo Structure (Actual)
```
gqcars-main-production/
├── apps/
│   └── web/                    # Next.js 14 web application
│       ├── src/
│       │   ├── app/           # Next.js App Router (pages + API routes)
│       │   ├── components/    # 40+ UI components
│       │   │   ├── ui/       # Interactive components (Hero, Chat, etc.)
│       │   │   ├── providers/ # App-wide providers
│       │   │   └── analytics/ # Google Analytics integration
│       │   ├── lib/          # Utilities (Supabase, Stripe, email)
│       │   ├── types/        # TypeScript definitions
│       │   └── styles/       # Global CSS and Tailwind
│       ├── prisma/           # Database schema and migrations
│       └── public/           # Static assets
└── packages/                  # Shared packages (placeholder for future)
```

### Key Architectural Patterns
1. **Provider Composition**: Root layout wraps app with ErrorBoundary, theme, and auth providers
2. **Component-Driven**: Large interactive components (InteractiveHero, EnhancedChatWidget, LiveNotifications)
3. **API Integration**: Centralized client configurations in `/lib` with helper functions
4. **Real-time Features**: Live booking updates and notifications via Supabase
5. **Security-First**: CSP headers, input validation, and secure authentication flow

### Environment Configuration

#### Required Environment Variables (.env.local)
```bash
# Database
DATABASE_URL=file:../prisma/dev.db

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Supabase (Critical for auth and real-time features)
NEXT_PUBLIC_SUPABASE_URL=https://atjiphyvxzsdpmsguvoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key

# Payment Processing
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-maps-key
SENDGRID_API_KEY=your-sendgrid-key

# AI Integration (Required for Claude AI features)
CLAUDE_API_KEY=your-anthropic-key
CLAUDE_API_URL=https://api.anthropic.com/v1
```

## Business Context

### Core Services
- SIA Licensed Close Protection Officers
- Premium private hire vehicles with security focus
- AI-powered booking and risk assessment system
- 24/7 security transport for VIPs, corporate clients, and events

### Key Features Architecture
- **Security Assessment**: Risk evaluation system with questionnaire-based scoring
- **Live Booking**: Real-time booking with location-based quotes via Google Maps
- **AI Integration**: Claude-powered chat support and security recommendations
- **Live Notifications**: Real-time activity feed showing bookings and system events
- **Mobile-First**: Progressive Web App with responsive design
- **Payment Processing**: Secure Stripe integration with webhook verification

## ✅ **RESOLVED ISSUES & CRITICAL FIXES**

### 🔧 **Major Fixes Applied (December 2024)**
1. **✅ SWC Binary Loading Issue - RESOLVED**
   - **Problem**: Failed to load SWC binary for linux/x64 in WSL2
   - **Solution**: Created `.babelrc` config to force Babel fallback
   - **Result**: Development server now starts successfully in ~10 seconds

2. **✅ TypeScript Compilation Errors - RESOLVED**
   - **Problem**: 100+ TypeScript errors due to Prisma schema mismatches
   - **Solution**: Updated Prisma schema, created comprehensive type definitions
   - **Result**: All TypeScript errors resolved, clean compilation

3. **✅ Database Schema Issues - RESOLVED** 
   - **Problem**: Prisma enums not supported in SQLite
   - **Solution**: Converted enums to string types, updated all references
   - **Result**: Database operations working correctly

4. **✅ NextAuth Session Types - RESOLVED**
   - **Problem**: Session user type missing id and role properties
   - **Solution**: Created custom NextAuth type definitions
   - **Result**: Authentication system fully functional

### 🚀 **Current Working State**
- **Development Server**: ✅ Starts in ~10 seconds with Babel
- **Port 3000**: ✅ Live and accessible
- **All Components**: ✅ 44+ components verified working
- **Database**: ✅ SQLite with Prisma ORM functional
- **TypeScript**: ✅ Clean compilation with no errors
- **Build System**: ✅ Babel fallback working perfectly

### Performance Considerations
- **40+ UI Components**: EnhancedChatWidget, InteractiveHero, LiveNotifications may slow initial compilation
- **Framer Motion**: Heavy animation library adds to bundle size
- **Real-time Features**: Supabase subscriptions for live updates
- **AI Integration**: Anthropic Claude API calls for chat functionality

### Security Architecture
- **CSP Headers**: Configured in next.config.js with specific allowlists
- **Input Validation**: Zod schemas for form validation
- **Authentication Flow**: Supabase auth with secure session management
- **Payment Security**: Stripe webhook signature verification
- **SIA Compliance**: Security industry standards for client data handling

## Project Structure
```
gqcars/
├── apps/                          # Application code
│   ├── web/                      # Next.js web application
│   │   ├── src/
│   │   │   ├── features/         # Feature-based components
│   │   │   │   ├── auth/        # Authentication features
│   │   │   │   ├── booking/     # Booking system
│   │   │   │   └── security/    # Security features
│   │   │   ├── common/          # Shared UI components
│   │   │   │   ├── buttons/
│   │   │   │   ├── forms/
│   │   │   │   └── layout/
│   │   │   └── layouts/         # Page layouts
│   │   └── public/              # Static assets
│   │
│   └── mobile/                  # React Native mobile app
│       ├── src/
│       │   ├── features/        # Mobile features
│       │   └── navigation/      # App navigation
│       └── assets/              # Mobile assets
│
├── packages/                    # Shared packages
│   ├── ui-library/             # Common UI components
│   │   ├── components/
│   │   └── styles/
│   ├── api-client/             # API integration
│   │   ├── endpoints/
│   │   └── types/
│   └── types/                  # Shared TypeScript types
│
├── infrastructure/             # Infrastructure config
│   ├── docker/                # Container configurations
│   ├── kubernetes/            # K8s manifests
│   └── terraform/             # Infrastructure as code
│
├── tools/                     # Development tools
│   ├── scripts/               # Development scripts
│   │   ├── setup/            # Setup scripts
│   │   └── deploy/           # Deployment scripts
│   └── testing/               # Test utilities
│
├── docs/                      # Documentation
│   ├── architecture/          # System design docs
│   ├── api/                   # API documentation
│   ├── guides/               # Developer guides
│   └── reports/              # Business reports
│
└── config/                    # Configuration
    ├── development/          # Dev environment
    ├── staging/             # Staging environment
    └── production/          # Production configs
```

### Feature Organization Guidelines

1. **Feature-based Structure**
   - Each feature should be self-contained
   - Include components, hooks, and utils
   - Maintain feature-specific tests

2. **Shared Components**
   - Place reusable UI in packages/ui-library
   - Document component props and usage
   - Include Storybook stories

3. **API Integration**
   - Centralize API calls in api-client
   - Use TypeScript for type safety
   - Maintain API documentation

4. **Configuration Management**
   - Environment-specific configs in config/
   - Use .env files for secrets
   - Document all config options

5. **Documentation Standards**
   - Architecture decisions in docs/architecture
   - API documentation in docs/api
   - Maintain README.md in each directory

### File Naming Conventions

1. **Components**
   - PascalCase: `BookingForm.tsx`
   - Include .tsx extension

2. **Utilities**
   - camelCase: `formatDate.ts`
   - Descriptive names

3. **Constants**
   - UPPER_CASE
   - Group related constants

4. **Styles**
   - Follow component naming
   - Use .module.css suffix

### Code Organization Rules

1. **Feature Modules**
   - One feature per directory
   - Include index.ts exports
   - Maintain feature-level tests

2. **Shared Code**
   - Place in appropriate package
   - Document dependencies
   - Include usage examples

3. **Testing**
   - Co-locate tests with code
   - Follow *.test.ts pattern
   - Include E2E tests in separate directory

## Technology Stack

### Frontend Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Jest (to be added)

## Quality Standards

### Pre-Commit Checks
- ESLint passing
- TypeScript compiling
- Tests passing (when implemented)
- No security vulnerabilities

### Code Review Guidelines
- Follow existing patterns
- Maintain component reusability
- Document complex logic
- Ensure mobile responsiveness
- Optimize for performance

## Security Requirements

### Frontend Security
- Input validation for all forms
- XSS protection
- CSRF protection
- Secure API communication

### Data Protection
- Client information security
- GDPR compliance for UK operations
- Professional confidentiality standards
- Secure contact form handling

## Business Requirements

### Lead Generation Focus
- Professional appearance for high-value clients
- Clear service differentiation
- Trust signals and credibility elements
- Mobile optimization for client accessibility

### Security Industry Standards
- SIA licensing compliance
- Professional terminology usage
- Discrete luxury branding approach
- Industry-appropriate imagery and content

## Error Handling
- Consistent error format
- Professional error messages
- Graceful fallbacks for failed requests
- User-friendly feedback

## WSL2 Development Environment

### Critical WSL2 Considerations
- **SWC Compatibility**: SWC binary loading fails in WSL2, use Babel fallback via `.babelrc`
- **Package Manager**: npm works more reliably than pnpm in WSL2 environment
- **Path Handling**: Windows paths mounted at `/mnt/c/` - always use full paths
- **Node Version**: Confirmed working with Node.js v20.19.3 and npm v10.8.2

### Common WSL2 Issues & Solutions
1. **"Failed to load SWC binary"**
   - Solution: Ensure `.babelrc` exists with `{"presets": ["next/babel"]}`
   - Next.js will automatically fallback to Babel

2. **"Invalid Version" npm errors**
   - Solution: Clear npm cache and use npm instead of pnpm
   - `npm cache clean --force && npm install`

3. **TypeScript compilation errors**
   - Solution: Regenerate Prisma client and check type definitions
   - `npx prisma generate && npx tsc --noEmit`

4. **Database connection issues**
   - Solution: Ensure DATABASE_URL uses file path relative to prisma directory
   - `DATABASE_URL=file:../prisma/dev.db`

## Deployment
- Frontend: Vercel (recommended)
- Domain: gqsecurity.co.uk (planned)
- SSL: Automatic via hosting platform
