import { BookingRequest, ServiceType, Location } from '../types';
import apiService from './api';

interface PricingRequest {
  serviceType: ServiceType;
  route: {
    pickup: Location;
    dropoff?: Location;
  };
  pickupDateTime: Date;
  passengerCount: number;
  userTier: 'standard' | 'premium' | 'vip';
  vehiclePreference?: string;
}

interface PricingFactors {
  demand: DemandData;
  traffic: TrafficData;
  weather: WeatherData;
  events: EventData[];
  timeOfDay: number;
  dayOfWeek: number;
  userTier: string;
  historicalData: HistoricalPricing;
  seasonalMultiplier: number;
  driverAvailability: number;
}

interface DemandData {
  currentDemand: number; // 0-1 scale
  peakHours: number[];
  demandTrend: 'increasing' | 'decreasing' | 'stable';
  competitorPricing: number;
  serviceTypePopularity: number;
}

interface TrafficData {
  currentConditions: 'light' | 'moderate' | 'heavy' | 'severe';
  estimatedDuration: number;
  baselineDuration: number;
  trafficMultiplier: number;
  alternativeRoutes: number;
}

interface WeatherData {
  conditions: 'clear' | 'rain' | 'snow' | 'storm' | 'fog';
  temperature: number;
  visibility: number;
  windSpeed: number;
  weatherMultiplier: number;
}

interface EventData {
  name: string;
  type: 'concert' | 'sports' | 'conference' | 'festival' | 'other';
  location: Location;
  startTime: Date;
  endTime: Date;
  estimatedAttendees: number;
  impactRadius: number; // km
}

interface HistoricalPricing {
  averagePrice: number;
  priceRange: { min: number; max: number };
  popularTimes: number[];
  seasonalTrends: SeasonalTrend[];
  userBookingHistory: UserPricingHistory[];
}

interface SeasonalTrend {
  month: number;
  multiplier: number;
  reason: string;
}

interface UserPricingHistory {
  serviceType: ServiceType;
  averageSpend: number;
  priceElasticity: number; // How sensitive user is to price changes
  bookingFrequency: number;
  preferredTimeSlots: number[];
}

interface PricingResult {
  basePrice: number;
  finalPrice: number;
  breakdown: {
    basePrice: number;
    demandAdjustment: number;
    trafficAdjustment: number;
    timeAdjustment: number;
    weatherAdjustment: number;
    eventAdjustment: number;
    userTierDiscount: number;
    seasonalAdjustment: number;
  };
  explanation: string[];
  confidence: number;
  priceRange: { min: number; max: number };
  suggestedAlternatives?: PricingAlternative[];
}

interface PricingAlternative {
  timeAdjustment: number; // minutes to adjust pickup time
  priceDifference: number;
  reason: string;
  confidence: number;
}

export class DynamicPricingService {
  private static readonly BASE_PRICES = {
    [ServiceType.PRIVATE_HIRE]: 25,
    [ServiceType.CORPORATE]: 35,
    [ServiceType.VIP]: 55,
    [ServiceType.WEDDING]: 75,
    [ServiceType.CLOSE_PROTECTION]: 150,
  };

  private static readonly MAX_SURGE_MULTIPLIER = 3.0;
  private static readonly MIN_PRICE_MULTIPLIER = 0.8;

