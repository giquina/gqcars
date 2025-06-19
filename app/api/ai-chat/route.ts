import { OpenAI } from 'openai'
import { NextRequest, NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// GQ Cars knowledge base and context
const GQ_CARS_CONTEXT = `
You are the AI assistant for GQ Cars, a premium security taxi service in London. Here are the key details:

BUSINESS INFO:
- Company: GQ Cars - Premium Security Taxi Service
- Phone: 07407 655 203
- Email: bookings@gqcars.co.uk
- Coverage: London, Watford, all major airports (Heathrow, Gatwick, Stansted, Luton)
- Available: 24/7, 365 days a year

SERVICES:
1. Standard Security Taxi - SIA licensed drivers for safe transport
2. Executive Protection - Close protection for VIPs and executives
3. Close Protection Teams - Full security detail for high-risk clients
4. Airport Transfers - Secure transport to/from all London airports
5. Wedding Security - Discreet protection for special events
6. Family Protection - Keeping families safe during transport

DRIVER CREDENTIALS:
- All drivers are SIA (Security Industry Authority) Licensed
- Close Protection Officer qualified
- Professionally trained in security protocols
- Background checked and vetted
- Experienced in executive protection

PRICING GUIDELINES:
- Standard Security Taxi: From £3.50/mile
- Executive Protection: From £50/hour
- Close Protection Teams: Quote based on requirements
- Airport transfers: Fixed rates available
- 24/7 premium rates may apply

BOOKING PROCESS:
1. Assess customer needs and risk level
2. Recommend appropriate service level
3. Provide quote with transparent pricing
4. Collect pickup/destination details
5. Confirm driver and vehicle details
6. Send booking confirmation

TONE: Professional, security-focused, reassuring, knowledgeable about protection services.
Always emphasize safety, professionalism, and SIA licensing.
`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    // Prepare messages for OpenAI
    const messages = [
      {
        role: 'system' as const,
        content: GQ_CARS_CONTEXT
      },
      ...conversationHistory.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user' as const,
        content: message
      }
    ]

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const aiResponse = response.choices[0]?.message?.content || 'I apologize, but I encountered an error. Please call us directly at 07407 655 203.'

    // Simple intent detection for analytics
    const intent = detectIntent(message)
    
    return NextResponse.json({
      response: aiResponse,
      intent,
      confidence: 0.9, // Simplified confidence score
      suggestedActions: getSuggestedActions(intent)
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { 
        error: 'Sorry, I encountered an error. Please call us at 07407 655 203 for immediate assistance.',
        fallbackMessage: 'Our security taxi services are available 24/7. Contact us for a quote!'
      },
      { status: 500 }
    )
  }
}

function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('book') || lowerMessage.includes('booking') || lowerMessage.includes('schedule')) {
    return 'booking'
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
    return 'pricing'
  }
  if (lowerMessage.includes('airport') || lowerMessage.includes('heathrow') || lowerMessage.includes('gatwick')) {
    return 'airport_transfer'
  }
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('now')) {
    return 'emergency'
  }
  if (lowerMessage.includes('services') || lowerMessage.includes('protection') || lowerMessage.includes('security')) {
    return 'services_inquiry'
  }
  if (lowerMessage.includes('driver') || lowerMessage.includes('sia') || lowerMessage.includes('licensed')) {
    return 'driver_credentials'
  }
  
  return 'general_inquiry'
}

function getSuggestedActions(intent: string): string[] {
  const actions: Record<string, string[]> = {
    booking: ['Get Quote', 'Call Now', 'Schedule Later'],
    pricing: ['Get Custom Quote', 'View Service Options', 'Call for Pricing'],
    airport_transfer: ['Book Airport Transfer', 'Get Quote', 'View Routes'],
    emergency: ['Call Now: 07407 655 203', 'Emergency Booking', 'Locate Nearest Vehicle'],
    services_inquiry: ['View All Services', 'Executive Protection', 'Standard Security'],
    driver_credentials: ['Learn About SIA Licensing', 'View Driver Profiles', 'Security Standards'],
    general_inquiry: ['Get Quote', 'Call Now', 'View Services']
  }
  
  return actions[intent] || ['Get Quote', 'Call Now', 'View Services']
}