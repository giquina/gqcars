'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Car, Clock, Star, Calculator, ArrowRight, Navigation, Sparkles, Phone, Shield, Crown, Users, Calendar, Search } from 'lucide-react'
import { BoldCard, BoldButton } from './BoldDynamicComponents'

// Types for location suggestions
interface LocationSuggestion {
  name: string
  type: string
  postcode: string
  fullAddress: string
}

// Types for quote results
interface QuoteResult {
  distance: string
  originalPrice: string
  discountPrice: string
  savings: string
  estimatedTime: number
  serviceName: string
}

// Enhanced location suggestions with autocomplete
const locationSuggestions: LocationSuggestion[] = [
  // Airports
  { name: 'Heathrow Airport', type: 'airport', postcode: 'TW6 1EW', fullAddress: 'Heathrow Airport, Hounslow TW6 1EW' },
  { name: 'Gatwick Airport', type: 'airport', postcode: 'RH6 0NP', fullAddress: 'Gatwick Airport, Horley RH6 0NP' },
  { name: 'Stansted Airport', type: 'airport', postcode: 'CM24 1QW', fullAddress: 'Stansted Airport, Bishop\'s Stortford CM24 1QW' },
  { name: 'Luton Airport', type: 'airport', postcode: 'LU2 9LY', fullAddress: 'Luton Airport, Luton LU2 9LY' },
  { name: 'London City Airport', type: 'airport', postcode: 'E16 2PX', fullAddress: 'London City Airport, London E16 2PX' },
  
  // Central London Areas
  { name: 'Westminster', type: 'area', postcode: 'SW1A 1AA', fullAddress: 'Westminster, London SW1A 1AA' },
  { name: 'Canary Wharf', type: 'business', postcode: 'E14 5AB', fullAddress: 'Canary Wharf, London E14 5AB' },
  { name: 'The City of London', type: 'business', postcode: 'EC2V 6DN', fullAddress: 'City of London, London EC2V 6DN' },
  { name: 'King\'s Cross', type: 'transport', postcode: 'N1C 4TB', fullAddress: 'King\'s Cross, London N1C 4TB' },
  { name: 'Liverpool Street', type: 'transport', postcode: 'EC2M 7PN', fullAddress: 'Liverpool Street, London EC2M 7PN' },
  { name: 'Oxford Circus', type: 'shopping', postcode: 'W1B 3AG', fullAddress: 'Oxford Circus, London W1B 3AG' },
  { name: 'Covent Garden', type: 'entertainment', postcode: 'WC2E 8RF', fullAddress: 'Covent Garden, London WC2E 8RF' },
  { name: 'Piccadilly Circus', type: 'entertainment', postcode: 'W1J 9HS', fullAddress: 'Piccadilly Circus, London W1J 9HS' },
  
  // Hotels
  { name: 'The Shard', type: 'landmark', postcode: 'SE1 9SG', fullAddress: 'The Shard, London SE1 9SG' },
  { name: 'Hilton London Park Lane', type: 'hotel', postcode: 'W1K 1BE', fullAddress: 'Hilton London Park Lane, 22 Park Lane, London W1K 1BE' },
  { name: 'The Ritz London', type: 'hotel', postcode: 'W1J 9BR', fullAddress: 'The Ritz London, 150 Piccadilly, London W1J 9BR' },
  { name: 'Claridge\'s', type: 'hotel', postcode: 'W1K 6JP', fullAddress: 'Claridge\'s, Brook Street, London W1K 6JP' },
  
  // Popular Areas
  { name: 'Shoreditch', type: 'area', postcode: 'E1 6JE', fullAddress: 'Shoreditch, London E1 6JE' },
  { name: 'Camden', type: 'area', postcode: 'NW1 7JR', fullAddress: 'Camden, London NW1 7JR' },
  { name: 'Greenwich', type: 'area', postcode: 'SE10 9NN', fullAddress: 'Greenwich, London SE10 9NN' },
  { name: 'Richmond', type: 'area', postcode: 'TW9 1DN', fullAddress: 'Richmond, London TW9 1DN' },
  { name: 'Wimbledon', type: 'area', postcode: 'SW19 1DD', fullAddress: 'Wimbledon, London SW19 1DD' },
  
  // Business Districts
  { name: 'Bishopsgate', type: 'business', postcode: 'EC2N 4AY', fullAddress: 'Bishopsgate, London EC2N 4AY' },
  { name: 'Bank', type: 'business', postcode: 'EC3V 3NG', fullAddress: 'Bank, London EC3V 3NG' },
  { name: 'Moorgate', type: 'business', postcode: 'EC2Y 9AE', fullAddress: 'Moorgate, London EC2Y 9AE' },
]

