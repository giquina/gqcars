# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Frontend Development
```bash
# Development
cd frontend
npm run dev          # Start Next.js dev server on port 3000
npm run build       # Build for production
npm run lint        # Run ESLint

# Testing
npm run test        # Run Jest tests
npm run test:watch  # Run tests in watch mode
```

### Backend Development
```bash
# Development
cd api
npm run dev         # Start Express server on port 8000
npm run build       # Build TypeScript
npm run lint        # Run ESLint
```

### Quality Checks
```bash
# Frontend
npm run typecheck   # TypeScript check
npm run test        # Run tests
npm run lint        # ESLint

# Backend
npm run lint        # ESLint
npm run test        # Run tests
```

## Required Tools
- Node.js >=18.0.0
- TypeScript
- PostgreSQL
- Redis (optional)
- Git

## Multi-Agent System Architecture

### Agent Types
1. **Primary Development Agent** - Handles main coding tasks
2. **Architecture Guardian** - Reviews structural decisions
3. **Testing Specialist** - Focuses on test coverage
4. **Documentation Agent** - Maintains docs & comments
5. **Security Auditor** - Reviews for vulnerabilities
6. **Performance Optimizer** - Optimizes code efficiency
7. **Integration Manager** - Handles service connections

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
sohofashion/
├── .agents/              # Agent activity logs
├── .decisions/           # Architecture decisions
├── api/                 # Express backend
│   ├── src/            # Source code
│   ├── tests/          # Test files
│   └── package.json    # Dependencies
├── frontend/           # Next.js frontend
│   ├── app/           # App router pages
│   ├── components/    # React components
│   ├── contexts/      # React contexts
│   └── package.json   # Dependencies
└── docs/              # Documentation
```

## Technology Stack

### Frontend Stack
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Context
- **Testing**: Jest

### Backend Stack
- **Framework**: Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Testing**: Jest

## Quality Standards

### Pre-Commit Checks
- ESLint passing
- TypeScript compiling
- Tests passing
- No security vulnerabilities

### Code Review Guidelines
- Follow existing patterns
- Maintain test coverage
- Document changes
- Consider security
- Optimize performance

## Security Requirements

### Authentication
- JWT-based auth
- Secure password storage
- Rate limiting
- Session management

### Data Protection
- Input validation
- SQL injection prevention
- XSS protection
- CSRF protection

## Error Handling
- Consistent error format
- Proper status codes
- Error logging
- User-friendly messages

## Deployment
- Frontend: Vercel
- Backend: Docker
- Database: Managed PostgreSQL
