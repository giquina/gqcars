import { PricingModel, BookingDetails, PriceBreakdown, Customer } from '../types/payment';

// Default pricing configuration
export const DEFAULT_PRICING: PricingModel = {
  baseFare: 3.50, // £ per mile for SIA drivers
  minimumFare: 8.00, // £ minimum charge
  waitingTime: 0.50, // £ per minute
  securityPremium: 0.25, // 25% extra for SIA drivers
  airportSurcharge: {
    heathrow: 20.00,
    gatwick: 15.00,
    stansted: 15.00,
    luton: 10.00,
    cityAirport: 10.00
  },
  surgePricing: {
    peak: 1.5,    // 6-9am, 5-8pm
    night: 1.25,  // 10pm-6am
    weekend: 1.2  // Friday 6pm - Sunday 6pm
  }
};

export class PricingEngine {
  private pricing: PricingModel;
  private vatRate: number = 0.20; // 20% VAT

  constructor(pricingConfig?: Partial<PricingModel>) {
    this.pricing = { ...DEFAULT_PRICING, ...pricingConfig };
  }

  /**
   * Calculate comprehensive price breakdown for a booking
   */
  calculatePrice(booking: BookingDetails, customer?: Customer): PriceBreakdown {
    // Calculate base fare
    const baseFare = Math.max(
      booking.distance * this.pricing.baseFare,
      this.pricing.minimumFare
    );

    // Calculate security premium for SIA drivers
    const securityPremium = booking.requiresSIA ? 
      baseFare * this.pricing.securityPremium : 0;

    // Calculate airport surcharge
    const airportSurcharge = booking.isAirportTransfer && booking.airportCode ?
      this.pricing.airportSurcharge[booking.airportCode] : 0;

    // Calculate surge pricing multiplier
    const surgeMultiplier = this.calculateSurgeMultiplier(booking.pickupTime);
    
    // Apply surge pricing to base fare only (not to surcharges)
    const surgePricing = (baseFare + securityPremium) * (surgeMultiplier - 1);

    // Calculate waiting time charge
    const waitingTime = booking.duration * this.pricing.waitingTime;

    // Calculate subtotal
    let subtotal = baseFare + securityPremium + airportSurcharge + surgePricing + waitingTime;

    // Apply corporate discount if applicable
    if (customer?.corporateAccount?.discountRate) {
      const discount = subtotal * (customer.corporateAccount.discountRate / 100);
      subtotal -= discount;
    }

    // Calculate VAT
    const vat = subtotal * this.vatRate;
    
    // Calculate total
    const total = subtotal + vat;

    return {
      baseFare,
      securityPremium,
      airportSurcharge,
      surgePricing,
      waitingTime,
      subtotal,
      vat,
      total,
      surgeMultiplier
    };
  }

  /**
   * Calculate surge pricing multiplier based on pickup time
   */
  private calculateSurgeMultiplier(pickupTime: Date): number {
    const hour = pickupTime.getHours();
    const dayOfWeek = pickupTime.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
    const isFridayEvening = dayOfWeek === 5 && hour >= 18; // Friday after 6pm

    // Weekend pricing (Friday 6pm - Sunday 6pm)
    if (isWeekend || isFridayEvening) {
      return this.pricing.surgePricing.weekend;
    }

    // Night pricing (10pm-6am)
    if (hour >= 22 || hour < 6) {
      return this.pricing.surgePricing.night;
    }

    // Peak pricing (6-9am, 5-8pm)
    if ((hour >= 6 && hour < 9) || (hour >= 17 && hour < 20)) {
      return this.pricing.surgePricing.peak;
    }

    // Standard pricing
    return 1.0;
  }

  /**
   * Calculate dynamic pricing based on demand and supply
   */
  calculateDynamicPricing(
    booking: BookingDetails, 
    demandMultiplier: number = 1.0,
    availableDrivers: number = 10
  ): PriceBreakdown {
    // Adjust base pricing based on demand/supply
    const dynamicPricing = { ...this.pricing };
    
    // Apply demand multiplier
    dynamicPricing.baseFare *= demandMultiplier;
    
    // Apply supply shortage multiplier
    if (availableDrivers < 3) {
      dynamicPricing.baseFare *= 1.3; // 30% increase for low supply
    } else if (availableDrivers < 5) {
      dynamicPricing.baseFare *= 1.15; // 15% increase for medium supply
    }

    const originalPricing = this.pricing;
    this.pricing = dynamicPricing;
    
    const result = this.calculatePrice(booking);
    
    // Restore original pricing
    this.pricing = originalPricing;
    
    return result;
  }

