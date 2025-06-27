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
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Enhanced scroll tracking for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Simulate real-time updates with smoother transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBookings(prev => prev + Math.floor(Math.random() * 3))
      setDriversOnline(prev => Math.max(15, prev + Math.floor(Math.random() * 5) - 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced mouse tracking for 3D parallax effects
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

  // Voice booking simulation with enhanced feedback
  const handleVoiceBooking = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  return (
    <div 
      ref={heroRef} 
      className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black"
      style={{
        transform: `translateY(${scrollY * 0.5}px)`, // Parallax scroll effect
      }}
    >
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles with Enhanced Movement */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-blue-400 rounded-full opacity-20 transition-all duration-[3000ms] ${
                isVisible ? 'animate-pulse' : 'opacity-0'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) scale(${0.5 + mousePosition.x * 0.5})`,
                transitionDelay: `${i * 100}ms`
              }}
            />
          ))}
        </div>

        {/* Enhanced 3D Grid Effect with Perspective */}
        <div 
          className={`absolute inset-0 opacity-10 transition-all duration-1000 ${
            isVisible ? 'opacity-10' : 'opacity-0'
          }`}
        >
          <div 
            className="h-full w-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              transform: `perspective(800px) rotateX(20deg) translateZ(${mousePosition.y * 100}px) translateY(${scrollY * 0.3}px)`,
              transition: 'transform 0.3s ease-out'
            }} 
          />
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={`shape-${i}`}
              className={`absolute transition-all duration-[2000ms] ${
                isVisible ? 'opacity-30 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + Math.sin(i) * 30}%`,
                transform: `rotate(${i * 45}deg) translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                transitionDelay: `${i * 200}ms`
              }}
            >
              <div className={`w-${4 + (i % 3)} h-${4 + (i % 3)} border border-blue-400/20 ${
                i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'
              } animate-spin-slow`} />
            </div>
          ))}
        </div>
      </div>

      {/* Live Notifications with Enhanced Animation */}
      <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <LiveNotifications />
      </div>

      {/* Enhanced Status Indicator with Hover Effects */}
      <div className={`fixed top-4 right-4 z-30 bg-black/60 backdrop-blur-sm rounded-full px-4 py-3 border border-green-500/20 transition-all duration-700 hover:bg-black/80 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
      }`}>
        <div className="flex items-center space-x-3 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 font-medium">{driversOnline} online</span>
          <div className="w-1 h-4 bg-green-500/20 rounded-full" />
          <span className="text-blue-400 font-medium">{liveBookings} bookings</span>
        </div>
      </div>

      {/* Main Content with Staggered Animations */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-8 items-center max-w-4xl mx-auto">
          
          {/* Enhanced Content Animation */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            {children}
          </div>

          {/* Enhanced Interactive Elements */}
          <div className={`flex flex-wrap justify-center gap-4 mt-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            
            {/* Voice Booking Button with Enhanced Animation */}
            <button
              onClick={handleVoiceBooking}
              className={`group flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              <Mic className={`w-5 h-5 transition-transform duration-300 ${isListening ? 'animate-bounce' : 'group-hover:scale-110'}`} />
              <span className="font-semibold">
                {isListening ? 'Listening...' : 'Voice Booking'}
              </span>
            </button>

            {/* Live Quote Button with Enhanced Hover */}
            <button
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-full hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 transform"
            >
              <Calendar className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span>Instant Quote</span>
              <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-180" />
            </button>

            {/* Emergency Contact with Pulse Animation */}
            <button
              className="group flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25 animate-pulse"
            >
              <Shield className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span>Emergency</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ambient Lighting Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>
    </div>
  )
}