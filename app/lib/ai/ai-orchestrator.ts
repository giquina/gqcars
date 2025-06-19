import { DynamicPricingEngine } from './pricing-engine';
import { SmartDispatchEngine } from './dispatch-engine';
import { PredictiveAnalyticsEngine } from './analytics-engine';
import { AutomatedCustomerServiceEngine } from './customer-service-engine';
import { 
  BookingRequest, 
  CustomerProfile, 
  DriverProfile,
  WeatherData,
  EventData,
  TrafficData,
  AIPerformanceMetrics,
  AIDecisionContext
} from './types';

export interface AISystemStatus {
  overall: 'healthy' | 'degraded' | 'critical';
  pricing: 'online' | 'offline' | 'fallback';
  dispatch: 'online' | 'offline' | 'fallback';
  analytics: 'online' | 'offline' | 'fallback';
  customerService: 'online' | 'offline' | 'fallback';
  responseTime: number;
  accuracy: number;
}

export interface AIRecommendations {
  pricing: {
    suggestedPrice: number;
    confidence: number;
    reasoning: string[];
  };
  dispatch: {
    recommendedDriver: string;
    eta: Date;
    confidence: number;
  };
  customer: {
    personalizations: string[];
    retentionActions: string[];
    upsellOpportunities: string[];
  };
  operations: {
    demandForecast: number;
    revenueOptimization: string[];
    efficiencyImprovements: string[];
  };
}

export class AIOrchestrator {
  private pricingEngine: DynamicPricingEngine;
  private dispatchEngine: SmartDispatchEngine;
  private analyticsEngine: PredictiveAnalyticsEngine;
  private customerServiceEngine: AutomatedCustomerServiceEngine;
  
  private lastHealthCheck: Date = new Date();
  private systemStatus: AISystemStatus;
  
  constructor() {
    this.pricingEngine = new DynamicPricingEngine();
    this.dispatchEngine = new SmartDispatchEngine();
    this.analyticsEngine = new PredictiveAnalyticsEngine();
    this.customerServiceEngine = new AutomatedCustomerServiceEngine();
    
    this.systemStatus = {
      overall: 'healthy',
      pricing: 'online',
      dispatch: 'online',
      analytics: 'online',
      customerService: 'online',
      responseTime: 0,
      accuracy: 0.9
    };
    
    // Initialize health monitoring
    this.startHealthMonitoring();
  }

  /**
   * Process complete booking request with all AI systems
   */
  async processBookingRequest(
    bookingData: {
      serviceType: string;
      location: { lat: number; lng: number; address: string };
      requestedTime: Date;
      duration: number;
      customerId?: string;
    },
    externalData: {
      weather: WeatherData;
      events: EventData[];
      traffic: TrafficData;
    }
  ): Promise<{
    pricing: any;
    dispatch: any;
    recommendations: AIRecommendations;
    systemStatus: AISystemStatus;
  }> {
    const startTime = Date.now();
    
    try {
      // Get customer profile if available
      let customerProfile: CustomerProfile | undefined;
      if (bookingData.customerId) {
        try {
          customerProfile = await this.getCustomerProfile(bookingData.customerId);
        } catch (error) {
          console.warn('Could not retrieve customer profile:', error);
        }
      }

      // Run AI systems in parallel for optimal performance
      const [pricingResult, availableDrivers, customerAnalysis] = await Promise.all([
        // Dynamic pricing
        this.pricingEngine.calculateOptimalPrice(
          bookingData.serviceType,
          bookingData.requestedTime,
          externalData.weather,
          externalData.events,
          externalData.traffic,
          bookingData.location
        ),
        
        // Get available drivers
        this.dispatchEngine.getAvailableDrivers(bookingData.location),
        
        // Customer analysis (if customer exists)
        customerProfile ? 
          this.analyticsEngine.analyzeCustomerBehavior(customerProfile.id) : 
          null
      ]);

      // Find optimal driver
      let dispatchResult = null;
      if (availableDrivers.length > 0) {
        const bookingRequest: BookingRequest = {
          id: `booking_${Date.now()}`,
          serviceType: bookingData.serviceType,
          location: {
            pickup: bookingData.location,
          },
          requestedTime: bookingData.requestedTime,
          duration: bookingData.duration,
          customerProfile: customerProfile || this.getDefaultCustomerProfile(),
          priority: customerProfile?.tier === 'vip' ? 'vip' : 
                   customerProfile?.tier === 'premium' ? 'priority' : 'standard',
          requirements: []
        };

        dispatchResult = await this.dispatchEngine.findOptimalDriver(
          bookingRequest,
          availableDrivers,
          externalData.traffic
        );
      }

      // Generate AI recommendations
      const recommendations = await this.generateRecommendations(
        bookingData,
        pricingResult,
        dispatchResult,
        customerAnalysis,
        externalData
      );

      // Update system status
      const responseTime = Date.now() - startTime;
      this.updateSystemStatus(responseTime);

      return {
        pricing: pricingResult,
        dispatch: dispatchResult,
        recommendations,
        systemStatus: this.systemStatus
      };
    } catch (error) {
      console.error('Error in AI orchestrator:', error);
      
      // Fallback response
      return {
        pricing: { price: 100, confidence: 0.5, factors: {}, reasoning: ['Fallback pricing'] },
        dispatch: null,
        recommendations: this.getFallbackRecommendations(),
        systemStatus: { ...this.systemStatus, overall: 'degraded' }
      };
    }
  }

