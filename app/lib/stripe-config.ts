import { loadStripe, Stripe } from '@stripe/stripe-js';

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  secretKey: process.env.STRIPE_SECRET_KEY || '',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  connectClientId: process.env.STRIPE_CONNECT_CLIENT_ID || '',
  vatRate: 0.20, // 20% UK VAT
  currency: 'gbp' as const,
  companyDetails: {
    name: 'GQ Cars LTD',
    registrationNumber: 'GQ123456789',
    vatNumber: 'GB123456789',
    address: {
      line1: '123 Security Street',
      line2: 'Business District',
      city: 'London',
      postcode: 'SW1A 1AA',
      country: 'United Kingdom'
    }
  }
};

// Stripe instance singleton
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);
  }
  return stripePromise;
};

// Payment method types supported
export const SUPPORTED_PAYMENT_METHODS = [
  'card',
  'apple_pay',
  'google_pay'
] as const;

// Stripe webhook event types we handle
export const WEBHOOK_EVENTS = {
  PAYMENT_INTENT_SUCCEEDED: 'payment_intent.succeeded',
  PAYMENT_INTENT_PAYMENT_FAILED: 'payment_intent.payment_failed',
  PAYMENT_INTENT_REQUIRES_ACTION: 'payment_intent.requires_action',
  PAYMENT_METHOD_ATTACHED: 'payment_method.attached',
  CUSTOMER_CREATED: 'customer.created',
  INVOICE_PAYMENT_SUCCEEDED: 'invoice.payment_succeeded',
  INVOICE_PAYMENT_FAILED: 'invoice.payment_failed',
  CHARGE_DISPUTE_CREATED: 'charge.dispute.created',
  CHARGE_DISPUTE_UPDATED: 'charge.dispute.updated'
} as const;

// Fraud detection thresholds
export const FRAUD_THRESHOLDS = {
  lowRisk: 30,
  mediumRisk: 60,
  highRisk: 85
};

// Payment retry configuration
export const RETRY_CONFIG = {
  maxAttempts: 3,
  retryIntervals: [1, 3, 7], // days
  backoffMultiplier: 2
};

// Stripe appearance customization
export const STRIPE_APPEARANCE = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#D4AF37', // GQ Gold
    colorBackground: '#1a1a1a',
    colorText: '#ffffff',
    colorDanger: '#df1b41',
    fontFamily: 'Ideal Sans, system-ui, sans-serif',
    spacingUnit: '2px',
    borderRadius: '4px'
  },
  rules: {
    '.Tab': {
      border: '1px solid #374151',
      backgroundColor: '#1f2937'
    },
    '.Tab:hover': {
      color: '#D4AF37'
    },
    '.Tab--selected': {
      borderColor: '#D4AF37',
      backgroundColor: '#374151'
    }
  }
};