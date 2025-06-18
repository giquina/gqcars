#!/bin/bash

# GQ Cars & Security Mobile App Setup Script
echo "🚗 Setting up GQ Cars & Security Mobile App..."

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
    echo "📱 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

# Create mobile directory if it doesn't exist
mkdir -p mobile
cd mobile

# Install dependencies
echo "📦 Installing mobile app dependencies..."
npm install

# Install additional React Native dependencies
echo "📱 Installing React Native specific dependencies..."

# Core React Native navigation
npm install @react-navigation/native@^6.1.9
npm install @react-navigation/native-stack@^6.9.17
npm install @react-navigation/bottom-tabs@^6.5.11

# Expo dependencies
npm install expo@~50.0.0
npm install expo-auth-session@~5.4.0
npm install expo-local-authentication@~13.8.0
npm install expo-notifications@~0.27.0
npm install expo-secure-store@~12.8.1
npm install expo-status-bar@~1.11.1
npm install expo-location@~16.5.5
npm install expo-camera@~14.1.3
npm install expo-device@~5.9.4

# React Native core
npm install react-native@0.73.6
npm install react-native-safe-area-context@4.8.2
npm install react-native-screens@~3.29.0
npm install react-native-gesture-handler@~2.14.0
npm install react-native-reanimated@~3.6.2

# Utility libraries
npm install axios@^1.6.2
npm install @react-native-async-storage/async-storage@1.21.0
npm install react-hook-form@^7.48.2
npm install react-native-vector-icons@^10.0.3
npm install react-native-toast-message@^2.1.7
npm install react-native-maps@1.10.0

# Development dependencies
npm install --save-dev @expo/cli@0.17.8
npm install --save-dev @types/jest@^29.5.8
npm install --save-dev @types/react-native@^0.72.7
npm install --save-dev jest@^29.7.0
npm install --save-dev jest-expo@~50.0.1
npm install --save-dev @testing-library/react-native@^12.4.2
npm install --save-dev @testing-library/jest-native@^5.4.3

# Create environment file from example
if [ ! -f .env ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your actual API endpoints and keys."
fi

# Create assets directory
mkdir -p assets

# Create placeholder icon files
echo "🎨 Creating placeholder app icons..."
mkdir -p assets/images

# Download or create placeholder images (you should replace these with actual icons)
if command -v curl &> /dev/null; then
    echo "📱 Creating placeholder app icon (replace with your actual icon)..."
    # Create a simple colored square as placeholder (replace with actual icon)
    echo "Replace this with your actual app icon" > assets/icon.png
    echo "Replace this with your actual splash screen" > assets/splash.png
    echo "Replace this with your actual adaptive icon" > assets/adaptive-icon.png
    echo "Replace this with your actual favicon" > assets/favicon.png
fi

# Set up Expo development build
echo "🏗️  Initializing Expo project..."
if [ ! -f app.json ]; then
    echo "Creating app.json configuration..."
fi

# Install iOS dependencies (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v pod &> /dev/null; then
        echo "🍎 Installing iOS dependencies..."
        cd ios && pod install && cd ..
    else
        echo "⚠️  CocoaPods not found. Install it to run on iOS: sudo gem install cocoapods"
    fi
fi

echo "✅ Mobile app setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   cd mobile"
echo "   npm run mobile"
echo ""
echo "📱 To run on specific platforms:"
echo "   npm run mobile:ios     # iOS Simulator"
echo "   npm run mobile:android # Android Emulator"
echo ""
echo "🧪 To run tests:"
echo "   npm test"
echo ""
echo "⚠️  Remember to:"
echo "   1. Update .env file with your API endpoints"
echo "   2. Replace placeholder icons in assets/ directory"
echo "   3. Configure push notification certificates"
echo "   4. Set up Google Maps API key for location services"
echo ""
echo "📖 For more information, see the mobile app documentation."