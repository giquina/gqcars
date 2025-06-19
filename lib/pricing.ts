// Pricing utility functions for GQ Cars AI Quote System

export interface PricingConfig {
  basePricePerMile: number
  minimumFare: number
  securityPremiumRates: {
    low: number
    medium: number
    high: number
  }
  serviceLevelMultipliers: {
    standard: number
    executive: number
    'full-protection': number
  }
  timeMultipliers: {
    peak: number
    night: number
    weekend: number
  }
  airportPremium: number
  emergencyPremium: number
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  basePricePerMile: 2.5,
  minimumFare: 25,
  securityPremiumRates: {
    low: 0.15,    // 15%
    medium: 0.20, // 20%
    high: 0.30    // 30%
  },
  serviceLevelMultipliers: {
    standard: 1.0,
    executive: 1.5,
    'full-protection': 2.1
  },
  timeMultipliers: {
    peak: 1.25,   // +25% peak hours
    night: 1.15,  // +15% night
    weekend: 1.10 // +10% weekend
  },
  airportPremium: 15,
  emergencyPremium: 50
}

export interface SecurityRiskFactors {
  crimeRate: number
  threatLevel: 'low' | 'medium' | 'high'
  area: string
  historicalIncidents: number
}

export interface RouteSecurityAnalysis {
  overallRisk: 'low' | 'medium' | 'high'
  riskFactors: SecurityRiskFactors[]
  recommendedPrecautions: string[]
  alternativeRoutes: string[]
}

// Security risk assessment for London areas
export const LONDON_SECURITY_ZONES = {
  high: [
    'hackney', 'tower hamlets', 'newham', 'southwark', 'lambeth', 
    'east london', 'bermondsey', 'elephant and castle', 'peckham',
    'tottenham', 'edmonton', 'wood green'
  ],
  medium: [
    'brent', 'haringey', 'islington', 'camden', 'westminster',
    'north london', 'king\'s cross', 'euston', 'paddington',
    'stratford', 'canary wharf', 'croydon'
  ],
  low: [
    'kensington', 'chelsea', 'hampstead', 'richmond', 'putney',
    'wimbledon', 'mayfair', 'belgravia', 'knightsbridge',
    'notting hill', 'south kensington', 'marylebone'
  ]
}

// Airport codes and premium rates
export const AIRPORT_CONFIG = {
  heathrow: { code: 'LHR', premium: 20, baseTime: 60 },
  gatwick: { code: 'LGW', premium: 25, baseTime: 90 },
  stansted: { code: 'STN', premium: 30, baseTime: 75 },
  luton: { code: 'LTN', premium: 30, baseTime: 80 },
  'city airport': { code: 'LCY', premium: 15, baseTime: 45 }
}

/**
 * Assess security risk for a given location
 */
export function assessLocationSecurityRisk(location: string): 'low' | 'medium' | 'high' {
  const normalizedLocation = location.toLowerCase().trim()
  
  // Check high-risk areas
  for (const area of LONDON_SECURITY_ZONES.high) {
    if (normalizedLocation.includes(area)) {
      return 'high'
    }
  }
  
  // Check medium-risk areas
  for (const area of LONDON_SECURITY_ZONES.medium) {
    if (normalizedLocation.includes(area)) {
      return 'medium'
    }
  }
  
  // Check low-risk areas
  for (const area of LONDON_SECURITY_ZONES.low) {
    if (normalizedLocation.includes(area)) {
      return 'low'
    }
  }
  
  // Default to medium risk for unknown areas
  return 'medium'
}

/**
 * Assess security risk for a complete route
 */
export function assessRouteSecurityRisk(pickup: string, destination: string): RouteSecurityAnalysis {
  const pickupRisk = assessLocationSecurityRisk(pickup)
  const destinationRisk = assessLocationSecurityRisk(destination)
  
  // Overall risk is the highest of the two locations
  const riskLevels = { low: 1, medium: 2, high: 3 }
  const overallRisk = riskLevels[pickupRisk] >= riskLevels[destinationRisk] ? pickupRisk : destinationRisk
  
  const riskFactors: SecurityRiskFactors[] = [
    {
      crimeRate: getRiskScore(pickupRisk),
      threatLevel: pickupRisk,
      area: pickup,
      historicalIncidents: Math.floor(Math.random() * 10) + 1
    },
    {
      crimeRate: getRiskScore(destinationRisk),
      threatLevel: destinationRisk,
      area: destination,
      historicalIncidents: Math.floor(Math.random() * 10) + 1
    }
  ]
  
  const recommendedPrecautions = generateSecurityRecommendations(overallRisk)
  const alternativeRoutes = generateAlternativeRoutes(pickup, destination)
  
  return {
    overallRisk,
    riskFactors,
    recommendedPrecautions,
    alternativeRoutes
  }
}

