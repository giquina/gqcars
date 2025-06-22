'use client'

import { useState, useEffect } from 'react'
import { Car, MapPin, Clock, Star, X } from 'lucide-react'

interface CustomerBooking {
  id: string
  customerName: string
  service: string
  location: string
  timestamp: Date
  serviceType: 'standard' | 'premium' | 'executive' | 'xl'
  icon: '🚗' | '⭐' | '👑' | '👥'
  price?: string
}

const SAMPLE_BOOKINGS: CustomerBooking[] = [
  {
    id: '1',
    customerName: 'James M.',
    service: 'GQ Executive',
    location: 'Canary Wharf to Heathrow',
    timestamp: new Date(),
    serviceType: 'executive',
    icon: '👑',
    price: '£145'
  },
  {
    id: '2',
    customerName: 'Sarah L.',
    service: 'GQ Premium',
    location: 'Mayfair to City Airport',
    timestamp: new Date(),
    serviceType: 'premium',
    icon: '⭐',
    price: '£89'
  },
  {
    id: '3',
    customerName: 'Michael R.',
    service: 'GQ Standard',
    location: 'Chelsea to Gatwick',
    timestamp: new Date(),
    serviceType: 'standard',
    icon: '🚗',
    price: '£165'
  },
  {
    id: '4',
    customerName: 'Emma K.',
    service: 'GQ XL Group',
    location: 'Westminster to Stansted',
    timestamp: new Date(),
    serviceType: 'xl',
    icon: '👥',
    price: '£195'
  },
  {
    id: '5',
    customerName: 'David T.',
    service: 'GQ Executive',
    location: 'Kensington to Luton',
    timestamp: new Date(),
    serviceType: 'executive',
    icon: '👑',
    price: '£175'
  },
  {
    id: '6',
    customerName: 'Lisa P.',
    service: 'GQ Premium',
    location: 'Shoreditch to Heathrow',
    timestamp: new Date(),
    serviceType: 'premium',
    icon: '⭐',
    price: '£125'
  }
]

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<CustomerBooking[]>([])
  const [currentNotification, setCurrentNotification] = useState<CustomerBooking | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Initialize with sample bookings
    setNotifications(SAMPLE_BOOKINGS)
    
    // Start showing notifications after 5 seconds (more visible)
    const initialTimer = setTimeout(() => {
      showNextNotification()
    }, 5000)

    return () => clearTimeout(initialTimer)
  }, [])

  const showNextNotification = () => {
    if (notifications.length === 0) return

    // Get a random booking
    const randomIndex = Math.floor(Math.random() * notifications.length)
    const booking = notifications[randomIndex]
    
    // Update timestamp to "just now"
    const updatedBooking = {
      ...booking,
      timestamp: new Date(),
      id: `${booking.id}-${Date.now()}` // Unique ID for each show
    }

    setCurrentNotification(updatedBooking)
    setIsVisible(true)

    // Hide after 6 seconds (more frequent)
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => setCurrentNotification(null), 500)
    }, 6000)

    // Schedule next notification (20-40 seconds for better visibility)
    setTimeout(() => {
      showNextNotification()
    }, Math.random() * 20000 + 20000) // 20-40 seconds
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setCurrentNotification(null), 500)
  }

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'standard': return 'from-blue-500 to-blue-600'
      case 'premium': return 'from-emerald-500 to-emerald-600'
      case 'executive': return 'from-purple-500 to-purple-600'
      case 'xl': return 'from-orange-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getServiceBadgeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'standard': return 'bg-blue-500'
      case 'premium': return 'bg-emerald-500'
      case 'executive': return 'bg-purple-500'
      case 'xl': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  if (!currentNotification) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <div 
        className={`transform transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header with gradient */}
          <div className={`p-4 bg-gradient-to-r ${getServiceColor(currentNotification.serviceType)} text-white relative`}>
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-xl">{currentNotification.icon}</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold animate-pulse">🎉 Just Booked!</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <p className="text-xs opacity-90">Someone just chose GQ Cars</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm mb-1">
                  {currentNotification.customerName}
                </h4>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`${getServiceBadgeColor(currentNotification.serviceType)} text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse`}>
                    {currentNotification.service}
                  </span>
                  {currentNotification.price && (
                    <span className="text-green-600 font-bold text-xs animate-bounce">
                      {currentNotification.price}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 text-green-600 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-xs font-bold animate-pulse">CONFIRMED</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{currentNotification.location}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Just now</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span>SIA Licensed Driver</span>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className={`h-1 bg-gradient-to-r ${getServiceColor(currentNotification.serviceType)}`}></div>
        </div>
      </div>
    </div>
  )
}