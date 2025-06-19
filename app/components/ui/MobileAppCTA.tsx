'use client'

import { Smartphone, Download, Star, Zap, Shield, Car } from 'lucide-react'

export default function MobileAppCTA() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-20 my-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border border-yellow-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border border-blue-500 rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-yellow-500 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-yellow-500 rounded-full animate-ping"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-yellow-500/10"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-4 bg-black/50 px-8 py-4 rounded-2xl border border-yellow-500/30 mb-8">
            <Smartphone className="w-12 h-12 text-yellow-500 animate-bounce" />
            <div>
              <h2 className="text-4xl font-bold text-white">Download Our App</h2>
              <p className="text-yellow-500 text-lg">Book SIA Trained Drivers Instantly</p>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get the <span className="text-yellow-500 font-bold">GQ Cars app</span> and experience premium taxi service with 
            <span className="text-blue-400 font-bold"> security-trained professionals</span> at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - App info */}
          <div className="text-white">
            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-yellow-500 p-3 rounded-2xl">
                <Smartphone className="w-12 h-12 text-black" />
              </div>
              <div>
                <h2 className="text-5xl font-bold">GQ Cars App</h2>
                <p className="text-2xl text-yellow-500 font-semibold">Professional Taxi & Private Hire</p>
                <p className="text-lg text-gray-300">SIA Licensed • CPO Trained Drivers</p>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-3xl font-bold mb-6 text-yellow-500">Book Your Security-Trained Driver</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 p-2 rounded-lg mt-1">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Instant Taxi Booking</h4>
                    <p className="text-gray-300">Book your taxi or private hire vehicle in under 30 seconds with our SIA licensed drivers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-2 rounded-lg mt-1">
                    <Shield className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Security-Trained Professionals</h4>
                    <p className="text-gray-300">All drivers are Close Protection Officers with advanced security training</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 p-2 rounded-lg mt-1">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">Premium Security Service</h4>
                    <p className="text-gray-300">Professional rates for SIA licensed drivers - starting from £3.50/mile</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 p-2 rounded-lg mt-1">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-1">24/7 Premium Support</h4>
                    <p className="text-gray-300">Dedicated support line for app users with priority booking</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Real App Store Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Google Play Store Button */}
              <a
                href="#"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3 transition-colors border border-gray-600"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3v18l7.5-6L18 21V3H3z" fill="#34A853"/>
                  <path d="M13.5 15l4.5 6V3l-4.5 6v6z" fill="#FBBC04"/>
                  <path d="M3 3l7.5 6L18 3H3z" fill="#EA4335"/>
                  <path d="M10.5 9L3 21h15l-7.5-12z" fill="#4285F4"/>
                </svg>
                <div>
                  <p className="text-xs text-gray-300">GET IT ON</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </a>

              {/* Apple App Store Button */}
              <a
                href="#"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3 transition-colors border border-gray-600"
              >
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-xs text-gray-300">Download on the</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </a>
            </div>

            <p className="text-sm text-gray-400 mt-6">
              * Available for iOS 12+ and Android 8+. Secure payments and real-time tracking included.
            </p>

            {/* Call to Action */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-xl border border-yellow-500/30">
              <h4 className="text-xl font-bold text-white mb-2">🎯 Why Download Our App?</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-gray-300">✓ Faster booking than calling</div>
                <div className="text-gray-300">✓ Live driver tracking</div>
                <div className="text-gray-300">✓ Secure in-app payments</div>
                <div className="text-gray-300">✓ Trip history & receipts</div>
              </div>
              <p className="text-yellow-500 font-semibold mt-3">Join 10,000+ satisfied customers using our app!</p>
            </div>
          </div>

          {/* Right side - Professional Phone Mockup */}
          <div className="flex justify-center relative">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-4 border-gray-700">
                <div className="w-full h-full bg-black rounded-[2.8rem] relative overflow-hidden">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 py-4 text-white text-sm">
                    <span>9:41</span>
                    <span>📶 📶 🔋</span>
                  </div>
                  
                  {/* App Content */}
                  <div className="px-6 py-4">
                    {/* App Header */}
                    <div className="flex items-center space-x-3 mb-8">
                      <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                        <span className="text-black font-bold text-lg">GQ</span>
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">GQ Cars</h3>
                        <p className="text-gray-400 text-sm">Professional Taxi Service</p>
                      </div>
                    </div>
                    
                    {/* Hero Image - Taxi/Security Car */}
                    <div className="bg-gradient-to-r from-yellow-500 to-blue-600 rounded-2xl p-6 mb-6 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-bl-lg">
                        SIA
                      </div>
                      <Car className="w-16 h-16 mx-auto mb-4 text-white" />
                      <p className="text-white font-bold text-lg">Premium Security Drivers</p>
                      <p className="text-white/90 text-sm">From £3.50/mile • Airport transfers from £70</p>
                    </div>
                    
                    {/* Booking Form */}
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">From</p>
                        <p className="text-white font-semibold">📍 Your Location</p>
                      </div>
                      <div className="bg-gray-800 p-4 rounded-xl">
                        <p className="text-gray-400 text-sm">To</p>
                        <p className="text-gray-300">🏢 Enter destination</p>
                      </div>
                      
                      {/* Service Options */}
                      <div className="flex space-x-2">
                        <div className="bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm font-bold flex-1 text-center">
                          🚖 Taxi
                        </div>
                        <div className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm flex-1 text-center">
                          🛡️ Security
                        </div>
                      </div>
                      
                      <button className="w-full bg-gradient-to-r from-blue-600 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg">
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 p-3 rounded-full animate-bounce">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 p-3 rounded-full animate-pulse">
                <Star className="w-6 h-6 text-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
