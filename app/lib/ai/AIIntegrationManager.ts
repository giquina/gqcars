// AI Integration Manager for GQ Cars
// Unified interface for all AI systems, manages coordination and provides easy-to-use APIs

import AIOrchestrator, { AISystemConfig, AIRequest, AIResponse } from './AIOrchestrator'
import ChatbotSystem from './systems/ChatbotSystem'
import QuoteEngine from './systems/QuoteEngine'
import FormIntelligence from './systems/FormIntelligence'
import AIMetrics from './systems/AIMetrics'

export interface AIIntegrationConfig {
  enableChatbot: boolean
  enableQuoteEngine: boolean
  enableFormIntelligence: boolean
  enableVoiceAI: boolean
  enablePredictiveAnalytics: boolean
  enableRecommendations: boolean
  monitoring: {
    enableMetrics: boolean
    enableHealthChecks: boolean
    enableAnomalyDetection: boolean
    alertsEnabled: boolean
  }
  performance: {
    cacheEnabled: boolean
    rateLimitEnabled: boolean
    circuitBreakerEnabled: boolean
    loadBalancingEnabled: boolean
  }
}

export interface AIServiceResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  metadata: {
    systemId: string
    requestId: string
    responseTime: number
    cached: boolean
    timestamp: Date
  }
}

export interface ChatRequest {
  sessionId: string
  message: string
  userId?: string
  context?: any
}

export interface QuoteRequest {
  service: string
  date: string
  time: string
  location: string
  duration: string
  requirements?: string
  customerProfile?: any
}

export interface FormSessionRequest {
  formType: string
  userId?: string
  initialData?: any
}

export interface SystemHealthStatus {
  overall: 'healthy' | 'degraded' | 'unhealthy'
  systems: Record<string, {
    status: 'healthy' | 'degraded' | 'offline'
    responseTime: number
    errorRate: number
    lastCheck: Date
  }>
  metrics: {
    totalRequests: number
    averageResponseTime: number
    successRate: number
    cacheHitRate: number
  }
}

export class AIIntegrationManager {
  private orchestrator: AIOrchestrator
  private chatbot?: ChatbotSystem
  private quoteEngine?: QuoteEngine
  private formIntelligence?: FormIntelligence
  private metrics: AIMetrics
  private config: AIIntegrationConfig
  private initialized: boolean = false

  constructor(config: AIIntegrationConfig) {
    this.config = config
    this.orchestrator = new AIOrchestrator()
    this.metrics = new AIMetrics({
      id: 'ai-metrics',
      name: 'AI Metrics System',
      type: 'recommendation',
      endpoint: '/api/ai/metrics',
      enabled: true,
      priority: 1,
      retryAttempts: 3,
      timeout: 5000,
      dependencies: [],
      healthCheckInterval: 30000,
      version: '1.0.0'
    })
  }

  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initializing AI Integration Manager...')

      // Initialize AI Orchestrator
      await this.initializeOrchestrator()

      // Initialize AI Systems
      if (this.config.enableChatbot) {
        await this.initializeChatbot()
      }

      if (this.config.enableQuoteEngine) {
        await this.initializeQuoteEngine()
      }

      if (this.config.enableFormIntelligence) {
        await this.initializeFormIntelligence()
      }

      // Setup data flows between systems
      await this.setupDataFlows()

      // Initialize monitoring
      if (this.config.monitoring.enableMetrics) {
        await this.initializeMonitoring()
      }