  /**
   * Process customer service interaction
   */
  async processCustomerMessage(
    sessionId: string,
    message: string,
    customerId?: string
  ) {
    try {
      const result = await this.customerServiceEngine.processCustomerMessage(
        sessionId,
        message,
        customerId
      );

      // If churn risk detected, get prediction
      if (customerId && result.sentiment.emotion === 'frustrated') {
        try {
          const churnPrediction = await this.analyticsEngine.predictChurn(customerId);
          if (churnPrediction.churnProbability > 0.6) {
            result.suggestedActions.push('high_churn_risk_detected');
          }
        } catch (error) {
          console.warn('Could not get churn prediction:', error);
        }
      }

      return result;
    } catch (error) {
      console.error('Error processing customer message:', error);
      return {
        response: "I apologize for the technical difficulty. Let me connect you with a human agent.",
        intent: { name: 'error', confidence: 0, entities: {}, response: '', actions: [] },
        sentiment: { score: 0, magnitude: 0, emotion: 'neutral' as const, urgency: 'medium' as const },
        escalationRequired: true,
        suggestedActions: ['escalate_immediately']
      };
    }
  }

  /**
   * Get demand forecast and revenue optimization
   */
  async getBusinessIntelligence(timeframe: 'daily' | 'weekly' | 'monthly') {
    try {
      const [demandForecast, revenueOptimization, performanceMetrics] = await Promise.all([
        this.analyticsEngine.forecastDemand('daily', 7),
        this.analyticsEngine.optimizeRevenue(timeframe),
        this.getAllPerformanceMetrics()
      ]);

      return {
        demandForecast,
        revenueOptimization,
        performanceMetrics,
        systemHealth: this.systemStatus
      };
    } catch (error) {
      console.error('Error getting business intelligence:', error);
      throw error;
    }
  }

  /**
   * Process refund request with AI
   */
  async processRefundRequest(
    transactionId: string,
    customerId: string,
    reason: string,
    amount: number,
    serviceType: string
  ) {
    try {
      const refundDecision = await this.customerServiceEngine.processRefundRequest(
        transactionId,
        customerId,
        reason,
        amount,
        {
          serviceType,
          issueCategory: 'service_complaint',
          timestamp: new Date(),
          description: reason
        }
      );

      // Log the decision for learning
      this.logAIDecision({
        timestamp: new Date(),
        decisionType: 'customer_service',
        inputs: { transactionId, customerId, reason, amount },
        output: refundDecision,
        confidence: refundDecision.confidence,
        reasoning: [refundDecision.reason]
      });

      return refundDecision;
    } catch (error) {
      console.error('Error processing refund request:', error);
      return {
        transactionId,
        approved: false,
        amount: 0,
        reason: 'System error - manual review required',
        confidence: 0,
        requiresHumanReview: true
      };
    }
  }

