import { Request } from 'express';

// User & Authentication Types
export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  CLIENT = 'client',
  AGENT = 'agent',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Client & Contact Types
export interface Client {
  id: string;
  userId: string;
  companyName?: string;
  industry?: string;
  vipLevel: VIPLevel;
  preferences: ClientPreferences;
  emergencyContact: EmergencyContact;
  billingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export enum VIPLevel {
  STANDARD = 'standard',
  PREMIUM = 'premium',
  VIP = 'vip',
  ULTRA_VIP = 'ultra_vip'
}

export interface ClientPreferences {
  communicationMethod: 'email' | 'phone' | 'whatsapp';
  languagePreference: string;
  dietaryRequirements?: string;
  accessibilityNeeds?: string;
  securityLevel: 'standard' | 'high' | 'maximum';
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Address {
  street: string;
  city: string;
  postcode: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Booking & Service Types
export interface Booking {
  id: string;
  clientId: string;
  serviceType: ServiceType;
  serviceDetails: ServiceDetails;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  priority: Priority;
  specialRequirements?: string;
  totalCost: number;
  paymentStatus: PaymentStatus;
  assignedAgents: string[];
  route?: BookingRoute;
  createdAt: Date;
  updatedAt: Date;
}

export enum ServiceType {
  CLOSE_PROTECTION = 'close_protection',
  PRIVATE_HIRE = 'private_hire',
  VIP_TRANSPORT = 'vip_transport',
  CORPORATE_SECURITY = 'corporate_security',
  EVENT_SECURITY = 'event_security',
  WEDDING_SECURITY = 'wedding_security'
}

export interface ServiceDetails {
  description: string;
  numberOfPersons: number;
  vehicleType?: VehicleType;
  securityLevel: SecurityLevel;
  additionalServices: string[];
}

export enum VehicleType {
  SEDAN = 'sedan',
  SUV = 'suv',
  LUXURY_SEDAN = 'luxury_sedan',
  LUXURY_SUV = 'luxury_suv',
  ARMORED = 'armored',
  LIMOUSINE = 'limousine'
}

export enum SecurityLevel {
  STANDARD = 'standard',
  ENHANCED = 'enhanced',
  HIGH_RISK = 'high_risk',
  MAXIMUM = 'maximum'
}

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  EMERGENCY = 'emergency'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  REFUNDED = 'refunded',
  FAILED = 'failed'
}

export interface BookingRoute {
  pickupLocation: Address;
  dropoffLocation: Address;
  waypoints?: Address[];
  estimatedDistance: number;
  estimatedDuration: number;
}

// Quote & Pricing Types
export interface Quote {
  id: string;
  clientId: string;
  serviceType: ServiceType;
  serviceDetails: ServiceDetails;
  route?: BookingRoute;
  baseCost: number;
  additionalCosts: AdditionalCost[];
  totalCost: number;
  validUntil: Date;
  status: QuoteStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdditionalCost {
  description: string;
  amount: number;
  type: 'fixed' | 'percentage' | 'per_hour' | 'per_mile';
}

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

// Agent & Team Types
export interface Agent {
  id: string;
  userId: string;
  licenseNumber: string;
  specializations: Specialization[];
  experience: number; // years
  availability: AgentAvailability;
  currentAssignments: string[];
  rating: number;
  isActive: boolean;
  lastActiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum Specialization {
  CLOSE_PROTECTION = 'close_protection',
  DRIVING = 'driving',
  COUNTER_SURVEILLANCE = 'counter_surveillance',
  EVENT_SECURITY = 'event_security',
  CORPORATE = 'corporate',
  VIP_PROTECTION = 'vip_protection'
}

export interface AgentAvailability {
  isAvailable: boolean;
  availableFrom?: Date;
  unavailablePeriods: UnavailablePeriod[];
}

export interface UnavailablePeriod {
  startDate: Date;
  endDate: Date;
  reason: string;
}

// Communication Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: MessageType;
  isRead: boolean;
  isEncrypted: boolean;
  attachments?: MessageAttachment[];
  sentAt: Date;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  LOCATION = 'location',
  EMERGENCY = 'emergency',
  SYSTEM = 'system'
}

export interface MessageAttachment {
  id: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  bookingId?: string;
  isGroup: boolean;
  isEncrypted: boolean;
  lastMessage?: Message;
  createdAt: Date;
  updatedAt: Date;
}

// Payment Types
export interface Payment {
  id: string;
  bookingId: string;
  clientId: string;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  stripePaymentIntentId?: string;
  status: PaymentStatus;
  processedAt?: Date;
  refundedAt?: Date;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum PaymentMethod {
  CARD = 'card',
  BANK_TRANSFER = 'bank_transfer',
  INVOICE = 'invoice',
  CASH = 'cash'
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: Priority;
  isRead: boolean;
  actionUrl?: string;
  metadata?: any;
  sentAt: Date;
}

export enum NotificationType {
  BOOKING_CONFIRMED = 'booking_confirmed',
  BOOKING_CANCELLED = 'booking_cancelled',
  PAYMENT_RECEIVED = 'payment_received',
  EMERGENCY_ALERT = 'emergency_alert',
  AGENT_ASSIGNED = 'agent_assigned',
  MESSAGE_RECEIVED = 'message_received',
  SYSTEM_UPDATE = 'system_update'
}

// API Request/Response Types
export interface AuthenticatedRequest extends Request {
  user?: User;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// Database Types
export interface DatabaseConnection {
  query: (text: string, params?: any[]) => Promise<any>;
  transaction: (callback: (client: any) => Promise<any>) => Promise<any>;
}

// WebSocket Types
export interface SocketEvent {
  type: string;
  data: any;
  timestamp: Date;
}

export interface ClientSocket {
  id: string;
  userId: string;
  isAuthenticated: boolean;
  connectedAt: Date;
}

// Emergency Types
export interface EmergencyAlert {
  id: string;
  clientId: string;
  bookingId?: string;
  location: Address;
  severity: EmergencySeverity;
  description: string;
  status: EmergencyStatus;
  responders: string[];
  createdAt: Date;
  resolvedAt?: Date;
}

export enum EmergencySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum EmergencyStatus {
  ACTIVE = 'active',
  RESPONDING = 'responding',
  RESOLVED = 'resolved',
  FALSE_ALARM = 'false_alarm'
}