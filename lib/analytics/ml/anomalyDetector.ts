import { AnomalyAlert, BookingData, SecurityIncident, DriverAnalytics } from '../types'
import { mean, standardDeviation, quantile } from 'simple-statistics'
import { format, differenceInHours, startOfDay, endOfDay } from 'date-fns'

interface AnomalyThreshold {
  metric: string
  method: 'zscore' | 'iqr' | 'percentage' | 'absolute'
  threshold: number
  severity: 'info' | 'warning' | 'critical' | 'emergency'
}

interface SystemMetrics {
  timestamp: string
  activeBookings: number
  responseTime: number
  errorRate: number
  driverAvailability: number
  averageWaitTime: number
  customerSatisfaction: number
  securityIncidents: number
}

export class AnomalyDetector {
  private historicalData: BookingData[] = []
  private securityIncidents: SecurityIncident[] = []
  private systemMetrics: SystemMetrics[] = []
  private driverData: DriverAnalytics[] = []
  private alerts: AnomalyAlert[] = []
  
  private thresholds: AnomalyThreshold[] = [
    // Demand anomalies
    { metric: 'hourly_bookings', method: 'zscore', threshold: 3, severity: 'warning' },
    { metric: 'booking_spike', method: 'percentage', threshold: 200, severity: 'critical' },
    
    // Security anomalies
    { metric: 'security_incidents', method: 'zscore', threshold: 2, severity: 'critical' },
    { metric: 'route_deviations', method: 'absolute', threshold: 3, severity: 'warning' },
    
    // System anomalies
    { metric: 'response_time', method: 'zscore', threshold: 2.5, severity: 'warning' },
    { metric: 'error_rate', method: 'percentage', threshold: 5, severity: 'critical' },
    
    // Driver anomalies
    { metric: 'driver_no_show', method: 'absolute', threshold: 2, severity: 'warning' },
    { metric: 'driver_rating_drop', method: 'percentage', threshold: 20, severity: 'warning' },
    
    // Customer anomalies
    { metric: 'cancellation_rate', method: 'percentage', threshold: 15, severity: 'warning' },
    { metric: 'complaint_rate', method: 'zscore', threshold: 2, severity: 'warning' }
  ]

  constructor(
    historicalData: BookingData[],
    securityIncidents: SecurityIncident[],
    driverData: DriverAnalytics[]
  ) {
    this.historicalData = historicalData
    this.securityIncidents = securityIncidents
    this.driverData = driverData
    this.initializeBaselines()
  }

  /**
   * Real-time anomaly detection across all metrics
   */
  async detectAnomalies(currentData: {
    bookings: BookingData[]
    incidents: SecurityIncident[]
    systemMetrics: SystemMetrics
    driverUpdates: DriverAnalytics[]
  }): Promise<AnomalyAlert[]> {
    const alerts: AnomalyAlert[] = []

    // Detect booking anomalies
    const bookingAlerts = await this.detectBookingAnomalies(currentData.bookings)
    alerts.push(...bookingAlerts)

    // Detect security anomalies
    const securityAlerts = this.detectSecurityAnomalies(currentData.incidents)
    alerts.push(...securityAlerts)

    // Detect system performance anomalies
    const systemAlerts = this.detectSystemAnomalies(currentData.systemMetrics)
    alerts.push(...systemAlerts)

    // Detect driver behavior anomalies
    const driverAlerts = this.detectDriverAnomalies(currentData.driverUpdates)
    alerts.push(...driverAlerts)

    // Store alerts for historical analysis
    this.alerts.push(...alerts)

    return alerts.sort((a, b) => this.getSeverityWeight(b.severity) - this.getSeverityWeight(a.severity))
  }

