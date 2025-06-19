'use client'

import { Smartphone, Download, Star, Zap } from 'lucide-react'

export default function MobileAppCTA() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 py-16 my-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - App info */}
          <div className="text-white">
            <div className="flex items-center space-x-3 mb-6">
              <Smartphone className="w-12 h-12 text-white" />
              <div>
                <h2 className="text-4xl font-bold">GQ Cars App</h2>
                <p className="text-xl opacity-90">Book instantly, track in real-time</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">Instant booking in 30 seconds</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">Real-time GPS tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6 text-yellow-300" />
                <span className="text-lg">Secure cashless payments</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Google Play Button */}
              <a
                href="#"
                className="bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-xl flex items-center space-x-3 transition-colors group"
              >
                <div className="bg-green-500 p-2 rounded-lg">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Get it on</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href="#"
                className="bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-xl flex items-center space-x-3 transition-colors group"
              >
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-300">Download on the</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-[500px] bg-black rounded-[3rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-[2.5rem] relative overflow-hidden">
                  {/* Phone screen content */}
                  <div className="p-6 text-white">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-yellow-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-black">GQ</span>
                      </div>
                      <h3 className="text-xl font-bold">GQ Cars</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-sm text-gray-300">From</p>
                        <p className="font-semibold">Your Location</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-sm text-gray-300">To</p>
                        <p className="font-semibold">Enter destination</p>
                      </div>
                      <button className="w-full bg-yellow-500 text-black py-4 rounded-xl font-bold">
                        BOOK NOW
                      </button>
                    </div>
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
