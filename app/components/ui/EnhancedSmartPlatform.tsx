'use client'

import { useState, useEffect } from 'react'
import { Shield, Car, Clock, Award, MapPin, Building2, Sparkles, Phone, Mail, MessageCircle, CheckCircle, Star, Crown, Users, Calendar, Plane, Navigation, Settings, Zap, Activity, Globe, Lock, Eye } from 'lucide-react'

export default function EnhancedSmartPlatform() {
  const [liveStats, setLiveStats] = useState({
    driversOnline: 12,
    ridesCompleted: 2847,
    averageRating: 4.9,
    responseTime: '2-8 min',
    currentBookings: 8
  })

  const [isOnline, setIsOnline] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        driversOnline: Math.max(8, Math.min(25, prev.driversOnline + Math.floor(Math.random() * 3) - 1)),
        ridesCompleted: prev.ridesCompleted + Math.floor(Math.random() * 2),
        currentBookings: Math.max(0, Math.min(15, prev.currentBookings + Math.floor(Math.random() * 3) - 1))
      }))
      setLastUpdate(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-purple-900/98 via-blue-900/98 to-green-900/98 backdrop-blur-lg border-t border-yellow-500/30 shadow-2xl">
      <div className="container mx-auto p-4">
        
        {/* Live Status Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className="text-white font-bold text-sm">
                🚀 SMART PLATFORM {isOnline ? 'LIVE' : 'OFFLINE'}
              </span>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-xs text-gray-300">
              <span>Last update: {lastUpdate.toLocaleTimeString()}</span>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3 text-green-400" />
                <span>Real-time</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              FULLY LICENSED
            </span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              AI POWERED
            </span>
          </div>
        </div>

        {/* Enhanced Live Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
          <div className="bg-black/30 p-3 rounded-lg text-center border border-green-500/20">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Car className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-bold text-lg">{liveStats.driversOnline}</span>
            </div>
            <div className="text-gray-300 text-xs">Drivers Online</div>
            <div className="text-green-400 text-xs mt-1">● Live</div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg text-center border border-blue-500/20">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <CheckCircle className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-bold text-lg">{liveStats.ridesCompleted.toLocaleString()}</span>
            </div>
            <div className="text-gray-300 text-xs">Rides Completed</div>
            <div className="text-blue-400 text-xs mt-1">Total</div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg text-center border border-yellow-500/20">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">{liveStats.averageRating}★</span>
            </div>
            <div className="text-gray-300 text-xs">Rating</div>
            <div className="text-yellow-400 text-xs mt-1">Average</div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg text-center border border-purple-500/20">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-bold text-sm">{liveStats.responseTime}</span>
            </div>
            <div className="text-gray-300 text-xs">Response Time</div>
            <div className="text-purple-400 text-xs mt-1">Current</div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg text-center border border-orange-500/20">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="w-4 h-4 text-orange-400" />
              <span className="text-orange-400 font-bold text-lg">{liveStats.currentBookings}</span>
            </div>
            <div className="text-gray-300 text-xs">Active Now</div>
            <div className="text-orange-400 text-xs mt-1">Live</div>
          </div>
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          
          {/* Left side - Platform features */}
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-gray-300 text-xs sm:text-sm">
                🛡️ SIA Close Protection • 🚗 TFL Private Hire • 📅 Pre-Booking • 🤖 AI Powered
              </div>
            </div>
          </div>
          
          {/* Right side - Enhanced action buttons */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => {
                const smartPlatformButton = document.querySelector('[data-smart-platform]') as HTMLElement
                smartPlatformButton?.click()
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg border border-white/20 group"
            >
              <Shield className="w-4 h-4" />
              <span>VIEW LICENSES</span>
              <Eye className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </button>
            
            <a 
              href="https://wa.me/447407655203?text=Hi! I'm interested in your SIA licensed security transport services. Can you help me with a quote?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WHATSAPP</span>
              <span className="sm:hidden">CHAT</span>
            </a>
            
            <a 
              href="tel:07407655203"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">BOOK NOW</span>
              <span className="sm:hidden">CALL</span>
            </a>
          </div>
        </div>

        {/* Security & Trust Indicators */}
        <div className="mt-4 pt-4 border-t border-gray-600 hidden sm:block">
          <div className="grid grid-cols-6 gap-4 text-center">
            <div className="flex flex-col items-center">
              <Lock className="w-5 h-5 text-green-400 mb-1" />
              <span className="text-xs text-gray-300">256-bit SSL</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-5 h-5 text-blue-400 mb-1" />
              <span className="text-xs text-gray-300">SIA Verified</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle className="w-5 h-5 text-yellow-400 mb-1" />
              <span className="text-xs text-gray-300">TFL Licensed</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="w-5 h-5 text-purple-400 mb-1" />
              <span className="text-xs text-gray-300">24/7 Global</span>
            </div>
            <div className="flex flex-col items-center">
              <Activity className="w-5 h-5 text-orange-400 mb-1" />
              <span className="text-xs text-gray-300">Live Tracking</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-5 h-5 text-green-400 mb-1" />
              <span className="text-xs text-gray-300">4.9★ Rated</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact Banner */}
        <div className="mt-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-2 text-red-400 font-bold text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span>🚨 EMERGENCY 24/7: 07407 655 203</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  )
}