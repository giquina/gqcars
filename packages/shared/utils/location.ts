// Platform detection
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
const isWeb = typeof window !== 'undefined';

export interface LocationPermission {
  granted: boolean;
  canAskAgain?: boolean;
  accuracy?: 'precise' | 'approximate';
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
  heading?: number;
  speed?: number;
}

export interface LocationResult {
  coordinates: LocationCoordinates;
  address?: string;
  timestamp: number;
}

// Request location permission (platform-specific)
export const requestLocationPermission = async (): Promise<LocationPermission> => {
  if (isWeb) {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({ granted: false });
        return;
      }
      
      // Check current permission status
      if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          resolve({ 
            granted: result.state === 'granted',
            canAskAgain: result.state !== 'denied'
          });
        }).catch(() => {
          // Fallback to requesting permission directly
          resolve({ granted: false, canAskAgain: true });
        });
      } else {
        // Browser doesn't support permission API, try direct access
        resolve({ granted: false, canAskAgain: true });
      }
    });
  } else if (isReactNative) {
    // React Native implementation
    try {
      const { Location } = await import('expo-location');
      const { status, canAskAgain, accuracy } = await Location.requestForegroundPermissionsAsync();
      
      return { 
        granted: status === 'granted',
        canAskAgain: canAskAgain,
        accuracy: accuracy === Location.Accuracy.Balanced ? 'approximate' : 'precise'
      };
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return { granted: false, canAskAgain: false };
    }
  }
  
  return { granted: false };
};

// Get current location (platform-specific)
export const getCurrentLocation = async (options?: {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}): Promise<LocationResult | null> => {
  try {
    const permission = await requestLocationPermission();
    if (!permission.granted) {
      throw new Error('Location permission not granted');
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      ...options
    };

    if (isWeb) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              coordinates: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude || undefined,
                heading: position.coords.heading || undefined,
                speed: position.coords.speed || undefined
              },
              timestamp: position.timestamp
            });
          },
          (error) => {
            console.error('Geolocation error:', error);
            reject(new Error(`Location error: ${error.message}`));
          },
          defaultOptions
        );
      });
    } else if (isReactNative) {
      const { Location } = await import('expo-location');
      
      const location = await Location.getCurrentPositionAsync({
        accuracy: defaultOptions.enableHighAccuracy 
          ? Location.Accuracy.High 
          : Location.Accuracy.Balanced,
        timeInterval: defaultOptions.maximumAge,
        distanceInterval: 0
      });
      
      return {
        coordinates: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
          altitude: location.coords.altitude || undefined,
          heading: location.coords.heading || undefined,
          speed: location.coords.speed || undefined
        },
        timestamp: location.timestamp
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

// Watch location changes (platform-specific)
export const watchLocation = async (
  callback: (location: LocationResult) => void,
  options?: {
    enableHighAccuracy?: boolean;
    distanceInterval?: number;
    timeInterval?: number;
  }
): Promise<(() => void) | null> => {
  try {
    const permission = await requestLocationPermission();
    if (!permission.granted) {
      throw new Error('Location permission not granted');
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      distanceInterval: 10, // meters
      timeInterval: 5000,   // milliseconds
      ...options
    };

    if (isWeb) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          callback({
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              altitude: position.coords.altitude || undefined,
              heading: position.coords.heading || undefined,
              speed: position.coords.speed || undefined
            },
            timestamp: position.timestamp
          });
        },
        (error) => console.error('Location watch error:', error),
        {
          enableHighAccuracy: defaultOptions.enableHighAccuracy,
          maximumAge: 10000,
          timeout: 15000
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else if (isReactNative) {
      const { Location } = await import('expo-location');
      
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: defaultOptions.enableHighAccuracy 
            ? Location.Accuracy.High 
            : Location.Accuracy.Balanced,
          timeInterval: defaultOptions.timeInterval,
          distanceInterval: defaultOptions.distanceInterval
        },
        (location) => {
          callback({
            coordinates: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              accuracy: location.coords.accuracy,
              altitude: location.coords.altitude || undefined,
              heading: location.coords.heading || undefined,
              speed: location.coords.speed || undefined
            },
            timestamp: location.timestamp
          });
        }
      );

      return () => subscription.remove();
    }

    return null;
  } catch (error) {
    console.error('Error setting up location watch:', error);
    return null;
  }
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number,
  unit: 'km' | 'miles' = 'km'
): number => {
  const R = unit === 'km' ? 6371 : 3959; // Earth's radius in kilometers or miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

// Calculate bearing between two points
export const calculateBearing = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const dLon = deg2rad(lon2 - lon1);
  const lat1Rad = deg2rad(lat1);
  const lat2Rad = deg2rad(lat2);
  
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - 
            Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  
  const bearing = Math.atan2(y, x);
  return (rad2deg(bearing) + 360) % 360; // Normalize to 0-360 degrees
};

// Validate UK postcode format
export const validateUKPostcode = (postcode: string): boolean => {
  // UK postcode regex pattern
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i;
  return ukPostcodeRegex.test(postcode.trim());
};

// Format postcode to standard format
export const formatPostcode = (postcode: string): string => {
  const cleaned = postcode.replace(/\s/g, '').toUpperCase();
  if (cleaned.length === 6) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  } else if (cleaned.length === 7) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
  }
  return postcode.toUpperCase();
};

