import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { Booking } from '../../../shared/src/types';

export default function BookingsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Mock data for demonstration
      const mockBookings: Booking[] = [
        {
          id: '1',
          userId: 'user1',
          serviceType: 'private-hire',
          status: 'completed',
          startDate: new Date('2024-01-15T10:00:00'),
          endDate: new Date('2024-01-15T12:00:00'),
          location: 'London City Airport to Mayfair',
          requirements: 'Premium vehicle required',
          totalPrice: 150,
        },
        {
          id: '2',
          userId: 'user1',
          serviceType: 'close-protection',
          status: 'confirmed',
          startDate: new Date('2024-01-25T14:00:00'),
          endDate: new Date('2024-01-25T18:00:00'),
          location: 'Business Conference - London',
          requirements: 'Level 2 protection',
          officers: 2,
          totalPrice: 800,
        },
        {
          id: '3',
          userId: 'user1',
          serviceType: 'vip',
          status: 'pending',
          startDate: new Date('2024-02-01T19:00:00'),
          endDate: new Date('2024-02-01T23:00:00'),
          location: 'Royal Opera House',
          requirements: 'VIP treatment required',
          totalPrice: 1200,
        },
      ];
      
      setBookings(mockBookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  };

  const filteredBookings = bookings.filter(booking => {
    switch (activeFilter) {
      case 'active':
        return ['pending', 'confirmed', 'in-progress'].includes(booking.status);
      case 'completed':
        return ['completed', 'cancelled'].includes(booking.status);
      default:
        return true;
    }
  });

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return colors.confirmed;
      case 'pending': return colors.pending;
      case 'in-progress': return colors.inProgress;
      case 'completed': return colors.completed;
      case 'cancelled': return colors.cancelled;
      default: return colors.text.muted;
    }
  };

  const renderBooking = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', { booking: item })}
    >
      <View style={styles.bookingHeader}>
        <Text style={styles.serviceType}>
          {item.serviceType.replace('-', ' ').toUpperCase()}
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.location}>{item.location}</Text>
      
      <View style={styles.bookingFooter}>
        <Text style={styles.date}>
          {new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(item.startDate)}
        </Text>
        <Text style={styles.price}>£{item.totalPrice}</Text>
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    filterContainer: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 16,
      gap: 12,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    filterText: {
      color: colors.text.muted,
      fontSize: 14,
      fontWeight: '500',
    },
    filterTextActive: {
      color: colors.text.inverse,
    },
    bookingCard: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      marginBottom: 12,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    bookingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    serviceType: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    statusText: {
      fontSize: 10,
      fontWeight: '600',
      color: colors.text.primary,
    },
    location: {
      fontSize: 14,
      color: colors.text.secondary,
      marginBottom: 12,
    },
    bookingFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    date: {
      fontSize: 12,
      color: colors.text.muted,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text.muted,
      textAlign: 'center',
      marginTop: 16,
    },
    fab: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        {[
          { key: 'all', label: 'All' },
          { key: 'active', label: 'Active' },
          { key: 'completed', label: 'History' },
        ].map(filter => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              activeFilter === filter.key && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter(filter.key as any)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter.key && styles.filterTextActive,
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredBookings.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="calendar-blank" size={64} color={colors.text.muted} />
          <Text style={styles.emptyText}>
            {activeFilter === 'all' 
              ? "No bookings yet. Tap the + button to create your first booking."
              : `No ${activeFilter} bookings found.`
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('BookingFlow')}
      >
        <Icon name="plus" size={24} color={colors.text.inverse} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}