import { NextResponse } from 'next/server'
import { claude } from '@/lib/claude'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { message, conversationId } = body

    // Get user profile and booking history
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        customerProfile: true,
        bookings: {
          take: 5,
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    // Get current system state
    const availableDrivers = await prisma.driver.findMany({
      where: { status: 'AVAILABLE' },
      include: { vehicle: true }
    })

    // Get active bookings for demand calculation
    const activeBookings = await prisma.booking.count({
      where: {
        status: {
          in: ['CONFIRMED', 'DRIVER_ASSIGNED', 'EN_ROUTE_TO_PICKUP', 'IN_PROGRESS']
        }
      }
    })

    // Prepare context for Claude
    const context = {
      conversationId: conversationId || Date.now().toString(),
      messages: [], // Previous messages would be loaded here
      userProfile: user ? {
        id: user.id,
        name: user.name,
        preferences: {
          preferredService: user.customerProfile?.preferredPayment,
          savedLocations: {
            home: user.customerProfile?.homeAddress,
            work: user.customerProfile?.workAddress
          },
          communicationPreferences: {
            language: 'en',
            notifications: true,
            contactMethod: 'chat'
          }
        },
        bookingHistory: user.bookings.map(booking => ({
          id: booking.id,
          date: booking.createdAt,
          service: booking.serviceType,
          securityLevel: booking.securityLevel,
          status: booking.status
        }))
      } : undefined,
      systemState: {
        availableDrivers: availableDrivers.map(driver => ({
          id: driver.id,
          location: { address: 'London', coordinates: { lat: 51.5074, lng: -0.1278 } }, // Would be real location
          status: driver.status.toLowerCase(),
          securityLevel: [driver.siaLicense ? 'ENHANCED' : 'STANDARD'],
          services: ['TAXI', 'PRIVATE_HIRE'],
          estimatedArrival: 15 // Would be calculated based on location
        })),
        currentDemand: activeBookings > 10 ? 'high' : activeBookings > 5 ? 'medium' : 'low',
        pricing: {
          baseRates: {
            TAXI: 6.5,
            PRIVATE_HIRE: 8.5,
            AIRPORT_TRANSFER: 10,
            CORPORATE: 12,
            SECURITY: 15,
            WEDDING: 20
          },
          securityPremium: {
            STANDARD: 1,
            ENHANCED: 1.5,
            EXECUTIVE: 2,
            VIP: 3
          },
          demandMultiplier: activeBookings > 10 ? 1.5 : activeBookings > 5 ? 1.2 : 1
        }
      }
    }

    // Get response from Claude
    const response = await claude.chat(message, context)

    // Process any actions from Claude's response
    if (response.actions?.length > 0) {
      for (const action of response.actions) {
        switch (action.type) {
          case 'quote':
            // Generate quote
            const quote = await prisma.booking.create({
              data: {
                bookingReference: `GQ${Date.now()}`,
                userId: user!.id,
                serviceType: action.payload.service,
                securityLevel: action.payload.security,
                pickupAddress: action.payload.locations.pickup || '',
                destinationAddress: action.payload.locations.dropoff || '',
                estimatedPrice: calculatePrice(
                  action.payload.service,
                  action.payload.security,
                  context.systemState.pricing
                ),
                status: 'PENDING',
                scheduledDateTime: new Date(),
                currency: 'GBP'
              }
            })
            response.message.content += `\n\nI've generated a quote for you: £${quote.estimatedPrice.toFixed(2)}`
            break

          case 'security':
            // Generate security assessment
            if (action.payload.locations) {
              const assessment = await claude.getSecurityAssessment(
                action.payload.locations.pickup,
                action.payload.locations.dropoff,
                new Date(),
                context
              )
              response.message.content += `\n\nSecurity Assessment:\nRisk Level: ${assessment.overallRisk}\nRecommended Security: ${assessment.recommendations.securityLevel}`
            }
            break
        }
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('AI Chat Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

function calculatePrice(
  service: string,
  security: string,
  pricing: any
): number {
  const baseRate = pricing.baseRates[service] || pricing.baseRates.TAXI
  const securityMultiplier = pricing.securityPremium[security] || 1
  const demandMultiplier = pricing.demandMultiplier || 1

  return baseRate * securityMultiplier * demandMultiplier
}