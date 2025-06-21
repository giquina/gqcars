'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Calendar, MapPin, Shield, Clock, Star, CheckCircle, ArrowRight, Zap } from 'lucide-react'

export default function DynamicHeroSection() {
  const [currentHighlight, setCurrentHighlight] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    clients: 0,
    response: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  const highlights = [
    "SIA Licensed Drivers • 100% Vetted",
    "24/7 Emergency Response • London Coverage", 
    "VIP & Corporate Security • Discreet Service",
    "Live GPS Tracking • Real-time Updates"
  ]

  const stats = [
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Satisfied Clients", value: 500, suffix: "+" },
    { label: "Avg Response Time", value: 5, suffix: " min" }
  ]

  // Animated stats counter
  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentHighlight(prev => (prev + 1) % highlights.length)
    }, 3000)

    // Animate stats
    const statsInterval = setInterval(() => {
      setAnimatedStats(prev => ({
        experience: prev.experience < 10 ? prev.experience + 1 : 10,
        clients: prev.clients < 500 ? prev.clients + 25 : 500,
        response: prev.response < 5 ? prev.response + 1 : 5
      }))
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(statsInterval)
    }
  }, [])

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Dynamic Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 hidden md:block"
      >
        <source src="/videos/security-hero.mp4" type="video/mp4" />
      </video>
      
      {/* Mobile Background */}
      <div className="absolute inset-0 md:hidden">
        <Image 
          src="/images/hero.jpg" 
          alt="GQ Cars Security Team" 
          fill 
          className="object-cover opacity-30" 
          priority
        />
      </div>

      {/* Multi-layer Animated Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-slate-900/80 to-amber-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      
      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-20 text-center">
        {/* Brand Header with Logo */}
        <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                GQ CARS LTD
              </h1>
              <p className="text-amber-400 font-semibold text-sm md:text-base">
                Premier Secure Transport • VIP • Events • Close Protection
              </p>
            </div>
          </div>
          
          {/* Credentials Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 px-4 py-2 rounded-full">
              <span className="text-amber-400 font-semibold text-sm">✓ SIA Licensed Drivers</span>
            </div>
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-full">
              <span className="text-blue-400 font-semibold text-sm">✓ VIP Transport</span>
            </div>
            <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30 px-4 py-2 rounded-full pulse-animation">
              <span className="text-green-400 font-semibold text-sm">🔥 50% OFF First Ride</span>
            </div>
          </div>
        </div>

        {/* Main Headline */}
        <div className={`mb-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-amber-200 to-blue-200 bg-clip-text text-transparent">
              Your Personal Security Driver
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-gray-200 font-medium mb-6">
            Discreet Close Protection & VIP Transport
          </p>
          
          {/* Rotating Highlights */}
          <div className="h-8 mb-6">
            <p className="text-lg text-amber-300 font-semibold animate-pulse">
              {highlights[currentHighlight]}
            </p>
          </div>
        </div>

        {/* Value Proposition */}
        <div className={`mb-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
            Your trusted partner for <span className="text-amber-400 font-semibold">SIA-licensed secure transport</span> in London. 
            <br className="hidden md:block" />
            Arrive safely, on time, every time.
          </p>
        </div>

        {/* Action Buttons */}
        <div className={`mb-12 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/book"
              className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Book Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a 
              href="tel:+447407655203"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <Phone className="w-6 h-6" />
              Call Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <Link 
              href="/quote"
              className="group bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-slate-500/25 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 border border-slate-600"
            >
              <MapPin className="w-6 h-6" />
              Get App
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Live Stats */}
        <div className={`mb-8 transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-amber-400 mb-2">
                {animatedStats.experience}+
              </div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {animatedStats.clients}+
              </div>
              <div className="text-gray-300">Satisfied Clients</div>
            </div>
            
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {animatedStats.response} min
              </div>
              <div className="text-gray-300">Avg Response Time</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>24/7 Emergency Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>Fully Insured & Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400" />
              <span>5-Star Rated Service</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 px-6 py-3 rounded-full animate-pulse">
              <span className="text-red-400 font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                LIVE: 3 Drivers Available Near You
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}