"use client"

import { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Clock, Calculator, Star, Car, Zap, Shield, Mic, MicOff, Volume2, VolumeX, Eye, Users, Sparkles, TrendingUp, Award, Gift, Compass, Route, Timer, Camera, Share2, Heart, Filter, RotateCcw, Play, Pause } from 'lucide-react'

interface LocationData {
  latitude: number
  longitude: number
  city: string
  area: string
}

interface SmartQuote {
  id: string
  destination: string
  price: string
  originalPrice: string
  duration: string
  description: string
  popular: boolean
  discount: number
  vehicleType: string
  driverRating: number
  estimatedArrival: string
  route: string
  traffic: 'light' | 'moderate' | 'heavy'
  savings: string
  features: string[]
  co2Saved: string
  loyaltyPoints: number
}

interface Driver {
  name: string
  rating: number
  avatar: string
  vehicle: string
  eta: string
}

export default function LocationBasedQuotes() {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [quotes, setQuotes] = useState<SmartQuote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid')
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'premium'>('all')
  const [animatedPricing, setAnimatedPricing] = useState(false)
  const [showDrivers, setShowDrivers] = useState(false)
  const [userPoints, setUserPoints] = useState(1250)
  const [likedQuotes, setLikedQuotes] = useState<string[]>([])
  const [routeAnimation, setRouteAnimation] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const speechRef = useRef<SpeechRecognition | null>(null)

  // Simulated available drivers
  const availableDrivers: Driver[] = [
    { name: "Marcus Thompson", rating: 4.9, avatar: "👨🏾‍💼", vehicle: "BMW 5 Series", eta: "3 min" },
    { name: "Sarah Ahmed", rating: 4.8, avatar: "👩🏽‍💼", vehicle: "Mercedes E-Class", eta: "5 min" },
    { name: "David Wilson", rating: 4.7, avatar: "👨🏻‍💼", vehicle: "Audi A6", eta: "7 min" }
  ]

  useEffect(() => {
    detectLocation()
    startPriceUpdates()
    initializeSpeechRecognition()
    
    // Cleanup
    return () => {
      if (speechRef.current) {
        speechRef.current.stop()
      }
    }
  }, [])

  const detectLocation = async () => {
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported')
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          
          const locationData = await getLocationData(latitude, longitude)
          setLocation(locationData)
          
          const smartQuotes = generateEnhancedQuotes(locationData)
          setQuotes(smartQuotes)
          setIsLoading(false)
          
          playSound('location-detected')
          startRouteAnimation()
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
          setQuotes(generateEnhancedQuotes(defaultLocation))
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
    // Enhanced location detection with more areas
    const locations = [
      { bounds: { lat: [51.45, 51.55], lng: [-0.2, 0.0] }, city: 'London', area: 'Central London' },
      { bounds: { lat: [51.64, 51.70], lng: [-0.45, -0.35] }, city: 'Watford', area: 'Watford' },
      { bounds: { lat: [51.46, 51.49], lng: [-0.48, -0.44] }, city: 'London', area: 'Heathrow Airport' },
      { bounds: { lat: [51.48, 51.52], lng: [0.08, 0.12] }, city: 'London', area: 'Canary Wharf' },
      { bounds: { lat: [51.50, 51.52], lng: [-0.12, -0.08] }, city: 'London', area: 'City of London' }
    ]

    for (const loc of locations) {
      if (lat >= loc.bounds.lat[0] && lat <= loc.bounds.lat[1] && 
          lng >= loc.bounds.lng[0] && lng <= loc.bounds.lng[1]) {
        return { latitude: lat, longitude: lng, city: loc.city, area: loc.area }
      }
    }

    return { latitude: lat, longitude: lng, city: 'London', area: 'Greater London' }
  }

  const generateEnhancedQuotes = (locationData: LocationData): SmartQuote[] => {
    const baseQuotes = [
      { 
        id: '1',
        dest: 'Heathrow Airport', 
        price: '£90-130', 
        originalPrice: '£180-260',
        duration: '35-50 min', 
        desc: 'SIA security transport with advance check', 
        popular: true,
        vehicleType: 'Executive',
        route: 'via A4',
        traffic: 'moderate' as const,
        features: ['Wi-Fi', 'Phone Charger', 'Bottled Water', 'Newspapers']
      },
      { 
        id: '2',
        dest: 'Gatwick Airport', 
        price: '£110-150', 
        originalPrice: '£220-300',
        duration: '45-65 min', 
        desc: 'Premium security route via M25', 
        popular: true,
        vehicleType: 'Premium',
        route: 'via M25',
        traffic: 'light' as const,
        features: ['Wi-Fi', 'Luxury Seating', 'Climate Control', 'Refreshments']
      },
      { 
        id: '3',
        dest: 'Canary Wharf', 
        price: '£50-80', 
        originalPrice: '£100-160',
        duration: '20-35 min', 
        desc: 'Business district security service', 
        popular: false,
        vehicleType: 'Business',
        route: 'via A13',
        traffic: 'heavy' as const,
        features: ['Wi-Fi', 'Business Newspapers', 'Phone Charger']
      },
      { 
        id: '4',
        dest: 'Stansted Airport', 
        price: '£130-170', 
        originalPrice: '£260-340',
        duration: '55-75 min', 
        desc: 'Long-distance security transport', 
        popular: false,
        vehicleType: 'Executive',
        route: 'via M11',
        traffic: 'light' as const,
        features: ['Wi-Fi', 'Luxury Interior', 'Refreshments', 'Entertainment']
      }
    ]

    return baseQuotes
      .filter(quote => !quote.dest.toLowerCase().includes(locationData.area.toLowerCase()))
      .map(quote => ({
        id: quote.id,
        destination: quote.dest,
        price: quote.price,
        originalPrice: quote.originalPrice,
        duration: quote.duration,
        description: quote.desc,
        popular: quote.popular,
        discount: 50,
        vehicleType: quote.vehicleType,
        driverRating: 4.7 + Math.random() * 0.3,
        estimatedArrival: `${3 + Math.floor(Math.random() * 15)} min`,
        route: quote.route,
        traffic: quote.traffic,
        savings: `£${Math.floor(Math.random() * 50) + 30}`,
        features: quote.features,
        co2Saved: `${Math.floor(Math.random() * 20) + 10}kg`,
        loyaltyPoints: Math.floor(Math.random() * 100) + 50
      }))
  }

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      speechRef.current = new SpeechRecognition()
      speechRef.current.continuous = false
      speechRef.current.interimResults = false
      speechRef.current.lang = 'en-US'

      speechRef.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        handleVoiceCommand(command)
        setIsListening(false)
      }

      speechRef.current.onerror = () => {
        setIsListening(false)
      }
    }
  }

  const handleVoiceCommand = (command: string) => {
    if (command.includes('heathrow') || command.includes('airport')) {
      const heathrowQuote = quotes.find(q => q.destination.includes('Heathrow'))
      if (heathrowQuote) setSelectedQuote(heathrowQuote.id)
    } else if (command.includes('canary wharf') || command.includes('business')) {
      const canaryQuote = quotes.find(q => q.destination.includes('Canary'))
      if (canaryQuote) setSelectedQuote(canaryQuote.id)
    } else if (command.includes('book') || command.includes('confirm')) {
      if (selectedQuote) {
        requestQuote(quotes.find(q => q.id === selectedQuote)?.destination || '')
      }
    }
    playSound('voice-command')
  }

  const startVoiceListening = () => {
    if (speechRef.current) {
      setIsListening(true)
      speechRef.current.start()
      playSound('voice-start')
    }
  }

  const playSound = (type: string) => {
    if (!soundEnabled) return
    
    // Create audio context for different sound types
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    switch (type) {
      case 'location-detected':
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1)
        break
      case 'voice-start':
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
        break
      case 'voice-command':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
        oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.1)
        break
      case 'quote-select':
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime)
        break
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  const startPriceUpdates = () => {
    setInterval(() => {
      if (Math.random() > 0.7) {
        setAnimatedPricing(true)
        setTimeout(() => setAnimatedPricing(false), 2000)
      }
    }, 8000)
  }

  const startRouteAnimation = () => {
    setRouteAnimation(true)
    setTimeout(() => setRouteAnimation(false), 3000)
  }

  const requestQuote = (destination: string) => {
    playSound('quote-select')
    window.location.href = `/quote?destination=${encodeURIComponent(destination)}&from=${encodeURIComponent(location?.area || 'Your Location')}`
  }

  const toggleLike = (quoteId: string) => {
    setLikedQuotes(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    )
    playSound('voice-command')
  }

  const shareQuote = async (quote: SmartQuote) => {
    if (navigator.share) {
      await navigator.share({
        title: `GQ Cars Quote - ${quote.destination}`,
        text: `Check out this great quote: ${quote.destination} for ${quote.price}`,
        url: window.location.href
      })
    }
  }

  const filteredQuotes = quotes.filter(quote => {
    if (priceFilter === 'budget') return quote.price.includes('50') || quote.price.includes('60') || quote.price.includes('70')
    if (priceFilter === 'premium') return quote.price.includes('130') || quote.price.includes('150') || quote.price.includes('170')
    return true
  })

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 mb-8 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-6 w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="absolute bottom-6 left-8 w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 border border-purple-500 rotate-45 animate-spin"></div>
        </div>
        <div className="text-center relative z-10">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-8 h-8 border-2 border-blue-500 border-b-transparent rounded-full animate-spin animate-reverse"></div>
            </div>
            <span className="text-white font-bold text-lg">🌍 Detecting your location...</span>
          </div>
          <p className="text-gray-300 text-sm mb-4">Finding the best routes and prices for you</p>
          <div className="flex justify-center space-x-4 text-xs text-gray-400">
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Live pricing</span>
            </span>
            <span className="flex items-center space-x-1">
              <Route className="w-3 h-3" />
              <span>Route optimization</span>
            </span>
            <span className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>SIA security</span>
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-2xl border border-blue-500/30 mb-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute top-4 left-4 w-20 h-1 bg-gradient-to-r from-yellow-500 to-transparent ${routeAnimation ? 'animate-pulse' : ''}`}></div>
        <div className={`absolute top-6 left-8 w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent ${routeAnimation ? 'animate-pulse delay-100' : ''}`}></div>
        <div className={`absolute top-8 left-12 w-12 h-1 bg-gradient-to-r from-green-500 to-transparent ${routeAnimation ? 'animate-pulse delay-200' : ''}`}></div>
      </div>

      {/* Enhanced Header with Controls */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center relative">
            <MapPin className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-black" />
            </div>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg flex items-center space-x-2">
              <span>Smart Location Quotes</span>
              {animatedPricing && (
                <TrendingUp className="w-5 h-5 text-yellow-500 animate-bounce" />
              )}
            </h3>
            <p className="text-green-400 text-sm flex items-center space-x-1">
              <Navigation className="w-3 h-3" />
              <span>📍 {location?.area}, {location?.city}</span>
              <Award className="w-3 h-3 text-yellow-500" />
              <span className="text-yellow-400">{userPoints} pts</span>
            </p>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="flex items-center space-x-2">
          <button
            onClick={startVoiceListening}
            className={`p-2 rounded-lg transition-all ${
              isListening 
                ? 'bg-red-500 animate-pulse' 
                : 'bg-blue-600/30 hover:bg-blue-600/50'
            }`}
            title="Voice Command"
          >
            {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-white" />}
          </button>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 transition-all"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-white" />}
          </button>
          
          <button
            onClick={() => setShowDrivers(!showDrivers)}
            className="p-2 rounded-lg bg-green-600/30 hover:bg-green-600/50 transition-all"
            title="Available Drivers"
          >
            <Users className="w-4 h-4 text-white" />
          </button>

          <div className="bg-green-600/20 px-3 py-1 rounded-full flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-bold">LIVE PRICING</span>
          </div>
        </div>
      </div>

      {/* View Mode and Filter Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="flex bg-black/30 rounded-lg p-1">
            {(['grid', 'list', 'map'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  viewMode === mode 
                    ? 'bg-yellow-500 text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
          
          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value as any)}
            className="bg-black/30 border border-gray-600 rounded-lg px-3 py-1 text-white text-xs"
          >
            <option value="all">All Prices</option>
            <option value="budget">Budget Friendly</option>
            <option value="premium">Premium Options</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className="px-3 py-1 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-xs text-white font-bold transition-all"
          >
            Compare
          </button>
          <button
            onClick={startRouteAnimation}
            className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-xs text-white font-bold transition-all"
          >
            Refresh Routes
          </button>
        </div>
      </div>

      {/* Available Drivers Panel */}
      {showDrivers && (
        <div className="mb-6 bg-black/40 p-4 rounded-xl border border-gray-600/30">
          <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Available Drivers Nearby</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableDrivers.map((driver, index) => (
              <div key={index} className="bg-gray-800/50 p-3 rounded-lg flex items-center space-x-3">
                <div className="text-2xl">{driver.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold text-sm truncate">{driver.name}</div>
                  <div className="text-gray-400 text-xs">{driver.vehicle}</div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-yellow-400 text-xs">{driver.rating}</span>
                    <span className="text-gray-400 text-xs">• ETA: {driver.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Quotes Display */}
      <div className={`mb-6 ${
        viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' :
        viewMode === 'list' ? 'space-y-3' :
        'relative h-64 bg-gray-800/30 rounded-xl overflow-hidden'
      }`}>
        {viewMode === 'map' ? (
          <div ref={mapRef} className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <Compass className="w-12 h-12 text-gray-400 mx-auto mb-2 animate-spin-slow" />
              <p className="text-gray-400 text-sm">Interactive Map View</p>
              <p className="text-gray-500 text-xs">(Map integration coming soon)</p>
            </div>
          </div>
        ) : (
          filteredQuotes.map((quote, index) => (
            <div 
              key={quote.id}
              className={`bg-black/40 p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${
                selectedQuote === quote.id 
                  ? 'border-yellow-500/70 ring-2 ring-yellow-500/30 transform scale-[1.02]' 
                  : 'border-gray-600/30 hover:border-yellow-500/50'
              } ${viewMode === 'list' ? 'flex items-center space-x-4' : ''}`}
              onClick={() => {
                setSelectedQuote(selectedQuote === quote.id ? null : quote.id)
                playSound('quote-select')
              }}
            >
              {/* Animated Background */}
              {selectedQuote === quote.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent animate-pulse"></div>
              )}

              <div className={`relative z-10 ${viewMode === 'list' ? 'flex items-center space-x-4 flex-1' : ''}`}>
                {/* Quote Header */}
                <div className={`flex items-start justify-between mb-3 ${viewMode === 'list' ? 'mb-0 flex-1' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Car className="w-5 h-5 text-yellow-500" />
                      {quote.traffic === 'light' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>}
                      {quote.traffic === 'moderate' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>}
                      {quote.traffic === 'heavy' && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-bold text-sm">{quote.destination}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleLike(quote.id)
                          }}
                          className="transition-all hover:scale-110"
                        >
                          <Heart className={`w-4 h-4 ${
                            likedQuotes.includes(quote.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-400 hover:text-red-400'
                          }`} />
                        </button>
                      </div>
                      {quote.popular && (
                        <div className="bg-yellow-500 text-black px-2 py-0.5 rounded text-xs font-bold mt-1">POPULAR</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`transition-all ${animatedPricing ? 'animate-bounce' : ''}`}>
                      <div className="text-gray-400 line-through text-xs">{quote.originalPrice}</div>
                      <div className="text-yellow-500 font-bold text-lg">{quote.price}</div>
                      <div className="text-green-400 text-xs font-bold">Save {quote.savings}</div>
                    </div>
                    <div className="text-gray-400 text-xs flex items-center space-x-1 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{quote.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Quote Details */}
                <div className={`${viewMode === 'list' ? 'flex items-center space-x-4 flex-1' : ''}`}>
                  <p className="text-gray-300 text-xs mb-2">{quote.description}</p>
                  
                  {/* Route and Traffic Info */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1 text-blue-400">
                        <Route className="w-3 h-3" />
                        <span>{quote.route}</span>
                      </span>
                      <span className={`flex items-center space-x-1 ${
                        quote.traffic === 'light' ? 'text-green-400' :
                        quote.traffic === 'moderate' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-current"></div>
                        <span>{quote.traffic} traffic</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-400">
                      <span>🌱 -{quote.co2Saved} CO₂</span>
                    </div>
                  </div>

                  {/* Driver and Vehicle Info */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center space-x-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="text-yellow-400">{quote.driverRating.toFixed(1)} driver</span>
                      <span className="text-gray-400">• {quote.vehicleType}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-purple-400">
                      <Gift className="w-3 h-3" />
                      <span>+{quote.loyaltyPoints} pts</span>
                    </div>
                  </div>

                  {/* Expanded Details (when selected) */}
                  {selectedQuote === quote.id && (
                    <div className="mt-4 pt-4 border-t border-gray-600 animate-slideDown">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                          <Timer className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                          <div className="text-blue-400 font-bold">ETA</div>
                          <div className="text-white text-sm">{quote.estimatedArrival}</div>
                        </div>
                        <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                          <Shield className="w-5 h-5 text-green-400 mx-auto mb-1" />
                          <div className="text-green-400 font-bold">Security</div>
                          <div className="text-white text-sm">SIA Licensed</div>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="text-gray-300 text-xs font-bold mb-2">✨ Included Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {quote.features.map((feature, i) => (
                            <span key={i} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            requestQuote(quote.destination)
                          }}
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-2 px-4 rounded-lg text-sm transition-all transform hover:scale-105"
                        >
                          Book Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            shareQuote(quote)
                          }}
                          className="p-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg transition-all"
                        >
                          <Share2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Bottom Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs">
                      <Shield className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400">SIA Protected</span>
                    </div>
                    <div className="text-yellow-500 text-xs font-bold group-hover:underline">
                      {selectedQuote === quote.id ? 'Hide Details ↑' : 'Get Quote →'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comparison View */}
      {showComparison && filteredQuotes.length > 1 && (
        <div className="mb-6 bg-black/40 p-4 rounded-xl border border-gray-600/30">
          <h4 className="text-white font-bold mb-3 flex items-center space-x-2">
            <Calculator className="w-4 h-4" />
            <span>Quick Comparison</span>
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-600">
                  <th className="text-left p-2">Destination</th>
                  <th className="text-left p-2">Price</th>
                  <th className="text-left p-2">Time</th>
                  <th className="text-left p-2">Traffic</th>
                  <th className="text-left p-2">Rating</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.slice(0, 3).map((quote) => (
                  <tr key={quote.id} className="text-white hover:bg-gray-800/30">
                    <td className="p-2">{quote.destination}</td>
                    <td className="p-2 text-yellow-400 font-bold">{quote.price}</td>
                    <td className="p-2">{quote.duration}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        quote.traffic === 'light' ? 'bg-green-600/20 text-green-400' :
                        quote.traffic === 'moderate' ? 'bg-yellow-600/20 text-yellow-400' :
                        'bg-red-600/20 text-red-400'
                      }`}>
                        {quote.traffic}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span>{quote.driverRating.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enhanced Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button 
          onClick={() => window.location.href = '/quote'}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black py-3 px-6 rounded-lg font-bold text-sm transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
        >
          <Calculator className="w-4 h-4" />
          <span>Custom Quote</span>
          <Sparkles className="w-4 h-4" />
        </button>
        <button 
          onClick={() => window.location.href = 'tel:07407655203'}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 px-6 rounded-lg font-bold text-sm transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
        >
          <Zap className="w-4 h-4" />
          <span>Call Now</span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs">24/7</span>
        </button>
      </div>

      {/* Enhanced Footer with Voice Hint */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-2">
          <p className="text-gray-400 text-xs">
            📍 Prices updated based on your location • Real-time traffic considered • SIA security included
          </p>
        </div>
        {isListening && (
          <div className="bg-red-500/20 border border-red-500/50 px-3 py-2 rounded-lg animate-pulse">
            <p className="text-red-300 text-xs font-bold">
              🎤 Listening... Try saying "Book Heathrow" or "Show Canary Wharf"
            </p>
          </div>
        )}
        <div className="text-xs text-gray-500 mt-2">
          💡 Tip: Use voice commands, like quotes, or swipe to interact
        </div>
      </div>
    </div>
  )
}
