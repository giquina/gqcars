// AI Chatbot System Integration for GQ Cars
// Handles intelligent customer conversations, booking assistance, and service recommendations

import { AISystemConfig } from '../AIOrchestrator'

export interface ChatbotMessage {
  id: string
  type: 'user' | 'bot' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    intent?: string
    confidence?: number
    entities?: any[]
    sentimentScore?: number
    language?: string
  }
}

export interface ChatbotSession {
  id: string
  userId?: string
  context: ChatbotContext
  messages: ChatbotMessage[]
  startTime: Date
  lastActivity: Date
  status: 'active' | 'completed' | 'transferred' | 'abandoned'
}

export interface ChatbotContext {
  currentIntent?: string
  entities: Record<string, any>
  conversationState: string
  userProfile?: UserProfile
  bookingInProgress?: BookingContext
  serviceRecommendations?: ServiceRecommendation[]
  escalationRequired?: boolean
}

export interface UserProfile {
  id?: string
  name?: string
  email?: string
  phone?: string
  preferredServices?: string[]
  previousBookings?: any[]
  riskLevel?: 'low' | 'medium' | 'high'
  vipStatus?: boolean
}

export interface BookingContext {
  service?: string
  date?: string
  time?: string
  location?: string
  duration?: string
  requirements?: string
  quote?: number
  step: 'service' | 'details' | 'contact' | 'confirmation'
}

export interface ServiceRecommendation {
  serviceId: string
  serviceName: string
  confidence: number
  reason: string
  priceRange: { min: number; max: number }
  availability: boolean
}

export interface ChatbotIntent {
  name: string
  patterns: string[]
  responses: string[]
  action?: string
  requiresData?: boolean
  context?: string[]
  followUp?: string[]
}

export class ChatbotSystem {
  private config: AISystemConfig
  private intents: Map<string, ChatbotIntent> = new Map()
  private sessions: Map<string, ChatbotSession> = new Map()
  private nlpModel: NLPModel
  private knowledgeBase: KnowledgeBase
  private sentimentAnalyzer: SentimentAnalyzer

  constructor(config: AISystemConfig) {
    this.config = config
    this.nlpModel = new NLPModel()
    this.knowledgeBase = new KnowledgeBase()
    this.sentimentAnalyzer = new SentimentAnalyzer()
    this.initializeIntents()
  }

  async processMessage(sessionId: string, message: string, userId?: string): Promise<ChatbotMessage[]> {
    try {
      // Get or create session
      let session = this.sessions.get(sessionId)
      if (!session) {
        session = this.createSession(sessionId, userId)
        this.sessions.set(sessionId, session)
      }

      // Create user message
      const userMessage: ChatbotMessage = {
        id: this.generateMessageId(),
        type: 'user',
        content: message,
        timestamp: new Date()
      }

      // Analyze message
      const analysis = await this.analyzeMessage(message, session.context)
      userMessage.metadata = analysis

      // Add to session
      session.messages.push(userMessage)
      session.lastActivity = new Date()

      // Update sentiment
      if (analysis.sentimentScore && analysis.sentimentScore < 0.3) {
        session.context.escalationRequired = true
      }

      // Process intent and generate response
      const botResponses = await this.generateResponse(analysis, session)

      // Add bot messages to session
      session.messages.push(...botResponses)

      // Update session context
      this.updateSessionContext(session, analysis)

      // Check for completion or escalation
      await this.checkSessionStatus(session)

      return botResponses

    } catch (error) {
      console.error('Error processing chatbot message:', error)
      return [{
        id: this.generateMessageId(),
        type: 'bot',
        content: 'I apologize, but I\'m experiencing some technical difficulties. Please try again or contact our team directly at 07407 655 203.',
        timestamp: new Date()
      }]
    }
  }

  private async analyzeMessage(message: string, context: ChatbotContext): Promise<any> {
    // Perform NLP analysis
    const intent = await this.nlpModel.detectIntent(message, context)
    const entities = await this.nlpModel.extractEntities(message)
    const sentiment = await this.sentimentAnalyzer.analyze(message)
    const language = await this.nlpModel.detectLanguage(message)

    return {
      intent: intent.name,
      confidence: intent.confidence,
      entities,
      sentimentScore: sentiment.score,
      language
    }
  }

