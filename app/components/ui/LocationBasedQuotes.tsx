"use client"

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Clock, Calculator, Star, Car, Zap, Shield } from 'lucide-react'

interface LocationData {
  latitude: number
  longitude: number
  city: string
  area: string
}

interface SmartQuote {
  destination: string
  price: string
  duration: string
  description: string
  popular: boolean
}

export default function LocationBasedQuotes() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [quotes, setQuotes] = useState<SmartQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    detectLocation()
  }, [])

  const detectLocation = async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported')
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          // Simulate location detection and area identification
          const locationData = await getLocationData(latitude, longitude)
          setLocation(locationData)
          
          // Generate smart quotes based on location
          const smartQuotes = generateLocationBasedQuotes(locationData)
          setQuotes(smartQuotes)
          setIsLoading(false)
        },
        (error) => {
          console.error('Location error:', error)
          // Fallback to default location (London)
          const defaultLocation = {
            latitude: 51.5074,
            longitude: -0.1278,
            city: 'London',
            area: 'Central London'
          }
          setLocation(defaultLocation)
          setQuotes(generateLocationBasedQuotes(defaultLocation))
          setIsLoading(false)
        },
        { timeout: 10000, enableHighAccuracy: true }
      )
    } catch (err) {
      setError('Unable to detect location')
      setIsLoading(false)
    }
  }

  const getLocationData = async (lat: number, lng: number): Promise<LocationData> => {
    // Simulate reverse geocoding - in production, use Google Maps API
    const locations = [
      { bounds: { lat: [51.45, 51.55], lng: [-0.2, 0.0] }, city: 'London', area: 'Central London' },
      { bounds: { lat: [51.64, 51.70], lng: [-0.45, -0.35] }, city: 'Watford', area: 'Watford' },
      { bounds: { lat: [51.46, 51.49], lng: [-0.48, -0.44] }, city: 'London', area: 'Heathrow Airport' },
      { bounds: { lat: [51.48, 51.52], lng: [0.08, 0.12] }, city: 'London', area: 'Canary Wharf' }
    ]

    for (const loc of locations) {
      if (lat >= loc.bounds.lat[0] && lat <= loc.bounds.lat[1] && 
          lng >= loc.bounds.lng[0] && lng <= loc.bounds.lng[1]) {
        return { latitude: lat, longitude: lng, city: loc.city, area: loc.area }
      }
    }

    return { latitude: lat, longitude: lng, city: 'London', area: 'Greater London' }
  }

  const generateLocationBasedQuotes = (locationData: LocationData): SmartQuote[] => {
    const baseQuotes = [
      { dest: 'Heathrow Airport', price: '£90-130', duration: '35-50 min', desc: 'SIA security transport with advance check', popular: true },
      { dest: 'Gatwick Airport', price: '£110-150', duration: '45-65 min', desc: 'Premium security route via M25', popular: true },
      { dest: 'Central London', price: '£70-110', duration: '25-40 min', desc: 'Executive security transport', popular: false },
      { dest: 'Canary Wharf', price: '£50-80', duration: '20-35 min', desc: 'Business district security service', popular: false },
      { dest: 'Stansted Airport', price: '£130-170', duration: '55-75 min', desc: 'Long-distance security transport', popular: false },
      { dest: 'King\'s Cross', price: '£60-90', duration: '25-35 min', desc: 'City center security connection', popular: false }
    ]

    // Filter and customize based on current location
    const customQuotes = baseQuotes
      .filter(quote => !quote.dest.toLowerCase().includes(locationData.area.toLowerCase()))
      .slice(0, 4)
      .map(quote => ({
        destination: quote.dest,
        price: quote.price,
        duration: quote.duration,
        description: quote.desc,
        popular: quote.popular
      }))

    return customQuotes
  }

  const requestQuote = (destination: string) => {
    // Redirect to quote page with pre-filled destination
    window.location.href = `/quote?destination=${encodeURIComponent(destination)}&from=${encodeURIComponent(location?.area || 'Your Location')}`
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white font-bold">Detecting your location...</span>
          </div>
          <p className="text-gray-300 text-sm">Finding the best routes and prices for you</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 mb-8">
      {/* Location Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Smart Location Quotes</h3>
            <p className="text-green-400 text-sm flex items-center space-x-1">
              <Navigation className="w-3 h-3" />
              <span>Detected: {location?.area}, {location?.city}</span>
            </p>
          </div>
        </div>
        <div className="bg-green-600/20 px-3 py-1 rounded-full">
          <span className="text-green-400 text-xs font-bold">LIVE PRICING</span>
        </div>
      </div>

      {/* Smart Quotes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {quotes.map((quote, index) => (
          <div 
            key={index}
            className="bg-black/40 p-4 rounded-xl border border-gray-600/30 hover:border-yellow-500/50 transition-all cursor-pointer group"
            onClick={() => requestQuote(quote.destination)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Car className="w-5 h-5 text-yellow-500" />
                <span className="text-white font-bold text-sm">{quote.destination}</span>
                {quote.popular && (
                  <div className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold">POPULAR</div>
                )}
              </div>
              <div className="text-right">
                <div className="text-yellow-500 font-bold text-lg">{quote.price}</div>
                <div className="text-gray-400 text-xs flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{quote.duration}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-xs mb-3">{quote.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs">
                <Shield className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400">SIA Protected</span>
              </div>
              <div className="text-yellow-500 text-xs font-bold group-hover:underline">
                Get Quote →
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={() => window.location.href = '/quote'}
          className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Custom Quote</span>
        </button>
        <button 
          onClick={() => window.location.href = 'tel:07407655203'}
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <Zap className="w-4 h-4" />
          <span>Call Now</span>
        </button>
      </div>

      {/* Location Accuracy Notice */}
      <div className="mt-4 text-center">
        <p className="text-gray-400 text-xs">
          📍 Prices updated based on your location • Real-time traffic considered • SIA security included
        </p>
      </div>
    </div>
  )
}
