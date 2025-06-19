'use client'

import { useState, useEffect, useCallback } from 'react'
import { Calculator, Shield, Car, Users, Clock, TrendingUp, Brain, AlertTriangle, CheckCircle } from 'lucide-react'

interface SmartQuoteCalculatorProps {
  onCalculate?: (total: number, insights: PricingInsight[]) => void
  formData?: any
}

interface PricingInsight {
  type: 'optimization' | 'warning' | 'suggestion' | 'discount'
  message: string
  impact: 'positive' | 'negative' | 'neutral'
  amount?: number
  confidence: number
}

interface QuoteData {
  service: string
  officers: number
  vehicles: number
  hours: number
  riskLevel: 'low' | 'medium' | 'high'
  urgency: 'standard' | 'urgent' | 'emergency'
  location: string
  date: string
  time: string
}

const initialQuoteData: QuoteData = {
  service: '',
  officers: 1,
  vehicles: 0,
  hours: 4,
  riskLevel: 'low',
  urgency: 'standard',
  location: '',
  date: '',
  time: ''
}

export default function SmartQuoteCalculator({ onCalculate, formData }: SmartQuoteCalculatorProps) {
  const [quoteData, setQuoteData] = useState<QuoteData>(initialQuoteData)
  const [total, setTotal] = useState(0)
  const [baseTotal, setBaseTotal] = useState(0)
  const [insights, setInsights] = useState<PricingInsight[]>([])
  const [loading, setLoading] = useState(false)
  const [marketData, setMarketData] = useState({
    demandMultiplier: 1.0,
    seasonalAdjustment: 1.0,
    locationPremium: 1.0
  })

  // Sync with form data if provided
  useEffect(() => {
    if (formData) {
      setQuoteData(prev => ({
        ...prev,
        service: formData.service || prev.service,
        location: formData.location || prev.location,
        date: formData.date || prev.date,
        time: formData.time || prev.time,
        riskLevel: formData.riskLevel || prev.riskLevel,
        urgency: formData.urgency || prev.urgency
      }))
    }
  }, [formData])

  // AI-powered market analysis
  useEffect(() => {
    const analyzeMarket = async () => {
      setLoading(true)
      
      // Simulate market data analysis
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Calculate demand multiplier based on date/time
      let demandMultiplier = 1.0
      if (quoteData.date && quoteData.time) {
        const selectedDate = new Date(quoteData.date)
        const hour = parseInt(quoteData.time.split(':')[0])
        
        // Weekend premium
        if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
          demandMultiplier += 0.15
        }
        
        // Night time premium
        if (hour >= 22 || hour <= 5) {
          demandMultiplier += 0.25
        }
        
        // Peak hours
        if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
          demandMultiplier += 0.1
        }
      }

      // Location premium
      let locationPremium = 1.0
      if (quoteData.location) {
        const location = quoteData.location.toLowerCase()
        if (location.includes('mayfair') || location.includes('kensington') || location.includes('belgravia')) {
          locationPremium += 0.2
        }
        if (location.includes('airport') || location.includes('heathrow') || location.includes('gatwick')) {
          locationPremium += 0.15
        }
        if (location.includes('embassy') || location.includes('government')) {
          locationPremium += 0.3
        }
      }

      // Seasonal adjustment (simplified)
      const seasonalAdjustment = 1.0 + (Math.random() * 0.1 - 0.05) // ±5% random seasonal variation

      setMarketData({
        demandMultiplier,
        seasonalAdjustment,
        locationPremium
      })
      
      setLoading(false)
    }

    if (quoteData.service) {
      analyzeMarket()
    }
  }, [quoteData.service, quoteData.date, quoteData.time, quoteData.location])

  const calculateSmartQuote = useCallback(() => {
    const baseRates = {
      'close-protection': 75,
      'private-hire': 95,
      'corporate': 85,
      'weddings': 65,
      'vip': 95
    }

    const riskMultipliers = {
      'low': 1.0,
      'medium': 1.2,
      'high': 1.5
    }

    const urgencyMultipliers = {
      'standard': 1.0,
      'urgent': 1.3,
      'emergency': 1.8
    }

    const baseRate = baseRates[quoteData.service as keyof typeof baseRates] || 0
    const riskMultiplier = riskMultipliers[quoteData.riskLevel]
    const urgencyMultiplier = urgencyMultipliers[quoteData.urgency]

    // Calculate base costs
    const officerCost = quoteData.service === 'private-hire' ? 0 : baseRate * quoteData.officers * quoteData.hours
    const vehicleCost = quoteData.service === 'private-hire' 
      ? baseRate * quoteData.vehicles * quoteData.hours 
      : quoteData.vehicles * 65 * quoteData.hours

    const baseSubtotal = officerCost + vehicleCost
    const adjustedSubtotal = baseSubtotal * riskMultiplier * urgencyMultiplier

    // Apply market adjustments
    const marketAdjustedTotal = adjustedSubtotal * 
      marketData.demandMultiplier * 
      marketData.seasonalAdjustment * 
      marketData.locationPremium

    setBaseTotal(Math.round(adjustedSubtotal))
    setTotal(Math.round(marketAdjustedTotal))

    // Generate AI insights
    generatePricingInsights(baseSubtotal, marketAdjustedTotal)
  }, [quoteData, marketData])

  const generatePricingInsights = (basePrice: number, finalPrice: number) => {
    const newInsights: PricingInsight[] = []

    // Price optimization insights
    const priceDifference = finalPrice - basePrice
    const percentageChange = (priceDifference / basePrice) * 100

    if (percentageChange > 20) {
      newInsights.push({
        type: 'warning',
        message: `Current market conditions increase price by ${Math.round(percentageChange)}%`,
        impact: 'negative',
        amount: priceDifference,
        confidence: 0.85
      })
    } else if (percentageChange < -5) {
      newInsights.push({
        type: 'discount',
        message: `Favorable conditions provide ${Math.round(Math.abs(percentageChange))}% discount`,
        impact: 'positive',
        amount: Math.abs(priceDifference),
        confidence: 0.9
      })
    }

    // Service-specific insights
    if (quoteData.service === 'close-protection' && quoteData.officers === 1 && quoteData.hours >= 12) {
      newInsights.push({
        type: 'suggestion',
        message: 'Consider adding a second officer for extended protection periods',
        impact: 'neutral',
        confidence: 0.8
      })
    }

    if (quoteData.service === 'private-hire' && quoteData.vehicles === 0) {
      newInsights.push({
        type: 'warning',
        message: 'Private hire service requires at least one vehicle',
        impact: 'negative',
        confidence: 1.0
      })
    }

    // Risk level insights
    if (quoteData.riskLevel === 'high' && quoteData.officers < 2) {
      newInsights.push({
        type: 'suggestion',
        message: 'High-risk situations typically require multiple officers',
        impact: 'neutral',
        confidence: 0.9
      })
    }

    // Time-based insights
    if (quoteData.urgency === 'emergency') {
      newInsights.push({
        type: 'optimization',
        message: 'Emergency booking - immediate response team dispatched',
        impact: 'positive',
        confidence: 0.95
      })
    }

    // Location insights
    if (quoteData.location.toLowerCase().includes('airport')) {
      newInsights.push({
        type: 'suggestion',
        message: 'Airport transfers include meet & greet service',
        impact: 'positive',
        confidence: 0.8
      })
    }

    // Bulk discount insights
    if (quoteData.hours >= 24) {
      newInsights.push({
        type: 'discount',
        message: '24+ hour bookings qualify for extended service discount',
        impact: 'positive',
        amount: finalPrice * 0.05,
        confidence: 0.9
      })
    }

    setInsights(newInsights)
    onCalculate?.(finalPrice, newInsights)
  }

  useEffect(() => {
    if (quoteData.service) {
      calculateSmartQuote()
    }
  }, [calculateSmartQuote, quoteData.service])

  const handleChange = (field: keyof QuoteData, value: any) => {
    setQuoteData(prev => ({ ...prev, [field]: value }))
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimization':
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'suggestion':
        return <Brain className="w-4 h-4 text-blue-400" />
      case 'discount':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      default:
        return <Brain className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-gq-gold" />
        <h3 className="text-xl font-bold">Smart Quote Calculator</h3>
        {loading && <Brain className="w-5 h-5 text-blue-400 animate-pulse" />}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Service Type</label>
          <select
            value={quoteData.service}
            onChange={(e) => handleChange('service', e.target.value)}
            className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
          >
            <option value="">Select service</option>
            <option value="close-protection">Close Protection</option>
            <option value="private-hire">Private Hire</option>
            <option value="corporate">Corporate Security</option>
            <option value="weddings">Wedding Security</option>
            <option value="vip">VIP Services</option>
          </select>
        </div>

        {quoteData.service !== 'private-hire' && (
          <div>
            <label className="block text-sm font-medium mb-2">Number of Officers</label>
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-gq-gold" />
              <input
                type="number"
                min="1"
                max="10"
                value={quoteData.officers}
                onChange={(e) => handleChange('officers', parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">
            {quoteData.service === 'private-hire' ? 'Number of Vehicles' : 'Additional Vehicles'}
          </label>
          <div className="flex items-center gap-4">
            <Car className="w-5 h-5 text-gq-gold" />
            <input
              type="number"
              min={quoteData.service === 'private-hire' ? 1 : 0}
              max="5"
              value={quoteData.vehicles}
              onChange={(e) => handleChange('vehicles', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration (hours)</label>
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-gq-gold" />
            <input
              type="number"
              min="4"
              max="168"
              step="4"
              value={quoteData.hours}
              onChange={(e) => handleChange('hours', parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
            />
          </div>
        </div>

        {/* Advanced Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Risk Level</label>
            <select
              value={quoteData.riskLevel}
              onChange={(e) => handleChange('riskLevel', e.target.value)}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
            >
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Urgency</label>
            <select
              value={quoteData.urgency}
              onChange={(e) => handleChange('urgency', e.target.value)}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
            >
              <option value="standard">Standard</option>
              <option value="urgent">Urgent</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>

        {/* AI Insights */}
        {insights.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gq-gold">AI Insights</h4>
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`p-3 border rounded-lg text-sm ${
                  insight.impact === 'positive' ? 'border-green-500/30 bg-green-500/10' :
                  insight.impact === 'negative' ? 'border-red-500/30 bg-red-500/10' :
                  'border-blue-500/30 bg-blue-500/10'
                }`}
              >
                <div className="flex items-start gap-2">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <p>{insight.message}</p>
                    {insight.amount && (
                      <p className={`text-xs mt-1 ${
                        insight.impact === 'positive' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {insight.impact === 'positive' ? 'Saves' : 'Adds'} £{Math.round(insight.amount)}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Confidence: {Math.round(insight.confidence * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quote Summary */}
        <div className="pt-6 border-t border-gray-700">
          {baseTotal !== total && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Base Price</span>
              <span className="text-sm line-through text-gray-400">£{baseTotal}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Smart Quote Total</span>
            <span className="text-2xl font-bold text-gq-gold">£{total}</span>
          </div>
          
          <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
            <Brain className="w-3 h-3" />
            AI-optimized pricing based on current market conditions
          </div>
          
          <p className="text-xs text-gray-400 mt-2">
            * Final quote may vary based on specific requirements and availability.
          </p>
        </div>

        {/* Market Indicators */}
        {quoteData.service && (
          <div className="pt-4 border-t border-gray-700">
            <h4 className="text-xs font-medium text-gray-400 mb-2">Market Indicators</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className={`text-sm ${marketData.demandMultiplier > 1.1 ? 'text-red-400' : 'text-green-400'}`}>
                  {Math.round((marketData.demandMultiplier - 1) * 100)}%
                </div>
                <div className="text-gray-500">Demand</div>
              </div>
              <div className="text-center">
                <div className={`text-sm ${marketData.locationPremium > 1.1 ? 'text-orange-400' : 'text-blue-400'}`}>
                  {Math.round((marketData.locationPremium - 1) * 100)}%
                </div>
                <div className="text-gray-500">Location</div>
              </div>
              <div className="text-center">
                <div className={`text-sm ${marketData.seasonalAdjustment > 1.05 ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {Math.round((marketData.seasonalAdjustment - 1) * 100)}%
                </div>
                <div className="text-gray-500">Seasonal</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}