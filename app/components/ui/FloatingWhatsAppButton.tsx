"use client"

import React, { useState, useEffect } from 'react'
import { MessageCircle, Phone, X } from 'lucide-react'
import WhatsAppConfig from './WhatsAppConfig'

interface FloatingWhatsAppButtonProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  message?: string
  showNotification?: boolean
  notificationCount?: number
  showTooltip?: boolean
  theme?: 'green' | 'blue' | 'purple'
}

export default function FloatingWhatsAppButton({
  position = 'bottom-left',
  message = WhatsAppConfig.defaultMessage,
  showNotification = false,
  notificationCount = 0,
  showTooltip = true,
  theme = 'green'
}: FloatingWhatsAppButtonProps) {
  const [showActions, setShowActions] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show button after a delay
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6'
      case 'bottom-left':
        return 'bottom-6 left-6'
      case 'top-right':
        return 'top-6 right-6'
      case 'top-left':
        return 'top-6 left-6'
      default:
        return 'bottom-6 left-6'
    }
  }

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WhatsAppConfig.phoneNumber}?text=${encodedMessage}`, '_blank')
  }

  const handleCallClick = () => {
    window.location.href = `tel:${WhatsAppConfig.phoneNumber}`
  }

  const currentTheme = WhatsAppConfig.themes[theme]

  if (!isVisible) return null

  return (
    <div className={`fixed ${getPositionClasses()} z-50 flex flex-col items-center space-y-3`}>
      {/* Action Buttons */}
      {showActions && (
        <div className="flex flex-col space-y-2 animate-in fade-in slide-in-from-bottom-2">
          {/* Call Button */}
          <button
            onClick={handleCallClick}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          >
            <Phone className="w-5 h-5" />
            {showTooltip && (
              <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Call {WhatsAppConfig.businessName}
              </div>
            )}
          </button>

          {/* Close Button */}
          <button
            onClick={() => setShowActions(false)}
            className="w-8 h-8 bg-gray-600 hover:bg-gray-500 text-white rounded-full flex items-center justify-center transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <div className="relative">
        <button
          onClick={showActions ? handleWhatsAppClick : () => setShowActions(true)}
          className={`w-16 h-16 bg-gradient-to-r ${currentTheme.primary} hover:${currentTheme.secondary} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group relative overflow-hidden`}
        >
          {/* Pulse Animation */}
          <div className="absolute inset-0 w-16 h-16 bg-green-500/50 rounded-full animate-ping" />
          
          {/* Icon */}
          <div className="relative z-10">
            <MessageCircle className="w-7 h-7" />
          </div>

          {/* Notification Badge */}
          {showNotification && notificationCount > 0 && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {notificationCount > 9 ? '9+' : notificationCount}
            </div>
          )}

          {/* Tooltip */}
          {showTooltip && !showActions && (
            <div className="absolute right-full mr-4 px-3 py-2 bg-black text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="flex flex-col">
                <span className="font-semibold">Chat with {WhatsAppConfig.businessName}</span>
                <span className="text-xs opacity-75">Usually responds in 5 minutes</span>
              </div>
              {/* Arrow */}
              <div className="absolute top-1/2 left-full w-0 h-0 border-l-4 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent transform -translate-y-1/2" />
            </div>
          )}
        </button>

        {/* Service Badge */}
        <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold animate-bounce">
          24/7
        </div>
      </div>

      {/* Popular Services Tooltip */}
      {showTooltip && showActions && (
        <div className="absolute right-full mr-4 top-0 bg-white text-gray-800 p-4 rounded-lg shadow-xl border w-64">
          <h3 className="font-bold text-lg mb-2">Our Services</h3>
          <div className="space-y-2">
            {WhatsAppConfig.services.slice(0, 2).map((service) => (
              <div key={service.id} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-sm">{service.name}</div>
                  <div className="text-xs text-gray-600">{service.description}</div>
                </div>
                <div className="text-green-600 font-bold text-xs">{service.price}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t text-xs text-gray-500">
            Click to start chatting with our team
          </div>
        </div>
      )}
    </div>
  )
}