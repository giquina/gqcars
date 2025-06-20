import { Shield, Clock, Award, MapPin, Building2, Sparkles, Car, Star, Phone, Plane, Mail, MessageCircle, Calendar, Quote, Calculator, Crown, Users } from 'lucide-react'
import Link from 'next/link'
import GQCarsLogo from './components/ui/GQCarsLogo'
import MobileAppCTA from './components/ui/MobileAppCTA'
import LocationBasedQuotes from './components/ui/LocationBasedQuotes'
import QuoteWidget from './components/ui/QuoteWidget'
import TestimonialsSection from './components/ui/TestimonialsSection'
import WhatsAppWidget from './components/ui/WhatsAppWidget'
import SecurityAssessment from './components/ui/SecurityAssessment'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          {/* You can add a background image of cars here */}
        </div>
        
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-20 py-8 sm:py-12 lg:py-20">
          <div className="max-w-4xl">
            {/* Better mobile logo and brand section */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <GQCarsLogo className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
                <div className="space-y-1 sm:space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-8xl font-bold text-yellow-500 leading-tight">
                    GQ CARS LTD
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-gray-300">
                    SIA Licensed • CPO Trained • Premium Transport
                  </p>
                </div>
              </div>
            </div>
            
            {/* Better mobile-optimized main heading with CTA */}
            <div className="text-center w-full">
              <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mb-6 text-white leading-tight mx-auto max-w-3xl">
                24/7 PROFESSIONAL SECURITY TAXI & PRIVATE HIRE<br />WITH SIA LICENSED EXPERT DRIVERS
              </h2>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a 
                  href="/security-assessment"
                  className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all transform hover:scale-105 text-sm sm:text-lg shadow-xl"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>BOOK NOW</span>
                </a>
                <a 
                  href="/security-assessment"
                  className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all transform hover:scale-105 text-sm sm:text-lg shadow-xl"
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>SCHEDULE RIDE</span>
                </a>
              </div>
            </div>

            {/* INSTANT QUOTE WIDGET - Properly Spaced Below Title */}
            <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
              <QuoteWidget />
            </div>
            
            {/* Better mobile paragraph formatting */}
            <div className="text-center sm:text-left mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed">
                <span className="text-yellow-500 font-semibold">SIA Licensed Close Protection Officers</span> providing{' '}
                <span className="text-blue-400 font-semibold">premium security transport</span>.
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed mt-1 sm:mt-2">
                Experience professional service with intelligent features that make booking faster, smarter, and safer.
              </p>
            </div>
            
            {/* Smart Technology Highlight - Better Mobile Layout */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-3 sm:p-4 md:p-6 rounded-xl border border-blue-500/30 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm">
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-center">💬 INSTANT SUPPORT</span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-center">⚡ SMART QUOTES</span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-center">🎤 VOICE BOOKING</span>
                  </div>
                  <div className="flex flex-col items-center justify-center space-y-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-blue-300 text-center">📍 LOCATION SERVICES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location-Based Smart Quotes */}
            <LocationBasedQuotes />
            
            {/* Interactive Security Assessment */}
            <div className="mt-8 sm:mt-12 mb-8 sm:mb-12">
              <SecurityAssessment />
            </div>
            
            {/* Multiple Call-to-Action Options - Better Mobile Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
              {/* 1. Call Now (Primary) */}
              <a 
                href="tel:07407655203" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-2 py-2 sm:px-3 sm:py-3 lg:px-6 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:animate-pulse" />
                <span>CALL NOW</span>
              </a>

              {/* 2. Email Us */}
              <a 
                href="mailto:bookings@gqcars.co.uk?subject=GQ Cars SECURITY Booking Enquiry&body=Hello, I would like to enquire about your PROFESSIONAL SECURITY taxi services." 
                className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-2 sm:px-3 sm:py-3 lg:px-6 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:rotate-12" />
                <span>EMAIL US</span>
              </a>

              {/* 3. WhatsApp Chat */}
              <a 
                href="https://wa.me/447407655203?text=Hello%20GQ%20Cars!%20I%27m%20interested%20in%20your%20PROFESSIONAL%20SECURITY%20taxi%20services." 
                className="bg-green-600 hover:bg-green-500 text-white px-2 py-2 sm:px-3 sm:py-3 lg:px-6 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center col-span-2 sm:col-span-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:bounce" />
                <span>WHATSAPP</span>
              </a>

              {/* 4. Book Online */}
              <a 
                href="/security-assessment" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 sm:px-3 sm:py-3 lg:px-6 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center"
              >
                <Car className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:translate-x-1" />
                <span>BOOK ONLINE</span>
              </a>

              {/* 5. Get Quote */}
              <a 
                href="/security-assessment" 
                className="bg-purple-600 hover:bg-purple-500 text-white px-2 py-2 sm:px-3 sm:py-3 lg:px-6 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center"
              >
                <Quote className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:rotate-180" />
                <span>GET QUOTE</span>
              </a>

              {/* 6. Schedule Trip */}
              <a 
                href="/security-assessment" 
                className="bg-orange-600 hover:bg-orange-500 text-white px-2 py-2 sm:px-3 sm:py-3 lg:px-6 lg:py-5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-lg flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 lg:space-x-3 transition-all transform hover:scale-105 group shadow-lg text-center"
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 group-hover:scale-110" />
                <span>SCHEDULE</span>
              </a>
            </div>

            {/* Smart Features Showcase */}
            <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-yellow-500/20 p-6 sm:p-8 rounded-2xl border border-yellow-500/30 mb-12">
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-3 bg-black/50 px-6 py-3 rounded-full mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-500 font-bold text-sm sm:text-base">🚀 SMART TECHNOLOGY PLATFORM</span>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  ADVANCED SECURITY TRANSPORT with INTELLIGENT FEATURES
                </h3>
                <p className="text-gray-300 text-sm sm:text-base px-4">
                  PROFESSIONAL SIA LICENSED DRIVERS backed by SMART TECHNOLOGY for seamless booking and SUPERIOR SERVICE
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-purple-500/20 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Live Support</h4>
                  <p className="text-gray-300 text-xs">Instant responses from our team, smart guidance, 24/7 availability</p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-blue-500/20 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Intelligent Pricing</h4>
                  <p className="text-gray-300 text-xs">Smart quote system with route optimization & security considerations</p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-green-500/20 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Location Services</h4>
                  <p className="text-gray-300 text-xs">Automatic location detection, personalized recommendations, smart routing</p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/20 text-center">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Voice Features</h4>
                  <p className="text-gray-300 text-xs">Hands-free booking, voice commands, enhanced accessibility</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                {/* 50% OFF OFFER BANNER */}
                <div className="bg-gradient-to-r from-red-600 to-pink-600 p-4 rounded-xl mb-6 border-2 border-red-500/50 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-white font-bold text-lg">🔥 LIMITED TIME OFFER 🔥</span>
                    </div>
                    <p className="text-white font-bold text-xl mb-1">50% OFF Your First Ride!</p>
                    <p className="text-gray-100 text-sm">New customers only • Use code: FIRST50</p>
                  </div>
                </div>

                <div className="inline-flex items-center space-x-2 text-yellow-500 text-sm font-bold mb-4">
                  <Star className="w-4 h-4" />
                  <span>Why Choose Smart Security Transport?</span>
                  <Star className="w-4 h-4" />
                </div>
                
                {/* Enhanced Stats with Realistic Numbers */}
                <div className="bg-gradient-to-r from-gray-900/80 to-black/80 p-6 rounded-2xl border border-yellow-500/30">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-yellow-500 font-bold text-3xl mb-2">4.9★</div>
                      <div className="text-gray-300 text-sm">Customer Rating</div>
                      <div className="text-xs text-gray-400 mt-1">Based on 500+ reviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-500 font-bold text-3xl mb-2">24/7</div>
                      <div className="text-gray-300 text-sm">Live Support</div>
                      <div className="text-xs text-gray-400 mt-1">Always available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-500 font-bold text-3xl mb-2">100%</div>
                      <div className="text-gray-300 text-sm">SIA Licensed</div>
                      <div className="text-xs text-gray-400 mt-1">Certified drivers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-yellow-500 font-bold text-3xl mb-2">1-20min</div>
                      <div className="text-gray-300 text-sm">Avg. Response</div>
                      <div className="text-xs text-gray-400 mt-1">Varies by location & demand</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Information Display - Creative & Clickable */}
            <div className="bg-gradient-to-r from-gray-900/80 to-black/80 p-6 rounded-2xl border border-yellow-500/30 mb-12 relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-6 h-6 border border-yellow-500 rotate-45 animate-spin-slow"></div>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-yellow-500 mb-2">🚨 Need Immediate Assistance?</h3>
                  <p className="text-gray-300 text-sm">Contact our SIA licensed security team 24/7</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Phone - Clickable */}
                  <a 
                    href="tel:07407655203" 
                    className="bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 p-4 rounded-xl transition-all hover:scale-105 text-center group cursor-pointer"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Phone className="w-6 h-6 text-green-400 group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-green-400 font-bold text-sm mb-1">📞 Call Now</h4>
                    <p className="text-white text-lg font-bold">07407 655 203</p>
                    <p className="text-gray-300 text-xs mt-1">Instant connection</p>
                  </a>

                  {/* Email - Clickable */}
                  <a 
                    href="mailto:bookings@gqcars.co.uk" 
                    className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 p-4 rounded-xl transition-all hover:scale-105 text-center group cursor-pointer"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Mail className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-blue-400 font-bold text-sm mb-1">📧 Email Us</h4>
                    <p className="text-white text-sm font-bold">bookings@gqcars.co.uk</p>
                    <p className="text-gray-300 text-xs mt-1">Quick response</p>
                  </a>

                  {/* WhatsApp - Clickable */}
                  <a 
                    href="https://wa.me/447407655203" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/50 p-4 rounded-xl transition-all hover:scale-105 text-center group cursor-pointer"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <MessageCircle className="w-6 h-6 text-yellow-400 group-hover:animate-bounce" />
                    </div>
                    <h4 className="text-yellow-400 font-bold text-sm mb-1">💬 WhatsApp</h4>
                    <p className="text-white text-sm font-bold">Chat with us</p>
                    <p className="text-gray-300 text-xs mt-1">24/7 Available</p>
                  </a>
                </div>

                <div className="mt-4 text-center">
                  <div className="inline-flex items-center space-x-2 bg-red-500/20 border border-red-500/50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 font-semibold text-sm">🚨 Emergency Line Always Open</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Services Grid - Mobile Responsive 4-Service Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
              
              {/* Service 1: GQ Standard */}
              <Link href="/security-assessment" className="block group">
                <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20 transform hover:-translate-y-1 cursor-pointer">
                  {/* Brand Logo */}
                  <div className="mb-4 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/2/23/Nissan_2020_logo.svg" 
                      alt="Nissan Logo"
                      className="h-12 w-auto object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Car className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-blue-600 px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">STANDARD</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-blue-200">GQ Standard</h3>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-2">
                    <span className="text-blue-400 font-semibold">Nissan Leaf EV 2021</span> with SIA licensed security driver (4-5 passengers)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-blue-400 font-semibold text-xs sm:text-sm">
                      <span>From £6.50/mile</span>
                    </div>
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      50% OFF
                    </div>
                  </div>
                </div>
              </Link>

              {/* Service 2: GQ Premium */}
              <Link href="/security-assessment" className="block group">
                <div className="bg-gradient-to-br from-emerald-900/60 to-emerald-700/40 p-6 rounded-2xl border border-emerald-500/30 hover:border-emerald-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-1 cursor-pointer">
                  {/* Brand Logo */}
                  <div className="mb-4 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" 
                      alt="Mercedes-Benz Logo"
                      className="h-12 w-auto object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-emerald-600 px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">PREMIUM</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-emerald-200">GQ Premium</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    <span className="text-emerald-400 font-semibold">Mercedes S-Class</span> with SIA security driver (4-5 passengers)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-emerald-400 font-semibold text-sm">
                      <span>From £8.50/mile</span>
                    </div>
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      50% OFF
                    </div>
                  </div>
                </div>
              </Link>

              {/* Service 3: GQ Executive */}
              <Link href="/services/executive" className="block group relative">
                <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/40 p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-1 cursor-pointer">
                  {/* Most Popular Badge */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                  {/* Brand Logo */}
                  <div className="mb-4 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 mt-2">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Land_Rover_logo.svg/1200px-Land_Rover_logo.svg.png" 
                      alt="Range Rover Logo"
                      className="h-12 w-auto object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-purple-600 px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">EXECUTIVE</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-purple-200">GQ Executive</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    <span className="text-purple-400 font-semibold">New Range Rover</span> with SIA security driver (4-5 passengers)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-purple-400 font-semibold text-sm">
                      <span>From £10.50/mile</span>
                    </div>
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      50% OFF
                    </div>
                  </div>
                </div>
              </Link>

              {/* Service 4: GQ XL */}
              <Link href="/services/xl" className="block group">
                <div className="bg-gradient-to-br from-orange-900/60 to-orange-700/40 p-6 rounded-2xl border border-orange-500/30 hover:border-orange-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 transform hover:-translate-y-1 cursor-pointer">
                  {/* Brand Logo */}
                  <div className="mb-4 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg" 
                      alt="Mercedes-Benz Logo"
                      className="h-12 w-auto object-contain filter brightness-0 invert group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="bg-orange-600 px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-bold">GROUP XL</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-200">GQ XL</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-2">
                    <span className="text-orange-400 font-semibold">Mercedes 7-Seater 2025 Plate</span> with SIA driver (6-7 passengers)
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-orange-400 font-semibold text-sm">
                      <span>From £7.20/mile</span>
                    </div>
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                      50% OFF
                    </div>
                  </div>
                </div>
              </Link>

            </div>
            
            {/* Testimonials Section - Strategically Placed After Services */}
            <TestimonialsSection />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12">
              
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App CTA */}
      <MobileAppCTA />

      {/* Services Grid */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-500">Professional Security Services</h2>
          
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
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-500">Why Choose GQ CARS LTD</h2>
          
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
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-yellow-500">Ready to Experience Elite Security?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us now to discuss your security requirements and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:07407655203" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-black bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 transition-all transform hover:scale-105 rounded-xl shadow-xl">
              Call Now
              <Phone className="ml-2 h-5 w-5" />
            </a>
            <a href="/security-assessment" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors rounded-xl">
              Request Quote
              <Award className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp AI Assistant Widget */}
      <WhatsAppWidget />
    </>
  )
}