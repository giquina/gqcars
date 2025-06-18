import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useBookings } from '../../hooks/useBookings';
import { ServiceType, Booking } from '../../types';
import LoadingScreen from '../LoadingScreen';
import Toast from 'react-native-toast-message';

const QUICK_SERVICES = [
  {
    type: ServiceType.PRIVATE_HIRE,
    title: 'Private Hire',
    subtitle: 'Personal transport',
    icon: 'car-outline',
    color: '#000000',
  },
  {
    type: ServiceType.CORPORATE,
    title: 'Corporate',
    subtitle: 'Business travel',
    icon: 'business-outline',
    color: '#1e40af',
  },
  {
    type: ServiceType.VIP,
    title: 'VIP Service',
    subtitle: 'Luxury experience',
    icon: 'diamond-outline',
    color: '#dc2626',
  },
  {
    type: ServiceType.WEDDING,
    title: 'Weddings',
    subtitle: 'Special occasions',
    icon: 'heart-outline',
    color: '#be185d',
  },
];

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { bookings, isLoading, refreshing, refresh, error } = useBookings();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error,
      });
    }
  }, [error]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleQuickService = (serviceType: ServiceType) => {
    navigation.navigate('CreateBooking', { serviceType });
  };

  const handleViewAllBookings = () => {
    navigation.navigate('Bookings');
  };

  const handleBookingPress = (booking: Booking) => {
    navigation.navigate('BookingDetails', { bookingId: booking.id });
  };

  const recentBookings = bookings.slice(0, 3);

  if (isLoading && bookings.length === 0) {
    return <LoadingScreen message="Loading your dashboard..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.userName}>{user?.firstName || 'Guest'}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Quick Booking */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Booking</Text>
            <Text style={styles.sectionSubtitle}>Choose your service type</Text>
          </View>
          
          <View style={styles.servicesGrid}>
            {QUICK_SERVICES.map((service) => (
              <TouchableOpacity
                key={service.type}
                style={[styles.serviceCard, { borderColor: service.color }]}
                onPress={() => handleQuickService(service.type)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                  <Ionicons name={service.icon as any} size={24} color="#ffffff" />
                </View>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Bookings</Text>
            {bookings.length > 3 && (
              <TouchableOpacity onPress={handleViewAllBookings}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            )}
          </View>

          {recentBookings.length > 0 ? (
            <View style={styles.bookingsList}>
              {recentBookings.map((booking) => (
                <TouchableOpacity
                  key={booking.id}
                  style={styles.bookingCard}
                  onPress={() => handleBookingPress(booking)}
                >
                  <View style={styles.bookingHeader}>
                    <View style={[styles.statusBadge, getStatusStyle(booking.status)]}>
                      <Text style={[styles.statusText, getStatusTextStyle(booking.status)]}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.bookingDate}>
                      {new Date(booking.pickupDateTime).toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.bookingDetails}>
                    <View style={styles.locationRow}>
                      <Ionicons name="location-outline" size={16} color="#666666" />
                      <Text style={styles.locationText} numberOfLines={1}>
                        {booking.pickupLocation.address}
                      </Text>
                    </View>
                    
                    {booking.dropoffLocation && (
                      <View style={styles.locationRow}>
                        <Ionicons name="flag-outline" size={16} color="#666666" />
                        <Text style={styles.locationText} numberOfLines={1}>
                          {booking.dropoffLocation.address}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.bookingFooter}>
                    <Text style={styles.serviceTypeText}>
                      {booking.serviceType.replace('_', ' ').toUpperCase()}
                    </Text>
                    <Text style={styles.priceText}>£{booking.price.toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={48} color="#cccccc" />
              <Text style={styles.emptyStateText}>No recent bookings</Text>
              <Text style={styles.emptyStateSubtext}>
                Create your first booking to get started
              </Text>
            </View>
          )}
        </View>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.emergencyCard}>
            <View style={styles.emergencyIcon}>
              <Ionicons name="call" size={24} color="#dc2626" />
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>24/7 Support</Text>
              <Text style={styles.emergencySubtitle}>Need help? Call us anytime</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666666" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return { backgroundColor: '#10b981' };
    case 'pending':
      return { backgroundColor: '#f59e0b' };
    case 'cancelled':
      return { backgroundColor: '#ef4444' };
    case 'completed':
      return { backgroundColor: '#6366f1' };
    default:
      return { backgroundColor: '#6b7280' };
  }
};

const getStatusTextStyle = (status: string) => {
  return { color: '#ffffff' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  profileButton: {
    padding: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceSubtitle: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  bookingsList: {
    gap: 12,
  },
  bookingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  bookingDate: {
    fontSize: 12,
    color: '#666666',
  },
  bookingDetails: {
    marginBottom: 12,
    gap: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceTypeText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginBottom: 4,
  },
  emergencySubtitle: {
    fontSize: 14,
    color: '#991b1b',
  },
});