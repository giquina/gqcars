# GQ Cars LTD - Payment & Billing System

A comprehensive, secure payment and billing system for GQ Cars LTD's premium SIA-licensed driver services. This system handles complex pricing calculations, secure payment processing, VAT-compliant invoicing, and corporate billing cycles.

## 🚀 Features

### Payment Processing
- **Stripe Integration**: Full Stripe Connect implementation with multi-party payments
- **Multiple Payment Methods**: Card payments, Apple Pay, Google Pay
- **3D Secure Support**: Automatic 3D Secure authentication for enhanced security
- **PCI DSS Compliance**: Never store raw card data, end-to-end encryption
- **Real-time Fraud Detection**: ML-based fraud scoring and risk assessment

### Pricing Engine
- **Dynamic Pricing**: £3.50/mile base rate for SIA-licensed drivers
- **Security Premium**: 25% surcharge for Close Protection services
- **Airport Surcharges**: £10-20 per major UK airport
- **Surge Pricing**: Peak time multipliers (1.2x-1.5x)
- **Corporate Discounts**: Configurable discount structures

### Billing & Invoicing
- **VAT Compliance**: UK VAT calculations and compliant invoicing
- **PDF Generation**: Professional invoice and receipt generation
- **Corporate Billing**: Monthly consolidated invoicing for corporate accounts
- **Automated Billing**: Post-trip payment capture with retry logic
- **Split Billing**: Support for corporate expense management

### Advanced Features
- **Payment Retry Logic**: 3 attempts over 7 days for failed payments
- **Refund Processing**: Automated refund handling with admin approval
- **Chargeback Management**: Dispute tracking and resolution workflow
- **Financial Reporting**: Comprehensive analytics and tax summaries
- **Multi-currency Support**: Ready for international expansion

## 🏗️ Architecture

### Core Components

```
app/
├── types/payment.ts              # TypeScript interfaces
├── lib/
│   ├── pricing-engine.ts         # Dynamic pricing calculations
│   ├── stripe-config.ts          # Stripe configuration
│   └── invoice-generator.ts      # PDF invoice generation
├── components/
│   ├── payment/
│   │   └── PaymentForm.tsx       # Stripe Elements integration
│   ├── booking/
│   │   └── EnhancedQuoteCalculator.tsx  # Real-time pricing
│   └── admin/
│       └── PaymentDashboard.tsx  # Admin interface
└── api/
    └── payments/
        ├── create-intent/        # Payment Intent creation
        └── webhook/              # Stripe webhook handler
```

### Payment Flow

1. **Quote Generation**: Real-time pricing with surge detection
2. **Payment Intent**: Secure payment intent creation with fraud screening
3. **Payment Processing**: Stripe Elements with 3D Secure support
4. **Webhook Processing**: Automated status updates and notifications
5. **Invoice Generation**: VAT-compliant PDF invoices
6. **Retry Logic**: Automatic retry for failed payments

## 🔧 Setup Instructions

### 1. Prerequisites

- Node.js 18+ and npm
- Stripe account (test and live keys)
- Database (PostgreSQL recommended)
- AWS S3 bucket (for invoice storage)

### 2. Installation

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Configure your environment variables
# See .env.example for all required variables
```

### 3. Stripe Configuration

#### Test Environment Setup

1. **Get Stripe Keys**:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

2. **Configure Webhook**:
   - Create webhook endpoint: `https://your-domain.com/api/payments/webhook`
   - Add events: `payment_intent.succeeded`, `payment_intent.payment_failed`, etc.
   - Get webhook secret: `STRIPE_WEBHOOK_SECRET=whsec_...`

3. **Enable Payment Methods**:
   - Cards (required)
   - Apple Pay (recommended)
   - Google Pay (recommended)

#### Production Setup

1. **Complete Stripe Onboarding**
2. **Switch to Live Keys**
3. **Configure Production Webhook**
4. **Enable Additional Security Features**

### 4. Database Setup

```sql
-- Example schema for payment tracking
CREATE TABLE payments (
    id UUID PRIMARY KEY,
    booking_id VARCHAR(255) NOT NULL,
    customer_id VARCHAR(255) NOT NULL,
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    amount INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'GBP',
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE invoices (
    id UUID PRIMARY KEY,
    invoice_number VARCHAR(255) UNIQUE,
    customer_id VARCHAR(255) NOT NULL,
    amount INTEGER NOT NULL,
    vat_amount INTEGER NOT NULL,
    total_amount INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL,
    pdf_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Environment Configuration

Key environment variables:

```bash
# Required for payment processing
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Company details for invoices
COMPANY_NAME="GQ Cars LTD"
COMPANY_VAT_NUMBER="GB123456789"

# File storage for invoices
AWS_S3_BUCKET=gqcars-documents
```

## 💳 Usage Examples

### Basic Payment Flow

```typescript
import { PaymentForm } from '@/components/payment/PaymentForm';
import { EnhancedQuoteCalculator } from '@/components/booking/EnhancedQuoteCalculator';

// 1. Generate quote
const quote = await pricingEngine.calculatePrice(bookingDetails);

