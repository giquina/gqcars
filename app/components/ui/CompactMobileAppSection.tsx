'use client'

import { Smartphone } from 'lucide-react'

export default function CompactMobileAppSection() {
  return (
    <section className="py-6 px-4 bg-gradient-to-r from-gray-900 to-blue-900/20">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Left - Title & Description */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">GQ Cars App</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Book <span className="text-amber-400 font-semibold">SIA licensed drivers</span> instantly
              </p>
              
              {/* Compact Features */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-blue-400">⚡ 30-sec booking</div>
                <div className="text-amber-400">🛡️ SIA licensed</div>
                <div className="text-green-400">📱 Live tracking</div>
                <div className="text-purple-400">💳 Secure payments</div>
              </div>
            </div>

            {/* Center - App Store Buttons */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.445 12l2.253-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Right - Mini Phone Preview & Stats */}
            <div className="text-center">
              <div className="inline-block relative mb-3">
                <div className="w-20 h-36 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-600 p-2">
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-gray-800 rounded-md flex flex-col items-center justify-center text-xs">
                    <div className="bg-amber-500 w-6 h-6 rounded mb-1 flex items-center justify-center">
                      <span className="text-black font-bold text-xs">GQ</span>
                    </div>
                    <div className="text-white text-xs mb-1">GQ Cars</div>
                    <div className="bg-amber-500/20 px-2 py-1 rounded text-xs text-amber-400">BOOK</div>
                  </div>
                </div>
              </div>
              <div className="text-xs">
                <div className="text-amber-400 font-semibold">10,000+</div>
                <div className="text-gray-400">satisfied customers</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}