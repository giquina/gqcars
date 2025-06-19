#!/bin/bash

# GQ Cars AI Assistant Setup Script
# This script installs and configures the AI Assistant Widget

echo "🤖 GQ Cars AI Assistant Setup"
echo "============================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install required dependencies
echo ""
echo "📦 Installing AI Assistant dependencies..."
npm install openai react-speech-recognition regenerator-runtime

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo ""
    echo "🔧 Creating environment configuration..."
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
    echo "⚠️  Please edit .env.local and add your OpenAI API key"
else
    echo "✅ Environment file already exists"
fi

# Check TypeScript configuration
if [ -f tsconfig.json ]; then
    echo "✅ TypeScript configuration found"
else
    echo "❌ tsconfig.json not found. Please ensure this is a Next.js TypeScript project."
    exit 1
fi

# Build the project to check for errors
echo ""
echo "🔨 Building project to verify setup..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! AI Assistant is ready."
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo ""
echo "🎉 AI Assistant setup complete!"
echo ""
echo "Next steps:"
echo "1. Add your OpenAI API key to .env.local"
echo "2. Run 'npm run dev' to start development server"
echo "3. Test the AI Assistant widget on your site"
echo "4. Review the analytics dashboard"
echo ""
echo "📚 For detailed documentation, see docs/AI_ASSISTANT_SETUP.md"
echo ""
echo "🚗 GQ Cars - Premium Security Taxi Service with AI-Powered Support! 🤖"