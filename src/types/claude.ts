export type ServiceType = 
  | 'TAXI'
  | 'PRIVATE_HIRE'
  | 'AIRPORT_TRANSFER'
  | 'CORPORATE'
  | 'SECURITY'
  | 'WEDDING'

export type SecurityLevel = 
  | 'STANDARD'
  | 'ENHANCED'
  | 'EXECUTIVE'
  | 'VIP'

export type DemandLevel = 
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'SURGE'

export interface UserPreferences {
  preferredService: ServiceType
  savedLocations: {
    home?: string
    work?: string
  }
  communicationPreferences: {
    language: string
    notifications: boolean
    contactMethod: 'chat' | 'phone' | 'email'
  }
}

export interface BookingSummary {
  id: string
  date: string
  service: string
  pickupLocation: string
  destination: string
  status: string
}

export interface AIContext {
  conversationId: string
  messages: any[]
  userProfile?: {
    id: string
    name: string
    preferences: UserPreferences
    bookingHistory: BookingSummary[]
  }
  systemState: {
    availableDrivers: any[]
    currentDemand: DemandLevel
    pricing: {
      baseRates?: Record<string, number>
      securityPremium: {
        STANDARD: number
        ENHANCED: number
        EXECUTIVE: number
        VIP: number
      }
      demandMultiplier?: number
    }
  }
}

export interface AIAction {
  type: string
  payload: any
}

export interface AIResponse {
  message: {
    content: string
  }
  actions?: AIAction[]
}