  static async calculatePrice(request: PricingRequest): Promise<PricingResult> {
    try {
      // Gather all pricing factors
      const factors = await this.gatherPricingFactors(request);
      
      // Calculate base price
      const basePrice = this.calculateBasePrice(request);
      
      // Apply dynamic adjustments
      const adjustments = this.calculateAdjustments(factors, request);
      
      // Calculate final price with bounds checking
      const finalPrice = this.applyAdjustments(basePrice, adjustments);
      
      // Generate explanation
      const explanation = this.generatePriceExplanation(adjustments, factors);
      
      // Calculate confidence score
      const confidence = this.calculateConfidence(factors);
      
      // Generate alternatives
      const alternatives = await this.generateAlternatives(request, factors);

      return {
        basePrice,
        finalPrice,
        breakdown: {
          basePrice,
          demandAdjustment: adjustments.demand,
          trafficAdjustment: adjustments.traffic,
          timeAdjustment: adjustments.time,
          weatherAdjustment: adjustments.weather,
          eventAdjustment: adjustments.events,
          userTierDiscount: adjustments.userTier,
          seasonalAdjustment: adjustments.seasonal,
        },
        explanation,
        confidence,
        priceRange: {
          min: Math.max(finalPrice * 0.9, basePrice * this.MIN_PRICE_MULTIPLIER),
          max: Math.min(finalPrice * 1.1, basePrice * this.MAX_SURGE_MULTIPLIER),
        },
        suggestedAlternatives: alternatives,
      };
    } catch (error) {
      console.error('Failed to calculate dynamic price:', error);
      
      // Fallback to base price
      const basePrice = this.calculateBasePrice(request);
      return {
        basePrice,
        finalPrice: basePrice,
        breakdown: {
          basePrice,
          demandAdjustment: 0,
          trafficAdjustment: 0,
          timeAdjustment: 0,
          weatherAdjustment: 0,
          eventAdjustment: 0,
          userTierDiscount: 0,
          seasonalAdjustment: 0,
        },
        explanation: ['Standard pricing applied'],
        confidence: 0.5,
        priceRange: { min: basePrice * 0.9, max: basePrice * 1.1 },
      };
    }
  }

  private static async gatherPricingFactors(request: PricingRequest): Promise<PricingFactors> {
    const [demand, traffic, weather, events, historical] = await Promise.all([
      this.getCurrentDemand(request.serviceType, request.route.pickup),
      this.getTrafficConditions(request.route),
      this.getWeatherConditions(request.route.pickup),
      this.getLocalEvents(request.route.pickup, request.pickupDateTime),
      this.getHistoricalPricing(request),
    ]);

    return {
      demand,
      traffic,
      weather,
      events,
      timeOfDay: request.pickupDateTime.getHours(),
      dayOfWeek: request.pickupDateTime.getDay(),
      userTier: request.userTier,
      historicalData: historical,
      seasonalMultiplier: this.getSeasonalMultiplier(request.pickupDateTime),
      driverAvailability: await this.getDriverAvailability(request),
    };
  }

  private static calculateBasePrice(request: PricingRequest): number {
    let basePrice = this.BASE_PRICES[request.serviceType];
    
    // Distance-based pricing
    if (request.route.dropoff) {
      const distance = this.calculateDistance(request.route.pickup, request.route.dropoff);
      basePrice += distance * this.getDistanceRate(request.serviceType);
    }
    
    // Passenger count adjustment
    if (request.passengerCount > 4) {
      basePrice *= 1.2; // 20% increase for larger vehicles
    }
    
    // Vehicle preference premium
    if (request.vehiclePreference === 'luxury') {
      basePrice *= 1.3;
    } else if (request.vehiclePreference === 'premium') {
      basePrice *= 1.15;
    }

    return Math.round(basePrice * 100) / 100;
  }

  private static calculateAdjustments(factors: PricingFactors, request: PricingRequest) {
    return {
      demand: this.calculateDemandAdjustment(factors.demand),
      traffic: this.calculateTrafficAdjustment(factors.traffic),
      time: this.calculateTimeAdjustment(factors.timeOfDay, factors.dayOfWeek),
      weather: this.calculateWeatherAdjustment(factors.weather),
      events: this.calculateEventAdjustment(factors.events, request.route.pickup),
      userTier: this.calculateUserTierDiscount(factors.userTier),
      seasonal: this.calculateSeasonalAdjustment(factors.seasonalMultiplier),
    };
  }

  private static calculateDemandAdjustment(demand: DemandData): number {
    let adjustment = 0;
    
    // Base demand multiplier
    adjustment += (demand.currentDemand - 0.5) * 40; // ±20% for demand
    
    // Trend adjustment
    if (demand.demandTrend === 'increasing') {
      adjustment += 5;
    } else if (demand.demandTrend === 'decreasing') {
      adjustment -= 3;
    }
    
    // Service popularity boost
    adjustment += demand.serviceTypePopularity * 5;
    
    return Math.max(-25, Math.min(50, adjustment)); // Cap at ±25% to +50%
  }

  private static calculateTrafficAdjustment(traffic: TrafficData): number {
    const delayRatio = traffic.estimatedDuration / traffic.baselineDuration;
    
    if (delayRatio > 1.5) {
      return 20; // 20% increase for severe traffic
    } else if (delayRatio > 1.2) {
      return 10; // 10% increase for heavy traffic
    } else if (delayRatio > 1.1) {
      return 5; // 5% increase for moderate traffic
    }
    
    return 0;
  }

