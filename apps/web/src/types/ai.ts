import { SecurityLevel, ServiceType } from '@prisma/client'

export interface AIMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    context?: string
    intent?: string
    confidence?: number
    entities?: Record<string, any>
  }
}

export interface AIContext {
  conversationId: string
  messages: AIMessage[]
  userProfile?: {
    id: string
    name: string
    preferences: UserPreferences
    bookingHistory: BookingSummary[]
  }
  systemState: {
    availableDrivers: DriverAvailability[]
    currentDemand: DemandLevel
    pricing: PricingInfo
  }
}

export interface UserPreferences {
  preferredService?: ServiceType
  preferredSecurityLevel?: SecurityLevel
  savedLocations: {
    home?: Location
    work?: Location
    favorite?: Location[]
  }
  communicationPreferences: {
    language: string
    notifications: boolean
    contactMethod: 'chat' | 'phone' | 'email'
  }
}

export interface BookingSummary {
  id: string
  date: Date
  service: ServiceType
  securityLevel: SecurityLevel
  status: string
  rating?: number
  feedback?: string
}

export interface DriverAvailability {
  id: string
  location: Location
  status: 'available' | 'busy' | 'offline'
  securityLevel: SecurityLevel[]
  services: ServiceType[]
  estimatedArrival?: number // minutes
}

export type DemandLevel = 'low' | 'medium' | 'high' | 'surge'

export interface PricingInfo {
  baseRates: Record<ServiceType, number>
  securityPremium: Record<SecurityLevel, number>
  demandMultiplier: number
  specialRates?: {
    airport: number
    corporate: number
    events: number
  }
}

export interface Location {
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  placeId?: string
  zone?: string
}

export interface SecurityAssessment {
  overallRisk: 'low' | 'medium' | 'high'
  factors: {
    time: number // 0-1 risk score
    location: number
    route: number
    eventType?: number
  }
  recommendations: {
    securityLevel: SecurityLevel
    additionalMeasures?: string[]
    alternativeRoutes?: Route[]
  }
}

export interface Route {
  origin: Location
  destination: Location
  waypoints?: Location[]
  distance: number
  duration: number
  riskLevel: number
  securityConcerns?: string[]
}

export interface AIResponse {
  message: AIMessage
  actions?: AIAction[]
  context?: {
    intent: string
    entities: Record<string, any>
    nextSteps?: string[]
  }
}

export interface AIAction {
  type: 'quote' | 'book' | 'security' | 'contact' | 'info'
  payload: Record<string, any>
}

export interface ConversationState {
  id: string
  messages: AIMessage[]
  context: AIContext
  activeQuote?: QuoteDetails
  activeBooking?: BookingDetails
  securityAssessment?: SecurityAssessment
}

export interface QuoteDetails {
  id: string
  pickup: Location
  dropoff: Location
  service: ServiceType
  security: SecurityLevel
  datetime: Date
  passengers: number
  estimatedPrice: {
    base: number
    security: number
    extras: number
    total: number
  }
  availability: {
    drivers: number
    estimatedPickup: number // minutes
  }
}

export interface BookingDetails extends QuoteDetails {
  status: 'pending' | 'confirmed' | 'assigned' | 'active' | 'completed'
  driver?: {
    id: string
    name: string
    rating: number
    securityLevel: SecurityLevel
    estimatedArrival: number
  }
  payment: {
    method: string
    status: string
    breakdown: Record<string, number>
  }
  tracking: {
    currentLocation?: Location
    eta?: number
    status: string
  }
}