import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

interface LocationContextType {
  location: Location.LocationObject | null;
  region: Region | null;
  permission: boolean;
  isTracking: boolean;
  error: string | null;
  requestPermission: () => Promise<boolean>;
  startTracking: () => void;
  stopTracking: () => void;
  getCurrentLocation: () => Promise<Location.LocationObject | null>;
  geocodeAddress: (address: string) => Promise<Location.LocationGeocodedAddress[]>;
  reverseGeocode: (latitude: number, longitude: number) => Promise<Location.LocationGeocodedAddress[]>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [permission, setPermission] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchSubscription, setWatchSubscription] = useState<Location.LocationSubscription | null>(null);

  useEffect(() => {
    checkPermissionStatus();
    return () => {
      if (watchSubscription) {
        watchSubscription.remove();
      }
    };
  }, []);

  const checkPermissionStatus = async () => {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermission(status === 'granted');
      
      if (status === 'granted') {
        getCurrentLocation();
      }
    } catch (err) {
      setError('Failed to check location permission');
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const granted = status === 'granted';
      setPermission(granted);
      
      if (granted) {
        await getCurrentLocation();
        setError(null);
      } else {
        setError('Location permission denied');
      }
      
      return granted;
    } catch (err) {
      setError('Failed to request location permission');
      return false;
    }
  };

  const getCurrentLocation = async (): Promise<Location.LocationObject | null> => {
    if (!permission) {
      setError('Location permission not granted');
      return null;
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
      
      setError(null);
      return currentLocation;
    } catch (err) {
      setError('Failed to get current location');
      return null;
    }
  };

  const startTracking = async () => {
    if (!permission) {
      await requestPermission();
      return;
    }

    if (isTracking) return;

    try {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          setLocation(newLocation);
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }
      );
      
      setWatchSubscription(subscription);
      setIsTracking(true);
      setError(null);
    } catch (err) {
      setError('Failed to start location tracking');
    }
  };

  const stopTracking = () => {
    if (watchSubscription) {
      watchSubscription.remove();
      setWatchSubscription(null);
    }
    setIsTracking(false);
  };

  const geocodeAddress = async (address: string): Promise<Location.LocationGeocodedAddress[]> => {
    try {
      const result = await Location.geocodeAsync(address);
      return result;
    } catch (err) {
      setError('Failed to geocode address');
      return [];
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number): Promise<Location.LocationGeocodedAddress[]> => {
    try {
      const result = await Location.reverseGeocodeAsync({ latitude, longitude });
      return result;
    } catch (err) {
      setError('Failed to reverse geocode coordinates');
      return [];
    }
  };

  const value = {
    location,
    region,
    permission,
    isTracking,
    error,
    requestPermission,
    startTracking,
    stopTracking,
    getCurrentLocation,
    geocodeAddress,
    reverseGeocode,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};