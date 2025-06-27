'use client'

import { useState, useRef, useEffect } from 'react'
import { Shield, Car, Building2, Sparkles, Star, Calendar, Clock, User, Mail, Phone, MapPin, Navigation, Calculator, AlertCircle } from 'lucide-react'

interface BookingFormData {
  service: string
  subService: string
  date: string
  time: string
  duration: string
  pickupLocation: string
  dropoffLocation: string
  name: string
  email: string
  phone: string
  requirements: string
}

interface LocationSuggestion {
  name: string
  fullAddress: string
  type: string
}

interface RouteData {
  distance: string
  duration: string
  success: boolean
}

const initialFormData: BookingFormData = {
  service: '',
  subService: '',
  date: '',
  time: '',
  duration: '',
  pickupLocation: '',
  dropoffLocation: '',
  name: '',
  email: '',
  phone: '',
  requirements: ''
}

// Enhanced location suggestions with popular UK destinations
const locationSuggestions: LocationSuggestion[] = [
  { name: 'Heathrow Airport', fullAddress: 'Heathrow Airport, Hounslow TW6 1EW', type: 'airport' },
  { name: 'Gatwick Airport', fullAddress: 'Gatwick Airport, Horley RH6 0NP', type: 'airport' },
  { name: 'Stansted Airport', fullAddress: 'Stansted Airport, Bishop\'s Stortford CM24 1QW', type: 'airport' },
  { name: 'City of London', fullAddress: 'City of London, London EC2V 6DN', type: 'business' },
  { name: 'Canary Wharf', fullAddress: 'Canary Wharf, London E14 5AB', type: 'business' },
  { name: 'Westminster', fullAddress: 'Westminster, London SW1A 1AA', type: 'area' },
  { name: 'The Ritz London', fullAddress: 'The Ritz London, 150 Piccadilly, London W1J 9BR', type: 'hotel' },
  { name: 'Claridge\'s', fullAddress: 'Claridge\'s, Brook Street, London W1K 6JP', type: 'hotel' }
]

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [routeData, setRouteData] = useState<RouteData | null>(null)
  const [routeCalculating, setRouteCalculating] = useState(false)
  const [routeError, setRouteError] = useState<string | null>(null)
  
  // Location autocomplete states
  const [pickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([])
  const [dropoffSuggestions, setDropoffSuggestions] = useState<LocationSuggestion[]>([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false)
  const pickupRef = useRef<HTMLDivElement>(null)
  const dropoffRef = useRef<HTMLDivElement>(null)

  // Search locations for autocomplete
  const searchLocations = (query: string) => {
    if (!query || query.length < 2) return []
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
    
    return locationSuggestions.filter(location => {
      const searchableText = `${location.name} ${location.fullAddress}`.toLowerCase()
      return searchTerms.every(term => searchableText.includes(term))
    }).slice(0, 6)
  }

  // Handle pickup location changes
  const handlePickupLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, pickupLocation: value }))
    const suggestions = searchLocations(value)
    setPickupSuggestions(suggestions)
    setShowPickupSuggestions(suggestions.length > 0)
    
    // Clear route when location changes
    setRouteData(null)
    setRouteError(null)
  }

  // Handle dropoff location changes  
  const handleDropoffLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, dropoffLocation: value }))
    const suggestions = searchLocations(value)
    setDropoffSuggestions(suggestions)
    setShowDropoffSuggestions(suggestions.length > 0)
    
    // Clear route when location changes
    setRouteData(null)
    setRouteError(null)
  }

  // Select pickup suggestion
  const selectPickupSuggestion = (suggestion: LocationSuggestion) => {
    setFormData(prev => ({ ...prev, pickupLocation: suggestion.fullAddress }))
    setShowPickupSuggestions(false)
    calculateRoute(suggestion.fullAddress, formData.dropoffLocation)
  }

  // Select dropoff suggestion
  const selectDropoffSuggestion = (suggestion: LocationSuggestion) => {
    setFormData(prev => ({ ...prev, dropoffLocation: suggestion.fullAddress }))
    setShowDropoffSuggestions(false)
    calculateRoute(formData.pickupLocation, suggestion.fullAddress)
  }

  // Calculate route using Google Maps API
  const calculateRoute = async (pickup?: string, dropoff?: string) => {
    const origin = pickup || formData.pickupLocation
    const destination = dropoff || formData.dropoffLocation
    
    if (!origin.trim() || !destination.trim()) return

    setRouteCalculating(true)
    setRouteError(null)

    try {
      const response = await fetch('/api/maps/route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pickup: origin, 
          destination: destination 
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRouteData({
          distance: data.distance,
          duration: data.duration,
          success: true
        })
      } else {
        const error = await response.json()
        setRouteError(error.error || 'Unable to calculate route')
      }
    } catch (error) {
      console.error('Route calculation error:', error)
      setRouteError('Network error - please check your connection')
    } finally {
      setRouteCalculating(false)
    }
  }

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false)
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Enhanced booking data with route information
      const bookingData = {
        ...formData,
        routeInfo: routeData,
        submittedAt: new Date().toISOString()
      }
      
      console.log('Enhanced booking submitted:', bookingData)
      
      // Create WhatsApp message with all details
      const message = `🚗 NEW BOOKING REQUEST
      
📋 Service: ${services.find(s => s.id === formData.service)?.name || formData.service}
📅 Date: ${formData.date}
⏰ Time: ${formData.time}
⏱️ Duration: ${formData.duration} hours

📍 Pickup: ${formData.pickupLocation}
📍 Dropoff: ${formData.dropoffLocation}
${routeData ? `🗺️ Route: ${routeData.distance}, ${routeData.duration}` : ''}

👤 Contact Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

💬 Requirements: ${formData.requirements || 'None specified'}`

      const encodedMessage = encodeURIComponent(message)
      window.open(`https://wa.me/447407655203?text=${encodedMessage}`, '_blank')
      
      alert('Thank you for your booking request. We will contact you shortly.')
      setFormData(initialFormData)
      setRouteData(null)
      setStep(1)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again.')
    }
    
    setLoading(false)
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`flex items-center ${num < 3 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-gq-gold text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {num}
            </div>
            {num < 3 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  step > num ? 'bg-gq-gold' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

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
                      nextStep()
                    }}
                    className={`p-6 border-2 ${
                      formData.service === service.id
                        ? 'border-gq-gold'
                        : 'border-gray-700'
                    } hover:border-gq-gold transition-colors text-left`}
                  >
                    <service.icon className="w-8 h-8 text-gq-gold mb-3" />
                    <h3 className="font-bold mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service Details */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Enhanced Location Selection with Google Maps Integration */}
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-600">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Navigation className="w-5 h-5 text-yellow-500" />
                <span>Journey Details</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Enhanced Pickup Location with Autocomplete */}
                <div className="relative" ref={pickupRef}>
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Pickup Location</span>
                    </div>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={handlePickupLocationChange}
                      onFocus={() => {
                        if (formData.pickupLocation.length >= 2) {
                          const suggestions = searchLocations(formData.pickupLocation)
                          setPickupSuggestions(suggestions)
                          setShowPickupSuggestions(suggestions.length > 0)
                        }
                      }}
                      placeholder="Enter pickup address or landmark..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      required
                    />
                  </div>
                  
                  {/* Pickup Autocomplete Suggestions */}
                  {showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-gray-800 border border-gray-600 rounded-xl mt-1 shadow-2xl max-h-64 overflow-y-auto">
                      {pickupSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectPickupSuggestion(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors flex items-center space-x-3"
                        >
                          <span className="text-lg">
                            {suggestion.type === 'airport' ? '✈️' : 
                             suggestion.type === 'hotel' ? '🏨' : 
                             suggestion.type === 'business' ? '🏢' : '📍'}
                          </span>
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">{suggestion.name}</div>
                            <div className="text-gray-400 text-xs">{suggestion.fullAddress}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Dropoff Location with Autocomplete */}
                <div className="relative" ref={dropoffRef}>
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span>Drop-off Location</span>
                    </div>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
                    <input
                      type="text"
                      value={formData.dropoffLocation}
                      onChange={handleDropoffLocationChange}
                      onFocus={() => {
                        if (formData.dropoffLocation.length >= 2) {
                          const suggestions = searchLocations(formData.dropoffLocation)
                          setDropoffSuggestions(suggestions)
                          setShowDropoffSuggestions(suggestions.length > 0)
                        }
                      }}
                      placeholder="Enter destination address or landmark..."
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      required
                    />
                  </div>
                  
                  {/* Dropoff Autocomplete Suggestions */}
                  {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-gray-800 border border-gray-600 rounded-xl mt-1 shadow-2xl max-h-64 overflow-y-auto">
                      {dropoffSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => selectDropoffSuggestion(suggestion)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors flex items-center space-x-3"
                        >
                          <span className="text-lg">
                            {suggestion.type === 'airport' ? '✈️' : 
                             suggestion.type === 'hotel' ? '🏨' : 
                             suggestion.type === 'business' ? '🏢' : '📍'}
                          </span>
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">{suggestion.name}</div>
                            <div className="text-gray-400 text-xs">{suggestion.fullAddress}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Route Calculation Display */}
              {(routeCalculating || routeData || routeError) && (
                <div className="mt-4 p-4 rounded-xl border">
                  {routeCalculating && (
                    <div className="flex items-center space-x-3 text-blue-400">
                      <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">Calculating route with Google Maps...</span>
                    </div>
                  )}
                  
                  {routeData && (
                    <div className="bg-green-500/20 border-green-500/50 border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calculator className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">Route Calculated</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-300">Distance: </span>
                          <span className="text-white font-medium">{routeData.distance}</span>
                        </div>
                        <div>
                          <span className="text-gray-300">Duration: </span>
                          <span className="text-white font-medium">{routeData.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {routeError && (
                    <div className="bg-yellow-500/20 border-yellow-500/50 border rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-yellow-300 text-sm">{routeError}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Manual Route Calculation Button */}
              {formData.pickupLocation && formData.dropoffLocation && !routeData && !routeCalculating && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => calculateRoute()}
                    className="w-full bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 rounded-xl py-3 px-4 text-blue-300 font-medium transition-all flex items-center justify-center space-x-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Route with Google Maps</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="custom">Custom duration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Please describe any special requirements or additional information"
                className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none h-32 resize-none"
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
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>
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
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

const services = [
  {
    id: 'close-protection',
    name: 'Close Protection',
    description: 'Professional personal security and threat management',
    icon: Shield
  },
  {
    id: 'private-hire',
    name: 'Private Hire',
    description: 'Luxury vehicle service with security trained drivers',
    icon: Car
  },
  {
    id: 'corporate',
    name: 'Corporate Security',
    description: 'Comprehensive business and executive protection',
    icon: Building2
  },
  {
    id: 'weddings',
    name: 'Wedding Security',
    description: 'Discreet security for your special day',
    icon: Sparkles
  },
  {
    id: 'vip',
    name: 'VIP Services',
    description: 'Bespoke security solutions for high-profile clients',
    icon: Star
  }
]