// AI System Types and Interfaces
export interface AIModels {
  pricingOptimization: {
    inputs: ['time', 'weather', 'events', 'demand', 'traffic'];
    output: 'optimal_pricing_multiplier';
    accuracy: '>92%';
    updateFrequency: 'hourly';
  };
  demandPrediction: {
    inputs: ['historical_data', 'events', 'weather', 'time_patterns'];
    output: 'expected_bookings_per_hour';
    accuracy: '>88%';
    updateFrequency: 'daily';
  };
  driverMatching: {
    inputs: ['location', 'rating', 'preferences', 'performance'];
    output: 'best_driver_assignment';
    optimizationGoal: 'customer_satisfaction + efficiency';
  };
}

export interface PricingFactors {
  basePrice: number;
  timeMultiplier: number;
  demandMultiplier: number;
  weatherMultiplier: number;
  eventMultiplier: number;
  trafficMultiplier: number;
  competitorPricing: number;
  seasonalMultiplier: number;
}

export interface DemandPrediction {
  hour: number;
  expectedBookings: number;
  confidence: number;
  factors: {
    historical: number;
    weather: number;
    events: number;
    seasonality: number;
  };
}

export interface DriverProfile {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  performance: {
    onTimePercentage: number;
    customerSatisfaction: number;
    completionRate: number;
    responseTime: number;
  };
  availability: boolean;
  preferences: {
    serviceTypes: string[];
    maxDistance: number;
    preferredHours: string[];
  };
  skills: string[];
  certifications: string[];
}

export interface BookingRequest {
  id: string;
  serviceType: string;
  location: {
    pickup: { lat: number; lng: number; address: string };
    destination?: { lat: number; lng: number; address: string };
  };
  requestedTime: Date;
  duration: number;
  customerProfile: CustomerProfile;
  priority: 'standard' | 'priority' | 'vip';
  requirements: string[];
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  tier: 'standard' | 'premium' | 'vip';
  history: {
    totalBookings: number;
    cancelationRate: number;
    averageRating: number;
    preferredServices: string[];
    preferredDrivers: string[];
  };
  preferences: {
    driverGender?: 'male' | 'female';
    vehicleType?: string;
    communicationStyle: 'minimal' | 'regular' | 'detailed';
  };
  riskProfile: 'low' | 'medium' | 'high';
}

export interface AIDecisionContext {
  timestamp: Date;
  decisionType: 'pricing' | 'dispatch' | 'demand_forecast' | 'customer_service';
  inputs: Record<string, any>;
  output: any;
  confidence: number;
  reasoning: string[];
  performanceMetrics?: {
    responseTime: number;
    accuracy?: number;
  };
}

export interface WeatherData {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  visibility: number;
  conditions: 'clear' | 'rain' | 'snow' | 'fog' | 'storm';
  severity: 'low' | 'medium' | 'high';
}

export interface EventData {
  id: string;
  name: string;
  location: { lat: number; lng: number };
  startTime: Date;
  endTime: Date;
  expectedAttendance: number;
  category: 'concert' | 'sports' | 'conference' | 'festival' | 'other';
  impact: 'low' | 'medium' | 'high';
}

export interface TrafficData {
  congestionLevel: number; // 0-100
  averageSpeed: number;
  incidents: number;
  predictedDelay: number;
  optimalRoutes: Array<{
    route: string;
    duration: number;
    distance: number;
  }>;
}

export interface ChurnPrediction {
  customerId: string;
  churnProbability: number;
  riskFactors: string[];
  recommendedActions: string[];
  timeToChurn: number; // days
}

export interface RevenueOptimization {
  currentRevenue: number;
  optimizedRevenue: number;
  recommendations: Array<{
    action: string;
    impact: number;
    confidence: number;
  }>;
}

export interface FraudDetection {
  transactionId: string;
  riskScore: number; // 0-100
  riskFactors: string[];
  recommendation: 'approve' | 'review' | 'decline';
  explanation: string;
}

export interface ChatbotContext {
  sessionId: string;
  customerId?: string;
  intent: string;
  confidence: number;
  entities: Record<string, any>;
  conversationHistory: Array<{
    message: string;
    sender: 'user' | 'bot';
    timestamp: Date;
  }>;
  escalationRequired: boolean;
}

export interface NotificationOptimization {
  customerId: string;
  channel: 'email' | 'sms' | 'push' | 'call';
  optimalTime: Date;
  content: string;
  expectedEngagement: number;
  priority: number;
}

export interface AIPerformanceMetrics {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  responseTime: number;
  lastUpdated: Date;
  trainingDataSize: number;
  predictionCount: number;
}