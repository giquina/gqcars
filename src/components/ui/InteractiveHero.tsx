"use client"

import React, { useState, useEffect } from 'react'
import { Zap, Shield, Car, Phone, ArrowRight, Star, Sparkles, Target } from 'lucide-react'

interface InteractiveHeroProps {
  children: React.ReactNode
}

export function InteractiveHero({ children }: InteractiveHeroProps) {

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

        {/* Dynamic Subtitle */}
        <p className="text-xl md:text-3xl text-white mb-12 font-bold text-center max-w-4xl mx-auto">
          ⚡ INSTANT BOOKINGS • 🛡️ SIA LICENSED • 🚗 LUXURY VEHICLES
        </p>

        {/* Action-Packed CTAs */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black py-6 px-10 rounded-xl transition-all duration-300 transform hover:scale-110 shadow-2xl">
            <span className="flex items-center justify-center text-lg">
              <Car className="w-6 h-6 mr-3" />
              BOOK NOW - GET 50% OFF
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
          
          <button className="group bg-black/50 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold py-6 px-10 rounded-xl transition-all duration-300 backdrop-blur-lg">
            <span className="flex items-center justify-center text-lg">
              <Phone className="w-6 h-6 mr-3" />
              CALL: 07407 655 203
            </span>
          </button>
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
        <div className="mt-16">
          {children}
        </div>

      </div>

      {/* Animated bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-yellow-500/20 via-transparent to-transparent animate-pulse"></div>
    </div>
  )
}