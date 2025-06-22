'use client'

import { useState, useEffect } from 'react'
import { Smartphone, Download, Star, Zap, Gift, Users, TrendingUp, Clock } from 'lucide-react'

export default function MobileAppCTA() {
  const [liveBookings, setLiveBookings] = useState(247)
  const [savings, setSavings] = useState(45)

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(prev => prev + Math.floor(Math.random() * 3))
      setSavings(prev => Math.min(60, Math.max(30, prev + Math.floor(Math.random() * 10) - 5)))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-black py-6 my-6 relative overflow-hidden">
      {/* Compact Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 left-2 w-4 h-4 border border-yellow-500 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-2 right-2 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Compact Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center space-x-2 bg-red-500/20 px-3 py-1 rounded-full border border-red-500/50 mb-2">
            <Clock className="w-3 h-3 text-red-400 animate-pulse" />
            <span className="text-red-400 font-bold text-xs">🔥 50% OFF ENDS IN 2 DAYS</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Skip The Queue. <span className="text-yellow-500">Download GQ Cars!</span>
          </h2>
        </div>

        {/* Ultra Compact Card Layout */}
        <div className="bg-gradient-to-r from-gray-800/50 to-blue-800/50 rounded-xl border border-yellow-500/30 p-4 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
            
            {/* Mini Phone Mockup */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-black rounded-2xl p-1 shadow-lg border border-yellow-500/50 w-24 relative">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-2xl blur-md animate-pulse -z-10"></div>
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="bg-black px-2 py-1 flex justify-between text-white text-xs">
                    <span className="font-bold">9:41</span>
                    <div className="w-2 h-1 bg-green-500 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-gray-800 p-1 flex items-center space-x-1">
                    <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
                      <span className="text-black text-xs font-bold">G</span>
                    </div>
                    <div className="text-white text-xs">GQ</div>
                    <div className="bg-red-500 text-white text-xs px-1 rounded">SIA</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-800 to-green-700 h-12 relative">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-green-400 rounded-full"></div>
                    <div className="absolute top-0 left-0 bg-green-500 text-white px-1 rounded text-xs">LIVE</div>
                  </div>
                  <div className="p-1">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-1 rounded text-center text-white text-xs font-bold">
                      50% OFF
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold text-sm">LIVE NOW</span>
              </div>
              <div className="text-white text-sm">
                <div className="font-bold text-yellow-400">{liveBookings}</div>
                <div className="text-xs text-gray-300">bookings today</div>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-1 mt-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-white text-xs">4.9★ (2.8K reviews)</span>
              </div>
            </div>

            {/* Compact Benefits */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">15-sec booking</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">Save {savings}% vs calling</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">12K+ happy users</span>
              </div>
            </div>

            {/* Compact CTAs */}
            <div className="flex flex-col space-y-2">
              <button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all transform hover:scale-105 text-sm font-bold">
                <Download className="w-4 h-4" />
                <span>CLAIM 50% OFF</span>
              </button>
              <div className="flex space-x-1">
                <button className="flex-1 bg-black hover:bg-gray-800 text-white px-2 py-1 rounded flex items-center justify-center space-x-1 transition-all text-xs border border-gray-600">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                    <path d="M3 3v18l7.5-6L18 21V3H3z"/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="flex-1 bg-black hover:bg-gray-800 text-white px-2 py-1 rounded flex items-center justify-center space-x-1 transition-all text-xs border border-gray-600">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <span>iOS</span>
                </button>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span>Growing 200% monthly</span>
              </div>
            </div>
          </div>

          {/* Bottom Urgency Strip */}
          <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 font-bold text-xs">SPECIAL OFFER</span>
              <span className="text-white text-xs">Save up to £60 • First 3 rides</span>
            </div>
            <span className="text-yellow-400 font-bold text-xs animate-pulse">⏰ 2 DAYS LEFT</span>
          </div>
        </div>
      </div>
    </div>
  )
}
