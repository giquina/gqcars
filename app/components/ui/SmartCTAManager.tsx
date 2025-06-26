"use client"

import { useState, useEffect } from 'react'
import { 
  Phone, MessageCircle, Calendar, MapPin, Star, Clock, 
  Car, Shield, Zap, TrendingUp, Users, Award, 
  ArrowRight, CheckCircle, AlertCircle, Sparkles,
  Target, Navigation, Flame, Gift
} from 'lucide-react'

interface SmartCTA {
  id: string
  text: string
  action: string
  icon: React.ReactNode
  priority: number
  context: string[]
  variant: 'primary' | 'secondary' | 'accent' | 'urgent'
  urgency?: boolean
  personalizedText?: string
  discount?: string
  estimatedTime?: string
}

interface UserContext {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  isWeekend: boolean
  location?: string
  previousVisits: number
  hasCalledBefore: boolean
  lastActivity: string
  deviceType: 'mobile' | 'desktop'
  isEmergency?: boolean
}

export default function SmartCTAManager() {
  const [userContext, setUserContext] = useState<UserContext>({
    timeOfDay: 'morning',
    isWeekend: false,
    previousVisits: 0,
    hasCalledBefore: false,
    lastActivity: 'page_view',
    deviceType: 'mobile'
  })

  const [availableCTAs] = useState<SmartCTA[]>([
    {
      id: 'call-emergency',
      text: 'Emergency Call',
      action: 'tel:07407655203',
      icon: <Phone className="w-4 h-4" />,
      priority: 10,
      context: ['emergency', 'urgent', 'night'],
      variant: 'urgent',
      urgency: true,
      personalizedText: 'SIA Security Emergency Line',
      estimatedTime: 'Instant'
    },
    {
      id: 'call-now',
      text: 'Call Now',
      action: 'tel:07407655203',
      icon: <Phone className="w-4 h-4" />,
      priority: 9,
      context: ['default', 'mobile', 'urgent'],
      variant: 'primary',
      personalizedText: 'Speak to Expert Driver',
      estimatedTime: '30 seconds'
    },
    {
      id: 'whatsapp-smart',
      text: 'Smart WhatsApp',
      action: 'whatsapp',
      icon: <MessageCircle className="w-4 h-4" />,
      priority: 8,
      context: ['mobile', 'young', 'casual'],
      variant: 'secondary',
      personalizedText: 'Chat with AI Assistant',
      estimatedTime: '1 minute'
    },
    {
      id: 'book-vip-weekend',
      text: 'Weekend VIP',
      action: '/services/vip',
      icon: <Star className="w-4 h-4" />,
      priority: 7,
      context: ['weekend', 'evening', 'premium'],
      variant: 'accent',
      personalizedText: 'Perfect for Weekend Events',
      discount: '50% OFF',
      estimatedTime: '2 minutes'
    },
    {
      id: 'schedule-morning',
      text: 'Schedule Today',
      action: '/schedule',
      icon: <Calendar className="w-4 h-4" />,
      priority: 6,
      context: ['morning', 'business', 'planning'],
      variant: 'primary',
      personalizedText: 'Plan Your Professional Travel',
      estimatedTime: '3 minutes'
    },
    {
      id: 'quote-location',
      text: 'Location Quote',
      action: '/quote',
      icon: <MapPin className="w-4 h-4" />,
      priority: 5,
      context: ['location', 'first_time', 'price_conscious'],
      variant: 'secondary',
      personalizedText: 'Get Your Area Quote',
      estimatedTime: '1 minute'
    },
    {
      id: 'airport-express',
      text: 'Airport Express',
      action: '/services/airport',
      icon: <Zap className="w-4 h-4" />,
      priority: 4,
      context: ['airport', 'travel', 'urgent'],
      variant: 'accent',
      personalizedText: 'Fast Airport Transfer',
      estimatedTime: '2 minutes'
    },
    {
      id: 'first-ride-offer',
      text: 'Claim 50% OFF',
      action: '/book?offer=FIRST50',
      icon: <Gift className="w-4 h-4" />,
      priority: 3,
      context: ['first_time', 'discount'],
      variant: 'urgent',
      urgency: true,
      personalizedText: 'New Customer Special',
      discount: '50% OFF'
    }
  ])

  const [smartCTAs, setSmartCTAs] = useState<SmartCTA[]>([])

  // Detect user context
  useEffect(() => {
    const detectContext = () => {
      const hour = new Date().getHours()
      const isWeekend = [0, 6].includes(new Date().getDay())
      const isMobile = window.innerWidth < 768
      
      let timeOfDay: UserContext['timeOfDay'] = 'morning'
      if (hour >= 12 && hour < 17) timeOfDay = 'afternoon'
      else if (hour >= 17 && hour < 22) timeOfDay = 'evening'
      else if (hour >= 22 || hour < 6) timeOfDay = 'night'

      const previousVisits = parseInt(localStorage.getItem('gq_visits') || '0')
      const hasCalledBefore = localStorage.getItem('gq_called') === 'true'
      
      setUserContext({
        timeOfDay,
        isWeekend,
        previousVisits,
        hasCalledBefore,
        lastActivity: 'page_view',
        deviceType: isMobile ? 'mobile' : 'desktop'
      })

      // Increment visit count
      localStorage.setItem('gq_visits', (previousVisits + 1).toString())
    }

    detectContext()
  }, [])

  // Generate smart CTAs based on context
  useEffect(() => {
    const generateSmartCTAs = () => {
      const contextualCTAs = availableCTAs.filter(cta => {
        const { timeOfDay, isWeekend, previousVisits, deviceType } = userContext
        
        // Check if CTA matches current context
        const matchesTime = cta.context.includes(timeOfDay)
        const matchesWeekend = !isWeekend || cta.context.includes('weekend')
        const matchesDevice = cta.context.includes(deviceType)
        const matchesNewUser = previousVisits === 0 ? cta.context.includes('first_time') : true
        const isDefault = cta.context.includes('default')
        
        return matchesTime || matchesWeekend || matchesDevice || matchesNewUser || isDefault
      })

      // Sort by priority and context relevance
      const sortedCTAs = contextualCTAs.sort((a, b) => {
        let scoreA = a.priority
        let scoreB = b.priority
        
        // Boost score for relevant context
        if (a.context.includes(userContext.timeOfDay)) scoreA += 2
        if (b.context.includes(userContext.timeOfDay)) scoreB += 2
        
        if (a.context.includes(userContext.deviceType)) scoreA += 1
        if (b.context.includes(userContext.deviceType)) scoreB += 1
        
        return scoreB - scoreA
      })

      setSmartCTAs(sortedCTAs.slice(0, 4)) // Show top 4 most relevant CTAs
    }

    generateSmartCTAs()
  }, [userContext, availableCTAs])

  const handleCTAClick = (cta: SmartCTA) => {
    // Track the action
    if (cta.action.startsWith('tel:')) {
      localStorage.setItem('gq_called', 'true')
      window.location.href = cta.action
    } else if (cta.action === 'whatsapp') {
      const message = getPersonalizedWhatsAppMessage()
      window.open(`https://wa.me/447407655203?text=${encodeURIComponent(message)}`, '_blank')
    } else {
      window.location.href = cta.action
    }
  }

  const getPersonalizedWhatsAppMessage = () => {
    const { timeOfDay, isWeekend, previousVisits } = userContext
    
    if (previousVisits === 0) {
      return "Hello GQ Cars! I'm interested in your security taxi services. I'm a new customer and would like to know more about your 50% OFF offer."
    }
    
    if (timeOfDay === 'night') {
      return "Hello GQ Cars! I need a secure taxi for tonight. Can you help me with availability?"
    }
    
    if (isWeekend) {
      return "Hello GQ Cars! I'm looking for weekend security transport. What are your VIP options?"
    }
    
    return "Hello GQ Cars! I saw your live activity and I'm interested in booking your security taxi services."
  }

  const getVariantStyles = (variant: SmartCTA['variant']) => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
      case 'secondary':
        return 'bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-500 hover:to-gray-400 text-white'
      case 'accent':
        return 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black'
      case 'urgent':
        return 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white animate-pulse'
      default:
        return 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
    }
  }

  const getTimeBasedMessage = () => {
    const { timeOfDay, isWeekend } = userContext
    
    if (timeOfDay === 'night') {
      return "🌙 Night Security Service Available"
    }
    if (isWeekend) {
      return "🎉 Weekend VIP Service Active"
    }
    if (timeOfDay === 'morning') {
      return "☀️ Morning Business Travel Ready"
    }
    return "🚗 Professional Service Available"
  }

  const getUrgencyIndicator = () => {
    const { timeOfDay, previousVisits } = userContext
    
    if (timeOfDay === 'night') {
      return { text: "24/7 Emergency Available", color: "text-red-400" }
    }
    if (previousVisits === 0) {
      return { text: "50% OFF New Customer", color: "text-green-400" }
    }
    return { text: "Instant Response Available", color: "text-blue-400" }
  }

  return (
    <section className="w-full max-w-xs mx-auto my-8">
      <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl">
        {/* Smart Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-white font-semibold text-sm">Smart Actions</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs">Live</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-xs">{getTimeBasedMessage()}</p>
          
          <div className="mt-2">
            <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${getUrgencyIndicator().color}`}>
              <AlertCircle className="w-3 h-3" />
              <span>{getUrgencyIndicator().text}</span>
            </div>
          </div>
        </div>

        {/* Smart CTAs */}
        <div className="p-3 space-y-2">
          {smartCTAs.map((cta) => (
            <button
              key={cta.id}
              onClick={() => handleCTAClick(cta)}
              className={`
                w-full p-3 rounded-xl transition-all duration-200 transform hover:scale-105 
                ${getVariantStyles(cta.variant)}
                ${cta.urgency ? 'ring-2 ring-red-500/50' : ''}
                group relative overflow-hidden
              `}
            >
              {/* Background Animation for Urgent CTAs */}
              {cta.urgency && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent animate-pulse"></div>
              )}
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {cta.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-sm">{cta.text}</div>
                    {cta.personalizedText && (
                      <div className="text-xs opacity-90">{cta.personalizedText}</div>
                    )}
                    {cta.estimatedTime && (
                      <div className="text-xs opacity-75 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{cta.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {cta.discount && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {cta.discount}
                    </div>
                  )}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Context Info */}
        <div className="p-3 border-t border-gray-700/50 bg-gray-800/50">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Target className="w-3 h-3" />
              <span>Personalized for you</span>
            </div>
            <div className="flex items-center space-x-1">
              <Navigation className="w-3 h-3" />
              <span>{userContext.timeOfDay}</span>
            </div>
          </div>
          
          <div className="mt-2 text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-semibold text-xs">AI-Powered Suggestions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}