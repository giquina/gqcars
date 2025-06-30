"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Car, Star, Shield, X } from 'lucide-react'

interface Notification {
  id: string
  type: 'booking' | 'review' | 'enquiry'
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
  const namePoolRef = useRef([...FIRST_NAMES])
  const notificationRef = useRef<HTMLDivElement>(null)

  // Helper to get a name not in last 10
  function getUniqueName() {
    let pool = namePoolRef.current.filter(n => !lastNames.includes(n))
    if (pool.length === 0) {
      // Reset pool if all names used
      pool = [...FIRST_NAMES]
      setLastNames([])
    }
    const name = randomFrom(pool)
    setLastNames(prev => {
      const next = [name, ...prev].slice(0, 10)
      return next
    })
    return name
  }

  function randomNotification(): Notification {
    const type = randomFrom(['booking', 'review', 'enquiry'] as const)
    const name = getUniqueName()
    const pickup = randomFrom(PICKUP_LOCATIONS)
    const timestamp = randomTimeAgo()
    let icon, color, message, description, stars, service, serviceType
    if (type === 'booking') {
      service = randomFrom(BOOKING_SERVICES)
      icon = <Car className="w-4 h-4 text-blue-400" />
      color = 'from-blue-500/20 to-blue-700/20 border-blue-500/30'
      description = service
      message = `${name} booked ${service}`
      // Map services to specific types
      if (service === 'Close Protection') {
        serviceType = 'Close Protection Security'
      } else if (service === 'Airport Transfers' || service === 'Private Hire' || service === 'Wedding Security') {
        serviceType = 'Pre-Booked Security Transport'
      } else if (service === 'Diplomatic Services') {
        serviceType = 'SIA Licensed Officer'
      } else if (service === 'Security Taxi') {
        serviceType = 'Taxi'
      } else {
        serviceType = 'Transport'
      }
    } else if (type === 'review') {
      service = randomFrom(BOOKING_SERVICES)
      icon = <Star className="w-4 h-4 text-yellow-400" />
      color = 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      description = randomFrom(REVIEW_TEXTS)
      stars = randomStars()
      message = `${name} left a ${stars}★ review for ${service}: "${description}"`
      // Map services to specific types
      if (service === 'Close Protection') {
        serviceType = 'Close Protection Security'
      } else if (service === 'Airport Transfers' || service === 'Private Hire' || service === 'Wedding Security') {
        serviceType = 'Pre-Booked Security Transport'
      } else if (service === 'Diplomatic Services') {
        serviceType = 'SIA Licensed Officer'
      } else if (service === 'Security Taxi') {
        serviceType = 'Taxi'
      } else {
        serviceType = 'Transport'
      }
    } else {
      service = randomFrom(BOOKING_SERVICES)
      icon = <Shield className="w-4 h-4 text-purple-400" />
      color = 'from-purple-500/20 to-purple-700/20 border-purple-500/30'
      description = randomFrom(ENQUIRY_DESCRIPTIONS)
      message = `${name} enquired about ${description} for ${service}`
      // Map services to specific types
      if (service === 'Close Protection') {
        serviceType = 'Close Protection Security'
      } else if (service === 'Airport Transfers' || service === 'Private Hire' || service === 'Wedding Security') {
        serviceType = 'Pre-Booked Security Transport'
      } else if (service === 'Diplomatic Services') {
        serviceType = 'SIA Licensed Officer'
      } else if (service === 'Security Taxi') {
        serviceType = 'Taxi'
      } else {
        serviceType = 'Transport'
      }
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
      timestamp
    }
  }

  // Add a new notification at random intervals (12-20s)
  useEffect(() => {
    if (!isVisible) return
    let timeout: NodeJS.Timeout
    const addNotification = () => {
      setNotifications(prev => {
        const next = [randomNotification(), ...prev]
        // Keep max 3 notifications at once to prevent overlapping
        return next.slice(0, 3)
      })
      // Schedule next notification at a random interval (much slower)
      timeout = setTimeout(addNotification, 12000 + Math.random() * 8000)
    }
    addNotification()
    return () => clearTimeout(timeout)
  }, [isVisible])

  // Auto-remove notifications after 15s (increased from 10s)
  useEffect(() => {
    if (notifications.length === 0) return
    const timeout = setTimeout(() => {
      setNotifications(prev => prev.slice(0, -1))
    }, 15000)
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
        <div ref={notificationRef} className="fixed bottom-4 left-4 z-50 flex flex-col-reverse gap-2 max-w-[280px] w-full sm:bottom-6 sm:left-6 sm:gap-3 sm:max-w-sm">
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
                className={`relative bg-gradient-to-br ${n.color} backdrop-blur-xl border rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-2.5 sm:p-3 flex items-start gap-2.5 sm:gap-3 overflow-hidden glassmorphism min-h-[44px] sm:min-h-[50px] hover:scale-[1.02] transition-transform duration-200`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <div className="w-3 h-3 sm:w-4 sm:h-4">
                      {n.icon}
                    </div>
                  </div>
                </div>
                {/* Notification Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-xs sm:text-sm leading-tight mb-1 line-clamp-2 text-left">
                    {n.message}
                  </div>
                  <div className="text-xs text-white/70 flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <span className="font-semibold text-white/80 text-[10px] sm:text-xs">{n.service}</span>
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40 rounded-full flex-shrink-0"></span>
                    <span className="text-[10px] sm:text-xs">{n.pickup}</span>
                    <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/40 rounded-full flex-shrink-0"></span>
                    <span className="text-[10px] sm:text-xs text-white/60">{formatTimeAgo(n.timestamp)}</span>
                  </div>
                  {n.type === 'review' && n.stars && (
                    <div className="flex items-center gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
                      {[...Array(n.stars)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Static Close Button at Bottom */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/80 hover:bg-black text-white rounded-full p-1.5 shadow-xl border border-white/20 transition-all duration-200 hover:scale-110 self-start mt-2"
            aria-label="Close notifications"
            onClick={() => {
              setIsVisible(false)
              setShowOpenBtn(true)
            }}
          >
            <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </motion.button>
        </div>
      )}
      {showOpenBtn && !isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 left-4 z-50 bg-black/80 hover:bg-black text-white rounded-full p-2.5 sm:p-3 shadow-xl border border-white/20 transition-all duration-200 hover:scale-110 sm:bottom-6 sm:left-6"
          aria-label="Show notifications"
          onClick={() => {
            setIsVisible(true)
            setShowOpenBtn(false)
          }}
        >
          <Car className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}
    </>
  )
}