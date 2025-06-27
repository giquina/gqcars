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
    const { pickup, dropoff, datetime, eventType } = body

    // Get system context
    const availableDrivers = await prisma.driver.findMany({
      where: {
        status: 'AVAILABLE',
        siaLicense: { not: null }
      }
    })

    const context = {
      conversationId: Date.now().toString(),
      messages: [],
      systemState: {
        availableDrivers: availableDrivers.map(driver => ({
          id: driver.id,
          securityLevel: driver.siaLicense ? ['ENHANCED', 'EXECUTIVE'] : ['STANDARD'],
          status: 'available'
        })),
        currentDemand: 'medium',
        pricing: {
          securityPremium: {
            STANDARD: 1,
            ENHANCED: 1.5,
            EXECUTIVE: 2,
            VIP: 3
          }
        }
      }
    }

    // Get security assessment
    const assessment = await claude.getSecurityAssessment(
      pickup,
      dropoff,
      new Date(datetime),
      context
    )

    // Save assessment to database
    await prisma.securityAssessment.create({
      data: {
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        dateTime: new Date(datetime),
        riskLevel: assessment.overallRisk,
        recommendedSecurityLevel: assessment.recommendations.securityLevel,
        additionalMeasures: assessment.recommendations.additionalMeasures,
        factors: {
          time: assessment.factors.time,
          location: assessment.factors.location,
          route: assessment.factors.route,
          eventType: assessment.factors.eventType
        }
      }
    })

    // Get available security-trained drivers
    const securityDrivers = availableDrivers.filter(driver => 
      driver.siaLicense && 
      new Date(driver.expiryDate) > new Date()
    )

    // Enhanced response with driver availability
    return NextResponse.json({
      assessment,
      availability: {
        securityDrivers: securityDrivers.length,
        estimatedResponse: calculateResponseTime(securityDrivers, pickup),
        nearestDriver: findNearestDriver(securityDrivers, pickup)
      }
    })

  } catch (error) {
    console.error('Security Assessment Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

function calculateResponseTime(drivers: any[], location: string): number {
  // This would use real geolocation data
  // For now, return estimated time based on available drivers
  return Math.max(5, Math.ceil(15 / drivers.length))
}

function findNearestDriver(drivers: any[], location: string): any {
  // This would use real geolocation data
  // For now, return first available driver
  return drivers[0] ? {
    id: drivers[0].id,
    estimatedArrival: calculateResponseTime([drivers[0]], location),
    securityLevel: drivers[0].siaLicense ? 'ENHANCED' : 'STANDARD'
  } : null
}