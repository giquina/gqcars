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
```
gqcars-frontend/
├── .agents/              # Agent activity logs
├── .decisions/           # Architecture decisions
├── app/                 # Next.js app directory
│   ├── components/     # Reusable components
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── docs/               # Documentation
├── public/             # Static assets
└── project-plan.md     # Project roadmap
```

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
