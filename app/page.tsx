import { Shield, Clock, Award, MapPin, Building2, Sparkles, Car, Star, Phone, Plane, Mail, MessageCircle, Calendar, Quote, Calculator, Crown, Users, Mic } from 'lucide-react'
import Link from 'next/link'
import GQCarsLogo from './components/ui/GQCarsLogo'
import MobileAppCTA from './components/ui/MobileAppCTA'
import LocationBasedQuotes from './components/ui/LocationBasedQuotes'
import QuoteWidget from './components/ui/QuoteWidget'
import TestimonialsSection from './components/ui/TestimonialsSection'
import WhatsAppWidget from './components/ui/WhatsAppWidget'
import LiveNotifications from './components/ui/LiveNotifications'
import InteractiveFeaturesShowcase from './components/ui/InteractiveFeaturesShowcase'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          {/* You can add a background image of cars here */}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl">
            {/* Better mobile logo and brand section */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 mb-8">
              <GQCarsLogo className="w-16 h-16 sm:w-20 sm:h-20 mx-auto sm:mx-0" />
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-yellow-500 leading-tight">
                  GQ CARS LTD
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-gray-300">
                  SIA Licensed • CPO Trained • Premium Transport
                </p>
              </div>
            </div>
            
            {/* Better mobile-optimized main heading with CTA */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-white leading-tight text-center sm:text-left">
              24/7 PROFESSIONAL SECURITY TAXI & PRIVATE HIRE SERVICE<br />WITH SIA LICENSED EXPERT DRIVERS
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:07407655203"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 text-lg shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  <span>BOOK NOW</span>
                  <span className="text-base">📞</span>
                </a>
                <a 
                  href="/schedule"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5 rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110" />
                  <span>SCHEDULE</span>
                </a>
              </div>
            </h2>

            {/* INSTANT QUOTE WIDGET - Prominently Placed at Top */}
            <div className="mb-12">
              <QuoteWidget />
            </div>
            
            {/* Better mobile paragraph formatting */}
            <div className="text-center sm:text-left mb-6">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                <span className="text-yellow-500 font-semibold">SIA Licensed Close Protection Officers</span> providing{' '}
                <span className="text-blue-400 font-semibold">premium security transport</span>.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed mt-2">
                Experience professional service with intelligent features that make booking faster, smarter, and safer.
              </p>
            </div>
            
            {/* Location-Based Smart Quotes */}
            <LocationBasedQuotes />
            
            {/* Smart Features Showcase */}
            <div className="py-16 sm:py-24 bg-gradient-to-b from-gray-900 to-black">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
                    Experience the <span className="text-yellow-500">GQ Difference</span>
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                    Our intelligent platform is designed to make your journey safer, smoother, and more efficient from start to finish.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/80 border border-gray-700 hover:border-blue-500/50">
                    <div className="mb-4">
                      <MessageCircle className="w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Instant Support</h3>
                    <p className="text-gray-400 text-sm">24/7 chat with our AI-powered assistant or human support team.</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/80 border border-gray-700 hover:border-yellow-500/50">
                    <div className="mb-4">
                      <Sparkles className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Smart Quotes</h3>
                    <p className="text-gray-400 text-sm">Get transparent, upfront pricing in seconds with our intelligent quoting system.</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/80 border border-gray-700 hover:border-purple-500/50">
                    <div className="mb-4">
                      <Mic className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Voice Booking</h3>
                    <p className="text-gray-400 text-sm">Book your ride hands-free using simple voice commands.</p>
                  </div>

                  <div className="bg-gray-800/50 rounded-2xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:bg-gray-700/80 border border-gray-700 hover:border-green-500/50">
                    <div className="mb-4">
                      <MapPin className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Location Services</h3>
                    <p className="text-gray-400 text-sm">Real-time tracking, smart routing, and location-based alerts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InteractiveFeaturesShowcase />

      {/* Services Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Professional Security Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Shield className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Close Protection</h3>
              <p className="text-gray-400">SIA licensed officers providing professional personal security and threat management.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Car className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Private Hire</h3>
              <p className="text-gray-400">Premium chauffeur services with trained security drivers and luxury vehicles.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Building2 className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Corporate Security</h3>
              <p className="text-gray-400">Comprehensive security solutions for businesses and executive protection.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Sparkles className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Wedding Security</h3>
              <p className="text-gray-400">Discreet protection and luxury transport for your special day.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Star className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">VIP Services</h3>
              <p className="text-gray-400">Bespoke security and transport solutions for high-profile clients.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <MapPin className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Event Security</h3>
              <p className="text-gray-400">Professional security coordination for events and special occasions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose GQ Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-gray-400 font-medium">SIA Licensed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Protection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">10+</div>
              <div className="text-gray-400 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience Elite Security?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us now to discuss your security requirements and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+442012345678" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
              Call Now
              <Phone className="ml-2 h-5 w-5" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
              Request Quote
              <Award className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp AI Assistant Widget */}
      <WhatsAppWidget />
      
      {/* Live Customer Notifications */}
      <LiveNotifications />

      {/* Enhanced Contact Information Display - Creative & Clickable */}
      <div className="bg-gradient-to-r from-gray-900/80 to-black/80 p-6 rounded-2xl border border-yellow-500/30 mb-12 relative overflow-hidden">
        {/* ... existing code ... */}
      </div>
    </>
  )
}