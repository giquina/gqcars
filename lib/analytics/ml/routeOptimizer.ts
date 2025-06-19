import { RouteAnalysis, RouteOption, SecurityIncident } from '../types'
import { mean, standardDeviation } from 'simple-statistics'

interface Coordinates {
  lat: number
  lng: number
}

interface ThreatZone {
  center: Coordinates
  radius: number // in meters
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  type: 'crime_hotspot' | 'traffic_accident' | 'protest' | 'construction' | 'flood'
  activeUntil?: string
}

interface TrafficData {
  segmentId: string
  coordinates: Coordinates[]
  congestionLevel: number // 0-100
  averageSpeed: number // km/h
  incidents: string[]
  lastUpdated: string
}

interface SecurityAsset {
  location: Coordinates
  type: 'police_station' | 'hospital' | 'security_checkpoint' | 'safe_house'
  responseTime: number // minutes
  availability: boolean
}

export class RouteOptimizer {
  private threatZones: ThreatZone[] = []
  private trafficData: TrafficData[] = []
  private securityAssets: SecurityAsset[] = []
  private historicalIncidents: SecurityIncident[] = []

  constructor() {
    this.initializeSecurityData()
  }

  /**
   * Analyze and optimize route with security priority
   */
  async analyzeRoute(
    origin: string,
    destination: string,
    serviceType: string = 'standard',
    timeOfDay: string = new Date().toISOString(),
    securityLevel: 'standard' | 'high' | 'executive' = 'standard'
  ): Promise<RouteAnalysis> {
    
    const originCoords = await this.geocodeLocation(origin)
    const destinationCoords = await this.geocodeLocation(destination)
    
    // Generate multiple route options
    const routeOptions = await this.generateRouteOptions(
      originCoords, 
      destinationCoords, 
      securityLevel
    )

    // Score each route for security and efficiency
    const scoredRoutes = routeOptions.map(route => 
      this.scoreRoute(route, securityLevel, timeOfDay)
    )

    // Select optimal route based on security priority
    const optimalRoute = this.selectOptimalRoute(scoredRoutes, securityLevel)
    
    // Generate comprehensive security analysis
    const securityScore = this.calculateOverallSecurityScore(scoredRoutes)
    const trafficScore = this.calculateTrafficScore(scoredRoutes)
    const riskFactors = this.identifyRiskFactors(optimalRoute, timeOfDay)
    const securityRecommendations = this.generateSecurityRecommendations(
      optimalRoute, 
      securityLevel, 
      riskFactors
    )

    return {
      id: `route_${Date.now()}_${origin}_${destination}`,
      origin,
      destination,
      routeOptions: scoredRoutes,
      securityScore,
      trafficScore,
      optimalRoute: optimalRoute.id,
      estimatedTime: optimalRoute.estimatedTime,
      riskFactors,
      securityRecommendations,
      alternativeRoutes: scoredRoutes
        .filter(route => route.id !== optimalRoute.id)
        .sort((a, b) => b.securityScore - a.securityScore)
        .slice(0, 3)
        .map(route => route.id),
      createdAt: new Date().toISOString()
    }
  }

  /**
   * Real-time route monitoring and adjustment
   */
  async monitorRoute(
    routeId: string,
    currentLocation: Coordinates,
    destination: Coordinates
  ): Promise<{
    needsRerouting: boolean
    newThreats: ThreatZone[]
    recommendations: string[]
    alternativeRoute?: RouteOption
  }> {
    
    const activeThreats = this.getActiveThreatsNearRoute(currentLocation, destination)
    const trafficUpdates = this.getTrafficUpdates(currentLocation, destination)
    
    const needsRerouting = this.assessReroutingNeed(activeThreats, trafficUpdates)
    
    let alternativeRoute
    if (needsRerouting) {
      const alternatives = await this.generateRouteOptions(
        currentLocation, 
        destination, 
        'high'
      )
      alternativeRoute = alternatives[0]
    }

    return {
      needsRerouting,
      newThreats: activeThreats,
      recommendations: this.generateRealTimeRecommendations(
        activeThreats, 
        trafficUpdates, 
        needsRerouting
      ),
      alternativeRoute
    }
  }

