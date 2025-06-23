"use client"

import React, { useState, useEffect, useRef } from 'react'
import { Sparkles, Zap, Eye, Globe, Mic, Camera, Clock, MapPin, Shield, Star, Phone, Calendar, MessageCircle } from 'lucide-react'
import LiveNotifications from './LiveNotifications'

export function InteractiveHero({ children }) {
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
        <div className="grid grid-cols-1 gap-8 items-center max-w-2xl mx-auto">
          
          {children}

        </div>
      </div>
    </div>
  )
}