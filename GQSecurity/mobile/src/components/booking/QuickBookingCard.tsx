import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { useTheme } from '../../context/ThemeContext';

interface QuickBookingCardProps {
  location: Location.LocationObject | null;
  onBookNow: () => void;
}

export default function QuickBookingCard({ location, onBookNow }: QuickBookingCardProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 16,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    locationText: {
      fontSize: 14,
      color: colors.text.muted,
      marginLeft: 8,
      flex: 1,
    },
    bookButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 24,
      alignItems: 'center',
      marginTop: 16,
    },
    bookButtonText: {
      color: colors.text.inverse,
      fontSize: 16,
      fontWeight: '600',
    },
    locationUnavailable: {
      color: colors.warning,
    },
  });

  const currentLocationText = location 
    ? `Current: ${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`
    : 'Location unavailable';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Booking</Text>
      
      <View style={styles.locationRow}>
        <Icon 
          name="map-marker" 
          size={18} 
          color={location ? colors.success : colors.warning} 
        />
        <Text style={[
          styles.locationText, 
          !location && styles.locationUnavailable
        ]}>
          {currentLocationText}
        </Text>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={onBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}