      this.initialized = true
      console.log('✅ AI Integration Manager initialized successfully')

    } catch (error) {
      console.error('❌ Failed to initialize AI Integration Manager:', error)
      throw error
    }
  }

  // Chatbot API
  async processChat(request: ChatRequest): Promise<AIServiceResponse> {
    this.ensureInitialized()
    
    if (!this.chatbot) {
      throw new Error('Chatbot system not enabled')
    }

    const startTime = Date.now()
    const requestId = this.generateRequestId()

    try {
      const messages = await this.chatbot.processMessage(
        request.sessionId,
        request.message,
        request.userId
      )

      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('chatbot', responseTime, true)

      return {
        success: true,
        data: messages,
        metadata: {
          systemId: 'chatbot',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }

    } catch (error) {
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('chatbot', responseTime, false)

      return {
        success: false,
        error: (error as Error).message,
        metadata: {
          systemId: 'chatbot',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }
    }
  }

  // Quote Engine API
  async generateQuote(request: QuoteRequest): Promise<AIServiceResponse> {
    this.ensureInitialized()
    
    if (!this.quoteEngine) {
      throw new Error('Quote Engine not enabled')
    }

    const startTime = Date.now()
    const requestId = this.generateRequestId()

    try {
      const quoteRequest = {
        id: requestId,
        service: request.service,
        details: {
          serviceType: request.service,
          date: request.date,
          time: request.time,
          duration: this.parseDuration(request.duration),
          location: {
            pickup: request.location,
            serviceArea: this.determineServiceArea(request.location)
          },
          requirements: {
            officers: 1,
            vehicles: 1
          }
        },
        customer: request.customerProfile || {
          tier: 'standard',
          history: []
        },
        metadata: {
          sessionId: requestId,
          timestamp: new Date(),
          source: 'web'
        }
      }

      const quote = await this.quoteEngine.generateQuote(quoteRequest)
      
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('quote-engine', responseTime, true)
      this.metrics.recordBusinessEvent('quotes', 1, { service: request.service })

      return {
        success: true,
        data: quote,
        metadata: {
          systemId: 'quote-engine',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }

    } catch (error) {
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('quote-engine', responseTime, false)

      return {
        success: false,
        error: (error as Error).message,
        metadata: {
          systemId: 'quote-engine',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }
    }
  }

  // Form Intelligence API
  async createFormSession(request: FormSessionRequest): Promise<AIServiceResponse> {
    this.ensureInitialized()
    
    if (!this.formIntelligence) {
      throw new Error('Form Intelligence not enabled')
    }

    const startTime = Date.now()
    const requestId = this.generateRequestId()

    try {
      const session = await this.formIntelligence.createSession(request.formType, request.userId)
      
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('form-intelligence', responseTime, true)

      return {
        success: true,
        data: session,
        metadata: {
          systemId: 'form-intelligence',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }

    } catch (error) {
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('form-intelligence', responseTime, false)

      return {
        success: false,
        error: (error as Error).message,
        metadata: {
          systemId: 'form-intelligence',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }
    }
  }

  async updateFormField(sessionId: string, fieldId: string, value: any): Promise<AIServiceResponse> {
    this.ensureInitialized()
    
    if (!this.formIntelligence) {
      throw new Error('Form Intelligence not enabled')
    }

    const startTime = Date.now()
    const requestId = this.generateRequestId()

    try {
      const assistance = await this.formIntelligence.updateField(sessionId, fieldId, value)
      
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('form-intelligence', responseTime, true)

      return {
        success: true,
        data: assistance,
        metadata: {
          systemId: 'form-intelligence',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }

    } catch (error) {
      const responseTime = Date.now() - startTime
      this.metrics.recordRequest('form-intelligence', responseTime, false)

      return {
        success: false,
        error: (error as Error).message,
        metadata: {
          systemId: 'form-intelligence',
          requestId,
          responseTime,
          cached: false,
          timestamp: new Date()
        }
      }
    }
  }

  // System Health and Monitoring
  async getSystemHealth(): Promise<SystemHealthStatus> {
    const systems = this.orchestrator.getSystemStatus() as any[]
    const metrics = this.metrics.getMetrics()

    const systemHealth: Record<string, any> = {}
    let healthyCount = 0

    for (const system of systems) {
      const isHealthy = system.status === 'healthy'
      if (isHealthy) healthyCount++

      systemHealth[system.id] = {
        status: system.status,
        responseTime: system.responseTime,
        errorRate: system.errorRate,
        lastCheck: system.lastHealthCheck
      }
    }

    const overallStatus = 
      healthyCount === systems.length ? 'healthy' :
      healthyCount >= systems.length * 0.7 ? 'degraded' : 'unhealthy'

    return {
      overall: overallStatus,
      systems: systemHealth,
      metrics: {
        totalRequests: metrics.totalRequests || 0,
        averageResponseTime: metrics.averageResponseTime || 0,
        successRate: metrics.successRate || 100,
        cacheHitRate: metrics.cacheHitRate || 0
      }
    }
  }

  async getMetrics(timeRange?: any): Promise<any> {
    return await this.metrics.getMetrics()
  }

  async generatePerformanceReport(timeRange?: any): Promise<any> {
    return await this.metrics.generatePerformanceReport(timeRange || this.getDefaultTimeRange())
  }

  // Integration Management
  async enableSystem(systemId: string): Promise<void> {
    // Enable specific AI system
    console.log(`Enabling system: ${systemId}`)
  }

  async disableSystem(systemId: string): Promise<void> {
    // Disable specific AI system
    console.log(`Disabling system: ${systemId}`)
  }

  async updateConfiguration(newConfig: Partial<AIIntegrationConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig }
    console.log('Configuration updated')
  }

  // Shutdown
  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down AI Integration Manager...')
    
    if (this.orchestrator) {
      await this.orchestrator.shutdown()
    }
    
    this.initialized = false
    console.log('✅ AI Integration Manager shutdown complete')
  }

  // Private Methods
  private async initializeOrchestrator(): Promise<void> {
    // Orchestrator is already initialized in constructor
    console.log('📡 AI Orchestrator initialized')
  }

  private async initializeChatbot(): Promise<void> {
    const config: AISystemConfig = {
      id: 'chatbot',
      name: 'AI Chatbot System',
      type: 'chatbot',
      endpoint: '/api/ai/chatbot',
      enabled: true,
      priority: 1,
      retryAttempts: 3,
      timeout: 10000,
      dependencies: [],
      healthCheckInterval: 30000,
      version: '1.0.0'
    }

    await this.orchestrator.registerSystem(config)
    this.chatbot = new ChatbotSystem(config)
    console.log('🤖 Chatbot System initialized')
  }

  private async initializeQuoteEngine(): Promise<void> {
    const config: AISystemConfig = {
      id: 'quote-engine',
      name: 'AI Quote Engine',
      type: 'quote-engine',
      endpoint: '/api/ai/quotes',
      enabled: true,
      priority: 1,
      retryAttempts: 3,
      timeout: 15000,
      dependencies: [],
      healthCheckInterval: 30000,
      version: '1.0.0'
    }

    await this.orchestrator.registerSystem(config)
    this.quoteEngine = new QuoteEngine(config)
    console.log('💰 Quote Engine initialized')
  }

  private async initializeFormIntelligence(): Promise<void> {
    const config: AISystemConfig = {
      id: 'form-intelligence',
      name: 'Form Intelligence System',
      type: 'form-intelligence',
      endpoint: '/api/ai/forms',
      enabled: true,
      priority: 1,
      retryAttempts: 3,
      timeout: 5000,
      dependencies: [],
      healthCheckInterval: 30000,
      version: '1.0.0'
    }

    await this.orchestrator.registerSystem(config)
    this.formIntelligence = new FormIntelligence(config)
    console.log('📝 Form Intelligence initialized')
  }

  private async setupDataFlows(): Promise<void> {
    // Setup data flows between systems
    await this.orchestrator.registerDataFlow({
      sourceSystem: 'chatbot',
      targetSystem: 'quote-engine',
      dataType: 'booking-intent',
      transformationRules: [
        { type: 'map', mapping: { intent: 'service', entities: 'requirements' } }
      ],
      realTimeSync: true,
      errorHandling: 'retry'
    })

    await this.orchestrator.registerDataFlow({
      sourceSystem: 'form-intelligence',
      targetSystem: 'quote-engine',
      dataType: 'form-data',
      transformationRules: [
        { type: 'map', mapping: { formData: 'quoteRequest' } }
      ],
      realTimeSync: true,
      errorHandling: 'retry'
    })

    console.log('🔄 Data flows configured')
  }

  private async initializeMonitoring(): Promise<void> {
    // Monitoring is handled by the metrics system
    console.log('📊 Monitoring initialized')
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error('AI Integration Manager not initialized. Call initialize() first.')
    }
  }

  private generateRequestId(): string {
    return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  private parseDuration(duration: string): number {
    const match = duration.match(/(\d+)/)
    return match ? parseInt(match[1]) : 4
  }

  private determineServiceArea(location: string): string {
    const lowerLocation = location.toLowerCase()
    
    if (lowerLocation.includes('heathrow') || lowerLocation.includes('gatwick') || 
        lowerLocation.includes('stansted') || lowerLocation.includes('luton')) {
      return 'airports'
    }
    
    if (lowerLocation.includes('london') || lowerLocation.includes('central')) {
      return 'london'
    }
    
    if (lowerLocation.includes('watford') || lowerLocation.includes('hertford')) {
      return 'hertfordshire'
    }
    
    return 'extended'
  }

  private getDefaultTimeRange(): any {
    const end = new Date()
    const start = new Date(end.getTime() - 24 * 60 * 60 * 1000) // Last 24 hours
    return { start, end, granularity: 'hour' }
  }
}

// Export singleton instance
let aiManager: AIIntegrationManager | null = null

export function getAIManager(config?: AIIntegrationConfig): AIIntegrationManager {
  if (!aiManager && config) {
    aiManager = new AIIntegrationManager(config)
  }
  
  if (!aiManager) {
    throw new Error('AI Manager not initialized. Provide config on first call.')
  }
  
  return aiManager
}

export async function initializeAI(config: AIIntegrationConfig): Promise<AIIntegrationManager> {
  const manager = getAIManager(config)
  await manager.initialize()
  return manager
}

export default AIIntegrationManager