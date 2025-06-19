import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { z } from 'zod';
import { pricingEngine } from '../../../lib/pricing-engine';
import { BookingDetails, FraudDetection } from '../../../types/payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Request validation schema
const createPaymentIntentSchema = z.object({
  booking: z.object({
    id: z.string(),
    customerId: z.string(),
    pickupLocation: z.string(),
    dropoffLocation: z.string(),
    pickupTime: z.string().transform(str => new Date(str)),
    distance: z.number().positive(),
    duration: z.number().min(0),
    serviceType: z.enum(['standard', 'close-protection', 'vip', 'corporate']),
    vehicleType: z.enum(['sedan', 'suv', 'executive', 'luxury']),
    requiresSIA: z.boolean(),
    passengerCount: z.number().min(1).max(8),
    specialRequests: z.string().optional(),
    isAirportTransfer: z.boolean(),
    airportCode: z.enum(['heathrow', 'gatwick', 'stansted', 'luton', 'cityAirport']).optional(),
  }),
  customerId: z.string(),
  paymentMethodId: z.string().optional(),
  savePaymentMethod: z.boolean().default(false),
  confirmPayment: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPaymentIntentSchema.parse(body);
    
    const { booking, customerId, paymentMethodId, savePaymentMethod, confirmPayment } = validatedData;

    // Validate booking details
    const validation = pricingEngine.validateBooking(booking);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid booking details', details: validation.errors },
        { status: 400 }
      );
    }

    // Calculate price
    const priceBreakdown = pricingEngine.calculatePrice(booking);
    const amountInPence = Math.round(priceBreakdown.total * 100);

    // Fraud detection
    const fraudAnalysis = await performFraudDetection(booking, customerId, amountInPence);
    
    if (fraudAnalysis.recommendation === 'block') {
      return NextResponse.json(
        { error: 'Transaction blocked for security reasons', reason: fraudAnalysis.blockedReason },
        { status: 403 }
      );
    }

    // Get or create Stripe customer
    const customer = await getOrCreateStripeCustomer(customerId);

    // Create payment intent
    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount: amountInPence,
      currency: 'gbp',
      customer: customer.id,
      metadata: {
        bookingId: booking.id,
        customerId: customerId,
        serviceType: booking.serviceType,
        requiresSIA: booking.requiresSIA.toString(),
        fraudScore: fraudAnalysis.riskScore.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Force 3D Secure when required
      },
      statement_descriptor: 'GQ CARS LTD',
      capture_method: 'automatic',
    };

    // Add payment method if provided
    if (paymentMethodId) {
      paymentIntentParams.payment_method = paymentMethodId;
      
      if (confirmPayment) {
        paymentIntentParams.confirm = true;
        paymentIntentParams.return_url = `${process.env.NEXT_PUBLIC_APP_URL}/payment/return`;
      }
    }

    // Save payment method for future use if requested
    if (savePaymentMethod && paymentMethodId) {
      paymentIntentParams.setup_future_usage = 'off_session';
    }

    // Add additional fraud detection for high-risk transactions
    if (fraudAnalysis.riskScore > 60) {
      paymentIntentParams.payment_method_options = {
        card: {
          request_three_d_secure: 'automatic',
        },
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);

    // Log payment attempt for audit
    console.log(`Payment intent created: ${paymentIntent.id} for booking: ${booking.id}`);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      priceBreakdown,
      fraudAnalysis: {
        riskScore: fraudAnalysis.riskScore,
        requiresReview: fraudAnalysis.recommendation === 'review',
      },
    });

  } catch (error) {
    console.error('Payment intent creation failed:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: 'Payment processing error', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function getOrCreateStripeCustomer(customerId: string): Promise<Stripe.Customer> {
  try {
    // Try to find existing customer by searching all customers
    // Note: In production, you'd want to store the Stripe customer ID in your database
    // for better performance and to avoid this search
    const existingCustomers = await stripe.customers.search({
      query: `metadata['customerId']:'${customerId}'`,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Create new customer if not found
    const customer = await stripe.customers.create({
      metadata: { customerId },
      description: `GQ Cars customer ${customerId}`,
    });

    return customer;
  } catch (error) {
    console.error('Customer creation/retrieval failed:', error);
    throw error;
  }
}

async function performFraudDetection(
  booking: BookingDetails,
  customerId: string,
  amount: number
): Promise<FraudDetection> {
  let riskScore = 0;
  const factors: string[] = [];

  // High amount detection
  if (amount > 50000) { // £500+
    riskScore += 25;
    factors.push('High transaction amount');
  }

  // Unusual distance detection
  if (booking.distance > 200) {
    riskScore += 20;
    factors.push('Unusually long distance');
  }

  // Late night booking risk
  const hour = booking.pickupTime.getHours();
  if (hour >= 22 || hour < 6) {
    riskScore += 10;
    factors.push('Late night booking');
  }

  // Airport transfer risk (higher fraud rate)
  if (booking.isAirportTransfer) {
    riskScore += 5;
    factors.push('Airport transfer');
  }

  // VIP service risk
  if (booking.serviceType === 'vip') {
    riskScore += 15;
    factors.push('VIP service');
  }

  // TODO: Add more sophisticated fraud detection
  // - Customer history analysis
  // - IP geolocation checks
  // - Device fingerprinting
  // - Velocity checks

  let recommendation: 'allow' | 'review' | 'block' = 'allow';
  let blockedReason: string | undefined;

  if (riskScore >= 85) {
    recommendation = 'block';
    blockedReason = 'High fraud risk detected';
  } else if (riskScore >= 60) {
    recommendation = 'review';
  }

  return {
    riskScore,
    factors,
    recommendation,
    blockedReason,
  };
}