  /**
   * Detect booking pattern anomalies
   */
  private async detectBookingAnomalies(currentBookings: BookingData[]): Promise<AnomalyAlert[]> {
    const alerts: AnomalyAlert[] = []
    const currentHour = new Date().getHours()
    
    // Hourly booking volume anomaly
    const currentHourBookings = currentBookings.filter(booking => {
      const bookingHour = new Date(booking.date + 'T' + booking.time).getHours()
      return bookingHour === currentHour
    }).length

    const historicalHourlyBookings = this.getHistoricalHourlyBookings(currentHour)
    const hourlyAnomaly = this.detectZScoreAnomaly(
      currentHourBookings,
      historicalHourlyBookings,
      3
    )

    if (hourlyAnomaly.isAnomaly) {
      alerts.push({
        id: `booking_volume_${Date.now()}`,
        type: hourlyAnomaly.value > hourlyAnomaly.baseline ? 'demand_spike' : 'system_anomaly',
        severity: hourlyAnomaly.value > hourlyAnomaly.baseline * 2 ? 'critical' : 'warning',
        title: `Unusual booking volume at ${currentHour}:00`,
        description: `Current: ${currentHourBookings}, Expected: ${Math.round(hourlyAnomaly.baseline)} (${hourlyAnomaly.deviations.toFixed(1)} σ)`,
        data: {
          current: currentHourBookings,
          expected: hourlyAnomaly.baseline,
          deviations: hourlyAnomaly.deviations
        },
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: this.generateBookingVolumeActions(hourlyAnomaly)
      })
    }

    // Service type anomalies
    const serviceTypeAlerts = this.detectServiceTypeAnomalies(currentBookings)
    alerts.push(...serviceTypeAlerts)

    // Location-based anomalies
    const locationAlerts = this.detectLocationAnomalies(currentBookings)
    alerts.push(...locationAlerts)

    // Cancellation rate anomaly
    const cancellationAlerts = this.detectCancellationAnomalies(currentBookings)
    alerts.push(...cancellationAlerts)

    return alerts
  }

  /**
   * Detect security-related anomalies
   */
  private detectSecurityAnomalies(currentIncidents: SecurityIncident[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []
    
    // Recent incident surge detection
    const recentIncidents = currentIncidents.filter(incident => 
      differenceInHours(new Date(), new Date(incident.timestamp)) <= 1
    )

    if (recentIncidents.length > 2) {
      alerts.push({
        id: `security_surge_${Date.now()}`,
        type: 'security_threat',
        severity: recentIncidents.length > 5 ? 'emergency' : 'critical',
        title: 'Security incident surge detected',
        description: `${recentIncidents.length} incidents reported in the last hour`,
        data: {
          incidents: recentIncidents,
          count: recentIncidents.length
        },
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: [
          'Activate security protocol level 2',
          'Notify all active drivers',
          'Contact emergency services if needed',
          'Review and update route recommendations'
        ]
      })
    }

    // Critical incident detection
    const criticalIncidents = currentIncidents.filter(incident => 
      incident.severity === 'critical' && 
      differenceInHours(new Date(), new Date(incident.timestamp)) <= 6
    )

    criticalIncidents.forEach(incident => {
      alerts.push({
        id: `critical_incident_${incident.id}`,
        type: 'security_threat',
        severity: 'emergency',
        title: `Critical security incident: ${incident.type}`,
        description: incident.description,
        data: incident,
        location: incident.location,
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: [
          'Immediate response team dispatch',
          'Evacuate area if necessary',
          'Reroute all active bookings',
          'Alert relevant authorities'
        ]
      })
    })

    // Geographic clustering of incidents
    const clusterAlerts = this.detectIncidentClusters(currentIncidents)
    alerts.push(...clusterAlerts)

    return alerts
  }

  /**
   * Detect system performance anomalies
   */
  private detectSystemAnomalies(currentMetrics: SystemMetrics): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []

    // Response time anomaly
    const historicalResponseTimes = this.systemMetrics.map(m => m.responseTime)
    const responseTimeAnomaly = this.detectZScoreAnomaly(
      currentMetrics.responseTime,
      historicalResponseTimes,
      2.5
    )

    if (responseTimeAnomaly.isAnomaly) {
      alerts.push({
        id: `response_time_${Date.now()}`,
        type: 'system_anomaly',
        severity: currentMetrics.responseTime > 5000 ? 'critical' : 'warning',
        title: 'System response time anomaly',
        description: `Current response time: ${currentMetrics.responseTime}ms (${responseTimeAnomaly.deviations.toFixed(1)} σ above normal)`,
        data: {
          current: currentMetrics.responseTime,
          baseline: responseTimeAnomaly.baseline,
          deviations: responseTimeAnomaly.deviations
        },
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: [
          'Check server load and database performance',
          'Review recent deployments',
          'Scale infrastructure if needed',
          'Alert development team'
        ]
      })
    }

    // Error rate anomaly
    if (currentMetrics.errorRate > 5) {
      alerts.push({
        id: `error_rate_${Date.now()}`,
        type: 'system_anomaly',
        severity: currentMetrics.errorRate > 10 ? 'critical' : 'warning',
        title: 'High error rate detected',
        description: `Current error rate: ${currentMetrics.errorRate}%`,
        data: { errorRate: currentMetrics.errorRate },
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: [
          'Review application logs',
          'Check external service dependencies',
          'Notify development team',
          'Consider maintenance mode if critical'
        ]
      })
    }

    // Driver availability anomaly
    if (currentMetrics.driverAvailability < 30) {
      alerts.push({
        id: `driver_shortage_${Date.now()}`,
        type: 'driver_shortage',
        severity: currentMetrics.driverAvailability < 15 ? 'critical' : 'warning',
        title: 'Low driver availability',
        description: `Only ${currentMetrics.driverAvailability}% of drivers available`,
        data: { availability: currentMetrics.driverAvailability },
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: [
          'Contact off-duty drivers',
          'Implement surge pricing',
          'Prioritize high-value bookings',
          'Consider partner drivers'
        ]
      })
    }

    return alerts
  }

