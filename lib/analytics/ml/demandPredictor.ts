import { DemandPrediction, BookingData, ChartData } from '../types'
import { format, addHours, startOfDay, endOfDay, isWeekend } from 'date-fns'
import { mean, standardDeviation, regression } from 'simple-statistics'

interface HistoricalData {
  bookings: BookingData[]
  weatherData: WeatherData[]
  eventData: EventData[]
}

interface WeatherData {
  date: string
  temperature: number
  precipitation: number
  windSpeed: number
  conditions: string
}

interface EventData {
  date: string
  type: 'concert' | 'sports' | 'conference' | 'holiday' | 'festival'
  impact: 'low' | 'medium' | 'high'
  location: string
}

export class DemandPredictor {
  private historicalBookings: BookingData[] = []
  private seasonalFactors: Map<string, number> = new Map()
  private locationFactors: Map<string, number> = new Map()
  private timeFactors: Map<string, number> = new Map()

  constructor(historicalData: HistoricalData) {
    this.historicalBookings = historicalData.bookings
    this.calculateSeasonalFactors()
    this.calculateLocationFactors()
    this.calculateTimeFactors()
  }

  /**
   * Predict demand for specific time slot and location
   */
  async predictDemand(
    timeSlot: string,
    location: string,
    serviceType: string,
    weatherConditions?: WeatherData,
    events?: EventData[]
  ): Promise<DemandPrediction> {
    const baselinePredictiion = this.calculateBaseline(timeSlot, location, serviceType)
    const seasonalAdjustment = this.getSeasonalAdjustment(timeSlot)
    const weatherAdjustment = this.getWeatherAdjustment(weatherConditions)
    const eventAdjustment = this.getEventAdjustment(events, location)
    const dayOfWeekAdjustment = this.getDayOfWeekAdjustment(timeSlot)

    const predictedDemand = Math.max(0, Math.round(
      baselinePredictiion * 
      seasonalAdjustment * 
      weatherAdjustment * 
      eventAdjustment * 
      dayOfWeekAdjustment
    ))

    const confidence = this.calculateConfidence(
      timeSlot, 
      location, 
      serviceType, 
      weatherConditions, 
      events
    )

    const recommendations = this.generateRecommendations(
      predictedDemand,
      location,
      serviceType,
      confidence
    )

    return {
      id: `demand_${Date.now()}_${location}_${serviceType}`,
      timeSlot,
      location,
      serviceType,
      predictedDemand,
      confidence,
      factors: {
        historical: baselinePredictiion,
        weather: weatherAdjustment,
        events: eventAdjustment,
        seasonal: seasonalAdjustment,
        dayOfWeek: dayOfWeekAdjustment
      },
      recommendations,
      createdAt: new Date().toISOString()
    }
  }

  /**
   * Generate demand forecast for multiple time periods
   */
  async generateForecast(
    location: string,
    serviceType: string,
    hoursAhead: number = 24
  ): Promise<DemandPrediction[]> {
    const forecasts: DemandPrediction[] = []
    const now = new Date()

    for (let i = 0; i < hoursAhead; i++) {
      const targetTime = addHours(now, i)
      const timeSlot = format(targetTime, 'yyyy-MM-dd HH:00')
      
      const prediction = await this.predictDemand(timeSlot, location, serviceType)
      forecasts.push(prediction)
    }

    return forecasts
  }