const getLocationIcon = (type: string) => {
  switch (type) {
    case 'airport': return '✈️'
    case 'hotel': return '🏨'
    case 'business': return '🏢'
    case 'transport': return '🚉'
    case 'shopping': return '🛍️'
    case 'entertainment': return '🎭'
    case 'landmark': return '🏛️'
    default: return '📍'
  }
}

export default function QuoteWidget() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [serviceType, setServiceType] = useState('standard')
  const [bookingType, setBookingType] = useState('now') // 'now' or 'schedule'
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showQuote, setShowQuote] = useState(false)
  const [quote, setQuote] = useState<QuoteResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Autocomplete states
  const [pickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([])
  const [dropoffSuggestions, setDropoffSuggestions] = useState<LocationSuggestion[]>([])
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false)
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false)
  const [pickupFocused, setPickupFocused] = useState(false)
  const [dropoffFocused, setDropoffFocused] = useState(false)
  
  const pickupRef = useRef<HTMLDivElement>(null)
  const dropoffRef = useRef<HTMLDivElement>(null)

  const serviceTypes = [
    { 
      id: 'standard', 
      name: 'GQ Standard', 
      price: 6.50, 
      icon: Car, 
      color: 'blue',
      description: 'Professional taxi with SIA security driver',
      features: ['SIA licensed security driver', 'GPS tracking', 'Secure transport', 'Card payments'],
      capacity: '1-4 passengers',
      waitTime: '1-15 min',
      popular: false
    },
    { 
      id: 'executive', 
      name: 'GQ Executive', 
      price: 10.50, 
      icon: Crown, 
      color: 'purple',
      description: 'Premium vehicles with SIA security driver',
      features: ['SIA licensed security driver', 'Luxury vehicles', 'Business amenities', 'Priority service'],
      capacity: '1-4 passengers',
      waitTime: '5-20 min',
      popular: true
    },
    { 
      id: 'xl', 
      name: 'GQ XL', 
      price: 7.20, 
      icon: Users, 
      color: 'green',
      description: 'Large group vehicles with SIA security driver',
      features: ['SIA licensed security driver', '5-8 passengers', 'Extra luggage space', 'Group bookings'],
      capacity: '5-8 passengers',
      waitTime: '3-18 min',
      popular: false
    }
  ]

  // Enhanced search function with better matching
  const searchLocations = (query: string) => {
    if (!query || query.length < 2) return []
    
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0)
    
    return locationSuggestions.filter(location => {
      const searchableText = `${location.name} ${location.postcode} ${location.fullAddress}`.toLowerCase()
      return searchTerms.every(term => searchableText.includes(term))
    }).slice(0, 8) // Limit to 8 suggestions
  }

  // Handle pickup input changes with autocomplete
  const handlePickupChange = (value: string) => {
    setPickup(value)
    const suggestions = searchLocations(value)
    setPickupSuggestions(suggestions)
    setShowPickupSuggestions(suggestions.length > 0 && pickupFocused)
  }

  // Handle dropoff input changes with autocomplete
  const handleDropoffChange = (value: string) => {
    setDropoff(value)
    const suggestions = searchLocations(value)
    setDropoffSuggestions(suggestions)
    setShowDropoffSuggestions(suggestions.length > 0 && dropoffFocused)
  }

  // Handle suggestion selection
  const selectPickupSuggestion = (suggestion: LocationSuggestion) => {
    setPickup(suggestion.fullAddress)
    setShowPickupSuggestions(false)
    setPickupFocused(false)
  }

  const selectDropoffSuggestion = (suggestion: LocationSuggestion) => {
    setDropoff(suggestion.fullAddress)
    setShowDropoffSuggestions(false)
    setDropoffFocused(false)
  }

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickupRef.current && !pickupRef.current.contains(event.target as Node)) {
        setShowPickupSuggestions(false)
        setPickupFocused(false)
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target as Node)) {
        setShowDropoffSuggestions(false)
        setDropoffFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const calculateQuote = async () => {
    if (pickup && dropoff) {
      setIsCalculating(true)
      
      // Simulate API call delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const basePrice = serviceTypes.find(s => s.id === serviceType)?.price || 7.00
      const estimatedDistance = Math.random() * 15 + 5 // Mock distance 5-20 miles
      const totalPrice = basePrice * estimatedDistance
      const discountPrice = totalPrice * 0.5 // 50% off first ride
      
      setQuote({
        distance: estimatedDistance.toFixed(1),
        originalPrice: totalPrice.toFixed(2),
        discountPrice: discountPrice.toFixed(2),
        savings: (totalPrice - discountPrice).toFixed(2),
        estimatedTime: Math.round(estimatedDistance * 2.5), // Mock time estimate
        serviceName: serviceTypes.find(s => s.id === serviceType)?.name || 'GQ Standard'
      })
      setShowQuote(true)
      setIsCalculating(false)
    }
  }

  const handleBookNow = () => {
    // In a real app, this would redirect to booking page or open booking modal
    window.location.href = `tel:07407655203`
  }

  return (
    <BoldCard glowing className="relative overflow-hidden">
      <div className="relative z-10">
        {/* Enhanced Header - Mobile Optimized */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Calculator className="w-6 h-6 text-yellow-400 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              ⚡ GET INSTANT QUOTE
            </h2>
            <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
          <p className="text-gray-300 font-semibold mb-4">🔥 Enter your journey details for real-time pricing</p>
          
          {/* SIA Licensed Guarantee */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 px-4 py-3 rounded-xl mb-4">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-white font-black text-sm">🛡️ ALL JOURNEYS WITH SIA LICENSED SECURITY DRIVERS</span>
            </div>
          </div>
          
          {/* Enhanced 50% OFF Banner */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-black mx-auto w-fit animate-pulse shadow-2xl border-2 border-yellow-300">
            🔥 50% OFF FIRST RIDE - LIMITED TIME 🔥
          </div>
        </div>

        {/* Enhanced Quote Form - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {/* Enhanced Pickup Location with Autocomplete - Mobile Responsive */}
          <div className="relative" ref={pickupRef}>
            <label className="block text-yellow-500 font-semibold mb-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span>Pickup Location</span>
              </div>
            </label>
            <div className="relative">
              <input
                type="text"
                value={pickup}
                onChange={(e) => handlePickupChange(e.target.value)}
                onFocus={() => {
                  setPickupFocused(true)
                  if (pickup.length >= 2) {
                    const suggestions = searchLocations(pickup)
                    setPickupSuggestions(suggestions)
                    setShowPickupSuggestions(suggestions.length > 0)
                  }
                }}
                placeholder="Start typing address, postcode, or landmark..."
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all text-sm sm:text-base"
              />
              <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-green-400">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <button className="absolute right-2 sm:right-3 top-2.5 sm:top-3 text-gray-400 hover:text-yellow-500 transition-colors">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Pickup Autocomplete Suggestions */}
            {showPickupSuggestions && pickupSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-gray-800 border border-gray-600 rounded-xl mt-1 shadow-2xl max-h-64 overflow-y-auto">
                {pickupSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectPickupSuggestion(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors flex items-center space-x-3"
                  >
                    <span className="text-lg">{getLocationIcon(suggestion.type)}</span>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{suggestion.name}</div>
                      <div className="text-gray-400 text-xs">{suggestion.fullAddress}</div>
                    </div>
                    <div className="text-xs text-gray-500 capitalize bg-gray-700 px-2 py-1 rounded">
                      {suggestion.type}
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <div className="mt-1 text-xs text-gray-400 flex flex-wrap gap-1">
              <span>📍 Current location</span>
              <span>•</span>
              <span>🔍 Search landmarks</span>
              <span>•</span>
              <span>📮 Enter postcode</span>
            </div>
          </div>

          {/* Enhanced Dropoff Location with Autocomplete - Mobile Responsive */}
          <div className="relative" ref={dropoffRef}>
            <label className="block text-yellow-500 font-semibold mb-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-sm"></div>
                <span>Drop-off Location</span>
              </div>
            </label>
            <div className="relative">
              <input
                type="text"
                value={dropoff}
                onChange={(e) => handleDropoffChange(e.target.value)}
                onFocus={() => {
                  setDropoffFocused(true)
                  if (dropoff.length >= 2) {
                    const suggestions = searchLocations(dropoff)
                    setDropoffSuggestions(suggestions)
                    setShowDropoffSuggestions(suggestions.length > 0)
                  }
                }}
                placeholder="Start typing destination address, postcode, or landmark..."
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all text-sm sm:text-base"
              />
              <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-red-400">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-sm"></div>
              </div>
              <button className="absolute right-2 sm:right-3 top-2.5 sm:top-3 text-gray-400 hover:text-yellow-500 transition-colors">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Dropoff Autocomplete Suggestions */}
            {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-gray-800 border border-gray-600 rounded-xl mt-1 shadow-2xl max-h-64 overflow-y-auto">
                {dropoffSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectDropoffSuggestion(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0 transition-colors flex items-center space-x-3"
                  >
                    <span className="text-lg">{getLocationIcon(suggestion.type)}</span>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{suggestion.name}</div>
                      <div className="text-gray-400 text-xs">{suggestion.fullAddress}</div>
                    </div>
                    <div className="text-xs text-gray-500 capitalize bg-gray-700 px-2 py-1 rounded">
                      {suggestion.type}
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            <div className="mt-1 text-xs text-gray-400 flex flex-wrap gap-1">
              <span>🏠 Home</span>
              <span>•</span>
              <span>💼 Work</span>
              <span>•</span>
              <span>✈️ Airport</span>
              <span>•</span>
              <span>🏨 Hotels</span>
            </div>
          </div>

          {/* Quick Location Shortcuts - Enhanced */}
          <div className="bg-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-600">
            <div className="text-sm text-gray-300 mb-3 font-medium">🎯 Popular Destinations:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button 
                onClick={() => {
                  setDropoff('Heathrow Airport, Hounslow TW6 1EW')
                  setShowDropoffSuggestions(false)
                }}
                className="text-xs bg-blue-600/20 hover:bg-blue-600/30 p-2 rounded-lg text-blue-300 hover:text-white transition-colors text-center border border-blue-500/30"
              >
                ✈️ Heathrow
              </button>
              <button 
                onClick={() => {
                  setDropoff('Gatwick Airport, Horley RH6 0NP')
                  setShowDropoffSuggestions(false)
                }}
                className="text-xs bg-blue-600/20 hover:bg-blue-600/30 p-2 rounded-lg text-blue-300 hover:text-white transition-colors text-center border border-blue-500/30"
              >
                ✈️ Gatwick
              </button>
              <button 
                onClick={() => {
                  setDropoff('City of London, London EC2V 6DN')
                  setShowDropoffSuggestions(false)
                }}
                className="text-xs bg-green-600/20 hover:bg-green-600/30 p-2 rounded-lg text-green-300 hover:text-white transition-colors text-center border border-green-500/30"
              >
                🏙️ City Centre
              </button>
              <button 
                onClick={() => {
                  setDropoff('Canary Wharf, London E14 5AB')
                  setShowDropoffSuggestions(false)
                }}
                className="text-xs bg-purple-600/20 hover:bg-purple-600/30 p-2 rounded-lg text-purple-300 hover:text-white transition-colors text-center border border-purple-500/30"
              >
                🏢 Canary Wharf
              </button>
            </div>
            <div className="mt-2 text-center">
              <button className="text-xs text-gray-400 hover:text-yellow-500 transition-colors">
                + More destinations
              </button>
            </div>
          </div>



          {/* Enhanced Service Type Selector - 3 Options No Scroll */}
          <div>
            <label className="block text-yellow-500 font-semibold mb-3 text-sm">
              <Car className="w-4 h-4 inline mr-2" />
              Choose Your Service (All include SIA Licensed Security Drivers)
            </label>
            <div className="space-y-3">
              {serviceTypes.map((service) => {
                const IconComponent = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => setServiceType(service.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:scale-[1.01] relative ${
                      serviceType === service.id
                        ? `border-${service.color}-500 bg-${service.color}-500/20 shadow-lg ring-2 ring-${service.color}-500/50`
                        : 'border-gray-600 bg-gray-800/30 hover:border-gray-500 hover:bg-gray-700/30'
                    }`}
                  >
                    {service.popular && (
                      <div className="absolute -top-2 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          serviceType === service.id ? `bg-${service.color}-500` : 'bg-gray-600'
                        }`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-bold text-lg">{service.name}</span>
                            <div className="text-right">
                              <div className="text-white font-bold text-lg">£{service.price}</div>
                              <div className="text-gray-400 text-xs">per mile</div>
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm mb-2">{service.description}</div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{service.capacity}</span>
                            <span className="text-gray-400">{service.waitTime}</span>
                          </div>
                          {serviceType === service.id && (
                            <div className="mt-3 pt-3 border-t border-gray-600">
                              <div className="text-sm text-gray-300">
                                ✓ {service.features.join(' • ')}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
            <div className="mt-3 text-xs text-gray-400 text-center">
              🛡️ All services include SIA Licensed Security Drivers as standard
            </div>
          </div>

          {/* Booking Type Selector */}
          <div>
            <label className="block text-yellow-500 font-semibold mb-3 text-sm">
              <Clock className="w-4 h-4 inline mr-2" />
              When do you need the ride?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setBookingType('now')}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  bookingType === 'now'
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Clock className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-bold">Book Now</span>
                <p className="text-xs opacity-75">Available in 1-20 min</p>
              </button>
              <button
                onClick={() => setBookingType('schedule')}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  bookingType === 'schedule'
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                <span className="text-sm font-bold">Schedule</span>
                <p className="text-xs opacity-75">Choose date & time</p>
              </button>
            </div>
          </div>

          {/* Date and Time Selection (only show when scheduling) */}
          {bookingType === 'schedule' && (
            <div className="space-y-4">
              <div>
                <label className="block text-yellow-500 font-semibold mb-2 text-sm">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-yellow-500 font-semibold mb-2 text-sm">
                  Select Time
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                >
                  <option value="">Choose time</option>
                  <option value="00:00">12:00 AM</option>
                  <option value="01:00">1:00 AM</option>
                  <option value="02:00">2:00 AM</option>
                  <option value="03:00">3:00 AM</option>
                  <option value="04:00">4:00 AM</option>
                  <option value="05:00">5:00 AM</option>
                  <option value="06:00">6:00 AM</option>
                  <option value="07:00">7:00 AM</option>
                  <option value="08:00">8:00 AM</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="22:00">10:00 PM</option>
                  <option value="23:00">11:00 PM</option>
                </select>
              </div>
            </div>
          )}

          {/* Enhanced Calculate Button */}
          <BoldButton
            variant="primary"
            size="lg"
            onClick={calculateQuote}
            disabled={!pickup || !dropoff || isCalculating || (bookingType === 'schedule' && (!selectedDate || !selectedTime))}
            className="w-full"
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>⚡ CALCULATING...</span>
              </>
            ) : (
              <>
                <Car className="w-5 h-5" />
                <span>🔥 {bookingType === 'now' ? 'BOOK NOW' : 'SCHEDULE RIDE'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </BoldButton>
        </div>

        {/* Enhanced Quote Results */}
        {showQuote && quote && (
          <div className="mt-6">
            <BoldCard glowing className="animate-slideUp">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent flex items-center justify-center space-x-2">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                  <span>🎉 YOUR QUOTE IS READY!</span>
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </h3>
                <p className="text-gray-300 font-semibold">🛡️ Service: {quote.serviceName}</p>
              </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center bg-black/30 p-3 rounded-xl">
                <div className="text-2xl font-bold text-green-400">{quote.distance} mi</div>
                <div className="text-gray-300 text-sm">Distance</div>
              </div>
              <div className="text-center bg-black/30 p-3 rounded-xl">
                <div className="text-2xl font-bold text-blue-400">{quote.estimatedTime} min</div>
                <div className="text-gray-300 text-sm">Est. Time</div>
              </div>
            </div>

            <div className="bg-black/40 p-4 rounded-xl mb-6 border border-gray-600">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Original Price:</span>
                <span className="text-gray-400 line-through text-lg">£{quote.originalPrice}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-green-400 font-semibold">🔥 50% OFF First Ride:</span>
                <span className="text-green-400 font-bold">-£{quote.savings}</span>
              </div>
              <div className="border-t border-gray-600 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-white font-bold text-lg">Your Price:</span>
                  <span className="text-yellow-500 font-bold text-3xl">£{quote.discountPrice}</span>
                </div>
              </div>
            </div>

              <div className="space-y-4">
                <BoldButton 
                  variant="primary"
                  size="lg"
                  onClick={handleBookNow}
                  className="w-full"
                >
                  <Phone className="w-5 h-5" />
                  <span>📞 CALL NOW & SAVE £{quote.savings}!</span>
                  <Sparkles className="w-5 h-5" />
                </BoldButton>
                
                <div className="grid grid-cols-2 gap-3">
                  <BoldButton variant="secondary" size="md" className="w-full">
                    <span>📧 EMAIL QUOTE</span>
                  </BoldButton>
                  <BoldButton variant="secondary" size="md" className="w-full">
                    <span>📱 WHATSAPP</span>
                  </BoldButton>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-300 font-semibold">
                  💳 Secure payment • 🛡️ Fully insured • ⭐ SIA licensed drivers
                </p>
              </div>
            </BoldCard>
          </div>
        )}
      </div>
    </BoldCard>
  )
}