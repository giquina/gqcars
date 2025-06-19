import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Linking,
  Dimensions,
  ScrollView,
  RefreshControl,
  Image,
} from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { useTheme } from '../components/ui/ThemeProvider';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { useDriverTracking } from '../hooks/useDriverTracking';
import { useBookings } from '../hooks/useBookings';
import { SmartNotificationService } from '../services/smartNotifications';
import { AnalyticsService } from '../services/analyticsService';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface RouteParams {
  bookingId: string;
}

interface DriverInfo {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  photoUrl?: string;
  rating: number;
  totalTrips: number;
  vehicle: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    type: string;
  };
}

interface EstimatedTime {
  arrival: string;
  duration: number;
  distance: number;
  traffic: 'light' | 'moderate' | 'heavy';
}

export const DriverTrackingScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { bookingId } = route.params as RouteParams;

  const [refreshing, setRefreshing] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [showDriverDetails, setShowDriverDetails] = useState(true);

  const mapRef = useRef<MapView>(null);
  const statusUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Hooks
  const { getBookingById, updateBookingStatus } = useBookings();
  const {
    driverLocation,
    userLocation,
    status: trackingStatus,
    eta,
    distance,
    routePolyline,
    startTracking,
    stopTracking,
    refreshLocation,
  } = useDriverTracking(bookingId);

  const [booking, setBooking] = useState(null);
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<EstimatedTime | null>(null);

  useEffect(() => {
    initializeTracking();
    return () => {
      cleanup();
    };
  }, [bookingId]);

  useEffect(() => {
    if (driverLocation && userLocation) {
      updateMapRegion();
    }
  }, [driverLocation, userLocation]);

  useEffect(() => {
    // Auto-refresh location every 10 seconds
    const refreshTimer = setInterval(() => {
      if (trackingStatus.isTracking) {
        refreshLocation();
      }
    }, 10000);

    return () => clearInterval(refreshTimer);
  }, [trackingStatus.isTracking]);

  const initializeTracking = async () => {
    try {
      // Track screen view
      AnalyticsService.trackScreen('DriverTracking', { booking_id: bookingId });

      // Load booking details
      const bookingData = await getBookingById(bookingId);
      setBooking(bookingData);

      if (bookingData?.driver) {
        setDriverInfo(bookingData.driver);
      }

      // Start real-time tracking
      await startTracking();

      // Initialize estimated time
      updateEstimatedTime();
    } catch (error) {
      console.error('Failed to initialize tracking:', error);
      AnalyticsService.trackError(error as Error, 'DriverTrackingScreen.initializeTracking');
      
      Alert.alert(
        'Tracking Error',
        'Unable to start driver tracking. Please try again.',
        [
          { text: 'Retry', onPress: initializeTracking },
          { text: 'Cancel', onPress: () => navigation.goBack() },
        ]
      );
    }
  };

  const cleanup = () => {
    stopTracking();
    if (statusUpdateTimeoutRef.current) {
      clearTimeout(statusUpdateTimeoutRef.current);
    }
  };

  const updateMapRegion = () => {
    if (!driverLocation || !userLocation || !mapRef.current) return;

    const coordinates = [
      {
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
      },
      {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      },
    ];

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 100, right: 50, bottom: 300, left: 50 },
      animated: true,
    });
  };

  const updateEstimatedTime = () => {
    if (!eta || !distance) return;

    const estimatedDuration = calculateDuration(distance);
    const trafficCondition = calculateTrafficCondition(estimatedDuration);

    setEstimatedTime({
      arrival: eta,
      duration: estimatedDuration,
      distance,
      traffic: trafficCondition,
    });
  };

  const calculateDuration = (distanceKm: number): number => {
    // Estimate duration based on distance and average speed
    const averageSpeed = 30; // km/h in city traffic
    return Math.round((distanceKm / averageSpeed) * 60); // minutes
  };

  const calculateTrafficCondition = (duration: number): 'light' | 'moderate' | 'heavy' => {
    if (duration < 15) return 'light';
    if (duration < 30) return 'moderate';
    return 'heavy';
  };

  const handleCallDriver = async () => {
    if (!driverInfo?.phone) return;

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      AnalyticsService.trackUserAction('call_driver', 'phone_button', {
        booking_id: bookingId,
        driver_id: driverInfo.id,
      });

      const phoneUrl = `tel:${driverInfo.phone}`;
      const canOpen = await Linking.canOpenURL(phoneUrl);
      
      if (canOpen) {
        await Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Error', 'Unable to make phone call');
      }
    } catch (error) {
      console.error('Failed to call driver:', error);
      Alert.alert('Error', 'Unable to make phone call');
    }
  };

  const handleMessageDriver = () => {
    if (!driverInfo) return;

    AnalyticsService.trackUserAction('message_driver', 'message_button', {
      booking_id: bookingId,
      driver_id: driverInfo.id,
    });

    // Navigate to messaging screen
    navigation.navigate('DriverChat', {
      bookingId,
      driverId: driverInfo.id,
      driverName: `${driverInfo.firstName} ${driverInfo.lastName}`,
    });
  };

  const handleCancelBooking = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking? Cancellation fees may apply.',
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: async () => {
            try {
              await updateBookingStatus(bookingId, 'cancelled', {
                reason: 'user_cancelled',
                timestamp: new Date().toISOString(),
              });

              AnalyticsService.trackBookingEvent('cancelled', { id: bookingId }, {
                reason: 'user_cancelled',
                stage: 'tracking',
              });

              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel booking');
            }
          },
        },
      ]
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshLocation();
      updateEstimatedTime();
    } catch (error) {
      console.error('Failed to refresh:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const getStatusColor = () => {
    if (!trackingStatus.isConnected) return theme.colors.error;
    if (trackingStatus.isTracking) return theme.colors.success;
    return theme.colors.warning;
  };

  const getStatusText = () => {
    if (!trackingStatus.isConnected) return 'Disconnected';
    if (trackingStatus.connectionError) return 'Connection Error';
    if (trackingStatus.isTracking) return 'Live Tracking';
    return 'Connecting...';
  };

  const formatDistance = (distanceKm: number): string => {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m away`;
    }
    return `${distanceKm.toFixed(1)}km away`;
  };

  const getTrafficIcon = (traffic: string) => {
    switch (traffic) {
      case 'light': return 'speedometer-outline';
      case 'moderate': return 'speedometer';
      case 'heavy': return 'warning-outline';
      default: return 'speedometer-outline';
    }
  };

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'light': return theme.colors.success;
      case 'moderate': return theme.colors.warning;
      case 'heavy': return theme.colors.error;
      default: return theme.colors.textSecondary;
    }
  };

  if (!booking || !driverInfo) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.colors.text }]}>
            Loading tracking information...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <AnimatedButton
          title=""
          onPress={() => navigation.goBack()}
          variant="ghost"
          size="small"
          icon={<Ionicons name="arrow-back" size={24} color={theme.colors.text} />}
        />
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            Driver Tracking
          </Text>
          <View style={styles.statusIndicator}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor() }
              ]}
            />
            <Text style={[styles.statusText, { color: theme.colors.textSecondary }]}>
              {getStatusText()}
            </Text>
          </View>
        </View>
        <AnimatedButton
          title=""
          onPress={handleRefresh}
          variant="ghost"
          size="small"
          icon={<Ionicons name="refresh" size={24} color={theme.colors.text} />}
        />
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={mapRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          loadingEnabled={true}
        >
          {/* Driver Marker */}
          {driverLocation && (
            <Marker
              coordinate={{
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
              }}
              title={`${driverInfo.firstName}'s ${driverInfo.vehicle.make}`}
              description={`ETA: ${eta || 'Calculating...'}`}
            >
              <View style={styles.driverMarker}>
                <Ionicons name="car" size={24} color={theme.colors.primary} />
              </View>
            </Marker>
          )}

          {/* Pickup Location Marker */}
          {booking.pickupLocation && (
            <Marker
              coordinate={{
                latitude: booking.pickupLocation.latitude,
                longitude: booking.pickupLocation.longitude,
              }}
              title="Pickup Location"
              description={booking.pickupLocation.address}
              pinColor={theme.colors.success}
            />
          )}

          {/* Route Polyline */}
          {routePolyline && (
            <Polyline
              coordinates={[]} // Would decode routePolyline
              strokeColor={theme.colors.primary}
              strokeWidth={4}
              strokePattern={[1]}
            />
          )}
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <AnimatedButton
            title=""
            onPress={updateMapRegion}
            variant="secondary"
            size="small"
            icon={<Ionicons name="locate" size={20} color={theme.colors.primary} />}
            style={styles.mapControlButton}
          />
        </View>
      </View>

      {/* Driver Information Panel */}
      <ScrollView
        style={styles.bottomPanel}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {/* ETA Information */}
        {estimatedTime && (
          <View style={[styles.etaCard, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.etaHeader}>
              <Text style={[styles.etaTitle, { color: theme.colors.text }]}>
                Estimated Arrival
              </Text>
              <View style={styles.trafficIndicator}>
                <Ionicons
                  name={getTrafficIcon(estimatedTime.traffic)}
                  size={16}
                  color={getTrafficColor(estimatedTime.traffic)}
                />
                <Text style={[styles.trafficText, { color: getTrafficColor(estimatedTime.traffic) }]}>
                  {estimatedTime.traffic} traffic
                </Text>
              </View>
            </View>
            <Text style={[styles.etaTime, { color: theme.colors.primary }]}>
              {estimatedTime.arrival}
            </Text>
            <Text style={[styles.etaDetails, { color: theme.colors.textSecondary }]}>
              {distance && formatDistance(distance)} • {estimatedTime.duration} min
            </Text>
          </View>
        )}

        {/* Driver Information */}
        <View style={[styles.driverCard, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.driverHeader}>
            <View style={styles.driverAvatar}>
              {driverInfo.photoUrl ? (
                <Image source={{ uri: driverInfo.photoUrl }} style={styles.avatarImage} />
              ) : (
                <Ionicons name="person" size={32} color={theme.colors.textSecondary} />
              )}
            </View>
            <View style={styles.driverInfo}>
              <Text style={[styles.driverName, { color: theme.colors.text }]}>
                {driverInfo.firstName} {driverInfo.lastName}
              </Text>
              <View style={styles.driverRating}>
                <Ionicons name="star" size={16} color={theme.colors.warning} />
                <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>
                  {driverInfo.rating.toFixed(1)} • {driverInfo.totalTrips} trips
                </Text>
              </View>
            </View>
          </View>

          {/* Vehicle Information */}
          <View style={styles.vehicleInfo}>
            <Text style={[styles.vehicleTitle, { color: theme.colors.text }]}>
              {driverInfo.vehicle.color} {driverInfo.vehicle.make} {driverInfo.vehicle.model}
            </Text>
            <Text style={[styles.licensePlate, { color: theme.colors.textSecondary }]}>
              {driverInfo.vehicle.licensePlate}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <AnimatedButton
              title="Call"
              onPress={handleCallDriver}
              variant="outline"
              size="medium"
              icon={<Ionicons name="call" size={20} color={theme.colors.primary} />}
              style={styles.actionButton}
            />
            <AnimatedButton
              title="Message"
              onPress={handleMessageDriver}
              variant="outline"
              size="medium"
              icon={<Ionicons name="chatbubble" size={20} color={theme.colors.primary} />}
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Cancel Button */}
        <AnimatedButton
          title="Cancel Booking"
          onPress={handleCancelBooking}
          variant="outline"
          size="large"
          style={[styles.cancelButton, { borderColor: theme.colors.error }]}
          textStyle={{ color: theme.colors.error }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  mapControlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  driverMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bottomPanel: {
    backgroundColor: 'transparent',
    maxHeight: height * 0.4,
  },
  etaCard: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  etaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  etaTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  trafficIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trafficText: {
    fontSize: 12,
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  etaDetails: {
    fontSize: 14,
  },
  driverCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
  },
  vehicleInfo: {
    marginBottom: 20,
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  licensePlate: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  cancelButton: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
});

export default DriverTrackingScreen;