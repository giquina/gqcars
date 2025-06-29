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
    <div className="fixed bottom-6 right-6 z-40 max-w-xs">
      <div className="bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl">
        {/* Minimal Header */}
        <div className="p-3 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-medium text-sm">Quick Actions</span>
            </div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Compact CTAs */}
        <div className="p-2 space-y-1">
          {smartCTAs.slice(0, 3).map((cta) => (
            <button
              key={cta.id}
              onClick={() => handleCTAClick(cta)}
              className={`
                w-full p-2.5 rounded-lg transition-all duration-200 
                ${getVariantStyles(cta.variant)}
                hover:bg-white/10 group relative overflow-hidden
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-white/10 rounded">
                    {cta.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm text-white">{cta.text}</div>
                  </div>
                </div>
                
                {cta.discount && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {cta.discount}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}