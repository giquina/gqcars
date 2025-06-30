import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { generateBookingReference } from '@/lib/utils'
import { bookingSchema } from '@/lib/validations/booking'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = bookingSchema.parse(json)

    const booking = await prisma.booking.create({
      data: {
        bookingReference: generateBookingReference(),
        userId: session.user.id,
        serviceType: body.serviceType,
        vehicleType: body.vehicleType,
        pickupAddress: body.pickupAddress,
        pickupLat: body.pickupLat,
        pickupLng: body.pickupLng,
        destinationAddress: body.destinationAddress,
        destinationLat: body.destinationLat,
        destinationLng: body.destinationLng,
        scheduledDateTime: body.scheduledDateTime,
        estimatedPrice: body.estimatedPrice,
        specialRequirements: body.specialRequirements,
        securityLevel: body.securityLevel,
      },
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Booking creation error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const where = {
      userId: session.user.id,
      ...(status && { status }),
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { scheduledDateTime: 'desc' },
        take: limit,
        skip,
      }),
      prisma.booking.count({ where }),
    ])

    return NextResponse.json({
      bookings,
      pageCount: Math.ceil(total / limit),
      total,
    })
  } catch (error) {
    console.error('Bookings fetch error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}