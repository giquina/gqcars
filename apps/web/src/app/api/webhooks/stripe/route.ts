import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
        
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  
  // Update booking status in database
  // Send confirmation email
  // Update internal records
  
  const bookingId = paymentIntent.metadata.bookingId;
  if (bookingId) {
    try {
      // Update booking status to 'confirmed'
      // This would update your database
      console.log(`Booking ${bookingId} payment confirmed`);
      
      // Send booking confirmation email
      const customerEmail = paymentIntent.metadata.customerEmail;
      if (customerEmail) {
        await fetch('/api/emails/booking-confirmation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId,
            customerEmail,
            customerName: paymentIntent.metadata.customerName,
            service: paymentIntent.metadata.service,
            amount: paymentIntent.amount / 100, // Convert from cents
          }),
        });
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  
  const bookingId = paymentIntent.metadata.bookingId;
  if (bookingId) {
    // Update booking status to 'payment_failed'
    // Send payment failure notification
    // Optionally, hold the booking for a grace period
    console.log(`Booking ${bookingId} payment failed`);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  console.log('Checkout session completed:', session.id);
  
  // Handle successful checkout
  const bookingId = session.metadata?.bookingId;
  if (bookingId) {
    // Mark booking as confirmed
    // Send confirmation emails
    console.log(`Checkout completed for booking ${bookingId}`);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  // Handle subscription or recurring payment success
  if (invoice.subscription) {
    console.log(`Subscription payment successful: ${invoice.subscription}`);
  }
}

// Utility function to verify webhook authenticity
async function verifyWebhook(
  body: string,
  signature: string,
  secret: string
): Promise<Stripe.Event | null> {
  try {
    return stripe.webhooks.constructEvent(body, signature, secret);
  } catch (error) {
    console.error('Webhook verification failed:', error);
    return null;
  }
}