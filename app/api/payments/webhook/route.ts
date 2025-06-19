import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = headers();
    const signature = headersList.get('stripe-signature')!;

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.requires_action':
        await handlePaymentRequiresAction(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_method.attached':
        await handlePaymentMethodAttached(event.data.object as Stripe.PaymentMethod);
        break;

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'charge.dispute.created':
        await handleChargeDispute(event.data.object as Stripe.Dispute);
        break;

      case 'customer.created':
        await handleCustomerCreated(event.data.object as Stripe.Customer);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const bookingId = paymentIntent.metadata.bookingId;
    const customerId = paymentIntent.metadata.customerId;

    console.log(`Payment succeeded for booking ${bookingId}: ${paymentIntent.id}`);

    // TODO: Update booking status in database
    // await updateBookingStatus(bookingId, 'confirmed');
    
    // TODO: Send confirmation email to customer
    // await sendBookingConfirmation(customerId, bookingId);
    
    // TODO: Notify driver/dispatch system
    // await notifyDispatch(bookingId);

    // Log successful payment for audit
    await logPaymentEvent('payment_succeeded', {
      paymentIntentId: paymentIntent.id,
      bookingId,
      customerId,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });

  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const bookingId = paymentIntent.metadata.bookingId;
    const customerId = paymentIntent.metadata.customerId;
    const failureReason = paymentIntent.last_payment_error?.message || 'Unknown error';

    console.log(`Payment failed for booking ${bookingId}: ${failureReason}`);

    // TODO: Update booking status
    // await updateBookingStatus(bookingId, 'payment_failed');
    
    // TODO: Schedule payment retry if appropriate
    // await schedulePaymentRetry(paymentIntent.id, 1);
    
    // TODO: Send payment failure notification
    // await sendPaymentFailureNotification(customerId, bookingId, failureReason);

    // Log failed payment for audit
    await logPaymentEvent('payment_failed', {
      paymentIntentId: paymentIntent.id,
      bookingId,
      customerId,
      amount: paymentIntent.amount,
      failureReason,
    });

  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
}

async function handlePaymentRequiresAction(paymentIntent: Stripe.PaymentIntent) {
  try {
    const bookingId = paymentIntent.metadata.bookingId;
    const customerId = paymentIntent.metadata.customerId;

    console.log(`Payment requires action for booking ${bookingId}: ${paymentIntent.id}`);

    // TODO: Send 3D Secure notification to customer
    // await send3DSecureNotification(customerId, paymentIntent.client_secret);

    // Log action required event
    await logPaymentEvent('payment_requires_action', {
      paymentIntentId: paymentIntent.id,
      bookingId,
      customerId,
      amount: paymentIntent.amount,
    });

  } catch (error) {
    console.error('Error handling payment action required:', error);
    throw error;
  }
}

async function handlePaymentMethodAttached(paymentMethod: Stripe.PaymentMethod) {
  try {
    const customerId = paymentMethod.customer as string;

    console.log(`Payment method attached for customer ${customerId}: ${paymentMethod.id}`);

    // TODO: Store payment method in database
    // await storePaymentMethod(customerId, paymentMethod);

    // Log payment method attachment
    await logPaymentEvent('payment_method_attached', {
      paymentMethodId: paymentMethod.id,
      customerId,
      type: paymentMethod.type,
    });

  } catch (error) {
    console.error('Error handling payment method attachment:', error);
    throw error;
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string;

    console.log(`Invoice payment succeeded: ${invoice.id}`);

    // TODO: Update invoice status in database
    // await updateInvoiceStatus(invoice.id, 'paid');
    
    // TODO: Send receipt to customer
    // await sendInvoiceReceipt(customerId, invoice.id);

    // Log invoice payment success
    await logPaymentEvent('invoice_payment_succeeded', {
      invoiceId: invoice.id,
      customerId,
      amount: invoice.amount_paid,
    });

  } catch (error) {
    console.error('Error handling invoice payment success:', error);
    throw error;
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  try {
    const customerId = invoice.customer as string;

    console.log(`Invoice payment failed: ${invoice.id}`);

    // TODO: Handle failed invoice payment
    // await handleFailedInvoicePayment(invoice.id);
    
    // TODO: Send payment failure notification
    // await sendInvoicePaymentFailureNotification(customerId, invoice.id);

    // Log invoice payment failure
    await logPaymentEvent('invoice_payment_failed', {
      invoiceId: invoice.id,
      customerId,
      amount: invoice.amount_due,
    });

  } catch (error) {
    console.error('Error handling invoice payment failure:', error);
    throw error;
  }
}

async function handleChargeDispute(dispute: Stripe.Dispute) {
  try {
    const chargeId = dispute.charge;

    console.log(`Charge dispute created: ${dispute.id} for charge: ${chargeId}`);

    // TODO: Handle chargeback dispute
    // await handleChargebackDispute(dispute.id, chargeId);
    
    // TODO: Notify admin team
    // await notifyAdminOfDispute(dispute);

    // Log dispute creation
    await logPaymentEvent('charge_dispute_created', {
      disputeId: dispute.id,
      chargeId,
      amount: dispute.amount,
      reason: dispute.reason,
      status: dispute.status,
    });

  } catch (error) {
    console.error('Error handling charge dispute:', error);
    throw error;
  }
}

async function handleCustomerCreated(customer: Stripe.Customer) {
  try {
    console.log(`Customer created: ${customer.id}`);

    // TODO: Sync customer data with internal database
    // await syncCustomerData(customer);

    // Log customer creation
    await logPaymentEvent('customer_created', {
      stripeCustomerId: customer.id,
      email: customer.email,
    });

  } catch (error) {
    console.error('Error handling customer creation:', error);
    throw error;
  }
}

async function logPaymentEvent(eventType: string, data: any) {
  try {
    // TODO: Implement proper audit logging
    // This should write to a secure audit log for compliance
    console.log(`[AUDIT] ${eventType}:`, JSON.stringify(data, null, 2));
    
    // In production, you would:
    // 1. Store in a secure audit database
    // 2. Include timestamp, user context, IP address
    // 3. Encrypt sensitive data
    // 4. Implement log rotation and retention policies
    
  } catch (error) {
    console.error('Error logging payment event:', error);
    // Don't throw here to avoid breaking webhook processing
  }
}