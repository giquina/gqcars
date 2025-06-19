import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import { SmartNotificationService } from '../services/smartNotifications';

interface DriverLocation {
  latitude: number;
  longitude: number;
  heading: number;
  speed: number;
  accuracy: number;
  timestamp: number;
  estimatedArrival: string;
  distanceRemaining: number;
}

interface TrackingStatus {
  isConnected: boolean;
  isTracking: boolean;
  connectionError: string | null;
  lastUpdate: Date | null;
}

interface UseDriverTrackingReturn {
  driverLocation: DriverLocation | null;
  userLocation: Location.LocationObject | null;
  status: TrackingStatus;
  eta: string | null;
  distance: number | null;
  routePolyline: string | null;
  startTracking: () => Promise<void>;
  stopTracking: () => void;
  refreshLocation: () => Promise<void>;
}

export const useDriverTracking = (bookingId: string): UseDriverTrackingReturn => {
  const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [status, setStatus] = useState<TrackingStatus>({
    isConnected: false,
    isTracking: false,
    connectionError: null,
    lastUpdate: null,
  });
  const [eta, setEta] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [routePolyline, setRoutePolyline] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const locationSubscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  const setupWebSocket = () => {
    try {
      const wsUrl = `wss://api.gqcarssecurity.com/driver-tracking/${bookingId}`;
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected for booking:', bookingId);
        setStatus(prev => ({
          ...prev,
          isConnected: true,
          connectionError: null,
        }));
        reconnectAttempts.current = 0;
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleDriverLocationUpdate(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        setStatus(prev => ({
          ...prev,
          isConnected: false,
        }));

        // Attempt to reconnect if not manually closed
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          scheduleReconnect();
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setStatus(prev => ({
          ...prev,
          connectionError: 'Connection failed',
        }));
      };
    } catch (error) {
      console.error('Failed to setup WebSocket:', error);
      setStatus(prev => ({
        ...prev,
        connectionError: 'Failed to establish connection',
      }));
    }
  };

  const scheduleReconnect = () => {
    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
    reconnectAttempts.current++;

    reconnectTimeoutRef.current = setTimeout(() => {
      console.log(`Attempting to reconnect (${reconnectAttempts.current}/${maxReconnectAttempts})...`);
      setupWebSocket();
    }, delay);
  };

  const handleDriverLocationUpdate = (data: any) => {
    const driverLoc: DriverLocation = {
      latitude: data.latitude,
      longitude: data.longitude,
      heading: data.heading || 0,
      speed: data.speed || 0,
      accuracy: data.accuracy || 0,
      timestamp: data.timestamp || Date.now(),
      estimatedArrival: data.estimatedArrival || 'Unknown',
      distanceRemaining: data.distanceRemaining || 0,
    };

    setDriverLocation(driverLoc);
    setEta(data.estimatedArrival);
    setDistance(data.distanceRemaining);
    setRoutePolyline(data.routePolyline);
    
    setStatus(prev => ({
      ...prev,
      lastUpdate: new Date(),
    }));

    // Send ETA update notification if significantly changed
    if (data.etaChanged && data.estimatedArrival) {
      SmartNotificationService.sendETAUpdate(bookingId, data.estimatedArrival);
    }

    // Calculate and update user's distance from driver
    if (userLocation && driverLoc) {
      const calculatedDistance = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        driverLoc.latitude,
        driverLoc.longitude
      );
      setDistance(calculatedDistance);
    }
  };

  const startUserLocationTracking = async (): Promise<void> => {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Location permission not granted');
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setUserLocation(currentLocation);

      // Start watching location changes
      locationSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (location) => {
          setUserLocation(location);
        }
      );
    } catch (error) {
      console.error('Failed to start location tracking:', error);
      throw error;
    }
  };

  const startTracking = async (): Promise<void> => {
    try {
      setStatus(prev => ({ ...prev, isTracking: true }));
      
      // Start user location tracking
      await startUserLocationTracking();
      
      // Setup driver tracking WebSocket
      setupWebSocket();
    } catch (error) {
      console.error('Failed to start tracking:', error);
      setStatus(prev => ({
        ...prev,
        isTracking: false,
        connectionError: 'Failed to start tracking',
      }));
      throw error;
    }
  };

  const stopTracking = (): void => {
    setStatus(prev => ({ ...prev, isTracking: false }));

    // Close WebSocket connection
    if (wsRef.current) {
      wsRef.current.close(1000, 'User stopped tracking');
      wsRef.current = null;
    }

    // Clear reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Stop location tracking
    if (locationSubscriptionRef.current) {
      locationSubscriptionRef.current.remove();
      locationSubscriptionRef.current = null;
    }

    // Clear state
    setDriverLocation(null);
    setUserLocation(null);
    setEta(null);
    setDistance(null);
    setRoutePolyline(null);
    setStatus({
      isConnected: false,
      isTracking: false,
      connectionError: null,
      lastUpdate: null,
    });
  };

  const refreshLocation = async (): Promise<void> => {
    try {
      if (!status.isTracking) return;

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setUserLocation(currentLocation);

      // Send location update to server if needed
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'user_location_update',
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          timestamp: Date.now(),
        }));
      }
    } catch (error) {
      console.error('Failed to refresh location:', error);
    }
  };

  return {
    driverLocation,
    userLocation,
    status,
    eta,
    distance,
    routePolyline,
    startTracking,
    stopTracking,
    refreshLocation,
  };
};

// Utility function to calculate distance between two points
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

export default useDriverTracking;