export interface PricingModel {
  baseFare: number; // £ per mile
  minimumFare: number; // £ minimum charge
  waitingTime: number; // £ per minute
  securityPremium: number; // 25% extra for SIA drivers
  airportSurcharge: {
    heathrow: number;
    gatwick: number;
    stansted: number;
    luton: number;
    cityAirport: number;
  };
  surgePricing: {
    peak: number;    // 6-9am, 5-8pm
    night: number;   // 10pm-6am
    weekend: number; // Friday 6pm - Sunday 6pm
  };
}

export interface BookingDetails {
  id: string;
  customerId: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupTime: Date;
  distance: number; // miles
  duration: number; // minutes
  serviceType: 'standard' | 'close-protection' | 'vip' | 'corporate';
  vehicleType: 'sedan' | 'suv' | 'executive' | 'luxury';
  requiresSIA: boolean;
  passengerCount: number;
  specialRequests?: string;
  isAirportTransfer: boolean;
  airportCode?: keyof PricingModel['airportSurcharge'];
}

export interface PriceBreakdown {
  baseFare: number;
  securityPremium: number;
  airportSurcharge: number;
  surgePricing: number;
  waitingTime: number;
  subtotal: number;
  vat: number;
  total: number;
  surgeMultiplier: number;
}

export interface PaymentMethod {
  id: string;
  customerId: string;
  type: 'card' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  stripePaymentMethodId: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  currency: 'GBP';
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled' | 'refunded';
  paymentMethodId: string;
  stripePaymentIntentId: string;
  failureReason?: string;
  refundAmount?: number;
  refundReason?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  bookingId: string;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  currency: 'GBP';
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'void';
  dueDate: Date;
  paidAt?: Date;
  issuedAt: Date;
  items: InvoiceItem[];
  billingAddress: Address;
  companyDetails?: CompanyDetails;
  notes?: string;
  pdfUrl?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  amount: number;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CompanyDetails {
  name: string;
  registrationNumber?: string;
  vatNumber?: string;
  address: Address;
}

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  stripeCustomerId: string;
  companyDetails?: CompanyDetails;
  billingAddress: Address;
  paymentMethods: PaymentMethod[];
  preferences: {
    defaultPaymentMethodId?: string;
    emailReceipts: boolean;
    smsNotifications: boolean;
  };
  corporateAccount?: {
    creditLimit: number;
    paymentTerms: number; // days
    discountRate: number; // percentage
    billingCycle: 'weekly' | 'monthly' | 'quarterly';
  };
}

export interface PaymentRetry {
  id: string;
  paymentId: string;
  attemptNumber: number;
  scheduledAt: Date;
  attemptedAt?: Date;
  status: 'pending' | 'attempted' | 'succeeded' | 'failed' | 'canceled';
  failureReason?: string;
}

export interface RefundRequest {
  id: string;
  paymentId: string;
  bookingId: string;
  amount: number;
  reason: 'customer_request' | 'service_issue' | 'driver_cancel' | 'duplicate_charge' | 'fraudulent';
  status: 'pending' | 'approved' | 'processed' | 'rejected';
  requestedBy: string;
  requestedAt: Date;
  processedAt?: Date;
  stripeRefundId?: string;
  notes?: string;
}

export interface FraudDetection {
  riskScore: number;
  factors: string[];
  recommendation: 'allow' | 'review' | 'block';
  blockedReason?: string;
}

export interface PaymentConfig {
  stripePublishableKey: string;
  stripeSecretKey: string;
  stripeWebhookSecret: string;
  vatRate: number;
  companyDetails: CompanyDetails;
  fraudThresholds: {
    lowRisk: number;
    mediumRisk: number;
    highRisk: number;
  };
}