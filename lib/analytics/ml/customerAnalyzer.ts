import { CustomerBehavior, BookingData, RecommendationEngine } from '../types'
import { mean, median, standardDeviation } from 'simple-statistics'
import { format, differenceInDays, startOfMonth, endOfMonth } from 'date-fns'

interface CustomerSegment {
  id: string
  name: string
  characteristics: string[]
  avgBookingValue: number
  avgFrequency: number
  churnRate: number
  lifetimeValue: number
}

interface BehaviorPattern {
  type: 'time_preference' | 'location_preference' | 'service_preference' | 'seasonal'
  pattern: string
  confidence: number
  frequency: number
}

export class CustomerAnalyzer {
  private customers: Map<string, CustomerBehavior> = new Map()
  private bookingHistory: BookingData[] = []
  private segments: CustomerSegment[] = []

  constructor(bookingHistory: BookingData[]) {
    this.bookingHistory = bookingHistory
    this.initializeCustomerProfiles()
    this.createCustomerSegments()
  }

  /**
   * Analyze individual customer behavior and predict patterns
   */
  analyzeCustomer(customerId: string): CustomerBehavior | null {
    const customer = this.customers.get(customerId)
    if (!customer) return null

    const customerBookings = this.getCustomerBookings(customerId)
    const behaviorPatterns = this.identifyBehaviorPatterns(customerBookings)
    const churnRisk = this.calculateChurnRisk(customerBookings, behaviorPatterns)
    const lifetimeValue = this.calculateLifetimeValue(customerBookings)
    const nextBookingPrediction = this.predictNextBooking(customerBookings, behaviorPatterns)

    return {
      ...customer,
      churnRisk,
      lifetimeValue,
      behaviorPattern: this.categorizeBehaviorPattern(customerBookings),
      nextBookingPrediction,
      loyaltyScore: this.calculateLoyaltyScore(customerBookings, churnRisk),
      preferredServices: this.extractPreferredServices(customerBookings),
      preferredTimes: this.extractPreferredTimes(customerBookings),
      preferredLocations: this.extractPreferredLocations(customerBookings)
    }
  }

  /**
   * Generate personalized recommendations for a customer
   */
  generateRecommendations(customerId: string): RecommendationEngine {
    const customer = this.analyzeCustomer(customerId)
    if (!customer) {
      throw new Error(`Customer ${customerId} not found`)
    }

    const serviceRecommendations = this.generateServiceRecommendations(customer)
    const personalizedPricing = this.calculatePersonalizedPricing(customer)
    const optimalTiming = this.suggestOptimalTiming(customer)

    return {
      customerId,
      recommendations: serviceRecommendations,
      personalizedPricing,
      optimalTiming
    }
  }

  /**
   * Segment customers based on behavior and value
   */
  segmentCustomers(): CustomerSegment[] {
    const segments: CustomerSegment[] = [
      this.createVIPSegment(),
      this.createRegularBusinessSegment(),
      this.createOccasionalUserSegment(),
      this.createHighRiskSegment(),
      this.createNewCustomerSegment()
    ]

    return segments.map(segment => ({
      ...segment,
      characteristics: this.refineSegmentCharacteristics(segment)
    }))
  }

  /**
   * Predict customer lifetime value
   */
  predictCustomerLifetimeValue(customerId: string, months: number = 24): {
    predictedValue: number
    confidence: number
    factors: {
      historical: number
      trend: number
      loyalty: number
      segment: number
    }
  } {
    const customer = this.analyzeCustomer(customerId)
    if (!customer) {
      throw new Error(`Customer ${customerId} not found`)
    }

    const customerBookings = this.getCustomerBookings(customerId)
    const monthlyAverage = this.calculateMonthlyAverageValue(customerBookings)
    const trendMultiplier = this.calculateValueTrend(customerBookings)
    const loyaltyBonus = Math.max(1, customer.loyaltyScore / 100)
    const segmentMultiplier = this.getSegmentMultiplier(customer)

    const predictedValue = monthlyAverage * months * trendMultiplier * loyaltyBonus * segmentMultiplier
    const confidence = this.calculatePredictionConfidence(customerBookings, customer)

    return {
      predictedValue: Math.round(predictedValue),
      confidence,
      factors: {
        historical: monthlyAverage,
        trend: trendMultiplier,
        loyalty: loyaltyBonus,
        segment: segmentMultiplier
      }
    }
  }

