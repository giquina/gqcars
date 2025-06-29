"use client"

import React from 'react'
import { Shield, Star, Phone, MapPin } from 'lucide-react'

interface InteractiveHeroProps {
  children: React.ReactNode
}

export function InteractiveHero({ children }: InteractiveHeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden">
      
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Subtle Animated Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full animate-pulse"
            style={{
              left: `${20 + (i * 7)}%`,
              top: `${15 + (i * 6)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        
        {/* Premium Badge */}
        <div className="inline-flex items-center bg-yellow-500/10 border border-yellow-500/30 rounded-full px-6 py-2 mb-8">
          <Shield className="w-4 h-4 text-yellow-400 mr-2" />
          <span className="text-yellow-400 font-semibold text-sm tracking-wide">PREMIUM SECURITY TRANSPORT</span>
          <Shield className="w-4 h-4 text-yellow-400 ml-2" />
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
          <span className="block">GQ Cars</span>
          <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Security Transport
          </span>
        </h1>

        {/* Elegant Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          London's most trusted SIA Licensed security drivers providing discrete, 
          professional transport for discerning clients since 2010.
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <button className="group bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
            <span className="flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Book Premium Service
            </span>
          </button>
          <button className="group border-2 border-gray-400 text-gray-300 hover:border-yellow-400 hover:text-yellow-400 font-bold py-4 px-8 rounded-lg transition-all duration-300">
            <span className="flex items-center justify-center">
              <MapPin className="w-5 h-5 mr-2" />
              View Service Areas
            </span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-400">
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm">4.9/5 • 500+ Reviews</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-gray-600"></div>
          <div className="flex items-center text-sm">
            <Shield className="w-4 h-4 text-green-400 mr-2" />
            <span>SIA Licensed • Fully Insured</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-gray-600"></div>
          <div className="text-sm">
            <span className="text-green-400 font-semibold">23</span> drivers online now
          </div>
        </div>

        {/* Children Content */}
        <div className="mt-8">
          {children}
        </div>

      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
    </div>
  )
}