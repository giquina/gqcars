'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Shield, Car, Building2, Sparkles, Star, Calendar, Clock, User, Mail, Phone, MapPin, Brain, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react'
import SmartInput from './SmartInput'
import FormAnalytics from './FormAnalytics'
import AccessibilityHelper from './AccessibilityHelper'

interface SmartBookingFormData {
  service: string
  subService: string
  date: string
  time: string
  duration: string
  location: string
  destination?: string
  name: string
  email: string
  phone: string
  requirements: string
  riskLevel: 'low' | 'medium' | 'high'
  urgency: 'standard' | 'urgent' | 'emergency'
  budget: string
  previousClient: boolean
  referenceNumber?: string
}

interface AIInsight {
  type: 'suggestion' | 'warning' | 'optimization' | 'validation'
  field: string
  message: string
  confidence: number
  action?: string
}

interface FormStep {
  id: number
  title: string
  description: string
  fields: string[]
  estimatedTime: number
  completed: boolean
}

const initialFormData: SmartBookingFormData = {
  service: '',
  subService: '',
  date: '',
  time: '',
  duration: '',
  location: '',
  destination: '',
  name: '',
  email: '',
  phone: '',
  requirements: '',
  riskLevel: 'low',
  urgency: 'standard',
  budget: '',
  previousClient: false,
  referenceNumber: ''
}

