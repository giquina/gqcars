# 📱 Mobile App Preparation for GQ Cars

## 🎯 **REACT NATIVE MOBILE APP DEVELOPMENT PLAN**

### **App Overview: GQ Cars Mobile Security Transport**
A companion mobile app for GQ Cars' security transport services, designed for both clients and security professionals.

---

## 📱 **MOBILE APP ARCHITECTURE**

### **Technology Stack**
- **Framework:** React Native (Expo) for cross-platform development
- **Navigation:** React Navigation 6 with stack & tab navigation
- **State Management:** Zustand (consistent with web app)
- **API Client:** Shared with web app (Axios + React Query)
- **Authentication:** Supabase Auth (shared with web)
- **Maps:** React Native Maps with Google Maps integration
- **Real-time:** Supabase Realtime for live tracking
- **Push Notifications:** Expo Notifications
- **Offline Support:** React Query with persistence

### **App Features Roadmap**

#### **Phase 1: Core Features (MVP)**
1. **User Authentication** - Login/Register with biometric support
2. **Service Booking** - Simplified mobile booking flow
3. **Real-time Tracking** - Live vehicle location tracking
4. **Push Notifications** - Booking confirmations, driver updates
5. **Profile Management** - User preferences and history

#### **Phase 2: Enhanced Features**
1. **QR Code Booking** - Quick booking via QR codes
2. **Emergency Features** - Panic button, emergency contacts
3. **Driver Communication** - In-app messaging with driver
4. **Payment Integration** - Mobile payments via Stripe
5. **Security Dashboard** - Real-time security status

#### **Phase 3: Advanced Features**
1. **Offline Mode** - Essential features without internet
2. **Advanced Tracking** - Route optimization, ETA updates
3. **Multi-language Support** - International client support
4. **Corporate Features** - Business account management
5. **Analytics Dashboard** - Usage insights and reporting

---

## 🛠️ **SHARED CODE ARCHITECTURE**

### **Directory Structure**
```
gqcars-main-production/
├── apps/
│   ├── web/                    # Next.js web application
│   └── mobile/                 # React Native mobile app
│       ├── app/               # Expo Router app directory
│       ├── components/        # Mobile-specific components
│       ├── screens/           # Screen components
│       ├── navigation/        # Navigation configuration
│       └── assets/            # Mobile assets
├── packages/
│   ├── shared/                # Shared code between web & mobile
│   │   ├── api/              # API client and endpoints
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── constants/        # App constants
│   │   ├── validation/       # Form validation schemas
│   │   └── hooks/            # Shared React hooks
│   ├── ui-mobile/            # Mobile UI component library
│   └── analytics/            # Shared analytics utilities
└── shared/                    # Additional shared resources
    ├── assets/               # Shared images, icons
    ├── docs/                 # Shared documentation
    └── scripts/              # Development scripts
```

---

## 🔧 **SHARED UTILITIES IMPLEMENTATION**

### **1. Shared API Client**

Create `/packages/shared/api/client.ts`:
```typescript
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';

// API configuration
const API_CONFIG = {
  baseURL: process.env.NODE_ENV === 'production' 
    ? 'https://gqcars.vercel.app/api'
    : Platform.OS === 'web' 
      ? 'http://localhost:3000/api'
      : 'http://10.0.2.2:3000/api', // Android emulator localhost
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': Platform.OS,
    'X-App-Version': '1.0.0'
  }
};

// Create axios instance
export const apiClient: AxiosInstance = axios.create(API_CONFIG);

// Request interceptor for authentication
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get auth token (platform-specific)
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      // Add request timestamp
      config.headers['X-Request-Time'] = new Date().toISOString();
      
      return config;
    } catch (error) {
      console.error('API Request interceptor error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        await refreshAuthToken();
        const newToken = await getAuthToken();
        
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Redirect to login
        await handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Platform-specific auth token retrieval
async function getAuthToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    // Web: Use localStorage or cookies
    return localStorage.getItem('auth_token');
  } else {
    // Mobile: Use AsyncStorage or Keychain
    const AsyncStorage = require('@react-native-async-storage/async-storage');
    return AsyncStorage.getItem('auth_token');
  }
}

// Platform-specific token refresh
async function refreshAuthToken(): Promise<void> {
  // Implement token refresh logic
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    const response = await axios.post('/auth/refresh', { refreshToken });
    await storeAuthToken(response.data.accessToken);
  }
}

// Platform-specific auth failure handling
async function handleAuthFailure(): Promise<void> {
  if (Platform.OS === 'web') {
    window.location.href = '/auth/login';
  } else {
    // Mobile: Navigate to login screen
    const { NavigationService } = require('../navigation/NavigationService');
    NavigationService.navigate('Login');
  }
}
```

