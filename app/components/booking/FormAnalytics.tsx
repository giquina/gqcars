'use client'

import { useEffect, useState } from 'react'
import { BarChart3, Clock, Target, TrendingUp, Eye, MousePointer } from 'lucide-react'

interface FormAnalyticsProps {
  formData: any
  startTime: number
  currentStep: number
  totalSteps: number
}

interface AnalyticsData {
  timeOnPage: number
  fieldInteractions: number
  conversionRate: number
  abandonmentRate: number
  averageStepTime: number
  deviceType: string
  screenSize: string
}

export default function FormAnalytics({ 
  formData, 
  startTime, 
  currentStep, 
  totalSteps 
}: FormAnalyticsProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)

  useEffect(() => {
    const updateAnalytics = () => {
      const now = Date.now()
      const timeOnPage = Math.round((now - startTime) / 1000)
      
      // Calculate field interactions
      const fieldInteractions = Object.keys(formData).filter(key => 
        formData[key] && formData[key].toString().length > 0
      ).length

      // Calculate conversion metrics
      const progress = (currentStep / totalSteps) * 100
      const conversionRate = Math.min(progress, 100)
      const abandonmentRate = 100 - conversionRate

      // Calculate average step time
      const averageStepTime = timeOnPage / currentStep

      // Device and screen detection
      const deviceType = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
      const screenSize = `${window.innerWidth}x${window.innerHeight}`

      setAnalytics({
        timeOnPage,
        fieldInteractions,
        conversionRate,
        abandonmentRate,
        averageStepTime,
        deviceType,
        screenSize
      })
    }

    const interval = setInterval(updateAnalytics, 2000)
    updateAnalytics()

    return () => clearInterval(interval)
  }, [formData, startTime, currentStep, totalSteps])

  if (!analytics) return null

  const getEngagementLevel = () => {
    if (analytics.timeOnPage > 300) return 'High'
    if (analytics.timeOnPage > 120) return 'Medium'
    return 'Low'
  }

  const getEngagementColor = () => {
    const level = getEngagementLevel()
    if (level === 'High') return 'text-green-400'
    if (level === 'Medium') return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Analytics Toggle Button */}
      <button
        onClick={() => setShowAnalytics(!showAnalytics)}
        className="bg-gq-black border border-gray-700 p-3 rounded-lg hover:border-gq-gold transition-colors"
        title="Form Analytics"
      >
        <BarChart3 className="w-5 h-5 text-gq-gold" />
      </button>

      {/* Analytics Panel */}
      {showAnalytics && (
        <div className="absolute bottom-full left-0 mb-2 bg-gq-black border border-gray-700 rounded-lg p-4 w-80 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-gq-gold" />
            <h3 className="font-bold text-sm">Form Analytics</h3>
            <button
              onClick={() => setShowAnalytics(false)}
              className="ml-auto text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {/* Time on Page */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm">Time on Page</span>
              </div>
              <span className="text-sm text-gq-gold">
                {Math.floor(analytics.timeOnPage / 60)}m {analytics.timeOnPage % 60}s
              </span>
            </div>

            {/* Engagement Level */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-sm">Engagement</span>
              </div>
              <span className={`text-sm ${getEngagementColor()}`}>
                {getEngagementLevel()}
              </span>
            </div>

            {/* Field Interactions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MousePointer className="w-4 h-4 text-green-400" />
                <span className="text-sm">Fields Completed</span>
              </div>
              <span className="text-sm text-gq-gold">
                {analytics.fieldInteractions}
              </span>
            </div>

            {/* Conversion Rate */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-400" />
                <span className="text-sm">Progress</span>
              </div>
              <span className="text-sm text-gq-gold">
                {Math.round(analytics.conversionRate)}%
              </span>
            </div>

            {/* Average Step Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-sm">Avg Step Time</span>
              </div>
              <span className="text-sm text-gq-gold">
                {Math.round(analytics.averageStepTime)}s
              </span>
            </div>

            {/* Device Info */}
            <div className="pt-2 border-t border-gray-700">
              <div className="text-xs text-gray-400 space-y-1">
                <div>Device: {analytics.deviceType}</div>
                <div>Screen: {analytics.screenSize}</div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="pt-2 border-t border-gray-700">
              <div className="text-xs text-blue-400">
                <div className="font-medium mb-1">AI Insights:</div>
                {analytics.timeOnPage > 180 && (
                  <div>• User is taking time to consider options</div>
                )}
                {analytics.fieldInteractions < 3 && currentStep > 1 && (
                  <div>• Consider simplifying form fields</div>
                )}
                {analytics.deviceType === 'Mobile' && (
                  <div>• Mobile user - ensure touch-friendly design</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}