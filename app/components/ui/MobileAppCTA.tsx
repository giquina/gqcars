'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Download, Star, Zap, Shield, Car, Clock, Users, Gift, TrendingUp, MapPin, Crown } from 'lucide-react'

export default function MobileAppCTA() {
  const [liveBookings, setLiveBookings] = useState(247)
  const [driversOnline, setDriversOnline] = useState(23)
  const [savings, setSavings] = useState(45)

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveBookings(prev => prev + Math.floor(Math.random() * 3))
      setDriversOnline(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2))
      setSavings(prev => Math.min(60, Math.max(30, prev + Math.floor(Math.random() * 10) - 5)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-8 my-8 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-4 left-4 w-8 h-8 border border-yellow-500 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Attention-Grabbing Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 px-4 py-2 rounded-full border border-red-500/50 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-bold text-sm">🔥 LIMITED TIME: 50% OFF</span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Skip The Queue. <span className="text-yellow-500">Download Now!</span>
          </h2>
          <p className="text-gray-300 text-sm">Join 12,000+ smart Londoners who book in 15 seconds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Enhanced Persuasive Content */}
          <div className="text-white order-2 lg:order-1">
            
            {/* Live Stats Bar */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-3 rounded-lg border border-green-500/30 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-bold">LIVE NOW</span>
                </div>
                <div className="text-white">
                  <span className="font-bold text-yellow-400">{liveBookings}</span> bookings today
                </div>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-300">{driversOnline} SIA drivers online</span>
                <span className="text-yellow-400 font-bold">Average {savings}% cheaper!</span>
              </div>
            </div>

            {/* App Identity with Social Proof */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-lg relative">
                <Smartphone className="w-6 h-6 text-black" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold flex items-center space-x-2">
                  <span>GQ Cars App</span>
                  <Crown className="w-4 h-4 text-yellow-500" />
                </h3>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-yellow-500">4.9★</span>
                    <span className="text-gray-400">(2,847 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusive Benefits */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-3 group hover:bg-blue-500/10 p-2 rounded-lg transition-all">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium">Book in 15 seconds</span>
                  <div className="text-xs text-blue-400">vs 5+ minutes calling</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-yellow-500/10 p-2 rounded-lg transition-all">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Gift className="w-3 h-3 text-black" />
                </div>
                <div>
                  <span className="text-sm font-medium">App-only discounts</span>
                  <div className="text-xs text-yellow-400">Save up to 30% every ride</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 group hover:bg-green-500/10 p-2 rounded-lg transition-all">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <div>
                  <span className="text-sm font-medium">Real-time GPS tracking</span>
                  <div className="text-xs text-green-400">Never wait wondering again</div>
                </div>
              </div>
            </div>

            {/* Urgency Section */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-3 rounded-lg border border-red-500/30 mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-bold text-sm">Limited Time Offer</span>
              </div>
              <p className="text-white font-bold text-lg">50% OFF Your First 3 Rides!</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-gray-300 text-xs">Ends in:</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                  2 DAYS
                </span>
              </div>
            </div>

            {/* Download Buttons with Better CTAs */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3v18l7.5-6L18 21V3H3z" fill="white"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">FREE on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </button>
                <button className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg border border-gray-600">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs opacity-90">FREE on</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                </button>
              </div>
              
              {/* Alternative CTA */}
              <div className="text-center">
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full transition-all transform hover:scale-110 text-sm">
                  🚗 CLAIM MY 50% DISCOUNT
                </button>
                <p className="text-xs text-gray-400 mt-1">No signup required • Instant download</p>
              </div>
            </div>

            {/* Social Proof Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-400 bg-gray-800/50 p-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>12,000+ happy users</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span>Growing 200% monthly</span>
              </div>
            </div>
          </div>

          {/* Right side - Enhanced Phone Mockup */}
          <div className="relative flex justify-center order-1 lg:order-2">
            {/* Floating Benefits */}
            <div className="absolute -top-4 -left-6 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce shadow-lg">
              Save 50%
            </div>
            <div className="absolute -top-2 -right-8 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse shadow-lg">
              15 sec booking
            </div>
            <div className="absolute bottom-4 -left-8 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold animate-ping shadow-lg">
              Live GPS
            </div>

            <div className="bg-black rounded-3xl p-2 shadow-2xl border-2 border-yellow-500/50 w-48 relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-yellow-500/20 rounded-3xl blur-xl -z-10 animate-pulse"></div>
              
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                {/* Status Bar */}
                <div className="bg-black px-4 py-2 flex justify-between items-center text-white text-xs">
                  <span className="font-bold">9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-1 bg-white rounded-sm"></div>
                    <div className="w-3 h-1 bg-green-500 rounded-sm animate-pulse"></div>
                  </div>
                </div>

                {/* App Header with Live Indicator */}
                <div className="bg-gray-800 p-3 flex items-center space-x-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 animate-pulse"></div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center relative">
                    <span className="font-bold text-black text-sm">GQ</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">GQ Cars</h3>
                    <div className="flex items-center space-x-1">
                      <div className="bg-red-500 text-white text-xs px-1 rounded">SIA</div>
                      <div className="text-green-400 text-xs">● LIVE</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Map with Activity */}
                <div className="bg-gradient-to-br from-blue-800 to-green-700 h-24 relative overflow-hidden">
                  {/* Animated route */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 96">
                    <path
                      d="M20 70 Q60 50 100 60 Q130 65 170 40"
                      stroke="#facc15"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="8,4"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce shadow-lg">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1 left-1 bg-green-500 text-white px-1 rounded text-xs font-bold animate-pulse">
                    LIVE GPS
                  </div>
                  <div className="absolute top-1 right-1 bg-blue-500 text-white px-1 rounded text-xs">
                    ETA 8min
                  </div>
                  <div className="absolute bottom-1 left-1 bg-yellow-500 text-black px-1 rounded text-xs font-bold">
                    {driversOnline} nearby
                  </div>
                </div>

                {/* Booking Interface */}
                <div className="p-3 space-y-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 rounded text-center text-white text-sm font-bold relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <span className="relative z-10">🚗 BOOK NOW - 50% OFF</span>
                  </div>
                  <div className="flex space-x-1 text-xs">
                    <div className="flex-1 bg-gray-700 text-white p-1 rounded text-center relative">
                      <span>GPS</span>
                      <div className="absolute top-0 right-0 w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1 bg-gray-700 text-white p-1 rounded text-center">SIA ✓</div>
                    <div className="flex-1 bg-gray-700 text-white p-1 rounded text-center">24/7</div>
                  </div>
                  <div className="text-center text-yellow-400 text-xs font-bold animate-pulse">
                    Save £{savings} vs calling!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
