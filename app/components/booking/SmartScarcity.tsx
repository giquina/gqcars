'use client'

import { useState, useEffect } from 'react'
import { Users, Clock, AlertCircle, Zap, CheckCircle } from 'lucide-react'

interface AvailabilityData {
  region: string
  officers: {
    available: number
    total: number
    nextAvailable: string
  }
  urgency: 'low' | 'medium' | 'high' | 'critical'
  bookingsToday: number
  emergencySlots: number
}

const SmartScarcity = () => {
  const [availability, setAvailability] = useState<AvailabilityData[]>([])
  const [viewersCount, setViewersCount] = useState(0)
  const [recentBookings, setRecentBookings] = useState<string[]>([])

  useEffect(() => {
    // Simulate real-time availability updates
    const updateAvailability = () => {
      const regions = [
        { name: 'London Central', base: 25, demand: 0.8 },
        { name: 'Manchester', base: 15, demand: 0.6 },
        { name: 'Birmingham', base: 12, demand: 0.7 },
        { name: 'Edinburgh', base: 8, demand: 0.5 }
      ]

      const newAvailability = regions.map(region => {
        const total = region.base + Math.floor(Math.random() * 5)
        const available = Math.max(1, Math.floor(total * (1 - region.demand)))
        const bookingsToday = Math.floor(Math.random() * 12) + 3
        const emergencySlots = Math.max(0, Math.floor(available * 0.3))
        
        let urgency: 'low' | 'medium' | 'high' | 'critical' = 'low'
        const availabilityRatio = available / total
        
        if (availabilityRatio < 0.1) urgency = 'critical'
        else if (availabilityRatio < 0.25) urgency = 'high'
        else if (availabilityRatio < 0.5) urgency = 'medium'

        return {
          region: region.name,
          officers: {
            available,
            total,
            nextAvailable: getNextAvailableTime()
          },
          urgency,
          bookingsToday,
          emergencySlots
        }
      })

      setAvailability(newAvailability)
    }

    // Simulate live viewer count
    const updateViewers = () => {
      setViewersCount(Math.floor(Math.random() * 47) + 23) // 23-70 viewers
    }

    // Simulate recent booking activity
    const updateRecentBookings = () => {
      const serviceTypes = ['Close Protection', 'Private Hire', 'Corporate Security', 'VIP Service']
      const locations = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow']
      
      const newBooking = `${serviceTypes[Math.floor(Math.random() * serviceTypes.length)]} in ${locations[Math.floor(Math.random() * locations.length)]}`
      
      setRecentBookings(prev => {
        const updated = [newBooking, ...prev.slice(0, 4)]
        return updated
      })
    }

    // Initial load
    updateAvailability()
    updateViewers()

    // Set up intervals
    const availabilityInterval = setInterval(updateAvailability, 45000) // 45 seconds
    const viewersInterval = setInterval(updateViewers, 8000) // 8 seconds
    const bookingsInterval = setInterval(updateRecentBookings, 25000) // 25 seconds

    return () => {
      clearInterval(availabilityInterval)
      clearInterval(viewersInterval)
      clearInterval(bookingsInterval)
    }
  }, [])

  const getNextAvailableTime = () => {
    const hours = Math.floor(Math.random() * 4) + 1
    const minutes = Math.floor(Math.random() * 60)
    return `${hours}h ${minutes}m`
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20'
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20'
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20'
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'Good Availability'
      case 'medium': return 'Limited Availability'
      case 'high': return 'High Demand'
      case 'critical': return 'Very Limited'
      default: return 'Checking...'
    }
  }

  return (
    <div className="space-y-6">
      {/* Live Activity Feed */}
      <div className="bg-slate-800/50 p-4 rounded-lg border border-amber-500/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            Live Activity
          </h4>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            {viewersCount} viewing now
          </div>
        </div>
        
        <div className="space-y-2">
          {recentBookings.map((booking, index) => (
            <div key={index} className="text-xs text-gray-300 flex items-center gap-2">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Someone just booked: {booking}</span>
              <span className="text-gray-500">{Math.floor(Math.random() * 15) + 1}m ago</span>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Availability */}
      <div className="bg-slate-800/50 p-4 rounded-lg border border-amber-500/20">
        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-4 h-4 text-amber-500" />
          Officer Availability
        </h4>
        
        <div className="space-y-3">
          {availability.map((data) => (
            <div key={data.region} className="border border-gray-700 rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-white">{data.region}</span>
                <span className={`text-xs px-2 py-1 rounded border ${getUrgencyColor(data.urgency)}`}>
                  {getUrgencyText(data.urgency)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Available Officers:</span>
                  <div className="text-white font-medium">
                    {data.officers.available} of {data.officers.total}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">Emergency Slots:</span>
                  <div className="text-amber-500 font-medium">
                    {data.emergencySlots} available
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400">Bookings Today:</span>
                  <div className="text-white font-medium">{data.bookingsToday}</div>
                </div>
                
                <div>
                  <span className="text-gray-400">Next Available:</span>
                  <div className="text-green-500 font-medium">{data.officers.nextAvailable}</div>
                </div>
              </div>
              
              {data.urgency === 'critical' && (
                <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">
                  <div className="flex items-center gap-2 text-red-400 text-xs">
                    <AlertCircle className="w-3 h-3" />
                    <span>Limited availability - book now to secure your slot</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Priority Booking CTA */}
      <div className="bg-gradient-to-r from-amber-500/10 to-blue-500/10 p-4 rounded-lg border border-amber-500/30">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <span className="font-semibold text-white">Priority Booking Available</span>
        </div>
        <p className="text-sm text-gray-300 mb-3">
          Secure your security team now. High demand periods require advance booking.
        </p>
        <button className="w-full bg-gradient-to-r from-amber-600 to-blue-600 text-white py-2 px-4 rounded font-medium hover:opacity-90 transition-opacity">
          Book Priority Service Now
        </button>
      </div>
    </div>
  )
}

export default SmartScarcity