import { AIMessage, AIContext, AIResponse, SecurityAssessment } from '../types/ai'
import { SecurityLevel, ServiceType } from '@prisma/client'

class ClaudeAI {
  private apiKey: string
  private baseUrl: string
  private model: string

  constructor() {
    this.apiKey = process.env.CLAUDE_API_KEY || ''
    this.baseUrl = process.env.CLAUDE_API_URL || 'https://api.anthropic.com/v1'
    this.model = 'claude-3-opus-20240229'
  }

  private async callClaude(
    messages: AIMessage[],
    context: AIContext,
    systemPrompt?: string
  ): Promise<AIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            systemPrompt ? { role: 'system', content: systemPrompt } : null,
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ].filter(Boolean),
          context: {
            conversation_id: context.conversationId,
            user_profile: context.userProfile,
            system_state: context.systemState
          },
          max_tokens: 1000
        })
      })

      if (!response.ok) {
        throw new Error(`Claude API error: ${response.statusText}`)
      }

      const data = await response.json()
      return this.processClaudeResponse(data, context)
    } catch (error) {
      console.error('Claude API error:', error)
      throw error
    }
  }

  private processClaudeResponse(
    data: any,
    context: AIContext
  ): AIResponse {
    const response: AIResponse = {
      message: {
        id: data.id,
        role: 'assistant',
        content: data.content,
        timestamp: new Date(),
        metadata: {
          context: data.context,
          intent: data.intent,
          confidence: data.confidence,
          entities: data.entities
        }
      },
      actions: this.extractActions(data.content, context),
      context: {
        intent: data.intent,
        entities: data.entities,
        nextSteps: data.next_steps
      }
    }

    return response
  }

  private extractActions(content: string, context: AIContext): AIResponse['actions'] {
    // Extract actions from Claude's response using NLP
    const actions: AIResponse['actions'] = []
    
    // Quote request detection
    if (content.toLowerCase().includes('quote') || content.toLowerCase().includes('price')) {
      actions.push({
        type: 'quote',
        payload: {
          service: this.detectServiceType(content),
          security: this.detectSecurityLevel(content),
          locations: this.extractLocations(content)
        }
      })
    }

    // Booking intent detection
    if (content.toLowerCase().includes('book') || content.toLowerCase().includes('schedule')) {
      actions.push({
        type: 'book',
        payload: {
          service: this.detectServiceType(content),
          security: this.detectSecurityLevel(content),
          datetime: this.extractDateTime(content)
        }
      })
    }

    // Security assessment needed
    if (content.toLowerCase().includes('security') || content.toLowerCase().includes('protection')) {
      actions.push({
        type: 'security',
        payload: {
          level: this.detectSecurityLevel(content),
          concerns: this.extractSecurityConcerns(content)
        }
      })
    }

    return actions
  }

  private detectServiceType(content: string): ServiceType {
    const content_lower = content.toLowerCase()
    if (content_lower.includes('executive') || content_lower.includes('luxury')) {
      return 'EXECUTIVE'
    }
    if (content_lower.includes('airport')) {
      return 'AIRPORT_TRANSFER'
    }
    if (content_lower.includes('corporate')) {
      return 'CORPORATE'
    }
    if (content_lower.includes('wedding')) {
      return 'WEDDING'
    }
    if (content_lower.includes('security') || content_lower.includes('protection')) {
      return 'SECURITY'
    }
    if (content_lower.includes('private')) {
      return 'PRIVATE_HIRE'
    }
    return 'TAXI'
  }

  private detectSecurityLevel(content: string): SecurityLevel {
    const content_lower = content.toLowerCase()
    if (content_lower.includes('vip') || content_lower.includes('executive protection')) {
      return 'VIP'
    }
    if (content_lower.includes('enhanced') || content_lower.includes('close protection')) {
      return 'ENHANCED'
    }
    if (content_lower.includes('executive')) {
      return 'EXECUTIVE'
    }
    return 'STANDARD'
  }

  private extractLocations(content: string): { pickup?: string; dropoff?: string } {
    // Basic location extraction - would be enhanced with NLP
    const locations = {
      pickup: undefined,
      dropoff: undefined
    }

    // Example pattern matching
    const fromMatch = content.match(/from\s+([^,]+?)(?=\s+to|$)/i)
    const toMatch = content.match(/to\s+([^,.]+)/i)

    if (fromMatch) locations.pickup = fromMatch[1].trim()
    if (toMatch) locations.dropoff = toMatch[1].trim()

    return locations
  }

  private extractDateTime(content: string): Date | undefined {
    // Basic datetime extraction - would be enhanced with NLP
    const now = new Date()
    
    if (content.toLowerCase().includes('now') || content.toLowerCase().includes('asap')) {
      return now
    }

    // Example pattern matching for relative time
    if (content.toLowerCase().includes('tomorrow')) {
      const tomorrow = new Date(now)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return tomorrow
    }

    // Add more sophisticated datetime parsing here
    return undefined
  }

  private extractSecurityConcerns(content: string): string[] {
    const concerns: string[] = []
    
    // Example security concern detection
    if (content.toLowerCase().includes('night')) {
      concerns.push('Night-time travel')
    }
    if (content.toLowerCase().includes('valuable') || content.toLowerCase().includes('jewelry')) {
      concerns.push('Valuable items transport')
    }
    if (content.toLowerCase().includes('profile') || content.toLowerCase().includes('celebrity')) {
      concerns.push('High-profile client')
    }

    return concerns
  }

  // Public methods for different types of interactions
  async chat(message: string, context: AIContext): Promise<AIResponse> {
    const messages: AIMessage[] = [
      {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date()
      }
    ]

    return this.callClaude(messages, context)
  }

  async getSecurityAssessment(
    pickup: string,
    dropoff: string,
    datetime: Date,
    context: AIContext
  ): Promise<SecurityAssessment> {
    const message = `Please assess the security requirements for a journey from ${pickup} to ${dropoff} at ${datetime.toISOString()}.`
    
    const response = await this.chat(message, {
      ...context,
      systemState: {
        ...context.systemState,
        currentDemand: this.calculateDemand(datetime)
      }
    })

    // Process response into SecurityAssessment structure
    const assessment: SecurityAssessment = {
      overallRisk: 'low',
      factors: {
        time: 0,
        location: 0,
        route: 0
      },
      recommendations: {
        securityLevel: 'STANDARD',
        additionalMeasures: []
      }
    }

    // Update assessment based on Claude's response
    if (response.actions?.find(a => a.type === 'security')) {
      const securityAction = response.actions.find(a => a.type === 'security')
      assessment.overallRisk = this.calculateRiskLevel(securityAction!.payload)
      assessment.recommendations.securityLevel = securityAction!.payload.level
      assessment.recommendations.additionalMeasures = securityAction!.payload.concerns
    }

    return assessment
  }

  private calculateDemand(datetime: Date): DemandLevel {
    const hour = datetime.getHours()
    const day = datetime.getDay()

    // Peak hours
    if ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 18)) {
      return 'high'
    }

    // Weekend nights
    if ((day === 5 || day === 6) && hour >= 20) {
      return 'surge'
    }

    // Normal business hours
    if (hour >= 9 && hour <= 17) {
      return 'medium'
    }

    return 'low'
  }

  private calculateRiskLevel(payload: any): 'low' | 'medium' | 'high' {
    const concerns = payload.concerns?.length || 0
    const securityLevel = payload.level

    if (concerns >= 3 || securityLevel === 'VIP') {
      return 'high'
    }
    if (concerns >= 1 || securityLevel === 'ENHANCED') {
      return 'medium'
    }
    return 'low'
  }
}

export const claude = new ClaudeAI()