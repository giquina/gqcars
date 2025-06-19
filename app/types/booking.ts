// Vehicle Types Interface
export interface VehicleType {
  id: string
  name: string
  description: string
  capacity: number
  priceMultiplier: number
  features: string[]
  basePrice: number
  image?: string
}

// Driver Profile Interface
export interface Driver {
  id: string
  name: string
  photo: string
  rating: number
  siaLicense: string
  experience: number
  specializations: string[]
  currentLocation: {
    lat: number
    lng: number
  }
  isAvailable: boolean
  eta?: number
  vehicle: VehicleType
  reviews: number
  isOnline: boolean
}

// Booking Form Data
export interface BookingFormData {
  // Journey Details
  pickupAddress: string
  pickupCoordinates?: { lat: number; lng: number }
  destinationAddress: string
  destinationCoordinates?: { lat: number; lng: number }
  
  // Vehicle & Service
  vehicleType: string
  passengerCount: number
  specialRequirements: string
  
  // Scheduling
  schedulingType: 'asap' | 'future' | 'recurring'
  date?: string
  time?: string
  recurringPattern?: 'daily' | 'weekly' | 'monthly'
  
  // Customer Info
  customerName: string
  customerEmail: string
  customerPhone: string
  
  // Selected Driver
  selectedDriverId?: string
  
  // Additional Services
  additionalServices: string[]
  
  // Pricing
  estimatedPrice?: number
  finalPrice?: number
}

// Pricing Breakdown
export interface PricingBreakdown {
  baseFare: number
  siaLicensePremium: number
  distanceCharge: number
  timeCharge: number
  surcharges: {
    name: string
    amount: number
  }[]
  tollCosts: number
  parkingFees: number
  subtotal: number
  taxes: number
  total: number
  estimatedDuration: number
  estimatedDistance: number
  comparisonPrice?: number // Regular taxi price for comparison
}

// Booking Confirmation
export interface BookingConfirmation {
  bookingId: string
  referenceCode: string
  qrCode: string
  status: 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled'
  driver: Driver
  vehicle: VehicleType
  pickupTime: string
  estimatedArrival: string
  pricing: PricingBreakdown
  customerDetails: {
    name: string
    email: string
    phone: string
  }
  journey: {
    pickup: string
    destination: string
    distance: number
    duration: number
  }
  specialInstructions?: string
  createdAt: string
  updatedAt: string
}

// Real-time Updates
export interface BookingUpdate {
  bookingId: string
  type: 'driver-assigned' | 'driver-enroute' | 'driver-arrived' | 'journey-started' | 'journey-completed'
  message: string
  timestamp: string
  location?: { lat: number; lng: number }
  estimatedArrival?: string
}

// Vehicle Types Configuration
export const VEHICLE_TYPES: Record<string, VehicleType> = {
  standard: {
    id: 'standard',
    name: 'SIA Taxi',
    description: 'Professional SIA-licensed driver with standard vehicle',
    capacity: 4,
    priceMultiplier: 1.0,
    basePrice: 2.5,
    features: ['SIA Licensed Driver', 'GPS Tracking', 'Card Payment', 'Professional Service']
  },
  executive: {
    id: 'executive',
    name: 'Executive Car',
    description: 'Mercedes/BMW with Close Protection Officer',
    capacity: 4,
    priceMultiplier: 1.5,
    basePrice: 3.5,
    features: ['Close Protection Officer', 'Luxury Vehicle', 'WiFi', 'Complimentary Water', 'Premium Interior']
  },
  security: {
    id: 'security',
    name: 'Security Transport',
    description: 'Armored vehicle with full protection detail',
    capacity: 3,
    priceMultiplier: 3.0,
    basePrice: 8.0,
    features: ['Armored Vehicle', 'Armed Protection', 'Secure Communications', 'Threat Assessment', 'Emergency Response']
  }
}

// Pricing Configuration
export const PRICING_CONFIG = {
  baseFareMin: 15.0,
  siaLicensePremium: 5.0,
  perMileRate: 2.5,
  perMinuteRate: 0.5,
  surcharges: {
    nightTime: { rate: 0.2, description: 'Night surcharge (10PM - 6AM)' },
    weekend: { rate: 0.15, description: 'Weekend surcharge' },
    holiday: { rate: 0.25, description: 'Holiday surcharge' },
    airport: { rate: 10.0, description: 'Airport pickup/dropoff fee' }
  },
  taxes: 0.2 // 20% VAT
}