// 2. Create payment intent
const response = await fetch('/api/payments/create-intent', {
  method: 'POST',
  body: JSON.stringify({
    booking: bookingDetails,
    customerId: 'cus_123',
    savePaymentMethod: true
  })
});

// 3. Process payment with Stripe Elements
<PaymentForm
  booking={bookingDetails}
  priceBreakdown={quote}
  onPaymentSuccess={(paymentIntentId) => {
    // Handle successful payment
  }}
  customerId="cus_123"
/>
```

### Pricing Calculations

```typescript
import { pricingEngine } from '@/lib/pricing-engine';

// Calculate price for a booking
const booking: BookingDetails = {
  distance: 25,
  serviceType: 'close-protection',
  requiresSIA: true,
  isAirportTransfer: true,
  airportCode: 'heathrow',
  pickupTime: new Date('2024-01-15T18:30:00Z')
};

const breakdown = pricingEngine.calculatePrice(booking);
// Returns detailed price breakdown with surge pricing

// Get price estimate range
const estimate = pricingEngine.estimatePrice(25, 'vip', true, true, 'heathrow');
// Returns: { min: 89.50, max: 134.25, estimated: 112.80 }
```

### Invoice Generation

```typescript
import { InvoiceGenerator } from '@/lib/invoice-generator';

// Generate individual invoice
const invoice = await InvoiceGenerator.generateInvoice(
  customer,
  [booking],
  [priceBreakdown]
);

// Generate monthly corporate invoice
const monthlyInvoice = await InvoiceGenerator.generateMonthlyInvoice(
  corporateCustomer,
  monthlyBookings,
  priceBreakdowns
);

// Generate expense receipt
const receiptPDF = await InvoiceGenerator.generateReceipt(
  customer,
  booking,
  priceBreakdown
);
```

## 🔐 Security Features

### PCI DSS Compliance
- No raw card data storage
- Stripe-managed tokenization
- Secure payment processing
- End-to-end encryption

### Fraud Detection
```typescript
// Automatic fraud scoring
const fraudAnalysis = await performFraudDetection(booking, customerId, amount);

if (fraudAnalysis.recommendation === 'block') {
  // Transaction blocked
} else if (fraudAnalysis.recommendation === 'review') {
  // Requires manual review
}
```

### Security Headers
- CSP (Content Security Policy)
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options
- X-Content-Type-Options

## 📊 Admin Dashboard

Access the payment dashboard at `/admin/payments` (requires authentication):

### Features
- **Real-time Metrics**: Revenue, transaction counts, success rates
- **Transaction Management**: View, search, and filter payments
- **Refund Processing**: Approve/reject refund requests
- **Analytics**: Financial reporting and trends
- **Export**: CSV/Excel exports for accounting

### API Endpoints

```typescript
// Payment management
GET /api/payments                 # List payments
POST /api/payments/create-intent  # Create payment intent
POST /api/payments/webhook        # Stripe webhook
POST /api/payments/refund         # Process refund

// Invoice management
GET /api/invoices                 # List invoices
POST /api/invoices/generate       # Generate invoice
GET /api/invoices/:id/pdf         # Download PDF

// Analytics
GET /api/analytics/revenue        # Revenue analytics
GET /api/analytics/transactions   # Transaction analytics
```

## 🧪 Testing

### Test Cards
```
Successful payment: 4242 4242 4242 4242
Declined payment:   4000 0000 0000 0002
3D Secure required: 4000 0027 6000 3184
```

### Test Webhooks
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/payments/webhook

# Test webhook events
stripe trigger payment_intent.succeeded
```

### Unit Tests
```bash
# Run payment system tests
npm test app/lib/pricing-engine.test.ts
npm test app/components/payment/PaymentForm.test.tsx
```

## 📈 Performance Metrics

### Success Criteria
- ✅ 99.5%+ payment success rate
- ✅ <3 second payment processing
- ✅ Zero payment security incidents
- ✅ 100% PCI DSS compliance
- ✅ Real-time fraud detection

### Monitoring
- Payment success rates
- Transaction processing times
- Fraud detection accuracy
- API response times
- Error rates and logging

## 🚀 Deployment

### Production Checklist
- [ ] Stripe live keys configured
- [ ] Webhook endpoints secured
- [ ] SSL certificates installed
- [ ] Database backed up
- [ ] Monitoring configured
- [ ] Error tracking enabled
- [ ] Load testing completed

### Environment Setup
```bash
# Production build
npm run build

# Start production server
npm start

# Health check endpoint
curl https://your-domain.com/api/health
```

## 🔄 Maintenance

### Regular Tasks
- Monitor payment success rates
- Review fraud detection logs
- Process refund requests
- Generate monthly reports
- Update payment method configurations

### Troubleshooting
- Check Stripe dashboard for payment issues
- Review webhook delivery logs
- Monitor application logs for errors
- Verify SSL certificate status

## 📞 Support

For technical support:
- Email: tech-support@gqcars.co.uk
- Slack: #payments-support
- Documentation: https://docs.gqcars.co.uk/payments

For payment issues:
- Stripe Dashboard: https://dashboard.stripe.com
- Payment Support: payments@gqcars.co.uk
- Emergency: +44 20 7123 4567

---

**Built with ❤️ for GQ Cars LTD - Professional SIA-Licensed Driver Services**