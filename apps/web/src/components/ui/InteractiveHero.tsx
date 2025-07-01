"use client"

import React, { useState, useEffect } from 'react'
import { Zap, Shield, Car, Phone, ArrowRight, Star, Sparkles, Target, Clock, MapPin, Calendar, Smartphone, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import TwoStepBookingFlow from './TwoStepBookingFlow'

interface InteractiveHeroProps {
  children?: React.ReactNode
}

export function InteractiveHero({ children }: InteractiveHeroProps) {
  const [showBookingFlow, setShowBookingFlow] = useState(false)

  const handleBookingSubmit = (bookingData: any) => {
    console.log('Booking submitted:', bookingData)
    // TODO: Integrate with backend API
    // For now, just show success message
    alert(`🎉 Booking submitted successfully! We'll contact you shortly at ${bookingData.phone}`)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Circles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-yellow-400/20 animate-ping"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
        
        {/* Lightning bolts */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`lightning-${i}`}
            className="absolute w-0.5 h-16 bg-gradient-to-b from-yellow-400 to-transparent opacity-60 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${5 + i * 8}%`,
              transform: `rotate(${15 + i * 5}deg)`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${1.5 + Math.random()}s`
            }}
          />
        ))}
        
        {/* Moving particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Glowing overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10"></div>



      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        
        {/* Explosive Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black font-bold px-6 py-3 rounded-full animate-pulse shadow-2xl border-2 border-yellow-300 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
            🔥 #1 SECURITY TRANSPORT IN LONDON 🔥
            <Sparkles className="w-5 h-5 ml-2 animate-spin" />
          </div>
        </div>

        {/* Bold Title with Effects - CENTERED */}
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight text-center">
          <span className="block text-white drop-shadow-2xl hover:scale-105 transition-transform duration-300">GQ CARS</span>
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse hover:animate-none">
            <span className="inline-block hover:scale-110 transition-transform duration-300">SECURITY</span>
          </span>
        </h1>

        {/* Animated Tagline */}
        <div className="mb-8 animate-fade-in">
          <p className="text-2xl md:text-4xl text-white font-black text-center max-w-5xl mx-auto leading-tight">
            <span className="inline-block animate-pulse">📚</span> Book Your Secure Ride Instantly – SIA Licensed Drivers, 24/7 <span className="inline-block animate-pulse">🚗</span>
          </p>
        </div>

        {/* Enhanced CTA for 2-Step Booking Flow */}
        <motion.div 
          className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-500/50 max-w-4xl mx-auto mb-12 shadow-2xl animate-fade-in"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-black text-yellow-400 mb-2">🚀 INSTANT BOOKING SYSTEM</h3>
            <p className="text-white/80">Book your secure ride in 2 simple steps - No hassle, Just results!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Quick Features */}
            <div className="text-center bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
              <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-black text-white text-sm">⚡ 60-Second Booking</h4>
              <p className="text-gray-300 text-xs">Fastest booking in London</p>
            </div>
            <div className="text-center bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
              <Shield className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-black text-white text-sm">🛡️ SIA Licensed</h4>
              <p className="text-gray-300 text-xs">Professional security drivers</p>
            </div>
            <div className="text-center bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-xl p-4 border border-yellow-500/30">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h4 className="font-black text-white text-sm">⭐ 4.9/5 Rating</h4>
              <p className="text-gray-300 text-xs">1000+ happy customers</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowBookingFlow(true)}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black py-6 px-8 rounded-xl transition-all duration-300 text-xl shadow-2xl hover:scale-105 flex items-center justify-center space-x-3"
          >
            <Car className="w-8 h-8" />
            <span>🚀 START 2-STEP BOOKING NOW</span>
            <ArrowRight className="w-8 h-8" />
          </button>
          
          <div className="text-center mt-4">
            <p className="text-gray-400 text-sm">
              Or call us directly: <span className="text-yellow-400 font-bold">07407 655 203</span>
            </p>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <div className="mb-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">How It Works</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <Smartphone className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-xl font-black text-white mb-2">1. BOOK</h4>
              <p className="text-gray-300">Fill out our quick form above or call us directly</p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce" style={{animationDelay: '0.2s'}}>
                <Target className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-xl font-black text-white mb-2">2. TRACK</h4>
              <p className="text-gray-300">Real-time tracking and live updates on your driver</p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center bg-gradient-to-b from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30 hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce" style={{animationDelay: '0.4s'}}>
                <CheckCircle className="w-8 h-8 text-black" />
              </div>
              <h4 className="text-xl font-black text-white mb-2">3. ARRIVE</h4>
              <p className="text-gray-300">Safe, secure arrival with our certified drivers</p>
            </div>
          </div>
        </div>

        {/* Download App Section */}
        <div className="mb-12 animate-fade-in">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
              📱 <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Download Our App</span>
            </h3>
            <p className="text-gray-300">Book faster, track in real-time, and get exclusive deals</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="group bg-black border-2 border-white/20 hover:border-yellow-500 rounded-xl p-4 flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">📱</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400">Download on the</p>
                <p className="text-white font-bold">App Store</p>
              </div>
            </a>
            
            <a
              href="#"
              className="group bg-black border-2 border-white/20 hover:border-yellow-500 rounded-xl p-4 flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">🤖</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400">Get it on</p>
                <p className="text-white font-bold">Google Play</p>
              </div>
            </a>
          </div>
        </div>

        {/* Live Rides Ticker */}
        <div className="mb-8 animate-fade-in">
          <LiveRidesTicker />
        </div>

        {/* Bold Social Proof */}
        <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <div className="flex text-yellow-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-white font-bold text-xl">4.9/5</span>
          </div>
          <p className="text-white font-bold text-lg text-center">
            🏆 "LONDON'S MOST TRUSTED SECURITY TRANSPORT" 🏆
          </p>
          <p className="text-gray-300 mt-2 text-center">
            500+ Elite Clients • VIP Protection • 24/7 Available
          </p>
        </div>

        {/* Children Content */}
        {children && (
          <div className="mt-16">
            {children}
          </div>
        )}

      </div>

      {/* Animated bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-yellow-500/20 via-transparent to-transparent animate-pulse"></div>
      
      {/* 2-Step Booking Flow Modal */}
      <TwoStepBookingFlow
        isOpen={showBookingFlow}
        onClose={() => setShowBookingFlow(false)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  )
}


// Live Rides Ticker Component
function LiveRidesTicker() {
  const [currentRide, setCurrentRide] = useState(0)
  
  const liveRides = [
    "🚗 Driver #247 picking up client in Mayfair",
    "🛡️ Security detail en route to corporate event",
    "✈️ Airport transfer departing from Canary Wharf", 
    "🏆 VIP client arriving at private club",
    "🎭 Wedding transport active in Westminster",
    "🏢 Executive pickup scheduled for City of London",
    "🌟 Close protection team deployed in Knightsbridge"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRide(prev => (prev + 1) % liveRides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-center mb-4">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
        <h3 className="text-xl font-black text-white">
          🔴 <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">LIVE RIDES</span>
        </h3>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse ml-3"></div>
      </div>
      
      <div
        key={currentRide}
        className="text-center animate-fade-in"
      >
        <p className="text-white font-bold text-lg">{liveRides[currentRide]}</p>
      </div>
      
      <div className="flex justify-center mt-4 space-x-2">
        {liveRides.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentRide ? 'bg-green-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default InteractiveHero