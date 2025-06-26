'use client'

import { useState, useEffect } from 'react'
import { Car, MapPin, Clock, Star, X, CheckCircle, User, TrendingUp, Shield } from 'lucide-react'

interface CustomerBooking {
  id: string
  customerName: string
  service: string
  location: string
  timestamp: Date
  serviceType: 'standard' | 'premium' | 'executive' | 'xl'
  icon: '🚗' | '⭐' | '👑' | '👥'
  price?: string
  status: 'confirmed' | 'completed' | 'in-progress'
  rating?: number
  driverName?: string
}

const SAMPLE_BOOKINGS: CustomerBooking[] = [
  {
    id: '1',
    customerName: 'James M.',
    service: 'GQ Executive',
    location: 'Canary Wharf to Heathrow',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    serviceType: 'executive',
    icon: '👑',
    price: '£145',
    status: 'confirmed',
    rating: 5,
    driverName: 'Mike S.'
  },
  {
    id: '2',
    customerName: 'Sarah L.',
    service: 'GQ Premium',
    location: 'Mayfair to City Airport',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    serviceType: 'premium',
    icon: '⭐',
    price: '£89',
    status: 'completed',
    rating: 5,
    driverName: 'David R.'
  },
  {
    id: '3',
    customerName: 'Michael R.',
    service: 'GQ Standard',
    location: 'Chelsea to Gatwick',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    serviceType: 'standard',
    icon: '🚗',
    price: '£165',
    status: 'in-progress',
    rating: 5,
    driverName: 'John P.'
  },
  {
    id: '4',
    customerName: 'Emma K.',
    service: 'GQ XL Group',
    location: 'Westminster to Stansted',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    serviceType: 'xl',
    icon: '👥',
    price: '£195',
    status: 'confirmed',
    rating: 5,
    driverName: 'Alex M.'
  },
  {
    id: '5',
    customerName: 'David T.',
    service: 'GQ Executive',
    location: 'Kensington to Luton',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    serviceType: 'executive',
    icon: '👑',
    price: '£175',
    status: 'completed',
    rating: 5,
    driverName: 'Tom B.'
  },
  {
    id: '6',
    customerName: 'Lisa P.',
    service: 'GQ Premium',
    location: 'Shoreditch to Heathrow',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    serviceType: 'premium',
    icon: '⭐',
    price: '£125',
    status: 'confirmed',
    rating: 5,
    driverName: 'Sarah K.'
  }
]

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<CustomerBooking[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setNotifications(SAMPLE_BOOKINGS)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getTimeAgo = (timestamp: Date) => {
    const diffInMinutes = Math.floor((currentTime.getTime() - timestamp.getTime()) / (1000 * 60))
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const getServiceColor = (serviceType: string) => {
    switch (serviceType) {
      case 'standard': return 'bg-blue-50 border-blue-200 text-blue-700'
      case 'premium': return 'bg-emerald-50 border-emerald-200 text-emerald-700'
      case 'executive': return 'bg-purple-50 border-purple-200 text-purple-700'
      case 'xl': return 'bg-orange-50 border-orange-200 text-orange-700'
      default: return 'bg-gray-50 border-gray-200 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50'
      case 'completed': return 'text-blue-600 bg-blue-50'
      case 'in-progress': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-3 h-3" />
      case 'completed': return <CheckCircle className="w-3 h-3" />
      case 'in-progress': return <Clock className="w-3 h-3" />
      default: return <Clock className="w-3 h-3" />
    }
  }

  const getCustomerInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <section className="w-full max-w-md mx-auto my-6">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="font-bold text-gray-900 text-lg">Live Bookings</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {notifications.length} today
          </span>
        </div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <TrendingUp className="w-3 h-3" />
          <span>Live</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {notifications.slice().reverse().map((n) => (
            <li 
              key={n.id} 
              className="group cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
            >
              <div className="flex items-start p-4 space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getCustomerInitials(n.customerName)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">{n.customerName}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(n.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${getServiceColor(n.serviceType)}`}>
                          {n.service}
                        </span>
                        {n.price && (
                          <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                            {n.price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="truncate">{n.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${getStatusColor(n.status)}`}>
                            {getStatusIcon(n.status)}
                            <span className="capitalize">{n.status}</span>
                          </div>
                          {n.driverName && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <Shield className="w-3 h-3" />
                              <span>{n.driverName}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{getTimeAgo(n.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="text-2xl">{n.icon}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="w-3 h-3 text-green-500" />
              <span>All drivers SIA licensed</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}