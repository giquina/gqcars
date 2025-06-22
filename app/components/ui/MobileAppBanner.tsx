"use client"

import { useState, useEffect } from 'react'
import { Smartphone, X, Download, Star } from 'lucide-react'

export default function MobileAppBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Check if user has already interacted with the banner
    const hasSeenBanner = localStorage.getItem('gqcars-app-banner-seen')
    if (hasSeenBanner) return

    // Show banner after 5 seconds for demo (was 60 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // 5 seconds for demo

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setHasInteracted(true)
      localStorage.setItem('gqcars-app-banner-seen', 'true')
    }, 300) // Animation delay
  }

  const handleDownload = () => {
    setHasInteracted(true)
    localStorage.setItem('gqcars-app-banner-downloaded', 'true')
    // In a real app, this would redirect to app stores
    console.log('Redirecting to app store...')
    window.open('https://play.google.com/store', '_blank')
  }

  const handleAppStore = () => {
    window.open('https://apps.apple.com/', '_blank')
  }

  const handleGooglePlay = () => {
    window.open('https://play.google.com/store', '_blank')
  }

  if (!isVisible || hasInteracted) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm ${isClosing ? 'opacity-0' : 'animate-fadeIn'}`}>
      
      {/* Compact Banner Container */}
      <div className={`relative max-w-xs w-full bg-gradient-to-br from-gray-900 to-black rounded-xl border border-yellow-500/50 shadow-2xl ${isClosing ? 'scale-95 opacity-0' : 'scale-100'} transition-all duration-300`}>
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 w-6 h-6 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200"
        >
          <X className="w-3 h-3 text-white" />
        </button>

        {/* Compact Content */}
        <div className="p-4 text-center">
          
          {/* Simple Icon */}
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mx-auto flex items-center justify-center mb-3">
            <Smartphone className="w-6 h-6 text-black" />
          </div>

          {/* Compact Header */}
          <h3 className="text-lg font-bold text-white mb-1">GQ Cars App</h3>
          <p className="text-yellow-400 text-xs mb-3">Book SIA-Licensed Drivers</p>

          {/* Simple Features */}
          <div className="grid grid-cols-2 gap-1 mb-3 text-xs">
            <div className="text-white">🚗 30-sec booking</div>
            <div className="text-white">🛡️ Live tracking</div>
            <div className="text-white">⭐ App discounts</div>
            <div className="text-white">📍 GPS updates</div>
          </div>

          {/* Special Offer */}
          <div className="bg-red-500/20 p-2 rounded-lg border border-red-500/50 mb-3">
            <p className="text-red-400 font-bold text-xs">🔥 50% OFF First Ride!</p>
          </div>

          {/* Download Button */}
          <button 
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-2 px-3 rounded-lg transition-all text-sm flex items-center justify-center space-x-1"
          >
            <Download className="w-3 h-3" />
            <span>Download Free</span>
          </button>
          
          {/* Trust Indicator */}
          <div className="mt-2 flex items-center justify-center space-x-2 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>4.8★</span>
            </div>
            <span>•</span>
            <span>10K+ Downloads</span>
          </div>
        </div>
      </div>
    </div>
  )
}