import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
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

    if (booking.status === "completed") {
      return NextResponse.json(
        { error: "Booking already paid" },
        { status: 400 }
      )
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round((booking.totalCost || 50) * 100), // Convert to pence
      currency: "gbp",
      metadata: {
        bookingId: booking.id,
        userId: session.user.id
      },
      description: `GQ Cars ${booking.serviceType} - ${booking.id}`
    })

    // Update booking with payment processing status
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "processing"
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: booking.totalCost || 50
    })

  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    )
  }
}