  /**
   * Estimate price for quote purposes (with ranges)
   */
  estimatePrice(
    distance: number,
    serviceType: BookingDetails['serviceType'],
    requiresSIA: boolean = true,
    isAirportTransfer: boolean = false,
    airportCode?: keyof PricingModel['airportSurcharge']
  ): { min: number; max: number; estimated: number } {
    // Create a basic booking for estimation
    const estimatedBooking: BookingDetails = {
      id: 'estimate',
      customerId: 'estimate',
      pickupLocation: '',
      dropoffLocation: '',
      pickupTime: new Date(),
      distance,
      duration: distance * 2, // Estimate 2 minutes per mile
      serviceType,
      vehicleType: 'sedan',
      requiresSIA,
      passengerCount: 1,
      isAirportTransfer,
      airportCode
    };

    // Calculate base estimate
    const baseEstimate = this.calculatePrice(estimatedBooking);

    // Calculate range with potential surge pricing
    const minPrice = baseEstimate.total; // No surge
    const maxPrice = baseEstimate.total * this.pricing.surgePricing.peak; // Peak surge

    return {
      min: Math.round(minPrice * 100) / 100,
      max: Math.round(maxPrice * 100) / 100,
      estimated: Math.round(baseEstimate.total * 100) / 100
    };
  }

  /**
   * Calculate monthly billing for corporate customers
   */
  calculateMonthlyBilling(
    bookings: BookingDetails[],
    customer: Customer
  ): { 
    totalAmount: number; 
    discountApplied: number; 
    breakdown: PriceBreakdown[]; 
    invoiceItems: Array<{ description: string; amount: number; vat: number }> 
  } {
    const breakdown = bookings.map(booking => this.calculatePrice(booking, customer));
    const totalBeforeDiscount = breakdown.reduce((sum, price) => sum + price.total, 0);
    
    const discountRate = customer.corporateAccount?.discountRate || 0;
    const discountApplied = totalBeforeDiscount * (discountRate / 100);
    const totalAmount = totalBeforeDiscount - discountApplied;

    // Group by service type for invoice items
    const serviceGroups: Record<string, { count: number; amount: number; vat: number }> = {};
    
    bookings.forEach((booking, index) => {
      const price = breakdown[index];
      const key = `${booking.serviceType} ${booking.requiresSIA ? '(SIA)' : ''}`;
      
      if (!serviceGroups[key]) {
        serviceGroups[key] = { count: 0, amount: 0, vat: 0 };
      }
      
      serviceGroups[key].count++;
      serviceGroups[key].amount += price.subtotal;
      serviceGroups[key].vat += price.vat;
    });

    const invoiceItems = Object.entries(serviceGroups).map(([description, data]: [string, { count: number; amount: number; vat: number }]) => ({
      description: `${description} (${data.count} trips)`,
      amount: data.amount,
      vat: data.vat
    }));

    if (discountApplied > 0) {
      invoiceItems.push({
        description: `Corporate Discount (${discountRate}%)`,
        amount: -discountApplied,
        vat: 0
      });
    }

    return {
      totalAmount,
      discountApplied,
      breakdown,
      invoiceItems
    };
  }

  /**
   * Validate pricing parameters
   */
  validateBooking(booking: BookingDetails): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (booking.distance <= 0) {
      errors.push('Distance must be greater than 0');
    }

    if (booking.distance > 500) {
      errors.push('Distance cannot exceed 500 miles');
    }

    if (booking.duration < 0) {
      errors.push('Duration cannot be negative');
    }

    if (booking.passengerCount <= 0 || booking.passengerCount > 8) {
      errors.push('Passenger count must be between 1 and 8');
    }

    if (booking.isAirportTransfer && !booking.airportCode) {
      errors.push('Airport code required for airport transfers');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Update pricing configuration
   */
  updatePricing(newPricing: Partial<PricingModel>): void {
    this.pricing = { ...this.pricing, ...newPricing };
  }

  /**
   * Get current pricing configuration
   */
  getPricing(): PricingModel {
    return { ...this.pricing };
  }
}

// Export singleton instance
export const pricingEngine = new PricingEngine();