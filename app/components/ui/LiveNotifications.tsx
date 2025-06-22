import React, { useState, useEffect } from 'react'
import { Check, Clock, MapPin, User, Star } from 'lucide-react'

interface Notification {
  id: number
  type: 'booking' | 'review' | 'driver_online'
  message: string
  time: string
  location?: string
  rating?: number
}

export default function LiveNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [visible, setVisible] = useState(true)

  const sampleNotifications: Notification[] = [
    { id: 1, type: 'booking', message: 'Sarah just booked GQ Executive to Heathrow', time: '2 min ago', location: 'London' },
    { id: 2, type: 'review', message: 'James rated us 5 stars for professional service', time: '5 min ago', rating: 5 },
    { id: 3, type: 'driver_online', message: 'Elite driver Michael is now online in your area', time: '8 min ago', location: 'Central London' },
    { id: 4, type: 'booking', message: 'Emma booked VIP service for wedding transport', time: '12 min ago', location: 'Westminster' },
    { id: 5, type: 'review', message: 'Corporate client left 5-star review for security team', time: '15 min ago', rating: 5 },
    { id: 6, type: 'booking', message: 'David secured close protection service', time: '18 min ago', location: 'Canary Wharf' }
  ]

  useEffect(() => {
    // Simulate real-time notifications
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < sampleNotifications.length) {
        setNotifications(prev => [sampleNotifications[currentIndex], ...prev.slice(0, 2)])
        currentIndex++
      } else {
        // Reset and start over
        currentIndex = 0
        setNotifications([])
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Check className="w-4 h-4 text-green-400" />
      case 'review':
        return <Star className="w-4 h-4 text-yellow-400" />
      case 'driver_online':
        return <User className="w-4 h-4 text-blue-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'booking':
        return 'from-green-500/10 to-emerald-600/10 border-green-500/30'
      case 'review':
        return 'from-yellow-500/10 to-orange-600/10 border-yellow-500/30'
      case 'driver_online':
        return 'from-blue-500/10 to-cyan-600/10 border-blue-500/30'
      default:
        return 'from-gray-500/10 to-slate-600/10 border-gray-500/30'
    }
  }

  if (!visible || notifications.length === 0) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 space-y-3 max-w-sm">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`transform transition-all duration-500 ${index === 0 ? 'animate-slideUp' : ''}`}
          style={{
            opacity: 1 - (index * 0.2),
            scale: 1 - (index * 0.05)
          }}
        >
          <div className={`bg-gradient-to-r ${getNotificationBg(notification.type)} backdrop-blur-sm border rounded-2xl p-4 shadow-lg`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium leading-tight">
                  {notification.message}
                </p>
                
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-gray-400 text-xs flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {notification.time}
                  </span>
                  
                  {notification.location && (
                    <span className="text-gray-400 text-xs flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {notification.location}
                    </span>
                  )}
                  
                  {notification.rating && (
                    <div className="flex items-center">
                      {[...Array(notification.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="text-gray-500 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Minimize button */}
      <button
        onClick={() => setVisible(false)}
        className="w-full bg-slate-800/80 hover:bg-slate-700/80 backdrop-blur-sm border border-slate-700 rounded-xl px-4 py-2 text-gray-400 hover:text-white text-xs transition-all"
      >
        Hide Notifications
      </button>
    </div>
  )
}