"use client"

import { useState, useEffect } from 'react'
import { 
  MessageCircle, Phone, Calendar, MapPin, Star, Clock, 
  Car, Shield, Zap, TrendingUp, Users, Award, 
  ArrowRight, CheckCircle, AlertCircle, Eye,
  Headphones, BookOpen, Gift, Target, Bell
} from 'lucide-react'

interface LiveActivity {
  id: string
  type: 'booking' | 'driver' | 'review' | 'security' | 'promo' | 'milestone'
  user: string
  location?: string
  service?: string
  rating?: number
  timestamp: Date
  urgent?: boolean
  cta?: {
    text: string
    action: string
    variant: 'primary' | 'secondary' | 'accent'
  }
}

export default function LiveActivityDashboard() {
  const [activities, setActivities] = useState<LiveActivity[]>([
    {
      id: '1',
      type: 'booking',
      user: 'Alex',
      service: 'VIP Event Transport',
      location: 'Soho',
      timestamp: new Date(Date.now() - 30000),
      cta: { text: 'Book VIP', action: 'book-vip', variant: 'primary' }
    },
    {
      id: '2',
      type: 'driver',
      user: 'SIA Driver Omar',
      location: 'Wembley',
      timestamp: new Date(Date.now() - 60000),
      cta: { text: 'Call Omar', action: 'call-driver', variant: 'secondary' }
    },
    {
      id: '3',
      type: 'review',
      user: 'Priya',
      rating: 5,
      service: 'Executive Security',
      timestamp: new Date(Date.now() - 120000),
      cta: { text: 'Read Reviews', action: 'view-reviews', variant: 'accent' }
    },
    {
      id: '4',
      type: 'review',
      user: 'Samantha',
      rating: 5,
      service: 'Close Protection',
      timestamp: new Date(Date.now() - 180000),
      cta: { text: 'Get Quote', action: 'quote-protection', variant: 'primary' }
    },
    {
      id: '5',
      type: 'promo',
      user: 'FLASH OFFER',
      service: '50% OFF First Ride',
      timestamp: new Date(Date.now() - 240000),
      urgent: true,
      cta: { text: 'Claim Now', action: 'claim-offer', variant: 'accent' }
    },
    {
      id: '6',
      type: 'milestone',
      user: 'GQ Cars',
      service: '1000+ Safe Rides This Month',
      timestamp: new Date(Date.now() - 300000),
      cta: { text: 'Join Us', action: 'book-now', variant: 'primary' }
    }
  ])

  const [stats, setStats] = useState({
    activeDrivers: 12,
    ridesCompleted: 1247,
    avgRating: 4.9,
    responseTime: '2-5 min'
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new random activity
      const newActivities = [
        {
          id: Date.now().toString(),
          type: 'booking' as const,
          user: ['Mike', 'Sarah', 'James', 'Emma'][Math.floor(Math.random() * 4)],
          service: ['Airport Transfer', 'Corporate Event', 'Wedding Transport', 'VIP Service'][Math.floor(Math.random() * 4)],
          location: ['City Center', 'Heathrow', 'Canary Wharf', 'Westminster'][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          cta: { text: 'Book Similar', action: 'book-similar', variant: 'primary' as const }
        }
      ]
      
      setActivities(prev => [...newActivities, ...prev.slice(0, 5)])
      
      // Update stats slightly
      setStats(prev => ({
        ...prev,
        ridesCompleted: prev.ridesCompleted + Math.floor(Math.random() * 3),
        activeDrivers: Math.max(8, Math.min(20, prev.activeDrivers + (Math.random() > 0.5 ? 1 : -1)))
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const handleAction = (action: string) => {
    switch (action) {
      case 'call-now':
        window.location.href = 'tel:07407655203'
        break
      case 'whatsapp':
        window.open('https://wa.me/447407655203?text=Hello%20GQ%20Cars!%20I%20saw%20your%20live%20activity%20and%20want%20to%20book.', '_blank')
        break
      case 'book-vip':
        window.location.href = '/services/vip'
        break
      case 'book-now':
        window.location.href = '/book'
        break
      case 'claim-offer':
        window.location.href = '/book?offer=FIRST50'
        break
      case 'get-quote':
        window.location.href = '/quote'
        break
      case 'view-reviews':
        window.location.href = '/#testimonials'
        break
      default:
        window.location.href = '/book'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4 text-blue-500" />
      case 'driver': return <Car className="w-4 h-4 text-green-500" />
      case 'review': return <Star className="w-4 h-4 text-yellow-500" />
      case 'security': return <Shield className="w-4 h-4 text-red-500" />
      case 'promo': return <Gift className="w-4 h-4 text-purple-500" />
      case 'milestone': return <Award className="w-4 h-4 text-orange-500" />
      default: return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityMessage = (activity: LiveActivity) => {
    switch (activity.type) {
      case 'booking':
        return `${activity.user} booked ${activity.service}`
      case 'driver':
        return `${activity.user} is online`
      case 'review':
        return `${activity.user} left a review: "${activity.service === 'Executive Security' ? 'The driver was impeccable...' : 'Punctual, discreet...'}"`
      case 'promo':
        return activity.service
      case 'milestone':
        return activity.service
      default:
        return `${activity.user} - ${activity.service}`
    }
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg rounded-2xl border border-gray-700/50 shadow-2xl">
        {/* Header with Live Stats */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm">Live Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-xs">{activities.length}</span>
            </div>
          </div>
          
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-2 text-center">
              <div className="text-green-400 font-bold">{stats.activeDrivers}</div>
              <div className="text-gray-300">Online Now</div>
            </div>
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-2 text-center">
              <div className="text-blue-400 font-bold">{stats.avgRating}★</div>
              <div className="text-gray-300">Avg Rating</div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-3">
          {activities.map((activity, index) => (
            <div 
              key={activity.id}
              className={`
                flex items-start space-x-3 p-3 rounded-xl transition-all duration-300
                ${activity.urgent ? 'bg-red-500/10 border border-red-500/30 animate-pulse' : 'bg-gray-800/50 border border-gray-700/30'}
                ${index === 0 ? 'ring-2 ring-blue-500/30' : ''}
                hover:bg-gray-700/50 cursor-pointer group
              `}
            >
              {/* Activity Icon */}
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {getActivityMessage(activity)}
                    </p>
                    {activity.location && (
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-400 text-xs">{activity.location}</span>
                      </div>
                    )}
                    {activity.rating && (
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(activity.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Timestamp */}
                  <div className="flex items-center space-x-1 ml-2">
                    <Clock className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-500 text-xs">
                      {Math.floor((Date.now() - activity.timestamp.getTime()) / 60000)}m
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                {activity.cta && (
                  <button
                    onClick={() => handleAction(activity.cta!.action)}
                    className={`
                      mt-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200
                      flex items-center space-x-1 group-hover:scale-105
                      ${activity.cta.variant === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-500' : ''}
                      ${activity.cta.variant === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-500' : ''}
                      ${activity.cta.variant === 'accent' ? 'bg-yellow-500 text-black hover:bg-yellow-400' : ''}
                    `}
                  >
                    <span>{activity.cta.text}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Action Bar */}
        <div className="p-3 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleAction('call-now')}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-2 px-3 rounded-lg transition-all transform hover:scale-105 text-xs flex items-center justify-center space-x-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call Now</span>
            </button>
            
            <button
              onClick={() => handleAction('whatsapp')}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-2 px-3 rounded-lg transition-all transform hover:scale-105 text-xs flex items-center justify-center space-x-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </button>
          </div>

          {/* Smart Suggestions */}
          <div className="space-y-1">
            <button
              onClick={() => handleAction('book-now')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-3 rounded-lg transition-all text-xs flex items-center justify-center space-x-2"
            >
              <Calendar className="w-3 h-3" />
              <span>Book Like {activities[0]?.user || 'Others'}</span>
              <TrendingUp className="w-3 h-3" />
            </button>
            
            <div className="flex space-x-1">
              <button
                onClick={() => handleAction('get-quote')}
                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-1 px-2 rounded text-xs flex items-center justify-center space-x-1"
              >
                <Target className="w-3 h-3" />
                <span>Quote</span>
              </button>
              
              <button
                onClick={() => handleAction('view-reviews')}
                className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-1 px-2 rounded text-xs flex items-center justify-center space-x-1"
              >
                <Star className="w-3 h-3" />
                <span>Reviews</span>
              </button>
            </div>
          </div>

          {/* Live Status Indicator */}
          <div className="mt-2 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-semibold text-xs">Response: {stats.responseTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}