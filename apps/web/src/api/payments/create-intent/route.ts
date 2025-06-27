import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const { bookingId } = await request.json()

    // Get booking details
    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
        userId: session.user.id
      },
      include: {
        user: true
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      )
    }

    if (booking.paymentStatus === "COMPLETED") {
      return NextResponse.json(
        { error: "Booking already paid" },
        { status: 400 }
      )
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.estimatedPrice * 100), // Convert to pence
      currency: "gbp",
      metadata: {
        bookingId: booking.id,
        bookingReference: booking.bookingReference,
        userId: session.user.id
      },
      description: `GQ Cars ${booking.serviceType} - ${booking.bookingReference}`
    })

    // Update booking with payment intent
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        paymentId: paymentIntent.id,
        paymentStatus: "PROCESSING"
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: booking.estimatedPrice
    })

  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    )
  }
}
