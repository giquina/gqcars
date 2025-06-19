'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, User, Mail, Phone, DollarSign, Car, Brain, Zap } from 'lucide-react'

interface BookingFormData {
  service: string
  date: string
  time: string
  duration: string
  location: string
  name: string
  email: string
  phone: string
  requirements: string
}

interface AIPricing {
  price: number
  confidence: number
  factors: {
    basePrice: number
    timeMultiplier: number
    demandMultiplier: number
    weatherMultiplier: number
  }
  reasoning: string[]
}

interface AIRecommendations {
  bestTime: string
  alternativeServices: string[]
  discountOpportunities: string[]
  driverRecommendation: string
}

export default function AIEnhancedBookingForm() {
  const [formData, setFormData] = useState<BookingFormData>({
    service: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    name: '',
    email: '',
    phone: '',
    requirements: ''
  })

  const [aiPricing, setAiPricing] = useState<AIPricing | null>(null)
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendations | null>(null)
  const [isLoadingAI, setIsLoadingAI] = useState(false)
  const [step, setStep] = useState(1)

  // Simulate AI pricing calculation
  useEffect(() => {
    if (formData.service && formData.date && formData.time && formData.location) {
      calculateAIPricing()
    }
  }, [formData.service, formData.date, formData.time, formData.location])

  const calculateAIPricing = async () => {
    setIsLoadingAI(true)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock AI pricing calculation
    const basePrice = getBasePrice(formData.service)
    const timeMultiplier = getTimeMultiplier(formData.time)
    const demandMultiplier = getDemandMultiplier(formData.date, formData.time)
    const weatherMultiplier = 1.1 // Simulate weather impact
    
    const finalPrice = Math.round(basePrice * timeMultiplier * demandMultiplier * weatherMultiplier)
    
    setAiPricing({
      price: finalPrice,
      confidence: 92,
      factors: {
        basePrice,
        timeMultiplier,
        demandMultiplier,
        weatherMultiplier
      },
      reasoning: [
        timeMultiplier > 1.2 ? 'Peak hour pricing applied (+30%)' : 'Standard time pricing',
        demandMultiplier > 1.1 ? 'High demand detected (+20%)' : 'Normal demand levels',
        weatherMultiplier > 1.0 ? 'Weather conditions affect pricing (+10%)' : 'Good weather conditions',
        'AI optimized for maximum value and fairness'
      ]
    })

    // Generate AI recommendations
    setAiRecommendations({
      bestTime: '14:00',
      alternativeServices: ['VIP Service', 'Corporate Package'],
      discountOpportunities: ['Book 24h advance: 10% off', 'Loyalty member: 5% off'],
      driverRecommendation: 'John Smith (4.9★) - Specialist in ' + formData.service
    })
    
    setIsLoadingAI(false)
  }

  const getBasePrice = (service: string) => {
    const prices = {
      'close-protection': 120,
      'private-hire': 80,
      'corporate': 150,
      'weddings': 200,
      'vip': 300
    }
    return prices[service as keyof typeof prices] || 100
  }

  const getTimeMultiplier = (time: string) => {
    const hour = parseInt(time.split(':')[0])
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      return 1.3 // Peak hours
    }
    if (hour >= 22 || hour <= 6) {
      return 1.5 // Night premium
    }
    return 1.0 // Standard
  }

  const getDemandMultiplier = (date: string, time: string) => {
    const dayOfWeek = new Date(date).getDay()
    if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday/Saturday
      return 1.2
    }
    return 1.0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate AI-enhanced booking processing
    setIsLoadingAI(true)
    
    // Mock API call to AI system
    const bookingData = {
      ...formData,
      aiPricing,
      aiRecommendations,
      timestamp: new Date().toISOString()
    }
    
    console.log('AI-Enhanced Booking Submitted:', bookingData)
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('🤖 AI-Enhanced Booking Confirmed!\n\nOptimal pricing applied: £' + aiPricing?.price + '\nDriver assigned: ' + aiRecommendations?.driverRecommendation)
    
    setIsLoadingAI(false)
  }

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-8">
      {/* AI-Enhanced Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-3">
          <Brain className="w-8 h-8 text-blue-400" />
          AI-Enhanced Booking System
        </h2>
        <p className="text-slate-300">
          Powered by machine learning for optimal pricing and personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                required
              >
                <option value="">Choose your service...</option>
                <option value="close-protection">Close Protection</option>
                <option value="private-hire">Private Hire</option>
                <option value="corporate">Corporate Security</option>
                <option value="weddings">Wedding Security</option>
                <option value="vip">VIP Services</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Duration & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 123 456 7890"
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <label className="block text-sm font-medium mb-2">Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Any special requirements or additional information..."
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:border-blue-400 outline-none h-24 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoadingAI}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoadingAI ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" />
                  AI Processing...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Submit AI-Enhanced Booking
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Insights Panel */}
        <div className="space-y-6">
          {/* AI Pricing */}
          {aiPricing && (
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                AI-Optimized Pricing
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-400">£{aiPricing.price}</div>
                <div className="text-sm text-slate-400">{aiPricing.confidence}% confidence</div>
              </div>

              <div className="space-y-2 text-sm">
                <h4 className="font-semibold">Pricing Factors:</h4>
                {aiPricing.reasoning.map((reason, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                    <span className="text-slate-300">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          {aiRecommendations && (
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Recommendations
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-semibold text-purple-300">Optimal Time</h4>
                  <p className="text-slate-300">{aiRecommendations.bestTime} for best rates</p>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-300">Recommended Driver</h4>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-blue-400" />
                    <span className="text-slate-300">{aiRecommendations.driverRecommendation}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-300">Available Discounts</h4>
                  {aiRecommendations.discountOpportunities.map((discount, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-slate-300">{discount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Status */}
          <div className="bg-slate-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              AI System Status
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>Dynamic Pricing</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Smart Dispatch</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Predictive Analytics</span>
                <span className="text-green-400">Online</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <span className="text-blue-400">&lt;50ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}