  private async generateResponse(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    const responses: ChatbotMessage[] = []
    const intent = this.intents.get(analysis.intent)

    if (!intent) {
      // Fallback response
      responses.push({
        id: this.generateMessageId(),
        type: 'bot',
        content: 'I\'m not sure I understand. Could you please rephrase that or ask me about our security taxi services, booking, or pricing?',
        timestamp: new Date()
      })
      return responses
    }

    // Handle different intents
    switch (analysis.intent) {
      case 'greeting':
        responses.push(...await this.handleGreeting(session))
        break

      case 'booking_inquiry':
        responses.push(...await this.handleBookingInquiry(analysis, session))
        break

      case 'service_information':
        responses.push(...await this.handleServiceInformation(analysis, session))
        break

      case 'pricing_inquiry':
        responses.push(...await this.handlePricingInquiry(analysis, session))
        break

      case 'booking_process':
        responses.push(...await this.handleBookingProcess(analysis, session))
        break

      case 'emergency_request':
        responses.push(...await this.handleEmergencyRequest(analysis, session))
        break

      case 'complaint':
        responses.push(...await this.handleComplaint(analysis, session))
        break

      case 'location_inquiry':
        responses.push(...await this.handleLocationInquiry(analysis, session))
        break

      default:
        responses.push(...await this.handleGeneral(intent, analysis, session))
    }

    return responses
  }

