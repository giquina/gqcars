# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Frontend Development
```bash
# Development
npm run dev          # Start Next.js dev server on port 3000
npm run build       # Build for production
npm run lint        # Run ESLint

# Testing
npm run test        # Run Jest tests
npm run test:watch  # Run tests in watch mode
```

### Quality Checks
```bash
npm run typecheck   # TypeScript check
npm run test        # Run tests
npm run lint        # ESLint
```

## Required Tools
- Node.js >=18.0.0
- TypeScript
- Git
- Docker & Docker Compose
- Kubernetes (optional)
- Terraform (optional)

## Development Environment Setup

### Local Development
```bash
# Install dependencies
npm install

# Start development servers
npm run dev:web     # Web application
npm run dev:mobile  # Mobile application

# Run tests
npm run test:web
npm run test:mobile

# Build applications
npm run build:web
npm run build:mobile
```

### Infrastructure Setup
```bash
# Start local infrastructure
docker-compose up -d

# Deploy to staging
./tools/scripts/deploy/staging.sh

# Deploy to production
./tools/scripts/deploy/production.sh
```

## Multi-Agent System Architecture

### Agent Types
1. **Architecture Guardian** - Security, performance, code quality
2. **Project Manager** - Timeline, dependencies, coordination
3. **Marketing Specialist** - Lead generation, SEO, branding
4. **Quality Assurance** - Testing, validation, compliance
5. **Performance Monitor** - Speed optimization, monitoring

### Agent Collaboration Rules
1. Agents must declare their role at the start of conversation
2. Each agent has read access to all prior agent conversations
3. Agents can request review from other specialized agents
4. Primary agent coordinates cross-agent tasks
5. All decisions must align with project architecture

### Communication Protocol
1. Use explicit task handoffs between agents
2. Document decisions in .decisions/ directory
3. Mark code sections with agent-specific comments
4. Maintain agent activity logs in .agents/ directory

## Project Structure

### Repository Organization
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

## Deployment
- Frontend: Vercel (recommended)
- Domain: gqsecurity.co.uk (planned)
- SSL: Automatic via hosting platform
