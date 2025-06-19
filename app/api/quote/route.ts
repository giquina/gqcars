import { NextRequest, NextResponse } from 'next/server'

interface QuoteRequest {
  pickup: string
  destination: string
  dateTime: string
  serviceLevel: 'standard' | 'executive' | 'full-protection'
  passengers: number
}

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

export async function POST(request: NextRequest) {
  try {
    const body: QuoteRequest = await request.json()
    const { pickup, destination, dateTime, serviceLevel, passengers } = body

    // Validate input
    if (!pickup || !destination || !dateTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Calculate route and pricing
    const routeData = await calculateRoute(pickup, destination)
    const pricingFactors = await calculatePricingFactors(pickup, destination, dateTime, serviceLevel)
    const quote = calculateQuote(pricingFactors, routeData.distance)
    const alternatives = generateAlternatives(quote, pricingFactors)

    return NextResponse.json({
      success: true,
      data: {
        route: routeData,
        pricing: pricingFactors,
        quote,
        alternatives,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Quote calculation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Route calculation (mock implementation - replace with Google Maps API)
async function calculateRoute(pickup: string, destination: string) {
  // In production, integrate with Google Maps Distance Matrix API
  const distance = Math.random() * 30 + 5 // 5-35 miles
  const baseDuration = distance * 2.5 // Base time in minutes
  
  // Add traffic simulation
  const trafficMultiplier = Math.random() * 0.5 + 0.75 // 0.75 - 1.25x
  const actualDuration = baseDuration * trafficMultiplier

  return {
    distance: parseFloat(distance.toFixed(1)),
    duration: Math.round(actualDuration),
    route: `${pickup} → ${destination}`,
    waypoints: generateWaypoints(pickup, destination),
    trafficLevel: getTrafficLevel(trafficMultiplier),
    securityScore: calculateRouteSecurityScore(pickup, destination)
  }
}

// Security risk assessment
function assessSecurityRisk(pickup: string, destination: string): 'low' | 'medium' | 'high' {
  const highRiskAreas = ['hackney', 'tower hamlets', 'newham', 'southwark', 'lambeth', 'east london']
  const mediumRiskAreas = ['brent', 'haringey', 'islington', 'camden', 'westminster', 'north london']
  
  const locations = [pickup, destination].map(loc => loc.toLowerCase())
  
  if (locations.some(loc => highRiskAreas.some(risk => loc.includes(risk)))) {
    return 'high'
  }
  if (locations.some(loc => mediumRiskAreas.some(risk => loc.includes(risk)))) {
    return 'medium'
  }
  return 'low'
}

// Time-based pricing multiplier
function getTimeMultiplier(dateTime: string): number {
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
  // Weekend premium
  if (day === 0 || day === 6) {
    return 1.1 // +10% weekend
  }
  return 1.0
}

// Dynamic demand multiplier
function getDemandMultiplier(dateTime: string): number {
  const date = new Date(dateTime)
  const hour = date.getHours()
  
  // High demand periods
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) || (hour >= 21 && hour <= 23)) {
    return 1.2 + Math.random() * 0.3 // 1.2 - 1.5x
  }
  
  // Medium demand
  if ((hour >= 10 && hour <= 16) || (hour >= 19 && hour <= 21)) {
    return 1.05 + Math.random() * 0.15 // 1.05 - 1.2x
  }
  
  // Low demand
  return 0.95 + Math.random() * 0.1 // 0.95 - 1.05x
}

// Calculate comprehensive pricing factors
async function calculatePricingFactors(
  pickup: string, 
  destination: string, 
  dateTime: string, 
  serviceLevel: 'standard' | 'executive' | 'full-protection'
): Promise<PricingFactors> {
  const securityRisk = assessSecurityRisk(pickup, destination)
  const timeMultiplier = getTimeMultiplier(dateTime)
  const demandMultiplier = getDemandMultiplier(dateTime)
  
  // Airport transfer detection
  const isAirportTransfer = [pickup, destination].some(loc => 
    loc.toLowerCase().includes('airport') || 
    loc.toLowerCase().includes('heathrow') ||
    loc.toLowerCase().includes('gatwick') ||
    loc.toLowerCase().includes('stansted') ||
    loc.toLowerCase().includes('luton') ||
    loc.toLowerCase().includes('city airport')
  )

  return {
    distance: 0, // Will be set by route calculation
    duration: 0, // Will be set by route calculation
    securityRisk,
    timeMultiplier,
    demandMultiplier,
    serviceLevel,
    isAirportTransfer,
    trafficCondition: 'moderate' // Will be updated by traffic analysis
  }
}

// Main quote calculation
function calculateQuote(factors: PricingFactors, distance: number) {
  // Base calculation: £2.50/mile + £25 minimum
  const basePrice = Math.max(distance * 2.5, 25)
  
  // Security premium (15-30% based on risk)
  const securityPremiumRate = factors.securityRisk === 'high' ? 0.3 : 
                             factors.securityRisk === 'medium' ? 0.2 : 0.15
  const securityPremium = basePrice * securityPremiumRate
  
  // Time adjustment
  const timeAdjustment = basePrice * (factors.timeMultiplier - 1)
  
  // Demand adjustment
  const demandAdjustment = basePrice * (factors.demandMultiplier - 1)
  
  // Service level multiplier
  const serviceMultiplier = factors.serviceLevel === 'full-protection' ? 2.1 :
                           factors.serviceLevel === 'executive' ? 1.5 : 1.0
  const serviceLevelMultiplier = basePrice * (serviceMultiplier - 1)
  
  // Airport premium
  const airportPremium = factors.isAirportTransfer ? 15 : 0
  
  // Corporate discount detection (basic implementation)
  const corporateDiscount = 0 // Could be enhanced with user authentication
  
  const subtotal = basePrice + securityPremium + timeAdjustment + demandAdjustment + serviceLevelMultiplier + airportPremium
  const total = subtotal - corporateDiscount

  return {
    basePrice: parseFloat(basePrice.toFixed(2)),
    securityPremium: parseFloat(securityPremium.toFixed(2)),
    timeAdjustment: parseFloat(timeAdjustment.toFixed(2)),
    demandAdjustment: parseFloat(demandAdjustment.toFixed(2)),
    serviceLevelMultiplier: parseFloat(serviceLevelMultiplier.toFixed(2)),
    airportPremium: parseFloat(airportPremium.toFixed(2)),
    corporateDiscount: parseFloat(corporateDiscount.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  }
}

// Generate alternative service options
function generateAlternatives(baseQuote: any, factors: PricingFactors) {
  const alternatives = []
  
  // Standard option
  if (factors.serviceLevel !== 'standard') {
    const standardFactors = { ...factors, serviceLevel: 'standard' as const }
    const standardQuote = calculateQuote(standardFactors, factors.distance)
    
    alternatives.push({
      level: 'Standard Security Taxi',
      price: standardQuote.total,
      savings: baseQuote.total - standardQuote.total,
      features: ['SIA Licensed Driver', 'GPS Tracking', 'Basic Security Coverage', 'Professional Service'],
      description: 'Our standard security taxi service with qualified protection officers'
    })
  }
  
  // Executive option
  if (factors.serviceLevel !== 'executive') {
    const execFactors = { ...factors, serviceLevel: 'executive' as const }
    const execQuote = calculateQuote(execFactors, factors.distance)
    
    alternatives.push({
      level: 'Executive Protection',
      price: execQuote.total,
      difference: execQuote.total - baseQuote.total,
      features: ['Executive Vehicle', 'Enhanced Route Security', 'Priority Response', 'Discrete Service'],
      description: 'Premium executive protection with enhanced security measures'
    })
  }
  
  // Full Protection option
  if (factors.serviceLevel !== 'full-protection') {
    const fullFactors = { ...factors, serviceLevel: 'full-protection' as const }
    const fullQuote = calculateQuote(fullFactors, factors.distance)
    
    alternatives.push({
      level: 'Full Protection Team',
      price: fullQuote.total,
      difference: fullQuote.total - baseQuote.total,
      features: ['Multiple Officers', 'Advanced Security', 'Route Reconnaissance', 'Emergency Protocol'],
      description: 'Comprehensive protection with full security team deployment'
    })
  }
  
  return alternatives
}

// Helper functions
function generateWaypoints(pickup: string, destination: string): string[] {
  const commonRoutes = ['A40', 'M25', 'A4', 'A406', 'M4', 'A1', 'M1']
  return commonRoutes.slice(0, Math.floor(Math.random() * 3) + 1)
}

function getTrafficLevel(multiplier: number): 'light' | 'moderate' | 'heavy' {
  if (multiplier > 1.15) return 'heavy'
  if (multiplier > 1.05) return 'moderate'
  return 'light'
}

function calculateRouteSecurityScore(pickup: string, destination: string): number {
  const securityRisk = assessSecurityRisk(pickup, destination)
  const baseScore = securityRisk === 'high' ? 60 : securityRisk === 'medium' ? 75 : 85
  return baseScore + Math.random() * 15 // Add some variance
}