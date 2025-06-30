"use client"

import { useState, useEffect } from 'react'
import { Smartphone, X, Download, Star, Clock, Users, Zap, Gift } from 'lucide-react'
import QRCodeDownload from './QRCodeDownload'

export default function MobileAppBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [timeLeft, setTimeLeft] = useState(48) // 48 hours
  const [activeUsers, setActiveUsers] = useState(127)

  useEffect(() => {
    // Check if user has already interacted with the banner
    const hasSeenBanner = localStorage.getItem('gqcars-app-banner-seen')
    if (hasSeenBanner) return

    // Show banner after 5 seconds for demo (was 60 seconds)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // 5 seconds for demo

    // Countdown timer
    const countdownTimer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 0.5))
    }, 1800000) // Update every 30 minutes

    // Active users simulation
    const usersTimer = setInterval(() => {
      setActiveUsers(prev => Math.max(100, prev + Math.floor(Math.random() * 10) - 5))
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearInterval(countdownTimer)
      clearInterval(usersTimer)
    }
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
    // Track conversion
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'app_download_click', {
        event_category: 'App Marketing',
        event_label: 'Banner CTA'
      })
    }
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm ${isClosing ? 'opacity-0' : 'animate-fadeIn'}`}>
      
      {/* Enhanced Compact Banner Container */}
      <div className={`relative max-w-sm w-full bg-gradient-to-br from-gray-900 via-blue-900 to-black rounded-xl border-2 border-yellow-500/60 shadow-2xl ${isClosing ? 'scale-95 opacity-0' : 'scale-100'} transition-all duration-300 overflow-hidden`}>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-blue-500/20 to-yellow-500/20 animate-pulse rounded-xl -z-10 blur-sm"></div>
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 w-7 h-7 bg-red-500/90 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Urgent Header Bar */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-2 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-3 h-3 text-white animate-pulse" />
            <span className="text-white font-bold text-xs">ENDS IN {Math.floor(timeLeft)}H • 50% OFF</span>
            <Clock className="w-3 h-3 text-white animate-pulse" />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 text-center relative">
          
          {/* Live Activity Indicator */}
          <div className="absolute top-2 left-2 flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-bold">{activeUsers} online</span>
          </div>
          
          {/* App Icon with Badge */}
          <div className="relative mb-3 mt-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl mx-auto flex items-center justify-center shadow-lg">
              <Smartphone className="w-7 h-7 text-black" />
            </div>
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full font-bold animate-bounce">
              NEW
            </div>
          </div>

          {/* Compelling Header */}
          <h3 className="text-lg font-bold text-white mb-1">
            Don't Wait In The Rain! 🌧️
          </h3>
          <p className="text-yellow-400 text-sm font-semibold mb-3">
            Book Your SIA Driver in 15 Seconds
          </p>

          {/* Social Proof */}
          <div className="bg-gray-800/50 p-2 rounded-lg mb-3">
            <div className="flex items-center justify-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-white">4.9★</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-blue-400" />
                <span className="text-white">12K+ users</span>
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span className="text-green-400 font-bold">200+ rides today</span>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30 text-center">
              <Zap className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <span className="text-white font-medium">15-sec booking</span>
            </div>
            <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/30 text-center">
              <Gift className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
              <span className="text-white font-medium">Exclusive deals</span>
            </div>
          </div>

          {/* Mega Offer */}
          <div className="bg-gradient-to-r from-red-500/30 to-pink-500/30 p-3 rounded-xl border border-red-500/50 mb-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-red-400/10 animate-pulse"></div>
            <div className="relative z-10">
              <p className="text-red-400 font-bold text-xs mb-1">🔥 APP LAUNCH SPECIAL 🔥</p>
              <p className="text-white font-bold text-lg">50% OFF First 3 Rides!</p>
              <p className="text-gray-200 text-xs">Save up to £60 • New users only</p>
            </div>
          </div>

          {/* Enhanced Download Button */}
          <button 
            onClick={handleDownload}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-3 px-4 rounded-xl transition-all transform hover:scale-105 text-sm flex items-center justify-center space-x-2 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            <Download className="w-4 h-4 relative z-10" />
            <span className="relative z-10">CLAIM MY 50% DISCOUNT</span>
          </button>

          {/* QR Code Download Option */}
          <div className="mt-3 flex justify-center">
            <QRCodeDownload />
          </div>
          
          {/* Trust & Urgency Footer */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
              <span>✓ No signup required</span>
              <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              <span>✓ Instant access</span>
            </div>
            <p className="text-red-400 text-xs font-bold animate-pulse">
              ⏰ Only {Math.floor(timeLeft)} hours left!
            </p>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 animate-pulse"></div>
      </div>
    </div>
  )
}