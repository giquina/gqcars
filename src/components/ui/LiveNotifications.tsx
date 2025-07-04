"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Star, Shield, X, Eye, TrendingUp, Clock, Users, Award, CheckCircle } from 'lucide-react'

interface Notification {
  id: string
  type: 'booking' | 'review' | 'enquiry' | 'completion' | 'trust' | 'visitor'
  user: {
    name: string
  }
  pickup: string
  description: string
  icon: React.ReactNode
  color: string
  message: string
  stars?: number
  service: string
  timestamp: Date
  trustScore?: number
  completionTime?: string
  location?: string
}

interface TrustMetrics {
  trustScore: number
  activeVisitors: number
  completedToday: number
  currentBookings: number
}

const FIRST_NAMES = [
  'Omar', 'Layla', 'Fatima', 'Yousef', 'Wei', 'Fang', 'Jie', 'Li', 'Lucas', 'Ana', 'João', 'Camila', 'Kwame', 'Amina', 'Chinonso', 'Zuri', 'Sophie', 'Luca', 'Marta', 'David', 'Maria', 'Ahmed', 'Sara', 'Mohammed', 'Chen', 'Pedro', 'Fatou', 'Nia',
  // Jewish names
  'Benjamin', 'Rachel', 'Daniel', 'Sarah', 'Jacob', 'Esther', 'Michael', 'Rebecca', 'Joshua', 'Miriam', 'Aaron', 'Leah', 'Samuel', 'Hannah', 'Isaac', 'Deborah', 'Nathan', 'Ruth', 'Adam', 'Naomi', 'Ethan', 'Tamar', 'Noah', 'Yael', 'Gabriel', 'Shira', 'Jonathan', 'Aviva', 'Matthew', 'Talia', 'Joseph', 'Dina', 'Alexander', 'Rivka', 'Zachary', 'Chana', 'Eli', 'Malka', 'Ari', 'Yaffa', 'Maya', 'Shoshana'
]

const PICKUP_LOCATIONS = [
  // London addresses
  'Chelsea', 'Mayfair', 'Bond Street', 'Canary Wharf', 'Soho', 'Knightsbridge', 'Greenwich', 'Richmond', 'Wimbledon', 'City of London', 'Paddington', 'Victoria', 'London Bridge', 'Shoreditch', 'Hampstead', 'Battersea', 'Notting Hill', 'South Kensington', 'Stratford', 'Docklands', "St. John's Wood", 'Chiswick', 'Bromley', 'Croydon', 'Watford', 'Windsor', 'Reading', 'Guildford', 'Brighton', 'Oxford', 'Camden', 'Islington', 'Hackney', 'Tower Hamlets', 'Lambeth', 'Southwark', 'Wandsworth', 'Merton', 'Kingston', 'Barnet', 'Enfield', 'Haringey', 'Waltham Forest', 'Redbridge', 'Havering', 'Barking', 'Newham', 'Bexley', 'Sutton', 'Hounslow',
  // Iconic London landmarks
  'The London Eye', 'The Shard', 'Buckingham Palace', 'Kew Gardens', 'Tower of London', 'Westminster Abbey', 'Big Ben', 'British Museum', 'Harrods',
  // South East England
  'Gatwick Airport', 'Heathrow Airport', 'Stansted Airport', 'Luton Airport', 'Southampton', 'Portsmouth', 'Maidstone', 'Canterbury', 'Dover', 'Folkestone', 'Ashford', 'Tunbridge Wells', 'Crawley', 'Horsham', 'Eastbourne', 'Hastings', 'Maidstone', 'Rochester', 'Chatham', 'Gillingham', 'Southend', 'Basildon', 'Chelmsford', 'Colchester', 'Ipswich', 'Cambridge', 'Peterborough', 'Milton Keynes', 'Luton', 'Bedford', 'Northampton'
]

const COMPLETION_DESCRIPTIONS = [
  'Close Protection mission completed successfully',
  'VIP airport transfer completed on time',
  'Executive transport completed safely',
  'Diplomatic service completed with excellence',
  'Security escort completed without incident',
  'Wedding transport completed perfectly',
  'Event security completed successfully',
  'Shopping security completed safely'
]

