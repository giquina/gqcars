import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/dashboard/HomeScreen';
import BookingsScreen from '../screens/booking/BookingsScreen';
import ServicesScreen from '../screens/services/ServicesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Booking Flow
import BookingFlowScreen from '../screens/booking/BookingFlowScreen';
import BookingDetailsScreen from '../screens/booking/BookingDetailsScreen';

// Other Screens
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import TrackingScreen from '../screens/tracking/TrackingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  const { colors } = useTheme();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.secondary,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.muted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="shield" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const { colors } = useTheme();

  if (isLoading) {
    // You could show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {!isAuthenticated ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="MainApp" component={MainTabs} />
            <Stack.Screen 
              name="BookingFlow" 
              component={BookingFlowScreen}
              options={{ headerShown: true, title: 'Book Service' }}
            />
            <Stack.Screen 
              name="BookingDetails" 
              component={BookingDetailsScreen}
              options={{ headerShown: true, title: 'Booking Details' }}
            />
            <Stack.Screen 
              name="Notifications" 
              component={NotificationsScreen}
              options={{ headerShown: true, title: 'Notifications' }}
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen}
              options={{ headerShown: true, title: 'Settings' }}
            />
            <Stack.Screen 
              name="Tracking" 
              component={TrackingScreen}
              options={{ headerShown: true, title: 'Live Tracking' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}