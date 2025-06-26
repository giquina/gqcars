"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Star, 
  Phone, 
  Clock, 
  Car, 
  Shield, 
  TrendingUp,
  Users,
  Award,
  Zap,
  MessageCircle,
  Eye,
  Navigation
} from 'lucide-react'

interface Activity {
  id: string
  type: 'booking' | 'driver' | 'review' | 'milestone' | 'emergency' | 'promo'
  title: string
  subtitle?: string
  time: string
  icon: React.ReactNode
  color: string
  priority: 'low' | 'medium' | 'high'
  cta: {
    text: string
    action: () => void
    variant: 'primary' | 'secondary' | 'accent' | 'urgent'
  }
}

const SAMPLE_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'booking',
    title: 'Sarah just booked GQ Executive to Heathrow',
    subtitle: '2 passengers • £65 estimated',
    time: '2m ago',
    icon: <Calendar className="w-4 h-4" />,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    priority: 'medium',
    cta: {
      text: 'Book Similar',
      action: () => window.location.href = 'tel:07407655203',
      variant: 'primary'
    }
  },
  {
    id: '2',
    type: 'driver',
    title: 'Elite driver Michael is now online',
    subtitle: 'Available in your area • 4.9★ rated',
    time: '5m ago',
    icon: <Car className="w-4 h-4" />,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    priority: 'medium',
    cta: {
      text: 'Call Driver',
      action: () => window.location.href = 'tel:07407655203',
      variant: 'secondary'
    }
  },
  {
    id: '3',
    type: 'review',
    title: '⭐⭐⭐⭐⭐ "Exceptional service and professionalism!"',
    subtitle: 'James R. completed Airport Transfer',
    time: '8m ago',
    icon: <Star className="w-4 h-4" />,
    color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    priority: 'low',
    cta: {
      text: 'Read Reviews',
      action: () => console.log('Show reviews'),
      variant: 'secondary'
    }
  },
  {
    id: '4',
    type: 'milestone',
    title: '🎉 1000+ rides completed this month!',
    subtitle: '99.8% customer satisfaction rate',
    time: '12m ago',
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    priority: 'low',
    cta: {
      text: 'Join Us',
      action: () => window.location.href = '/book',
      variant: 'accent'
    }
  },
  {
    id: '5',
    type: 'emergency',
    title: '🚨 Emergency response vehicle available',
    subtitle: '24/7 SIA security support active',
    time: '15m ago',
    icon: <Shield className="w-4 h-4" />,
    color: 'from-red-500/20 to-pink-500/20 border-red-500/30',
    priority: 'high',
    cta: {
      text: 'Emergency Call',
      action: () => window.location.href = 'tel:07407655203',
      variant: 'urgent'
    }
  },
  {
    id: '6',
    type: 'promo',
    title: '🔥 50% OFF first ride still available!',
    subtitle: 'Limited time new customer offer',
    time: '18m ago',
    icon: <Zap className="w-4 h-4" />,
    color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
    priority: 'high',
    cta: {
      text: 'Claim Offer',
      action: () => window.location.href = 'tel:07407655203',
      variant: 'urgent'
    }
  },
  {
    id: '7',
    type: 'booking',
    title: 'David booked Premium service to City',
    subtitle: '1 passenger • Executive protection',
    time: '22m ago',
    icon: <Calendar className="w-4 h-4" />,
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    priority: 'medium',
    cta: {
      text: 'Book VIP',
      action: () => window.location.href = '/services/executive',
      variant: 'accent'
    }
  },
  {
    id: '8',
    type: 'driver',
    title: 'Sophie M. completed airport pickup',
    subtitle: 'Customer rated 5 stars • On time arrival',
    time: '25m ago',
    icon: <Award className="w-4 h-4" />,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    priority: 'low',
    cta: {
      text: 'Book Sophie',
      action: () => window.location.href = 'tel:07407655203',
      variant: 'primary'
    }
  }
]