const TRUST_INDICATORS = [
  'Trust score increased to 4.9/5.0',
  'New security certification earned',
  'Driver passed enhanced background check',
  'Insurance coverage verified and updated',
  'Emergency response protocol tested',
  'Customer satisfaction target exceeded'
]

const BOOKING_DESCRIPTIONS = [
  'VIP car', 'Executive car', 'Luxury car', 'Family car', 'Private hire', 'Wedding car', 'Shopping ride', 'Airport transfer', 'Business chauffeur', 'Night out car', 'Event car', 'Hotel pickup', 'Station pickup'
]

const ENQUIRY_DESCRIPTIONS = [
  'Close Protection', 'VIP service', 'Airport Transfer', 'Family car', 'Luxury vehicle', 'Event security', 'Hourly hire', 'Last-minute booking', 'Wedding transport', 'Shopping trip', 'Business roadshow'
]

const REVIEW_TEXTS = [
  'Exceptional security service!',
  'Very professional and discreet.',
  'Highly recommend for airport transfers.',
  'Driver was punctual and professional.',
  'Best close protection experience!',
  'Smooth diplomatic service, thank you!',
  'Felt very secure throughout the journey.',
  'Amazing attention to detail.',
  'Outstanding private hire service.',
  'Excellent shopping security.',
  'Reliable taxi service as always.',
  'Perfect wedding security service.'
]

const BOOKING_SERVICES = [
  'Airport Transfers', 'Close Protection', 'Diplomatic Services', 'Private Hire', 'Shopping Security', 'Security Taxi', 'Wedding Security'
]

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomStars() {
  return Math.random() > 0.5 ? 5 : 4
}

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 30) return 'a few seconds ago'
  if (diffInSeconds < 60) return 'less than a minute ago'
  if (diffInSeconds < 120) return '1 minute ago'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 7200) return '1 hour ago'
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 172800) return '1 day ago'
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