  private async handleGreeting(session: ChatbotSession): Promise<ChatbotMessage[]> {
    const greeting = session.context.userProfile?.name ? 
      `Hello ${session.context.userProfile.name}! Welcome back to GQ Cars.` :
      'Hello! Welcome to GQ Cars - your premium security taxi service.'

    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `${greeting} I'm here to help you with bookings, service information, or answer any questions about our SIA licensed Close Protection Officers and security-trained drivers. How can I assist you today?`,
      timestamp: new Date()
    }]
  }

  private async handleBookingInquiry(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    const responses: ChatbotMessage[] = []

    // Initialize booking context if not exists
    if (!session.context.bookingInProgress) {
      session.context.bookingInProgress = { step: 'service' }
    }

    // Extract booking details from entities
    const booking = session.context.bookingInProgress
    this.extractBookingDetails(analysis.entities, booking)

    // Determine what information we still need
    const missingInfo = this.getMissingBookingInfo(booking)

    if (missingInfo.length === 0) {
      // We have all info, generate quote
      const quote = await this.calculateQuote(booking)
      booking.quote = quote

      responses.push({
        id: this.generateMessageId(),
        type: 'bot',
        content: `Perfect! Based on your requirements:\n\n📅 ${booking.date} at ${booking.time}\n🛡️ ${booking.service}\n📍 ${booking.location}\n⏱️ ${booking.duration}\n\nEstimated cost: £${quote}\n\nWould you like to proceed with this booking? I can help you complete the reservation.`,
        timestamp: new Date()
      })
    } else {
      // Ask for missing information
      const question = this.generateBookingQuestion(missingInfo[0], booking)
      responses.push({
        id: this.generateMessageId(),
        type: 'bot',
        content: question,
        timestamp: new Date()
      })
    }

    return responses
  }

  private async handleServiceInformation(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    const serviceType = this.extractServiceType(analysis.entities)
    
    if (serviceType) {
      const serviceInfo = await this.knowledgeBase.getServiceInformation(serviceType)
      return [{
        id: this.generateMessageId(),
        type: 'bot',
        content: serviceInfo,
        timestamp: new Date()
      }]
    }

    // General service overview
    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `We offer several premium security services:\n\n🛡️ **Close Protection** - Personal security with qualified CPOs\n🚗 **Private Hire** - Luxury vehicles with security-trained drivers\n🏢 **Corporate Security** - Executive protection for businesses\n💎 **VIP Services** - Bespoke security for high-profile clients\n💒 **Wedding Security** - Discreet protection for special events\n\nAll our drivers are SIA licensed Close Protection Officers. Which service interests you most?`,
      timestamp: new Date()
    }]
  }

  private async handlePricingInquiry(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    const serviceType = this.extractServiceType(analysis.entities)
    
    if (serviceType) {
      const pricing = await this.knowledgeBase.getServicePricing(serviceType)
      return [{
        id: this.generateMessageId(),
        type: 'bot',
        content: `${serviceType} pricing:\n\n${pricing}\n\nPrices may vary based on specific requirements, location, and duration. Would you like me to calculate a personalized quote for you?`,
        timestamp: new Date()
      }]
    }

    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `Our pricing varies by service type:\n\n💰 **Starting rates:**\n• Close Protection: £75/hour per officer\n• Private Hire: £95/hour per vehicle\n• Corporate Security: £85/hour per officer\n• VIP Services: £95/hour per officer\n• Wedding Security: £65/hour per officer\n\nFor an accurate quote, I'll need to know your specific requirements. What service are you interested in?`,
      timestamp: new Date()
    }]
  }

  private async handleEmergencyRequest(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    // Flag for immediate escalation
    session.context.escalationRequired = true
    session.status = 'transferred'

    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `🚨 **EMERGENCY PROTOCOL ACTIVATED**\n\nI'm connecting you immediately with our emergency response team.\n\n📞 **Call NOW: 07407 655 203**\n\nFor immediate assistance, please call our 24/7 emergency line. Our team is standing by to help you.\n\nA human operator will be with you shortly.`,
      timestamp: new Date()
    }]
  }

  private async handleComplaint(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    session.context.escalationRequired = true

    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `I'm sorry to hear about your concern. Your feedback is very important to us, and I want to ensure you receive proper attention.\n\nI'm connecting you with our customer service manager who can address your issue personally.\n\nIn the meantime, you can also reach us directly at:\n📞 07407 655 203\n📧 bookings@gqcars.co.uk\n\nA team member will be with you shortly.`,
      timestamp: new Date()
    }]
  }

  private async handleLocationInquiry(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `🗺️ **Our Service Areas:**\n\n✅ **Primary Coverage:**\n• Watford & Hertfordshire\n• Central London\n• All major airports (Heathrow, Gatwick, Stansted, Luton, City)\n\n✅ **Extended Coverage:**\n• Greater London area\n• M25 corridor\n• Special arrangements for other UK locations\n\n🚗 We provide 24/7 coverage in all our service areas with SIA licensed drivers.\n\nWhere do you need our services?`,
      timestamp: new Date()
    }]
  }

  private async handleGeneral(intent: ChatbotIntent, analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    // Select appropriate response from intent responses
    const response = this.selectResponse(intent.responses, session.context)
    
    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: response,
      timestamp: new Date()
    }]
  }

  private createSession(sessionId: string, userId?: string): ChatbotSession {
    return {
      id: sessionId,
      userId,
      context: {
        entities: {},
        conversationState: 'initial'
      },
      messages: [],
      startTime: new Date(),
      lastActivity: new Date(),
      status: 'active'
    }
  }

  private updateSessionContext(session: ChatbotSession, analysis: any): void {
    // Update entities
    if (analysis.entities) {
      Object.assign(session.context.entities, analysis.entities)
    }

    // Update conversation state
    session.context.currentIntent = analysis.intent
    session.context.conversationState = this.determineConversationState(analysis.intent, session.context)
  }

  private async checkSessionStatus(session: ChatbotSession): Promise<void> {
    // Check for escalation
    if (session.context.escalationRequired) {
      session.status = 'transferred'
      await this.escalateToHuman(session)
    }

    // Check for completion
    if (session.context.bookingInProgress?.step === 'confirmation') {
      session.status = 'completed'
    }

    // Check for abandonment (no activity for 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)
    if (session.lastActivity < thirtyMinutesAgo) {
      session.status = 'abandoned'
    }
  }

  private async escalateToHuman(session: ChatbotSession): Promise<void> {
    // Implement human escalation logic
    console.log(`Escalating session ${session.id} to human operator`)
    // Trigger notification to human operators
    // Pass session context and conversation history
  }

  // Utility methods
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private extractBookingDetails(entities: any[], booking: BookingContext): void {
    entities.forEach(entity => {
      switch (entity.type) {
        case 'service':
          booking.service = entity.value
          break
        case 'date':
          booking.date = entity.value
          break
        case 'time':
          booking.time = entity.value
          break
        case 'location':
          booking.location = entity.value
          break
        case 'duration':
          booking.duration = entity.value
          break
      }
    })
  }

  private getMissingBookingInfo(booking: BookingContext): string[] {
    const missing = []
    if (!booking.service) missing.push('service')
    if (!booking.date) missing.push('date')
    if (!booking.time) missing.push('time')
    if (!booking.location) missing.push('location')
    if (!booking.duration) missing.push('duration')
    return missing
  }

  private generateBookingQuestion(missingInfo: string, booking: BookingContext): string {
    const questions = {
      service: 'What type of service do you need? We offer Close Protection, Private Hire, Corporate Security, VIP Services, and Wedding Security.',
      date: 'What date do you need our services?',
      time: 'What time do you need us?',
      location: 'Where do you need pickup or where will the service take place?',
      duration: 'How long do you need our services? (e.g., 4 hours, 8 hours, full day)'
    }
    return questions[missingInfo as keyof typeof questions] || 'Could you provide more details about your requirements?'
  }

  private async calculateQuote(booking: BookingContext): Promise<number> {
    // Implement quote calculation logic
    const baseRates: Record<string, number> = {
      'close-protection': 75,
      'private-hire': 95,
      'corporate': 85,
      'vip': 95,
      'wedding': 65
    }

    const rate = baseRates[booking.service?.toLowerCase() || 'private-hire'] || 95
    const hours = this.parseDuration(booking.duration || '4 hours')
    
    return rate * hours
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1]) : 4
  }

  private extractServiceType(entities: any[]): string | null {
    const serviceEntity = entities.find(e => e.type === 'service')
    return serviceEntity?.value || null
  }

  private selectResponse(responses: string[], context: ChatbotContext): string {
    // Select contextually appropriate response
    return responses[Math.floor(Math.random() * responses.length)]
  }

  private determineConversationState(intent: string, context: ChatbotContext): string {
    // Implement conversation state logic
    return intent
  }

  private initializeIntents(): void {
    // Initialize chatbot intents
    const intents: ChatbotIntent[] = [
      {
        name: 'greeting',
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        responses: ['Hello! How can I help you today?']
      },
      {
        name: 'booking_inquiry',
        patterns: ['book', 'booking', 'reserve', 'schedule', 'appointment', 'hire'],
        responses: ['I\'d be happy to help you with a booking. What service do you need?']
      },
      {
        name: 'service_information',
        patterns: ['services', 'what do you offer', 'security', 'protection', 'taxi'],
        responses: ['We offer premium security and taxi services. Which would you like to know about?']
      },
      {
        name: 'pricing_inquiry',
        patterns: ['price', 'cost', 'rate', 'how much', 'pricing'],
        responses: ['I can help you with pricing information. What service are you interested in?']
      },
      {
        name: 'emergency_request',
        patterns: ['emergency', 'urgent', 'help', 'immediate', 'now', 'asap'],
        responses: ['This is an emergency. Connecting you immediately.']
      },
      {
        name: 'complaint',
        patterns: ['complaint', 'problem', 'issue', 'unhappy', 'disappointed'],
        responses: ['I\'m sorry to hear about your concern. Let me connect you with our customer service team.']
      }
    ]

    intents.forEach(intent => this.intents.set(intent.name, intent))
  }

  private async handleBookingProcess(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    // Handle ongoing booking process steps
    const booking = session.context.bookingInProgress
    if (!booking) {
      return this.handleBookingInquiry(analysis, session)
    }

    // Continue with the booking process based on current step
    switch (booking.step) {
      case 'service':
        return this.handleServiceSelection(analysis, session)
      case 'details':
        return this.handleDetailsCollection(analysis, session)
      case 'contact':
        return this.handleContactCollection(analysis, session)
      case 'confirmation':
        return this.handleBookingConfirmation(analysis, session)
      default:
        return this.handleBookingInquiry(analysis, session)
    }
  }

  private async handleServiceSelection(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    const booking = session.context.bookingInProgress!
    
    // Extract service from user input
    const serviceType = this.extractServiceType(analysis.entities)
    if (serviceType) {
      booking.service = serviceType
      booking.step = 'details'
      
      return [{
        id: this.generateMessageId(),
        type: 'bot',
        content: `Great! You've selected ${serviceType}. Now I need some details about your requirements.\n\nWhat date do you need our services?`,
        timestamp: new Date()
      }]
    }

    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: 'Please select one of our services:\n• Close Protection\n• Private Hire\n• Corporate Security\n• VIP Services\n• Wedding Security',
      timestamp: new Date()
    }]
  }

  private async handleDetailsCollection(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    const booking = session.context.bookingInProgress!
    
    // Extract and update booking details
    this.extractBookingDetails(analysis.entities, booking)
    
    // Check what's still missing
    const missingInfo = this.getMissingBookingInfo(booking)
    
    if (missingInfo.length === 0) {
      // All details collected, move to contact step
      booking.step = 'contact'
      const quote = await this.calculateQuote(booking)
      booking.quote = quote
      
      return [{
        id: this.generateMessageId(),
        type: 'bot',
        content: `Perfect! Here's your booking summary:\n\n📅 ${booking.date} at ${booking.time}\n🛡️ ${booking.service}\n📍 ${booking.location}\n⏱️ ${booking.duration}\n\n💰 **Estimated cost: £${quote}**\n\nTo complete your booking, I'll need your contact details. What's your full name?`,
        timestamp: new Date()
      }]
    }

    // Ask for next missing detail
    const question = this.generateBookingQuestion(missingInfo[0], booking)
    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: question,
      timestamp: new Date()
    }]
  }

  private async handleContactCollection(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    // This would collect contact information and move to confirmation
    const booking = session.context.bookingInProgress!
    booking.step = 'confirmation'
    
    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `Thank you for providing your details. Your booking request has been submitted.\n\nOur team will contact you within 15 minutes to confirm the details and arrange payment.\n\nBooking Reference: ${this.generateBookingReference()}\n\n📞 If you need immediate assistance: 07407 655 203`,
      timestamp: new Date()
    }]
  }

  private async handleBookingConfirmation(analysis: any, session: ChatbotSession): Promise<ChatbotMessage[]> {
    // Booking is confirmed, provide final information
    session.status = 'completed'
    
    return [{
      id: this.generateMessageId(),
      type: 'bot',
      content: `Your booking is confirmed! You should receive a confirmation email shortly.\n\nIs there anything else I can help you with today?`,
      timestamp: new Date()
    }]
  }

  private generateBookingReference(): string {
    return `GQ${Date.now().toString().slice(-6)}${Math.random().toString(36).substr(2, 3).toUpperCase()}`
  }
}

// Supporting classes
class NLPModel {
  async detectIntent(message: string, context: ChatbotContext): Promise<{ name: string; confidence: number }> {
    // Implement NLP intent detection
    return { name: 'general', confidence: 0.8 }
  }

  async extractEntities(message: string): Promise<any[]> {
    // Implement entity extraction
    return []
  }

  async detectLanguage(message: string): Promise<string> {
    // Implement language detection
    return 'en'
  }
}

class KnowledgeBase {
  async getServiceInformation(serviceType: string): Promise<string> {
    // Return service information from knowledge base
    return `Information about ${serviceType} service.`
  }

  async getServicePricing(serviceType: string): Promise<string> {
    // Return pricing information
    return `Pricing for ${serviceType} service.`
  }
}

class SentimentAnalyzer {
  async analyze(message: string): Promise<{ score: number; label: string }> {
    // Implement sentiment analysis
    return { score: 0.7, label: 'positive' }
  }
}

export default ChatbotSystem