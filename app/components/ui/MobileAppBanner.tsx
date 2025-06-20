"use client"

import { useState, useEffect } from 'react'
import { Smartphone, X, Download, Star, Zap, Shield, Car, Sparkles, Rocket, Crown, Trophy } from 'lucide-react'

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
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all duration-300 ${isClosing ? 'opacity-0' : 'animate-fadeIn'}`}>
      
      {/* Main Banner Container - SMALLER SIZE */}
      <div className={`relative max-w-sm w-full max-h-[85vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-2xl border border-yellow-500/50 overflow-hidden shadow-2xl transform transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'animate-slideUp scale-100'}`}>
        
        {/* Animated Background Elements - More Creative */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 right-4 w-8 h-8 border-2 border-yellow-500 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 border-2 border-blue-500 rotate-12 animate-bounce"></div>
          <div className="absolute top-1/2 left-4 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
          <div className="absolute top-6 left-1/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-12 right-8 w-5 h-5 bg-green-500 rounded-full animate-bounce"></div>
          <div className="absolute top-16 right-16 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
          
          {/* Floating Sparkles */}
          <div className="absolute top-8 left-12 text-yellow-400 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute bottom-20 right-12 text-blue-400 animate-bounce">
            <Sparkles className="w-3 h-3" />
          </div>
        </div>

        {/* Enhanced Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-500/80 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Content - COMPACT LAYOUT */}
        <div className="relative z-10 p-6 text-center">
          
          {/* SMALLER Icon with Multiple Animations */}
          <div className="relative mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto flex items-center justify-center animate-bounce shadow-xl">
              <Smartphone className="w-8 h-8 text-black" />
            </div>
            <div className="absolute inset-0 w-16 h-16 bg-yellow-500 rounded-2xl mx-auto animate-ping opacity-20"></div>
            <div className="absolute -top-1 -right-1 text-yellow-400 animate-spin">
              <Crown className="w-5 h-5" />
            </div>
          </div>

          {/* COMPACT Header */}
          <div className="flex items-center justify-center space-x-1 mb-2">
            <Rocket className="w-5 h-5 text-yellow-500 animate-bounce" />
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              GQ Cars App!
            </h3>
            <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-yellow-400 font-semibold mb-4 text-sm">
            🚗 Book SIA-Licensed Drivers Now
          </p>

          {/* COMPACT Features - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
            <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30 flex flex-col items-center">
              <Zap className="w-4 h-4 text-blue-400 mb-1" />
              <span className="text-white font-medium text-center">30-sec booking</span>
            </div>
            <div className="bg-green-600/20 p-2 rounded-lg border border-green-500/30 flex flex-col items-center">
              <Shield className="w-4 h-4 text-green-400 mb-1" />
              <span className="text-white font-medium text-center">Live tracking</span>
            </div>
            <div className="bg-purple-600/20 p-2 rounded-lg border border-purple-500/30 flex flex-col items-center">
              <Star className="w-4 h-4 text-purple-400 mb-1" />
              <span className="text-white font-medium text-center">App discounts</span>
            </div>
            <div className="bg-orange-600/20 p-2 rounded-lg border border-orange-500/30 flex flex-col items-center">
              <Car className="w-4 h-4 text-orange-400 mb-1" />
              <span className="text-white font-medium text-center">GPS updates</span>
            </div>
          </div>

          {/* UPDATED Special Offer - 50% OFF */}
          <div className="bg-gradient-to-r from-red-500/30 to-pink-500/30 p-4 rounded-xl border-2 border-red-500/50 mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-1 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 font-bold text-xs tracking-wider">🔥 SPECIAL OFFER 🔥</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-white font-bold text-lg mb-1">50% OFF First Ride!</p>
              <p className="text-gray-200 text-xs mb-2">New app users only • Limited time</p>
              <button className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all transform hover:scale-105">
                📱 BOOK NOW
              </button>
            </div>
          </div>

          {/* COMPACT Download Buttons */}
          <div className="space-y-2">
            <button 
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-xl text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download Free</span>
              <Sparkles className="w-4 h-4" />
            </button>
            
            <div className="flex space-x-2">
              <button 
                onClick={handleGooglePlay}
                className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1 text-xs border border-gray-600"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18l7.5-6L18 21V3H3z" fill="#34A853"/>
                </svg>
                <span>Play</span>
              </button>
              <button 
                onClick={handleAppStore}
                className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white py-2 px-3 rounded-lg transition-all flex items-center justify-center space-x-1 text-xs border border-gray-600"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>App Store</span>
              </button>
            </div>
          </div>

          {/* COMPACT Trust Indicators */}
          <div className="mt-3 flex items-center justify-center space-x-3 text-xs text-gray-300">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>4.8★</span>
            </div>
            <span className="text-gray-500">•</span>
            <span>10K+ Downloads</span>
            <span className="text-gray-500">•</span>
            <span className="text-blue-400">SIA ✓</span>
          </div>
        </div>

        {/* Enhanced Floating Animation Elements */}
        <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full animate-pulse"></div>
        <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-12 h-12 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full animate-bounce"></div>
      </div>
    </div>
  )
}