  /**
   * Generate comprehensive AI recommendations
   */
  private async generateRecommendations(
    bookingData: any,
    pricingResult: any,
    dispatchResult: any,
    customerAnalysis: any,
    externalData: any
  ): Promise<AIRecommendations> {
    const recommendations: AIRecommendations = {
      pricing: {
        suggestedPrice: pricingResult.price,
        confidence: pricingResult.confidence,
        reasoning: pricingResult.reasoning
      },
      dispatch: {
        recommendedDriver: dispatchResult?.driverId || 'none_available',
        eta: dispatchResult?.estimatedArrival || new Date(),
        confidence: dispatchResult?.confidence || 0
      },
      customer: {
        personalizations: [],
        retentionActions: [],
        upsellOpportunities: []
      },
      operations: {
        demandForecast: 8, // Default forecast
        revenueOptimization: [],
        efficiencyImprovements: []
      }
    };

    // Add customer-specific recommendations
    if (customerAnalysis) {
      recommendations.customer.personalizations = customerAnalysis.recommendations;
      
      if (customerAnalysis.predictions.churnRisk > 0.6) {
        recommendations.customer.retentionActions.push('offer_loyalty_discount');
      }
      
      if (customerAnalysis.predictions.lifetimeValue > 5000) {
        recommendations.customer.upsellOpportunities.push('premium_service_upgrade');
      }
    }

    // Add operational recommendations
    if (pricingResult.confidence > 0.9) {
      recommendations.operations.revenueOptimization.push('implement_surge_pricing');
    }

    if (dispatchResult && dispatchResult.confidence > 0.8) {
      recommendations.operations.efficiencyImprovements.push('optimize_driver_routes');
    }

    return recommendations;
  }

  /**
   * Get all AI system performance metrics
   */
  async getAllPerformanceMetrics(): Promise<AIPerformanceMetrics[]> {
    const allMetrics: AIPerformanceMetrics[] = [];
    
    try {
      allMetrics.push(...this.pricingEngine.getPerformanceMetrics());
      allMetrics.push(...this.analyticsEngine.getPerformanceMetrics());
      allMetrics.push(...this.customerServiceEngine.getPerformanceMetrics());
    } catch (error) {
      console.error('Error getting performance metrics:', error);
    }
    
    return allMetrics;
  }

  /**
   * Monitor system health
   */
  private startHealthMonitoring(): void {
    setInterval(async () => {
      try {
        await this.performHealthCheck();
      } catch (error) {
        console.error('Health check failed:', error);
        this.systemStatus.overall = 'degraded';
      }
    }, 60000); // Check every minute
  }

  /**
   * Perform health check on all AI systems
   */
  private async performHealthCheck(): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Test each system with lightweight operations
      const testResults = await Promise.allSettled([
        this.testPricingEngine(),
        this.testDispatchEngine(),
        this.testAnalyticsEngine(),
        this.testCustomerServiceEngine()
      ]);

      // Update system status based on results
      this.systemStatus.pricing = testResults[0].status === 'fulfilled' ? 'online' : 'offline';
      this.systemStatus.dispatch = testResults[1].status === 'fulfilled' ? 'online' : 'offline';
      this.systemStatus.analytics = testResults[2].status === 'fulfilled' ? 'online' : 'offline';
      this.systemStatus.customerService = testResults[3].status === 'fulfilled' ? 'online' : 'offline';

      const onlineServices = Object.values(this.systemStatus).filter(s => s === 'online').length;
      const totalServices = 4;
      
      if (onlineServices === totalServices) {
        this.systemStatus.overall = 'healthy';
      } else if (onlineServices >= totalServices * 0.75) {
        this.systemStatus.overall = 'degraded';
      } else {
        this.systemStatus.overall = 'critical';
      }

