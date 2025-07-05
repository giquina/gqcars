// Core User Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  preferences: UserPreferences;
  emergencyContacts: EmergencyContact[];
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  defaultPaymentMethod?: string;
  favoriteLocations: Location[];
  securityLevel: SecurityLevel;
  biometricAuth: BiometricSettings;
  language: string;
  currency: string;
}

export interface BiometricSettings {
  enabled: boolean;
  type: 'fingerprint' | 'face-id' | 'none';
  fallbackToPin: boolean;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: BookingStatus;
  pickupLocation: Location;
  dropoffLocation: Location;
  waypoints?: Location[];
  scheduledTime: string;
  estimatedDuration: number;
  estimatedDistance: number;
  estimatedPrice: number;
  actualPrice?: number;
  driver?: Driver;
  vehicle?: Vehicle;
  securityAssessment?: SecurityAssessment;
  specialRequirements?: string;
  passengers: number;
  paymentMethod?: PaymentMethod;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

export type ServiceType = 
  | 'airport-transfer'
  | 'close-protection'
  | 'corporate-transport'
  | 'diplomatic-services'
  | 'family-office'
  | 'lifestyle-management'
  | 'private-hire'
  | 'professional-support'
  | 'shopping-assistance'
  | 'taxi-services'
  | 'vip-transport'
  | 'wedding-transport';

export type BookingStatus = 
  | 'pending'           // Booking created, awaiting confirmation
  | 'confirmed'         // Booking confirmed, awaiting assignment
  | 'assigned'          // Driver assigned, awaiting pickup
  | 'en-route'          // Driver heading to pickup location
  | 'arrived'           // Driver arrived at pickup location
  | 'in-progress'       // Journey in progress
  | 'completed'         // Journey completed successfully
  | 'cancelled'         // Booking cancelled
  | 'no-show'          // Customer didn't show up
  | 'driver-cancelled'; // Driver cancelled

export type SecurityLevel = 'standard' | 'enhanced' | 'executive' | 'diplomatic';

// Location Types
export interface Location {
  id?: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  postcode?: string;
  city?: string;
  country?: string;
  type?: LocationType;
  placeId?: string; // Google Places ID
  isVerified?: boolean;
}

export type LocationType = 'pickup' | 'dropoff' | 'waypoint' | 'favorite' | 'home' | 'work';

// Driver and Vehicle Types
export interface Driver {
  id: string;
  name: string;
  phone: string;
  photo?: string;
  rating: number;
  totalTrips: number;
  licenseNumber: string;
  siaLicense: string;
  status: DriverStatus;
  currentLocation?: Location;
  specializations: DriverSpecialization[];
  languages: string[];
  isActive: boolean;
  joinedAt: string;
}

export type DriverStatus = 'available' | 'busy' | 'offline' | 'break' | 'maintenance';

export type DriverSpecialization = 
  | 'close-protection'
  | 'diplomatic-security'
  | 'corporate-executive'
  | 'medical-transport'
  | 'airport-specialist'
  | 'events-security';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plateNumber: string;
  type: VehicleType;
  category: VehicleCategory;
  features: VehicleFeature[];
  capacity: number;
  currentLocation?: Location;
  isActive: boolean;
  lastMaintenance?: string;
  nextMaintenanceDue?: string;
}

export type VehicleType = 'sedan' | 'suv' | 'luxury' | 'armored' | 'van' | 'limousine';
export type VehicleCategory = 'standard' | 'premium' | 'luxury' | 'armored';

export type VehicleFeature = 
  | 'wifi'
  | 'privacy-glass'
  | 'armor-protection'
  | 'gps-tracking'
  | 'security-cameras'
  | 'first-aid-kit'
  | 'child-seats'
  | 'wheelchair-accessible'
  | 'refreshments'
  | 'phone-chargers';

// Security Assessment Types
export interface SecurityAssessment {
  id: string;
  bookingId: string;
  userId: string;
  riskLevel: RiskLevel;
  threatFactors: ThreatFactor[];
  protectionLevel: SecurityLevel;
  recommendations: SecurityRecommendation[];
  specialRequirements: string[];
  routeRisk: RouteRiskAssessment;
  assessmentDate: string;
  validUntil: string;
  assessedBy?: string;
  notes?: string;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type ThreatFactor = 
  | 'public-profile'
  | 'high-value-target'
  | 'previous-incidents'
  | 'controversial-business'
  | 'international-travel'
  | 'political-exposure'
  | 'media-attention'
  | 'family-concerns'
  | 'business-rivals'
  | 'legal-issues';

export interface SecurityRecommendation {
  id: string;
  type: RecommendationType;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  implementation: string;
  estimatedCost?: number;
}

export type RecommendationType = 
  | 'vehicle-upgrade'
  | 'route-modification'
  | 'additional-security'
  | 'timing-adjustment'
  | 'communication-protocol'
  | 'emergency-procedure';

export interface RouteRiskAssessment {
  overallRisk: RiskLevel;
  riskFactors: RouteRiskFactor[];
  alternativeRoutes?: AlternativeRoute[];
  estimatedTime: number;
  safetyScore: number;
}

export type RouteRiskFactor = 
  | 'high-crime-area'
  | 'traffic-congestion'
  | 'construction-zones'
  | 'protest-activity'
  | 'weather-conditions'
  | 'event-crowds';

export interface AlternativeRoute {
  id: string;
  description: string;
  estimatedTime: number;
  estimatedDistance: number;
  riskLevel: RiskLevel;
  additionalCost?: number;
}

// Notification Types
export interface NotificationSettings {
  push: boolean;
  email: boolean;
  sms: boolean;
  bookingUpdates: boolean;
  driverMessages: boolean;
  securityAlerts: boolean;
  promotions: boolean;
  quietHours: QuietHours;
}

export interface QuietHours {
  enabled: boolean;
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  timezone: string;
}

export interface PushNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
  actionButtons?: NotificationAction[];
  priority: 'low' | 'normal' | 'high';
  createdAt: string;
  readAt?: string;
  scheduledFor?: string;
}