  private static calculateTimeAdjustment(hour: number, dayOfWeek: number): number {
    let adjustment = 0;
    
    // Peak hours (7-9 AM, 5-7 PM on weekdays)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
    const isMorningPeak = hour >= 7 && hour <= 9;
    const isEveningPeak = hour >= 17 && hour <= 19;
    
    if (isWeekday && (isMorningPeak || isEveningPeak)) {
      adjustment += 15;
    }
    
    // Late night premium (10 PM - 6 AM)
    if (hour >= 22 || hour <= 6) {
      adjustment += 20;
    }
    
    // Weekend premium
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      if (hour >= 20 && hour <= 2) {
        adjustment += 25; // Weekend night premium
      } else {
        adjustment += 10; // General weekend premium
      }
    }
    
    return adjustment;
  }

  private static calculateWeatherAdjustment(weather: WeatherData): number {
    switch (weather.conditions) {
      case 'storm':
        return 30;
      case 'snow':
        return 25;
      case 'rain':
        return 15;
      case 'fog':
        return 10;
      default:
        return 0;
    }
  }

  private static calculateEventAdjustment(events: EventData[], pickup: Location): number {
    let maxAdjustment = 0;
    
    events.forEach(event => {
      const distance = this.calculateDistance(pickup, event.location);
      
      if (distance <= event.impactRadius) {
        const impact = Math.max(0, 1 - (distance / event.impactRadius));
        const attendeeMultiplier = Math.min(event.estimatedAttendees / 10000, 2);
        const adjustment = impact * attendeeMultiplier * 20;
        
        maxAdjustment = Math.max(maxAdjustment, adjustment);
      }
    });
    
    return Math.min(maxAdjustment, 40); // Cap at 40%
  }

  private static calculateUserTierDiscount(userTier: string): number {
    switch (userTier) {
      case 'vip':
        return -15; // 15% discount
      case 'premium':
        return -8; // 8% discount
      default:
        return 0;
    }
  }

  private static calculateSeasonalAdjustment(multiplier: number): number {
    return (multiplier - 1) * 100; // Convert to percentage
  }

  private static applyAdjustments(basePrice: number, adjustments: any): number {
    let finalPrice = basePrice;
    
    // Apply each adjustment as a percentage
    Object.values(adjustments).forEach((adjustment: any) => {
      finalPrice *= (1 + adjustment / 100);
    });
    
    // Ensure reasonable bounds
    const minPrice = basePrice * this.MIN_PRICE_MULTIPLIER;
    const maxPrice = basePrice * this.MAX_SURGE_MULTIPLIER;
    
    return Math.max(minPrice, Math.min(maxPrice, Math.round(finalPrice * 100) / 100));
  }

  private static generatePriceExplanation(adjustments: any, factors: PricingFactors): string[] {
    const explanations: string[] = [];
    
    if (adjustments.demand > 10) {
      explanations.push('High demand in your area');
    } else if (adjustments.demand < -5) {
      explanations.push('Lower demand - discounted pricing');
    }
    
    if (adjustments.traffic > 5) {
      explanations.push('Traffic delays expected');
    }
    
    if (adjustments.time > 15) {
      explanations.push('Peak time surcharge');
    } else if (adjustments.time > 10) {
      explanations.push('Late night premium');
    }
    
    if (adjustments.weather > 10) {
      explanations.push(`Weather conditions: ${factors.weather.conditions}`);
    }
    
    if (adjustments.events > 10) {
      explanations.push('Local events affecting availability');
    }
    
    if (adjustments.userTier < 0) {
      explanations.push(`${factors.userTier} member discount applied`);
    }
    
    if (explanations.length === 0) {
      explanations.push('Standard pricing applied');
    }
    
    return explanations;
  }

  private static calculateConfidence(factors: PricingFactors): number {
    let confidence = 0.7; // Base confidence
    
    // Increase confidence with more data
    if (factors.historicalData.userBookingHistory.length > 5) {
      confidence += 0.1;
    }
    
    if (factors.demand.currentDemand > 0) {
      confidence += 0.1;
    }
    
    if (factors.traffic.currentConditions !== 'moderate') {
      confidence += 0.05;
    }
    
    return Math.min(confidence, 0.95);
  }

  private static async generateAlternatives(
    request: PricingRequest,
    factors: PricingFactors
  ): Promise<PricingAlternative[]> {
    const alternatives: PricingAlternative[] = [];
    
    // Earlier/later time alternatives
    const alternativeTimes = [-60, -30, 30, 60]; // minutes
    
    for (const timeAdjustment of alternativeTimes) {
      const altDateTime = new Date(request.pickupDateTime.getTime() + timeAdjustment * 60000);
      const altTimeAdjustment = this.calculateTimeAdjustment(
        altDateTime.getHours(),
        altDateTime.getDay()
      );
      
      const currentTimeAdjustment = this.calculateTimeAdjustment(
        request.pickupDateTime.getHours(),
        request.pickupDateTime.getDay()
      );
      
      const priceDifference = (altTimeAdjustment - currentTimeAdjustment) / 100 * this.calculateBasePrice(request);
      
      if (Math.abs(priceDifference) > 2) { // Only suggest if difference is significant
        alternatives.push({
          timeAdjustment,
          priceDifference: -priceDifference, // Negative because we show savings
          reason: timeAdjustment < 0 ? 'Earlier pickup' : 'Later pickup',
          confidence: 0.8,
        });
      }
    }
    
    return alternatives.sort((a, b) => b.priceDifference - a.priceDifference).slice(0, 3);
  }

  // Helper methods for data gathering (these would connect to real APIs)
  private static async getCurrentDemand(serviceType: ServiceType, location: Location): Promise<DemandData> {
    // Mock implementation - would connect to real demand data
    return {
      currentDemand: 0.6 + Math.random() * 0.4, // 0.6-1.0
      peakHours: [7, 8, 9, 17, 18, 19],
      demandTrend: 'stable',
      competitorPricing: 30,
      serviceTypePopularity: 0.7,
    };
  }

  private static async getTrafficConditions(route: any): Promise<TrafficData> {
    // Mock implementation - would connect to Google Maps/traffic APIs
    return {
      currentConditions: 'moderate',
      estimatedDuration: 25,
      baselineDuration: 20,
      trafficMultiplier: 1.25,
      alternativeRoutes: 2,
    };
  }

  private static async getWeatherConditions(location: Location): Promise<WeatherData> {
    // Mock implementation - would connect to weather API
    return {
      conditions: 'clear',
      temperature: 22,
      visibility: 10,
      windSpeed: 5,
      weatherMultiplier: 1.0,
    };
  }

  private static async getLocalEvents(location: Location, dateTime: Date): Promise<EventData[]> {
    // Mock implementation - would connect to events API
    return [];
  }

  private static async getHistoricalPricing(request: PricingRequest): Promise<HistoricalPricing> {
    // Mock implementation - would query historical data
    return {
      averagePrice: this.BASE_PRICES[request.serviceType],
      priceRange: { min: 20, max: 60 },
      popularTimes: [8, 9, 17, 18],
      seasonalTrends: [],
      userBookingHistory: [],
    };
  }

  private static getSeasonalMultiplier(date: Date): number {
    const month = date.getMonth();
    
    // Holiday seasons (December, January)
    if (month === 11 || month === 0) {
      return 1.2;
    }
    
    // Summer peak (June, July, August)
    if (month >= 5 && month <= 7) {
      return 1.1;
    }
    
    return 1.0;
  }

  private static async getDriverAvailability(request: PricingRequest): Promise<number> {
    // Mock implementation - would check real driver availability
    return 0.7; // 70% availability
  }

  private static getDistanceRate(serviceType: ServiceType): number {
    const rates = {
      [ServiceType.PRIVATE_HIRE]: 2.5,
      [ServiceType.CORPORATE]: 3.0,
      [ServiceType.VIP]: 4.0,
      [ServiceType.WEDDING]: 3.5,
      [ServiceType.CLOSE_PROTECTION]: 6.0,
    };
    
    return rates[serviceType];
  }

  private static calculateDistance(location1: Location, location2: Location): number {
    // Haversine formula for distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(location2.latitude - location1.latitude);
    const dLon = this.deg2rad(location2.longitude - location1.longitude);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(location1.latitude)) * Math.cos(this.deg2rad(location2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}

export default DynamicPricingService;