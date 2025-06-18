import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Booking {
  id: string;
  serviceType: string;
  date: string;
  time: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  location: string;
  price: string;
  duration: string;
  description: string;
}

const bookingsData: Booking[] = [
  {
    id: '1',
    serviceType: 'Close Protection',
    date: 'Today',
    time: '14:00 - 18:00',
    status: 'active',
    location: 'London City Center',
    price: '£600',
    duration: '4 hours',
    description: 'Personal protection for business meeting',
  },
  {
    id: '2',
    serviceType: 'VIP Transport',
    date: 'Tomorrow',
    time: '09:00 - 12:00',
    status: 'upcoming',
    location: 'Heathrow to Mayfair',
    price: '£300',
    duration: '3 hours',
    description: 'Airport pickup and city transfer',
  },
  {
    id: '3',
    serviceType: 'Event Security',
    date: 'Dec 15, 2024',
    time: '18:00 - 23:00',
    status: 'upcoming',
    location: 'Royal Hotel Ballroom',
    price: '£800',
    duration: '5 hours',
    description: 'Corporate gala security coverage',
  },
  {
    id: '4',
    serviceType: 'Wedding Security',
    date: 'Nov 28, 2024',
    time: '12:00 - 22:00',
    status: 'completed',
    location: 'Countryside Manor',
    price: '£1,200',
    duration: '10 hours',
    description: 'Wedding day security and coordination',
  },
  {
    id: '5',
    serviceType: 'Corporate Security',
    date: 'Nov 20, 2024',
    time: '08:00 - 17:00',
    status: 'completed',
    location: 'Office Building',
    price: '£450',
    duration: '9 hours',
    description: 'Daily office security coverage',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return '#34C759';
    case 'upcoming':
      return '#007AFF';
    case 'completed':
      return '#666';
    case 'cancelled':
      return '#FF3B30';
    default:
      return '#666';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return 'play-circle';
    case 'upcoming':
      return 'time';
    case 'completed':
      return 'checkmark-circle';
    case 'cancelled':
      return 'close-circle';
    default:
      return 'help-circle';
  }
};

interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress }) => (
  <TouchableOpacity style={styles.bookingCard} onPress={onPress}>
    <View style={styles.bookingHeader}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceType}>{booking.serviceType}</Text>
        <View style={styles.statusContainer}>
          <Ionicons 
            name={getStatusIcon(booking.status) as any} 
            size={16} 
            color={getStatusColor(booking.status)} 
          />
          <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Text>
        </View>
      </View>
      <Text style={styles.price}>{booking.price}</Text>
    </View>

    <View style={styles.bookingDetails}>
      <View style={styles.detailRow}>
        <Ionicons name="calendar" size={16} color="#666" />
        <Text style={styles.detailText}>{booking.date} • {booking.time}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="location" size={16} color="#666" />
        <Text style={styles.detailText}>{booking.location}</Text>
      </View>
      <View style={styles.detailRow}>
        <Ionicons name="time" size={16} color="#666" />
        <Text style={styles.detailText}>{booking.duration}</Text>
      </View>
    </View>

    <Text style={styles.description}>{booking.description}</Text>

    <View style={styles.cardActions}>
      {booking.status === 'upcoming' && (
        <>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Modify</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonPrimary}>
            <Text style={styles.actionButtonPrimaryText}>View Details</Text>
          </TouchableOpacity>
        </>
      )}
      {booking.status === 'active' && (
        <TouchableOpacity style={styles.actionButtonPrimary}>
          <Text style={styles.actionButtonPrimaryText}>Contact Team</Text>
        </TouchableOpacity>
      )}
      {booking.status === 'completed' && (
        <>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Rate Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonSecondaryText}>Book Again</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </TouchableOpacity>
);

export default function BookingsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleBookingPress = (booking: Booking) => {
    console.log(`Selected booking: ${booking.id}`);
    // Navigate to booking details screen
  };

  const filteredBookings = bookingsData.filter(booking => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return booking.status === 'upcoming' || booking.status === 'active';
    if (activeTab === 'completed') return booking.status === 'completed';
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <Text style={styles.headerSubtitle}>Track and manage your security services</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All ({bookingsData.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming ({bookingsData.filter(b => b.status === 'upcoming' || b.status === 'active').length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed ({bookingsData.filter(b => b.status === 'completed').length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.bookingsContainer}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onPress={() => handleBookingPress(booking)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color="#ccc" />
              <Text style={styles.emptyTitle}>No bookings found</Text>
              <Text style={styles.emptyText}>
                {activeTab === 'all' 
                  ? 'Start by booking your first security service'
                  : `No ${activeTab} bookings at the moment`
                }
              </Text>
              <TouchableOpacity style={styles.newBookingButton}>
                <Text style={styles.newBookingButtonText}>Book New Service</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  bookingsContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  bookingDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonPrimaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtonSecondary: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonSecondaryText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  newBookingButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  newBookingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});