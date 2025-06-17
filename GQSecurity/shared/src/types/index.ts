export interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'admin' | 'officer';
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: BookingStatus;
  startDate: Date;
  endDate: Date;
  location: string;
  requirements: string;
  officers?: number;
  vehicles?: number;
  totalPrice: number;
}

export type ServiceType = 
  | 'close-protection'
  | 'private-hire'
  | 'corporate'
  | 'wedding'
  | 'vip';

export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface Service {
  id: string;
  type: ServiceType;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  requirements?: string[];
}

export interface Officer {
  id: string;
  name: string;
  role: string;
  experience: number;
  certifications: string[];
  services: ServiceType[];
  availability: boolean;
}

export interface Vehicle {
  id: string;
  model: string;
  type: string;
  features: string[];
  capacity: number;
  availability: boolean;
}

export interface Quote {
  id: string;
  serviceType: ServiceType;
  duration: number;
  officers: number;
  vehicles: number;
  location: string;
  totalPrice: number;
  breakdown: {
    basePrice: number;
    officersCost: number;
    vehiclesCost: number;
    additionalCosts: number;
  };
  validUntil: Date;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: 'inquiry' | 'quote' | 'emergency';
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'quote' | 'emergency' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}