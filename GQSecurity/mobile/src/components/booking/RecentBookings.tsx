import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../context/ThemeContext';
import { Booking } from '../../../shared/src/types';

interface RecentBookingsProps {
  onBookingPress: (booking: Booking) => void;
}

export default function RecentBookings({ onBookingPress }: RecentBookingsProps) {
  const { colors } = useTheme();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBookings();
  }, []);

  const fetchRecentBookings = async () => {
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
          startDate: new Date('2024-01-20T14:00:00'),
          endDate: new Date('2024-01-20T18:00:00'),
          location: 'Business Conference - London',
          requirements: 'Level 2 protection',
          officers: 2,
          totalPrice: 800,
        },
      ];
      
      setBookings(mockBookings);
    } catch (error) {
      console.error('Failed to fetch recent bookings:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getServiceIcon = (serviceType: Booking['serviceType']) => {
    switch (serviceType) {
      case 'private-hire': return 'car-luxury';
      case 'close-protection': return 'shield-account';
      case 'corporate': return 'office-building';
      case 'vip': return 'crown';
      case 'wedding': return 'heart';
      default: return 'car';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingItem}
      onPress={() => onBookingPress(item)}
    >
      <View style={styles.bookingHeader}>
        <View style={styles.serviceInfo}>
          <Icon
            name={getServiceIcon(item.serviceType)}
            size={20}
            color={colors.primary}
            style={styles.serviceIcon}
          />
          <View style={styles.serviceDetails}>
            <Text style={styles.serviceType}>
              {item.serviceType.replace('-', ' ').toUpperCase()}
            </Text>
            <Text style={styles.bookingDate}>
              {formatDate(item.startDate)}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <Text style={styles.location} numberOfLines={1}>
        {item.location}
      </Text>
      
      <View style={styles.bookingFooter}>
        <Text style={styles.price}>£{item.totalPrice}</Text>
        <Icon name="chevron-right" size={20} color={colors.text.muted} />
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
    },
    bookingItem: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    bookingHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    serviceInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    serviceIcon: {
      marginRight: 12,
    },
    serviceDetails: {
      flex: 1,
    },
    serviceType: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.text.primary,
    },
    bookingDate: {
      fontSize: 12,
      color: colors.text.muted,
      marginTop: 2,
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
      fontSize: 13,
      color: colors.text.secondary,
      marginBottom: 12,
    },
    bookingFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primary,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.text.muted,
      marginTop: 12,
    },
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Loading bookings...</Text>
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Icon name="calendar-blank" size={48} color={colors.text.muted} />
          <Text style={styles.emptyText}>No recent bookings</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings.slice(0, 3)} // Show only 3 most recent
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
}