### **2. Shared Type Definitions**

Create `/packages/shared/types/index.ts`:
```typescript
// User types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  defaultPayment?: string;
  favoriteLocations: Location[];
  securityLevel: SecurityLevel;
}

// Booking types
export interface Booking {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: BookingStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  scheduledTime: string;
  estimatedPrice: number;
  actualPrice?: number;
  driver?: Driver;
  vehicle?: Vehicle;
  securityAssessment?: SecurityAssessment;
  createdAt: string;
  updatedAt: string;
}

export type ServiceType = 
  | 'airport-transfer'
  | 'close-protection'
  | 'corporate-transport'
  | 'diplomatic-services'
  | 'family-office'
  | 'lifestyle-management'
  | 'private-hire'
  | 'professional-support'
  | 'shopping-assistance'
  | 'taxi-services'
  | 'vip-transport'
  | 'wedding-transport';

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'assigned'
  | 'en-route'
  | 'arrived'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export type SecurityLevel = 'standard' | 'enhanced' | 'executive' | 'diplomatic';

// Location types
export interface Location {
  id?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  postcode?: string;
  type?: LocationType;
}

export type LocationType = 'pickup' | 'dropoff' | 'waypoint' | 'favorite';

// Driver and Vehicle types
export interface Driver {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  rating: number;
  licenseNumber: string;
  siaLicense: string;
  status: DriverStatus;
  currentLocation?: Location;
}

export type DriverStatus = 'available' | 'busy' | 'offline' | 'break';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  type: VehicleType;
  features: VehicleFeature[];
  location?: Location;
}

export type VehicleType = 'sedan' | 'suv' | 'luxury' | 'armored' | 'van';
export type VehicleFeature = 'wifi' | 'privacy-glass' | 'armor' | 'gps' | 'camera';

// Security Assessment types
export interface SecurityAssessment {
  id: string;
  bookingId: string;
  riskLevel: RiskLevel;
  threatFactors: ThreatFactor[];
  protectionLevel: SecurityLevel;
  recommendations: string[];
  assessmentDate: string;
  validUntil: string;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type ThreatFactor = 
  | 'public-profile'
  | 'high-value-target'
  | 'previous-incidents'
  | 'controversial-business'
  | 'international-travel'
  | 'political-exposure'
  | 'media-attention'
  | 'family-concerns';

// Notification types
export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  bookingUpdates: boolean;
  driverMessages: boolean;
  promotions: boolean;
}

export interface PushNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  createdAt: string;
  read: boolean;
}

export type NotificationType = 
  | 'booking-confirmed'
  | 'driver-assigned'
  | 'driver-arrived'
  | 'trip-started'
  | 'trip-completed'
  | 'payment-processed'
  | 'emergency-alert'
  | 'system-message';

// Payment types
export interface PaymentMethod {
  id: string;
  type: PaymentType;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export type PaymentType = 'card' | 'apple-pay' | 'google-pay' | 'corporate-account';

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types for validation
export interface BookingFormData {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  bookingDate: string;
  bookingTime: string;
  passengers: number;
  specialRequirements?: string;
  securityLevel?: SecurityLevel;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

// Real-time tracking types
export interface TrackingUpdate {
  bookingId: string;
  driverLocation: Location;
  estimatedArrival: string;
  status: BookingStatus;
  message?: string;
  timestamp: string;
}

// Emergency types
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export interface EmergencyAlert {
  id: string;
  userId: string;
  bookingId?: string;
  type: EmergencyType;
  location: Location;
  message?: string;
  status: EmergencyStatus;
  createdAt: string;
  resolvedAt?: string;
}

export type EmergencyType = 'panic-button' | 'medical' | 'security-threat' | 'vehicle-breakdown';
export type EmergencyStatus = 'active' | 'acknowledged' | 'resolved' | 'false-alarm';
```