  /**
   * Identify at-risk customers for retention campaigns
   */
  identifyAtRiskCustomers(): {
    customerId: string
    churnRisk: number
    daysSinceLastBooking: number
    recommendedActions: string[]
    urgency: 'low' | 'medium' | 'high' | 'critical'
  }[] {
    const atRiskCustomers: any[] = []

    this.customers.forEach((customer, customerId) => {
      const customerBookings = this.getCustomerBookings(customerId)
      const lastBooking = customerBookings[customerBookings.length - 1]
      const daysSinceLastBooking = lastBooking 
        ? differenceInDays(new Date(), new Date(lastBooking.date))
        : 365

      if (customer.churnRisk > 0.3 || daysSinceLastBooking > 90) {
        const urgency = this.determineChurnUrgency(customer.churnRisk, daysSinceLastBooking)
        const recommendedActions = this.generateRetentionActions(customer, daysSinceLastBooking)

        atRiskCustomers.push({
          customerId,
          churnRisk: customer.churnRisk,
          daysSinceLastBooking,
          recommendedActions,
          urgency
        })
      }
    })

    return atRiskCustomers.sort((a, b) => b.churnRisk - a.churnRisk)
  }

  /**
   * Analyze market trends and customer preferences
   */
  analyzeMarketTrends(): {
    growingServices: string[]
    decliningServices: string[]
    peakBookingTimes: string[]
    seasonalPatterns: any[]
    customerSatisfactionTrends: any[]
  } {
    const serviceGrowth = this.calculateServiceGrowthRates()
    const timeAnalysis = this.analyzeBookingTimes()
    const seasonalAnalysis = this.analyzeSeasonalPatterns()
    const satisfactionTrends = this.analyzeSatisfactionTrends()

    return {
      growingServices: Object.entries(serviceGrowth)
        .filter(([_, growth]) => growth > 0.1)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([service]) => service),
      
      decliningServices: Object.entries(serviceGrowth)
        .filter(([_, growth]) => growth < -0.05)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3)
        .map(([service]) => service),
      
