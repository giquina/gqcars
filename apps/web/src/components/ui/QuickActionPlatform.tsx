'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, Car, Clock, Plane, Building2, MapPin, Zap, Star, Shield, Globe, Activity, Users, AlertTriangle } from 'lucide-react'

export default function QuickActionPlatform() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [availableDrivers, setAvailableDrivers] = useState(12)
  const [averageWait, setAverageWait] = useState('3-8 min')
  const [isExpanded, setIsExpanded] = useState(false)

  // Update time every minute and simulate driver availability
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate driver availability changes
      setAvailableDrivers(prev => Math.max(6, Math.min(20, prev + Math.floor(Math.random() * 3) - 1)))
      
      // Update wait times based on time of day
      const hour = new Date().getHours()
      if (hour >= 7 && hour <= 9) {
        setAverageWait('5-12 min') // Rush hour
      } else if (hour >= 17 && hour <= 19) {
        setAverageWait('4-10 min') // Evening rush
      } else if (hour >= 22 || hour <= 5) {
        setAverageWait('2-6 min') // Night time
      } else {
        setAverageWait('3-8 min') // Normal time
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(timer)
  }, [])

  const popularRoutes = [
    { 
      name: 'Heathrow Airport', 
      icon: '✈️', 
      estimatedPrice: '£45-65', 
      time: '35-50 min',
      href: 'tel:07407655203',
      whatsapp: 'https://wa.me/447407655203?text=Hi! I need a ride to Heathrow Airport. Can you give me a quote?'
    },
    { 
      name: 'City of London', 
      icon: '🏢', 
      estimatedPrice: '£25-40', 
      time: '20-35 min',
      href: 'tel:07407655203',
      whatsapp: 'https://wa.me/447407655203?text=Hi! I need a ride to City of London. Can you give me a quote?'
    },
    { 
      name: 'Canary Wharf', 
      icon: '🏦', 
      estimatedPrice: '£30-45', 
      time: '25-40 min',
      href: 'tel:07407655203',
      whatsapp: 'https://wa.me/447407655203?text=Hi! I need a ride to Canary Wharf. Can you give me a quote?'
    },
    { 
      name: 'Gatwick Airport', 
      icon: '✈️', 
      estimatedPrice: '£55-75', 
      time: '45-60 min',
      href: 'tel:07407655203',
      whatsapp: 'https://wa.me/447407655203?text=Hi! I need a ride to Gatwick Airport. Can you give me a quote?'
    }
  ]

  const getStatusColor = () => {
    if (availableDrivers >= 15) return 'text-green-400'
    if (availableDrivers >= 10) return 'text-yellow-400'
    return 'text-orange-400'
  }

  const getStatusText = () => {
    if (availableDrivers >= 15) return 'Excellent Availability'
    if (availableDrivers >= 10) return 'Good Availability'
    return 'Limited Availability'
  }

  return (
    <div className="bg-gradient-to-r from-slate-900/98 via-gray-900/98 to-slate-900/98 backdrop-blur-lg border-t border-yellow-500/30 shadow-2xl">
      <div className="container mx-auto">
        
        {/* Main Action Bar */}
        <div className="flex items-center justify-between p-4">
          
          {/* Left Side - Status & Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-bold text-sm">🚗 LIVE SERVICE</span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3 text-blue-400" />
                <span className={`font-bold ${getStatusColor()}`}>{availableDrivers} drivers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-purple-400" />
                <span className="text-gray-300">{averageWait}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-yellow-400" />
                <span className="text-gray-300">SIA Licensed</span>
              </div>
            </div>
          </div>

          {/* Center - Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isExpanded ? 'Hide' : 'Quick Book'}</span>
          </button>

          {/* Right Side - Emergency Contact */}
          <div className="flex items-center space-x-2">
            <a 
              href="https://wa.me/447407655203?text=Hi! I need immediate transport assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all transform hover:scale-105 flex items-center space-x-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            
            <a 
              href="tel:07407655203"
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all transform hover:scale-105 flex items-center space-x-1"
            >
              <Phone className="w-4 h-4" />
              <span>CALL NOW</span>
            </a>
          </div>
        </div>

        {/* Expanded Quick Booking Section */}
        {isExpanded && (
          <div className="border-t border-gray-700 p-4 animate-slideDown">
            
            {/* Status Header */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full">
                <Activity className="w-4 h-4 text-green-400" />
                <span className={`font-bold ${getStatusColor()}`}>{getStatusText()}</span>
                <span className="text-gray-400 text-xs">• Updated {currentTime.toLocaleTimeString()}</span>
              </div>
            </div>

            {/* Popular Routes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {popularRoutes.map((route, index) => (
                <div key={index} className="bg-black/40 border border-gray-600 rounded-lg p-4 hover:border-yellow-500/50 transition-all group">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{route.icon}</div>
                    <h3 className="text-white font-bold text-sm mb-2">{route.name}</h3>
                    <div className="text-xs text-gray-400 mb-3">
                      <div className="text-green-400 font-bold">{route.estimatedPrice}</div>
                      <div>{route.time}</div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <a
                        href={route.href}
                        className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold transition-all"
                      >
                        📞 Call
                      </a>
                      <a
                        href={route.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-500 text-white px-2 py-1 rounded text-xs font-bold transition-all"
                      >
                        💬 Chat
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <Shield className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <div className="text-xs text-gray-300">SIA Security Licensed</div>
              </div>
              <div className="text-center">
                <Car className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <div className="text-xs text-gray-300">TFL Private Hire</div>
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                <div className="text-xs text-gray-300">24/7 Available</div>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 text-purple-400 mx-auto mb-1" />
                <div className="text-xs text-gray-300">4.9★ Rated</div>
              </div>
            </div>

            {/* Emergency & Special Services */}
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-2 text-red-400 font-bold text-sm mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>🚨 EMERGENCY & SPECIAL SERVICES</span>
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="text-xs text-gray-300 mb-2">
                24/7 Emergency Transport • Hospital Runs • Airport Delays • Last-Minute Bookings
              </div>
              <div className="flex justify-center space-x-3">
                <a 
                  href="tel:07407655203"
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-bold text-xs transition-all"
                >
                  📞 Emergency Line
                </a>
                <a 
                  href="https://wa.me/447407655203?text=🚨 EMERGENCY: I need immediate transport assistance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded font-bold text-xs transition-all"
                >
                  🆘 Emergency WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}