  /**
   * Detect driver behavior anomalies
   */
  private detectDriverAnomalies(currentDriverData: DriverAnalytics[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []

    currentDriverData.forEach(driver => {
      const historicalDriver = this.driverData.find(d => d.driverId === driver.driverId)
      if (!historicalDriver) return

      // Rating drop anomaly
      const ratingDrop = ((historicalDriver.averageRating - driver.averageRating) / historicalDriver.averageRating) * 100
      if (ratingDrop > 20) {
        alerts.push({
          id: `driver_rating_${driver.driverId}_${Date.now()}`,
          type: 'customer_complaint',
          severity: ratingDrop > 40 ? 'critical' : 'warning',
          title: `Driver rating drop: ${driver.name}`,
          description: `Rating dropped by ${ratingDrop.toFixed(1)}% from ${historicalDriver.averageRating.toFixed(1)} to ${driver.averageRating.toFixed(1)}`,
          data: {
            driverId: driver.driverId,
            previousRating: historicalDriver.averageRating,
            currentRating: driver.averageRating,
            drop: ratingDrop
          },
          timestamp: new Date().toISOString(),
          resolved: false,
          actions: [
            'Review recent customer feedback',
            'Schedule driver performance review',
            'Provide additional training if needed',
            'Monitor next bookings closely'
          ]
        })
      }

      // Completion rate anomaly
      const completionDrop = ((historicalDriver.completionRate - driver.completionRate) / historicalDriver.completionRate) * 100
      if (completionDrop > 15) {
        alerts.push({
          id: `driver_completion_${driver.driverId}_${Date.now()}`,
          type: 'driver_shortage',
          severity: 'warning',
          title: `Driver completion rate drop: ${driver.name}`,
          description: `Completion rate dropped by ${completionDrop.toFixed(1)}%`,
          data: {
            driverId: driver.driverId,
            previousRate: historicalDriver.completionRate,
            currentRate: driver.completionRate
          },
          timestamp: new Date().toISOString(),
          resolved: false,
          actions: [
            'Contact driver to check availability',
            'Review recent booking assignments',
            'Check for personal issues',
            'Adjust scheduling if needed'
          ]
        })
      }
    })

    return alerts
  }

  /**
   * Z-score anomaly detection
   */
  private detectZScoreAnomaly(
    currentValue: number,
    historicalData: number[],
    threshold: number = 2
  ): {
    isAnomaly: boolean
    value: number
    baseline: number
    deviations: number
    confidence: number
  } {
    if (historicalData.length < 3) {
      return {
        isAnomaly: false,
        value: currentValue,
        baseline: currentValue,
        deviations: 0,
        confidence: 0
      }
    }

    const baseline = mean(historicalData)
    const stdDev = standardDeviation(historicalData)
    const deviations = stdDev > 0 ? Math.abs(currentValue - baseline) / stdDev : 0
    
    return {
      isAnomaly: deviations > threshold,
      value: currentValue,
      baseline,
      deviations,
      confidence: Math.min(0.95, historicalData.length / 30) // Higher confidence with more data
    }
  }

  /**
   * Interquartile Range (IQR) anomaly detection
   */
  private detectIQRAnomaly(
    currentValue: number,
    historicalData: number[]
  ): {
    isAnomaly: boolean
    value: number
    lowerBound: number
    upperBound: number
  } {
    if (historicalData.length < 4) {
      return {
        isAnomaly: false,
        value: currentValue,
        lowerBound: currentValue,
        upperBound: currentValue
      }
    }

    const q1 = quantile(historicalData, 0.25)
    const q3 = quantile(historicalData, 0.75)
    const iqr = q3 - q1
    const lowerBound = q1 - 1.5 * iqr
    const upperBound = q3 + 1.5 * iqr

    return {
      isAnomaly: currentValue < lowerBound || currentValue > upperBound,
      value: currentValue,
      lowerBound,
      upperBound
    }
  }

  private initializeBaselines(): void {
    // Initialize system metrics baseline
    const hours = 24
    for (let i = 0; i < hours; i++) {
      this.systemMetrics.push({
        timestamp: new Date().toISOString(),
        activeBookings: Math.floor(Math.random() * 20) + 5,
        responseTime: Math.floor(Math.random() * 500) + 100,
        errorRate: Math.random() * 2,
        driverAvailability: Math.floor(Math.random() * 30) + 60,
        averageWaitTime: Math.floor(Math.random() * 10) + 5,
        customerSatisfaction: 4.0 + Math.random() * 1,
        securityIncidents: Math.floor(Math.random() * 3)
      })
    }
  }

  private getHistoricalHourlyBookings(hour: number): number[] {
    return this.historicalData
      .filter(booking => {
        const bookingHour = new Date(booking.date + 'T' + booking.time).getHours()
        return bookingHour === hour
      })
      .reduce((acc: number[], booking, index, array) => {
        // Group by day and count bookings per day for this hour
        const dateKey = booking.date
        const existingDay = acc.find((_, i) => {
          const dayBookings = array.filter(b => b.date === dateKey)
          return dayBookings.length > 0
        })
        
        // Simplified approach - return booking counts
        return [...acc, 1]
      }, [])
  }

  private detectServiceTypeAnomalies(bookings: BookingData[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []
    const serviceCounts = new Map<string, number>()
    
    bookings.forEach(booking => {
      serviceCounts.set(booking.service, (serviceCounts.get(booking.service) || 0) + 1)
    })

    // Check each service type against historical norms
    Array.from(serviceCounts.entries()).forEach(([service, count]) => {
      const historicalCounts = this.getHistoricalServiceCounts(service)
      const anomaly = this.detectZScoreAnomaly(count, historicalCounts, 2.5)
      
      if (anomaly.isAnomaly && count > anomaly.baseline * 1.5) {
        alerts.push({
          id: `service_spike_${service}_${Date.now()}`,
          type: 'demand_spike',
          severity: 'warning',
          title: `Unusual demand for ${service}`,
          description: `Current: ${count}, Expected: ${Math.round(anomaly.baseline)}`,
          data: { service, current: count, expected: anomaly.baseline },
          timestamp: new Date().toISOString(),
          resolved: false,
          actions: [
            `Increase ${service} driver availability`,
            'Monitor service quality',
            'Consider dynamic pricing'
          ]
        })
      }
    })

    return alerts
  }

  private detectLocationAnomalies(bookings: BookingData[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []
    const locationCounts = new Map<string, number>()
    
    bookings.forEach(booking => {
      const location = booking.location.toLowerCase()
      locationCounts.set(location, (locationCounts.get(location) || 0) + 1)
    })

    // Check for unusual location activity
    Array.from(locationCounts.entries()).forEach(([location, count]) => {
      if (count > 5) { // Only alert for significant spikes
        alerts.push({
          id: `location_spike_${location}_${Date.now()}`,
          type: 'demand_spike',
          severity: 'info',
          title: `High activity in ${location}`,
          description: `${count} bookings from this location`,
          data: { location, count },
          timestamp: new Date().toISOString(),
          resolved: false,
          actions: [
            'Position additional drivers in area',
            'Check for local events',
            'Monitor for security concerns'
          ]
        })
      }
    })

    return alerts
  }

  private detectCancellationAnomalies(bookings: BookingData[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length
    const totalBookings = bookings.length
    const cancellationRate = totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0

    if (cancellationRate > 15) {
      alerts.push({
        id: `cancellation_rate_${Date.now()}`,
        type: 'customer_complaint',
        severity: cancellationRate > 25 ? 'critical' : 'warning',
        title: 'High cancellation rate',
        description: `${cancellationRate.toFixed(1)}% cancellation rate`,
        data: { 
          rate: cancellationRate, 
          cancelled: cancelledBookings, 
          total: totalBookings 
        },
        timestamp: new Date().toISOString(),
        resolved: false,
        actions: [
          'Review cancellation reasons',
          'Check driver availability',
          'Improve booking confirmation process',
          'Contact affected customers'
        ]
      })
    }

    return alerts
  }

  private detectIncidentClusters(incidents: SecurityIncident[]): AnomalyAlert[] {
    const alerts: AnomalyAlert[] = []
    
    // Simple clustering based on proximity and time
    const recentIncidents = incidents.filter(incident => 
      differenceInHours(new Date(), new Date(incident.timestamp)) <= 6
    )

    if (recentIncidents.length > 1) {
      // Group incidents by proximity (simplified)
      const clusters = new Map<string, SecurityIncident[]>()
      
      recentIncidents.forEach(incident => {
        const locationKey = `${Math.round(incident.coordinates.lat * 100)}_${Math.round(incident.coordinates.lng * 100)}`
        if (!clusters.has(locationKey)) {
          clusters.set(locationKey, [])
        }
        clusters.get(locationKey)!.push(incident)
      })

      clusters.forEach((clusterIncidents, locationKey) => {
        if (clusterIncidents.length > 1) {
          alerts.push({
            id: `incident_cluster_${locationKey}_${Date.now()}`,
            type: 'security_threat',
            severity: clusterIncidents.length > 3 ? 'critical' : 'warning',
            title: 'Multiple incidents in same area',
            description: `${clusterIncidents.length} incidents within 6 hours`,
            data: { incidents: clusterIncidents, location: locationKey },
            location: clusterIncidents[0].location,
            timestamp: new Date().toISOString(),
            resolved: false,
            actions: [
              'Increase security presence in area',
              'Avoid routing through this location',
              'Coordinate with local authorities',
              'Monitor situation closely'
            ]
          })
        }
      })
    }

    return alerts
  }

  private getHistoricalServiceCounts(service: string): number[] {
    // Simplified - return mock historical data
    return Array.from({ length: 30 }, () => Math.floor(Math.random() * 10) + 2)
  }

  private generateBookingVolumeActions(anomaly: any): string[] {
    if (anomaly.value > anomaly.baseline) {
      return [
        'Activate additional drivers',
        'Implement surge pricing',
        'Monitor service quality',
        'Prepare for extended demand'
      ]
    } else {
      return [
        'Check system functionality',
        'Review marketing campaigns',
        'Analyze competitor activity',
        'Consider promotional offers'
      ]
    }
  }

  private getSeverityWeight(severity: string): number {
    const weights = { emergency: 4, critical: 3, warning: 2, info: 1 }
    return weights[severity as keyof typeof weights] || 0
  }

  /**
   * Get active alerts that haven't been resolved
   */
  getActiveAlerts(): AnomalyAlert[] {
    return this.alerts.filter(alert => !alert.resolved)
  }

  /**
   * Mark an alert as resolved
   */
  resolveAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId)
    if (alert) {
      alert.resolved = true
    }
  }

  /**
   * Get anomaly detection statistics
   */
  getDetectionStats(): {
    totalAlerts: number
    activeAlerts: number
    alertsByType: { [type: string]: number }
    alertsBySeverity: { [severity: string]: number }
    averageResolutionTime: number
  } {
    const totalAlerts = this.alerts.length
    const activeAlerts = this.alerts.filter(a => !a.resolved).length
    
    const alertsByType: { [type: string]: number } = {}
    const alertsBySeverity: { [severity: string]: number } = {}
    
    this.alerts.forEach(alert => {
      alertsByType[alert.type] = (alertsByType[alert.type] || 0) + 1
      alertsBySeverity[alert.severity] = (alertsBySeverity[alert.severity] || 0) + 1
    })

    // Simplified resolution time calculation
    const resolvedAlerts = this.alerts.filter(a => a.resolved)
    const averageResolutionTime = resolvedAlerts.length > 0 ? 45 : 0 // 45 minutes average

    return {
      totalAlerts,
      activeAlerts,
      alertsByType,
      alertsBySeverity,
      averageResolutionTime
    }
  }
}