import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Zap, Eye, Globe, Mic, Camera, Clock, MapPin, Shield, Star, Phone, Calendar, MessageCircle } from 'lucide-react'

export default function InteractiveHero() {
  const [isListening, setIsListening] = useState(false)
  const [liveBookings, setLiveBookings] = useState(47)
  const [driversOnline, setDriversOnline] = useState(23)
  const [activeQuote, setActiveQuote] = useState(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(prev => prev + Math.floor(Math.random() * 3))
      setDriversOnline(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Track mouse for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Voice booking simulation
  const handleVoiceBooking = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
              }}
            />
          ))}
        </div>

        {/* 3D Grid Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `perspective(500px) rotateX(20deg) translateZ(${mousePosition.y * 50}px)`
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        
        {/* Real-time Status Bar */}
        <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-sm rounded-2xl p-4 border border-green-500/30">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 font-bold">{driversOnline} drivers online</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400 font-bold">{liveBookings} live bookings</span>
            </div>
          </div>
        </div>

        {/* Interactive 3D Logo */}
        <div className="text-center mb-12">
          <div 
            className="inline-block transform transition-all duration-300 hover:scale-110"
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * 10}deg)`
            }}
          >
            <div className="relative">
              <h1 className="text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent animate-pulse">
                GQ CARS
              </h1>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 opacity-20 blur-2xl animate-pulse" />
            </div>
          </div>
        </div>

        {/* Interactive Smart Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Voice Booking Card */}
          <div 
            className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
              isListening 
                ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/20 border-green-400 shadow-lg shadow-green-500/25' 
                : 'bg-gradient-to-br from-purple-500/10 to-blue-600/10 border-purple-500/30 hover:border-purple-400'
            }`}
            onClick={handleVoiceBooking}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all ${
                isListening ? 'bg-green-500 animate-pulse' : 'bg-purple-600 group-hover:bg-purple-500'
              }`}>
                <Mic className={`w-6 h-6 text-white ${isListening ? 'animate-bounce' : ''}`} />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">
                {isListening ? '🎤 Listening...' : 'Voice Booking'}
              </h3>
              <p className="text-gray-300 text-sm">
                {isListening ? 'Say "Book a ride to..." to get started' : 'Tap to book with your voice'}
              </p>
              
              {isListening && (
                <div className="mt-4 flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-green-400 rounded-full animate-pulse"
                      style={{
                        height: `${Math.random() * 20 + 10}px`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AR Preview Card */}
          <div className="group relative p-6 rounded-2xl border-2 border-blue-500/30 hover:border-blue-400 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 transition-all duration-500 cursor-pointer transform hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-600 group-hover:bg-blue-500 rounded-xl flex items-center justify-center mb-4 transition-all">
                <Camera className="w-6 h-6 text-white group-hover:animate-spin" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">AR Preview</h3>
              <p className="text-gray-300 text-sm">View car interiors in 3D before booking</p>
              
              <div className="mt-4 text-xs text-blue-400 font-semibold">
                📱 Point camera to see virtual tour
              </div>
            </div>
          </div>

          {/* Live Tracking Card */}
          <div className="group relative p-6 rounded-2xl border-2 border-green-500/30 hover:border-green-400 bg-gradient-to-br from-green-500/10 to-emerald-600/10 transition-all duration-500 cursor-pointer transform hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-green-600 group-hover:bg-green-500 rounded-xl flex items-center justify-center mb-4 transition-all">
                <MapPin className="w-6 h-6 text-white group-hover:animate-bounce" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">Live Tracking</h3>
              <p className="text-gray-300 text-sm">Real-time driver location and ETA updates</p>
              
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">2 min away</span>
              </div>
            </div>
          </div>

          {/* AI Assistant Card */}
          <div className="group relative p-6 rounded-2xl border-2 border-yellow-500/30 hover:border-yellow-400 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 transition-all duration-500 cursor-pointer transform hover:scale-105">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-yellow-600 group-hover:bg-yellow-500 rounded-xl flex items-center justify-center mb-4 transition-all">
                <Sparkles className="w-6 h-6 text-white group-hover:animate-pulse" />
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">AI Assistant</h3>
              <p className="text-gray-300 text-sm">Smart recommendations and instant help</p>
              
              <div className="mt-4 text-xs text-yellow-400 font-semibold animate-pulse">
                🤖 Ready to assist
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Quote Calculator */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              🎯 Interactive Quote Calculator
            </h2>
            <p className="text-gray-300">Get instant pricing with real-time adjustments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <label className="block text-white font-semibold">From</label>
              <input
                type="text"
                placeholder="Enter pickup location..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-white font-semibold">To</label>
              <input
                type="text"
                placeholder="Enter destination..."
                className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
              />
            </div>
            
            <div className="space-y-4">
              <label className="block text-white font-semibold">Service Level</label>
              <select className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all">
                <option>GQ Standard</option>
                <option>GQ Premium</option>
                <option>GQ Executive</option>
                <option>GQ XL</option>
              </select>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-4 px-8 rounded-xl">
              <Zap className="w-5 h-5" />
              <span>Estimated: £24.50</span>
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                50% OFF
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons with Enhanced Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href="tel:07407655203"
            className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <Phone className="w-6 h-6 group-hover:animate-bounce" />
              <span className="text-xl">Call Now</span>
              <span className="text-2xl">📞</span>
            </div>
          </a>

          <a
            href="https://wa.me/447407655203"
            className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <MessageCircle className="w-6 h-6 group-hover:animate-spin" />
              <span className="text-xl">WhatsApp</span>
              <span className="text-2xl">💬</span>
            </div>
          </a>

          <a
            href="/book"
            className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold py-6 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex items-center justify-center space-x-3">
              <Calendar className="w-6 h-6 group-hover:animate-pulse" />
              <span className="text-xl">Book Online</span>
              <span className="text-2xl">🚗</span>
            </div>
          </a>
        </div>

      </div>
    </div>
  )
}