  /**
   * Predict route risks based on historical data
   */
  predictRouteRisks(
    routeCoordinates: Coordinates[],
    timeOfDay: string,
    dayOfWeek: string
  ): {
    overallRisk: number
    riskBySegment: number[]
    predictedIncidents: string[]
    confidence: number
  } {
    
    const historicalRisks = this.analyzeHistoricalIncidents(
      routeCoordinates, 
      timeOfDay, 
      dayOfWeek
    )
    
    const segmentRisks = routeCoordinates.map((coord, index) => {
      if (index === routeCoordinates.length - 1) return 0
      
      const nextCoord = routeCoordinates[index + 1]
      return this.calculateSegmentRisk(coord, nextCoord, timeOfDay)
    })

    const overallRisk = mean(segmentRisks)
    
    return {
      overallRisk,
      riskBySegment: segmentRisks,
      predictedIncidents: this.predictLikelyIncidents(
        routeCoordinates, 
        timeOfDay, 
        historicalRisks
      ),
      confidence: this.calculateRiskPredictionConfidence(historicalRisks.length)
    }
  }

  private async generateRouteOptions(
    origin: Coordinates,
    destination: Coordinates,
    securityLevel: string
  ): Promise<RouteOption[]> {
    
    // Generate multiple route algorithms
    const fastestRoute = this.generateFastestRoute(origin, destination)
    const secureRoute = this.generateSecureRoute(origin, destination)
    const balancedRoute = this.generateBalancedRoute(origin, destination)
    
    const routes = [fastestRoute, secureRoute, balancedRoute]
    
    // Add security-specific routes for high-security services
    if (securityLevel === 'high' || securityLevel === 'executive') {
      const securityAssetRoute = this.generateSecurityAssetRoute(origin, destination)
      const avoidanceRoute = this.generateThreatAvoidanceRoute(origin, destination)
      routes.push(securityAssetRoute, avoidanceRoute)
    }

    return routes
  }

  private generateFastestRoute(origin: Coordinates, destination: Coordinates): RouteOption {
    // Simulate fastest route calculation
    const distance = this.calculateDistance(origin, destination)
    const estimatedTime = Math.round(distance / 50 * 60) // Assuming 50 km/h average
    
    return {
      id: `fastest_${Date.now()}`,
      path: this.generateRoutePath(origin, destination, 'fastest'),
      distance,
      estimatedTime,
      securityScore: 60, // Average security for fastest routes
      trafficScore: 85,   // Good traffic flow
      tollCost: this.calculateTolls(distance),
      fuelCost: this.calculateFuelCost(distance),
      riskLevel: 'medium',
      securityFeatures: ['main_roads', 'well_lit']
    }
  }

  private generateSecureRoute(origin: Coordinates, destination: Coordinates): RouteOption {
    const distance = this.calculateDistance(origin, destination) * 1.15 // 15% longer for security
    const estimatedTime = Math.round(distance / 45 * 60) // Slightly slower for security
    
    return {
      id: `secure_${Date.now()}`,
      path: this.generateRoutePath(origin, destination, 'secure'),
      distance,
      estimatedTime,
      securityScore: 95, // High security
      trafficScore: 70,  // May have some congestion
      tollCost: this.calculateTolls(distance),
      fuelCost: this.calculateFuelCost(distance),
      riskLevel: 'low',
      securityFeatures: [
        'police_presence',
        'cctv_coverage',
        'well_lit',
        'minimal_stops',
        'security_checkpoints'
      ]
    }
  }

