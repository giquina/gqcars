'use client'

import { Smartphone, Zap, Shield, Star, Clock } from 'lucide-react'

export default function CompactMobileAppSection() {
  return (
    <section className="py-12 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Content */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full border border-amber-500/30 mb-4">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 font-semibold">DOWNLOAD OUR APP</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-amber-300 bg-clip-text text-transparent">
                  GQ Cars App
                </span>
              </h2>
              <p className="text-gray-300 mb-6">
                Book <span className="text-amber-400 font-semibold">SIA licensed security drivers</span> instantly with our premium taxi service app.
              </p>
            </div>

            {/* Key Features - Compact Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Instant Booking</h4>
                  <p className="text-xs text-gray-400">Under 30 seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                <Shield className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">SIA Licensed</h4>
                  <p className="text-xs text-gray-400">Trained professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                <Star className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">Premium Service</h4>
                  <p className="text-xs text-gray-400">From £7.00/mile</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg">
                <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white">24/7 Support</h4>
                  <p className="text-xs text-gray-400">Always available</p>
                </div>
              </div>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.445 12l2.253-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Quick Benefits */}
            <div className="bg-slate-800/30 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Why Download Our App?
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                <div>• Faster booking</div>
                <div>• Live tracking</div>
                <div>• Secure payments</div>
                <div>• Trip history</div>
              </div>
              <p className="text-xs text-amber-400 mt-2 font-semibold">
                Join 10,000+ satisfied customers!
              </p>
            </div>
          </div>

          {/* Right side - Compact Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-64 h-[400px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] p-4 shadow-2xl border border-gray-700">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-900 rounded-[2rem] overflow-hidden">
                  {/* Phone Content */}
                  <div className="p-4 text-center">
                    <div className="bg-amber-500 w-12 h-12 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-black font-bold text-lg">GQ</span>
                    </div>
                    <h3 className="text-white font-bold mb-2">GQ Cars</h3>
                    <p className="text-gray-300 text-xs mb-4">Professional Taxi Service</p>
                    
                    {/* App Interface Preview */}
                    <div className="space-y-2">
                      <div className="bg-green-500/20 p-2 rounded-lg">
                        <div className="text-xs text-green-400">📍 Your Location (Auto-detected)</div>
                      </div>
                      <div className="bg-blue-500/20 p-2 rounded-lg">
                        <div className="text-xs text-blue-400">📍 Enter destination</div>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-amber-500 text-black px-4 py-2 rounded text-xs font-semibold">
                          BOOK NOW
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded text-xs">
                          RESERVE
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
    </section>
  )
}