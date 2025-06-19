import { format, addMinutes, differenceInMinutes } from 'date-fns';
import { 
  DriverProfile, 
  BookingRequest, 
  CustomerProfile,
  TrafficData,
  AIDecisionContext 
} from './types';

export interface DispatchDecision {
  driverId: string;
  confidence: number;
  estimatedArrival: Date;
  route: {
    distance: number;
    duration: number;
    instructions: string[];
  };
  reasoning: string[];
}

export interface ETAPrediction {
  estimatedArrival: Date;
  confidence: number;
  factors: {
    distance: number;
    traffic: number;
    driverPerformance: number;
    weatherConditions: number;
  };
}

export class SmartDispatchEngine {
  private drivers: Map<string, DriverProfile> = new Map();
  private activeBookings: Map<string, BookingRequest> = new Map();
  private etaModel: any = null; // Would use TensorFlow model in production
  
  constructor() {
    this.initializeTestDrivers();
  }

  /**
   * Find optimal driver for booking request using AI algorithms
   */
  async findOptimalDriver(
    booking: BookingRequest,
    availableDrivers: DriverProfile[],
    traffic: TrafficData
  ): Promise<DispatchDecision> {
    const startTime = Date.now();
    
    try {
      // Score all available drivers
      const driverScores = await Promise.all(
        availableDrivers.map(driver => this.scoreDriver(driver, booking, traffic))
      );

      // Find best match
      const bestMatch = driverScores.reduce((best, current) => 
        current.score > best.score ? current : best
      );

      // Calculate ETA
      const eta = await this.predictETA(bestMatch.driver, booking, traffic);

      // Generate route
      const route = await this.calculateOptimalRoute(
        bestMatch.driver.location,
        booking.location.pickup,
        traffic
      );

      const decision: DispatchDecision = {
        driverId: bestMatch.driver.id,
        confidence: bestMatch.score,
        estimatedArrival: eta.estimatedArrival,
        route,
        reasoning: bestMatch.reasoning
      };

      // Log decision
      const context: AIDecisionContext = {
        timestamp: new Date(),
        decisionType: 'dispatch',
        inputs: { booking, availableDrivers: availableDrivers.length, traffic },
        output: decision,
        confidence: bestMatch.score,
        reasoning: bestMatch.reasoning,
        performanceMetrics: {
          responseTime: Date.now() - startTime
        }
      };

      this.logDecision(context);

      return decision;
    } catch (error) {
      console.error('Error in smart dispatch:', error);
      
      // Fallback to simple distance-based matching
      const fallbackDriver = this.findNearestDriver(availableDrivers, booking.location.pickup);
      return {
        driverId: fallbackDriver.id,
        confidence: 0.5,
        estimatedArrival: addMinutes(new Date(), 15),
        route: {
          distance: 5,
          duration: 15,
          instructions: ['Navigate to pickup location']
        },
        reasoning: ['Fallback dispatch due to system error']
      };
    }
  }

  /**
   * Score driver suitability for booking
   */
  private async scoreDriver(
    driver: DriverProfile,
    booking: BookingRequest,
    traffic: TrafficData
  ): Promise<{
    driver: DriverProfile;
    score: number;
    reasoning: string[];
  }> {
    const reasoning: string[] = [];
    let score = 0;

    // Distance factor (40% weight)
    const distance = this.calculateDistance(driver.location, booking.location.pickup);
    const distanceScore = Math.max(0, 1 - (distance / 20)); // Normalize to 20km max
    score += distanceScore * 0.4;
    reasoning.push(`Distance: ${distance.toFixed(1)}km (${(distanceScore * 100).toFixed(0)}%)`);

    // Driver rating factor (25% weight)
    const ratingScore = driver.rating / 5;
    score += ratingScore * 0.25;
    reasoning.push(`Rating: ${driver.rating}/5 (${(ratingScore * 100).toFixed(0)}%)`);

    // Performance factor (20% weight)
    const performanceScore = this.calculatePerformanceScore(driver.performance);
    score += performanceScore * 0.2;
    reasoning.push(`Performance: ${(performanceScore * 100).toFixed(0)}%`);

    // Customer preference matching (10% weight)
    const preferenceScore = this.matchCustomerPreferences(driver, booking.customerProfile);
    score += preferenceScore * 0.1;
    reasoning.push(`Preferences: ${(preferenceScore * 100).toFixed(0)}%`);

    // Service type expertise (5% weight)
    const expertiseScore = this.checkServiceExpertise(driver, booking.serviceType);
    score += expertiseScore * 0.05;
    reasoning.push(`Expertise: ${(expertiseScore * 100).toFixed(0)}%`);

    return {
      driver,
      score: Math.min(1, score), // Cap at 1.0
      reasoning
    };
  }