  private generateBalancedRoute(origin: Coordinates, destination: Coordinates): RouteOption {
    const distance = this.calculateDistance(origin, destination) * 1.05 // 5% longer
    const estimatedTime = Math.round(distance / 48 * 60)
    
    return {
      id: `balanced_${Date.now()}`,
      path: this.generateRoutePath(origin, destination, 'balanced'),
      distance,
      estimatedTime,
      securityScore: 80,
      trafficScore: 80,
      tollCost: this.calculateTolls(distance),
      fuelCost: this.calculateFuelCost(distance),
      riskLevel: 'low',
      securityFeatures: ['main_roads', 'well_lit', 'police_presence']
    }
  }

  private generateSecurityAssetRoute(origin: Coordinates, destination: Coordinates): RouteOption {
    // Route that passes near security assets
    const nearbyAssets = this.findNearbySecurityAssets(origin, destination)
    const distance = this.calculateDistance(origin, destination) * 1.2 // 20% longer
    const estimatedTime = Math.round(distance / 42 * 60)
    
    return {
      id: `security_asset_${Date.now()}`,
      path: this.generateRoutePath(origin, destination, 'security_assets'),
      distance,
      estimatedTime,
      securityScore: 98,
      trafficScore: 65,
      tollCost: this.calculateTolls(distance),
      fuelCost: this.calculateFuelCost(distance),
      riskLevel: 'low',
      securityFeatures: [
        'police_stations_nearby',
        'hospital_access',
        'security_checkpoints',
        'emergency_services',
        'well_lit'
      ]
    }
  }

  private generateThreatAvoidanceRoute(origin: Coordinates, destination: Coordinates): RouteOption {
    // Route that actively avoids known threat zones
    const distance = this.calculateDistance(origin, destination) * 1.3 // 30% longer
    const estimatedTime = Math.round(distance / 40 * 60)
    
    return {
      id: `threat_avoidance_${Date.now()}`,
      path: this.generateRoutePath(origin, destination, 'threat_avoidance'),
      distance,
      estimatedTime,
      securityScore: 100,
      trafficScore: 55,
      tollCost: this.calculateTolls(distance),
      fuelCost: this.calculateFuelCost(distance),
      riskLevel: 'low',
      securityFeatures: [
        'threat_zone_avoidance',
        'multiple_exit_routes',
        'police_presence',
        'cctv_coverage',
        'minimal_exposure'
      ]
    }
  }

  private scoreRoute(route: RouteOption, securityLevel: string, timeOfDay: string): RouteOption {
    // Additional scoring based on current conditions
    let securityAdjustment = 0
    let trafficAdjustment = 0

    // Time-based adjustments
    const hour = new Date(timeOfDay).getHours()
    if (hour >= 22 || hour <= 6) {
      securityAdjustment -= 10 // Night time reduces security
      trafficAdjustment += 15   // Less traffic at night
    }

    // Check for active threats along route
    const routeThreats = this.getThreatsAlongRoute(route.path)
    securityAdjustment -= routeThreats.length * 15

    // Update scores
    route.securityScore = Math.max(0, Math.min(100, route.securityScore + securityAdjustment))
    route.trafficScore = Math.max(0, Math.min(100, route.trafficScore + trafficAdjustment))

    return route
  }

  private selectOptimalRoute(routes: RouteOption[], securityLevel: string): RouteOption {
    // Weight factors based on security level
    const weights = {
      standard: { security: 0.3, traffic: 0.4, time: 0.3 },
      high: { security: 0.6, traffic: 0.2, time: 0.2 },
      executive: { security: 0.8, traffic: 0.1, time: 0.1 }
    }

    const weight = weights[securityLevel as keyof typeof weights] || weights.standard

    return routes.reduce((best, current) => {
      const currentScore = 
        (current.securityScore * weight.security) +
        (current.trafficScore * weight.traffic) +
        ((120 - current.estimatedTime) * weight.time) // Invert time (lower is better)

      const bestScore = 
        (best.securityScore * weight.security) +
        (best.trafficScore * weight.traffic) +
        ((120 - best.estimatedTime) * weight.time)

      return currentScore > bestScore ? current : best
    })
  }