function randomTimeAgo(): Date {
  const now = new Date()
  // Random time between 1 second and 2 hours ago
  const randomSeconds = Math.floor(Math.random() * 7200) + 1
  return new Date(now.getTime() - randomSeconds * 1000)
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isVisible, setIsVisible] = useState(true)
  const [lastNames, setLastNames] = useState<string[]>([])
  const [showOpenBtn, setShowOpenBtn] = useState(false)
  const [trustMetrics, setTrustMetrics] = useState<TrustMetrics>({
    trustScore: 4.8,
    activeVisitors: 23,
    completedToday: 47,
    currentBookings: 12
  })
  const namePoolRef = useRef([...FIRST_NAMES])
  const notificationRef = useRef<HTMLDivElement>(null)

  // Update trust metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrustMetrics((prev: TrustMetrics) => ({
        trustScore: Math.min(5.0, prev.trustScore + (Math.random() - 0.5) * 0.02),
        activeVisitors: Math.max(15, prev.activeVisitors + Math.floor((Math.random() - 0.5) * 5)),
        completedToday: prev.completedToday + Math.floor(Math.random() * 2),
        currentBookings: Math.max(8, prev.currentBookings + Math.floor((Math.random() - 0.5) * 3))
      }))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Helper to get a name not in last 10
  function getUniqueName() {
    let pool = namePoolRef.current.filter(n => !lastNames.includes(n))
    if (pool.length === 0) {
      // Reset pool if all names used
      pool = [...FIRST_NAMES]
      setLastNames([])
    }
    const name = randomFrom(pool)
    setLastNames((prev: string[]) => {
      const next = [name, ...prev].slice(0, 10)
      return next
    })
    return name
  }

  function randomNotification(): Notification {
    const types = ['booking', 'review', 'enquiry', 'completion', 'trust', 'visitor'] as const
    const type = randomFrom([...types])
    const name = getUniqueName()
    const pickup = randomFrom(PICKUP_LOCATIONS)
    const timestamp = randomTimeAgo()
    let icon, color, message, description, stars, service, serviceType, trustScore, completionTime, location

    if (type === 'booking') {
      service = randomFrom(BOOKING_SERVICES)
      icon = <Car className="w-4 h-4 text-blue-400" />
      color = 'from-blue-500/20 to-blue-700/20 border-blue-500/30'
      description = service
      message = `${name} booked ${service}`
      serviceType = service === 'Close Protection' ? 'Close Protection Security' : 
                  service === 'Security Taxi' ? 'Taxi' : 'Pre-Booked Security Transport'
    } else if (type === 'review') {
      service = randomFrom(BOOKING_SERVICES)
      icon = <Star className="w-4 h-4 text-yellow-400" />
      color = 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      description = randomFrom(REVIEW_TEXTS)
      stars = randomStars()
      message = `${name} left a ${stars}★ review: "${description}"`
      serviceType = service === 'Close Protection' ? 'Close Protection Security' : 
                  service === 'Security Taxi' ? 'Taxi' : 'Pre-Booked Security Transport'
    } else if (type === 'completion') {
      service = randomFrom(BOOKING_SERVICES)
      icon = <CheckCircle className="w-4 h-4 text-green-400" />
      color = 'from-green-500/20 to-emerald-500/20 border-green-500/30'
      description = randomFrom(COMPLETION_DESCRIPTIONS)
      completionTime = `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`
      message = `Service completed: ${description}`
      serviceType = 'Service Completion'
    } else if (type === 'trust') {
      service = 'Trust System'
      icon = <Award className="w-4 h-4 text-purple-400" />
      color = 'from-purple-500/20 to-violet-500/20 border-purple-500/30'
      description = randomFrom(TRUST_INDICATORS)
      trustScore = Math.round((4.8 + Math.random() * 0.2) * 10) / 10
      message = `Trust update: ${description}`
      serviceType = 'Trust & Security'
    } else if (type === 'visitor') {
      service = 'Live Traffic'
      icon = <Eye className="w-4 h-4 text-cyan-400" />
      color = 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30'
      description = 'viewing our services'
      location = randomFrom(['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Edinburgh', 'Bristol', 'Liverpool'])
      message = `${Math.floor(Math.random() * 8) + 3} visitors from ${location} ${description}`
      serviceType = 'Live Activity'
    } else {
      service = randomFrom(BOOKING_SERVICES)
      icon = <Shield className="w-4 h-4 text-purple-400" />
      color = 'from-purple-500/20 to-purple-700/20 border-purple-500/30'
      description = randomFrom(ENQUIRY_DESCRIPTIONS)
      message = `${name} enquired about ${description}`
      serviceType = service === 'Close Protection' ? 'Close Protection Security' : 
                  service === 'Security Taxi' ? 'Taxi' : 'Pre-Booked Security Transport'
    }

    return {
      id: Date.now().toString() + Math.random(),
      type,
      user: { name },
      pickup,
      description,
      icon,
      color,
      message,
      stars,
      service: serviceType,
      timestamp,
      trustScore,
      completionTime,
      location
    }
  }

  // Add a new notification at random intervals (8-15s)
  useEffect(() => {
    if (!isVisible) return
    let timeout: NodeJS.Timeout
    const addNotification = () => {
      setNotifications(prev => {
        const next = [randomNotification(), ...prev]
        // Keep max 4 notifications at once
        return next.slice(0, 4)
      })
      // Schedule next notification at a random interval
      timeout = setTimeout(addNotification, 8000 + Math.random() * 7000)
    }
    addNotification()
    return () => clearTimeout(timeout)
  }, [isVisible])

  // Auto-remove notifications after 12s
  useEffect(() => {
    if (notifications.length === 0) return
    const timeout = setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1))
    }, 12000)
    return () => clearTimeout(timeout)
  }, [notifications])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        if (isVisible) {
          setIsVisible(false)
          setShowOpenBtn(true)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])

  if (!isVisible && !showOpenBtn) return null

  return (
    <>
      {isVisible && (
        <div ref={notificationRef} className="fixed bottom-4 left-4 z-50 flex flex-col-reverse gap-2 max-w-[300px] w-full sm:bottom-6 sm:left-6 sm:gap-3 sm:max-w-sm">
          
          {/* Trust Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-yellow-400/30 rounded-xl p-3 shadow-2xl mb-2"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-black text-yellow-400">LIVE METRICS</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">LIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-black/30 rounded-lg p-2">
                <div className="text-sm font-black text-yellow-400">{trustMetrics.trustScore.toFixed(1)}★</div>
                <div className="text-xs text-gray-400">Trust Score</div>
              </div>
              <div className="bg-black/30 rounded-lg p-2">
                <div className="text-sm font-black text-cyan-400">{trustMetrics.activeVisitors}</div>
                <div className="text-xs text-gray-400">Active Users</div>
              </div>
              <div className="bg-black/30 rounded-lg p-2">
                <div className="text-sm font-black text-green-400">{trustMetrics.completedToday}</div>
                <div className="text-xs text-gray-400">Completed Today</div>
              </div>
              <div className="bg-black/30 rounded-lg p-2">
                <div className="text-sm font-black text-purple-400">{trustMetrics.currentBookings}</div>
                <div className="text-xs text-gray-400">Live Bookings</div>
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <AnimatePresence mode="wait" initial={false}>
            {notifications.map((n, index) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 35,
                  duration: 0.3
                }}
                className={`relative bg-gradient-to-br ${n.color} backdrop-blur-xl border rounded-xl shadow-2xl p-3 flex items-start gap-3 overflow-hidden glassmorphism hover:scale-[1.02] transition-transform duration-200`}
              >
                {/* Animated border glow */}
                <div className="absolute inset-0 border rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-lg">
                    {n.icon}
                  </div>
                </div>
                
                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm leading-tight mb-1 line-clamp-2 text-left">
                    {n.message}
                  </div>
                  
                  {/* Enhanced metadata */}
                  <div className="text-xs text-white/70 flex items-center gap-1.5 flex-wrap mb-1">
                    <span className="font-semibold text-white/80 text-xs">{n.service}</span>
                    {n.pickup && (
                      <>
                        <span className="w-0.5 h-0.5 bg-white/40 rounded-full"></span>
                        <span className="text-xs">{n.pickup}</span>
                      </>
                    )}
                    {n.location && (
                      <>
                        <span className="w-0.5 h-0.5 bg-white/40 rounded-full"></span>
                        <span className="text-xs">{n.location}</span>
                      </>
                    )}
                    <span className="w-0.5 h-0.5 bg-white/40 rounded-full"></span>
                    <span className="text-xs text-white/60">{formatTimeAgo(n.timestamp)}</span>
                  </div>
                  
                  {/* Stars for reviews */}
                  {n.type === 'review' && n.stars && (
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(n.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  )}
                  
                  {/* Trust score indicator */}
                  {n.trustScore && (
                    <div className="flex items-center gap-1 mt-1">
                      <Award className="w-3 h-3 text-purple-400" />
                      <span className="text-xs font-black text-purple-400">Trust: {n.trustScore}/5.0</span>
                    </div>
                  )}
                  
                  {/* Completion time */}
                  {n.completionTime && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-green-400" />
                      <span className="text-xs font-black text-green-400">Duration: {n.completionTime}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Static Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/80 hover:bg-black text-white rounded-full p-2 shadow-xl border border-white/20 transition-all duration-200 hover:scale-110 self-start mt-2"
            aria-label="Close notifications"
            onClick={() => {
              setIsVisible(false)
              setShowOpenBtn(true)
            }}
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      )}
      
      {/* Open Button */}
      {showOpenBtn && !isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 left-4 z-50 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border border-yellow-400/30 text-white rounded-full p-3 shadow-xl transition-all duration-200 hover:scale-110 sm:bottom-6 sm:left-6"
          aria-label="Show notifications"
          onClick={() => {
            setIsVisible(true)
            setShowOpenBtn(false)
          }}
        >
          <div className="relative">
            <TrendingUp className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </motion.button>
      )}
    </>
  )
}