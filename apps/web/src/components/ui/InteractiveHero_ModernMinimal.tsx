"use client"

import React from 'react'
import { ArrowRight, Shield, Clock } from 'lucide-react'

interface InteractiveHeroProps {
  children: React.ReactNode
}

export function InteractiveHero({ children }: InteractiveHeroProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-gray-900 overflow-hidden">
      
      {/* Minimal Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Floating Accent Line */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-64 bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Minimal Status Badge */}
          <div className="inline-flex items-center text-xs text-green-400 mb-8">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            LIVE • 23 Security Drivers Available
          </div>

          {/* Large, Clean Typography */}
          <h1 className="text-6xl md:text-8xl font-light text-white mb-6 tracking-tight">
            GQ<span className="font-bold text-yellow-400">.</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-300 font-light mb-12 max-w-2xl">
            Professional security transport.
            <br />
            <span className="text-yellow-400">SIA Licensed drivers.</span>
            <br />
            Available 24/7.
          </h2>

          {/* Minimal CTA */}
          <div className="flex items-center gap-8 mb-16">
            <button className="group bg-white text-black px-8 py-4 rounded-none font-medium hover:bg-yellow-400 transition-all duration-300 flex items-center">
              Book Now
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="text-gray-400 text-sm">
              or call <span className="text-white hover:text-yellow-400 cursor-pointer transition-colors">07407 655 203</span>
            </div>
          </div>

          {/* Clean Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md text-center">
            <div>
              <div className="text-2xl font-light text-white mb-1">4.9</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white mb-1">500+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Clients</div>
            </div>
            <div>
              <div className="text-2xl font-light text-white mb-1">24/7</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Available</div>
            </div>
          </div>

        </div>

        {/* Children Content */}
        <div className="mt-16">
          {children}
        </div>

      </div>

      {/* Subtle Corner Accent */}
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-yellow-400/20"></div>
    </div>
  )
}