### **3. Shared Validation Schemas**

Create `/packages/shared/validation/schemas.ts`:
```typescript
import { z } from 'zod';

// Re-export existing validation schemas from security module
export { securitySchemas } from '../../apps/web/src/lib/security/validation';

// Mobile-specific validation schemas
export const mobileSchemas = {
  // Quick booking for mobile
  quickBooking: z.object({
    pickupLocation: z.string().min(1, 'Pickup location required'),
    dropoffLocation: z.string().min(1, 'Dropoff location required'),
    serviceType: z.enum(['taxi-services', 'private-hire', 'airport-transfer']),
    bookingTime: z.enum(['now', 'scheduled']),
    scheduledTime: z.string().optional(),
    passengers: z.number().min(1).max(8).default(1)
  }),

  // Emergency contact form
  emergencyContact: z.object({
    name: z.string().min(2, 'Name required').max(100, 'Name too long'),
    phone: z.string().regex(/^(\+44|0)[1-9]\d{8,9}$/, 'Invalid UK phone number'),
    relationship: z.string().min(1, 'Relationship required'),
    isPrimary: z.boolean().default(false)
  }),

  // Push notification preferences
  notificationSettings: z.object({
    push: z.boolean().default(true),
    email: z.boolean().default(true), 
    sms: z.boolean().default(false),
    bookingUpdates: z.boolean().default(true),
    driverMessages: z.boolean().default(true),
    promotions: z.boolean().default(false)
  }),

  // Biometric settings
  biometricSettings: z.object({
    enabled: z.boolean().default(false),
    type: z.enum(['fingerprint', 'face-id', 'none']).default('none'),
    fallbackToPin: z.boolean().default(true)
  })
};
```

---

## 📱 **REACT NATIVE APP SETUP**

### **Expo Project Configuration**

Create `/apps/mobile/app.json`:
```json
{
  "expo": {
    "name": "GQ Cars Security Transport",
    "slug": "gq-cars-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1e3a8a"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gqcars.mobile",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "GQ Cars needs location access to provide accurate pickup and tracking services.",
        "NSLocationAlwaysAndWhenInUseUsageDescription": "GQ Cars needs location access for real-time tracking and safety features.",
        "NSCameraUsageDescription": "GQ Cars needs camera access to scan QR codes for quick booking.",
        "NSFaceIDUsageDescription": "GQ Cars uses Face ID for secure authentication.",
        "NSContactsUsageDescription": "GQ Cars needs contacts access to add emergency contacts."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1e3a8a"
      },
      "package": "com.gqcars.mobile",
      "versionCode": 1,
      "permissions": [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "CAMERA",
        "READ_CONTACTS",
        "WRITE_CONTACTS",
        "USE_FINGERPRINT",
        "USE_BIOMETRIC"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      "expo-router",
      "expo-location",
      "expo-camera",
      "expo-notifications",
      "expo-secure-store",
      "expo-local-authentication",
      "@react-native-google-signin/google-signin"
    ],
    "scheme": "gqcars",
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "gq-cars-mobile-id"
      }
    }
  }
}
```

### **Package.json for Mobile App**

Create `/apps/mobile/package.json`:
```json
{
  "name": "@gqcars/mobile",
  "version": "1.0.0",
  "private": true,
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "start:dev": "expo start --dev-client",
    "start:tunnel": "expo start --tunnel",
    "build:ios": "eas build --platform ios",
    "build:android": "eas build --platform android",
    "build:all": "eas build --platform all",
    "submit:ios": "eas submit --platform ios",
    "submit:android": "eas submit --platform android",
    "test": "jest",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@expo/vector-icons": "^14.0.0",
    "@react-native-async-storage/async-storage": "1.23.1",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/stack": "^6.3.17",
    "@react-navigation/bottom-tabs": "^6.5.8",
    "@supabase/supabase-js": "^2.39.7",
    "@tanstack/react-query": "^5.28.4",
    "axios": "^1.6.8",
    "expo": "~51.0.0",
    "expo-router": "~3.5.14",
    "expo-status-bar": "~1.12.1",
    "expo-location": "~17.0.1",
    "expo-camera": "~15.0.5",
    "expo-notifications": "~0.28.1",
    "expo-secure-store": "~13.0.1",
    "expo-local-authentication": "~14.0.1",
    "expo-linear-gradient": "~13.0.2",
    "react": "18.2.0",
    "react-native": "0.74.1",
    "react-native-safe-area-context": "4.10.1",
    "react-native-screens": "3.31.1",
    "react-native-gesture-handler": "~2.16.1",
    "react-native-reanimated": "~3.10.1",
    "react-native-maps": "1.14.0",
    "react-native-svg": "15.2.0",
    "zustand": "^4.5.2",
    "zod": "^3.22.4",
    "date-fns": "^3.6.0"
  },
  "devDependencies": {
    "@types/react": "~18.2.79",
    "@types/react-native": "^0.73.0",
    "@typescript-eslint/eslint-plugin": "^7.7.0",
    "@typescript-eslint/parser": "^7.7.0",
    "eslint": "^8.57.0",
    "eslint-config-expo": "^7.0.0",
    "jest": "^29.7.0",
    "typescript": "~5.3.3"
  }
}
```

