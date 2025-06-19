'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Clock, TrendingUp, Target, Brain, AlertTriangle, Zap, Award } from 'lucide-react'

interface FormProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  formData: any
  startTime: number
  completedFields: string[]
  requiredFields: string[]
}

interface ProgressInsight {
  type: 'completion' | 'optimization' | 'warning' | 'encouragement'
  message: string
  icon: React.ReactNode
  action?: string
}

interface ProgressMetrics {
  completionPercentage: number
  estimatedTimeRemaining: number
  fieldCompletionRate: number
  conversionProbability: number
  abandonmentRisk: 'low' | 'medium' | 'high'
}

export default function FormProgressIndicator({
  currentStep,
  totalSteps,
  formData,
  startTime,
  completedFields,
  requiredFields
}: FormProgressIndicatorProps) {
  const [metrics, setMetrics] = useState<ProgressMetrics>({
    completionPercentage: 0,
    estimatedTimeRemaining: 0,
    fieldCompletionRate: 0,
    conversionProbability: 0,
    abandonmentRisk: 'low'
  })
  const [insights, setInsights] = useState<ProgressInsight[]>([])
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    calculateMetrics()
    generateInsights()
  }, [currentStep, formData, completedFields])

  const calculateMetrics = () => {
    const timeElapsed = (Date.now() - startTime) / 1000 // seconds
    const stepProgress = (currentStep / totalSteps) * 100
    const fieldProgress = (completedFields.length / requiredFields.length) * 100
    const avgStepTime = timeElapsed / currentStep
    const estimatedRemaining = Math.max(0, (totalSteps - currentStep) * avgStepTime)

    // AI-powered conversion probability calculation
    let conversionProb = 0.5 // base probability
    
    // Increase probability based on progress
    conversionProb += (stepProgress / 100) * 0.3
    
    // Increase based on field completion
    conversionProb += (fieldProgress / 100) * 0.2
    
    // Adjust based on time spent (sweet spot around 2-5 minutes)
    if (timeElapsed > 120 && timeElapsed < 300) {
      conversionProb += 0.15
    } else if (timeElapsed > 600) {
      conversionProb -= 0.1
    }
    
    // Adjust based on service value (higher value services have higher conversion intent)
    if (formData.service === 'vip' || formData.service === 'close-protection') {
      conversionProb += 0.1
    }
    
    conversionProb = Math.min(1, Math.max(0, conversionProb))

    // Calculate abandonment risk
    let abandonmentRisk: 'low' | 'medium' | 'high' = 'low'
    if (timeElapsed > 600 && stepProgress < 50) {
      abandonmentRisk = 'high'
    } else if (timeElapsed > 300 && stepProgress < 30) {
      abandonmentRisk = 'medium'
    }

    setMetrics({
      completionPercentage: Math.round((stepProgress + fieldProgress) / 2),
      estimatedTimeRemaining: Math.round(estimatedRemaining),
      fieldCompletionRate: Math.round(fieldProgress),
      conversionProbability: conversionProb,
      abandonmentRisk
    })
  }

  const generateInsights = () => {
    const newInsights: ProgressInsight[] = []
    const timeElapsed = (Date.now() - startTime) / 1000

    // Completion encouragement
    if (metrics.completionPercentage > 70) {
      newInsights.push({
        type: 'encouragement',
        message: 'You\'re almost done! Just a few more details needed.',
        icon: <Award className="w-4 h-4 text-green-400" />
      })
    } else if (metrics.completionPercentage > 40) {
      newInsights.push({
        type: 'encouragement',
        message: 'Great progress! You\'re halfway through.',
        icon: <TrendingUp className="w-4 h-4 text-blue-400" />
      })
    }

    // Time-based insights
    if (timeElapsed > 300 && currentStep <= 2) {
      newInsights.push({
        type: 'optimization',
        message: 'Consider using voice commands to speed up form completion.',
        icon: <Zap className="w-4 h-4 text-yellow-400" />,
        action: 'Enable voice input'
      })
    }

    // Field completion insights
    if (metrics.fieldCompletionRate < 50 && currentStep > 2) {
      newInsights.push({
        type: 'warning',
        message: 'Some required fields are missing. Please review previous steps.',
        icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
        action: 'Review fields'
      })
    }

    // Abandonment risk warnings
    if (metrics.abandonmentRisk === 'high') {
      newInsights.push({
        type: 'warning',
        message: 'Need help? Our team is available 24/7 at 07407 655 203.',
        icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
        action: 'Get assistance'
      })
    }

    // Conversion optimization
    if (metrics.conversionProbability > 0.8) {
      newInsights.push({
        type: 'optimization',
        message: 'Your booking looks great! Submit now for priority processing.',
        icon: <Target className="w-4 h-4 text-green-400" />,
        action: 'Submit now'
      })
    }

    // Service-specific insights
    if (formData.service === 'close-protection' && !formData.riskLevel) {
      newInsights.push({
        type: 'completion',
        message: 'Risk assessment helps us provide optimal protection.',
        icon: <Brain className="w-4 h-4 text-blue-400" />
      })
    }

    setInsights(newInsights)
  }

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getProgressColor = () => {
    if (metrics.completionPercentage >= 80) return 'from-green-500 to-emerald-500'
    if (metrics.completionPercentage >= 60) return 'from-blue-500 to-cyan-500'
    if (metrics.completionPercentage >= 40) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getAbandonmentRiskColor = () => {
    switch (metrics.abandonmentRisk) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-green-400'
    }
  }

  return (
    <div className="bg-gq-black/50 border border-gray-700 rounded-lg p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-gq-gold" />
          <h3 className="font-bold text-sm">Smart Progress Tracker</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-gq-gold hover:underline"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm text-gq-gold">{metrics.completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${getProgressColor()} transition-all duration-500 relative`}
            style={{ width: `${metrics.completionPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`flex flex-col items-center ${
              step < totalSteps ? 'flex-1' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mb-1 ${
                step < currentStep ? 'bg-green-500 text-white' :
                step === currentStep ? 'bg-gq-gold text-black' :
                'bg-gray-700 text-gray-400'
              }`}
            >
              {step < currentStep ? <CheckCircle className="w-3 h-3" /> : step}
            </div>
            <span className="text-xs text-center">Step {step}</span>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      {insights.length > 0 && (
        <div className="space-y-2 mb-4">
          {insights.slice(0, showDetails ? insights.length : 2).map((insight, index) => (
            <div
              key={index}
              className={`p-2 border rounded text-xs ${
                insight.type === 'warning' ? 'border-red-500/30 bg-red-500/10' :
                insight.type === 'optimization' ? 'border-blue-500/30 bg-blue-500/10' :
                insight.type === 'encouragement' ? 'border-green-500/30 bg-green-500/10' :
                'border-yellow-500/30 bg-yellow-500/10'
              }`}
            >
              <div className="flex items-start gap-2">
                {insight.icon}
                <div className="flex-1">
                  <p>{insight.message}</p>
                  {insight.action && (
                    <button className="text-gq-gold hover:underline mt-1">
                      {insight.action}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Metrics */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
          <div className="text-center">
            <div className="text-sm font-medium text-gq-gold">
              {Math.round(metrics.conversionProbability * 100)}%
            </div>
            <div className="text-xs text-gray-400">Conversion Probability</div>
          </div>

          <div className="text-center">
            <div className={`text-sm font-medium ${getAbandonmentRiskColor()}`}>
              {metrics.abandonmentRisk.toUpperCase()}
            </div>
            <div className="text-xs text-gray-400">Abandonment Risk</div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-blue-400">
              {formatTime(metrics.estimatedTimeRemaining)}
            </div>
            <div className="text-xs text-gray-400">Est. Time Remaining</div>
          </div>

          <div className="text-center">
            <div className="text-sm font-medium text-green-400">
              {metrics.fieldCompletionRate}%
            </div>
            <div className="text-xs text-gray-400">Fields Completed</div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
        <button className="flex-1 text-xs py-2 px-3 bg-gq-gold/20 text-gq-gold rounded hover:bg-gq-gold/30 transition-colors">
          Save Progress
        </button>
        <button className="flex-1 text-xs py-2 px-3 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30 transition-colors">
          Get Help
        </button>
      </div>
    </div>
  )
}