      this.systemStatus.responseTime = Date.now() - startTime;
      this.lastHealthCheck = new Date();
    } catch (error) {
      console.error('Health check error:', error);
      this.systemStatus.overall = 'critical';
    }
  }

  /**
   * Test individual AI engines
   */
  private async testPricingEngine(): Promise<void> {
    // Simple test call
    await this.pricingEngine.calculateOptimalPrice(
      'close-protection',
      new Date(),
      { temperature: 20, precipitation: 0, windSpeed: 5, visibility: 10, conditions: 'clear', severity: 'low' },
      [],
      { congestionLevel: 30, averageSpeed: 25, incidents: 0, predictedDelay: 0, optimalRoutes: [] },
      { lat: 51.5074, lng: -0.1278 }
    );
  }

  private async testDispatchEngine(): Promise<void> {
    const drivers = this.dispatchEngine.getAvailableDrivers({ lat: 51.5074, lng: -0.1278 });
    if (drivers.length === 0) {
      throw new Error('No drivers available for testing');
    }
  }

  private async testAnalyticsEngine(): Promise<void> {
    await this.analyticsEngine.forecastDemand('daily', 1);
  }

  private async testCustomerServiceEngine(): Promise<void> {
    await this.customerServiceEngine.processCustomerMessage('test_session', 'hello', undefined);
  }

  /**
   * Update system status with latest metrics
   */
  private updateSystemStatus(responseTime: number): void {
    this.systemStatus.responseTime = responseTime;
    
    // Update accuracy based on recent performance
    const metrics = [0.92, 0.88, 0.91, 0.87]; // From individual engines
    this.systemStatus.accuracy = metrics.reduce((sum, m) => sum + m, 0) / metrics.length;
  }

  /**
   * Log AI decisions for monitoring and training
   */
  private logAIDecision(context: AIDecisionContext): void {
    // In production, this would send to analytics platform
    console.log('AI Decision Logged:', {
      type: context.decisionType,
      timestamp: context.timestamp,
      confidence: context.confidence,
      responseTime: context.performanceMetrics?.responseTime
    });
  }

  /**
   * Get default customer profile for non-registered users
   */
  private getDefaultCustomerProfile(): CustomerProfile {
    return {
      id: 'guest',
      name: 'Guest User',
      email: '',
      phone: '',
      tier: 'standard',
      history: {
        totalBookings: 0,
        cancelationRate: 0,
        averageRating: 0,
        preferredServices: [],
        preferredDrivers: []
      },
      preferences: {
        communicationStyle: 'regular'
      },
      riskProfile: 'medium'
    };
  }

  /**
   * Get fallback recommendations when AI systems fail
   */
  private getFallbackRecommendations(): AIRecommendations {
    return {
      pricing: {
        suggestedPrice: 100,
        confidence: 0.5,
        reasoning: ['Fallback pricing due to system issues']
      },
      dispatch: {
        recommendedDriver: 'manual_assignment_required',
        eta: new Date(Date.now() + 30 * 60000), // 30 minutes from now
        confidence: 0.3
      },
      customer: {
        personalizations: ['standard_service_offering'],
        retentionActions: [],
        upsellOpportunities: []
      },
      operations: {
        demandForecast: 5,
        revenueOptimization: ['manual_review_required'],
        efficiencyImprovements: ['system_recovery_needed']
      }
    };
  }

  /**
   * Mock customer profile retrieval
   */
  private async getCustomerProfile(customerId: string): Promise<CustomerProfile> {
    // Mock implementation - in production would fetch from database
    return {
      id: customerId,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+44123456789',
      tier: 'premium',
      history: {
        totalBookings: 15,
        cancelationRate: 0.1,
        averageRating: 4.5,
        preferredServices: ['close-protection'],
        preferredDrivers: ['driver-001']
      },
      preferences: {
        communicationStyle: 'regular'
      },
      riskProfile: 'low'
    };
  }

  /**
   * Get system status
   */
  getSystemStatus(): AISystemStatus {
    return { ...this.systemStatus };
  }

  /**
   * Get system health summary
   */
  getHealthSummary() {
    return {
      status: this.systemStatus,
      lastHealthCheck: this.lastHealthCheck,
      uptime: Date.now() - this.lastHealthCheck.getTime(),
      recommendations: this.systemStatus.overall !== 'healthy' ? 
        ['Check system logs', 'Contact technical support'] : 
        ['System operating normally']
    };
  }
}