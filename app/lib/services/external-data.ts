import { WeatherData, EventData, TrafficData } from '../ai/types';

/**
 * External Data Services for AI Systems
 * Provides real-time data feeds for pricing and dispatch optimization
 */

export class ExternalDataService {
  private static instance: ExternalDataService;
  
  constructor() {
    if (ExternalDataService.instance) {
      return ExternalDataService.instance;
    }
    ExternalDataService.instance = this;
  }

  /**
   * Get weather data for location
   */
  async getWeatherData(location: { lat: number; lng: number }): Promise<WeatherData> {
    try {
      // In production, this would call a real weather API like OpenWeatherMap
      // For demo, return simulated weather data
      const mockWeather: WeatherData = {
        temperature: 18 + Math.random() * 15, // 18-33°C
        precipitation: Math.random() * 0.5, // 0-50% chance
        windSpeed: 5 + Math.random() * 20, // 5-25 mph
        visibility: 8 + Math.random() * 2, // 8-10 km
        conditions: this.getRandomWeatherCondition(),
        severity: this.getWeatherSeverity()
      };

      console.log('Weather data retrieved for location:', location, mockWeather);
      return mockWeather;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Return default weather data
      return {
        temperature: 20,
        precipitation: 0,
        windSpeed: 10,
        visibility: 10,
        conditions: 'clear',
        severity: 'low'
      };
    }
  }

  /**
   * Get traffic data for location
   */
  async getTrafficData(location: { lat: number; lng: number }): Promise<TrafficData> {
    try {
      // In production, this would call Google Maps Traffic API or similar
      const currentHour = new Date().getHours();
      const isRushHour = (currentHour >= 7 && currentHour <= 9) || (currentHour >= 17 && currentHour <= 19);
      
      const mockTraffic: TrafficData = {
        congestionLevel: isRushHour ? 60 + Math.random() * 30 : 20 + Math.random() * 30,
        averageSpeed: isRushHour ? 15 + Math.random() * 15 : 25 + Math.random() * 15,
        incidents: Math.floor(Math.random() * 3),
        predictedDelay: isRushHour ? Math.random() * 20 : Math.random() * 5,
        optimalRoutes: [
          {
            route: 'A40 → M25 → A4',
            duration: 25 + Math.random() * 15,
            distance: 15.2
          },
          {
            route: 'A406 → A40 → M40',
            duration: 30 + Math.random() * 10,
            distance: 18.7
          }
        ]
      };

      console.log('Traffic data retrieved for location:', location, mockTraffic);
      return mockTraffic;
    } catch (error) {
      console.error('Error fetching traffic data:', error);
      return {
        congestionLevel: 25,
        averageSpeed: 30,
        incidents: 0,
        predictedDelay: 0,
        optimalRoutes: []
      };
    }
  }

  /**
   * Get events data for location and timeframe
   */
  async getEventsData(
    location: { lat: number; lng: number },
    timeframe: { start: Date; end: Date }
  ): Promise<EventData[]> {
    try {
      // In production, this would call events APIs like Eventbrite, Facebook Events, etc.
      const mockEvents: EventData[] = [
        {
          id: 'event-001',
          name: 'London Marathon',
          location: { lat: 51.5074, lng: -0.1278 },
          startTime: new Date('2024-04-21T09:00:00'),
          endTime: new Date('2024-04-21T17:00:00'),
          expectedAttendance: 50000,
          category: 'sports',
          impact: 'high'
        },
        {
          id: 'event-002',
          name: 'Tech Conference 2024',
          location: { lat: 51.5155, lng: -0.1426 },
          startTime: new Date('2024-03-15T09:00:00'),
          endTime: new Date('2024-03-15T18:00:00'),
          expectedAttendance: 5000,
          category: 'conference',
          impact: 'medium'
        },
        {
          id: 'event-003',
          name: 'Hyde Park Concert',
          location: { lat: 51.5085, lng: -0.1552 },
          startTime: new Date('2024-07-15T19:00:00'),
          endTime: new Date('2024-07-15T23:00:00'),
          expectedAttendance: 25000,
          category: 'concert',
          impact: 'high'
        }
      ];

      // Filter events near the location and within timeframe
      const nearbyEvents = mockEvents.filter(event => {
        const distance = this.calculateDistance(location, event.location);
        const isInTimeframe = event.startTime >= timeframe.start && event.endTime <= timeframe.end;
        return distance <= 20 && isInTimeframe; // Within 20km and timeframe
      });

      console.log('Events data retrieved for location:', location, nearbyEvents);
      return nearbyEvents;
    } catch (error) {
      console.error('Error fetching events data:', error);
      return [];
    }
  }