---

## 🔧 **SHARED UTILITIES & HOOKS**

### **Shared React Hooks**

Create `/packages/shared/hooks/useBooking.ts`:
```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../api/client';
import type { Booking, BookingFormData, ApiResponse } from '../types';

export const useBookings = (userId?: string) => {
  return useQuery({
    queryKey: ['bookings', userId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<Booking[]>>('/bookings');
      return response.data.data || [];
    },
    enabled: !!userId
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (bookingData: BookingFormData) => {
      const response = await apiClient.post<ApiResponse<Booking>>('/bookings', bookingData);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    }
  });
};

export const useBookingTracking = (bookingId: string) => {
  return useQuery({
    queryKey: ['booking-tracking', bookingId],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<any>>(`/bookings/${bookingId}/tracking`);
      return response.data.data;
    },
    refetchInterval: 10000, // Refetch every 10 seconds
    enabled: !!bookingId
  });
};
```

### **Location Utilities**

Create `/packages/shared/utils/location.ts`:
```typescript
import { Platform } from 'react-native';

export interface LocationPermission {
  granted: boolean;
  canAskAgain?: boolean;
}

export const requestLocationPermission = async (): Promise<LocationPermission> => {
  if (Platform.OS === 'web') {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ granted: false });
        return;
      }
      
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        resolve({ granted: result.state === 'granted' });
      });
    });
  } else {
    // Mobile implementation
    const { Location } = require('expo-location');
    const { status } = await Location.requestForegroundPermissionsAsync();
    return { 
      granted: status === 'granted',
      canAskAgain: status !== 'denied'
    };
  }
};

export const getCurrentLocation = async (): Promise<{latitude: number; longitude: number} | null> => {
  try {
    const permission = await requestLocationPermission();
    if (!permission.granted) {
      throw new Error('Location permission not granted');
    }

    if (Platform.OS === 'web') {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => reject(error),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } else {
      const { Location } = require('expo-location');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    }
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};
```

---

## 📱 **MOBILE-SPECIFIC FEATURES**

### **QR Code Booking Component**

Create `/apps/mobile/components/QRCodeBooking.tsx`:
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';

interface QRCodeBookingProps {
  onBookingData: (data: any) => void;
}

export const QRCodeBooking: React.FC<QRCodeBookingProps> = ({ onBookingData }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    
    try {
      // Parse QR code data (expecting JSON with booking information)
      const bookingData = JSON.parse(data);
      
      if (bookingData.serviceType && bookingData.location) {
        onBookingData(bookingData);
        Alert.alert(
          'QR Code Scanned',
          `Service: ${bookingData.serviceType}\nLocation: ${bookingData.location}`,
          [
            { text: 'Cancel', onPress: () => setScanned(false) },
            { text: 'Book Now', onPress: () => router.push('/booking/quick') }
          ]
        );
      } else {
        Alert.alert('Invalid QR Code', 'This QR code is not valid for GQ Cars booking.');
        setScanned(false);
      }
    } catch (error) {
      Alert.alert('Invalid QR Code', 'Unable to read QR code data.');
      setScanned(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr', 'pdf417'],
        }}
      >
        <View style={styles.overlay}>
          <View style={styles.scanArea} />
          <Text style={styles.instructions}>
            Point your camera at a GQ Cars QR code to book instantly
          </Text>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  instructions: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
});
```

---

## 🔧 **DEVELOPMENT SCRIPTS**

### **Setup Script for Mobile Development**

Create `/scripts/setup-mobile.sh`:
```bash
#!/bin/bash
# GQ Cars Mobile App Setup Script

