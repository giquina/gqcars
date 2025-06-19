'use client'

import { useState, useEffect, useCallback } from 'react'
import { 
  Calculator, 
  MapPin, 
  Clock, 
  Shield, 
  Car, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Zap,
  Navigation,
  Star,
  Info,
  CheckCircle
} from 'lucide-react'
import { format } from 'date-fns'

interface PricingFactors {
  distance: number
  duration: number
  securityRisk: 'low' | 'medium' | 'high'
  timeMultiplier: number
  demandMultiplier: number
  serviceLevel: 'standard' | 'executive' | 'full-protection'
  isAirportTransfer: boolean
  trafficCondition: 'light' | 'moderate' | 'heavy'
}

interface QuoteBreakdown {
  basePrice: number
  securityPremium: number
  timeAdjustment: number
  demandAdjustment: number
  serviceLevelMultiplier: number
  airportPremium: number
  total: number
}

interface RouteInfo {
  distance: string
  duration: string
  route: string
  waypoints: string[]
  securityScore: number
  trafficLevel: string
}

interface AIQuoteCalculatorProps {
  onQuoteCalculated?: (quote: QuoteBreakdown) => void
}

export default function AIQuoteCalculator({ onQuoteCalculated }: AIQuoteCalculatorProps) {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [serviceLevel, setServiceLevel] = useState<'standard' | 'executive' | 'full-protection'>('standard')
  const [dateTime, setDateTime] = useState('')
  const [passengers, setPassengers] = useState(1)
  
  const [isLoading, setIsLoading] = useState(false)
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
  const [quote, setQuote] = useState<QuoteBreakdown | null>(null)
  const [pricingFactors, setPricingFactors] = useState<PricingFactors | null>(null)
  const [alternatives, setAlternatives] = useState<any[]>([])
  const [showBreakdown, setShowBreakdown] = useState(false)

  // Security risk assessment based on location
  const assessSecurityRisk = useCallback((pickup: string, destination: string): 'low' | 'medium' | 'high' => {
    const highRiskAreas = ['hackney', 'tower hamlets', 'newham', 'southwark', 'lambeth']
    const mediumRiskAreas = ['brent', 'haringey', 'islington', 'camden', 'westminster']
    
    const locations = [pickup, destination].map(loc => loc.toLowerCase())
    
    if (locations.some(loc => highRiskAreas.some(risk => loc.includes(risk)))) {
      return 'high'
    }
    if (locations.some(loc => mediumRiskAreas.some(risk => loc.includes(risk)))) {
      return 'medium'
    }
    return 'low'
  }, [])

  // Time-based pricing multiplier
  const getTimeMultiplier = useCallback((dateTime: string): number => {
    const date = new Date(dateTime)
    const hour = date.getHours()
    const day = date.getDay()
    
    // Peak hours (7-9 AM, 5-7 PM on weekdays)
    if (day >= 1 && day <= 5 && ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19))) {
      return 1.25 // +25% peak hours
    }
    // Night hours (10 PM - 6 AM)
    if (hour >= 22 || hour <= 6) {
      return 1.15 // +15% night
    }
    return 1.0
  }, [])

  // Dynamic demand multiplier (simulated)
  const getDemandMultiplier = useCallback((): number => {
    // In real implementation, this would fetch from API
    const random = Math.random()
    if (random > 0.8) return 1.3 // High demand
    if (random > 0.6) return 1.15 // Medium demand
    return 1.0 // Normal demand
  }, [])

  // Service level multipliers
  const getServiceMultiplier = (level: string): number => {
    switch (level) {
      case 'executive': return 1.5
      case 'full-protection': return 2.1
      default: return 1.0
    }
  }

  // Calculate distance and route (mock implementation)
  const calculateRoute = useCallback(async (pickup: string, destination: string) => {
    setIsLoading(true)
    
    // Mock Google Maps API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Simulated route calculation
    const distance = Math.random() * 30 + 5 // 5-35 miles
    const baseDuration = distance * 2.5 // Base time in minutes
    
    const routeData: RouteInfo = {
      distance: `${distance.toFixed(1)} miles`,
      duration: `${Math.round(baseDuration)} minutes`,
      route: `${pickup} → ${destination}`,
      waypoints: ['A40', 'M25', 'A4'],
      securityScore: Math.random() * 100,
      trafficLevel: ['light', 'moderate', 'heavy'][Math.floor(Math.random() * 3)]
    }
    
    setRouteInfo(routeData)
    return { distance, duration: baseDuration }
  }, [])

  // Main pricing calculation
  const calculateQuote = useCallback(async () => {
    if (!pickup || !destination || !dateTime) return

    const { distance, duration } = await calculateRoute(pickup, destination)
    
    const securityRisk = assessSecurityRisk(pickup, destination)
    const timeMultiplier = getTimeMultiplier(dateTime)
    const demandMultiplier = getDemandMultiplier()
    const serviceMultiplier = getServiceMultiplier(serviceLevel)
    
    // Airport transfer detection
    const isAirportTransfer = [pickup, destination].some(loc => 
      loc.toLowerCase().includes('airport') || 
      loc.toLowerCase().includes('heathrow') ||
      loc.toLowerCase().includes('gatwick') ||
      loc.toLowerCase().includes('stansted') ||
      loc.toLowerCase().includes('luton')
    )

    const factors: PricingFactors = {
      distance,
      duration,
      securityRisk,
      timeMultiplier,
      demandMultiplier,
      serviceLevel,
      isAirportTransfer,
      trafficCondition: routeInfo?.trafficLevel as any || 'moderate'
    }

    setPricingFactors(factors)

    // Base calculation: £2.50/mile + £25 minimum
    const basePrice = Math.max(distance * 2.5, 25)
    
    // Security premium (15-30% based on risk)
    const securityPremiumRate = securityRisk === 'high' ? 0.3 : securityRisk === 'medium' ? 0.2 : 0.15
    const securityPremium = basePrice * securityPremiumRate
    
    // Time adjustment
    const timeAdjustment = basePrice * (timeMultiplier - 1)
    
    // Demand adjustment
    const demandAdjustment = basePrice * (demandMultiplier - 1)
    
    // Service level adjustment
    const serviceLevelMultiplier = basePrice * (serviceMultiplier - 1)
    
    // Airport premium
    const airportPremium = isAirportTransfer ? 15 : 0
    
    const total = basePrice + securityPremium + timeAdjustment + demandAdjustment + serviceLevelMultiplier + airportPremium

    const breakdown: QuoteBreakdown = {
      basePrice,
      securityPremium,
      timeAdjustment,
      demandAdjustment,
      serviceLevelMultiplier,
      airportPremium,
      total
    }

    setQuote(breakdown)
    onQuoteCalculated?.(breakdown)
    setIsLoading(false)

    // Generate alternatives
    generateAlternatives(breakdown, factors)
  }, [pickup, destination, dateTime, serviceLevel, routeInfo, assessSecurityRisk, getTimeMultiplier, getDemandMultiplier, calculateRoute])

  const generateAlternatives = (baseQuote: QuoteBreakdown, factors: PricingFactors) => {
    const alts = []
    
    if (factors.serviceLevel !== 'standard') {
      const standardQuote = { ...baseQuote }
      standardQuote.serviceLevelMultiplier = 0
      standardQuote.total = standardQuote.basePrice + standardQuote.securityPremium + 
                           standardQuote.timeAdjustment + standardQuote.demandAdjustment + standardQuote.airportPremium
      alts.push({
        level: 'Standard Security Taxi',
        price: standardQuote.total,
        savings: baseQuote.total - standardQuote.total,
        features: ['SIA Licensed Driver', 'GPS Tracking', 'Basic Security']
      })
    }
    
    if (factors.serviceLevel !== 'executive') {
      const execQuote = { ...baseQuote }
      execQuote.serviceLevelMultiplier = baseQuote.basePrice * 0.5
      execQuote.total = execQuote.basePrice + execQuote.securityPremium + 
                       execQuote.timeAdjustment + execQuote.demandAdjustment + 
                       execQuote.serviceLevelMultiplier + execQuote.airportPremium
      alts.push({
        level: 'Executive Protection',
        price: execQuote.total,
        difference: execQuote.total - baseQuote.total,
        features: ['Executive Vehicle', 'Route Security', 'Priority Response']
      })
    }

    setAlternatives(alts)
  }

  useEffect(() => {
    if (pickup && destination && dateTime) {
      const debounce = setTimeout(calculateQuote, 500)
      return () => clearTimeout(debounce)
    }
  }, [pickup, destination, dateTime, serviceLevel, calculateQuote])

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-green-400'
    }
  }

  return (
    <div className="bg-gq-black/50 p-6 border border-gray-700 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-gq-gold" />
        <h3 className="text-xl font-bold">AI Smart Quote Engine</h3>
        <Zap className="w-5 h-5 text-gq-gold animate-pulse" />
      </div>

      {/* Input Form */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Destination</label>
            <div className="relative">
              <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date & Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Service Level</label>
            <select
              value={serviceLevel}
              onChange={(e) => setServiceLevel(e.target.value as any)}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
            >
              <option value="standard">Standard Security (1x)</option>
              <option value="executive">Executive Protection (1.5x)</option>
              <option value="full-protection">Full Protection (2.1x)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                min="1"
                max="8"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gq-gold"></div>
          <span className="ml-3 text-gq-gold">Calculating intelligent quote...</span>
        </div>
      )}

      {/* Route Information */}
      {routeInfo && !isLoading && (
        <div className="bg-gq-black/30 p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="w-5 h-5 text-gq-gold" />
            <h4 className="font-semibold">Route Analysis</h4>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Distance</span>
              <p className="font-medium">{routeInfo.distance}</p>
            </div>
            <div>
              <span className="text-gray-400">Duration</span>
              <p className="font-medium">{routeInfo.duration}</p>
            </div>
            <div>
              <span className="text-gray-400">Security Score</span>
              <p className={`font-medium ${getRiskColor(pricingFactors?.securityRisk || 'low')}`}>
                {Math.round(routeInfo.securityScore)}/100
              </p>
            </div>
            <div>
              <span className="text-gray-400">Traffic</span>
              <p className="font-medium capitalize">{routeInfo.trafficLevel}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quote Display */}
      {quote && !isLoading && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-gq-blue/20 to-gq-gold/20 p-6 border border-gq-gold/30">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-bold text-gq-gold">Smart Quote Result</h4>
                <p className="text-sm text-gray-400">AI-optimized pricing with security analysis</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gq-gold">£{quote.total.toFixed(2)}</div>
                <button
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="text-xs text-gray-400 hover:text-gq-gold flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  {showBreakdown ? 'Hide' : 'Show'} breakdown
                </button>
              </div>
            </div>

            {/* Pricing Factors Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span>Security: <span className={getRiskColor(pricingFactors?.securityRisk || 'low')}>{pricingFactors?.securityRisk}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Time: {((pricingFactors?.timeMultiplier || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Demand: {((pricingFactors?.demandMultiplier || 1) * 100).toFixed(0)}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-purple-400" />
                <span>Service: {serviceLevel}</span>
              </div>
            </div>

            {/* Price Breakdown */}
            {showBreakdown && (
              <div className="mt-4 pt-4 border-t border-gray-600 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Rate (£2.50/mile + £25 min)</span>
                  <span>£{quote.basePrice.toFixed(2)}</span>
                </div>
                {quote.securityPremium > 0 && (
                  <div className="flex justify-between">
                    <span>Security Premium ({pricingFactors?.securityRisk} risk)</span>
                    <span>+£{quote.securityPremium.toFixed(2)}</span>
                  </div>
                )}
                {quote.timeAdjustment > 0 && (
                  <div className="flex justify-between">
                    <span>Time Adjustment</span>
                    <span>+£{quote.timeAdjustment.toFixed(2)}</span>
                  </div>
                )}
                {quote.demandAdjustment > 0 && (
                  <div className="flex justify-between">
                    <span>Demand Adjustment</span>
                    <span>+£{quote.demandAdjustment.toFixed(2)}</span>
                  </div>
                )}
                {quote.serviceLevelMultiplier > 0 && (
                  <div className="flex justify-between">
                    <span>Service Level Upgrade</span>
                    <span>+£{quote.serviceLevelMultiplier.toFixed(2)}</span>
                  </div>
                )}
                {quote.airportPremium > 0 && (
                  <div className="flex justify-between">
                    <span>Airport Transfer Premium</span>
                    <span>+£{quote.airportPremium.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-gq-gold">£{quote.total.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Alternative Options */}
          {alternatives.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-semibold text-gray-300">Alternative Options</h5>
              {alternatives.map((alt, index) => (
                <div key={index} className="bg-gq-black/30 p-4 border border-gray-700 hover:border-gq-gold/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h6 className="font-medium">{alt.level}</h6>
                      <div className="flex gap-2 text-xs text-gray-400 mt-1">
                        {alt.features.map((feature: string, idx: number) => (
                          <span key={idx} className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{alt.price.toFixed(2)}</div>
                      {alt.savings && (
                        <div className="text-xs text-green-400">Save £{alt.savings.toFixed(2)}</div>
                      )}
                      {alt.difference && alt.difference > 0 && (
                        <div className="text-xs text-yellow-400">+£{alt.difference.toFixed(2)}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Security Features */}
          <div className="bg-gq-black/30 p-4 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-gq-gold" />
              <h5 className="font-semibold">Security Features Included</h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>SIA Licensed Close Protection Officer</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Real-time GPS Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Route Security Assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>24/7 Emergency Response</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="text-center pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-2">
          Need assistance? Call <span className="text-gq-gold font-medium">07407 655 203</span>
        </p>
        <p className="text-xs text-gray-500">
          * Prices are estimates. Final quote confirmed upon booking.
        </p>
      </div>
    </div>
  )
}