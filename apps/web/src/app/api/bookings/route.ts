import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()

    const booking = await prisma.booking.create({
      data: {
        service: body.service || 'private-hire',
        userId: session.user.id,
        serviceType: body.serviceType || 'STANDARD',
        pickupLocation: body.pickupLocation || body.pickupAddress || '',
        destination: body.destination || body.destinationAddress || '',
        date: new Date(body.date || Date.now()),
        time: body.time || '12:00',
        securityLevel: body.securityLevel || 'MEDIUM',
        totalCost: body.totalCost || 0,
        notes: body.notes,
        status: 'pending'
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
        orderBy: { createdAt: 'desc' },
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