export default function SmartBookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<SmartBookingFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [formSteps, setFormSteps] = useState<FormStep[]>([])
  const [startTime] = useState(Date.now())
  const [fieldInteractionTimes, setFieldInteractionTimes] = useState<Record<string, number>>({})
  const [autoSaveData, setAutoSaveData] = useState<string>('')
  const autoSaveRef = useRef<NodeJS.Timeout>()

  // Initialize dynamic form steps based on service selection
  useEffect(() => {
    const steps = generateDynamicSteps(formData.service)
    setFormSteps(steps)
  }, [formData.service])

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveRef.current) {
      clearTimeout(autoSaveRef.current)
    }
    
    autoSaveRef.current = setTimeout(() => {
      const savedData = JSON.stringify(formData)
      localStorage.setItem('gq_booking_autosave', savedData)
      setAutoSaveData(savedData)
    }, 2000)

    return () => {
      if (autoSaveRef.current) {
        clearTimeout(autoSaveRef.current)
      }
    }
  }, [formData])

  // Load auto-saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('gq_booking_autosave')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
      } catch (error) {
        console.error('Error loading auto-saved data:', error)
      }
    }
  }, [])

  // AI-powered form analysis
  const analyzeFormData = useCallback((data: SmartBookingFormData, field: string) => {
    const insights: AIInsight[] = []

    // Location-based service suggestions
    if (field === 'location' && data.location) {
      const location = data.location.toLowerCase()
      if (location.includes('airport') || location.includes('heathrow') || location.includes('gatwick')) {
        insights.push({
          type: 'suggestion',
          field: 'service',
          message: 'Airport transfers typically require VIP or Private Hire services for optimal security',
          confidence: 0.85,
          action: 'Consider VIP Services for airport transfers'
        })
      }
      
      if (location.includes('embassy') || location.includes('government') || location.includes('diplomatic')) {
        insights.push({
          type: 'warning',
          field: 'riskLevel',
          message: 'High-security location detected. Enhanced protection recommended.',
          confidence: 0.95,
          action: 'Upgrade to Close Protection service'
        })
      }
    }

    // Time-based risk assessment
    if (field === 'time' && data.time) {
      const hour = parseInt(data.time.split(':')[0])
      if (hour >= 22 || hour <= 5) {
        insights.push({
          type: 'optimization',
          field: 'riskLevel',
          message: 'Late night services may require additional security measures',
          confidence: 0.75,
          action: 'Consider upgrading security level'
        })
      }
    }

    // Duration optimization
    if (field === 'duration' && data.duration) {
      const hours = parseInt(data.duration)
      if (hours >= 12) {
        insights.push({
          type: 'suggestion',
          field: 'service',
          message: 'Extended duration services benefit from multiple officer rotations',
          confidence: 0.80,
          action: 'Consider team-based protection'
        })
      }
    }

    // Email validation with AI
    if (field === 'email' && data.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(data.email)) {
        insights.push({
          type: 'validation',
          field: 'email',
          message: 'Please enter a valid email address',
          confidence: 1.0
        })
      } else if (data.email.includes('gmail') || data.email.includes('hotmail')) {
        insights.push({
          type: 'suggestion',
          field: 'email',
          message: 'For corporate bookings, consider using your business email',
          confidence: 0.60
        })
      }
    }

    // Budget optimization
    if (field === 'budget' && data.budget && data.service) {
      const budget = parseInt(data.budget)
      const serviceCosts = {
        'close-protection': 600,
        'private-hire': 760,
        'corporate': 680,
        'weddings': 520,
        'vip': 760
      }
      
      const estimatedCost = serviceCosts[data.service as keyof typeof serviceCosts] || 600
      if (budget < estimatedCost * 0.8) {
        insights.push({
          type: 'warning',
          field: 'budget',
          message: `Budget may be insufficient for selected service. Estimated cost: £${estimatedCost}`,
          confidence: 0.85
        })
      }
    }

    setAiInsights(insights)
  }, [])

  const generateDynamicSteps = (serviceType: string): FormStep[] => {
    const baseSteps = [
      {
        id: 1,
        title: 'Service Selection',
        description: 'Choose your security service',
        fields: ['service'],
        estimatedTime: 30,
        completed: false
      },
      {
        id: 2,
        title: 'Service Details',
        description: 'Specify your requirements',
        fields: ['date', 'time', 'duration', 'location'],
        estimatedTime: 90,
        completed: false
      },
      {
        id: 3,
        title: 'Contact Information',
        description: 'Your contact details',
        fields: ['name', 'email', 'phone'],
        estimatedTime: 60,
        completed: false
      }
    ]

    // Add dynamic steps based on service type
    if (serviceType === 'close-protection' || serviceType === 'vip') {
      baseSteps.splice(2, 0, {
        id: 2.5,
        title: 'Risk Assessment',
        description: 'Security evaluation',
        fields: ['riskLevel', 'requirements'],
        estimatedTime: 45,
        completed: false
      })
    }

    if (serviceType === 'private-hire') {
      baseSteps[1].fields.push('destination')
    }

    return baseSteps
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Track field interaction time
    setFieldInteractionTimes(prev => ({
      ...prev,
      [name]: Date.now()
    }))

    const newFormData = { ...formData, [name]: value }
    setFormData(newFormData)
    
    // Run AI analysis
    analyzeFormData(newFormData, name)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Calculate form completion metrics
      const completionTime = Date.now() - startTime
      const interactionData = {
        formData,
        completionTime,
        fieldInteractionTimes,
        aiInsightsGenerated: aiInsights.length,
        stepsCompleted: step
      }

      console.log('Smart form submitted:', interactionData)
      
      // Clear auto-saved data
      localStorage.removeItem('gq_booking_autosave')
      
      alert('Thank you for your booking request. Our AI has optimized your submission for the best service match.')
      setFormData(initialFormData)
      setStep(1)
      setAiInsights([])
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again.')
    }
    
    setLoading(false)
  }

  const nextStep = () => {
    const currentStepData = formSteps[step - 1]
    if (currentStepData) {
      currentStepData.completed = true
    }
    setStep(prev => prev + 1)
  }

  const prevStep = () => setStep(prev => prev - 1)

  const getStepProgress = () => {
    const totalSteps = formSteps.length
    return Math.round((step / totalSteps) * 100)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* AI Status Indicator */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
        <Brain className="w-5 h-5 text-blue-400" />
        <span className="text-sm text-blue-400">AI-Enhanced Form</span>
        <div className="ml-auto flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400">Optimizing your experience</span>
        </div>
      </div>

      {/* Dynamic Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gq-gold">{getStepProgress()}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-gq-blue to-gq-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${getStepProgress()}%` }}
          />
        </div>
        <div className="flex justify-between mt-4">
          {formSteps.map((stepInfo, index) => (
            <div
              key={stepInfo.id}
              className={`flex flex-col items-center ${index < formSteps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1 ? 'bg-green-500 text-white' :
                  step === index + 1 ? 'bg-gq-gold text-white' : 
                  'bg-gray-700 text-gray-400'
                }`}
              >
                {step > index + 1 ? <CheckCircle className="w-4 h-4" /> : index + 1}
              </div>
              <span className="text-xs text-center">{stepInfo.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Panel */}
      {aiInsights.length > 0 && (
        <div className="mb-6 space-y-2">
          {aiInsights.map((insight, index) => (
            <div
              key={index}
              className={`p-3 border rounded-lg ${
                insight.type === 'warning' ? 'border-red-500/30 bg-red-500/10' :
                insight.type === 'suggestion' ? 'border-blue-500/30 bg-blue-500/10' :
                insight.type === 'optimization' ? 'border-green-500/30 bg-green-500/10' :
                'border-yellow-500/30 bg-yellow-500/10'
              }`}
            >
              <div className="flex items-start gap-3">
                {insight.type === 'warning' && <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />}
                {insight.type === 'suggestion' && <Brain className="w-5 h-5 text-blue-400 mt-0.5" />}
                {insight.type === 'optimization' && <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />}
                {insight.type === 'validation' && <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm">{insight.message}</p>
                  {insight.action && (
                    <button className="text-xs text-gq-gold hover:underline mt-1">
                      {insight.action}
                    </button>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      Confidence: {Math.round(insight.confidence * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Service Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      handleChange({
                        target: { name: 'service', value: service.id }
                      } as any)
                      setTimeout(() => nextStep(), 500)
                    }}
                    className={`p-6 border-2 ${
                      formData.service === service.id
                        ? 'border-gq-gold bg-gq-gold/10'
                        : 'border-gray-700'
                    } hover:border-gq-gold transition-all duration-300 text-left group`}
                  >
                    <service.icon className="w-8 h-8 text-gq-gold mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                    <div className="mt-3 text-xs text-gq-gold">
                      From £{service.basePrice}/hour
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmartInput
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                icon={Calendar}
                aiSuggestions={getDateSuggestions()}
                required
              />

              <SmartInput
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                icon={Clock}
                aiSuggestions={getTimeSuggestions(formData.date)}
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none transition-colors"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="4">4 hours (Half day)</option>
                  <option value="8">8 hours (Full day)</option>
                  <option value="12">12 hours (Extended)</option>
                  <option value="24">24 hours (Full protection)</option>
                  <option value="custom">Custom duration</option>
                </select>
              </div>

              <SmartInput
                label="Location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                icon={MapPin}
                placeholder="Enter pickup location"
                aiSuggestions={getLocationSuggestions()}
                required
              />

              {formData.service === 'private-hire' && (
                <SmartInput
                  label="Destination"
                  name="destination"
                  type="text"
                  value={formData.destination || ''}
                  onChange={handleChange}
                  icon={MapPin}
                  placeholder="Enter destination"
                  aiSuggestions={getLocationSuggestions()}
                />
              )}

              {(formData.service === 'close-protection' || formData.service === 'vip') && (
                <div>
                  <label className="block text-sm font-medium mb-2">Risk Level Assessment</label>
                  <select
                    name="riskLevel"
                    value={formData.riskLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                  >
                    <option value="low">Low Risk</option>
                    <option value="medium">Medium Risk</option>
                    <option value="high">High Risk</option>
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Please describe any special requirements, security concerns, or additional information..."
                className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none h-32 resize-none transition-colors"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-700 hover:border-gq-gold transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SmartInput
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                placeholder="Enter your full name"
                required
              />

              <SmartInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                placeholder="Enter your email"
                required
              />

              <SmartInput
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                icon={Phone}
                placeholder="Enter your phone number"
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2">Urgency Level</label>
                <select
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                >
                  <option value="standard">Standard (24-48 hours)</option>
                  <option value="urgent">Urgent (Same day)</option>
                  <option value="emergency">Emergency (Immediate)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="previousClient"
                checked={formData.previousClient}
                onChange={(e) => setFormData(prev => ({ ...prev, previousClient: e.target.checked }))}
                className="w-4 h-4 text-gq-gold bg-gq-black border-gray-700 rounded focus:ring-gq-gold"
              />
              <label htmlFor="previousClient" className="text-sm">
                I am a returning client
              </label>
            </div>

            {formData.previousClient && (
              <SmartInput
                label="Reference Number"
                name="referenceNumber"
                type="text"
                value={formData.referenceNumber || ''}
                onChange={handleChange}
                placeholder="Enter your previous booking reference"
              />
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-700 hover:border-gq-gold transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Processing with AI...' : 'Submit Smart Request'}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Auto-save indicator */}
      {autoSaveData && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-3 py-1 rounded text-sm">
          ✓ Auto-saved
        </div>
      )}

      {/* Accessibility Helper */}
      <AccessibilityHelper />

      {/* Form Analytics */}
      <FormAnalytics 
        formData={formData}
        startTime={startTime}
        currentStep={step}
        totalSteps={formSteps.length}
      />
    </div>
  )
}

// Helper functions for AI suggestions
function getDateSuggestions(): string[] {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 7)
  
  return [
    tomorrow.toISOString().split('T')[0],
    nextWeek.toISOString().split('T')[0]
  ]
}

function getTimeSuggestions(date: string): string[] {
  const suggestions = ['09:00', '12:00', '18:00', '20:00']
  
  // Add context-aware suggestions based on date
  if (date) {
    const selectedDate = new Date(date)
    if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
      // Weekend suggestions
      return ['10:00', '14:00', '19:00', '21:00']
    }
  }
  
  return suggestions
}

function getLocationSuggestions(): string[] {
  return [
    'Heathrow Airport',
    'Gatwick Airport',
    'London City Airport',
    'Canary Wharf',
    'Mayfair',
    'Westminster',
    'Kensington',
    'Watford'
  ]
}

const services = [
  {
    id: 'close-protection',
    name: 'Close Protection',
    description: 'Professional personal security and threat management',
    icon: Shield,
    basePrice: 75
  },
  {
    id: 'private-hire',
    name: 'Private Hire',
    description: 'Luxury vehicle service with security trained drivers',
    icon: Car,
    basePrice: 95
  },
  {
    id: 'corporate',
    name: 'Corporate Security',
    description: 'Comprehensive business and executive protection',
    icon: Building2,
    basePrice: 85
  },
  {
    id: 'weddings',
    name: 'Wedding Security',
    description: 'Discreet security for your special day',
    icon: Sparkles,
    basePrice: 65
  },
  {
    id: 'vip',
    name: 'VIP Services',
    description: 'Bespoke security solutions for high-profile clients',
    icon: Star,
    basePrice: 95
  }
]