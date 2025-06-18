// Authentication Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileImage?: string;
  createdAt: string;
  isVerified: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

// Booking Types
export interface BookingRequest {
  serviceType: ServiceType;
  pickupLocation: Location;
  dropoffLocation?: Location;
  pickupDate: string;
  pickupTime: string;
  passengerCount: number;
  specialRequirements?: string;
  vehiclePreference?: string;
}

export interface Booking {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: BookingStatus;
  pickupLocation: Location;
  dropoffLocation?: Location;
  pickupDateTime: string;
  estimatedArrival?: string;
  actualArrival?: string;
  driver?: Driver;
  vehicle?: Vehicle;
  price: number;
  specialRequirements?: string;
  createdAt: string;
  updatedAt: string;
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  ASSIGNED = 'assigned',
  EN_ROUTE = 'en_route',
  ARRIVED = 'arrived',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ServiceType {
  PRIVATE_HIRE = 'private_hire',
  CORPORATE = 'corporate',
  WEDDING = 'wedding',
  VIP = 'vip',
  CLOSE_PROTECTION = 'close_protection'
}

// Location Types
export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

// Driver Types
export interface Driver {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  rating: number;
  photo?: string;
  licenseNumber: string;
}

// Vehicle Types
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  type: VehicleType;
  features: string[];
}

export enum VehicleType {
  SEDAN = 'sedan',
  SUV = 'suv',
  LUXURY = 'luxury',
  VAN = 'van',
  LIMOUSINE = 'limousine'
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  BookingDetails: { bookingId: string };
  VehicleSelection: { bookingRequest: BookingRequest };
  PaymentMethod: { bookingId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  BiometricSetup: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Services: undefined;
  Profile: undefined;
};

// Push Notification Types
export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  type: NotificationType;
}

export enum NotificationType {
  BOOKING_CONFIRMED = 'booking_confirmed',
  DRIVER_ASSIGNED = 'driver_assigned',
  DRIVER_ARRIVED = 'driver_arrived',
  BOOKING_CANCELLED = 'booking_cancelled',
  PAYMENT_PROCESSED = 'payment_processed'
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  error?: AppError;
}

// Biometric Types
export interface BiometricInfo {
  isSupported: boolean;
  isEnrolled: boolean;
  availableTypes: BiometricType[];
}

export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  FACE_ID = 'face_id',
  IRIS = 'iris'
}