/**
 * Calculate time-based pricing multiplier
 */
export function calculateTimeMultiplier(dateTime: string, config: PricingConfig = DEFAULT_PRICING_CONFIG): number {
  const date = new Date(dateTime)
  const hour = date.getHours()
  const day = date.getDay() // 0 = Sunday, 6 = Saturday
  
  // Peak hours (7-9 AM, 5-7 PM on weekdays)
  if (day >= 1 && day <= 5 && ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19))) {
    return config.timeMultipliers.peak
  }
  
  // Night hours (10 PM - 6 AM)
  if (hour >= 22 || hour <= 6) {
    return config.timeMultipliers.night
  }
  
  // Weekend premium
  if (day === 0 || day === 6) {
    return config.timeMultipliers.weekend
  }
  
  return 1.0
}

/**
 * Calculate dynamic demand multiplier based on time and conditions
 */
export function calculateDemandMultiplier(dateTime: string): number {
  const date = new Date(dateTime)
  const hour = date.getHours()
  const day = date.getDay()
  
  // High demand periods
  if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) || (hour >= 21 && hour <= 23)) {
    return 1.2 + Math.random() * 0.3 // 1.2 - 1.5x
  }
  
  // Friday/Saturday night premium
  if ((day === 5 || day === 6) && hour >= 20) {
    return 1.3 + Math.random() * 0.4 // 1.3 - 1.7x
  }
  
  // Medium demand
  if ((hour >= 10 && hour <= 16) || (hour >= 19 && hour <= 21)) {
    return 1.05 + Math.random() * 0.15 // 1.05 - 1.2x
  }
  
  // Low demand (early morning, late night weekdays)
  return 0.95 + Math.random() * 0.1 // 0.95 - 1.05x
}

/**
 * Detect if journey involves airport transfer
 */
export function detectAirportTransfer(pickup: string, destination: string): {
  isAirport: boolean
  airport?: string
  premium: number
} {
  const locations = [pickup.toLowerCase(), destination.toLowerCase()]
  
  for (const [airportName, config] of Object.entries(AIRPORT_CONFIG)) {
    if (locations.some(loc => loc.includes(airportName) || loc.includes(config.code.toLowerCase()))) {
      return {
        isAirport: true,
        airport: airportName,
        premium: config.premium
      }
    }
  }
  
  // Generic airport detection
  if (locations.some(loc => loc.includes('airport'))) {
    return {
      isAirport: true,
      premium: DEFAULT_PRICING_CONFIG.airportPremium
    }
  }
  
  return { isAirport: false, premium: 0 }
}

/**
 * Calculate corporate discount based on usage pattern
 */
export function calculateCorporateDiscount(
  userHistory?: { totalBookings: number; monthlySpend: number }
): number {
  if (!userHistory) return 0
  
  const { totalBookings, monthlySpend } = userHistory
  
  // Volume discounts
  if (monthlySpend > 1000) return 0.15 // 15% for high-spend customers
  if (monthlySpend > 500) return 0.10  // 10% for medium-spend customers
  if (totalBookings > 20) return 0.05  // 5% for frequent users
  
  return 0
}

/**
 * Generate intelligent pricing with all factors
 */
