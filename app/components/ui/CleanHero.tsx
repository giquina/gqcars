"use client"

import React from 'react'

export function CleanHero() {
  return (
    <div className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute w-4 h-4 bg-yellow-400/30 rounded-full top-20 left-1/4 animate-bounce" style={{animationDelay: '0s'}} />
        <div className="absolute w-3 h-3 bg-yellow-400/40 rounded-full top-32 right-1/3 animate-bounce" style={{animationDelay: '1s'}} />
        <div className="absolute w-2 h-2 bg-yellow-400/50 rounded-full bottom-40 left-1/3 animate-bounce" style={{animationDelay: '2s'}} />
        <div className="absolute w-5 h-5 bg-yellow-400/20 rounded-full bottom-32 right-1/4 animate-bounce" style={{animationDelay: '0.5s'}} />
        <div className="absolute w-3 h-3 bg-yellow-400/35 rounded-full top-40 right-1/5 animate-bounce" style={{animationDelay: '1.5s'}} />
        <div className="absolute w-4 h-4 bg-yellow-400/25 rounded-full bottom-24 left-1/5 animate-bounce" style={{animationDelay: '2.5s'}} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
            GQ Cars Security Transport
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-medium">
            Professional SIA Licensed Security Drivers
          </p>
        </div>
      </div>
    </div>
  )
}