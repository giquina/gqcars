'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, MapPin, Clock, Sparkles } from 'lucide-react'

interface FloatingWhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  showPulse?: boolean
  showNotification?: boolean
  notificationCount?: number
}

export default function FloatingWhatsAppButton({
  phoneNumber = '447407655203',
  message = "Hello GQ Cars! I'm interested in your security taxi services.",
  position = 'bottom-right',
  showPulse = true,
  showNotification = true,
  notificationCount = 1
}: FloatingWhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [currentNotification, setCurrentNotification] = useState(notificationCount)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6'
      case 'top-right':
        return 'top-6 right-6'
      case 'top-left':
        return 'top-6 left-6'
      default:
        return 'bottom-6 right-6'
    }
  }

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    setCurrentNotification(0)
  }

  const handleCall = () => {
    window.open(`tel:0${phoneNumber}`, '_self')
  }

  if (!isVisible) return null

  return (
    <div className={`fixed ${getPositionClasses()} z-55`}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full right-0 mb-3 w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-gray-800">GQ Cars WhatsApp</span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Get instant quotes, book rides, and 24/7 support
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Usually responds in 2 minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>London & Watford coverage</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* Main WhatsApp Button */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-16 h-16 bg-gradient-to-tr from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 group relative"
        >
          <MessageCircle className="w-8 h-8" />
          
          {/* Notification Badge */}
          {showNotification && currentNotification > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center"
            >
              <span className="text-xs font-bold">{currentNotification}</span>
            </motion.span>
          )}

          {/* Pulse Animation */}
          {showPulse && (
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
          )}

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-green-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </motion.button>

        {/* Quick Call Button */}
        <motion.button
          onClick={handleCall}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-black shadow-lg transition-all duration-300 group"
        >
          <Phone className="w-5 h-5" />
          <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </motion.button>
      </motion.div>
    </div>
  )
} 