  /**
   * Get competitor pricing data
   */
  async getCompetitorPricing(serviceType: string): Promise<{
    averagePrice: number;
    priceRange: { min: number; max: number };
    marketPosition: 'below' | 'competitive' | 'premium';
  }> {
    try {
      // In production, this would scrape competitor websites or use pricing APIs
      const basePrices = {
        'close-protection': 120,
        'private-hire': 80,
        'corporate': 150,
        'weddings': 200,
        'vip': 300
      };

      const basePrice = basePrices[serviceType as keyof typeof basePrices] || 100;
      const variation = 0.15; // ±15% variation

      const mockPricing = {
        averagePrice: basePrice * (1 + (Math.random() - 0.5) * variation),
        priceRange: {
          min: basePrice * 0.85,
          max: basePrice * 1.25
        },
        marketPosition: 'competitive' as const
      };

      console.log('Competitor pricing retrieved for service:', serviceType, mockPricing);
      return mockPricing;
    } catch (error) {
      console.error('Error fetching competitor pricing:', error);
      return {
        averagePrice: 100,
        priceRange: { min: 85, max: 125 },
        marketPosition: 'competitive'
      };
    }
  }

  /**
   * Real-time demand monitoring
   */
  async getCurrentDemand(serviceType: string, location: { lat: number; lng: number }): Promise<{
    currentDemand: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    peakHours: number[];
    demandForecast: Array<{ hour: number; expectedDemand: number }>;
  }> {
    try {
      const currentHour = new Date().getHours();
      const isWeekend = [0, 6].includes(new Date().getDay());
      
      // Simulate demand patterns
      let baseDemand = 5;
      if (currentHour >= 7 && currentHour <= 9) baseDemand = 12; // Morning rush
      if (currentHour >= 17 && currentHour <= 19) baseDemand = 15; // Evening rush
      if (isWeekend && currentHour >= 20) baseDemand = 10; // Weekend nights
      
      const demand = {
        currentDemand: baseDemand + Math.random() * 5,
        trend: Math.random() > 0.5 ? 'increasing' : 'stable' as const,
        peakHours: [8, 9, 17, 18, 19, 22],
        demandForecast: Array.from({ length: 24 }, (_, hour) => ({
          hour,
          expectedDemand: this.predictHourlyDemand(hour, isWeekend)
        }))
      };

      console.log('Current demand retrieved:', demand);
      return demand;
    } catch (error) {
      console.error('Error getting current demand:', error);
      return {
        currentDemand: 5,
        trend: 'stable',
        peakHours: [8, 17, 18],
        demandForecast: []
      };
    }
  }

  /**
   * Helper methods
   */
  private getRandomWeatherCondition(): WeatherData['conditions'] {
    const conditions: WeatherData['conditions'][] = ['clear', 'rain', 'snow', 'fog', 'storm'];
    const weights = [0.6, 0.2, 0.05, 0.1, 0.05]; // Clear weather is most common
    
    const random = Math.random();
    let sum = 0;
    
    for (let i = 0; i < conditions.length; i++) {
      sum += weights[i];
      if (random <= sum) {
        return conditions[i];
      }
    }
    
    return 'clear';
  }

  private getWeatherSeverity(): WeatherData['severity'] {
    const random = Math.random();
    if (random < 0.7) return 'low';
    if (random < 0.9) return 'medium';
    return 'high';
  }

  private calculateDistance(
    point1: { lat: number; lng: number },
    point2: { lat: number; lng: number }
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLng = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private predictHourlyDemand(hour: number, isWeekend: boolean): number {
    let baseDemand = 3;
    
    // Rush hour patterns
    if (hour >= 7 && hour <= 9) baseDemand = 12;
    if (hour >= 17 && hour <= 19) baseDemand = 15;
    
    // Evening patterns
    if (hour >= 20 && hour <= 23) {
      baseDemand = isWeekend ? 10 : 7;
    }
    
    // Night patterns
    if (hour >= 0 && hour <= 6) {
      baseDemand = isWeekend ? 6 : 2;
    }
    
    // Lunch time
    if (hour >= 12 && hour <= 14) {
      baseDemand = 8;
    }
    
    return baseDemand + Math.random() * 2;
  }
}

// Singleton instance
export const externalDataService = new ExternalDataService();

/**
 * Utility functions for external data integration
 */
export class DataIntegrationUtils {
  /**
   * Cache external data to reduce API calls
   */
  static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static async getCachedData<T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttlMinutes: number = 15
  ): Promise<T> {
    const cached = this.cache.get(key);
    const now = Date.now();

    if (cached && (now - cached.timestamp) < (cached.ttl * 60 * 1000)) {
      return cached.data;
    }

    const freshData = await fetchFn();
    this.cache.set(key, {
      data: freshData,
      timestamp: now,
      ttl: ttlMinutes
    });

    return freshData;
  }

