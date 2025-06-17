import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function HomeScreen({ navigation }: any) {
  const stats = [
    { icon: 'calendar', label: 'Bookings', value: '3', color: '#b45309' },
    { icon: 'shield', label: 'Officers', value: '8', color: '#0f172a' },
    { icon: 'car', label: 'Vehicles', value: '5', color: '#b45309' },
    { icon: 'clock', label: 'Hours', value: '124', color: '#0f172a' },
  ];

  const quickActions = [
    { icon: 'calendar-plus', label: 'New Booking', primary: true },
    { icon: 'calculator', label: 'Get Quote', primary: false },
    { icon: 'account-group', label: 'View Team', primary: false },
    { icon: 'car-multiple', label: 'View Fleet', primary: false },
  ];

  const recentBookings = [
    {
      service: 'Close Protection',
      date: 'Feb 15, 2024',
      status: 'Confirmed',
      amount: '£1,200',
    },
    {
      service: 'Private Hire',
      date: 'Feb 14, 2024',
      status: 'In Progress',
      amount: '£450',
    },
    {
      service: 'Corporate Event',
      date: 'Feb 12, 2024',
      status: 'Completed',
      amount: '£2,800',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            style={[
              styles.statCard,
              { borderLeftColor: stat.color },
            ]}
          >
            <Icon name={stat.icon} size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.label}
            style={[
              styles.actionButton,
              action.primary && styles.actionButtonPrimary,
            ]}
          >
            <Icon
              name={action.icon}
              size={24}
              color={action.primary ? '#FFFFFF' : '#b45309'}
            />
            <Text
              style={[
                styles.actionLabel,
                action.primary && styles.actionLabelPrimary,
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Bookings */}
      <Text style={styles.sectionTitle}>Recent Bookings</Text>
      <View style={styles.bookingsList}>
        {recentBookings.map((booking, index) => (
          <TouchableOpacity
            key={index}
            style={styles.bookingCard}
          >
            <View style={styles.bookingHeader}>
              <Text style={styles.bookingService}>{booking.service}</Text>
              <Text style={styles.bookingAmount}>{booking.amount}</Text>
            </View>
            <View style={styles.bookingFooter}>
              <Text style={styles.bookingDate}>{booking.date}</Text>
              <View style={styles.statusContainer}>
                <View style={styles.statusDot} />
                <Text style={styles.bookingStatus}>{booking.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030712', // gq-black
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    width: cardWidth,
    padding: 16,
    backgroundColor: '#0f172a', // gq-blue
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#475569', // gq-accent
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  actionButton: {
    width: cardWidth,
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b45309', // gq-gold
    alignItems: 'center',
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: '#b45309', // gq-gold
    borderColor: '#b45309',
  },
  actionLabel: {
    fontSize: 14,
    color: '#b45309', // gq-gold
    fontWeight: '600',
  },
  actionLabelPrimary: {
    color: '#FFFFFF',
  },
  bookingsList: {
    gap: 16,
    marginBottom: 24,
  },
  bookingCard: {
    backgroundColor: '#0f172a', // gq-blue
    borderRadius: 8,
    padding: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookingService: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bookingAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b45309', // gq-gold
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingDate: {
    fontSize: 14,
    color: '#475569', // gq-accent
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981', // green
  },
  bookingStatus: {
    fontSize: 14,
    color: '#10B981', // green
  },
});