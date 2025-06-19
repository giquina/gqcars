import { 
  ChatbotContext, 
  NotificationOptimization,
  CustomerProfile,
  AIDecisionContext 
} from './types';

export interface ChatbotIntent {
  name: string;
  confidence: number;
  entities: Record<string, any>;
  response: string;
  actions: string[];
}

export interface SentimentAnalysis {
  score: number; // -1 to 1 (negative to positive)
  magnitude: number; // 0 to 1 (intensity)
  emotion: 'angry' | 'frustrated' | 'neutral' | 'satisfied' | 'delighted';
  urgency: 'low' | 'medium' | 'high';
}

export interface ConversationFlow {
  currentStep: string;
  completedSteps: string[];
  nextSuggestedActions: string[];
  collectedData: Record<string, any>;
}

export class AIChatbotEngine {
  private intents: Map<string, ChatbotIntent> = new Map();
  private conversationHistory: Map<string, ChatbotContext> = new Map();
  private knowledgeBase: Map<string, string[]> = new Map();
  
  constructor() {
    this.initializeIntents();
    this.initializeKnowledgeBase();
  }

  /**
   * Process user message and generate intelligent response
   */
  async processMessage(
    sessionId: string,
    message: string,
    customerId?: string
  ): Promise<{
    response: string;
    intent: ChatbotIntent;
    sentiment: SentimentAnalysis;
    conversationFlow: ConversationFlow;
    suggestedActions: string[];
    escalationRequired: boolean;
    confidence: number;
  }> {
    try {
      // Get or create conversation context
      let context = this.conversationHistory.get(sessionId);
      if (!context) {
        context = this.createNewContext(sessionId, customerId);
      }

      // Analyze message sentiment
      const sentiment = this.analyzeSentiment(message);
      
      // Extract entities from message
      const entities = this.extractEntities(message);
      
      // Classify intent
      const intent = await this.classifyIntent(message, context, entities);
      
      // Update conversation history
      context.conversationHistory.push({
        message,
        sender: 'user',
        timestamp: new Date()
      });

      // Generate contextual response
      const response = await this.generateResponse(intent, context, sentiment, entities);
      
      // Update conversation flow
      const conversationFlow = this.updateConversationFlow(context, intent, entities);
      
      // Determine suggested actions
      const suggestedActions = this.getSuggestedActions(intent, sentiment, context);
      
      // Check if escalation is needed
      const escalationRequired = this.shouldEscalate(intent, sentiment, context);
      
      // Calculate overall confidence
      const confidence = this.calculateResponseConfidence(intent, sentiment, context);
      
      // Add bot response to history
      context.conversationHistory.push({
        message: response,
        sender: 'bot',
        timestamp: new Date()
      });

      // Update context
      context.intent = intent.name;
      context.confidence = confidence;
      context.escalationRequired = escalationRequired;
      context.entities = { ...context.entities, ...entities };
      
      this.conversationHistory.set(sessionId, context);

      return {
        response,
        intent,
        sentiment,
        conversationFlow,
        suggestedActions,
        escalationRequired,
        confidence
      };
    } catch (error) {
      console.error('Error processing message:', error);
      return this.getErrorResponse();
    }
  }

