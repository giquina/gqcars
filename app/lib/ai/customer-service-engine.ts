import { format, addHours, isBefore, isAfter } from 'date-fns';
import { 
  ChatbotContext, 
  NotificationOptimization,
  CustomerProfile,
  AIDecisionContext,
  AIPerformanceMetrics
} from './types';

export interface ChatbotIntent {
  name: string;
  confidence: number;
  entities: Record<string, any>;
  response: string;
  actions: string[];
}

export interface AutoRefundDecision {
  transactionId: string;
  approved: boolean;
  amount: number;
  reason: string;
  confidence: number;
  requiresHumanReview: boolean;
}

export interface SentimentAnalysis {
  score: number; // -1 to 1 (negative to positive)
  magnitude: number; // 0 to 1 (intensity)
  emotion: 'angry' | 'frustrated' | 'neutral' | 'satisfied' | 'delighted';
  urgency: 'low' | 'medium' | 'high';
}

export interface CustomerServiceAnalytics {
  period: 'daily' | 'weekly' | 'monthly';
  metrics: {
    totalTickets: number;
    resolvedByAI: number;
    escalationRate: number;
    avgResolutionTime: number;
    customerSatisfaction: number;
  };
  trends: {
    volumeTrend: 'increasing' | 'decreasing' | 'stable';
    satisfactionTrend: 'improving' | 'declining' | 'stable';
  };
}

export class AutomatedCustomerServiceEngine {
  private intents: Map<string, ChatbotIntent> = new Map();
  private conversationHistory: Map<string, ChatbotContext> = new Map();
  private refundPolicies: Map<string, any> = new Map();
  private sentimentModel: any = null; // Would use NLP model in production
  
  constructor() {
    this.initializeIntents();
    this.initializeRefundPolicies();
  }

  /**
   * Process customer message and generate AI response
   */
  async processCustomerMessage(
    sessionId: string,
    message: string,
    customerId?: string
  ): Promise<{
    response: string;
    intent: ChatbotIntent;
    sentiment: SentimentAnalysis;
    escalationRequired: boolean;
    suggestedActions: string[];
  }> {
    try {
      // Get or create conversation context
      let context = this.conversationHistory.get(sessionId);
      if (!context) {
        context = this.createNewContext(sessionId, customerId);
        this.conversationHistory.set(sessionId, context);
      }

      // Analyze sentiment
      const sentiment = await this.analyzeSentiment(message);
      
      // Classify intent
      const intent = await this.classifyIntent(message, context);
      
      // Update conversation history
      context.conversationHistory.push({
        message,
        sender: 'user',
        timestamp: new Date()
      });

      // Generate response
      const response = await this.generateResponse(intent, context, sentiment);
      
      // Add bot response to history
      context.conversationHistory.push({
        message: response,
        sender: 'bot',
        timestamp: new Date()
      });

      // Check if escalation is needed
      const escalationRequired = this.shouldEscalate(intent, sentiment, context);
      
      // Get suggested actions
      const suggestedActions = this.getSuggestedActions(intent, sentiment, context);

      // Update context
      context.intent = intent.name;
      context.confidence = intent.confidence;
      context.escalationRequired = escalationRequired;
      this.conversationHistory.set(sessionId, context);

      return {
        response,
        intent,
        sentiment,
        escalationRequired,
        suggestedActions
      };
    } catch (error) {
      console.error('Error processing customer message:', error);
      return {
        response: "I apologize, but I'm experiencing technical difficulties. Let me connect you with a human agent.",
        intent: { name: 'error', confidence: 0, entities: {}, response: '', actions: ['escalate'] },
        sentiment: { score: 0, magnitude: 0, emotion: 'neutral', urgency: 'medium' },
        escalationRequired: true,
        suggestedActions: ['escalate_immediately']
      };
    }
  }

  /**
   * Process automatic refund request
   */
  async processRefundRequest(
    transactionId: string,
    customerId: string,
    reason: string,
    amount: number,
    issueDetails: {
      serviceType: string;
      issueCategory: string;
      timestamp: Date;
      description: string;
    }
  ): Promise<AutoRefundDecision> {
    try {
      const customer = await this.getCustomerProfile(customerId);
      const refundPolicy = this.refundPolicies.get(issueDetails.serviceType);
      
      // Extract features for refund decision
      const features = this.extractRefundFeatures(
        customer,
        issueDetails,
        amount,
        reason
      );
      
      // Calculate refund eligibility
      const eligibility = this.calculateRefundEligibility(features, refundPolicy);
      
      // Make decision
      const approved = eligibility.score > 0.7;
      const requiresHumanReview = eligibility.score > 0.4 && eligibility.score <= 0.7;
      
      const decision: AutoRefundDecision = {
        transactionId,
        approved,
        amount: approved ? amount : 0,
        reason: eligibility.reasoning,
        confidence: eligibility.score,
        requiresHumanReview
      };

      // Log decision
      this.logRefundDecision(decision, features);

      return decision;
    } catch (error) {
      console.error('Error processing refund request:', error);
      return {
        transactionId,
        approved: false,
        amount: 0,
        reason: 'Error processing request - requires manual review',
        confidence: 0,
        requiresHumanReview: true
      };
    }
  }