export default function LiveActivityDashboard() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [liveStats, setLiveStats] = useState({
    driversOnline: 12,
    averageRating: 4.9,
    responseTime: '2-8 min',
    activeBookings: 8
  })

  // Initialize with sample activities
  useEffect(() => {
    setActivities(SAMPLE_ACTIVITIES)
  }, [])

  // Update live stats
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        driversOnline: Math.max(8, Math.min(25, prev.driversOnline + Math.floor(Math.random() * 3) - 1)),
        activeBookings: Math.max(0, Math.min(15, prev.activeBookings + Math.floor(Math.random() * 3) - 1))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Add new activities periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const names = ['Alex', 'Emma', 'David', 'Sophie', 'Michael', 'Sarah', 'James', 'Rachel']
      const services = ['Standard', 'Premium', 'Executive', 'VIP']
      const destinations = ['Heathrow', 'Gatwick', 'City', 'Canary Wharf', 'Westminster', 'Mayfair']
      
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: 'booking',
        title: `${names[Math.floor(Math.random() * names.length)]} booked ${services[Math.floor(Math.random() * services.length)]} to ${destinations[Math.floor(Math.random() * destinations.length)]}`,
        subtitle: `${Math.floor(Math.random() * 4) + 1} passenger${Math.floor(Math.random() * 4) + 1 > 1 ? 's' : ''} • £${Math.floor(Math.random() * 80) + 35} estimated`,
        time: 'now',
        icon: <Calendar className="w-4 h-4" />,
        color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
        priority: 'medium',
        cta: {
          text: 'Book Like Others',
          action: () => window.location.href = 'tel:07407655203',
          variant: 'primary'
        }
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]) // Keep max 20 activities
    }, 8000) // New activity every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-500 text-white'
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-500 text-white'
      case 'accent':
        return 'bg-yellow-500 hover:bg-yellow-400 text-black'
      case 'urgent':
        return 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
      default:
        return 'bg-blue-600 hover:bg-blue-500 text-white'
    }
  }

  const getActivityGlow = (priority: Activity['priority']) => {
    switch(priority) {
      case 'high': return 'shadow-[0_0_20px_-5px_theme(colors.red.600/0.5)]'
      case 'medium': return 'shadow-[0_0_15px_-5px_theme(colors.blue.600/0.3)]'
      default: return 'shadow-[0_0_10px_-5px_theme(colors.gray.600/0.2)]'
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      <div className="bg-gradient-to-tr from-black/70 via-gray-900/60 to-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header with Live Stats */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
              </span>
              <h3 className="font-bold text-white text-sm">Live Activity</h3>
            </div>
            <div className="text-xs text-green-400 font-bold">
              {activities.length} activities
            </div>
          </div>
          
          {/* Dynamic Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-black/30 p-2 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Users className="w-3 h-3 text-blue-400" />
                <span className="text-blue-400 font-bold text-sm">{liveStats.driversOnline}</span>
              </div>
              <div className="text-gray-300 text-xs">Online</div>
            </div>
            
            <div className="bg-black/30 p-2 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-yellow-400 font-bold text-sm">{liveStats.averageRating}</span>
              </div>
              <div className="text-gray-300 text-xs">Rating</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 p-2 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-3 h-3 text-purple-400" />
                <span className="text-purple-400 font-bold text-xs">{liveStats.responseTime}</span>
              </div>
              <div className="text-gray-300 text-xs">Response</div>
            </div>
            
            <div className="bg-black/30 p-2 rounded-lg text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Navigation className="w-3 h-3 text-green-400" />
                <span className="text-green-400 font-bold text-sm">{liveStats.activeBookings}</span>
              </div>
              <div className="text-gray-300 text-xs">Active</div>
            </div>
          </div>
        </div>

        {/* Activities Feed */}
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  p-4 border-b border-white/5 last:border-b-0
                  hover:bg-white/5 transition-all duration-300 cursor-pointer
                  ${getActivityGlow(activity.priority)}
                  bg-gradient-to-r ${activity.color}
                `}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div className="p-2 bg-white/10 rounded-lg mt-0.5 flex-shrink-0">
                    {activity.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm leading-tight mb-1">
                      {activity.title}
                    </p>
                    {activity.subtitle && (
                      <p className="text-white/70 text-xs mb-2">
                        {activity.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-white/50 text-xs">{activity.time}</p>
                      
                      {/* Smart CTA Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          activity.cta.action()
                        }}
                        className={`
                          px-3 py-1 rounded-lg text-xs font-medium transition-all transform hover:scale-105
                          ${getVariantStyles(activity.cta.variant)}
                        `}
                      >
                        {activity.cta.text}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Emergency/High Priority Indicator */}
                {activity.priority === 'high' && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-white/5">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span>Updates every 8s</span>
            <div className="flex items-center space-x-2">
              <Eye className="w-3 h-3" />
              <span>Live tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}