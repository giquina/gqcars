import { NextRequest, NextResponse } from 'next/server'
import { DemandPredictor } from '../../../../lib/analytics/ml/demandPredictor'
import { RouteOptimizer } from '../../../../lib/analytics/ml/routeOptimizer'
import { CustomerAnalyzer } from '../../../../lib/analytics/ml/customerAnalyzer'
import { AnomalyDetector } from '../../../../lib/analytics/ml/anomalyDetector'

// Mock data - in production, this would come from your database
const mockBookingData = [
  {
    id: '1',
    service: 'close-protection',
    date: '2024-01-15',
    time: '09:00',
    duration: 4,
    location: 'London',
    customerInfo: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+447123456789',
      isReturning: true,
      customerValue: 2500
    },
    status: 'completed' as const,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T13:00:00Z',
    cost: 400,
    rating: 5
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, parameters } = body

    // Initialize analytics engines
    const demandPredictor = new DemandPredictor({
      bookings: mockBookingData,
      weatherData: [],
      eventData: []
    })

    const routeOptimizer = new RouteOptimizer()
    const customerAnalyzer = new CustomerAnalyzer(mockBookingData)

    switch (type) {
      case 'demand':
        const demandResult = await demandPredictor.predictDemand(
          parameters.timeSlot,
          parameters.location,
          parameters.serviceType,
          parameters.weatherConditions,
          parameters.events
        )

        return NextResponse.json({
          success: true,
          data: {
            type: 'demand_prediction',
            prediction: demandResult,
            confidence: demandResult.confidence,
            factors: demandResult.factors,
            recommendations: demandResult.recommendations
          },
          timestamp: new Date().toISOString()
        })

      case 'route':
        const routeAnalysis = await routeOptimizer.analyzeRoute(
          parameters.origin,
          parameters.destination,
          parameters.serviceType || 'standard',
          parameters.timeOfDay || new Date().toISOString(),
          parameters.securityLevel || 'standard'
        )

        return NextResponse.json({
          success: true,
          data: {
            type: 'route_analysis',
            analysis: routeAnalysis,
            optimalRoute: routeAnalysis.routeOptions.find(r => r.id === routeAnalysis.optimalRoute),
            securityScore: routeAnalysis.securityScore,
            riskFactors: routeAnalysis.riskFactors,
            recommendations: routeAnalysis.securityRecommendations
          },
          timestamp: new Date().toISOString()
        })

      case 'customer_behavior':
        if (!parameters.customerId) {
          return NextResponse.json(
            { success: false, error: 'Customer ID required for behavior analysis' },
            { status: 400 }
          )
        }

        const customerBehavior = customerAnalyzer.analyzeCustomer(parameters.customerId)
        if (!customerBehavior) {
          return NextResponse.json(
            { success: false, error: 'Customer not found' },
            { status: 404 }
          )
        }

        const recommendations = customerAnalyzer.generateRecommendations(parameters.customerId)

        return NextResponse.json({
          success: true,
          data: {
            type: 'customer_behavior',
            analysis: customerBehavior,
            recommendations: recommendations,
            churnRisk: customerBehavior.churnRisk,
            lifetimeValue: customerBehavior.lifetimeValue,
            nextBookingPrediction: customerBehavior.nextBookingPrediction
          },
          timestamp: new Date().toISOString()
        })

      case 'availability':
        // Driver availability prediction
        const availabilityForecast = Array.from({ length: 24 }, (_, i) => {
          const hour = new Date()
          hour.setHours(hour.getHours() + i)
          
          return {
            timeSlot: hour.toISOString(),
            availableDrivers: Math.floor(Math.random() * 20) + 15,
            demandLevel: Math.floor(Math.random() * 10) + 1,
            utilizationRate: (Math.random() * 40) + 60,
            recommendation: i >= 6 && i <= 9 || i >= 17 && i <= 19 
              ? 'Peak hours - consider surge pricing' 
              : 'Normal operations'
          }
        })

        return NextResponse.json({
          success: true,
          data: {
            type: 'availability_forecast',
            forecast: availabilityForecast,
            summary: {
              peakHours: ['07:00-09:00', '17:00-19:00'],
              lowDemandPeriods: ['23:00-06:00'],
              averageUtilization: 78
            }
          },
          timestamp: new Date().toISOString()
        })

      case 'security_risk':
        const riskAnalysis = {
          overallRiskLevel: 'low',
          threatAreas: [
            {
              location: 'Westminster',
              riskLevel: 'medium',
              threats: ['protest activity', 'increased police presence'],
              recommendations: ['avoid during peak hours', 'use alternative routes']
            }
          ],
          routeRisks: [
            {
              route: 'London → Heathrow',
              riskScore: 15,
              factors: ['normal traffic', 'well-lit route', 'CCTV coverage']
            }
          ],
          incidentPrediction: {
            likelihood: 0.05,
            timeframe: '24 hours',
            confidence: 0.78
          }
        }

        return NextResponse.json({
          success: true,
          data: {
            type: 'security_risk_assessment',
            analysis: riskAnalysis,
            recommendations: [
              'Maintain current security protocols',
              'Monitor Westminster area closely',
              'Brief drivers on alternative routes'
            ]
          },
          timestamp: new Date().toISOString()
        })

      case 'batch_predictions':
        // Handle multiple prediction types in one request
        const batchResults = []

        for (const predictionRequest of parameters.requests) {
          switch (predictionRequest.type) {
            case 'demand':
              const demand = await demandPredictor.predictDemand(
                predictionRequest.parameters.timeSlot,
                predictionRequest.parameters.location,
                predictionRequest.parameters.serviceType
              )
              batchResults.push({
                id: predictionRequest.id,
                type: 'demand',
                result: demand
              })
              break

            case 'route':
              const route = await routeOptimizer.analyzeRoute(
                predictionRequest.parameters.origin,
                predictionRequest.parameters.destination
              )
              batchResults.push({
                id: predictionRequest.id,
                type: 'route',
                result: route
              })
              break
          }
        }

        return NextResponse.json({
          success: true,
          data: {
            type: 'batch_predictions',
            results: batchResults,
            summary: {
              total: batchResults.length,
              successful: batchResults.length,
              failed: 0
            }
          },
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown prediction type',
            availableTypes: ['demand', 'route', 'customer_behavior', 'availability', 'security_risk', 'batch_predictions']
          },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Predictions API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate predictions',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const location = searchParams.get('location') || 'London'
    const timeRange = searchParams.get('timeRange') || '24h'

    if (!type) {
      return NextResponse.json(
        {
          success: false,
          error: 'Prediction type required',
          availableTypes: ['demand', 'route', 'customer_behavior', 'availability', 'security_risk']
        },
        { status: 400 }
      )
    }

    const demandPredictor = new DemandPredictor({
      bookings: mockBookingData,
      weatherData: [],
      eventData: []
    })

    switch (type) {
      case 'demand_forecast':
        const hoursAhead = timeRange === '24h' ? 24 : timeRange === '48h' ? 48 : 12
        const forecast = await demandPredictor.generateForecast(
          location,
          'close-protection',
          hoursAhead
        )

        return NextResponse.json({
          success: true,
          data: {
            type: 'demand_forecast',
            location,
            timeRange,
            forecast,
            metadata: {
              totalPredictions: forecast.length,
              averageConfidence: forecast.reduce((sum, f) => sum + f.confidence, 0) / forecast.length,
              highDemandPeriods: forecast.filter(f => f.predictedDemand > 8).length
            }
          },
          timestamp: new Date().toISOString()
        })

      case 'demand_patterns':
        const patterns = demandPredictor.analyzeDemandPatterns()
        
        return NextResponse.json({
          success: true,
          data: {
            type: 'demand_patterns',
            patterns,
            insights: {
              peakHour: patterns.peakHours[0],
              busyLocation: patterns.busyLocations[0],
              popularService: patterns.popularServices[0],
              seasonalityScore: 0.65
            }
          },
          timestamp: new Date().toISOString()
        })

      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Unknown GET prediction type',
            availableTypes: ['demand_forecast', 'demand_patterns']
          },
          { status: 400 }
        )
    }

  } catch (error) {
    console.error('Predictions GET API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve predictions',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}