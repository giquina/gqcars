"use client"

import React, { useState, useEffect } from 'react'
import { 
  Car, 
  Shield, 
  Clock, 
  Star, 
  Users, 
  Activity, 
  CheckCircle, 
  Calendar,
  Award,
  MapPin,
  Phone
} from 'lucide-react'

interface TrustMetric {
  id: string
  label: string
  value: number
  suffix: string
  prefix?: string
  description: string
  icon: React.ComponentType<any>
  color: string
  countUpDuration?: number
  format?: (value: number) => string
}

export default function TrustSection() {
  const [metricsData, setMetricsData] = useState({
    activeBookings: 431,
    driversOnline: 17,
    responseTime: 2.4,
    completedToday: 89,
    customerSatisfaction: 4.9,
    yearsOfService: 8,
    totalCustomers: 15420
  })

  const [isVisible, setIsVisible] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricsData(prev => ({
        ...prev,
        activeBookings: Math.max(400, Math.min(500, prev.activeBookings + Math.floor(Math.random() * 6) - 3)),
        driversOnline: Math.max(12, Math.min(25, prev.driversOnline + Math.floor(Math.random() * 3) - 1)),
        responseTime: Math.max(1.8, Math.min(3.5, prev.responseTime + (Math.random() - 0.5) * 0.3)),
        completedToday: prev.completedToday + Math.floor(Math.random() * 2),
        totalCustomers: prev.totalCustomers + Math.floor(Math.random() * 3)
      }))
      setLastUpdate(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('trust-section')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const trustMetrics: TrustMetric[] = [
    {
      id: 'activeBookings',
      label: 'Live Now: Active Bookings',
      value: metricsData.activeBookings,
      suffix: '',
      description: 'Customers currently being served',
      icon: Car,
      color: 'from-blue-500 to-blue-600',
      countUpDuration: 2000
    },
    {
      id: 'driversOnline',
      label: 'Currently: Drivers Online',
      value: metricsData.driversOnline,
      suffix: '',
      description: 'SIA licensed drivers ready to serve',
      icon: Shield,
      color: 'from-green-500 to-green-600',
      countUpDuration: 1500
    },
    {
      id: 'responseTime',
      label: 'Average Response Time',
      value: metricsData.responseTime,
      suffix: 'min',
      description: 'Time from booking to driver assignment',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      countUpDuration: 1800,
      format: (value) => value.toFixed(1)
    },
    {
      id: 'completedToday',
      label: 'Today: Completed Journeys',
      value: metricsData.completedToday,
      suffix: '',
      description: 'Successful rides completed today',
      icon: CheckCircle,
      color: 'from-purple-500 to-purple-600',
      countUpDuration: 2200
    },
    {
      id: 'customerSatisfaction',
      label: 'Customer Satisfaction',
      value: metricsData.customerSatisfaction,
      suffix: '/5',
      description: 'Average rating from verified customers',
      icon: Star,
      color: 'from-yellow-400 to-yellow-500',
      countUpDuration: 1600,
      format: (value) => value.toFixed(1)
    },
    {
      id: 'totalCustomers',
      label: 'Total Customers Served',
      value: metricsData.totalCustomers,
      suffix: '+',
      description: 'Trusted by thousands of satisfied clients',
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      countUpDuration: 2500,
      format: (value) => value.toLocaleString()
    }
  ]

  const AnimatedCounter = ({ 
    value, 
    duration = 2000, 
    format = (val: number) => val.toString() 
  }: { 
    value: number
    duration?: number
    format?: (value: number) => string 
  }) => {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
      if (!isVisible) return

      let startTime: number
      const startValue = displayValue
      const endValue = value
      const change = endValue - startValue

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime

        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        
        setDisplayValue(startValue + change * easeOutQuart)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, [value, duration, isVisible])

    return <span>{format(displayValue)}</span>
  }

  return (
    <section 
      id="trust-section"
      className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 py-16 border-t border-yellow-500/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_25%,_rgba(255,255,255,0.1)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-green-400 font-bold text-sm tracking-wider">LIVE METRICS</span>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse ml-3"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              London's Most Trusted Security Transport
            </span>
          </h2>
          
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real-time performance metrics showcasing our commitment to excellence and reliability
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {trustMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={metric.id}
                className={`
                  group relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50
                  hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:bg-gray-800/70
                  ${isVisible ? 'animate-fade-in' : 'opacity-0'}
                `}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: '600ms',
                  animationFillMode: 'forwards'
                }}
              >
                {/* Icon with Gradient Background */}
                <div className={`
                  w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} 
                  flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300
                `}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Metric Value */}
                <div className="mb-2">
                  <div className="text-2xl md:text-3xl font-black text-white">
                    <AnimatedCounter 
                      value={metric.value}
                      duration={metric.countUpDuration}
                      format={metric.format}
                    />
                    <span className="text-yellow-400">{metric.suffix}</span>
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-sm font-bold text-yellow-400 mb-1 uppercase tracking-wide">
                  {metric.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-xs leading-relaxed">
                  {metric.description}
                </p>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )
          })}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <Award className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">SIA Licensed</h3>
            <p className="text-gray-400 text-sm">All drivers certified by Security Industry Authority</p>
          </div>
          
          <div className="text-center bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <MapPin className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">GPS Tracked</h3>
            <p className="text-gray-400 text-sm">Real-time vehicle tracking for your safety</p>
          </div>
          
          <div className="text-center bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 border border-gray-700/30">
            <Phone className="w-10 h-10 text-blue-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
            <p className="text-gray-400 text-sm">Round-the-clock customer assistance</p>
          </div>
        </div>

        {/* Update Timestamp */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-lg rounded-full px-4 py-2 border border-gray-700/50">
            <Activity className="w-4 h-4 text-green-400 mr-2 animate-pulse" />
            <span className="text-gray-400 text-sm">
              Updated every 30 seconds • Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent"></div>
    </section>
  )
}