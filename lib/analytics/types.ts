// Analytics Types for GQ Cars Predictive System
export interface BookingData {
  id: string
  service: string
  subService?: string
  date: string
  time: string
  duration: number
  location: string
  customerInfo: {
    name: string
    email: string
    phone: string
    isReturning: boolean
    customerValue: number
  }
  requirements?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  driverId?: string
  vehicleId?: string
  actualDuration?: number
  cost: number
  rating?: number
  feedback?: string
  weatherConditions?: string
  trafficConditions?: string
  securityIncidents?: SecurityIncident[]
}

export interface SecurityIncident {
  id: string
  type: 'threat' | 'suspicious_activity' | 'route_deviation' | 'emergency' | 'minor_incident'
  severity: 'low' | 'medium' | 'high' | 'critical'
  location: string
  coordinates: { lat: number; lng: number }
  timestamp: string
  description: string
  resolved: boolean
  bookingId?: string
  driverId?: string
}

export interface DemandPrediction {
  id: string
  timeSlot: string
  location: string
  serviceType: string
  predictedDemand: number
  confidence: number
  factors: {
    historical: number
    weather: number
    events: number
    seasonal: number
    dayOfWeek: number
  }
  recommendations: string[]
  createdAt: string
}

export interface RouteAnalysis {
  id: string
  origin: string
  destination: string
  routeOptions: RouteOption[]
  securityScore: number
  trafficScore: number
  optimalRoute: string
  estimatedTime: number
  riskFactors: string[]
  securityRecommendations: string[]
  alternativeRoutes: string[]
  createdAt: string
}

export interface RouteOption {
  id: string
  path: string
  distance: number
  estimatedTime: number
  securityScore: number
  trafficScore: number
  tollCost: number
  fuelCost: number
  riskLevel: 'low' | 'medium' | 'high'
  securityFeatures: string[]
}

export interface DriverAnalytics {
  driverId: string
  name: string
  totalBookings: number
  averageRating: number
  completionRate: number
  punctualityScore: number
  securityScore: number
  availability: {
    current: boolean
    schedule: AvailabilitySlot[]
    predictedNext: string
  }
  performance: {
    responseTime: number
    customerSatisfaction: number
    incidentRate: number
    efficiencyScore: number
  }
  expertise: string[]
  certifications: string[]
  lastActive: string
}

export interface AvailabilitySlot {
  start: string
  end: string
  status: 'available' | 'booked' | 'break' | 'maintenance'
  location?: string
}

export interface CustomerBehavior {
  customerId: string
  totalBookings: number
  averageBookingValue: number
  preferredServices: string[]
  preferredTimes: string[]
  preferredLocations: string[]
  loyaltyScore: number
  churnRisk: number
  lifetimeValue: number
  behaviorPattern: 'regular' | 'sporadic' | 'seasonal' | 'one-time'
  nextBookingPrediction: {
    probability: number
    estimatedDate: string
    suggestedService: string
  }
  preferences: {
    preferredDrivers: string[]
    specialRequirements: string[]
    communicationPreference: 'email' | 'phone' | 'whatsapp'
  }
}

export interface BusinessMetrics {
  id: string
  date: string
  revenue: number
  bookings: number
  cancelationRate: number
  averageBookingValue: number
  customerSatisfaction: number
  driverUtilization: number
  fleetEfficiency: number
  securityIncidents: number
  growthRate: number
  marketShare: number
  operationalCosts: number
  profitMargin: number
  customerAcquisitionCost: number
  customerRetentionRate: number
}

export interface RecommendationEngine {
  customerId: string
  recommendations: {
    service: string
    confidence: number
    reason: string
    expectedValue: number
    urgency: 'low' | 'medium' | 'high'
  }[]
  personalizedPricing: {
    basePrice: number
    discount: number
    dynamicAdjustment: number
    finalPrice: number
  }
  optimalTiming: {
    suggestedTime: string
    reason: string
    availability: boolean
  }
}

export interface AnomalyAlert {
  id: string
  type: 'demand_spike' | 'security_threat' | 'driver_shortage' | 'system_anomaly' | 'customer_complaint'
  severity: 'info' | 'warning' | 'critical' | 'emergency'
  title: string
  description: string
  data: any
  location?: string
  timestamp: string
  resolved: boolean
  actions: string[]
  assignedTo?: string
}

export interface PredictionModel {
  modelId: string
  type: 'demand' | 'churn' | 'lifetime_value' | 'route_optimization' | 'security_risk'
  accuracy: number
  lastTrained: string
  version: string
  features: string[]
  parameters: any
  performanceMetrics: {
    accuracy: number
    precision: number
    recall: number
    f1Score: number
    mse?: number
    mae?: number
  }
}

// Dashboard and UI Types
export interface DashboardData {
  summary: {
    totalBookings: number
    revenue: number
    activeDrivers: number
    customerSatisfaction: number
    securityScore: number
  }
  trends: {
    bookingTrend: ChartData[]
    revenueTrend: ChartData[]
    demandHeatmap: HeatmapData[]
  }
  predictions: {
    demandForecast: DemandPrediction[]
    riskAlerts: AnomalyAlert[]
    recommendations: string[]
  }
  realtime: {
    activeBookings: number
    availableDrivers: number
    currentIncidents: number
    systemHealth: number
  }
}

export interface ChartData {
  x: string | number
  y: number
  label?: string
  category?: string
}

export interface HeatmapData {
  location: string
  coordinates: { lat: number; lng: number }
  value: number
  intensity: number
  time: string
}

// API Response Types
export interface AnalyticsResponse<T> {
  success: boolean
  data: T
  timestamp: string
  metadata?: {
    total: number
    page: number
    limit: number
  }
  error?: string
}

export interface PredictionRequest {
  type: 'demand' | 'route' | 'availability' | 'customer_behavior'
  parameters: {
    timeRange?: string
    location?: string
    serviceType?: string
    customerId?: string
    [key: string]: any
  }
}

// Real-time Event Types
export interface RealTimeEvent {
  type: 'booking_created' | 'booking_updated' | 'driver_status_changed' | 'security_alert' | 'anomaly_detected'
  data: any
  timestamp: string
  source: string
}