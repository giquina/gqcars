import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import { RootStackParamList, AuthStackParamList, MainTabParamList } from '../types';
import { useAuth } from '../hooks/useAuth';
import LoadingScreen from '../screens/LoadingScreen';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import BiometricSetupScreen from '../screens/auth/BiometricSetupScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import BookingsScreen from '../screens/main/BookingsScreen';
import ServicesScreen from '../screens/main/ServicesScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import BookingDetailsScreen from '../screens/main/BookingDetailsScreen';
import CreateBookingScreen from '../screens/main/CreateBookingScreen';
import VehicleSelectionScreen from '../screens/main/VehicleSelectionScreen';

// Initialize notification service
import notificationService from '../services/notifications';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="BiometricSetup" component={BiometricSetupScreen} />
    </AuthStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Bookings':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Services':
              iconName = focused ? 'car' : 'car-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e0e0e0',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Bookings" component={BookingsScreen} />
      <MainTab.Screen name="Services" component={ServicesScreen} />
      <MainTab.Screen name="Profile" component={ProfileScreen} />
    </MainTab.Navigator>
  );
}

function MainNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <RootStack.Screen name="Main" component={MainTabNavigator} />
      <RootStack.Screen 
        name="BookingDetails" 
        component={BookingDetailsScreen}
        options={{
          headerShown: true,
          title: 'Booking Details',
          headerBackTitleVisible: false,
        }}
      />
      <RootStack.Screen 
        name="CreateBooking" 
        component={CreateBookingScreen}
        options={{
          headerShown: true,
          title: 'New Booking',
          headerBackTitleVisible: false,
        }}
      />
      <RootStack.Screen 
        name="VehicleSelection" 
        component={VehicleSelectionScreen}
        options={{
          headerShown: true,
          title: 'Select Vehicle',
          headerBackTitleVisible: false,
        }}
      />
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Initialize notification service
    if (user) {
      notificationService.initialize();
    }
  }, [user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <NavigationContainer>
        {user ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
      <Toast />
    </>
  );
}