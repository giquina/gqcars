# Contributing to GQ Security Website

## Quick Start

1. Clone and start development:
```bash
git clone https://github.com/yourusername/gqcars-frontend.git
cd gqcars-frontend
chmod +x dev.sh
./dev.sh
```

2. Create new component:
```bash
# Components should be in app/components/[category]/ComponentName.tsx
# Example: app/components/ui/Button.tsx
```

3. Test changes:
```bash
npm run typecheck  # Check TypeScript
npm run lint      # Run ESLint
npm run test      # Run tests (when added)
```

## Development Standards

### File Structure
```
app/
├── components/    # Reusable components
│   ├── ui/       # Basic UI components
│   ├── booking/  # Booking related components
│   └── services/ # Service page components
├── api/          # API routes
└── [section]/    # Page routes
```

### Component Guidelines
- Use TypeScript interfaces for props
- Keep components focused and small
- Follow existing styling patterns
- Add JSDoc comments for complex logic

### CSS/Styling
- Use Tailwind CSS classes
- Follow color scheme:
  - Primary: amber-500
  - Secondary: blue-500
  - Dark: slate-900
  - Light: slate-50

### Git Workflow
1. Create feature branch
2. Make changes
3. Run checks:
   ```bash
   npm run typecheck
   npm run lint
   ```
4. Commit with clear message
5. Push and create PR

### Common Tasks

#### Adding a New Page
1. Create directory in app/
2. Add page.tsx
3. Update navigation if needed
4. Add to sitemap

#### Creating New Component
1. Add to appropriate components/ subdirectory
2. Create TypeScript interface for props
3. Add to index.ts export
4. Document usage

#### Updating Styles
1. Check tailwind.config.ts
2. Use existing color variables
3. Follow responsive design patterns
4. Test all viewports