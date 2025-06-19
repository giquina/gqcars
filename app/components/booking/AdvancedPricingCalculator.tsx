'use client'

import { useState, useEffect } from 'react'
import { Calculator, Clock, MapPin, TrendingUp, Info, Shield, Zap } from 'lucide-react'
import { BookingFormData, Driver, PRICING_CONFIG, VEHICLE_TYPES, PricingBreakdown } from '@/app/types/booking'

interface AdvancedPricingCalculatorProps {
  formData: BookingFormData
  selectedDriver: Driver | null
  onPriceUpdate: (price: number) => void
}

export default function AdvancedPricingCalculator({
  formData,
  selectedDriver,
  onPriceUpdate
}: AdvancedPricingCalculatorProps) {
  const [pricing, setPricing] = useState<PricingBreakdown>({
    baseFare: 0,
    siaLicensePremium: 0,
    distanceCharge: 0,
    timeCharge: 0,
    surcharges: [],
    tollCosts: 0,
    parkingFees: 0,
    subtotal: 0,
    taxes: 0,
    total: 0,
    estimatedDuration: 0,
    estimatedDistance: 0,
    comparisonPrice: 0
  })

  const [isCalculating, setIsCalculating] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)

  useEffect(() => {
    if (formData.pickupAddress && formData.destinationAddress && formData.vehicleType) {
      calculatePricing()
    }
  }, [formData, selectedDriver])

  const calculatePricing = async () => {
    setIsCalculating(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    const vehicle = VEHICLE_TYPES[formData.vehicleType]
    const estimatedDistance = Math.random() * 20 + 5 // Mock: 5-25 miles
    const estimatedDuration = Math.random() * 60 + 20 // Mock: 20-80 minutes
    
    // Base calculations
    const baseFare = Math.max(PRICING_CONFIG.baseFareMin, vehicle.basePrice * estimatedDistance)
    const siaLicensePremium = PRICING_CONFIG.siaLicensePremium
    const distanceCharge = estimatedDistance * PRICING_CONFIG.perMileRate * vehicle.priceMultiplier
    const timeCharge = estimatedDuration * PRICING_CONFIG.perMinuteRate

    // Calculate surcharges
    const surcharges: { name: string; amount: number }[] = []
    const currentHour = new Date().getHours()
    const currentDay = new Date().getDay()

    // Night surcharge (10PM - 6AM)
    if (currentHour >= 22 || currentHour <= 6) {
      const nightSurcharge = baseFare * PRICING_CONFIG.surcharges.nightTime.rate
      surcharges.push({
        name: PRICING_CONFIG.surcharges.nightTime.description,
        amount: nightSurcharge
      })
    }

    // Weekend surcharge
    if (currentDay === 0 || currentDay === 6) {
      const weekendSurcharge = baseFare * PRICING_CONFIG.surcharges.weekend.rate
      surcharges.push({
        name: PRICING_CONFIG.surcharges.weekend.description,
        amount: weekendSurcharge
      })
    }

    // Airport surcharge (mock detection)
    if (formData.pickupAddress.toLowerCase().includes('airport') || 
        formData.destinationAddress.toLowerCase().includes('airport')) {
      surcharges.push({
        name: PRICING_CONFIG.surcharges.airport.description,
        amount: PRICING_CONFIG.surcharges.airport.rate
      })
    }

    // Calculate totals
    const surchargeTotal = surcharges.reduce((sum, s) => sum + s.amount, 0)
    const tollCosts = Math.random() * 10 // Mock toll costs
    const parkingFees = Math.random() * 5 // Mock parking fees
    
    const subtotal = baseFare + siaLicensePremium + distanceCharge + timeCharge + surchargeTotal + tollCosts + parkingFees
    const taxes = subtotal * PRICING_CONFIG.taxes
    const total = subtotal + taxes

    // Regular taxi comparison (30% cheaper but no SIA license)
    const comparisonPrice = total * 0.7

    const newPricing: PricingBreakdown = {
      baseFare,
      siaLicensePremium,
      distanceCharge,
      timeCharge,
      surcharges,
      tollCosts,
      parkingFees,
      subtotal,
      taxes,
      total,
      estimatedDuration,
      estimatedDistance,
      comparisonPrice
    }

    setPricing(newPricing)
    onPriceUpdate(total)
    setIsCalculating(false)
  }

  return (
    <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calculator className="w-6 h-6 text-gq-gold" />
          <h3 className="text-xl font-bold">Live Pricing</h3>
        </div>
        
        {isCalculating && (
          <div className="flex items-center gap-2 text-gq-gold">
            <div className="w-4 h-4 border-2 border-gq-gold border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Calculating...</span>
          </div>
        )}
      </div>

      {/* Quick Price Display */}
      <div className="text-center mb-6 p-4 bg-gradient-to-r from-gq-blue/20 to-gq-gold/20 border border-gq-gold/30 rounded-lg">
        <div className="text-3xl font-bold text-gq-gold mb-2">
          £{pricing.total.toFixed(2)}
        </div>
        <div className="text-sm text-gray-300 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{pricing.estimatedDistance.toFixed(1)} miles</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{Math.round(pricing.estimatedDuration)} mins</span>
          </div>
        </div>
      </div>

      {/* Price Comparison */}
      {pricing.comparisonPrice && pricing.comparisonPrice > 0 && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">vs Regular Taxi</p>
              <p className="text-xs text-gray-400">Standard taxi without SIA license</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-400">
                +£{(pricing.total - pricing.comparisonPrice).toFixed(2)}
              </p>
              <p className="text-xs text-gray-400">for SIA premium</p>
            </div>
          </div>
        </div>
      )}

      {/* Driver Selection Impact */}
      {selectedDriver && (
        <div className="mb-6 p-4 bg-gq-gold/10 border border-gq-gold/30 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gq-gold/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-gq-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-gq-gold">Driver Selected: {selectedDriver.name}</p>
              <p className="text-xs text-gray-400">
                ETA: {selectedDriver.eta} min • Rating: {selectedDriver.rating}⭐
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Breakdown Toggle */}
      <button
        onClick={() => setShowBreakdown(!showBreakdown)}
        className="w-full flex items-center justify-between p-3 border border-gray-700 rounded-lg hover:border-gq-gold transition-colors mb-4"
      >
        <span className="flex items-center gap-2">
          <Info className="w-4 h-4" />
          <span className="text-sm">Price Breakdown</span>
        </span>
        <span className={`transform transition-transform ${showBreakdown ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Detailed Breakdown */}
      {showBreakdown && (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Base Fare</span>
            <span>£{pricing.baseFare.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              SIA License Premium
            </span>
            <span>£{pricing.siaLicensePremium.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Distance ({pricing.estimatedDistance.toFixed(1)} miles)</span>
            <span>£{pricing.distanceCharge.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Time ({Math.round(pricing.estimatedDuration)} mins)</span>
            <span>£{pricing.timeCharge.toFixed(2)}</span>
          </div>

          {pricing.surcharges.map((surcharge, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-gray-400">{surcharge.name}</span>
              <span>£{surcharge.amount.toFixed(2)}</span>
            </div>
          ))}

          {pricing.tollCosts > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Tolls</span>
              <span>£{pricing.tollCosts.toFixed(2)}</span>
            </div>
          )}

          {pricing.parkingFees > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-400">Parking Fees</span>
              <span>£{pricing.parkingFees.toFixed(2)}</span>
            </div>
          )}

          <div className="border-t border-gray-700 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span>£{pricing.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-400">VAT (20%)</span>
              <span>£{pricing.taxes.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between font-bold text-gq-gold text-lg pt-2 border-t border-gray-700 mt-2">
              <span>Total</span>
              <span>£{pricing.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods */}
      <div className="mt-6 pt-6 border-t border-gray-700">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-gq-gold" />
          Payment Options
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Card Payment</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Cash</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Bank Transfer</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Corporate Account</span>
          </div>
        </div>
      </div>

      {/* Price Guarantee */}
      <div className="mt-4 p-3 bg-gq-gold/10 border border-gq-gold/30 rounded-lg">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-gq-gold" />
          <span className="text-xs text-gq-gold font-medium">Price Guarantee</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          This price is fixed and guaranteed. No hidden fees or surge pricing.
        </p>
      </div>
    </div>
  )
}