  /**
   * Analyze demand patterns for business intelligence
   */
  analyzeDemandPatterns(): {
    peakHours: string[]
    busyLocations: string[]
    popularServices: string[]
    seasonalTrends: ChartData[]
    weeklyPatterns: ChartData[]
  } {
    const hourCounts = new Map<string, number>()
    const locationCounts = new Map<string, number>()
    const serviceCounts = new Map<string, number>()
    const monthCounts = new Map<string, number>()
    const dayOfWeekCounts = new Map<string, number>()

    this.historicalBookings.forEach(booking => {
      const hour = new Date(booking.date + 'T' + booking.time).getHours()
      const location = booking.location.toLowerCase()
      const service = booking.service
      const month = format(new Date(booking.date), 'MMMM')
      const dayOfWeek = format(new Date(booking.date), 'EEEE')

      hourCounts.set(`${hour}:00`, (hourCounts.get(`${hour}:00`) || 0) + 1)
      locationCounts.set(location, (locationCounts.get(location) || 0) + 1)
      serviceCounts.set(service, (serviceCounts.get(service) || 0) + 1)
      monthCounts.set(month, (monthCounts.get(month) || 0) + 1)
      dayOfWeekCounts.set(dayOfWeek, (dayOfWeekCounts.get(dayOfWeek) || 0) + 1)
    })

    return {
      peakHours: Array.from(hourCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([hour]) => hour),
      
      busyLocations: Array.from(locationCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([location]) => location),
      
      popularServices: Array.from(serviceCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([service]) => service),
      
      seasonalTrends: Array.from(monthCounts.entries()).map(([month, count]) => ({
        x: month,
        y: count,
        label: month
      })),
      
      weeklyPatterns: Array.from(dayOfWeekCounts.entries()).map(([day, count]) => ({
        x: day,
        y: count,
        label: day
      }))
    }
  }

  private calculateBaseline(timeSlot: string, location: string, serviceType: string): number {
    const relevantBookings = this.historicalBookings.filter(booking => {
      const bookingHour = new Date(booking.date + 'T' + booking.time).getHours()
      const targetHour = new Date(timeSlot).getHours()
      
      return booking.location.toLowerCase().includes(location.toLowerCase()) &&
             booking.service === serviceType &&
             Math.abs(bookingHour - targetHour) <= 1
    })

    if (relevantBookings.length === 0) {
      return this.getServiceAverageBookings(serviceType)
    }

    // Group by similar time periods and calculate average
    const groupedByDate = new Map<string, number>()
    
    relevantBookings.forEach(booking => {
      const dateKey = booking.date
      groupedByDate.set(dateKey, (groupedByDate.get(dateKey) || 0) + 1)
    })

    const dailyBookings = Array.from(groupedByDate.values())
    return dailyBookings.length > 0 ? mean(dailyBookings) : 1
  }

  private calculateSeasonalFactors(): void {
    const monthlyBookings = new Map<string, number[]>()
    
    this.historicalBookings.forEach(booking => {
      const month = format(new Date(booking.date), 'MM')
      if (!monthlyBookings.has(month)) {
        monthlyBookings.set(month, [])
      }
      monthlyBookings.get(month)!.push(1)
    })

    const overallAverage = this.historicalBookings.length / 12

    monthlyBookings.forEach((bookings, month) => {
      const monthlyAverage = bookings.length
      const factor = overallAverage > 0 ? monthlyAverage / overallAverage : 1
      this.seasonalFactors.set(month, factor)
    })
  }

  private calculateLocationFactors(): void {
    const locationBookings = new Map<string, number>()
    
    this.historicalBookings.forEach(booking => {
      const location = booking.location.toLowerCase()
      locationBookings.set(location, (locationBookings.get(location) || 0) + 1)
    })

    const averageBookingsPerLocation = mean(Array.from(locationBookings.values()))

    locationBookings.forEach((count, location) => {
      const factor = averageBookingsPerLocation > 0 ? count / averageBookingsPerLocation : 1
      this.locationFactors.set(location, factor)
    })
  }

  private calculateTimeFactors(): void {
    const hourlyBookings = new Map<string, number>()
    
    this.historicalBookings.forEach(booking => {
      const hour = new Date(booking.date + 'T' + booking.time).getHours()
      const hourKey = `${hour}`
      hourlyBookings.set(hourKey, (hourlyBookings.get(hourKey) || 0) + 1)
    })

    const averageBookingsPerHour = mean(Array.from(hourlyBookings.values()))

    hourlyBookings.forEach((count, hour) => {
      const factor = averageBookingsPerHour > 0 ? count / averageBookingsPerHour : 1
      this.timeFactors.set(hour, factor)
    })
  }

  private getSeasonalAdjustment(timeSlot: string): number {
    const month = format(new Date(timeSlot), 'MM')
    return this.seasonalFactors.get(month) || 1
  }