  /**
   * Predict ETA using machine learning
   */
  private async predictETA(
    driver: DriverProfile,
    booking: BookingRequest,
    traffic: TrafficData
  ): Promise<ETAPrediction> {
    const distance = this.calculateDistance(driver.location, booking.location.pickup);
    
    // Base travel time calculation
    const baseSpeed = 30; // km/h in city
    const adjustedSpeed = baseSpeed * (1 - (traffic.congestionLevel / 100) * 0.5);
    const travelTimeMinutes = (distance / adjustedSpeed) * 60;
    
    // Driver performance adjustment
    const performanceMultiplier = driver.performance.responseTime > 5 ? 1.2 : 0.9;
    const adjustedTime = travelTimeMinutes * performanceMultiplier;
    
    const estimatedArrival = addMinutes(new Date(), Math.round(adjustedTime));
    
    return {
      estimatedArrival,
      confidence: 0.85,
      factors: {
        distance,
        traffic: traffic.congestionLevel,
        driverPerformance: driver.performance.responseTime,
        weatherConditions: 0 // Would integrate weather data
      }
    };
  }

  /**
   * Calculate optimal route
   */
  private async calculateOptimalRoute(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number },
    traffic: TrafficData
  ): Promise<{ distance: number; duration: number; instructions: string[] }> {
    // Simulate route calculation (would use Google Maps API or similar)
    const distance = this.calculateDistance(start, end);
    const baseTime = (distance / 30) * 60; // 30 km/h average
    const trafficDelay = baseTime * (traffic.congestionLevel / 100) * 0.5;
    const duration = Math.round(baseTime + trafficDelay);
    
    return {
      distance: Math.round(distance * 100) / 100,
      duration,
      instructions: [
        'Head northeast on current road',
        'Turn right at next major intersection',
        'Continue straight for 2.5km',
        'Arrive at destination'
      ]
    };
  }

  /**
   * Calculate driver performance score
   */
  private calculatePerformanceScore(performance: DriverProfile['performance']): number {
    const onTimeWeight = 0.4;
    const satisfactionWeight = 0.3;
    const completionWeight = 0.2;
    const responseWeight = 0.1;

    const onTimeScore = performance.onTimePercentage / 100;
    const satisfactionScore = performance.customerSatisfaction / 5;
    const completionScore = performance.completionRate / 100;
    const responseScore = Math.max(0, 1 - (performance.responseTime / 10)); // 10 min max

    return (onTimeScore * onTimeWeight) +
           (satisfactionScore * satisfactionWeight) +
           (completionScore * completionWeight) +
           (responseScore * responseWeight);
  }

  /**
   * Match driver to customer preferences
   */
  private matchCustomerPreferences(driver: DriverProfile, customer: CustomerProfile): number {
    let score = 0.5; // Base score
    
    // Check customer's preferred drivers
    if (customer.history.preferredDrivers.includes(driver.id)) {
      score = 1.0;
    }
    
    // Check service type preferences
    const customerPreferredServices = customer.history.preferredServices;
    const driverServiceTypes = driver.preferences.serviceTypes;
    const serviceMatch = customerPreferredServices.some(service => 
      driverServiceTypes.includes(service)
    );
    
    if (serviceMatch) {
      score = Math.max(score, 0.8);
    }
    
    return score;
  }

  /**
   * Check driver expertise for service type
   */
  private checkServiceExpertise(driver: DriverProfile, serviceType: string): number {
    if (driver.preferences.serviceTypes.includes(serviceType)) {
      return 1.0;
    }
    
    // Check relevant certifications
    const relevantCerts = this.getRelevantCertifications(serviceType);
    const hasRelevantCert = driver.certifications.some(cert => 
      relevantCerts.includes(cert)
    );
    
    return hasRelevantCert ? 0.8 : 0.5;
  }

  /**
   * Get relevant certifications for service type
   */
  private getRelevantCertifications(serviceType: string): string[] {
    const certMap: Record<string, string[]> = {
      'close-protection': ['SIA Close Protection', 'Personal Security', 'VIP Protection'],
      'corporate': ['Corporate Security', 'Executive Protection', 'Business Security'],
      'vip': ['VIP Services', 'Luxury Service', 'Concierge'],
      'private-hire': ['Private Hire License', 'Chauffeur License', 'Professional Driver'],
      'weddings': ['Event Security', 'Wedding Specialist', 'Crowd Management']
    };
    
    return certMap[serviceType] || [];
  }

  /**
   * Find nearest driver (fallback method)
   */
  private findNearestDriver(
    drivers: DriverProfile[],
    location: { lat: number; lng: number }
  ): DriverProfile {
    return drivers.reduce((nearest, driver) => {
      const currentDistance = this.calculateDistance(driver.location, location);
      const nearestDistance = this.calculateDistance(nearest.location, location);
      return currentDistance < nearestDistance ? driver : nearest;
    });
  }

  /**
   * Calculate distance between two points
   */
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

  /**
   * Optimize driver utilization across all bookings
   */
  async optimizeDriverUtilization(
    pendingBookings: BookingRequest[],
    availableDrivers: DriverProfile[],
    traffic: TrafficData
  ): Promise<Array<{
    booking: BookingRequest;
    driver: DriverProfile;
    utilization: number;
    revenue: number;
  }>> {
    const assignments: Array<{
      booking: BookingRequest;
      driver: DriverProfile;
      utilization: number;
      revenue: number;
    }> = [];

    // Sort bookings by priority and time
    const sortedBookings = pendingBookings.sort((a, b) => {
      const priorityWeight = { vip: 3, priority: 2, standard: 1 };
      const aPriority = priorityWeight[a.priority] * 1000;
      const bPriority = priorityWeight[b.priority] * 1000;
      const aTime = a.requestedTime.getTime();
      const bTime = b.requestedTime.getTime();
      return (bPriority + bTime) - (aPriority + aTime);
    });

    const assignedDrivers = new Set<string>();

    for (const booking of sortedBookings) {
      const availableForBooking = availableDrivers.filter(
        driver => !assignedDrivers.has(driver.id)
      );

      if (availableForBooking.length === 0) break;

      const dispatch = await this.findOptimalDriver(booking, availableForBooking, traffic);
      const driver = availableForBooking.find(d => d.id === dispatch.driverId);

      if (driver) {
        assignments.push({
          booking,
          driver,
          utilization: this.calculateUtilization(driver, booking),
          revenue: this.estimateRevenue(booking)
        });
        assignedDrivers.add(driver.id);
      }
    }

    return assignments;
  }

  /**
   * Calculate driver utilization
   */
  private calculateUtilization(driver: DriverProfile, booking: BookingRequest): number {
    // Simulate utilization calculation
    const baseUtilization = 0.7; // 70% base utilization
    const durationHours = booking.duration;
    const efficiency = driver.performance.completionRate / 100;
    
    return Math.min(1.0, baseUtilization * efficiency * (durationHours / 8));
  }

  /**
   * Estimate revenue for booking
   */
  private estimateRevenue(booking: BookingRequest): number {
    const basePrices: Record<string, number> = {
      'close-protection': 120,
      'private-hire': 80,
      'corporate': 150,
      'weddings': 200,
      'vip': 300
    };

    const basePrice = basePrices[booking.serviceType] || 100;
    return basePrice * booking.duration;
  }

  /**
   * Initialize test drivers for demonstration
   */
  private initializeTestDrivers(): void {
    const testDrivers: DriverProfile[] = [
      {
        id: 'driver-001',
        name: 'John Smith',
        location: { lat: 51.5074, lng: -0.1278 },
        rating: 4.8,
        performance: {
          onTimePercentage: 95,
          customerSatisfaction: 4.7,
          completionRate: 98,
          responseTime: 3
        },
        availability: true,
        preferences: {
          serviceTypes: ['close-protection', 'vip'],
          maxDistance: 25,
          preferredHours: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
        },
        skills: ['defensive-driving', 'first-aid', 'conflict-resolution'],
        certifications: ['SIA Close Protection', 'VIP Protection', 'First Aid']
      },
      {
        id: 'driver-002',
        name: 'Sarah Johnson',
        location: { lat: 51.5155, lng: -0.1426 },
        rating: 4.9,
        performance: {
          onTimePercentage: 97,
          customerSatisfaction: 4.8,
          completionRate: 99,
          responseTime: 2
        },
        availability: true,
        preferences: {
          serviceTypes: ['private-hire', 'corporate', 'weddings'],
          maxDistance: 30,
          preferredHours: ['08:00', '09:00', '17:00', '18:00', '19:00']
        },
        skills: ['luxury-service', 'navigation', 'customer-service'],
        certifications: ['Private Hire License', 'Luxury Service', 'Professional Driver']
      }
    ];

    testDrivers.forEach(driver => {
      this.drivers.set(driver.id, driver);
    });
  }

  /**
   * Log dispatch decision
   */
  private logDecision(context: AIDecisionContext): void {
    console.log('AI Dispatch Decision:', {
      timestamp: context.timestamp,
      confidence: context.confidence,
      responseTime: context.performanceMetrics?.responseTime,
      reasoning: context.reasoning
    });
  }

  /**
   * Get available drivers within radius
   */
  getAvailableDrivers(
    location: { lat: number; lng: number },
    maxRadius: number = 25
  ): DriverProfile[] {
    return Array.from(this.drivers.values()).filter(driver => {
      if (!driver.availability) return false;
      const distance = this.calculateDistance(driver.location, location);
      return distance <= maxRadius;
    });
  }

  /**
   * Update driver location
   */
  updateDriverLocation(driverId: string, location: { lat: number; lng: number }): void {
    const driver = this.drivers.get(driverId);
    if (driver) {
      driver.location = location;
      this.drivers.set(driverId, driver);
    }
  }

  /**
   * Set driver availability
   */
  setDriverAvailability(driverId: string, available: boolean): void {
    const driver = this.drivers.get(driverId);
    if (driver) {
      driver.availability = available;
      this.drivers.set(driverId, driver);
    }
  }
}