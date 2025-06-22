"use client"

import React, { useState } from 'react'
import { Plus, Phone, MessageCircle, Calendar, MapPin, X, Sparkles } from 'lucide-react'

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Now',
      href: 'tel:07407655203',
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-400 hover:to-emerald-500'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'WhatsApp',
      href: 'https://wa.me/447407655203',
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:from-blue-400 hover:to-cyan-500'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Book Ride',
      href: '/book',
      color: 'from-purple-500 to-pink-600',
      hoverColor: 'hover:from-purple-400 hover:to-pink-500'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Track Driver',
      href: '/track',
      color: 'from-orange-500 to-red-600',
      hoverColor: 'hover:from-orange-400 hover:to-red-500'
    }
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Action Buttons */}
      <div className={`transition-all duration-300 space-y-3 mb-4 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <div
            key={index}
            className="transform transition-all duration-300"
            style={{
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
            }}
          >
            <a
              href={action.href}
              className={`group flex items-center space-x-3 bg-gradient-to-r ${action.color} ${action.hoverColor} text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 min-w-max`}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                {action.icon}
              </div>
              <span className="text-sm">{action.label}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-300" />
          ) : (
            <Plus className="w-6 h-6 transition-transform duration-300" />
          )}
        </div>

        {/* Sparkle effect */}
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="w-4 h-4 text-white/60 absolute top-1 right-1 animate-pulse" />
          <Sparkles className="w-3 h-3 text-white/40 absolute bottom-1 left-1 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-yellow-500/50 to-orange-600/50 rounded-full animate-ping" />
      )}
    </div>
  )
}