// Get location from address using geocoding
export const geocodeAddress = async (address: string): Promise<LocationResult | null> => {
  try {
    // This would typically use Google Maps Geocoding API
    // For now, return null as a placeholder
    console.log('Geocoding address:', address);
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// Get address from coordinates using reverse geocoding
export const reverseGeocode = async (
  latitude: number, 
  longitude: number
): Promise<string | null> => {
  try {
    // This would typically use Google Maps Reverse Geocoding API
    // For now, return null as a placeholder
    console.log('Reverse geocoding:', latitude, longitude);
    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

// Check if location is within London boundaries (approximate)
export const isWithinLondon = (latitude: number, longitude: number): boolean => {
  // Approximate London boundaries
  const londonBounds = {
    north: 51.691,
    south: 51.286,
    east: 0.315,
    west: -0.510
  };
  
  return latitude >= londonBounds.south && 
         latitude <= londonBounds.north && 
         longitude >= londonBounds.west && 
         longitude <= londonBounds.east;
};

// Check if location is within UK boundaries
export const isWithinUK = (latitude: number, longitude: number): boolean => {
  // UK boundaries (approximate)
  const ukBounds = {
    north: 60.9,    // Shetland Islands
    south: 49.8,    // Isles of Scilly
    east: 2.0,      // East Anglia
    west: -8.2      // Northern Ireland
  };
  
  return latitude >= ukBounds.south && 
         latitude <= ukBounds.north && 
         longitude >= ukBounds.west && 
         longitude <= ukBounds.east;
};

// Estimate travel time between two locations
export const estimateTravelTime = (
  distance: number,
  mode: 'driving' | 'walking' | 'transit' = 'driving'
): number => {
  // Average speeds in km/h
  const averageSpeeds = {
    driving: 40,  // London traffic average
    walking: 5,
    transit: 25
  };
  
  const speed = averageSpeeds[mode];
  const timeInHours = distance / speed;
  const timeInMinutes = Math.round(timeInHours * 60);
  
  return Math.max(timeInMinutes, 1); // Minimum 1 minute
};

// Generate a bounding box around a location
export const generateBoundingBox = (
  latitude: number,
  longitude: number,
  radiusKm: number
): {
  north: number;
  south: number;
  east: number;
  west: number;
} => {
  const latChange = radiusKm / 111.32; // 1 degree ≈ 111.32 km
  const lonChange = radiusKm / (111.32 * Math.cos(deg2rad(latitude)));
  
  return {
    north: latitude + latChange,
    south: latitude - latChange,
    east: longitude + lonChange,
    west: longitude - lonChange
  };
};

// Check if a point is within a bounding box
export const isWithinBounds = (
  latitude: number,
  longitude: number,
  bounds: { north: number; south: number; east: number; west: number }
): boolean => {
  return latitude >= bounds.south &&
         latitude <= bounds.north &&
         longitude >= bounds.west &&
         longitude <= bounds.east;
};

// Utility functions
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const rad2deg = (rad: number): number => {
  return rad * (180 / Math.PI);
};

// Location utilities for common use cases
export const locationUtils = {
  // Format coordinates for display
  formatCoordinates: (lat: number, lon: number, precision: number = 4): string => {
    return `${lat.toFixed(precision)}, ${lon.toFixed(precision)}`;
  },
  
  // Check if two locations are approximately the same
  isSameLocation: (
    lat1: number, lon1: number, 
    lat2: number, lon2: number, 
    thresholdMeters: number = 100
  ): boolean => {
    const distance = calculateDistance(lat1, lon1, lat2, lon2) * 1000; // Convert to meters
    return distance <= thresholdMeters;
  },
  
  // Get the center point of multiple locations
  getCenterPoint: (locations: Array<{ latitude: number; longitude: number }>): LocationCoordinates => {
    if (locations.length === 0) {
      throw new Error('At least one location is required');
    }
    
    const totalLat = locations.reduce((sum, loc) => sum + loc.latitude, 0);
    const totalLon = locations.reduce((sum, loc) => sum + loc.longitude, 0);
    
    return {
      latitude: totalLat / locations.length,
      longitude: totalLon / locations.length
    };
  },
  
  // Sort locations by distance from a reference point
  sortByDistance: (
    locations: Array<{ latitude: number; longitude: number; [key: string]: any }>,
    referencePoint: { latitude: number; longitude: number }
  ) => {
    return locations.sort((a, b) => {
      const distanceA = calculateDistance(
        referencePoint.latitude, referencePoint.longitude,
        a.latitude, a.longitude
      );
      const distanceB = calculateDistance(
        referencePoint.latitude, referencePoint.longitude,
        b.latitude, b.longitude
      );
      return distanceA - distanceB;
    });
  }
};

export default {
  requestLocationPermission,
  getCurrentLocation,
  watchLocation,
  calculateDistance,
  calculateBearing,
  validateUKPostcode,
  formatPostcode,
  geocodeAddress,
  reverseGeocode,
  isWithinLondon,
  isWithinUK,
  estimateTravelTime,
  generateBoundingBox,
  isWithinBounds,
  locationUtils
};