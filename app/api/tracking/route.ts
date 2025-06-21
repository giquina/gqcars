import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Get tracking information for a booking
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const bookingId = searchParams.get('bookingId')

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId: session.user.id
      },
      include: {
        driver: {
          select: {
            id: true,
            name: true,
            phone: true,
            currentLocation: true,
            rating: true,
            profilePicture: true
          }
        },
        vehicle: {
          select: {
            make: true,
            model: true,
            year: true,
            color: true,
            licensePlate: true,
            currentLocation: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Generate mock tracking data for demo
    const trackingData = {
      status: booking.status,
      currentLocation: booking.driver?.currentLocation || booking.vehicle?.currentLocation || {
        lat: 51.5074,
        lng: -0.1278,
        address: "Central London"
      },
      estimatedArrival: calculateETA(booking),
      route: generateMockRoute(booking),
      updates: generateTrackingUpdates(booking)
    }

    return NextResponse.json({
      booking: {
        id: booking.id,
        serviceType: booking.serviceType,
        pickupLocation: booking.pickupLocation,
        dropoffLocation: booking.dropoffLocation,
        date: booking.date,
        time: booking.time,
        status: booking.status
      },
      driver: booking.driver,
      vehicle: booking.vehicle,
      tracking: trackingData
    })

  } catch (error) {
    console.error('Tracking retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve tracking information' },
      { status: 500 }
    )
  }
}

// Update tracking information (for drivers/admin)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, location, status, message } = await request.json()

    // Update booking tracking data
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        trackingData: {
          lastUpdate: new Date(),
          location,
          status,
          message
        },
        ...(status && { status })
      }
    })

    // If there's a driver assigned, update their location too
    if (updatedBooking.driverId && location) {
      await prisma.driver.update({
        where: { id: updatedBooking.driverId },
        data: { currentLocation: location }
      })
    }

    // Log the tracking update
    await prisma.analytics.create({
      data: {
        eventType: 'TRACKING_UPDATE',
        eventData: {
          bookingId,
          location,
          status,
          message
        },
        bookingId
      }
    })

    // In a real app, you would send push notifications or WebSocket updates here
    // await sendRealtimeUpdate(bookingId, { location, status, message })

    return NextResponse.json({
      success: true,
      message: 'Tracking updated successfully'
    })

  } catch (error) {
    console.error('Tracking update error:', error)
    return NextResponse.json(
      { error: 'Failed to update tracking' },
      { status: 500 }
    )
  }
}

// Send message between customer and driver
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, message, recipientType } = await request.json()

    // Store the message
    await prisma.analytics.create({
      data: {
        eventType: 'COMMUNICATION_MESSAGE',
        eventData: {
          bookingId,
          message,
          recipientType,
          senderId: session.user.id,
          timestamp: new Date()
        },
        userId: session.user.id,
        bookingId
      }
    })

    // In a real app, send the message via SMS, push notification, or in-app messaging
    // await sendMessage(bookingId, message, recipientType)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully'
    })

  } catch (error) {
    console.error('Communication error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}

function calculateETA(booking: any): string {
  const now = new Date()
  const bookingTime = new Date(booking.date)
  
  if (booking.status === 'CONFIRMED') {
    return bookingTime.toLocaleTimeString()
  } else if (booking.status === 'IN_PROGRESS') {
    // Mock ETA calculation
    const eta = new Date(now.getTime() + 15 * 60000) // 15 minutes from now
    return eta.toLocaleTimeString()
  }
  
  return 'N/A'
}

function generateMockRoute(booking: any) {
  // Mock route data - in real app, use Google Maps or similar
  return [
    { lat: 51.5074, lng: -0.1278, name: 'Starting Point' },
    { lat: 51.5145, lng: -0.1270, name: 'Via Oxford Street' },
    { lat: 51.5200, lng: -0.1250, name: booking.dropoffLocation || 'Destination' }
  ]
}

function generateTrackingUpdates(booking: any) {
  const now = new Date()
  return [
    {
      timestamp: new Date(now.getTime() - 30 * 60000),
      message: 'Driver assigned and en route to pickup location',
      status: 'CONFIRMED'
    },
    {
      timestamp: new Date(now.getTime() - 15 * 60000),
      message: 'Driver arrived at pickup location',
      status: 'IN_PROGRESS'
    },
    {
      timestamp: now,
      message: 'Journey in progress',
      status: 'IN_PROGRESS'
    }
  ]
}