export function calculateIntelligentPrice(params: {
  distance: number
  pickup: string
  destination: string
  dateTime: string
  serviceLevel: 'standard' | 'executive' | 'full-protection'
  userHistory?: { totalBookings: number; monthlySpend: number }
  isEmergency?: boolean
  config?: PricingConfig
}) {
  const config = params.config || DEFAULT_PRICING_CONFIG
  
  // Base price calculation
  const basePrice = Math.max(params.distance * config.basePricePerMile, config.minimumFare)
  
  // Security risk assessment
  const routeRisk = assessRouteSecurityRisk(params.pickup, params.destination)
  const securityPremium = basePrice * config.securityPremiumRates[routeRisk.overallRisk]
  
  // Time-based adjustment
  const timeMultiplier = calculateTimeMultiplier(params.dateTime, config)
  const timeAdjustment = basePrice * (timeMultiplier - 1)
  
  // Demand-based adjustment
  const demandMultiplier = calculateDemandMultiplier(params.dateTime)
  const demandAdjustment = basePrice * (demandMultiplier - 1)
  
  // Service level adjustment
  const serviceMultiplier = config.serviceLevelMultipliers[params.serviceLevel]
  const serviceLevelAdjustment = basePrice * (serviceMultiplier - 1)
  
  // Airport premium
  const airportInfo = detectAirportTransfer(params.pickup, params.destination)
  const airportPremium = airportInfo.premium
  
  // Emergency premium
  const emergencyPremium = params.isEmergency ? config.emergencyPremium : 0
  
  // Corporate discount
  const corporateDiscount = calculateCorporateDiscount(params.userHistory)
  const discountAmount = (basePrice + securityPremium + timeAdjustment + demandAdjustment + serviceLevelAdjustment) * corporateDiscount
  
  // Final calculation
  const subtotal = basePrice + securityPremium + timeAdjustment + demandAdjustment + serviceLevelAdjustment + airportPremium + emergencyPremium
  const total = subtotal - discountAmount
  
  return {
    breakdown: {
      basePrice: Number(basePrice.toFixed(2)),
      securityPremium: Number(securityPremium.toFixed(2)),
      timeAdjustment: Number(timeAdjustment.toFixed(2)),
      demandAdjustment: Number(demandAdjustment.toFixed(2)),
      serviceLevelAdjustment: Number(serviceLevelAdjustment.toFixed(2)),
      airportPremium: Number(airportPremium.toFixed(2)),
      emergencyPremium: Number(emergencyPremium.toFixed(2)),
      discountAmount: Number(discountAmount.toFixed(2)),
      subtotal: Number(subtotal.toFixed(2)),
      total: Number(total.toFixed(2))
    },
    factors: {
      securityRisk: routeRisk.overallRisk,
      timeMultiplier,
      demandMultiplier,
      serviceMultiplier,
      isAirportTransfer: airportInfo.isAirport,
      corporateDiscount
    },
    analysis: routeRisk
  }
}

// Helper functions
function getRiskScore(risk: 'low' | 'medium' | 'high'): number {
  return risk === 'high' ? 85 : risk === 'medium' ? 65 : 35
}

function generateSecurityRecommendations(risk: 'low' | 'medium' | 'high'): string[] {
  const common = ['GPS tracking active', 'Emergency contact available', 'SIA licensed driver']
  
  if (risk === 'high') {
    return [...common, 'Enhanced route monitoring', 'Regular check-ins required', 'Alternative routes prepared']
  }
  
  if (risk === 'medium') {
    return [...common, 'Route monitoring active', 'Check-in protocols in place']
  }
  
  return common
}

function generateAlternativeRoutes(pickup: string, destination: string): string[] {
  // In production, this would use Google Maps API to find actual alternative routes
  return [
    'Primary route via main roads',
    'Alternative route via motorway',
    'Scenic route (if time permits)'
  ]
}

/**
 * Format pricing breakdown for display
 */
export function formatPricingBreakdown(breakdown: any): string {
  const lines = []
  
  lines.push(`Base Rate: £${breakdown.basePrice}`)
  if (breakdown.securityPremium > 0) lines.push(`Security Premium: +£${breakdown.securityPremium}`)
  if (breakdown.timeAdjustment > 0) lines.push(`Time Adjustment: +£${breakdown.timeAdjustment}`)
  if (breakdown.demandAdjustment > 0) lines.push(`Demand Adjustment: +£${breakdown.demandAdjustment}`)
  if (breakdown.serviceLevelAdjustment > 0) lines.push(`Service Level: +£${breakdown.serviceLevelAdjustment}`)
  if (breakdown.airportPremium > 0) lines.push(`Airport Premium: +£${breakdown.airportPremium}`)
  if (breakdown.emergencyPremium > 0) lines.push(`Emergency Premium: +£${breakdown.emergencyPremium}`)
  if (breakdown.discountAmount > 0) lines.push(`Corporate Discount: -£${breakdown.discountAmount}`)
  
  lines.push(`Total: £${breakdown.total}`)
  
  return lines.join('\n')
}