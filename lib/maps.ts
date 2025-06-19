// Google Maps integration for GQ Cars route optimization and distance calculations

import { Client } from '@googlemaps/google-maps-services-js'

export interface RouteCalculationResult {
  distance: number // in miles
  duration: number // in minutes
  durationWithTraffic: number // in minutes with current traffic
  route: string
  waypoints: string[]
  trafficLevel: 'light' | 'moderate' | 'heavy'
  securityScore: number
  polyline?: string
}

export interface GoogleMapsConfig {
  apiKey: string
  units: 'metric' | 'imperial'
  language: string
  region: string
}

const DEFAULT_CONFIG: GoogleMapsConfig = {
  apiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  units: 'imperial',
  language: 'en',
  region: 'uk'
}

/**
 * Calculate route with distance, duration, and traffic information
 */
export async function calculateRoute(
  pickup: string,
  destination: string,
  config: GoogleMapsConfig = DEFAULT_CONFIG
): Promise<RouteCalculationResult> {
  if (!config.apiKey) {
    // Fallback to mock data if no API key
    return generateMockRouteData(pickup, destination)
  }

  try {
    const client = new Client({})
    
    // Get distance matrix for basic distance/duration
    const distanceResponse = await client.distancematrix({
      params: {
        origins: [pickup],
        destinations: [destination],
        units: config.units as any,
        departure_time: new Date(), // For traffic-aware duration
        traffic_model: 'best_guess' as any,
        key: config.apiKey
      }
    })

    // Get detailed directions for route information
    const directionsResponse = await client.directions({
      params: {
        origin: pickup,
        destination,
        departure_time: new Date(),
        traffic_model: 'best_guess' as any,
        alternatives: true,
        key: config.apiKey
      }
    })

    const distanceElement = distanceResponse.data.rows[0]?.elements[0]
    const route = directionsResponse.data.routes[0]

    if (!distanceElement || !route || distanceElement.status !== 'OK') {
      throw new Error('Unable to calculate route')
    }

    // Convert to miles if metric
    const distanceInMiles = config.units === 'metric' 
      ? distanceElement.distance.value * 0.000621371 
      : distanceElement.distance.value / 5280

    const durationInMinutes = distanceElement.duration.value / 60
    const durationWithTrafficInMinutes = distanceElement.duration_in_traffic 
      ? distanceElement.duration_in_traffic.value / 60 
      : durationInMinutes

    // Calculate traffic level based on duration difference
    const trafficDelay = durationWithTrafficInMinutes - durationInMinutes
    const trafficLevel = getTrafficLevel(trafficDelay / durationInMinutes)

    // Extract waypoints from route
    const waypoints = extractWaypoints(route)

    // Calculate security score based on route
    const securityScore = await calculateRouteSecurityScore(pickup, destination, route)

    return {
      distance: Number(distanceInMiles.toFixed(2)),
      duration: Math.round(durationInMinutes),
      durationWithTraffic: Math.round(durationWithTrafficInMinutes),
      route: `${pickup} → ${destination}`,
      waypoints,
      trafficLevel,
      securityScore,
      polyline: route.overview_polyline.points
    }

  } catch (error) {
    console.error('Google Maps API error:', error)
    // Fallback to mock data
    return generateMockRouteData(pickup, destination)
  }
}

/**
 * Get multiple route alternatives with optimization
 */