  /**
   * Analyze sentiment using NLP techniques
   */
  private analyzeSentiment(text: string): SentimentAnalysis {
    const words = text.toLowerCase().split(/\s+/);
    
    // Sentiment lexicons
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 
      'perfect', 'love', 'like', 'happy', 'satisfied', 'pleased', 'thank'
    ];
    
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'angry',
      'frustrated', 'disappointed', 'upset', 'annoyed', 'complain', 'problem'
    ];
    
    const urgentWords = [
      'urgent', 'emergency', 'immediately', 'asap', 'now', 'quick',
      'critical', 'important', 'serious', 'help'
    ];

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
    
    const magnitude = Math.min(1, (totalSentimentWords + urgentCount) / words.length * 5);
    
    let emotion: SentimentAnalysis['emotion'] = 'neutral';
    if (score > 0.6) emotion = 'delighted';
    else if (score > 0.2) emotion = 'satisfied';
    else if (score < -0.2) emotion = 'frustrated';
    else if (score < -0.6) emotion = 'angry';
    
    const urgency: SentimentAnalysis['urgency'] = 
      urgentCount > 0 || emotion === 'angry' ? 'high' :
      emotion === 'frustrated' ? 'medium' : 'low';

    return { score, magnitude, emotion, urgency };
  }

  /**
   * Extract entities from message using NER
   */
  private extractEntities(message: string): Record<string, any> {
    const entities: Record<string, any> = {};
    const text = message.toLowerCase();

    // Extract dates
    const datePattern = /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})|(\d{1,2}\s+(january|february|march|april|may|june|july|august|september|october|november|december))/gi;
    const dateMatches = text.match(datePattern);
    if (dateMatches) {
      entities.dates = dateMatches;
    }

    // Extract times
    const timePattern = /(\d{1,2}:\d{2}(\s*(am|pm))?)|(\d{1,2}\s*(am|pm))/gi;
    const timeMatches = text.match(timePattern);
    if (timeMatches) {
      entities.times = timeMatches;
    }

    // Extract services
    const services = ['close protection', 'private hire', 'corporate', 'wedding', 'vip'];
    const serviceMatches = services.filter(service => text.includes(service));
    if (serviceMatches.length > 0) {
      entities.services = serviceMatches;
    }

    // Extract locations
    const locationPattern = /(in|at|from|to)\s+([A-Za-z\s]{2,})/gi;
    const locationMatches = text.match(locationPattern);
    if (locationMatches) {
      entities.locations = locationMatches.map(match => match.replace(/(in|at|from|to)\s+/i, ''));
    }

    // Extract numbers (prices, durations, etc.)
    const numberPattern = /£?\d+(\.\d{2})?/g;
    const numberMatches = text.match(numberPattern);
    if (numberMatches) {
      entities.numbers = numberMatches;
    }

    // Extract contact information
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const phonePattern = /(\+44\s?|0)[0-9\s-]{10,}/g;
    
    const emailMatches = text.match(emailPattern);
    const phoneMatches = text.match(phonePattern);
    
    if (emailMatches) entities.emails = emailMatches;
    if (phoneMatches) entities.phones = phoneMatches;

    return entities;
  }

  /**
   * Classify user intent using ML-like approach
   */
  private async classifyIntent(
    message: string,
    context: ChatbotContext,
    entities: Record<string, any>
  ): Promise<ChatbotIntent> {
    const text = message.toLowerCase();
    const scores: Array<{ intent: ChatbotIntent; score: number }> = [];

    // Score each intent based on keywords and patterns
    for (const [intentName, intent] of this.intents) {
      let score = 0;

      // Get keywords for this intent
      const keywords = this.getIntentKeywords(intentName);
      
      // Calculate keyword matches
      const keywordMatches = keywords.filter(keyword => text.includes(keyword)).length;
      score += keywordMatches * 0.3;

      // Context-based scoring
      if (context.intent === intentName) {
        score += 0.2; // Continuity bonus
      }

      // Entity-based scoring
      if (intentName === 'booking' && (entities.services || entities.dates || entities.times)) {
        score += 0.4;
      }
      
      if (intentName === 'pricing' && entities.numbers) {
        score += 0.3;
      }

      if (intentName === 'complaint' && text.includes('problem')) {
        score += 0.5;
      }

      scores.push({ intent: { ...intent, confidence: score }, score });
    }

    // Find best match
    const bestMatch = scores.reduce((best, current) => 
      current.score > best.score ? current : best
    );

    // Apply confidence threshold
    if (bestMatch.score < 0.3) {
      return this.intents.get('general_info') || this.getDefaultIntent();
    }

    return bestMatch.intent;
  }

  /**
   * Generate contextual response
   */
  private async generateResponse(
    intent: ChatbotIntent,
    context: ChatbotContext,
    sentiment: SentimentAnalysis,
    entities: Record<string, any>
  ): Promise<string> {
    let response = intent.response;

    // Personalize response based on customer
    if (context.customerId) {
      response = response.replace('{customer_name}', 'valued customer');
    }

    // Sentiment-aware responses
    if (sentiment.emotion === 'angry' || sentiment.emotion === 'frustrated') {
      response = `I understand your frustration and I'm here to help. ${response}`;
    } else if (sentiment.emotion === 'satisfied' || sentiment.emotion === 'delighted') {
      response = `I'm glad to assist you! ${response}`;
    }

    // Entity-aware responses
    if (entities.services && intent.name === 'booking') {
      response += ` I see you're interested in ${entities.services[0]} services.`;
    }

    if (entities.dates && intent.name === 'booking') {
      response += ` You mentioned ${entities.dates[0]} - let me help you with that date.`;
    }

    // Add helpful suggestions
    response += this.getHelpfulSuggestions(intent, entities);

    return response;
  }

  /**
   * Update conversation flow
   */
  private updateConversationFlow(
    context: ChatbotContext,
    intent: ChatbotIntent,
    entities: Record<string, any>
  ): ConversationFlow {
    const flow: ConversationFlow = {
      currentStep: intent.name,
      completedSteps: context.conversationHistory
        .filter(h => h.sender === 'user')
        .map(h => this.classifyStepFromMessage(h.message)),
      nextSuggestedActions: [],
      collectedData: entities
    };

    // Determine next actions based on current step
    switch (intent.name) {
      case 'booking':
        if (!entities.services) {
          flow.nextSuggestedActions.push('collect_service_type');
        } else if (!entities.dates) {
          flow.nextSuggestedActions.push('collect_date');
        } else if (!entities.times) {
          flow.nextSuggestedActions.push('collect_time');
        } else {
          flow.nextSuggestedActions.push('provide_quote', 'proceed_to_booking');
        }
        break;
      
      case 'pricing':
        flow.nextSuggestedActions.push('show_pricing_calculator', 'explain_pricing_factors');
        break;
      
      case 'complaint':
        flow.nextSuggestedActions.push('collect_details', 'escalate_to_human', 'offer_resolution');
        break;
      
      default:
        flow.nextSuggestedActions.push('provide_more_info', 'ask_clarification');
    }

    return flow;
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

    // Sentiment-based actions
    if (sentiment.emotion === 'angry') {
      actions.push('priority_handling', 'offer_compensation', 'escalate_immediately');
    } else if (sentiment.emotion === 'frustrated') {
      actions.push('provide_detailed_explanation', 'offer_alternative_solution');
    }

    // Intent-based actions
    switch (intent.name) {
      case 'booking':
        actions.push('send_booking_form', 'calculate_quote', 'check_availability');
        break;
      case 'complaint':
        actions.push('log_complaint', 'investigate_issue', 'follow_up_required');
        break;
      case 'cancellation':
        actions.push('process_cancellation', 'check_refund_policy', 'offer_reschedule');
        break;
    }

    // Urgency-based actions
    if (sentiment.urgency === 'high') {
      actions.unshift('immediate_response', 'notify_supervisor');
    }

    return [...new Set(actions)]; // Remove duplicates
  }

  /**
   * Determine if escalation is needed
   */
  private shouldEscalate(
    intent: ChatbotIntent,
    sentiment: SentimentAnalysis,
    context: ChatbotContext
  ): boolean {
    // High anger or frustration
    if (sentiment.emotion === 'angry' && sentiment.magnitude > 0.7) {
      return true;
    }

    // Low confidence in response
    if (intent.confidence < 0.4) {
      return true;
    }

    // Complex complaints
    if (intent.name === 'complaint' && sentiment.urgency === 'high') {
      return true;
    }

    // Repetitive conversation without resolution
    if (context.conversationHistory.length > 8) {
      const recentIntents = context.conversationHistory
        .slice(-6)
        .filter(h => h.sender === 'user')
        .map(h => this.classifyStepFromMessage(h.message));
      
      const uniqueIntents = new Set(recentIntents);
      if (uniqueIntents.size <= 2) {
        return true; // Conversation going in circles
      }
    }

    return false;
  }

  /**
   * Calculate response confidence
   */
  private calculateResponseConfidence(
    intent: ChatbotIntent,
    sentiment: SentimentAnalysis,
    context: ChatbotContext
  ): number {
    let confidence = intent.confidence;

    // Boost confidence for clear emotions
    if (sentiment.magnitude > 0.5) {
      confidence += 0.1;
    }

    // Reduce confidence for complex conversations
    if (context.conversationHistory.length > 6) {
      confidence -= 0.1;
    }

    // Boost confidence for repeated similar intents
    const recentIntents = context.conversationHistory
      .slice(-3)
      .filter(h => h.sender === 'user');
    
    if (recentIntents.length > 1) {
      const similarIntents = recentIntents.filter(h => 
        this.classifyStepFromMessage(h.message) === intent.name
      );
      
      if (similarIntents.length > 1) {
        confidence += 0.15;
      }
    }

    return Math.min(Math.max(confidence, 0), 1);
  }

  /**
   * Initialize chatbot intents
   */
  private initializeIntents(): void {
    const intents: Array<ChatbotIntent> = [
      {
        name: 'booking',
        confidence: 0.9,
        entities: {},
        response: 'I can help you book our security services. What type of service do you need?',
        actions: ['show_services', 'collect_requirements']
      },
      {
        name: 'pricing',
        confidence: 0.85,
        entities: {},
        response: 'I can provide pricing information for our services. Which service interests you?',
        actions: ['show_pricing', 'calculate_quote']
      },
      {
        name: 'complaint',
        confidence: 0.8,
        entities: {},
        response: 'I\'m sorry to hear about your experience. Let me help resolve this issue.',
        actions: ['log_complaint', 'escalate_if_needed']
      },
      {
        name: 'cancellation',
        confidence: 0.9,
        entities: {},
        response: 'I can help you with cancellation. Let me check your booking details.',
        actions: ['find_booking', 'process_cancellation']
      },
      {
        name: 'tracking',
        confidence: 0.95,
        entities: {},
        response: 'I can help you track your booking. Please provide your booking reference.',
        actions: ['track_booking', 'show_status']
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
   * Initialize knowledge base
   */
  private initializeKnowledgeBase(): void {
    this.knowledgeBase.set('booking', [
      'book', 'reserve', 'schedule', 'arrange', 'hire', 'need', 'want', 'request'
    ]);
    
    this.knowledgeBase.set('pricing', [
      'price', 'cost', 'how much', 'quote', 'rate', 'fee', 'charge', 'expensive', 'cheap'
    ]);
    
    this.knowledgeBase.set('complaint', [
      'complain', 'problem', 'issue', 'wrong', 'bad', 'terrible', 'disappointed', 'unsatisfied'
    ]);
    
    this.knowledgeBase.set('cancellation', [
      'cancel', 'refund', 'change', 'modify', 'reschedule', 'postpone'
    ]);
    
    this.knowledgeBase.set('tracking', [
      'track', 'status', 'where', 'when', 'arrival', 'eta', 'progress', 'update'
    ]);
  }

  /**
   * Get keywords for intent classification
   */
  private getIntentKeywords(intentName: string): string[] {
    return this.knowledgeBase.get(intentName) || [];
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
   * Classify step from message
   */
  private classifyStepFromMessage(message: string): string {
    const text = message.toLowerCase();
    
    if (text.includes('book') || text.includes('hire')) return 'booking';
    if (text.includes('price') || text.includes('cost')) return 'pricing';
    if (text.includes('problem') || text.includes('complain')) return 'complaint';
    if (text.includes('cancel') || text.includes('refund')) return 'cancellation';
    if (text.includes('track') || text.includes('status')) return 'tracking';
    
    return 'general_info';
  }

  /**
   * Get helpful suggestions
   */
  private getHelpfulSuggestions(intent: ChatbotIntent, entities: Record<string, any>): string {
    let suggestions = '';

    switch (intent.name) {
      case 'booking':
        if (!entities.services) {
          suggestions = ' Our services include Close Protection, Private Hire, Corporate Security, Wedding Security, and VIP Services.';
        }
        break;
      
      case 'pricing':
        suggestions = ' Would you like me to calculate a personalized quote based on your requirements?';
        break;
      
      case 'general_info':
        suggestions = ' I can help you with booking, pricing, tracking existing bookings, or answer questions about our services.';
        break;
    }

    return suggestions;
  }

  /**
   * Get default intent for fallback
   */
  private getDefaultIntent(): ChatbotIntent {
    return {
      name: 'unknown',
      confidence: 0.1,
      entities: {},
      response: 'I\'m not sure I understand. Could you please rephrase your question or tell me how I can help you?',
      actions: ['clarify_intent', 'show_help_menu']
    };
  }

  /**
   * Get error response
   */
  private getErrorResponse() {
    return {
      response: "I apologize, but I'm experiencing technical difficulties. Let me connect you with a human agent who can assist you better.",
      intent: this.getDefaultIntent(),
      sentiment: { score: 0, magnitude: 0, emotion: 'neutral' as const, urgency: 'medium' as const },
      conversationFlow: {
        currentStep: 'error',
        completedSteps: [],
        nextSuggestedActions: ['escalate_immediately'],
        collectedData: {}
      },
      suggestedActions: ['escalate_immediately', 'technical_support'],
      escalationRequired: true,
      confidence: 0
    };
  }

  /**
   * Get conversation analytics
   */
  getConversationAnalytics(sessionId: string) {
    const context = this.conversationHistory.get(sessionId);
    if (!context) return null;

    const messages = context.conversationHistory;
    const userMessages = messages.filter(m => m.sender === 'user');
    const botMessages = messages.filter(m => m.sender === 'bot');

    return {
      totalMessages: messages.length,
      userMessages: userMessages.length,
      botMessages: botMessages.length,
      conversationDuration: messages.length > 0 ? 
        Date.now() - messages[0].timestamp.getTime() : 0,
      intentsDetected: [...new Set(userMessages.map(m => this.classifyStepFromMessage(m.message)))],
      escalationRequired: context.escalationRequired,
      lastActivity: messages[messages.length - 1]?.timestamp
    };
  }

  /**
   * End conversation and cleanup
   */
  endConversation(sessionId: string): void {
    this.conversationHistory.delete(sessionId);
  }
}