  /**
   * Aggregate multiple data sources
   */
  static async getAggregatedContextData(
    location: { lat: number; lng: number },
    timeframe: { start: Date; end: Date }
  ) {
    const dataService = new ExternalDataService();

    try {
      const [weather, traffic, events, demand] = await Promise.all([
        this.getCachedData(
          `weather_${location.lat}_${location.lng}`,
          () => dataService.getWeatherData(location),
          10
        ),
        this.getCachedData(
          `traffic_${location.lat}_${location.lng}`,
          () => dataService.getTrafficData(location),
          5
        ),
        this.getCachedData(
          `events_${location.lat}_${location.lng}_${timeframe.start.getTime()}`,
          () => dataService.getEventsData(location, timeframe),
          60
        ),
        this.getCachedData(
          `demand_${location.lat}_${location.lng}`,
          () => dataService.getCurrentDemand('all', location),
          15
        )
      ]);

      return {
        weather,
        traffic,
        events,
        demand,
        contextScore: this.calculateContextScore({ weather, traffic, events, demand })
      };
    } catch (error) {
      console.error('Error aggregating context data:', error);
      throw error;
    }
  }

  /**
   * Calculate overall context score for pricing decisions
   */
  private static calculateContextScore(data: {
    weather: WeatherData;
    traffic: TrafficData;
    events: EventData[];
    demand: any;
  }): number {
    let score = 1.0;

    // Weather impact
    if (data.weather.severity === 'high') score *= 1.4;
    else if (data.weather.severity === 'medium') score *= 1.2;

    // Traffic impact
    if (data.traffic.congestionLevel > 70) score *= 1.3;
    else if (data.traffic.congestionLevel > 40) score *= 1.1;

    // Events impact
    const highImpactEvents = data.events.filter(e => e.impact === 'high').length;
    if (highImpactEvents > 0) score *= 1.2;

    // Demand impact
    if (data.demand.currentDemand > 10) score *= 1.2;

    return Math.min(2.0, score); // Cap at 2x multiplier
  }
}

/**
 * Real-time data streaming simulation
 */
export class RealTimeDataStream {
  private subscribers: Map<string, Array<(data: any) => void>> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Subscribe to real-time data updates
   */
  subscribe(dataType: 'weather' | 'traffic' | 'demand', callback: (data: any) => void): string {
    const id = `${dataType}_${Date.now()}_${Math.random()}`;
    
    if (!this.subscribers.has(dataType)) {
      this.subscribers.set(dataType, []);
      this.startDataStream(dataType);
    }
    
    this.subscribers.get(dataType)!.push(callback);
    return id;
  }

  /**
   * Unsubscribe from data updates
   */
  unsubscribe(dataType: string, subscriptionId: string): void {
    const subscribers = this.subscribers.get(dataType);
    if (subscribers) {
      const index = subscribers.findIndex(sub => sub.toString().includes(subscriptionId));
      if (index > -1) {
        subscribers.splice(index, 1);
      }
      
      if (subscribers.length === 0) {
        this.stopDataStream(dataType);
      }
    }
  }

  private startDataStream(dataType: string): void {
    const interval = setInterval(async () => {
      const subscribers = this.subscribers.get(dataType);
      if (subscribers && subscribers.length > 0) {
        const data = await this.generateRealTimeData(dataType);
        subscribers.forEach(callback => callback(data));
      }
    }, 30000); // Update every 30 seconds

    this.intervals.set(dataType, interval);
  }

  private stopDataStream(dataType: string): void {
    const interval = this.intervals.get(dataType);
    if (interval) {
      clearInterval(interval);
      this.intervals.delete(dataType);
    }
    this.subscribers.delete(dataType);
  }

  private async generateRealTimeData(dataType: string): Promise<any> {
    const dataService = new ExternalDataService();
    const mockLocation = { lat: 51.5074, lng: -0.1278 }; // London

    switch (dataType) {
      case 'weather':
        return dataService.getWeatherData(mockLocation);
      case 'traffic':
        return dataService.getTrafficData(mockLocation);
      case 'demand':
        return dataService.getCurrentDemand('all', mockLocation);
      default:
        return null;
    }
  }
}