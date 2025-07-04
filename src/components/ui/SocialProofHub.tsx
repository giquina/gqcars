'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  TrendingUp, Star, Shield, Users, Clock, Award, CheckCircle, 
  Eye, Car, Globe, Phone, Lock, Target, Zap, MessageCircle,
  MapPin, Calendar, ThumbsUp, UserCheck, AlertTriangle
} from 'lucide-react'
import { BoldCard, BoldAnimatedBackground } from './BoldDynamicComponents'

interface SocialProofMetrics {
  trustScore: number
  activeUsers: number
  completedToday: number
  totalBookings: number
  avgResponseTime: number
  satisfactionRate: number
  liveBookings: number
  onlineDrivers: number
}

interface RecentActivity {
  id: string
  type: 'booking' | 'review' | 'completion' | 'certification' | 'emergency'
  message: string
  timestamp: Date
  location: string
  rating?: number
  urgent?: boolean
}

interface TrustIndicator {
  icon: React.ReactNode
  label: string
  value: string
  trend: 'up' | 'down' | 'stable'
  color: string
}

const LOCATIONS = ['Mayfair', 'Canary Wharf', 'Chelsea', 'Knightsbridge', 'City of London', 'Heathrow', 'Gatwick']
const ACTIVITIES = [
  'Executive protection completed successfully',
  'VIP airport transfer confirmed',
  'Diplomatic security mission active',
  'Emergency response unit deployed',
  'Security certification renewed',
  'Customer left 5-star review',
  'Close protection assignment completed',
  'Wedding security service booked'
]