  private getWeatherAdjustment(weather?: WeatherData): number {
    if (!weather) return 1

    let adjustment = 1

    // Rain increases demand
    if (weather.precipitation > 0) {
      adjustment *= 1 + (weather.precipitation / 10) // up to 10% increase per mm
    }

    // Extreme temperatures affect demand
    if (weather.temperature < 0 || weather.temperature > 30) {
      adjustment *= 1.2 // 20% increase for extreme temperatures
    }

    // Bad weather conditions
    if (weather.conditions.includes('storm') || weather.conditions.includes('fog')) {
      adjustment *= 1.3
    }

    return Math.min(adjustment, 2.0) // Cap at 100% increase
  }

  private getEventAdjustment(events?: EventData[], location?: string): number {
    if (!events || events.length === 0) return 1

    let adjustment = 1

    events.forEach(event => {
      if (location && event.location.toLowerCase().includes(location.toLowerCase())) {
        switch (event.impact) {
          case 'high':
            adjustment *= 1.5
            break
          case 'medium':
            adjustment *= 1.3
            break
          case 'low':
            adjustment *= 1.1
            break
        }
      }
    })

    return Math.min(adjustment, 3.0) // Cap at 200% increase
  }

  private getDayOfWeekAdjustment(timeSlot: string): number {
    const date = new Date(timeSlot)
    const isWeekendDay = isWeekend(date)
    const hour = date.getHours()

    // Weekend patterns
    if (isWeekendDay) {
      if (hour >= 10 && hour <= 14) return 1.3 // Weekend brunch/shopping
      if (hour >= 19 && hour <= 23) return 1.4 // Weekend nightlife
      return 0.9 // Generally less demand on weekends for business travel
    }

    // Weekday patterns
    if (hour >= 7 && hour <= 9) return 1.5 // Morning rush
    if (hour >= 17 && hour <= 19) return 1.4 // Evening rush
    if (hour >= 11 && hour <= 14) return 1.2 // Lunch meetings
    
    return 1
  }

  private calculateConfidence(
    timeSlot: string,
    location: string,
    serviceType: string,
    weather?: WeatherData,
    events?: EventData[]
  ): number {
    let confidence = 0.7 // Base confidence

    // Historical data availability
    const relevantBookings = this.historicalBookings.filter(booking => 
      booking.location.toLowerCase().includes(location.toLowerCase()) &&
      booking.service === serviceType
    )

    if (relevantBookings.length > 50) confidence += 0.2
    else if (relevantBookings.length > 20) confidence += 0.1

    // Weather data availability
    if (weather) confidence += 0.1

    // Event data availability
    if (events && events.length > 0) confidence += 0.05

    return Math.min(confidence, 0.95)
  }

  private generateRecommendations(
    predictedDemand: number,
    location: string,
    serviceType: string,
    confidence: number
  ): string[] {
    const recommendations: string[] = []

    if (predictedDemand > 5) {
      recommendations.push(`High demand predicted for ${serviceType} in ${location}`)
      recommendations.push('Consider pre-positioning drivers in this area')
      recommendations.push('Enable surge pricing if demand exceeds supply')
    } else if (predictedDemand < 2) {
      recommendations.push(`Low demand predicted for ${serviceType} in ${location}`)
      recommendations.push('Consider reallocating drivers to higher demand areas')
      recommendations.push('Offer promotions to stimulate demand')
    }

    if (confidence < 0.7) {
      recommendations.push('Prediction confidence is low - monitor actual demand closely')
    }

    return recommendations
  }

  private getServiceAverageBookings(serviceType: string): number {
    const serviceBookings = this.historicalBookings.filter(
      booking => booking.service === serviceType
    )
    
    if (serviceBookings.length === 0) return 1

    // Calculate daily average for this service
    const dailyGroups = new Map<string, number>()
    serviceBookings.forEach(booking => {
      dailyGroups.set(booking.date, (dailyGroups.get(booking.date) || 0) + 1)
    })

    const dailyAverages = Array.from(dailyGroups.values())
    return mean(dailyAverages)
  }
}