'use client'

import { Smartphone, Download, Star, Zap, Shield, Car, MapPin, Navigation, Clock, Users, Building2 } from 'lucide-react'

export default function MobileAppCTA() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black py-10 sm:py-16 lg:py-20 my-10 sm:my-16 lg:my-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-12 h-12 sm:w-20 sm:h-20 border border-yellow-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-10 h-10 sm:w-16 sm:h-16 border border-blue-500 rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 border border-yellow-500 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full animate-ping"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-yellow-500/10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Better Centered */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex flex-col items-center space-y-4 bg-black/50 px-8 sm:px-12 py-6 sm:py-8 rounded-3xl border border-yellow-500/30 mb-8 sm:mb-12">
            <Smartphone className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-500 animate-bounce" />
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2">
                Download Our App
              </h2>
              <p className="text-yellow-500 text-base sm:text-lg lg:text-xl font-semibold">
                Book SIA Trained Drivers Instantly
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
            Get the <span className="text-yellow-500 font-bold">GQ Cars app</span> and experience premium taxi service with 
            <span className="text-blue-400 font-bold"> security-trained professionals</span> at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
          {/* Left side - App info with better alignment */}
          <div className="text-white order-2 lg:order-1">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 mb-8 sm:mb-10">
              <div className="bg-yellow-500 p-3 sm:p-4 rounded-3xl">
                <Smartphone className="w-10 h-10 sm:w-14 sm:h-14 text-black" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2">
                  GQ Cars App
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-yellow-500 font-semibold mb-2">
                  Professional Taxi & Private Hire
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-gray-300">
                  SIA Licensed • CPO Trained Drivers
                </p>
              </div>
            </div>

            <div className="mb-6 sm:mb-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-yellow-500">Book Your Security-Trained Driver</h3>
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
                    <p className="text-gray-300">Professional rates for SIA licensed drivers - starting from £7.00/mile</p>
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

          {/* Right side - Enhanced Mobile App Mockup with GPS Features */}
          <div className="relative flex justify-center">
            {/* Floating GPS Indicators */}
            <div className="absolute -top-6 -left-8 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-ping">
              <div className="w-6 h-6 bg-green-600 rounded-full"></div>
            </div>
            <div className="absolute -top-4 -right-10 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            </div>
            <div className="absolute bottom-8 -left-8 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center animate-bounce">
              <div className="w-5 h-5 bg-yellow-600 rounded-full"></div>
            </div>
            <div className="absolute bottom-12 -right-6 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            </div>

            {/* Phone Mockup */}
            <div className="bg-black rounded-[3rem] p-3 shadow-2xl border-4 border-gray-700 relative max-w-sm mx-auto">
              {/* Phone Screen */}
              <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="bg-black px-6 py-3 flex justify-between items-center text-white text-sm">
                  <span className="font-bold">9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                    <div className="w-4 h-2 bg-white rounded-sm"></div>
                    <div className="w-6 h-2 bg-green-500 rounded-sm animate-pulse"></div>
                  </div>
                </div>

                {/* App Header */}
                <div className="bg-gray-800 p-4 flex items-center space-x-3 relative">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <span className="font-bold text-black text-lg">GQ</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold">GQ Cars</h3>
                    <p className="text-gray-400 text-sm">Professional Taxi Service</p>
                  </div>
                  <div className="ml-auto">
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">SIA</div>
                  </div>
                  {/* Live GPS indicator */}
                  <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Interactive GPS Map Section */}
                <div className="relative bg-gradient-to-br from-blue-900 via-green-800 to-blue-700 h-48 overflow-hidden">
                  {/* Map Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div key={i} className="border border-blue-400/20"></div>
                      ))}
                    </div>
                  </div>

                  {/* Animated Route Line */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 192">
                    <defs>
                      <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#facc15" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M30 150 Q80 120 150 130 Q200 140 270 80"
                      stroke="url(#routeGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="12,6"
                      className="animate-pulse"
                    />
                  </svg>

                  {/* Moving GPS Dots with Traffic Simulation */}
                  <div className="absolute top-12 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg">
                    <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                    <div className="absolute top-5 left-1 text-white text-xs font-bold">YOU</div>
                  </div>
                  <div className="absolute top-20 right-12 w-3 h-3 bg-green-400 rounded-full animate-bounce">
                    <div className="absolute top-4 left-1 text-white text-xs">🚗</div>
                  </div>
                  <div className="absolute bottom-16 left-12 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-12 right-8 w-3 h-3 bg-red-400 rounded-full animate-ping">
                    <div className="absolute top-4 left-1 text-white text-xs">🚕</div>
                  </div>

                  {/* Dynamic Location Pins */}
                  <div className="absolute top-8 left-6 text-green-400 animate-bounce">
                    <MapPin className="w-6 h-6" />
                    <div className="absolute -bottom-2 left-7 text-white text-xs bg-black/50 px-1 rounded">Pickup</div>
                  </div>
                  <div className="absolute bottom-8 right-6 text-red-400 animate-pulse">
                    <MapPin className="w-6 h-6" />
                    <div className="absolute -bottom-2 right-7 text-white text-xs bg-black/50 px-1 rounded">Drop</div>
                  </div>

                  {/* Live Status Badges */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE GPS</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ETA 12 min
                  </div>
                  <div className="absolute bottom-4 left-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    3 drivers nearby
                  </div>
                </div>

                {/* Service Selection with Smart Features */}
                <div className="p-4 space-y-3">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Car className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm">Premium Security Drivers</span>
                      </div>
                      <p className="text-white/90 text-xs">From £7.00/mile • Airport transfers from £140</p>
                    </div>
                  </div>

                  {/* Smart Location Inputs with Auto-Detection */}
                  <div className="space-y-2">
                    <div className="bg-gray-800 p-3 rounded-lg flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-red-400 text-xs font-bold">From</p>
                        <p className="text-white text-sm flex items-center space-x-1">
                          <Navigation className="w-3 h-3" />
                          <span>Your Location</span>
                          <span className="text-green-400 text-xs font-bold">(Auto-detected)</span>
                        </p>
                      </div>
                      <div className="text-green-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <div className="flex-1">
                        <p className="text-blue-400 text-xs font-bold">To</p>
                        <p className="text-white text-sm flex items-center space-x-1">
                          <Building2 className="w-3 h-3" />
                          <span>Enter destination</span>
                        </p>
                      </div>
                      <div className="text-blue-400">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-yellow-500 text-black text-xs font-bold py-2 px-3 rounded-lg">
                      BOOK NOW
                    </button>
                    <button className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 px-3 rounded-lg">
                      RESERVE RIDE
                    </button>
                  </div>
                </div>

                {/* Smart Features Navigation */}
                <div className="bg-gray-800 p-3 flex justify-around items-center">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-1 animate-pulse">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-300 text-xs">Smart GPS</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-1 animate-bounce">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-300 text-xs">Live Quotes</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-1 animate-pulse">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-300 text-xs">SIA Secure</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-1 animate-ping">
                      <Users className="w-4 h-4 text-black" />
                    </div>
                    <p className="text-gray-300 text-xs">Live Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Floating Action Indicators */}
            <div className="absolute -bottom-6 -right-8 bg-yellow-500 p-3 rounded-full animate-bounce shadow-xl">
              <Star className="w-6 h-6 text-black" />
            </div>
            <div className="absolute top-1/2 -left-12 bg-green-500 p-2 rounded-full animate-pulse shadow-xl">
              <Shield className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
