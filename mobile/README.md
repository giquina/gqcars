# GQ Cars & Security Mobile App

A professional React Native mobile application for luxury car hire and security services, built with Expo and TypeScript.

## Features

### 🔐 Authentication
- Email/password login and registration
- Biometric authentication (Face ID/Touch ID)
- Secure token management with automatic refresh
- Password reset functionality

### 📱 Core Functionality
- **Booking Management**: Create, view, and manage service bookings
- **Real-time Updates**: Push notifications for booking status changes
- **Service Selection**: Multiple service types (Private Hire, Corporate, VIP, Wedding, Close Protection)
- **Location Services**: GPS integration for pickup/dropoff locations
- **Driver Tracking**: Real-time driver location and arrival notifications

### 🎨 User Experience
- **Professional UI**: Clean, modern interface with dark/light theme support
- **Loading States**: Comprehensive loading and error handling
- **Offline Support**: Basic offline functionality with data caching
- **Accessibility**: Full accessibility support for all users

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Hooks + Context
- **API Integration**: Axios with automatic token refresh
- **Local Storage**: AsyncStorage + SecureStore
- **Push Notifications**: Expo Notifications
- **Biometrics**: Expo Local Authentication
- **Maps**: React Native Maps
- **Testing**: Jest + React Native Testing Library

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gq-cars-security/mobile
   ```

2. **Run the setup script**
   ```bash
   chmod +x setup-mobile.sh
   ./setup-mobile.sh
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API endpoints and keys
   ```

4. **Start the development server**
   ```bash
   npm run mobile
   ```

### Manual Installation

If you prefer to install dependencies manually:

```bash
# Install dependencies
npm install

# Install additional React Native dependencies
npx expo install expo-local-authentication expo-notifications expo-secure-store
npx expo install expo-location expo-camera react-native-maps
npx expo install @react-navigation/native @react-navigation/native-stack
npx expo install @react-navigation/bottom-tabs react-native-safe-area-context
npx expo install react-native-screens react-native-gesture-handler

# Start development server
npm run mobile
```

## Project Structure

```
mobile/
├── src/
│   ├── types/           # TypeScript type definitions
│   ├── services/        # API and business logic services
│   │   ├── api.ts       # Main API service
│   │   ├── auth.ts      # Authentication service
│   │   └── notifications.ts # Push notification service
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.ts   # Authentication hook
│   │   └── useBookings.ts # Booking management hook
│   ├── navigation/      # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/         # Screen components
│   │   ├── auth/        # Authentication screens
│   │   ├── main/        # Main app screens
│   │   └── LoadingScreen.tsx
│   └── components/      # Reusable UI components
├── assets/              # Images, icons, fonts
├── __tests__/          # Test files
├── App.tsx             # Main app entry point
├── app.json            # Expo configuration
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Development

### Running the App

```bash
# Start Expo development server
npm run mobile

# Run on iOS simulator
npm run mobile:ios

# Run on Android emulator
npm run mobile:android

# Build for production
npm run mobile:build
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Code Quality

The project includes ESLint and Prettier for code quality:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## Configuration

### Environment Variables

Create a `.env` file with the following variables:

```env
EXPO_PUBLIC_API_URL=https://api.gqcarssecurity.com
EXPO_PUBLIC_PROJECT_ID=your-expo-project-id
EXPO_PUBLIC_WEB_CLIENT_ID=your-google-oauth-client-id
```

### Push Notifications

1. **Configure Expo Push Notifications**
   - Update `EXPO_PUBLIC_PROJECT_ID` in `.env`
   - Configure notification channels in `app.json`

2. **iOS Setup**
   - Add push notification capability in Xcode
   - Configure APNs certificates

3. **Android Setup**
   - Configure Firebase Cloud Messaging
   - Update `google-services.json`

### Maps Integration

1. **Google Maps API**
   - Get API key from Google Cloud Console
   - Enable Maps SDK for iOS/Android
   - Add API key to environment variables

2. **iOS Configuration**
   ```xml
   <!-- Add to ios/YourApp/Info.plist -->
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>This app uses location to provide accurate service estimates.</string>
   ```

3. **Android Configuration**
   ```xml
   <!-- Add to android/app/src/main/AndroidManifest.xml -->
   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
   ```

## API Integration

### Authentication Flow

1. **Login**: POST `/auth/login`
2. **Register**: POST `/auth/register`
3. **Refresh Token**: POST `/auth/refresh`
4. **Logout**: POST `/auth/logout`

### Booking Management

1. **Create Booking**: POST `/bookings`
2. **Get Bookings**: GET `/bookings`
3. **Update Booking**: PUT `/bookings/:id`
4. **Cancel Booking**: POST `/bookings/:id/cancel`

### Error Handling

The app includes comprehensive error handling:

- Network errors with retry logic
- Token refresh on 401 errors
- User-friendly error messages
- Offline state management

## Security

### Data Protection

- **Secure Storage**: Sensitive data stored in SecureStore
- **Token Management**: Automatic token refresh and secure storage
- **Biometric Authentication**: Face ID/Touch ID integration
- **API Security**: Request/response encryption

### Privacy

- **Location Privacy**: Location access only when needed
- **Data Minimization**: Only collect necessary user data
- **Local Storage**: Sensitive data encrypted locally

## Deployment

### Building for Production

```bash
# Build for iOS
npx expo build:ios

# Build for Android
npx expo build:android

# Build for both platforms
npm run mobile:build
```

### App Store Submission

1. **iOS App Store**
   - Configure app signing in Expo
   - Submit through App Store Connect
   - Handle App Store review requirements

2. **Google Play Store**
   - Generate signed APK/AAB
   - Upload to Play Console
   - Complete store listing

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

### Debugging

- Use Flipper for advanced debugging
- Enable remote debugging in development
- Use console.log and React Native Debugger

## Performance

### Optimization

- **Image Optimization**: Use WebP format for images
- **Bundle Size**: Code splitting and lazy loading
- **Memory Management**: Proper cleanup of subscriptions
- **Network**: Request batching and caching

### Monitoring

- **Crash Reporting**: Integrate with Sentry or Bugsnag
- **Analytics**: Track user behavior and app performance
- **Performance Metrics**: Monitor app startup and navigation times

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Style

- Use TypeScript for all new code
- Follow React Native best practices
- Write tests for critical functionality
- Document complex logic

## Support

For support and questions:

- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Contact**: Reach out to the development team

## License

This project is proprietary software. All rights reserved.

---

**GQ Cars & Security Mobile App** - Professional luxury transport at your fingertips.