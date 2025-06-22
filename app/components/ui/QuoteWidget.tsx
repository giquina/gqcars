'use client'

import { useState } from 'react'
import { MapPin, Car, Clock, Star, Calculator, ArrowRight, Navigation, Sparkles, Phone, Shield, Crown, Users, Calendar } from 'lucide-react'

export default function QuoteWidget() {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [serviceType, setServiceType] = useState('standard')
  const [bookingType, setBookingType] = useState('now') // 'now' or 'schedule'
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showQuote, setShowQuote] = useState(false)
  const [quote, setQuote] = useState<{
    distance: string
    originalPrice: string
    discountPrice: string
    savings: string
    estimatedTime: string
    serviceName: string
    startAddress?: string
    endAddress?: string
  } | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

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

  const calculateQuote = async () => {
    if (pickup && dropoff) {
      setIsCalculating(true)
      
      try {
        console.log('Calculating route from', pickup, 'to', dropoff)
        
        // Call our secure backend API for route calculation
        const response = await fetch('/api/maps/route', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ 
            pickup: pickup.trim(), 
            destination: dropoff.trim() 
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to calculate route')
        }

        const routeData = await response.json()
        console.log('Route data received:', routeData)
        
        // Extract real distance and convert to miles if needed
        let distanceInMiles
        if (routeData.distance.includes('mi')) {
          // Already in miles (e.g., "21.6 mi")
          distanceInMiles = parseFloat(routeData.distance.replace(/[^\d.]/g, ''))
        } else if (routeData.distance.includes('km')) {
          // Convert from kilometers to miles
          const distanceInKm = parseFloat(routeData.distance.replace(/[^\d.]/g, ''))
          distanceInMiles = distanceInKm * 0.621371
                 } else {
           // Fallback: use distance value in meters and convert to miles
           distanceInMiles = (routeData.distanceValue || 10000) * 0.000621371
         }

         // Calculate pricing with real distance
         const basePrice = serviceTypes.find(s => s.id === serviceType)?.price || 7.00
         const totalPrice = basePrice * distanceInMiles
         const discountPrice = totalPrice * 0.5 // 50% off first ride
         
         setQuote({
           distance: routeData.distance, // Use Google's formatted distance
           originalPrice: totalPrice.toFixed(2),
           discountPrice: discountPrice.toFixed(2),
           savings: (totalPrice - discountPrice).toFixed(2),
           estimatedTime: routeData.duration, // Use Google's formatted duration
           serviceName: serviceTypes.find(s => s.id === serviceType)?.name || 'GQ Standard',
           startAddress: routeData.startAddress,
           endAddress: routeData.endAddress
         })
         
         console.log('Quote calculated successfully:', {
           distance: routeData.distance,
           duration: routeData.duration,
           price: totalPrice.toFixed(2)
         })

       } catch (error) {
         console.error('Error calculating route:', error)
         
         // Show user-friendly error message
         const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
         alert(`Unable to calculate route: ${errorMessage}. Please check your addresses and try again.`)
         
         // Reset calculating state without showing quote
         setIsCalculating(false)
         return
       }

      setShowQuote(true)
      setIsCalculating(false)
    }
  }

  const handleBookNow = () => {
    // In a real app, this would redirect to booking page or open booking modal
    window.location.href = `tel:07407655203`
  }

  return (
    <div 
      data-quote-widget 
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-4 sm:p-6 lg:p-8 rounded-2xl border border-yellow-500/30 relative overflow-hidden shadow-2xl"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 border border-yellow-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-6 left-6 w-4 h-4 sm:w-6 sm:h-6 border border-blue-500 animate-bounce"></div>
        <div className="absolute top-1/2 left-8 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute top-8 right-12 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-12 right-8 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced Header - Mobile Optimized */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-2 sm:mb-3">
            <Calculator className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-500 animate-bounce" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Get Instant Quote
            </h2>
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-gray-300 text-xs sm:text-sm lg:text-base mb-2">Enter your journey details for real-time pricing</p>
          
          {/* SIA Licensed Guarantee - Mobile Responsive */}
          <div className="bg-blue-600/20 border border-blue-500/50 px-2 sm:px-4 py-2 rounded-lg sm:rounded-xl mb-2 sm:mb-3">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold text-xs sm:text-sm">🛡️ ALL JOURNEYS with SIA Licensed Security Drivers</span>
            </div>
          </div>
          
          {/* Enhanced 50% OFF Banner - Mobile Responsive */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mx-auto w-fit animate-pulse shadow-lg">
            🔥 50% OFF FIRST RIDE - LIMITED TIME 🔥
          </div>
        </div>

        {/* Enhanced Quote Form - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {/* Enhanced Pickup Location - Mobile Responsive */}
          <div className="relative">
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
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup address, postcode, or landmark..."
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all text-sm sm:text-base"
              />
              <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-green-400">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <button className="absolute right-2 sm:right-3 top-2.5 sm:top-3 text-gray-400 hover:text-yellow-500 transition-colors">
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="mt-1 text-xs text-gray-400 flex flex-wrap gap-1">
              <span>📍 Use current location</span>
              <span>•</span>
              <span>🔍 Search landmarks</span>
              <span>•</span>
              <span>📮 Enter postcode</span>
            </div>
          </div>

          {/* Enhanced Dropoff Location - Mobile Responsive */}
          <div className="relative">
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
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="Enter destination address, postcode, or landmark..."
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg sm:rounded-xl px-3 sm:px-4 py-3 sm:py-4 pl-10 sm:pl-12 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all text-sm sm:text-base"
              />
              <div className="absolute left-3 sm:left-4 top-3 sm:top-4 text-red-400">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-sm"></div>
              </div>
              <button className="absolute right-2 sm:right-3 top-2.5 sm:top-3 text-gray-400 hover:text-yellow-500 transition-colors">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
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

          {/* Simplified Quick Location Shortcuts - Less Messy */}
          <div className="bg-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-600">
            <div className="text-sm text-gray-300 mb-3 font-medium">🎯 Popular Destinations:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button 
                onClick={() => setDropoff('Heathrow Airport, London')}
                className="text-xs bg-blue-600/20 hover:bg-blue-600/30 p-2 rounded-lg text-blue-300 hover:text-white transition-colors text-center border border-blue-500/30"
              >
                ✈️ Heathrow
              </button>
              <button 
                onClick={() => setDropoff('Gatwick Airport, London')}
                className="text-xs bg-blue-600/20 hover:bg-blue-600/30 p-2 rounded-lg text-blue-300 hover:text-white transition-colors text-center border border-blue-500/30"
              >
                ✈️ Gatwick
              </button>
              <button 
                onClick={() => setDropoff('London City Centre')}
                className="text-xs bg-green-600/20 hover:bg-green-600/30 p-2 rounded-lg text-green-300 hover:text-white transition-colors text-center border border-green-500/30"
              >
                🏙️ City Centre
              </button>
              <button 
                onClick={() => setDropoff('Canary Wharf, London')}
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
          <button
            onClick={calculateQuote}
            disabled={!pickup || !dropoff || isCalculating || (bookingType === 'schedule' && (!selectedDate || !selectedTime))}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center space-x-2 shadow-lg text-sm sm:text-base"
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <Car className="w-5 h-5" />
                <span>{bookingType === 'now' ? 'BOOK NOW' : 'SCHEDULE RIDE'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Enhanced Quote Results */}
        {showQuote && quote && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-2xl border border-green-500/30 animate-slideUp shadow-xl">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                <Sparkles className="w-6 h-6 text-yellow-500" />
                <span>🎉 Your Quote is Ready!</span>
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </h3>
              <p className="text-gray-300 text-sm">Service: {quote.serviceName}</p>
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

            <div className="space-y-3">
              <button 
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>📞 Call Now & Save £{quote.savings}!</span>
                <Sparkles className="w-5 h-5" />
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm">
                  <span>📧 Email Quote</span>
                </button>
                <button className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm">
                  <span>📱 WhatsApp</span>
                </button>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-400">
                💳 Secure payment • 🛡️ Fully insured • ⭐ SIA licensed drivers
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}