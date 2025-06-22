"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Zap, Eye, Globe, Mic, Camera, Clock, MapPin, Shield, Star, Phone, Calendar, MessageCircle } from 'lucide-react'
import LiveNotifications from './LiveNotifications'

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
    <div ref={heroRef} className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      
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

        {/* Main Content Grid: Notifications & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Live Notifications */}
          <div className="w-full">
            <LiveNotifications />
          </div>

          {/* Right Column: Feature Cards & CTAs */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* AR Preview Card */}
              <div className="group relative p-4 rounded-2xl border border-blue-500/30 hover:border-blue-400 bg-blue-500/10 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-600">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">AR Preview</h3>
                    <p className="text-gray-300 text-xs">See interiors</p>
                  </div>
                </div>
              </div>

              {/* AI Assistant Card */}
              <div className="group relative p-4 rounded-2xl border border-yellow-500/30 hover:border-yellow-400 bg-yellow-500/10 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-yellow-600">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">AI Assistant</h3>
                    <p className="text-yellow-400 text-xs animate-pulse">Ready to help</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:07407655203"
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg">Call Now</span>
              </a>

              <a
                href="/book"
                className="flex-1 group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/25 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-lg">Book Online</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}