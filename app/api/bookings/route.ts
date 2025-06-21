import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const bookingSchema = z.object({
  service: z.string(),
  subService: z.string().optional(),
  date: z.string(),
  time: z.string(),
  duration: z.string(),
  pickupLocation: z.string(),
  dropoffLocation: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  requirements: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const data = await request.json()

    // Validate input data
    const validatedData = bookingSchema.parse(data)

    // Convert service string to ServiceType enum
    const serviceTypeMap: { [key: string]: string } = {
      'close-protection': 'CLOSE_PROTECTION',
      'private-hire': 'PRIVATE_HIRE',
      'corporate-security': 'CORPORATE_SECURITY',
      'wedding-security': 'WEDDING_SECURITY',
      'vip-protection': 'VIP_PROTECTION',
      'family-protection': 'FAMILY_PROTECTION',
      'family-office': 'FAMILY_OFFICE',
      'airport-transfer': 'AIRPORT_TRANSFER',
      'chauffeur': 'CHAUFFEUR',
    }

    const serviceType = serviceTypeMap[validatedData.service] || 'PRIVATE_HIRE'

    // Create or find user
    let user
    if (session?.user?.id) {
      user = await prisma.user.findUnique({
        where: { id: session.user.id }
      })
    } else {
      // For non-authenticated users, create a temporary user record
      user = await prisma.user.upsert({
        where: { email: validatedData.email },
        update: {
          name: validatedData.name,
          phone: validatedData.phone,
        },
        create: {
          email: validatedData.email,
          name: validatedData.name,
          phone: validatedData.phone,
        }
      })
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User creation failed' },
        { status: 500 }
      )
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        serviceType: serviceType as any,
        subService: validatedData.subService,
        date: new Date(`${validatedData.date}T${validatedData.time}`),
        time: validatedData.time,
        duration: parseInt(validatedData.duration) || 2,
        pickupLocation: validatedData.pickupLocation,
        dropoffLocation: validatedData.dropoffLocation,
        requirements: validatedData.requirements,
        status: 'PENDING',
        estimatedCost: calculateEstimatedCost(serviceType, parseInt(validatedData.duration) || 2),
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          }
        }
      }
    })

    // Log analytics event
    await prisma.analytics.create({
      data: {
        eventType: 'BOOKING_CREATED',
        eventData: {
          bookingId: booking.id,
          serviceType,
          duration: validatedData.duration,
          location: validatedData.pickupLocation,
        },
        userId: user.id,
        bookingId: booking.id,
      }
    })

    // TODO: Send notification emails (implement later)
    // await sendBookingConfirmationEmail(booking)
    // await sendNewBookingNotification(booking)

    return NextResponse.json({
      success: true,
      message: 'Booking request received successfully',
      booking: {
        id: booking.id,
        estimatedCost: booking.estimatedCost,
        status: booking.status,
      }
    })

  } catch (error) {
    console.error('Booking creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid booking data',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process booking request'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const where = {
      userId: session.user.id,
      ...(status && { status: status.toUpperCase() }),
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          driver: {
            select: {
              name: true,
              phone: true,
              rating: true,
            }
          },
          vehicle: {
            select: {
              make: true,
              model: true,
              year: true,
              licensePlate: true,
            }
          },
          payments: {
            select: {
              status: true,
              amount: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    })

  } catch (error) {
    console.error('Booking retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve bookings' },
      { status: 500 }
    )
  }
}

function calculateEstimatedCost(serviceType: string, duration: number): number {
  const basePrices: { [key: string]: number } = {
    'CLOSE_PROTECTION': 150,
    'PRIVATE_HIRE': 80,
    'CORPORATE_SECURITY': 120,
    'WEDDING_SECURITY': 100,
    'VIP_PROTECTION': 200,
    'FAMILY_PROTECTION': 130,
    'FAMILY_OFFICE': 250,
    'AIRPORT_TRANSFER': 60,
    'CHAUFFEUR': 70,
  }

  const basePrice = basePrices[serviceType] || 80
  return basePrice * duration
}