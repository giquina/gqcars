#!/bin/bash

# ============================================================================
# GQ Cars LTD - GitHub Codespaces Setup Script
# ============================================================================

echo "🚀 Setting up GQ Cars LTD for GitHub Codespaces..."
echo "============================================================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in Codespaces
if [ -n "$CODESPACES" ]; then
    print_status "Running in GitHub Codespaces environment"
    
    # Set Codespaces-specific environment variables
    export NEXTAUTH_URL="https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    export APP_URL="https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    print_status "Configured URLs for Codespaces: $NEXTAUTH_URL"
else
    print_warning "Not running in Codespaces, using localhost URLs"
    export NEXTAUTH_URL="http://localhost:3000"
    export APP_URL="http://localhost:3000"
fi

# Navigate to web app directory
cd apps/web || {
    print_error "Failed to navigate to apps/web directory"
    exit 1
}

print_status "Current directory: $(pwd)"

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

# Copy environment file for Codespaces
if [ ! -f .env.local ]; then
    print_status "Creating .env.local from .env.codespaces template..."
    cp .env.codespaces .env.local
    
    # Update URLs in environment file if in Codespaces
    if [ -n "$CODESPACES" ]; then
        sed -i "s|http://localhost:3000|https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}|g" .env.local
        print_status "Updated environment URLs for Codespaces"
    fi
else
    print_warning ".env.local already exists, skipping creation"
fi

# Install dependencies
print_status "Installing dependencies..."
npm install || {
    print_error "Failed to install dependencies"
    exit 1
}

# Generate Prisma client
print_status "Generating Prisma client..."
npx prisma generate || {
    print_error "Failed to generate Prisma client"
    exit 1
}

# Initialize database (if it doesn't exist)
if [ ! -f "prisma/dev.db" ]; then
    print_status "Initializing database..."
    npx prisma db push || {
        print_warning "Database initialization had issues, but continuing..."
    }
else
    print_status "Database already exists"
fi

# Run type checking
print_status "Running TypeScript type check..."
npx tsc --noEmit --skipLibCheck || {
    print_warning "TypeScript compilation has issues, but continuing..."
}

# Check for common issues
print_status "Checking for common issues..."

# Check if babel config exists (needed for WSL2 compatibility)
if [ ! -f ".babelrc" ]; then
    print_status "Creating .babelrc for SWC fallback..."
    echo '{"presets": ["next/babel"]}' > .babelrc
fi

# Check if next config is properly configured
if grep -q "swcMinify.*false" next.config.js; then
    print_status "SWC minification already disabled"
else
    print_warning "Consider disabling SWC minification if you encounter issues"
fi

echo
echo "============================================================================"
print_status "GQ Cars LTD setup completed!"
echo "============================================================================"
echo
echo "🎯 Next steps:"
echo "1. Run: npm run dev (to start development server)"
echo "2. Open browser to your Codespaces forwarded port 3000"
echo "3. The website should load with the Bold Dynamic design theme"
echo

if [ -n "$CODESPACES" ]; then
    echo "🌐 Your Codespaces URL will be:"
    echo "   https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    echo
fi

echo "📋 Available scripts:"
echo "   npm run dev       - Start development server"
echo "   npm run build     - Build for production"
echo "   npm run start     - Start production server"
echo "   npm run lint      - Run ESLint"
echo "   npm run typecheck - Check TypeScript types"
echo "   npm run test      - Run tests"
echo

echo "🔧 Troubleshooting:"
echo "   - If server hangs: Kill with Ctrl+C and restart"
echo "   - If types fail: Run 'npx prisma generate' again"
echo "   - If dependencies fail: Run 'npm install' again"
echo "   - Check the troubleshooting guide in the project root"
echo

print_status "Setup script completed successfully!"