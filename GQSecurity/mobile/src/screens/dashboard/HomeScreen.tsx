import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from '../../context/LocationContext';
import { useNotifications } from '../../context/NotificationContext';
import QuickBookingCard from '../../components/booking/QuickBookingCard';
import ServiceCard from '../../components/services/ServiceCard';
import RecentBookings from '../../components/booking/RecentBookings';
import EmergencyButton from '../../components/emergency/EmergencyButton';
import { ServiceType } from '../../../shared/src/types';

const QUICK_SERVICES: { type: ServiceType; name: string; icon: string; description: string }[] = [
  {
    type: 'private-hire',
    name: 'Private Hire',
    icon: 'car-luxury',
    description: 'Premium chauffeur service',
  },
  {
    type: 'close-protection',
    name: 'Close Protection',
    icon: 'shield-account',
    description: 'Personal security service',
  },
  {
    type: 'corporate',
    name: 'Corporate',
    icon: 'office-building',
    description: 'Business transport',
  },
  {
    type: 'vip',
    name: 'VIP Service',
    icon: 'crown',
    description: 'Exclusive luxury service',
  },
];

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { colors } = useTheme();
  const { location, requestPermission } = useLocation();
  const { unreadCount } = useNotifications();
  const [refreshing, setRefreshing] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    requestLocationPermission();
    checkCurrentBooking();
  }, []);

  const requestLocationPermission = async () => {
    const granted = await requestPermission();
    if (!granted) {
      Alert.alert(
        'Location Required',
        'GQ Cars needs location access to provide the best service. Please enable location in settings.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Settings', onPress: () => {/* Open settings */} },
        ]
      );
    }
  };

  const checkCurrentBooking = async () => {
    // Fetch current/active booking from API
    try {
      // const response = await fetch('https://api.gqcars.com/bookings/current');
      // const booking = await response.json();
      // setCurrentBooking(booking);
    } catch (error) {
      console.error('Failed to check current booking:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await checkCurrentBooking();
    setRefreshing(false);
  };

  const handleQuickBook = (serviceType: ServiceType) => {
    navigation.navigate('BookingFlow', { serviceType });
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergency',
      'This will alert our security team and emergency services. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes, Emergency!', style: 'destructive', onPress: triggerEmergency },
      ]
    );
  };

  const triggerEmergency = () => {
    // Implement emergency protocol
    // - Send location to emergency services
    // - Alert GQ Cars control center
    // - Start recording audio/video
    // - Send SMS to emergency contacts
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      paddingTop: 10,
    },
    greeting: {
      flex: 1,
    },
    greetingText: {
      fontSize: 16,
      color: colors.text.muted,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginTop: 4,
    },
    notificationButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: colors.card,
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: 2,
      right: 2,
      backgroundColor: colors.error,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    badgeText: {
      color: colors.text.primary,
      fontSize: 12,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 16,
      paddingHorizontal: 20,
    },
    quickServices: {
      paddingHorizontal: 20,
    },
    servicesGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    emergencySection: {
      paddingHorizontal: 20,
      alignItems: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Good {getTimeGreeting()}</Text>
          <Text style={styles.userName}>{user?.name || 'Guest'}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Icon name="bell" size={24} color={colors.text.primary} />
          {unreadCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{unreadCount > 99 ? '99+' : unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {currentBooking && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Current Booking</Text>
            {/* Current booking component */}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Booking</Text>
          <QuickBookingCard
            location={location}
            onBookNow={() => navigation.navigate('BookingFlow')}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.quickServices}>
            <View style={styles.servicesGrid}>
              {QUICK_SERVICES.map((service) => (
                <ServiceCard
                  key={service.type}
                  service={service}
                  onPress={() => handleQuickBook(service.type)}
                />
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <RecentBookings onBookingPress={(booking) => navigation.navigate('BookingDetails', { booking })} />
        </View>

        <View style={styles.emergencySection}>
          <EmergencyButton onPress={handleEmergency} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}