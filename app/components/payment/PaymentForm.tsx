'use client'

import { useState, useEffect, useCallback } from 'react';
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
  AddressElement,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BookingDetails, PriceBreakdown } from '../../types/payment';
import { STRIPE_APPEARANCE } from '../../lib/stripe-config';
import { CreditCard, Shield, Lock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  booking: BookingDetails;
  priceBreakdown: PriceBreakdown;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  customerId: string;
}

interface PaymentFormInnerProps extends PaymentFormProps {
  clientSecret: string;
}

export default function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Create payment intent when component mounts
  useEffect(() => {
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking: props.booking,
          customerId: props.customerId,
          savePaymentMethod: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setClientSecret(data.clientSecret);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      props.onPaymentError(err instanceof Error ? err.message : 'Payment setup failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-gq-gold" />
        <span className="ml-3 text-lg">Setting up secure payment...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 p-6 rounded-lg">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <div>
            <h3 className="text-lg font-semibold text-red-400">Payment Setup Error</h3>
            <p className="text-red-300 mt-1">{error}</p>
            <button
              onClick={createPaymentIntent}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-600 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: STRIPE_APPEARANCE,
        loader: 'auto',
      }}
    >
      <PaymentFormInner {...props} clientSecret={clientSecret} />
    </Elements>
  );
}

function PaymentFormInner({ 
  booking, 
  priceBreakdown, 
  onPaymentSuccess, 
  onPaymentError, 
  customerId,
  clientSecret 
}: PaymentFormInnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [savePaymentMethod, setSavePaymentMethod] = useState(true);
  const [billingAddress, setBillingAddress] = useState<any>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setPaymentError('Payment system not ready. Please wait...');
      return;
    }

    setIsProcessing(true);
    setPaymentError('');

    try {
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/return`,
          save_payment_method: savePaymentMethod,
        },
        redirect: 'if_required',
      });

      if (error) {
        // Payment failed
        setPaymentError(error.message || 'Payment failed');
        onPaymentError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded
        setPaymentSuccess(true);
        onPaymentSuccess(paymentIntent.id);
      } else if (paymentIntent && paymentIntent.status === 'requires_action') {
        // 3D Secure or other action required
        setPaymentError('Additional authentication required. Please complete the security check.');
      } else {
        setPaymentError('Payment processing incomplete. Please try again.');
      }

    } catch (err) {
      setPaymentError('An unexpected error occurred during payment processing');
      onPaymentError('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="bg-green-900/20 border border-green-500 p-8 rounded-lg text-center">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-400 mb-2">Payment Successful!</h3>
        <p className="text-green-300 mb-4">
          Your booking has been confirmed and you'll receive a confirmation email shortly.
        </p>
        <div className="text-sm text-gray-300">
          <p>Booking ID: {booking.id}</p>
          <p>Amount: £{priceBreakdown.total.toFixed(2)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-gq-gold" />
          <h3 className="text-xl font-bold">Secure Payment</h3>
          <Lock className="w-4 h-4 text-green-400" />
        </div>
        
        {/* Price breakdown */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-3">Payment Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base fare ({booking.distance} miles)</span>
              <span>£{priceBreakdown.baseFare.toFixed(2)}</span>
            </div>
            {priceBreakdown.securityPremium > 0 && (
              <div className="flex justify-between">
                <span>SIA Security Premium (25%)</span>
                <span>£{priceBreakdown.securityPremium.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.airportSurcharge > 0 && (
              <div className="flex justify-between">
                <span>Airport surcharge</span>
                <span>£{priceBreakdown.airportSurcharge.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.surgePricing > 0 && (
              <div className="flex justify-between">
                <span>Surge pricing ({priceBreakdown.surgeMultiplier}x)</span>
                <span>£{priceBreakdown.surgePricing.toFixed(2)}</span>
              </div>
            )}
            {priceBreakdown.waitingTime > 0 && (
              <div className="flex justify-between">
                <span>Waiting time</span>
                <span>£{priceBreakdown.waitingTime.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-600 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>£{priceBreakdown.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20%)</span>
                <span>£{priceBreakdown.vat.toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-gray-600 pt-2 font-bold text-lg">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-gq-gold">£{priceBreakdown.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Element */}
        <div>
          <label className="block text-sm font-medium mb-2">
            <CreditCard className="w-4 h-4 inline mr-2" />
            Payment Method
          </label>
          <PaymentElement
            options={{
              layout: 'tabs',
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              },
            }}
          />
        </div>

        {/* Billing Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Billing Address</label>
          <AddressElement
            options={{
              mode: 'billing',
              allowedCountries: ['GB'],
              fields: {
                phone: 'always',
              },
            }}
            onChange={(event) => {
              if (event.complete) {
                setBillingAddress(event.value);
              }
            }}
          />
        </div>

        {/* Save payment method option */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="save-payment-method"
            checked={savePaymentMethod}
            onChange={(e) => setSavePaymentMethod(e.target.checked)}
            className="w-4 h-4 text-gq-gold bg-gray-800 border-gray-600 rounded focus:ring-gq-gold focus:ring-2"
          />
          <label htmlFor="save-payment-method" className="ml-2 text-sm">
            Save payment method for future bookings
          </label>
        </div>

        {/* Error display */}
        {paymentError && (
          <div className="bg-red-900/20 border border-red-500 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{paymentError}</p>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!stripe || !elements || isProcessing}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
            isProcessing
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-gq-gold hover:bg-yellow-500 text-black'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Processing Payment...
            </div>
          ) : (
            <>
              Pay £{priceBreakdown.total.toFixed(2)}
              <Lock className="w-4 h-4 inline ml-2" />
            </>
          )}
        </button>

        {/* Security badges */}
        <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-4">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>256-bit SSL</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>PCI DSS Compliant</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>3D Secure</span>
          </div>
        </div>
      </form>
    </div>
  );
}