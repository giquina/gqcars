'use client'

import { Smartphone, Download, Star, Zap, Shield, Car } from 'lucide-react'

export default function MobileAppCTA() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-8 my-8 relative overflow-hidden">
      {/* Simple Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 border border-yellow-500 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-500 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Simplified Content */}
          <div className="text-white order-2 lg:order-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Smartphone className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">GQ Cars App</h2>
                <p className="text-yellow-500 text-sm">SIA Licensed Drivers</p>
              </div>
            </div>

            {/* Compact Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-blue-400" />
                <span className="text-sm">30-second booking</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Security-trained drivers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Car className="w-5 h-5 text-green-400" />
                <span className="text-sm">Live GPS tracking</span>
              </div>
            </div>

            {/* Compact App Store Buttons */}
            <div className="flex space-x-3">
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-gray-600 text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18l7.5-6L18 21V3H3z" fill="#34A853"/>
                </svg>
                <span>Play Store</span>
              </button>
              <button className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-gray-600 text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <span>App Store</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>4.8 Rating</span>
              </div>
              <span>10K+ Downloads</span>
            </div>
          </div>

          {/* Right side - Compact Phone Mockup */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="bg-black rounded-3xl p-2 shadow-2xl border-2 border-gray-700 w-48">
              <div className="bg-gray-900 rounded-2xl overflow-hidden">
                {/* Status Bar */}
                <div className="bg-black px-4 py-2 flex justify-between items-center text-white text-xs">
                  <span>9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-3 h-1 bg-white rounded-sm"></div>
                    <div className="w-3 h-1 bg-green-500 rounded-sm"></div>
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-gray-800 p-3 flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-black text-sm">GQ</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">GQ Cars</h3>
                    <div className="bg-red-500 text-white text-xs px-1 rounded">SIA</div>
                  </div>
                </div>

                {/* Simple Map */}
                <div className="bg-gradient-to-br from-blue-800 to-green-700 h-24 relative">
                  <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-2 right-2 w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute top-1 left-1 bg-green-500 text-white px-1 rounded text-xs">LIVE</div>
                </div>

                {/* Quick Actions */}
                <div className="p-3 space-y-2">
                  <div className="bg-yellow-500 text-black p-2 rounded text-center text-sm font-bold">
                    BOOK NOW
                  </div>
                  <div className="flex space-x-1 text-xs">
                    <div className="flex-1 bg-gray-700 text-white p-1 rounded text-center">GPS</div>
                    <div className="flex-1 bg-gray-700 text-white p-1 rounded text-center">SIA</div>
                    <div className="flex-1 bg-gray-700 text-white p-1 rounded text-center">24/7</div>
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
