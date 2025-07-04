#!/bin/bash
# GQ Cars LTD - Codespaces Setup Script

echo "🚀 Setting up GQ Cars development environment..."

# Update package lists
sudo apt-get update

# Install Vercel CLI globally
echo "📦 Installing Vercel CLI..."
npm install -g vercel

# Install other useful tools
echo "🔧 Installing additional tools..."
npm install -g @prisma/cli
npm install -g typescript
npm install -g eslint
npm install -g prettier

# Set up Git configuration
echo "🔧 Setting up Git..."
git config --global init.defaultBranch main
git config --global pull.rebase false

# Create environment file template
echo "📄 Creating environment template..."
cd apps/web
if [ ! -f .env.local ]; then
    cp .env.example .env.local
fi

# Install dependencies
echo "📦 Installing project dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Setting up database..."
npx prisma generate

# Set up pre-commit hooks
echo "🔧 Setting up development tools..."
npm run lint --if-present

echo "✅ GQ Cars development environment setup complete!"
echo "🚗 You can now start developing with: npm run dev"
echo "🌐 Your website will be available at: http://localhost:3000"