export async function getRouteAlternatives(
  pickup: string,
  destination: string,
  securityPriority: 'low' | 'medium' | 'high' = 'medium',
  config: GoogleMapsConfig = DEFAULT_CONFIG
): Promise<RouteCalculationResult[]> {
  if (!config.apiKey) {
    return [await generateMockRouteData(pickup, destination)]
  }

  try {
    const client = new Client({})
    
    const directionsResponse = await client.directions({
      params: {
        origin: pickup,
        destination,
        departure_time: new Date(),
        traffic_model: 'best_guess' as any,
        alternatives: true, // Get alternative routes
        key: config.apiKey
      }
    })

    const routes = directionsResponse.data.routes
    const alternatives: RouteCalculationResult[] = []

    for (let i = 0; i < Math.min(routes.length, 3); i++) {
      const route = routes[i]
      const leg = route.legs[0]

      if (!leg) continue

      const distanceInMiles = leg.distance.value * 0.000621371
      const durationInMinutes = leg.duration.value / 60
      const durationWithTrafficInMinutes = leg.duration_in_traffic 
        ? leg.duration_in_traffic.value / 60 
        : durationInMinutes

      const trafficDelay = durationWithTrafficInMinutes - durationInMinutes
      const trafficLevel = getTrafficLevel(trafficDelay / durationInMinutes)
      const waypoints = extractWaypoints(route)
      const securityScore = await calculateRouteSecurityScore(pickup, destination, route)

      alternatives.push({
        distance: Number(distanceInMiles.toFixed(2)),
        duration: Math.round(durationInMinutes),
        durationWithTraffic: Math.round(durationWithTrafficInMinutes),
        route: `${pickup} → ${destination} (Route ${i + 1})`,
        waypoints,
        trafficLevel,
        securityScore,
        polyline: route.overview_polyline.points
      })
    }

    // Sort routes based on security priority
    return sortRoutesBySecurity(alternatives, securityPriority)

  } catch (error) {
    console.error('Google Maps API error:', error)
    return [await generateMockRouteData(pickup, destination)]
  }
}

/**
 * Geocode an address to get coordinates
 */
