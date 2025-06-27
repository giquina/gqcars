"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  Car, 
  Shield, 
  TrendingUp,
  X,
  ChevronDown,
  Users
} from 'lucide-react'

interface Notification {
  id: string
  type: 'booking' | 'driver' | 'review' | 'milestone' | 'promo'
  title: string
  subtitle?: string
  time: string
  icon: React.ReactNode
  color: string
  priority: 'low' | 'medium' | 'high'
  cta?: {
    text: string
    action: () => void
  }
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Sarah just booked Executive to Heathrow',
    subtitle: '2 passengers',
    time: '2m ago',
    icon: <Calendar className="w-4 h-4" />,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    priority: 'medium',
    cta: {
      text: 'Book Similar',
      action: () => window.location.href = 'tel:07407655203'
    }
  },
  {
    id: '2',
    type: 'driver',
    title: 'Elite driver Michael is now online in your area',
    time: '5m ago',
    icon: <Car className="w-4 h-4" />,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    priority: 'medium',
    cta: {
      text: 'Call Driver',
      action: () => window.location.href = 'tel:07407655203'
    }
  },
  {
    id: '3',
    type: 'review',
    title: '⭐⭐⭐⭐⭐ "Exceptional service!"',
    subtitle: 'James R. - Airport Transfer',
    time: '8m ago',
    icon: <Star className="w-4 h-4" />,
    color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    priority: 'low',
    cta: {
      text: 'Read More',
      action: () => console.log('Reviews')
    }
  },
  {
    id: '4',
    type: 'milestone',
    title: '1000+ rides completed this month!',
    subtitle: '99.8% customer satisfaction',
    time: '12m ago',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    priority: 'low',
    cta: {
      text: 'Join Us',
      action: () => window.location.href = '/book'
    }
  },
  {
    id: '5',
    type: 'promo',
    title: '🔥 50% OFF available now',
    subtitle: 'First ride discount active',
    time: '15m ago',
    icon: <Shield className="w-4 h-4" />,
    color: 'from-red-500/20 to-pink-500/20 border-red-500/30',
    priority: 'high',
    cta: {
      text: 'Claim Now',
      action: () => window.location.href = 'tel:07407655203'
    }
  }
]

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  // Initialize with sample notifications
  useEffect(() => {
    setNotifications(SAMPLE_NOTIFICATIONS)
  }, [])

  // Auto-rotate notifications every 6 seconds
  useEffect(() => {
    if (notifications.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [notifications.length])

  // Add new notifications periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: 'booking',
        title: `${['Alex', 'Emma', 'David', 'Sophie'][Math.floor(Math.random() * 4)]} booked ${['Standard', 'Premium', 'Executive'][Math.floor(Math.random() * 3)]} service`,
        time: 'now',
        icon: <Calendar className="w-4 h-4" />,
        color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
        priority: 'medium',
        cta: {
          text: 'Book Now',
          action: () => window.location.href = 'tel:07407655203'
        }
      }

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]) // Keep max 10 notifications
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const currentNotification = notifications[currentIndex]

  if (!isVisible || notifications.length === 0) return null

  return (
    <div className="fixed top-4 left-4 z-60 max-w-sm">
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          // Compact Mode - Single Notification
          <motion.div
            key="compact"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="relative"
          >
            {currentNotification && (
              <motion.div
                key={currentNotification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`
                  bg-gradient-to-r ${currentNotification.color} 
                  backdrop-blur-lg border rounded-2xl shadow-lg
                  hover:shadow-xl transition-all duration-300
                  cursor-pointer group overflow-hidden
                `}
                onClick={() => setIsExpanded(true)}
              >
                {/* Notification Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="p-2 bg-white/10 rounded-lg mt-0.5 flex-shrink-0">
                        {currentNotification.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-sm leading-tight mb-1 truncate">
                          {currentNotification.title}
                        </p>
                        {currentNotification.subtitle && (
                          <p className="text-white/70 text-xs truncate">
                            {currentNotification.subtitle}
                          </p>
                        )}
                        <p className="text-white/50 text-xs mt-1">
                          {currentNotification.time}
                        </p>
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsExpanded(true)
                      }}
                      className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                    >
                      <ChevronDown className="w-4 h-4 text-white/60" />
                    </button>
                  </div>

                  {/* CTA Button */}
                  {currentNotification.cta && (
                    <div className="mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          currentNotification.cta?.action()
                        }}
                        className="w-full bg-white/20 hover:bg-white/30 text-white text-xs font-medium py-2 px-3 rounded-lg transition-all"
                      >
                        {currentNotification.cta.text}
                      </button>
                    </div>
                  )}
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-full">
                  <motion.div
                    className="h-full bg-white/60"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    key={currentNotification.id}
                  />
                </div>
              </motion.div>
            )}

            {/* Live Indicator */}
            <div className="absolute -top-2 -right-2">
              <div className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>
          </motion.div>
        ) : (
          // Expanded Mode - All Notifications
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <h3 className="text-white font-semibold text-sm">Live Activity</h3>
                <span className="bg-white/10 text-white text-xs px-2 py-0.5 rounded-full">
                  {notifications.length}
                </span>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    p-3 border-b border-white/5 last:border-b-0
                    hover:bg-white/5 transition-colors cursor-pointer
                    ${index === currentIndex ? 'bg-white/10' : ''}
                  `}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsExpanded(false)
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="p-1.5 bg-white/10 rounded-lg mt-0.5 flex-shrink-0">
                        {notification.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium leading-tight mb-0.5">
                          {notification.title}
                        </p>
                        {notification.subtitle && (
                          <p className="text-white/60 text-xs mb-1">
                            {notification.subtitle}
                          </p>
                        )}
                        <p className="text-white/40 text-xs">{notification.time}</p>
                      </div>
                    </div>
                    
                    {notification.cta && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          notification.cta?.action()
                        }}
                        className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-lg transition-all ml-2 flex-shrink-0"
                      >
                        {notification.cta.text}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-white/5">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Updates every 6s</span>
                <div className="flex items-center space-x-2">
                  <Users className="w-3 h-3" />
                  <span>{Math.floor(Math.random() * 20) + 15} online</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dismiss Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors text-xs"
        style={{ fontSize: '10px' }}
      >
        ×
      </button>
    </div>
  )
}