export default function SocialProofHub() {
  const [metrics, setMetrics] = useState<SocialProofMetrics>({
    trustScore: 4.89,
    activeUsers: 347,
    completedToday: 89,
    totalBookings: 12847,
    avgResponseTime: 2.3,
    satisfactionRate: 98.7,
    liveBookings: 23,
    onlineDrivers: 67
  })

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const testimonials = [
    {
      text: "Exceptional service! The security team was professional and discreet throughout our diplomatic mission.",
      author: "Ambassador Sarah Chen",
      role: "Diplomatic Services",
      rating: 5,
      verified: true
    },
    {
      text: "Best close protection service in London. Highly trained professionals who understand the importance of discretion.",
      author: "Marcus Thompson",
      role: "Corporate Executive",
      rating: 5,
      verified: true
    },
    {
      text: "Reliable and professional. Used them for airport transfers and wedding security. Always on time, always professional.",
      author: "Emma Rodriguez",
      role: "Event Coordinator",
      rating: 5,
      verified: true
    },
    {
      text: "Emergency response was incredible. They handled a security situation with professionalism and efficiency.",
      author: "David Wilson",
      role: "Business Owner",
      rating: 5,
      verified: true
    }
  ]

  const trustIndicators: TrustIndicator[] = [
    {
      icon: <Star className="w-5 h-5 text-yellow-400 fill-current" />,
      label: "Trust Score",
      value: `${metrics.trustScore.toFixed(2)}/5.0`,
      trend: 'up',
      color: 'text-yellow-400'
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-400" />,
      label: "Response Time",
      value: `${metrics.avgResponseTime.toFixed(1)}min`,
      trend: 'down',
      color: 'text-blue-400'
    },
    {
      icon: <ThumbsUp className="w-5 h-5 text-green-400" />,
      label: "Satisfaction",
      value: `${metrics.satisfactionRate.toFixed(1)}%`,
      trend: 'up',
      color: 'text-green-400'
    },
    {
      icon: <Users className="w-5 h-5 text-purple-400" />,
      label: "Active Users",
      value: metrics.activeUsers.toString(),
      trend: 'up',
      color: 'text-purple-400'
    }
  ]

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        trustScore: Math.min(5.0, prev.trustScore + (Math.random() - 0.4) * 0.01),
        activeUsers: Math.max(300, prev.activeUsers + Math.floor((Math.random() - 0.5) * 10)),
        completedToday: prev.completedToday + Math.floor(Math.random() * 2),
        liveBookings: Math.max(15, prev.liveBookings + Math.floor((Math.random() - 0.5) * 3)),
        onlineDrivers: Math.max(50, prev.onlineDrivers + Math.floor((Math.random() - 0.5) * 2))
      }))
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Generate recent activities
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: RecentActivity = {
        id: Date.now().toString(),
        type: ['booking', 'review', 'completion', 'certification', 'emergency'][Math.floor(Math.random() * 5)] as any,
        message: ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)],
        timestamp: new Date(),
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        rating: Math.random() > 0.3 ? 5 : 4,
        urgent: Math.random() > 0.8
      }
      
      setRecentActivities(prev => [newActivity, ...prev].slice(0, 5))
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <BoldAnimatedBackground>
      <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BoldCard glowing className="overflow-hidden relative">
            {/* Header */}
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-black text-green-400">LIVE TRUST HUB</span>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isExpanded ? '−' : '+'}
                </button>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="bg-black/30 rounded-lg p-3 text-center"
                  >
                    <div className="flex items-center justify-center mb-1">
                      {indicator.icon}
                    </div>
                    <div className={`text-sm font-black ${indicator.color}`}>
                      {indicator.value}
                    </div>
                    <div className="text-xs text-gray-400">{indicator.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Live Activity Feed */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-gray-400">
                  <Eye className="w-3 h-3" />
                  <span>LIVE ACTIVITY</span>
                </div>
                <div className="space-y-1 max-h-20 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {recentActivities.slice(0, 2).map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-xs text-gray-300 bg-black/20 rounded p-2"
                      >
                        <div className="flex items-center gap-2">
                          {activity.urgent && (
                            <AlertTriangle className="w-3 h-3 text-red-400" />
                          )}
                          <span className="flex-1">{activity.message}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{activity.location}</span>
                          <span>•</span>
                          <span>{activity.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Current Testimonial */}
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-400/20">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                  {testimonials[currentTestimonial].verified && (
                    <CheckCircle className="w-3 h-3 text-blue-400 ml-1" />
                  )}
                </div>
                <p className="text-xs text-gray-300 mb-2 italic">
                  "{testimonials[currentTestimonial].text.substring(0, 80)}..."
                </p>
                <div className="text-xs">
                  <span className="text-yellow-400 font-black">
                    {testimonials[currentTestimonial].author}
                  </span>
                  <span className="text-gray-500 ml-1">
                    • {testimonials[currentTestimonial].role}
                  </span>
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-700/50 overflow-hidden"
                >
                  <div className="p-4 space-y-4">
                    {/* Detailed Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <Car className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                        <div className="text-sm font-black text-blue-400">
                          {metrics.liveBookings}
                        </div>
                        <div className="text-xs text-gray-400">Live Bookings</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3 text-center">
                        <UserCheck className="w-5 h-5 text-green-400 mx-auto mb-1" />
                        <div className="text-sm font-black text-green-400">
                          {metrics.onlineDrivers}
                        </div>
                        <div className="text-xs text-gray-400">Online Drivers</div>
                      </div>
                    </div>

                    {/* Security Certifications */}
                    <div className="space-y-2">
                      <div className="text-xs font-black text-gray-400">CERTIFICATIONS</div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Shield className="w-3 h-3 text-blue-400" />
                          <span className="text-gray-300">SIA Licensed</span>
                        </div>
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Award className="w-3 h-3 text-purple-400" />
                          <span className="text-gray-300">ISO 9001</span>
                        </div>
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Lock className="w-3 h-3 text-red-400" />
                          <span className="text-gray-300">Enhanced DBS</span>
                        </div>
                        <CheckCircle className="w-3 h-3 text-green-400" />
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-black text-red-400">24/7 EMERGENCY</span>
                      </div>
                      <div className="text-xs text-gray-300">
                        Emergency Response: <span className="text-red-400 font-black">999</span>
                      </div>
                      <div className="text-xs text-gray-300">
                        GQ Cars Emergency: <span className="text-red-400 font-black">07407 655 203</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </BoldCard>
        </motion.div>
      </div>
    </BoldAnimatedBackground>
  )
}