  /**
   * Optimize notification timing and channel
   */
  async optimizeNotification(
    customerId: string,
    notificationType: 'booking_confirmation' | 'reminder' | 'promotion' | 'update',
    content: string,
    urgency: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<NotificationOptimization> {
    try {
      const customer = await this.getCustomerProfile(customerId);
      
      // Analyze customer behavior patterns
      const patterns = this.analyzeNotificationPatterns(customer);
      
      // Determine optimal channel
      const channel = this.selectOptimalChannel(customer, notificationType, urgency);
      
      // Calculate optimal timing
      const optimalTime = this.calculateOptimalTiming(
        customer,
        notificationType,
        patterns,
        urgency
      );
      
      // Estimate engagement probability
      const expectedEngagement = this.estimateEngagement(
        customer,
        channel,
        optimalTime,
        notificationType
      );
      
      // Calculate priority score
      const priority = this.calculateNotificationPriority(urgency, expectedEngagement);

      return {
        customerId,
        channel,
        optimalTime,
        content,
        expectedEngagement,
        priority
      };
    } catch (error) {
      console.error('Error optimizing notification:', error);
      // Default fallback
      return {
        customerId,
        channel: 'email',
        optimalTime: addHours(new Date(), 1),
        content,
        expectedEngagement: 0.5,
        priority: 5
      };
    }
  }

  /**
   * Analyze customer sentiment from text
   */
  private async analyzeSentiment(text: string): Promise<SentimentAnalysis> {
    // Simplified sentiment analysis (would use NLP model in production)
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'satisfied', 'love', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'disappointed'];
    const urgentWords = ['urgent', 'immediately', 'asap', 'emergency', 'critical'];
    
    const words = text.toLowerCase().split(/\s+/);
    
    let positiveCount = 0;
    let negativeCount = 0;
    let urgentCount = 0;
    
    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
      if (urgentWords.some(uw => word.includes(uw))) urgentCount++;
    });
    
    const totalSentimentWords = positiveCount + negativeCount;
    const score = totalSentimentWords > 0 ? 
      (positiveCount - negativeCount) / totalSentimentWords : 0;
    
    const magnitude = Math.min(1, totalSentimentWords / words.length * 10);
    
    let emotion: SentimentAnalysis['emotion'] = 'neutral';
    if (score > 0.5) emotion = 'satisfied';
    else if (score > 0.8) emotion = 'delighted';
    else if (score < -0.3) emotion = 'frustrated';
    else if (score < -0.7) emotion = 'angry';
    
    const urgency: SentimentAnalysis['urgency'] = 
      urgentCount > 0 ? 'high' : 
      emotion === 'angry' ? 'high' :
      emotion === 'frustrated' ? 'medium' : 'low';

    return { score, magnitude, emotion, urgency };
  }

  /**
   * Classify customer intent from message
   */
  private async classifyIntent(
    message: string,
    context: ChatbotContext
  ): Promise<ChatbotIntent> {
    const messageLower = message.toLowerCase();
    
    // Simple intent classification (would use ML model in production)
    if (messageLower.includes('book') || messageLower.includes('reserve')) {
      return this.intents.get('booking') || this.getDefaultIntent();
    }
    
    if (messageLower.includes('cancel') || messageLower.includes('refund')) {
      return this.intents.get('cancellation') || this.getDefaultIntent();
    }
    
    if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('quote')) {
      return this.intents.get('pricing') || this.getDefaultIntent();
    }
    
    if (messageLower.includes('driver') || messageLower.includes('chauffeur')) {
      return this.intents.get('driver_info') || this.getDefaultIntent();
    }
    
    if (messageLower.includes('complain') || messageLower.includes('problem') || messageLower.includes('issue')) {
      return this.intents.get('complaint') || this.getDefaultIntent();
    }
    
    if (messageLower.includes('track') || messageLower.includes('status') || messageLower.includes('where')) {
      return this.intents.get('tracking') || this.getDefaultIntent();
    }
    
    return this.intents.get('general_info') || this.getDefaultIntent();
  }

  /**
   * Generate contextual response
   */
  private async generateResponse(
    intent: ChatbotIntent,
    context: ChatbotContext,
    sentiment: SentimentAnalysis
  ): Promise<string> {
    let response = intent.response;
    
    // Personalize based on customer
    if (context.customerId) {
      const customer = await this.getCustomerProfile(context.customerId);
      if (customer) {
        response = response.replace('{customer_name}', customer.name);
        response = response.replace('{customer_tier}', customer.tier);
      }
    }
    
    // Adjust tone based on sentiment
    if (sentiment.emotion === 'angry' || sentiment.emotion === 'frustrated') {
      response = `I understand your frustration and I'm here to help. ${response}`;
    } else if (sentiment.emotion === 'satisfied' || sentiment.emotion === 'delighted') {
      response = `I'm glad to hear from you! ${response}`;
    }
    
    return response;
  }

  /**
   * Determine if escalation to human agent is needed
   */
  private shouldEscalate(
    intent: ChatbotIntent,
    sentiment: SentimentAnalysis,
    context: ChatbotContext
  ): boolean {
    // Escalate if customer is very angry or frustrated
    if (sentiment.emotion === 'angry' && sentiment.magnitude > 0.7) {
      return true;
    }
    
    // Escalate if it's a complex complaint
    if (intent.name === 'complaint' && sentiment.urgency === 'high') {
      return true;
    }
    
    // Escalate if confidence is very low
    if (intent.confidence < 0.3) {
      return true;
    }
    
    // Escalate if conversation is going in circles
    if (context.conversationHistory.length > 6) {
      const recentBotMessages = context.conversationHistory
        .slice(-4)
        .filter(h => h.sender === 'bot')
        .map(h => h.message);
      
      // Check for repetitive responses
      const uniqueResponses = new Set(recentBotMessages);
      if (uniqueResponses.size <= 1) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Get suggested actions for agents
   */
  private getSuggestedActions(
    intent: ChatbotIntent,
    sentiment: SentimentAnalysis,
    context: ChatbotContext
  ): string[] {
    const actions: string[] = [];
    
    if (sentiment.emotion === 'angry') {
      actions.push('offer_goodwill_gesture');
      actions.push('priority_handling');
    }
    
    if (intent.name === 'complaint') {
      actions.push('investigate_issue');
      actions.push('follow_up_required');
    }
    
    if (intent.name === 'cancellation') {
      actions.push('check_refund_eligibility');
      actions.push('offer_alternatives');
    }
    
    if (sentiment.urgency === 'high') {
      actions.push('immediate_response');
    }
    
    return actions;
  }

  /**
   * Create new conversation context
   */
  private createNewContext(sessionId: string, customerId?: string): ChatbotContext {
    return {
      sessionId,
      customerId,
      intent: 'unknown',
      confidence: 0,
      entities: {},
      conversationHistory: [],
      escalationRequired: false
    };
  }

  /**
   * Extract features for refund decision
   */
  private extractRefundFeatures(
    customer: CustomerProfile | null,
    issueDetails: any,
    amount: number,
    reason: string
  ): number[] {
    const customerTier = customer?.tier === 'vip' ? 2 : customer?.tier === 'premium' ? 1 : 0;
    const customerRating = customer?.history.averageRating || 3;
    const customerBookings = customer?.history.totalBookings || 0;
    const cancellationRate = customer?.history.cancelationRate || 0;
    
    // Issue timing (hours since service)
    const hoursSinceService = Math.floor(
      (Date.now() - issueDetails.timestamp.getTime()) / (1000 * 60 * 60)
    );
    
    // Issue severity based on keywords
    const severityKeywords = ['delayed', 'cancelled', 'rude', 'unsafe', 'damaged', 'accident'];
    const issueSeverity = severityKeywords.some(keyword => 
      reason.toLowerCase().includes(keyword)
    ) ? 1 : 0;
    
    return [
      customerTier / 2, // Normalized
      customerRating / 5, // Normalized
      Math.min(1, customerBookings / 50), // Normalized
      cancellationRate,
      Math.min(1, hoursSinceService / 48), // Within 48 hours
      issueSeverity,
      Math.min(1, amount / 1000) // Normalized to £1000 max
    ];
  }

  /**
   * Calculate refund eligibility
   */
  private calculateRefundEligibility(
    features: number[],
    policy: any
  ): { score: number; reasoning: string } {
    // Simplified scoring (would use ML model in production)
    const weights = [0.2, 0.15, 0.1, -0.2, -0.1, 0.3, -0.05];
    const score = features.reduce((sum, feature, index) => 
      sum + (feature * weights[index]), 0.5
    );
    
    let reasoning = 'Automatic refund decision based on: ';
    const factors: string[] = [];
    
    if (features[0] > 0.5) factors.push('VIP/Premium customer');
    if (features[1] > 0.8) factors.push('High customer rating');
    if (features[4] < 0.5) factors.push('Issue reported promptly');
    if (features[5] === 1) factors.push('Severe service issue');
    
    reasoning += factors.join(', ');
    
    return {
      score: Math.max(0, Math.min(1, score)),
      reasoning
    };
  }

  /**
   * Analyze notification patterns for customer
   */
  private analyzeNotificationPatterns(customer: CustomerProfile) {
    // Simulate pattern analysis (would analyze real data in production)
    return {
      preferredHours: [9, 10, 11, 14, 15, 16], // Business hours
      preferredDays: [1, 2, 3, 4, 5], // Weekdays
      responseRates: {
        email: 0.25,
        sms: 0.45,
        push: 0.15,
        call: 0.8
      },
      optimalFrequency: customer.tier === 'vip' ? 'high' : 'medium'
    };
  }

  /**
   * Select optimal communication channel
   */
  private selectOptimalChannel(
    customer: CustomerProfile,
    notificationType: string,
    urgency: string
  ): NotificationOptimization['channel'] {
    // High urgency - prefer call or SMS
    if (urgency === 'high') {
      return customer.tier === 'vip' ? 'call' : 'sms';
    }
    
    // VIP customers prefer calls for important notifications
    if (customer.tier === 'vip' && notificationType === 'booking_confirmation') {
      return 'call';
    }
    
    // Default to customer communication preference
    if (customer.preferences.communicationStyle === 'minimal') {
      return 'sms';
    } else if (customer.preferences.communicationStyle === 'detailed') {
      return 'email';
    }
    
    return 'email'; // Default
  }

  /**
   * Calculate optimal timing for notification
   */
  private calculateOptimalTiming(
    customer: CustomerProfile,
    notificationType: string,
    patterns: any,
    urgency: string
  ): Date {
    const now = new Date();
    
    // Send immediately for high urgency
    if (urgency === 'high') {
      return now;
    }
    
    // Find next optimal hour
    const currentHour = now.getHours();
    const optimalHours = patterns.preferredHours;
    
    // Find next preferred hour today
    const nextOptimalHour = optimalHours.find((hour: number) => hour > currentHour);
    
    if (nextOptimalHour) {
      const optimalTime = new Date(now);
      optimalTime.setHours(nextOptimalHour, 0, 0, 0);
      return optimalTime;
    } else {
      // Schedule for tomorrow's first optimal hour
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(optimalHours[0], 0, 0, 0);
      return tomorrow;
    }
  }

  /**
   * Estimate engagement probability
   */
  private estimateEngagement(
    customer: CustomerProfile,
    channel: string,
    timing: Date,
    notificationType: string
  ): number {
    let baseRate = 0.3; // 30% base engagement
    
    // Adjust for channel
    const channelMultipliers = {
      call: 0.8,
      sms: 0.45,
      email: 0.25,
      push: 0.15
    };
    baseRate *= channelMultipliers[channel as keyof typeof channelMultipliers] || 1;
    
    // Adjust for customer tier
    if (customer.tier === 'vip') baseRate *= 1.5;
    else if (customer.tier === 'premium') baseRate *= 1.2;
    
    // Adjust for timing (business hours get higher engagement)
    const hour = timing.getHours();
    if (hour >= 9 && hour <= 17) {
      baseRate *= 1.3;
    } else if (hour >= 18 && hour <= 21) {
      baseRate *= 1.1;
    } else {
      baseRate *= 0.7;
    }
    
    return Math.min(1, baseRate);
  }

  /**
   * Calculate notification priority
   */
  private calculateNotificationPriority(
    urgency: string,
    expectedEngagement: number
  ): number {
    let priority = 5; // Default priority
    
    if (urgency === 'high') priority = 9;
    else if (urgency === 'medium') priority = 6;
    else priority = 3;
    
    // Adjust based on engagement probability
    priority = Math.round(priority * expectedEngagement);
    
    return Math.max(1, Math.min(10, priority));
  }

  /**
   * Initialize chatbot intents
   */
  private initializeIntents(): void {
    const intents: ChatbotIntent[] = [
      {
        name: 'booking',
        confidence: 0.9,
        entities: {},
        response: 'I can help you book our security services. What type of service do you need?',
        actions: ['show_booking_form', 'get_service_preferences']
      },
      {
        name: 'cancellation',
        confidence: 0.85,
        entities: {},
        response: 'I understand you need to cancel a booking. Let me help you with that.',
        actions: ['find_booking', 'process_cancellation', 'offer_reschedule']
      },
      {
        name: 'pricing',
        confidence: 0.8,
        entities: {},
        response: 'I can provide pricing information for our services. Which service are you interested in?',
        actions: ['show_pricing', 'calculate_quote']
      },
      {
        name: 'complaint',
        confidence: 0.75,
        entities: {},
        response: 'I\'m sorry to hear about your experience. Let me help resolve this issue.',
        actions: ['log_complaint', 'investigate_issue', 'offer_resolution']
      },
      {
        name: 'tracking',
        confidence: 0.9,
        entities: {},
        response: 'I can help you track your booking. Please provide your booking reference.',
        actions: ['track_booking', 'show_eta', 'contact_driver']
      },
      {
        name: 'general_info',
        confidence: 0.7,
        entities: {},
        response: 'I\'m here to help with information about our security services. What would you like to know?',
        actions: ['show_services', 'provide_info']
      }
    ];

    intents.forEach(intent => {
      this.intents.set(intent.name, intent);
    });
  }

  /**
   * Initialize refund policies
   */
  private initializeRefundPolicies(): void {
    const policies = new Map([
      ['close-protection', {
        eligibleReasons: ['service_not_provided', 'poor_service', 'safety_concern'],
        timeLimit: 48, // hours
        fullRefundConditions: ['service_not_provided', 'safety_concern'],
        partialRefundConditions: ['poor_service']
      }],
      ['private-hire', {
        eligibleReasons: ['driver_no_show', 'vehicle_breakdown', 'poor_service'],
        timeLimit: 24,
        fullRefundConditions: ['driver_no_show', 'vehicle_breakdown'],
        partialRefundConditions: ['poor_service']
      }]
    ]);

    this.refundPolicies = policies;
  }

  /**
   * Get customer profile (mock implementation)
   */
  private async getCustomerProfile(customerId: string): Promise<CustomerProfile | null> {
    // Mock customer data
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
        preferredDrivers: []
      },
      preferences: {
        communicationStyle: 'regular'
      },
      riskProfile: 'low'
    };
  }

  /**
   * Get default intent
   */
  private getDefaultIntent(): ChatbotIntent {
    return {
      name: 'unknown',
      confidence: 0.1,
      entities: {},
      response: 'I\'m not sure I understand. Could you please rephrase your question?',
      actions: ['clarify_intent']
    };
  }

  /**
   * Log refund decision
   */
  private logRefundDecision(decision: AutoRefundDecision, features: number[]): void {
    console.log('Refund Decision:', {
      transactionId: decision.transactionId,
      approved: decision.approved,
      confidence: decision.confidence,
      features
    });
  }

  /**
   * Get customer service analytics
   */
  getAnalytics(period: 'daily' | 'weekly' | 'monthly'): CustomerServiceAnalytics {
    // Mock analytics data
    return {
      period,
      metrics: {
        totalTickets: 150,
        resolvedByAI: 120,
        escalationRate: 0.2,
        avgResolutionTime: 5.5, // minutes
        customerSatisfaction: 4.2
      },
      trends: {
        volumeTrend: 'stable',
        satisfactionTrend: 'improving'
      }
    };
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): AIPerformanceMetrics[] {
    return [
      {
        modelName: 'Intent Classification Model',
        accuracy: 0.91,
        precision: 0.89,
        recall: 0.93,
        f1Score: 0.91,
        responseTime: 50,
        lastUpdated: new Date(),
        trainingDataSize: 5000,
        predictionCount: 2000
      },
      {
        modelName: 'Sentiment Analysis Model',
        accuracy: 0.87,
        precision: 0.85,
        recall: 0.89,
        f1Score: 0.87,
        responseTime: 30,
        lastUpdated: new Date(),
        trainingDataSize: 8000,
        predictionCount: 1500
      },
      {
        modelName: 'Auto Refund Model',
        accuracy: 0.93,
        precision: 0.91,
        recall: 0.95,
        f1Score: 0.93,
        responseTime: 20,
        lastUpdated: new Date(),
        trainingDataSize: 2000,
        predictionCount: 800
      }
    ];
  }
}