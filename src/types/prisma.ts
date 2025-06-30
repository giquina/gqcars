// Type definitions to replace Prisma enums for SQLite compatibility

export type SecurityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export type ServiceType = 'STANDARD' | 'PREMIUM' | 'EXECUTIVE' | 'GROUP'

export type DemandLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'PEAK'

// Extended user interface for NextAuth compatibility
export interface ExtendedUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
  phone?: string | null
}

// Booking form data interface
export interface BookingFormData {
  service: string
  serviceType: ServiceType
  date: string
  time: string
  pickupLocation: string
  destination: string
  securityLevel: SecurityLevel
  notes?: string
}

// Booking query parameters
export interface BookingQueryParams {
  status?: string
  userId?: string
  dateFrom?: string
  dateTo?: string
  service?: string
}

// Booking update data
export interface BookingUpdateData {
  status?: string
  notes?: string
  totalCost?: number
}

// User preferences for AI context
export interface UserPreferences {
  preferredService: ServiceType
  savedLocations: {
    home?: string
    work?: string
  }
  communicationPreferences: {
    language: string
    notifications: boolean
    contactMethod: 'email' | 'phone' | 'chat'
  }
}

// Booking summary for AI context
export interface BookingSummary {
  id: string
  service: string
  date: string
  status: string
  pickupLocation: string
  destination: string
}