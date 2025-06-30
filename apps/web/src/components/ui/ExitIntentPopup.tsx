'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Phone, Download, Clock } from 'lucide-react'

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has already been shown
    const popupShown = localStorage.getItem('gqcars-exit-popup-shown')
    if (popupShown) return

    let isExiting = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top
      if (e.clientY <= 0 && !isExiting && !hasShown) {
        isExiting = true
        setShowPopup(true)
        setHasShown(true)
        localStorage.setItem('gqcars-exit-popup-shown', 'true')
      }
    }

    // Add event listener
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setShowPopup(false)
  }

  const handleCall = () => {
    window.location.href = 'tel:07407655203'
    handleClose()
  }

  const handleBookNow = () => {
    // Scroll to booking section or open booking modal
    const bookingElement = document.querySelector('#booking-section')
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' })
    }
    handleClose()
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[400] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 max-w-md w-full relative border border-yellow-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="text-center mb-6 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Gift className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">
                Wait! Don't Leave! 🚨
              </h2>
              <p className="text-yellow-400 font-bold text-lg">
                Get 30% OFF Your First Ride!
              </p>
            </div>

            {/* Offer Details */}
            <div className="bg-black/40 rounded-xl p-4 mb-6 border border-yellow-500/30 relative z-10">
              <div className="text-center">
                <p className="text-white text-sm mb-2">
                  🔥 <strong>EXCLUSIVE OFFER</strong> 🔥
                </p>
                <p className="text-2xl font-bold text-yellow-400 mb-1">
                  30% OFF
                </p>
                <p className="text-gray-300 text-sm">
                  Valid for the next <strong className="text-yellow-400">15 minutes</strong>
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <p className="text-white text-xs font-semibold">60-Second</p>
                <p className="text-gray-400 text-xs">Booking</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <Phone className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-white text-xs font-semibold">24/7</p>
                <p className="text-gray-400 text-xs">Support</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 relative z-10">
              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-lg shadow-xl"
              >
                🚖 CLAIM MY 30% DISCOUNT
              </button>
              
              <button
                onClick={handleCall}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now: 07407 655 203
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-4 relative z-10">
              <p className="text-gray-400 text-xs">
                ✓ No signup required • ✓ SIA Licensed Drivers • ✓ Instant booking
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}