export type NotificationType = 
  | 'booking-confirmed'
  | 'driver-assigned'
  | 'driver-arrived'
  | 'trip-started'
  | 'trip-completed'
  | 'payment-processed'
  | 'emergency-alert'
  | 'security-update'
  | 'system-message'
  | 'promotion'
  | 'maintenance';

export interface NotificationAction {
  id: string;
  title: string;
  action: string;
  destructive?: boolean;
}

// Payment Types
export interface PaymentMethod {
  id: string;
  type: PaymentType;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault: boolean;
  isActive: boolean;
  addedAt: string;
}

export type PaymentType = 
  | 'card'
  | 'apple-pay'
  | 'google-pay'
  | 'corporate-account'
  | 'invoice'
  | 'cash';

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  processedAt?: string;
  refundedAt?: string;
  refundAmount?: number;
  fees: PaymentFee[];
  receipt?: PaymentReceipt;
}

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially-refunded';

export interface PaymentFee {
  type: 'service' | 'processing' | 'tax';
  amount: number;
  description: string;
}

export interface PaymentReceipt {
  id: string;
  downloadUrl: string;
  emailSent: boolean;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp: string;
  requestId: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  field?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationInfo;
  filters?: Record<string, any>;
  sorting?: SortingInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SortingInfo {
  field: string;
  direction: 'asc' | 'desc';
}

// Form Data Types
export interface BookingFormData {
  serviceType: ServiceType;
  pickupLocation: string;
  dropoffLocation: string;
  waypoints?: string[];
  bookingDate: string;
  bookingTime: string;
  passengers: number;
  specialRequirements?: string;
  securityLevel?: SecurityLevel;
  vehiclePreference?: VehicleType;
  paymentMethod?: string;
  emergencyContact?: string;
}

export interface QuickBookingData {
  pickupLocation: string;
  dropoffLocation: string;
  serviceType: ServiceType;
  bookingTime: 'now' | 'scheduled';
  scheduledTime?: string;
  passengers: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceInterest?: ServiceType;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

export interface SecurityAssessmentFormData {
  riskLevel: RiskLevel;
  threatFactors: ThreatFactor[];
  protectionLevel: SecurityLevel;
  operationalArea: string;
  responseTime: string;
  additionalNotes?: string;
  assessmentDate: string;
}

// Real-time Tracking Types
export interface TrackingUpdate {
  bookingId: string;
  timestamp: string;
  driverLocation: Location;
  vehicleLocation: Location;
  estimatedArrival: string;
  status: BookingStatus;
  message?: string;
  route?: TrackingRoute;
  speed?: number;
  heading?: number;
}

export interface TrackingRoute {
  points: Location[];
  distance: number;
  duration: number;
  trafficDelay?: number;
}

// Emergency Types
export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  relationship: string;
  isPrimary: boolean;
  isActive: boolean;
  addedAt: string;
}

export interface EmergencyAlert {
  id: string;
  userId: string;
  bookingId?: string;
  type: EmergencyType;
  location: Location;
  message?: string;
  status: EmergencyStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  respondedBy?: string;
  responseTime?: number;
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
}

export type EmergencyType = 
  | 'panic-button'
  | 'medical-emergency'
  | 'security-threat'
  | 'vehicle-breakdown'
  | 'accident'
  | 'route-deviation'
  | 'communication-loss';

export type EmergencyStatus = 
  | 'active'
  | 'acknowledged'
  | 'responding'
  | 'resolved'
  | 'false-alarm'
  | 'escalated';

// Analytics and Reporting Types
export interface UserAnalytics {
  totalBookings: number;
  completedTrips: number;
  cancelledTrips: number;
  totalSpent: number;
  averageRating: number;
  preferredServices: ServiceType[];
  frequentLocations: Location[];
  peakUsageHours: number[];
  monthlyUsage: MonthlyUsage[];
}

export interface MonthlyUsage {
  month: string;
  bookings: number;
  spending: number;
  averageRating: number;
}

// System Configuration Types
export interface AppConfig {
  version: string;
  buildNumber: string;
  environment: 'development' | 'staging' | 'production';
  features: FeatureFlag[];
  apiEndpoints: Record<string, string>;
  emergencyNumbers: EmergencyNumber[];
  supportContact: ContactInfo;
}

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  rollout?: number; // Percentage rollout
  conditions?: Record<string, any>;
}

export interface EmergencyNumber {
  country: string;
  police: string;
  medical: string;
  fire: string;
  gqCarsSecurity: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp?: string;
  website: string;
  address?: string;
}

// Utility Types
export type Timestamp = string; // ISO 8601 format
export type Currency = 'GBP' | 'USD' | 'EUR';
export type Language = 'en' | 'fr' | 'es' | 'de' | 'it';
export type Platform = 'web' | 'ios' | 'android';

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event types for analytics
export interface AnalyticsEvent {
  name: string;
  parameters: Record<string, any>;
  timestamp: Timestamp;
  userId?: string;
  sessionId?: string;
  platform: Platform;
}