  private calculateOverallSecurityScore(routes: RouteOption[]): number {
    const scores = routes.map(route => route.securityScore)
    return Math.round(mean(scores))
  }

  private calculateTrafficScore(routes: RouteOption[]): number {
    const scores = routes.map(route => route.trafficScore)
    return Math.round(mean(scores))
  }

  private identifyRiskFactors(route: RouteOption, timeOfDay: string): string[] {
    const risks: string[] = []
    
    if (route.securityScore < 70) {
      risks.push('Lower security route')
    }
    
    if (route.trafficScore < 60) {
      risks.push('Heavy traffic expected')
    }

    const hour = new Date(timeOfDay).getHours()
    if (hour >= 22 || hour <= 6) {
      risks.push('Night time travel')
    }

    if (route.riskLevel === 'high') {
      risks.push('High-risk areas on route')
    }

    const threatsNearRoute = this.getThreatsAlongRoute(route.path)
    if (threatsNearRoute.length > 0) {
      risks.push(`${threatsNearRoute.length} active threat(s) near route`)
    }

    return risks
  }

  private generateSecurityRecommendations(
    route: RouteOption,
    securityLevel: string,
    riskFactors: string[]
  ): string[] {
    const recommendations: string[] = []

    if (securityLevel === 'executive') {
      recommendations.push('Deploy security escort vehicle')
      recommendations.push('Maintain constant communication with control center')
    }

    if (riskFactors.includes('Night time travel')) {
      recommendations.push('Use well-lit main roads only')
      recommendations.push('Avoid stops unless absolutely necessary')
    }

    if (route.securityScore < 80) {
      recommendations.push('Consider alternative route with higher security score')
      recommendations.push('Brief driver on specific security protocols')
    }

    if (riskFactors.some(risk => risk.includes('threat'))) {
      recommendations.push('Monitor route in real-time for threat updates')
      recommendations.push('Have backup routes ready')
    }

    recommendations.push('Verify client identity before departure')
    recommendations.push('Confirm arrival with control center')

    return recommendations
  }

  // Helper methods
  private async geocodeLocation(location: string): Promise<Coordinates> {
    // Simulate geocoding - in real implementation, use Google Maps API
    const mockCoordinates: { [key: string]: Coordinates } = {
      'london': { lat: 51.5074, lng: -0.1278 },
      'heathrow': { lat: 51.4700, lng: -0.4543 },
      'watford': { lat: 51.6557, lng: -0.3967 },
      'canary wharf': { lat: 51.5054, lng: -0.0235 }
    }
    
    const key = location.toLowerCase()
    return mockCoordinates[key] || { lat: 51.5074, lng: -0.1278 }
  }

  private calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    // Haversine formula for distance calculation
    const R = 6371 // Earth's radius in km
    const dLat = this.toRadians(coord2.lat - coord1.lat)
    const dLng = this.toRadians(coord2.lng - coord1.lng)
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(this.toRadians(coord1.lat)) * Math.cos(this.toRadians(coord2.lat)) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  private generateRoutePath(origin: Coordinates, destination: Coordinates, type: string): string {
    return `${type}_route_${origin.lat}_${origin.lng}_to_${destination.lat}_${destination.lng}`
  }

  private calculateTolls(distance: number): number {
    return Math.round(distance * 0.1) // £0.10 per km estimate
  }

  private calculateFuelCost(distance: number): number {
    return Math.round(distance * 0.15) // £0.15 per km estimate
  }

  private getThreatsAlongRoute(routePath: string): ThreatZone[] {
    // Simulate threat detection along route
    return this.threatZones.filter(threat => 
      Math.random() < 0.1 // 10% chance of threat near any route
    )
  }

  private initializeSecurityData(): void {
    // Initialize with sample security data
    this.threatZones = [
      {
        center: { lat: 51.5155, lng: -0.0922 },
        radius: 500,
        threatLevel: 'medium',
        type: 'crime_hotspot'
      }
    ]

    this.securityAssets = [
      {
        location: { lat: 51.5194, lng: -0.1270 },
        type: 'police_station',
        responseTime: 3,
        availability: true
      }
    ]
  }

