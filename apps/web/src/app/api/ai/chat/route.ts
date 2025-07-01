import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { message } = body

    // Simple AI response for now - can be enhanced later
    const responses = [
      "Thank you for contacting GQ Cars. How can I assist you with your transport needs today?",
      "I'd be happy to help you book a premium security transport service. What's your destination?",
      "Our SIA licensed close protection officers are available 24/7. When do you need the service?",
      "For VIP services, we provide luxury vehicles with enhanced security. Would you like to know more?",
      "I can help you with booking, pricing, or security assessments. What would you prefer?"
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString(),
      type: 'assistant'
    })

  } catch (error) {
    console.error('AI Chat error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}