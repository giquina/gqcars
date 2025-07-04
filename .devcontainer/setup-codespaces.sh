#!/bin/bash
# GQ Cars LTD - Codespaces Setup Script
# Last Updated: July 4, 2025

echo "🚀 Setting up GQ Cars development environment..."
echo "📋 Project: GQ Cars LTD - Premium Security Transport"
echo "🌐 Live Site: https://web-8wyt5fr24-giquinas-projects.vercel.app"

# Update package lists
echo "🔄 Updating system packages..."
sudo apt-get update -qq

# Install Vercel CLI globally
echo "📦 Installing Vercel CLI..."
npm install -g vercel@latest

# Install other useful tools
echo "🔧 Installing development tools..."
npm install -g @prisma/cli
npm install -g typescript
npm install -g eslint
npm install -g prettier

# Set up Git configuration
echo "🔧 Setting up Git configuration..."
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --global core.autocrlf input

# Create environment file template
echo "📄 Setting up environment configuration..."
cd apps/web

# Copy environment template if not exists
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Setting up database and Prisma client..."
npx prisma generate

# Run TypeScript check
echo "🔍 Verifying TypeScript configuration..."
npx tsc --noEmit --pretty

# Run linting
echo "🧹 Running code quality checks..."
npm run lint --if-present

# Create initial database if needed
echo "🗄️ Initializing database..."
npx prisma db push --accept-data-loss || echo "Database already initialized"

# Display success message and next steps
echo ""
echo "✅ GQ Cars development environment setup complete!"
echo ""
echo "🎯 NEXT STEPS:"
echo "  1. Start development server: npm run dev"
echo "  2. Open browser: http://localhost:3000"
echo "  3. View production site: https://web-8wyt5fr24-giquinas-projects.vercel.app"
echo ""
echo "📚 USEFUL COMMANDS:"
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  vercel --prod        - Deploy to production"
echo "  npx prisma studio    - Open database GUI"
echo ""
echo "📋 DOCUMENTATION:"
echo "  📖 Project Status: PROJECT-BUILD-STATUS.md"
echo "  📝 Remaining Tasks: REMAINING-TASKS-TODO.md"
echo "  🚀 Codespaces Guide: GITHUB-CODESPACES-PLAN.md"
echo ""
echo "🚗 Happy coding! The GQ Cars platform awaits your innovations!"