export async function geocodeAddress(
  address: string,
  config: GoogleMapsConfig = DEFAULT_CONFIG
): Promise<{ lat: number; lng: number; formattedAddress: string } | null> {
  if (!config.apiKey) return null

  try {
    const client = new Client({})
    
    const response = await client.geocode({
      params: {
        address,
        key: config.apiKey,
        region: config.region
      }
    })

    const result = response.data.results[0]
    if (!result) return null

    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address
    }

  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Get real-time traffic information for a route
 */
export async function getTrafficInformation(
  pickup: string,
  destination: string,
  config: GoogleMapsConfig = DEFAULT_CONFIG
): Promise<{
  currentDelay: number
  trafficLevel: 'light' | 'moderate' | 'heavy'
  incidents: string[]
  recommendedDepartureTime?: string
}> {
  try {
    const routeData = await calculateRoute(pickup, destination, config)
    
    const delay = routeData.durationWithTraffic - routeData.duration
    const incidents = await getTrafficIncidents(pickup, destination)
    
    // Calculate optimal departure time (simplified)
    const recommendedDepartureTime = getOptimalDepartureTime()

    return {
      currentDelay: delay,
      trafficLevel: routeData.trafficLevel,
      incidents,
      recommendedDepartureTime
    }

  } catch (error) {
    console.error('Traffic information error:', error)
    return {
      currentDelay: 0,
      trafficLevel: 'moderate',
      incidents: [],
    }
  }
}

/**
 * Find nearby points of interest for security purposes
 */
export async function findSecurityPoints(
  lat: number,
  lng: number,
  radius: number = 1000,
  config: GoogleMapsConfig = DEFAULT_CONFIG
): Promise<Array<{
  name: string
  type: string
  location: { lat: number; lng: number }
  distance: number
}>> {
  if (!config.apiKey) return []

  try {
    const client = new Client({})
    
    const response = await client.placesNearby({
      params: {
        location: { lat, lng },
        radius,
        type: 'police', // Focus on security-relevant places
        key: config.apiKey
      }
    })

    return response.data.results.map(place => ({
      name: place.name || 'Unknown',
      type: place.types?.[0] || 'unknown',
      location: {
        lat: place.geometry?.location?.lat || 0,
        lng: place.geometry?.location?.lng || 0
      },
      distance: calculateDistance(
        lat, lng,
        place.geometry?.location?.lat || 0,
        place.geometry?.location?.lng || 0
      )
    }))

  } catch (error) {
    console.error('Places API error:', error)
    return []
  }
}

// Helper functions

function getTrafficLevel(delayRatio: number): 'light' | 'moderate' | 'heavy' {
  if (delayRatio > 0.3) return 'heavy'    // 30%+ delay
  if (delayRatio > 0.15) return 'moderate' // 15%+ delay
  return 'light'
}

function extractWaypoints(route: any): string[] {
  const waypoints: string[] = []
  
  // Extract major roads from route steps
  route.legs?.[0]?.steps?.forEach((step: any) => {
    const instruction = step.html_instructions || ''
    
    // Extract road names from turn instructions
    const roadMatch = instruction.match(/on\s+([AB]\d+|M\d+|[A-Z]\d+[A-Z]?\d*)/)
    if (roadMatch && roadMatch[1]) {
      const road = roadMatch[1]
      if (!waypoints.includes(road)) {
        waypoints.push(road)
      }
    }
  })
  
  return waypoints.slice(0, 5) // Limit to 5 major waypoints
}

async function calculateRouteSecurityScore(
  pickup: string,
  destination: string,
  route: any
): Promise<number> {
  // Base security assessment
  let score = 75
  
  // Analyze route through different areas
  const steps = route.legs?.[0]?.steps || []
  
  for (const step of steps) {
    const instruction = step.html_instructions || ''
    
    // Check for high-risk areas mentioned in instructions
    if (/hackney|tower hamlets|newham|southwark|elephant/i.test(instruction)) {
      score -= 15
    } else if (/kensington|chelsea|mayfair|belgravia/i.test(instruction)) {
      score += 10
    }
    
    // Check for main roads vs side streets
    if (/motorway|highway|main road/i.test(instruction)) {
      score += 5 // Main roads are generally safer
    }
  }
  
  // Route duration factor (longer routes = more exposure)
  const durationHours = route.legs[0].duration.value / 3600
  if (durationHours > 2) score -= 10
  else if (durationHours < 0.5) score += 5
  
  return Math.max(0, Math.min(100, score))
}

function sortRoutesBySecurity(
  routes: RouteCalculationResult[],
  priority: 'low' | 'medium' | 'high'
): RouteCalculationResult[] {
  return routes.sort((a, b) => {
    if (priority === 'high') {
      // Prioritize security score over time/distance
      return b.securityScore - a.securityScore
    } else if (priority === 'medium') {
      // Balance security and efficiency
      const aScore = (a.securityScore * 0.6) + ((60 - a.durationWithTraffic) * 0.4)
      const bScore = (b.securityScore * 0.6) + ((60 - b.durationWithTraffic) * 0.4)
      return bScore - aScore
    } else {
      // Prioritize speed/efficiency
      return a.durationWithTraffic - b.durationWithTraffic
    }
  })
}

async function getTrafficIncidents(pickup: string, destination: string): Promise<string[]> {
  // Mock implementation - in production, integrate with traffic APIs
  const incidents = [
    'A40 - Minor delays due to roadworks',
    'M25 - Heavy traffic between J15-J16',
    'Central London - Congestion charge zone active'
  ]
  
  return incidents.slice(0, Math.floor(Math.random() * 3))
}

function getOptimalDepartureTime(): string {
  const now = new Date()
  const optimal = new Date(now.getTime() - (15 * 60 * 1000)) // 15 minutes earlier
  return optimal.toISOString()
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
           Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c * 1000 // Return distance in meters
}

// Mock data generation for fallback
async function generateMockRouteData(pickup: string, destination: string): Promise<RouteCalculationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const distance = Math.random() * 25 + 5 // 5-30 miles
  const baseDuration = distance * 2.5 // Base time in minutes
  const trafficMultiplier = 0.8 + Math.random() * 0.6 // 0.8 - 1.4x
  const durationWithTraffic = baseDuration * trafficMultiplier
  
  return {
    distance: Number(distance.toFixed(2)),
    duration: Math.round(baseDuration),
    durationWithTraffic: Math.round(durationWithTraffic),
    route: `${pickup} → ${destination}`,
    waypoints: ['A40', 'M25', 'A4'].slice(0, Math.floor(Math.random() * 3) + 1),
    trafficLevel: getTrafficLevel((trafficMultiplier - 1)),
    securityScore: 65 + Math.random() * 30 // 65-95 score
  }
}

/**
 * Validate UK postcode format
 */
export function isValidUKPostcode(postcode: string): boolean {
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i
  return ukPostcodeRegex.test(postcode.trim())
}

/**
 * Format address for API calls
 */
export function formatAddressForAPI(address: string): string {
  return address.trim().replace(/\s+/g, ' ')
}

/**
 * Get estimated arrival time
 */
export function getEstimatedArrival(
  departureTime: Date,
  durationMinutes: number
): Date {
  return new Date(departureTime.getTime() + (durationMinutes * 60 * 1000))
}