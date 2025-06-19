// Core tracking and communication types

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  speed?: number;
  heading?: number;
}

export interface DriverLocation extends LocationData {
  driverId: string;
  vehicleId: string;
  status: 'available' | 'en_route' | 'arrived' | 'in_transit' | 'completed';
}

export interface TripData {
  tripId: string;
  customerId: string;
  driverId: string;
  vehicleId: string;
  status: 'pending' | 'accepted' | 'en_route' | 'arrived' | 'in_transit' | 'completed' | 'cancelled';
  pickupLocation: LocationData & { address: string };
  destinationLocation: LocationData & { address: string };
  scheduledTime: number;
  estimatedArrival?: number;
  actualPickupTime?: number;
  actualDropoffTime?: number;
  route?: LocationData[];
  emergencyContacts: EmergencyContact[];
}

export interface DriverProfile {
  id: string;
  name: string;
  photo: string;
  licenseNumber: string;
  siaLicense: string;
  rating: number;
  reviewCount: number;
  phone: string;
  status: 'active' | 'inactive' | 'busy';
  specializations: string[];
  verified: boolean;
}

export interface VehicleInfo {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  type: 'sedan' | 'suv' | 'luxury' | 'armored';
  capacity: number;
  features: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

export interface SafetyAlert {
  id: string;
  tripId: string;
  type: 'panic' | 'route_deviation' | 'speed_limit' | 'sos' | 'medical';
  timestamp: number;
  location: LocationData;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  description?: string;
  responderId?: string;
}

export interface Message {
  id: string;
  tripId: string;
  senderId: string;
  receiverId: string;
  type: 'text' | 'voice' | 'template' | 'location' | 'emergency';
  content: string;
  timestamp: number;
  encrypted: boolean;
  delivered: boolean;
  read: boolean;
  translation?: {
    language: string;
    content: string;
  };
}

export interface MessageTemplate {
  id: string;
  category: 'arrival' | 'pickup' | 'traffic' | 'safety' | 'general';
  message: string;
  translations: Record<string, string>;
}

export interface SafetySystem {
  emergencyButton: {
    location: 'App header and trip screen';
    action: 'Instant alert to control center + emergency contacts';
    response: 'Police/security team dispatch within 2 minutes';
  };
  journeySharing: {
    contacts: 'Up to 5 emergency contacts';
    information: 'Live location, driver details, ETA';
    duration: 'From pickup to destination + 30 minutes';
  };
  routeMonitoring: {
    deviationAlert: '500m+ deviation from planned route';
    notification: 'Customer + emergency contacts + control center';
    action: 'Automatic wellness check call';
  };
}

export interface TrackingSettings {
  updateInterval: number; // seconds
  accuracyThreshold: number; // meters
  emergencyResponseTime: number; // minutes
  routeDeviationThreshold: number; // meters
  geoFenceRadius: number; // meters
}