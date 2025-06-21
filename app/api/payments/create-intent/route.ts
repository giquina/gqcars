import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, amount, currency = 'gbp' } = await request.json()

    // Validate the booking belongs to the user
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        userId: session.user.id,
      },
      include: {
        user: true,
      }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to pence
      currency,
      customer: booking.user.email || undefined,
      metadata: {
        bookingId,
        userId: session.user.id,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Store payment record in database
    const payment = await prisma.payment.create({
      data: {
        userId: session.user.id,
        bookingId,
        amount,
        currency: currency.toUpperCase(),
        method: 'CARD',
        status: 'PENDING',
        stripePaymentId: paymentIntent.id,
        stripeClientSecret: paymentIntent.client_secret,
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    })

  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
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
    const paymentIntentId = searchParams.get('payment_intent')

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'Payment intent ID required' }, { status: 400 })
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Update payment status in database
    await prisma.payment.updateMany({
      where: {
        stripePaymentId: paymentIntentId,
        userId: session.user.id,
      },
      data: {
        status: paymentIntent.status === 'succeeded' ? 'COMPLETED' : 'FAILED',
      }
    })

    if (paymentIntent.status === 'succeeded') {
      // Update booking status if payment successful
      const bookingId = paymentIntent.metadata.bookingId
      if (bookingId) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'CONFIRMED' }
        })
      }
    }

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
    })

  } catch (error) {
    console.error('Payment intent retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve payment intent' },
      { status: 500 }
    )
  }
}