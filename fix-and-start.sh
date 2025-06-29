#!/bin/bash
echo "🔧 Fixing ChampagneGlass icon references..."

# Fix import statements
find . -name "*.tsx" -type f -exec sed -i 's/ChampagneGlass/Sparkles/g' {} \;
find . -name "*.ts" -type f -exec sed -i 's/ChampagneGlass/Sparkles/g' {} \;

echo "✅ All ChampagneGlass references replaced with Sparkles"

# Install missing dependencies
echo "📦 Installing dependencies..."
npm install framer-motion @radix-ui/react-slot class-variance-authority clsx

# Clear cache
echo "🧹 Clearing cache..."
rm -rf .next

echo "🚀 Starting server..."
npm run dev
