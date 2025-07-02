#!/bin/bash
# ============================================================================
# GQ Cars LTD - GitHub Codespaces Setup Script
# ============================================================================

echo "🚀 Setting up GQ Cars LTD for GitHub Codespaces..."
echo "============================================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running in Codespaces
if [ -n "$CODESPACES" ]; then
    print_status "Running in GitHub Codespaces environment"
    BASE_URL="https://$CODESPACE_NAME-3000.app.github.dev"
else
    print_warning "Not running in Codespaces, using localhost URLs"
    BASE_URL="http://localhost:3000"
fi

# 1. Install dependencies for root workspace
print_status "Installing root workspace dependencies..."
npm install || {
    print_error "Failed to install root dependencies"
    exit 1
}

# 2. Setup web app
print_status "Setting up web application..."
cd apps/web

# Install web app dependencies
print_status "Installing web app dependencies..."
npm install || {
    print_error "Failed to install web app dependencies"
    exit 1
}

# 3. Setup environment variables for Codespaces
print_status "Setting up environment variables..."

# Create .env.local if it doesn't exist or if we're in Codespaces
if [ -n "$CODESPACES" ] || [ ! -f ".env.local" ]; then
    print_status "Creating .env.local for Codespaces..."
    cat > .env.local << EOF
# Environment configuration for GitHub Codespaces
# This file provides safe defaults for development in Codespaces

# Authentication
NEXTAUTH_URL=$BASE_URL
NEXTAUTH_SECRET=codespaces-development-secret-key-change-in-production

# Database (SQLite for development)
DATABASE_URL=file:../prisma/dev.db

# Supabase (Optional - for advanced features)
NEXT_PUBLIC_SUPABASE_URL=https://atjiphyvxzsdpmsguvoo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0amlwaHl2eHpzZHBtc2d1dm9vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3MDY4MjIsImV4cCI6MjA1MDI4MjgyMn0.Cj6BPSYEAGFNSGpW6J7OU-TlKrJfD2AEQjM7K5y0Mxs

# Payment (Stripe test keys - safe for development)
STRIPE_PUBLIC_KEY=pk_test_51234567890abcdef
STRIPE_SECRET_KEY=sk_test_51234567890abcdef

# External APIs (Optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=development_key_replace_with_real_key
SENDGRID_API_KEY=development_key_replace_with_real_key

# AI Integration (Optional)
CLAUDE_API_KEY=development_key_replace_with_real_key
CLAUDE_API_URL=https://api.anthropic.com/v1

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
EOF
    print_success "Environment file created successfully"
else
    print_success "Environment file already exists"
fi

# 4. Setup database
print_status "Setting up database..."
cd ../..
npx prisma generate || {
    print_warning "Prisma generate failed, continuing..."
}

npx prisma db push || {
    print_warning "Database push failed, continuing..."
}

cd apps/web

# 5. Clear Next.js cache
print_status "Clearing Next.js cache..."
rm -rf .next

# 6. Create Codespaces-specific Next.js config if needed
if [ -n "$CODESPACES" ] && [ ! -f "next.config.codespaces.js" ]; then
    print_status "Creating Codespaces-specific Next.js configuration..."
    cat > next.config.codespaces.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Disabled for Codespaces compatibility
  poweredByHeader: false,
  output: undefined, // Always use server mode in Codespaces
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true, // For faster development
  },
  eslint: {
    ignoreDuringBuilds: true, // For faster development
  },
  experimental: {
    forceSwcTransforms: false, // Force Babel in Codespaces
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
EOF
    print_success "Codespaces Next.js config created"
fi

print_success "============================================================================"
print_success "🎉 GQ Cars LTD setup completed successfully!"
print_success "============================================================================"
print_status "Next steps:"
print_status "1. Run: cd apps/web && npm run dev"
print_status "2. Open: $BASE_URL"
print_status "3. The website should load with the Bold Dynamic theme!"
print_success "============================================================================"