  private getActiveThreatsNearRoute(current: Coordinates, destination: Coordinates): ThreatZone[] {
    return this.threatZones.filter(threat => {
      const distanceFromCurrent = this.calculateDistance(current, threat.center)
      const distanceFromDestination = this.calculateDistance(destination, threat.center)
      return distanceFromCurrent < 2 || distanceFromDestination < 2 // Within 2km
    })
  }

  private getTrafficUpdates(current: Coordinates, destination: Coordinates): TrafficData[] {
    // Simulate real-time traffic data
    return []
  }

  private assessReroutingNeed(threats: ThreatZone[], traffic: TrafficData[]): boolean {
    const highThreats = threats.filter(t => t.threatLevel === 'high' || t.threatLevel === 'critical')
    return highThreats.length > 0
  }

  private generateRealTimeRecommendations(
    threats: ThreatZone[], 
    traffic: TrafficData[], 
    needsRerouting: boolean
  ): string[] {
    const recommendations: string[] = []
    
    if (needsRerouting) {
      recommendations.push('Immediate rerouting recommended due to security threats')
    }
    
    if (threats.length > 0) {
      recommendations.push('Maintain heightened awareness - threats detected in area')
    }
    
    return recommendations
  }

  private findNearbySecurityAssets(origin: Coordinates, destination: Coordinates): SecurityAsset[] {
    return this.securityAssets.filter(asset => {
      const distanceFromOrigin = this.calculateDistance(origin, asset.location)
      const distanceFromDestination = this.calculateDistance(destination, asset.location)
      return distanceFromOrigin < 5 || distanceFromDestination < 5 // Within 5km
    })
  }

  private analyzeHistoricalIncidents(
    route: Coordinates[], 
    timeOfDay: string, 
    dayOfWeek: string
  ): SecurityIncident[] {
    // Filter historical incidents relevant to this route and time
    return this.historicalIncidents.filter(incident => {
      const incidentTime = new Date(incident.timestamp)
      const routeTime = new Date(timeOfDay)
      
      // Same hour of day and day of week
      return incidentTime.getHours() === routeTime.getHours() &&
             incidentTime.toDateString() === routeTime.toDateString()
    })
  }

  private calculateSegmentRisk(coord1: Coordinates, coord2: Coordinates, timeOfDay: string): number {
    // Calculate risk for a route segment based on historical data
    const nearbyIncidents = this.historicalIncidents.filter(incident => {
      const incidentCoord = incident.coordinates
      const distanceToSegment = Math.min(
        this.calculateDistance(coord1, incidentCoord),
        this.calculateDistance(coord2, incidentCoord)
      )
      return distanceToSegment < 1 // Within 1km of segment
    })

    // Risk based on incident density and severity
    const baseRisk = nearbyIncidents.length * 10
    const severityMultiplier = nearbyIncidents.reduce((acc, incident) => {
      const multipliers = { low: 1, medium: 2, high: 3, critical: 5 }
      return acc + multipliers[incident.severity]
    }, 0)

    return Math.min(100, baseRisk + severityMultiplier)
  }

  private predictLikelyIncidents(
    route: Coordinates[], 
    timeOfDay: string, 
    historicalData: SecurityIncident[]
  ): string[] {
    const incidentTypes = new Map<string, number>()
    
    historicalData.forEach(incident => {
      incidentTypes.set(incident.type, (incidentTypes.get(incident.type) || 0) + 1)
    })

    return Array.from(incidentTypes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type]) => type)
  }

  private calculateRiskPredictionConfidence(historicalDataPoints: number): number {
    if (historicalDataPoints < 10) return 0.3
    if (historicalDataPoints < 50) return 0.6
    if (historicalDataPoints < 100) return 0.8
    return 0.9
  }
}