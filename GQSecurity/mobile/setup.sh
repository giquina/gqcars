#!/bin/bash

echo "🚀 Setting up GQ Cars Mobile App..."

# Check if we're in the mobile directory
cd "$(dirname "$0")"

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI..."
    npm install -g @expo/cli
fi

# Install project dependencies
echo "📦 Installing dependencies..."
npm install

# Install additional required packages
echo "📦 Installing additional packages..."
npm install @react-navigation/native@^6.1.9
npm install @react-navigation/native-stack@^6.9.17
npm install @react-navigation/bottom-tabs@^6.5.11
npm install react-native-screens@~3.24.0
npm install react-native-safe-area-context@4.6.3
npm install react-native-vector-icons@^10.0.2
npm install expo-local-authentication@~13.4.1
npm install expo-location@~16.1.0
npm install expo-notifications@~0.20.1
npm install expo-secure-store@~12.3.1
npm install react-native-maps@1.7.1
npm install expo-payments-stripe@~14.0.1
npm install react-native-reanimated@~3.3.0
npm install react-native-gesture-handler@~2.12.0
npm install expo-blur@~12.4.1
npm install expo-haptics@~12.4.0
npm install expo-camera@~13.4.4
npm install expo-media-library@~15.4.1
npm install expo-image-picker@~14.3.2
npm install expo-sms@~11.3.0
npm install expo-linking@~5.0.2
npm install expo-web-browser@~12.3.2
npm install @react-native-async-storage/async-storage@1.18.2
npm install react-native-modal@^13.0.1
npm install react-native-animatable@^1.3.3
npm install lottie-react-native@6.0.1
npm install expo-av@~13.4.1
npm install expo-font@~11.4.0

# Install development dependencies
echo "📦 Installing dev dependencies..."
npm install --save-dev @babel/core@^7.20.0
npm install --save-dev @types/react@~18.2.14
npm install --save-dev @types/react-native@~0.72.2
npm install --save-dev typescript@^5.1.3

# Create necessary directories if they don't exist
echo "📁 Creating directory structure..."
mkdir -p assets
mkdir -p src/screens/services
mkdir -p src/screens/profile
mkdir -p src/screens/notifications
mkdir -p src/screens/settings
mkdir -p src/screens/tracking
mkdir -p src/services
mkdir -p src/utils
mkdir -p src/hooks
mkdir -p src/types

# Create basic asset files
echo "🎨 Creating basic assets..."
# Note: You'll need to add actual icon and splash screen images
touch assets/icon.png
touch assets/splash.png
touch assets/adaptive-icon.png
touch assets/favicon.png

# Create TypeScript configuration
echo "⚙️  Creating TypeScript config..."
cat > tsconfig.json << 'EOF'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "react-native",
    "lib": ["dom", "esnext"],
    "moduleResolution": "node",
    "noEmit": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  }
}
EOF

# Create babel config
echo "⚙️  Creating Babel config..."
cat > babel.config.js << 'EOF'
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
    ],
  };
};
EOF

# Create metro config for React Native
echo "⚙️  Creating Metro config..."
cat > metro.config.js << 'EOF'
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
EOF

# Create EAS build configuration
echo "⚙️  Creating EAS build config..."
cat > eas.json << 'EOF'
{
  "cli": {
    "version": ">= 5.8.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {}
  }
}
EOF

# Create a simple start script
echo "📝 Creating start scripts..."
cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Starting GQ Cars Mobile App..."
expo start
EOF

chmod +x start.sh

cat > start-ios.sh << 'EOF'
#!/bin/bash
echo "📱 Starting GQ Cars Mobile App on iOS..."
expo start --ios
EOF

chmod +x start-ios.sh

cat > start-android.sh << 'EOF'
#!/bin/bash
echo "🤖 Starting GQ Cars Mobile App on Android..."
expo start --android
EOF

chmod +x start-android.sh

echo ""
echo "✅ Setup complete!"
echo ""
echo "📱 GQ Cars Mobile App is ready!"
echo ""
echo "To start development:"
echo "  1. cd GQSecurity/mobile"
echo "  2. ./start.sh (or expo start)"
echo "  3. Scan QR code with Expo Go app"
echo ""
echo "For iOS Simulator: ./start-ios.sh"
echo "For Android Emulator: ./start-android.sh"
echo ""
echo "🔧 Next steps:"
echo "  1. Add your Google Maps API key to app.json"
echo "  2. Add actual app icons and splash screen"
echo "  3. Configure push notifications"
echo "  4. Set up backend API endpoints"
echo ""
echo "🎉 Happy coding!"