      peakBookingTimes: timeAnalysis.peakHours,
      seasonalPatterns: seasonalAnalysis,
      customerSatisfactionTrends: satisfactionTrends
    }
  }

  private initializeCustomerProfiles(): void {
    const customerMap = new Map<string, BookingData[]>()

    // Group bookings by customer
    this.bookingHistory.forEach(booking => {
      const customerId = booking.customerInfo.email
      if (!customerMap.has(customerId)) {
        customerMap.set(customerId, [])
      }
      customerMap.get(customerId)!.push(booking)
    })

    // Create customer profiles
    customerMap.forEach((bookings, customerId) => {
      const totalBookings = bookings.length
      const totalValue = bookings.reduce((sum, booking) => sum + booking.cost, 0)
      const averageBookingValue = totalValue / totalBookings

      const customer: CustomerBehavior = {
        customerId,
        totalBookings,
        averageBookingValue,
        preferredServices: [],
        preferredTimes: [],
        preferredLocations: [],
        loyaltyScore: 0,
        churnRisk: 0,
        lifetimeValue: totalValue,
        behaviorPattern: 'regular',
        nextBookingPrediction: {
          probability: 0,
          estimatedDate: '',
          suggestedService: ''
        },
        preferences: {
          preferredDrivers: [],
          specialRequirements: [],
          communicationPreference: 'email'
        }
      }

      this.customers.set(customerId, customer)
    })
  }

  private getCustomerBookings(customerId: string): BookingData[] {
    return this.bookingHistory
      .filter(booking => booking.customerInfo.email === customerId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  private identifyBehaviorPatterns(bookings: BookingData[]): BehaviorPattern[] {
    const patterns: BehaviorPattern[] = []

    // Time preferences
    const hourFrequency = new Map<number, number>()
    bookings.forEach(booking => {
      const hour = new Date(booking.date + 'T' + booking.time).getHours()
      hourFrequency.set(hour, (hourFrequency.get(hour) || 0) + 1)
    })

    const mostFrequentHour = Array.from(hourFrequency.entries())
      .sort((a, b) => b[1] - a[1])[0]

    if (mostFrequentHour && mostFrequentHour[1] > bookings.length * 0.3) {
      patterns.push({
        type: 'time_preference',
        pattern: `${mostFrequentHour[0]}:00`,
        confidence: mostFrequentHour[1] / bookings.length,
        frequency: mostFrequentHour[1]
      })
    }

    // Location preferences
    const locationFrequency = new Map<string, number>()
    bookings.forEach(booking => {
      const location = booking.location.toLowerCase()
      locationFrequency.set(location, (locationFrequency.get(location) || 0) + 1)
    })

    const mostFrequentLocation = Array.from(locationFrequency.entries())
      .sort((a, b) => b[1] - a[1])[0]

    if (mostFrequentLocation && mostFrequentLocation[1] > bookings.length * 0.4) {
      patterns.push({
        type: 'location_preference',
        pattern: mostFrequentLocation[0],
        confidence: mostFrequentLocation[1] / bookings.length,
        frequency: mostFrequentLocation[1]
      })
    }

    // Service preferences
    const serviceFrequency = new Map<string, number>()
    bookings.forEach(booking => {
      serviceFrequency.set(booking.service, (serviceFrequency.get(booking.service) || 0) + 1)
    })

    const mostFrequentService = Array.from(serviceFrequency.entries())
      .sort((a, b) => b[1] - a[1])[0]

    if (mostFrequentService && mostFrequentService[1] > bookings.length * 0.5) {
      patterns.push({
        type: 'service_preference',
        pattern: mostFrequentService[0],
        confidence: mostFrequentService[1] / bookings.length,
        frequency: mostFrequentService[1]
      })
    }

    return patterns
  }

  private calculateChurnRisk(bookings: BookingData[], patterns: BehaviorPattern[]): number {
    if (bookings.length === 0) return 1.0

    const lastBooking = bookings[bookings.length - 1]
    const daysSinceLastBooking = differenceInDays(new Date(), new Date(lastBooking.date))
    
    // Base risk factors
    let riskScore = 0

    // Recency factor
    if (daysSinceLastBooking > 180) riskScore += 0.4
    else if (daysSinceLastBooking > 90) riskScore += 0.2
    else if (daysSinceLastBooking > 30) riskScore += 0.1

    // Frequency decline
    const recentBookings = bookings.filter(booking => 
      differenceInDays(new Date(), new Date(booking.date)) <= 90
    ).length

    const historicalAverage = bookings.length / Math.max(1, 
      differenceInDays(new Date(), new Date(bookings[0].date)) / 30
    )

    if (recentBookings < historicalAverage * 0.5) riskScore += 0.3

    // Rating decline
    const recentRatings = bookings
      .filter(booking => booking.rating && differenceInDays(new Date(), new Date(booking.date)) <= 60)
      .map(booking => booking.rating!)

    if (recentRatings.length > 0) {
      const avgRecentRating = mean(recentRatings)
      if (avgRecentRating < 4.0) riskScore += 0.2
    }

    // Pattern consistency
    const patternStrength = patterns.reduce((sum, pattern) => sum + pattern.confidence, 0) / patterns.length
    if (patternStrength < 0.3) riskScore += 0.15

    return Math.min(1.0, riskScore)
  }

  private calculateLifetimeValue(bookings: BookingData[]): number {
    if (bookings.length === 0) return 0

    const totalValue = bookings.reduce((sum, booking) => sum + booking.cost, 0)
    const monthsActive = Math.max(1, 
      differenceInDays(new Date(), new Date(bookings[0].date)) / 30
    )
    
    const monthlyAverage = totalValue / monthsActive
    const growthTrend = this.calculateValueTrend(bookings)
    
    // Project 24 months forward
    return totalValue + (monthlyAverage * 24 * growthTrend)
  }

  private predictNextBooking(bookings: BookingData[], patterns: BehaviorPattern[]): {
    probability: number
    estimatedDate: string
    suggestedService: string
  } {
    if (bookings.length < 2) {
      return {
        probability: 0.1,
        estimatedDate: '',
        suggestedService: bookings[0]?.service || 'close-protection'
      }
    }

    // Calculate average booking frequency
    const intervals: number[] = []
    for (let i = 1; i < bookings.length; i++) {
      const days = differenceInDays(
        new Date(bookings[i].date),
        new Date(bookings[i - 1].date)
      )
      intervals.push(days)
    }

    const avgInterval = mean(intervals)
    const lastBookingDate = new Date(bookings[bookings.length - 1].date)
    const daysSinceLastBooking = differenceInDays(new Date(), lastBookingDate)
    
    // Probability based on typical frequency
    let probability = Math.max(0, Math.min(1, 
      (daysSinceLastBooking / avgInterval) * 0.7
    ))

    // Adjust for patterns
    const strongPatterns = patterns.filter(p => p.confidence > 0.5)
    if (strongPatterns.length > 0) probability += 0.2

    // Estimate next booking date
    const estimatedNextBooking = new Date()
    estimatedNextBooking.setDate(estimatedNextBooking.getDate() + Math.max(0, avgInterval - daysSinceLastBooking))

    // Suggest service based on preferences
    const servicePattern = patterns.find(p => p.type === 'service_preference')
    const suggestedService = servicePattern?.pattern || bookings[bookings.length - 1].service

    return {
      probability: Math.min(0.95, probability),
      estimatedDate: estimatedNextBooking.toISOString().split('T')[0],
      suggestedService
    }
  }

  private calculateLoyaltyScore(bookings: BookingData[], churnRisk: number): number {
    let score = 0

    // Tenure (0-25 points)
    const monthsActive = Math.max(1, 
      differenceInDays(new Date(), new Date(bookings[0].date)) / 30
    )
    score += Math.min(25, monthsActive * 2)

    // Frequency (0-25 points)
    const bookingsPerMonth = bookings.length / monthsActive
    score += Math.min(25, bookingsPerMonth * 10)

    // Value (0-25 points)
    const avgBookingValue = mean(bookings.map(b => b.cost))
    score += Math.min(25, (avgBookingValue / 100) * 5)

    // Satisfaction (0-25 points)
    const ratings = bookings.filter(b => b.rating).map(b => b.rating!)
    if (ratings.length > 0) {
      const avgRating = mean(ratings)
      score += (avgRating / 5) * 25
    }

    // Adjust for churn risk
    score *= (1 - churnRisk)

    return Math.round(Math.min(100, score))
  }

  private categorizeBehaviorPattern(bookings: BookingData[]): 'regular' | 'sporadic' | 'seasonal' | 'one-time' {
    if (bookings.length === 1) return 'one-time'

    const intervals: number[] = []
    for (let i = 1; i < bookings.length; i++) {
      const days = differenceInDays(
        new Date(bookings[i].date),
        new Date(bookings[i - 1].date)
      )
      intervals.push(days)
    }

    const avgInterval = mean(intervals)
    const intervalStdDev = standardDeviation(intervals)

    if (intervalStdDev / avgInterval < 0.3 && avgInterval < 60) return 'regular'
    if (intervalStdDev / avgInterval > 0.8) return 'sporadic'
    
    // Check for seasonal patterns
    const monthCounts = new Map<number, number>()
    bookings.forEach(booking => {
      const month = new Date(booking.date).getMonth()
      monthCounts.set(month, (monthCounts.get(month) || 0) + 1)
    })

    const maxMonthBookings = Math.max(...Array.from(monthCounts.values()))
    if (maxMonthBookings > bookings.length * 0.5) return 'seasonal'

    return 'sporadic'
  }

  private extractPreferredServices(bookings: BookingData[]): string[] {
    const serviceCounts = new Map<string, number>()
    
    bookings.forEach(booking => {
      serviceCounts.set(booking.service, (serviceCounts.get(booking.service) || 0) + 1)
    })

    return Array.from(serviceCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([service]) => service)
  }

  private extractPreferredTimes(bookings: BookingData[]): string[] {
    const timeCounts = new Map<string, number>()
    
    bookings.forEach(booking => {
      const hour = new Date(booking.date + 'T' + booking.time).getHours()
      const timeSlot = `${hour}:00`
      timeCounts.set(timeSlot, (timeCounts.get(timeSlot) || 0) + 1)
    })

    return Array.from(timeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([time]) => time)
  }

  private extractPreferredLocations(bookings: BookingData[]): string[] {
    const locationCounts = new Map<string, number>()
    
    bookings.forEach(booking => {
      const location = booking.location.toLowerCase()
      locationCounts.set(location, (locationCounts.get(location) || 0) + 1)
    })

    return Array.from(locationCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([location]) => location)
  }

  private generateServiceRecommendations(customer: CustomerBehavior): RecommendationEngine['recommendations'] {
    const recommendations: any[] = []

    // High-value service upgrades for VIP customers
    if (customer.lifetimeValue > 10000 && customer.loyaltyScore > 80) {
      recommendations.push({
        service: 'vip',
        confidence: 0.9,
        reason: 'Premium customer - VIP service recommended',
        expectedValue: customer.averageBookingValue * 1.5,
        urgency: 'medium'
      })
    }

    // Regular service recommendations based on history
    customer.preferredServices.forEach((service, index) => {
      if (index === 0) return // Skip most frequent service

      recommendations.push({
        service,
        confidence: 0.7 - (index * 0.1),
        reason: `Based on your booking history with ${service}`,
        expectedValue: customer.averageBookingValue,
        urgency: 'low'
      })
    })

    // Churn prevention recommendations
    if (customer.churnRisk > 0.3) {
      recommendations.push({
        service: customer.preferredServices[0] || 'close-protection',
        confidence: 0.8,
        reason: 'Loyalty retention - special offer available',
        expectedValue: customer.averageBookingValue * 0.8,
        urgency: 'high'
      })
    }

    return recommendations.slice(0, 5)
  }

  private calculatePersonalizedPricing(customer: CustomerBehavior): RecommendationEngine['personalizedPricing'] {
    const basePrice = customer.averageBookingValue
    let discount = 0
    let dynamicAdjustment = 0

    // Loyalty discount
    if (customer.loyaltyScore > 80) discount = 0.15
    else if (customer.loyaltyScore > 60) discount = 0.10
    else if (customer.loyaltyScore > 40) discount = 0.05

    // Churn risk discount
    if (customer.churnRisk > 0.4) discount += 0.20
    else if (customer.churnRisk > 0.2) discount += 0.10

    // Volume discount
    if (customer.totalBookings > 50) discount += 0.05
    else if (customer.totalBookings > 20) discount += 0.03

    // Dynamic pricing based on demand (simplified)
    dynamicAdjustment = Math.random() * 0.1 - 0.05 // -5% to +5%

    discount = Math.min(0.3, discount) // Cap at 30% discount
    const finalPrice = basePrice * (1 - discount) * (1 + dynamicAdjustment)

    return {
      basePrice,
      discount: discount * basePrice,
      dynamicAdjustment: dynamicAdjustment * basePrice,
      finalPrice: Math.round(finalPrice)
    }
  }

  private suggestOptimalTiming(customer: CustomerBehavior): RecommendationEngine['optimalTiming'] {
    const preferredTime = customer.preferredTimes[0] || '09:00'
    
    // Check typical availability patterns
    const availability = Math.random() > 0.3 // 70% chance of availability
    
    let reason = `Based on your preferred booking time of ${preferredTime}`
    if (!availability) {
      reason = 'Alternative time suggested due to high demand'
    }

    return {
      suggestedTime: preferredTime,
      reason,
      availability
    }
  }

  private createCustomerSegments(): void {
    // Implementation would create detailed customer segments
    // This is a simplified version
    this.segments = [
      {
        id: 'vip',
        name: 'VIP Customers',
        characteristics: ['High value', 'Frequent bookings', 'Premium services'],
        avgBookingValue: 500,
        avgFrequency: 8,
        churnRate: 0.05,
        lifetimeValue: 15000
      },
      {
        id: 'regular_business',
        name: 'Regular Business',
        characteristics: ['Consistent usage', 'Business hours', 'Corporate services'],
        avgBookingValue: 200,
        avgFrequency: 4,
        churnRate: 0.15,
        lifetimeValue: 5000
      }
    ]
  }

  private createVIPSegment(): CustomerSegment {
    return {
      id: 'vip',
      name: 'VIP Customers',
      characteristics: [],
      avgBookingValue: 500,
      avgFrequency: 8,
      churnRate: 0.05,
      lifetimeValue: 15000
    }
  }

  private createRegularBusinessSegment(): CustomerSegment {
    return {
      id: 'regular_business',
      name: 'Regular Business',
      characteristics: [],
      avgBookingValue: 200,
      avgFrequency: 4,
      churnRate: 0.15,
      lifetimeValue: 5000
    }
  }

  private createOccasionalUserSegment(): CustomerSegment {
    return {
      id: 'occasional',
      name: 'Occasional Users',
      characteristics: [],
      avgBookingValue: 150,
      avgFrequency: 2,
      churnRate: 0.4,
      lifetimeValue: 800
    }
  }

  private createHighRiskSegment(): CustomerSegment {
    return {
      id: 'high_risk',
      name: 'High Risk',
      characteristics: [],
      avgBookingValue: 180,
      avgFrequency: 1,
      churnRate: 0.7,
      lifetimeValue: 400
    }
  }

  private createNewCustomerSegment(): CustomerSegment {
    return {
      id: 'new',
      name: 'New Customers',
      characteristics: [],
      avgBookingValue: 220,
      avgFrequency: 1,
      churnRate: 0.3,
      lifetimeValue: 1200
    }
  }

  private refineSegmentCharacteristics(segment: CustomerSegment): string[] {
    return [`Average booking: £${segment.avgBookingValue}`, `Frequency: ${segment.avgFrequency}/month`]
  }

  private calculateMonthlyAverageValue(bookings: BookingData[]): number {
    if (bookings.length === 0) return 0
    
    const totalValue = bookings.reduce((sum, booking) => sum + booking.cost, 0)
    const monthsActive = Math.max(1, 
      differenceInDays(new Date(), new Date(bookings[0].date)) / 30
    )
    
    return totalValue / monthsActive
  }

  private calculateValueTrend(bookings: BookingData[]): number {
    if (bookings.length < 3) return 1
    
    // Simple trend calculation without regression
    const halfPoint = Math.floor(bookings.length / 2)
    const firstHalf = bookings.slice(0, halfPoint)
    const secondHalf = bookings.slice(halfPoint)
    
    const firstHalfAvg = mean(firstHalf.map(b => b.cost))
    const secondHalfAvg = mean(secondHalf.map(b => b.cost))
    
    const trend = firstHalfAvg > 0 ? secondHalfAvg / firstHalfAvg : 1
    
    return Math.max(0.5, Math.min(2.0, trend)) // Bound between 0.5x and 2x
  }

  private getSegmentMultiplier(customer: CustomerBehavior): number {
    if (customer.lifetimeValue > 10000) return 1.2
    if (customer.lifetimeValue > 5000) return 1.1
    if (customer.churnRisk > 0.5) return 0.8
    return 1.0
  }

  private calculatePredictionConfidence(bookings: BookingData[], customer: CustomerBehavior): number {
    let confidence = 0.5
    
    if (bookings.length > 10) confidence += 0.2
    if (bookings.length > 5) confidence += 0.1
    if (customer.loyaltyScore > 60) confidence += 0.1
    if (customer.churnRisk < 0.3) confidence += 0.1
    
    return Math.min(0.95, confidence)
  }

  private determineChurnUrgency(churnRisk: number, daysSinceLastBooking: number): 'low' | 'medium' | 'high' | 'critical' {
    if (churnRisk > 0.7 || daysSinceLastBooking > 180) return 'critical'
    if (churnRisk > 0.5 || daysSinceLastBooking > 120) return 'high'
    if (churnRisk > 0.3 || daysSinceLastBooking > 60) return 'medium'
    return 'low'
  }

  private generateRetentionActions(customer: CustomerBehavior, daysSinceLastBooking: number): string[] {
    const actions: string[] = []
    
    if (customer.churnRisk > 0.5) {
      actions.push('Offer 20% discount on next booking')
      actions.push('Personal call from account manager')
    }
    
    if (daysSinceLastBooking > 90) {
      actions.push('Send "We miss you" email campaign')
      actions.push('Offer free service upgrade')
    }
    
    if (customer.loyaltyScore < 40) {
      actions.push('Enroll in loyalty program')
      actions.push('Gather feedback on service quality')
    }
    
    return actions
  }

  private calculateServiceGrowthRates(): { [service: string]: number } {
    // Simplified implementation
    return {
      'vip': 0.15,
      'close-protection': 0.08,
      'corporate': 0.12,
      'private-hire': -0.02,
      'weddings': 0.25
    }
  }

  private analyzeBookingTimes(): { peakHours: string[] } {
    const hourCounts = new Map<number, number>()
    
    this.bookingHistory.forEach(booking => {
      const hour = new Date(booking.date + 'T' + booking.time).getHours()
      hourCounts.set(hour, (hourCounts.get(hour) || 0) + 1)
    })

    const sortedHours = Array.from(hourCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([hour]) => `${hour}:00`)

    return { peakHours: sortedHours }
  }

  private analyzeSeasonalPatterns(): any[] {
    // Simplified seasonal analysis
    return [
      { month: 'December', bookings: 45, growth: 0.2 },
      { month: 'June', bookings: 38, growth: 0.15 },
      { month: 'September', bookings: 35, growth: 0.1 }
    ]
  }

  private analyzeSatisfactionTrends(): any[] {
    const monthlyRatings = new Map<string, number[]>()
    
    this.bookingHistory
      .filter(booking => booking.rating)
      .forEach(booking => {
        const month = format(new Date(booking.date), 'yyyy-MM')
        if (!monthlyRatings.has(month)) {
          monthlyRatings.set(month, [])
        }
        monthlyRatings.get(month)!.push(booking.rating!)
      })

    return Array.from(monthlyRatings.entries()).map(([month, ratings]) => ({
      month,
      averageRating: mean(ratings),
      totalRatings: ratings.length
    }))
  }
}