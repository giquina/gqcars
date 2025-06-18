# GQ Security Mobile App

A React Native mobile application for GQ Security Services, built with Expo and TypeScript.

## Features

### Authentication
- **Login Screen**: Secure user authentication with email/password
- **Register Screen**: Account creation with form validation
- **Password Security**: Minimum 6 characters, confirmation validation

### Main Application
- **Home Dashboard**: Quick stats, action buttons, and recent activity
- **Services Screen**: Browse available security services with search functionality
- **Bookings Screen**: Manage current and past bookings with filtering
- **Profile Screen**: User account management and app preferences

### Navigation
- **Tab Navigation**: Bottom tab bar for main screens
- **Stack Navigation**: Authentication flow and screen transitions
- **Responsive Design**: Optimized for both iOS and Android

## Tech Stack

- **React Native**: 0.72.6
- **Expo**: ~49.0.15
- **TypeScript**: ^5.1.3
- **React Navigation**: ^6.1.9
- **Vector Icons**: @expo/vector-icons

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Navigate to mobile directory**:
   ```bash
   cd mobile
   ```

2. **Run setup script**:
   ```bash
   chmod +x setup-mobile.sh
   ./setup-mobile.sh
   ```

3. **Manual setup alternative**:
   ```bash
   npm install
   npm install -g @expo/cli
   ```

### Development

1. **Start development server**:
   ```bash
   npm start
   ```

2. **Run on specific platforms**:
   ```bash
   npm run ios     # iOS Simulator
   npm run android # Android Emulator
   npm run web     # Web browser
   ```

3. **Test on physical device**:
   - Install Expo Go app
   - Scan QR code from terminal

## Project Structure

```
mobile/
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx      # Main navigation setup
│   │   ├── AuthNavigator.tsx     # Authentication flow
│   │   └── MainTabNavigator.tsx  # Main app tabs
│   └── screens/
│       ├── auth/
│       │   ├── LoginScreen.tsx
│       │   └── RegisterScreen.tsx
│       ├── dashboard/
│       │   └── HomeScreen.tsx
│       └── main/
│           ├── ServicesScreen.tsx
│           ├── BookingsScreen.tsx
│           └── ProfileScreen.tsx
├── App.tsx                       # App entry point
├── package.json                  # Dependencies
├── tsconfig.json                # TypeScript config
└── app.json                     # Expo config
```

## Screen Details

### LoginScreen
- Email/password authentication
- Form validation
- Navigation to registration
- Loading states

### RegisterScreen
- Account creation form
- Field validation (email, password confirmation)
- Terms acceptance
- Error handling

### HomeScreen
- Welcome message with user name
- Quick stats cards (bookings, services, spending)
- Action buttons for common tasks
- Recent activity feed

### ServicesScreen
- Service catalog with search
- Detailed service cards with features
- Pricing information
- Contact options for custom solutions

### BookingsScreen
- Tabbed interface (All, Upcoming, Completed)
- Booking status indicators
- Pull-to-refresh functionality
- Action buttons based on booking status

### ProfileScreen
- User profile with avatar
- Account statistics
- Settings categories (Account, Preferences, Support)
- Toggle switches for preferences
- Sign out and account deletion

## Design System

### Colors
- Primary: `#007AFF` (iOS Blue)
- Success: `#34C759` (iOS Green)
- Warning: `#FF9500` (iOS Orange)
- Error: `#FF3B30` (iOS Red)
- Background: `#f8f9fa`
- Text: `#1a1a1a`
- Secondary Text: `#666`

### Typography
- Headers: Bold, 18-28px
- Body: Regular, 14-16px
- Captions: Regular, 12-14px

### Spacing
- Small: 8px
- Medium: 16px
- Large: 24px
- Extra Large: 32px

## Navigation Flow

```
App
├── AuthNavigator (if not authenticated)
│   ├── LoginScreen
│   └── RegisterScreen
└── MainTabNavigator (if authenticated)
    ├── HomeScreen
    ├── ServicesScreen
    ├── BookingsScreen
    └── ProfileScreen
```

## Testing

### Manual Testing Checklist

#### Authentication Flow
- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Register new account
- [ ] Form validation works
- [ ] Navigation between login/register

#### Main App Navigation
- [ ] Bottom tab navigation works
- [ ] Screen transitions are smooth
- [ ] Back navigation works properly

#### Screen Functionality
- [ ] Home screen displays data
- [ ] Services search works
- [ ] Bookings filter correctly
- [ ] Profile settings respond

#### Responsive Design
- [ ] Works on different screen sizes
- [ ] Landscape orientation support
- [ ] Safe area handling

### Device Testing
- [ ] iOS Simulator
- [ ] Android Emulator
- [ ] Physical iOS device
- [ ] Physical Android device

## Development Notes

### State Management
- Currently using local state with useState
- Consider Redux or Zustand for complex state

### API Integration
- Placeholder API calls with setTimeout
- Replace with actual API endpoints
- Add error handling and loading states

### Assets
- Replace placeholder assets in `./assets/`
- Add app icon, splash screen, adaptive icon
- Optimize images for mobile

### Performance
- Implement lazy loading for screens
- Add image caching for better performance
- Consider code splitting for large apps

## Deployment

### iOS
1. Build with EAS Build
2. Submit to App Store Connect
3. TestFlight for beta testing

### Android
1. Build with EAS Build
2. Upload to Google Play Console
3. Internal testing track

## Troubleshooting

### Common Issues

1. **Metro bundler issues**:
   ```bash
   expo start --clear
   ```

2. **Dependencies not found**:
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **iOS simulator not opening**:
   ```bash
   expo install --ios
   ```

4. **Android emulator issues**:
   - Ensure Android Studio is installed
   - Create AVD in Android Studio
   - Start emulator before running expo

### Support
- Check Expo documentation
- React Navigation documentation
- Stack Overflow for specific issues

## Contributing

1. Follow TypeScript best practices
2. Use consistent naming conventions
3. Add proper error handling
4. Test on both platforms
5. Update documentation