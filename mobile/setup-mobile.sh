#!/bin/bash

echo "🚀 Setting up GQ Security Mobile App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g @expo/cli
else
    echo "✅ Expo CLI is already installed"
fi

# Install dependencies
echo "📦 Installing mobile app dependencies..."
npm install

# Create assets directory if it doesn't exist
if [ ! -d "assets" ]; then
    echo "📁 Creating assets directory..."
    mkdir assets
    
    # Create placeholder asset files
    echo "🎨 Creating placeholder assets..."
    
    # You would replace these with actual asset files
    touch assets/icon.png
    touch assets/splash.png
    touch assets/adaptive-icon.png
    touch assets/favicon.png
    
    echo "ℹ️  Note: Replace placeholder assets in ./assets/ with actual image files"
fi

# Create .expo directory if it doesn't exist
if [ ! -d ".expo" ]; then
    mkdir .expo
fi

echo "✅ Mobile app setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Replace placeholder assets in ./assets/ with actual images"
echo "2. Run 'npm start' to start the development server"
echo "3. Install Expo Go app on your phone to test"
echo "4. Scan the QR code with Expo Go to run the app"
echo ""
echo "📱 For iOS simulator: Run 'npm run ios'"
echo "🤖 For Android emulator: Run 'npm run android'"
echo "🌐 For web: Run 'npm run web'"