'use client'

import { useState, useEffect } from 'react'
import { Car, MapPin, Clock, Star, X } from 'lucide-react'

interface CustomerBooking {
  id: string
  customerName: string
  service: string
  location: string
  timestamp: Date
  serviceType: 'standard' | 'premium' | 'executive' | 'xl'
  icon: '🚗' | '⭐' | '👑' | '👥'
  price?: string
}

const SAMPLE_BOOKINGS: CustomerBooking[] = [
  {
    id: '1',
    customerName: 'James M.',
    service: 'GQ Executive',
    location: 'Canary Wharf to Heathrow',
    timestamp: new Date(),
    serviceType: 'executive',
    icon: '👑',
    price: '£145'
  },
  {
    id: '2',
    customerName: 'Sarah L.',
    service: 'GQ Premium',
    location: 'Mayfair to City Airport',
    timestamp: new Date(),
    serviceType: 'premium',
    icon: '⭐',
    price: '£89'
  },
  {
    id: '3',
    customerName: 'Michael R.',
    service: 'GQ Standard',
    location: 'Chelsea to Gatwick',
    timestamp: new Date(),
    serviceType: 'standard',
    icon: '🚗',
    price: '£165'
  },
  {
    id: '4',
    customerName: 'Emma K.',
    service: 'GQ XL Group',
    location: 'Westminster to Stansted',
    timestamp: new Date(),
    serviceType: 'xl',
    icon: '👥',
    price: '£195'
  },
  {
    id: '5',
    customerName: 'David T.',
    service: 'GQ Executive',
    location: 'Kensington to Luton',
    timestamp: new Date(),
    serviceType: 'executive',
    icon: '👑',
    price: '£175'
  },
  {
    id: '6',
    customerName: 'Lisa P.',
    service: 'GQ Premium',
    location: 'Shoreditch to Heathrow',
    timestamp: new Date(),
    serviceType: 'premium',
    icon: '⭐',
    price: '£125'
  }
]

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<CustomerBooking[]>([])

  useEffect(() => {
    setNotifications(SAMPLE_BOOKINGS)
  }, [])

  return (
    <section className="w-full max-w-md mx-auto my-6">
      <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm">
        {notifications.slice().reverse().map((n) => (
          <li key={n.id} className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors">
            <span className="text-2xl mr-3">{n.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-gray-900">{n.customerName}</span>
                <span className="text-xs text-gray-400 ml-2">Just now</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">{n.service}</span>
                {n.price && <span className="text-xs text-green-600 font-bold">{n.price}</span>}
              </div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{n.location}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}