echo "🚀 Setting up GQ Cars Mobile Development Environment..."

# 1. Install Expo CLI globally
echo "📱 Installing Expo CLI..."
npm install -g expo-cli @expo/cli

# 2. Create mobile app directory structure
echo "📁 Creating mobile app structure..."
mkdir -p apps/mobile/{app,components,screens,navigation,assets,constants}
mkdir -p packages/shared/{api,types,utils,hooks,constants,validation}
mkdir -p packages/ui-mobile/{components,styles,themes}

# 3. Initialize Expo project
echo "🎯 Initializing Expo project..."
cd apps/mobile
npx create-expo-app@latest . --template blank-typescript
cd ../..

# 4. Install shared dependencies
echo "📦 Installing shared dependencies..."
cd packages/shared
npm init -y
npm install axios @tanstack/react-query zod date-fns
npm install -D typescript @types/node
cd ../..

# 5. Setup TypeScript configuration
echo "⚙️ Setting up TypeScript configuration..."
cat > tsconfig.json << EOF
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@shared/*": ["packages/shared/*"],
      "@ui-mobile/*": ["packages/ui-mobile/*"],
      "@mobile/*": ["apps/mobile/*"]
    }
  },
  "include": [
    "apps/mobile/**/*",
    "packages/shared/**/*",
    "packages/ui-mobile/**/*"
  ],
  "exclude": [
    "node_modules",
    "apps/web"
  ]
}
EOF

# 6. Setup EAS configuration
echo "🔧 Setting up EAS Build configuration..."
cd apps/mobile
cat > eas.json << EOF
{
  "cli": {
    "version": ">= 5.4.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
EOF
cd ../..

# 7. Create environment configuration
echo "🔑 Setting up environment configuration..."
cd apps/mobile
cat > .env.example << EOF
# API Configuration
API_BASE_URL=http://localhost:3000/api
API_TIMEOUT=30000

# Supabase Configuration
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Stripe
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# App Configuration
APP_SCHEME=gqcars
APP_VERSION=1.0.0
EOF
cd ../..

echo "✅ Mobile development environment setup complete!"
echo ""
echo "Next steps:"
echo "1. Copy .env.example to .env and fill in your API keys"
echo "2. Run 'cd apps/mobile && npm start' to start development"
echo "3. Install Expo Go app on your mobile device"
echo "4. Scan QR code to test on device"
```

---

## ✅ **MOBILE APP CHECKLIST**

### **Phase 1 Implementation:**
- [ ] Setup Expo React Native project
- [ ] Configure shared code architecture
- [ ] Implement basic navigation
- [ ] Add authentication with Supabase
- [ ] Create booking flow screens
- [ ] Implement location services
- [ ] Add push notifications
- [ ] Test on iOS and Android

### **Integration Testing:**
- [ ] API client working with shared backend
- [ ] Authentication flow consistent with web
- [ ] Real-time features functioning
- [ ] Push notifications delivered
- [ ] Location tracking accurate
- [ ] QR code scanning working

### **Performance & Security:**
- [ ] App bundle size optimized
- [ ] Offline functionality working
- [ ] Biometric authentication setup
- [ ] Secure storage implemented
- [ ] API calls properly secured
- [ ] Location data encrypted

---

## 🚀 **DEPLOYMENT PIPELINE**

### **Build & Distribution:**
1. **Development Builds** - Internal testing with Expo Go
2. **Preview Builds** - Stakeholder testing via TestFlight/Play Console
3. **Production Builds** - App Store/Play Store submission
4. **OTA Updates** - Minor updates via Expo Updates

### **App Store Requirements:**
- **iOS:** Apple Developer Account, App Store guidelines compliance
- **Android:** Google Play Console, Play Store policies compliance
- **Metadata:** App descriptions, screenshots, privacy policy
- **Testing:** Beta testing via TestFlight/Internal Testing

---

**📱 Complete mobile app development plan ready for GQ Cars expansion!**

*Development Time: ~8-12 weeks | Platform: iOS & Android | Framework: React Native (Expo)*