'use client'

import { useState, useRef, useEffect } from 'react'
import { Shield, Car, Building2, GlassWater, Star, Calendar, Clock, User, Mail, Phone, MapPin, Navigation, Send } from 'lucide-react'
import DateTimePicker from '../ui/DateTimePicker'

interface FormErrors {
  [key: string]: string
}

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

// Address autocomplete component
function AddressInput({ 
  value, 
  onChange, 
  placeholder, 
  name,
  icon: Icon,
  iconColor = "text-gray-400",
  onCurrentLocation 
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  name: string
  icon: any
  iconColor?: string
  onCurrentLocation?: () => void
}) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Mock address suggestions - in real app, use Google Places API
  const mockSuggestions = [
    'Heathrow Airport, Longford, UK',
    'Gatwick Airport, West Sussex, UK',
    'London Bridge Station, London, UK',
    'King\'s Cross Station, London, UK',
    'Westminster, London, UK',
    'Canary Wharf, London, UK',
    'Oxford Street, London, UK',
    'Hyde Park Corner, London, UK'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)
    
    if (inputValue.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      )
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${iconColor}`} />
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          onFocus={() => value.length > 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-amber-500 outline-none transition-colors"
          autoComplete="off"
        />
        {onCurrentLocation && (
          <button
            type="button"
            onClick={onCurrentLocation}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
            title="Use current location"
          >
            <Navigation className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => selectSuggestion(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-200">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function EnhancedBookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (step === 1 && !formData.service) {
      newErrors.service = 'Please select a service'
    }

    if (step === 2) {
      if (!formData.date) newErrors.date = 'Date is required'
      if (!formData.time) newErrors.time = 'Time is required'
      if (!formData.duration) newErrors.duration = 'Duration is required'
      if (!formData.pickupLocation) newErrors.pickupLocation = 'Pickup location is required'
      
      const selectedDate = new Date(`${formData.date} ${formData.time}`)
      if (selectedDate < new Date()) {
        newErrors.date = 'Date and time must be in the future'
      }
    }

    if (step === 3) {
      if (!formData.name) newErrors.name = 'Name is required'
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
        newErrors.email = 'Invalid email address'
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone is required'
      } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone number'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd reverse geocode these coordinates
          setFormData(prev => ({ 
            ...prev, 
            pickupLocation: `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})` 
          }))
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your current location. Please enter manually.')
        }
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || 'Failed to submit booking')
      }

      setFormData(initialFormData)
      setStep(1)
      alert('🎉 Thank you! Your booking request has been submitted. We will contact you shortly with confirmation and next steps.')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please try again or call us directly.')
    }
    
    setLoading(false)
  }

  const nextStep = () => {
    if (validateForm()) {
      setStep(prev => prev + 1)
    }
  }

  const prevStep = () => setStep(prev => prev - 1)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className={`flex items-center ${num < 3 ? 'flex-1' : ''}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
              step >= num 
                ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white shadow-lg scale-110' 
                : 'bg-gray-700 text-gray-400'
            }`}>
              {num}
            </div>
            {num < 3 && (
              <div className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                step > num ? 'bg-gradient-to-r from-blue-600 to-amber-500' : 'bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Select Your Service</h2>
              <p className="text-gray-400">Choose the security service that best meets your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    handleChange({ target: { name: 'service', value: service.id } } as any)
                    setTimeout(nextStep, 300)
                  }}
                  className={`p-6 border-2 rounded-xl transition-all duration-300 text-left group hover:scale-105 ${
                    formData.service === service.id
                      ? 'border-amber-500 bg-gradient-to-br from-amber-500/10 to-blue-500/10 shadow-lg'
                      : 'border-gray-700 hover:border-amber-500/50 hover:bg-gray-800/50'
                  }`}
                >
                  <service.icon className="w-14 h-14 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Location & Details */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Journey Details</h2>
              <p className="text-gray-400">Let us know when and where you need our services</p>
            </div>
            
            {/* Location Inputs */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-3 text-green-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  Pickup Location
                </label>
                <AddressInput
                  value={formData.pickupLocation}
                  onChange={(value) => setFormData(prev => ({ ...prev, pickupLocation: value }))}
                  placeholder="Enter pickup address, postcode, or landmark..."
                  name="pickupLocation"
                  icon={MapPin}
                  iconColor="text-green-400"
                  onCurrentLocation={getCurrentLocation}
                />
                <div className="flex gap-3 mt-2 text-xs">
                  <span className="text-red-400 flex items-center gap-1">
                    <Navigation className="w-3 h-3" /> Use current location
                  </span>
                  <span className="text-blue-400">🔍 Search landmarks</span>
                  <span className="text-yellow-400">📮 Enter postcode</span>
                </div>
                {errors.pickupLocation && (
                  <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-red-400 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full" />
                  Drop-off Location (Optional)
                </label>
                <AddressInput
                  value={formData.dropoffLocation}
                  onChange={(value) => setFormData(prev => ({ ...prev, dropoffLocation: value }))}
                  placeholder="Enter destination address, postcode, or landmark..."
                  name="dropoffLocation"
                  icon={MapPin}
                  iconColor="text-red-400"
                />
                <div className="flex gap-3 mt-1 text-xs">
                  <span className="text-blue-400">🏠 Home</span>
                  <span className="text-gray-400">💼 Work</span>
                  <span className="text-green-400">✈️ Airport</span>
                  <span className="text-purple-400">🏨 Hotels</span>
                </div>
              </div>
            </div>

            {/* Date & Time Picker */}
            <DateTimePicker
              date={formData.date}
              time={formData.time}
              onDateChange={(date) => setFormData(prev => ({ ...prev, date }))}
              onTimeChange={(time) => setFormData(prev => ({ ...prev, time }))}
              className="mb-6"
            />

            {/* Duration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                >
                  <option value="">Select duration</option>
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="custom">Custom duration</option>
                </select>
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-600 rounded-lg hover:border-amber-500 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3">Contact Details</h2>
              <p className="text-gray-400">How can we reach you to confirm your booking?</p>
            </div>
            
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
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Any special requirements, accessibility needs, or additional information..."
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:border-amber-500 outline-none h-32 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-600 rounded-lg hover:border-amber-500 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 font-semibold flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Booking Request
                  </>
                )}
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
    description: 'Professional personal security and threat management services',
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
    description: 'Comprehensive business and executive protection services',
    icon: Building2
  },
  {
    id: 'weddings',
    name: 'Wedding Security',
    description: 'Discreet security services for your special day',
    icon: GlassWater
  },
  {
    id: 'vip',
    name: 'VIP Services',
    description: 'Bespoke security solutions for high-profile clients',
    icon: Star
  }
]