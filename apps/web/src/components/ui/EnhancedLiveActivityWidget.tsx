'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Car, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  Activity,
  Navigation,
  Star,
  Phone,
  Eye,
  Zap
} from 'lucide-react'

interface LiveActivity {
  id: string
  type: 'booking' | 'arrival' | 'departure' | 'security' | 'vip'
  message: string
  location: {
    lat: number
    lng: number
    name: string
  }
  timestamp: Date
  priority: 'low' | 'medium' | 'high'
  vehicleType?: string
  clientType?: string
}

interface MiniMapProps {
  activities: LiveActivity[]
  center: { lat: number; lng: number }
}

function MiniMap({ activities, center }: MiniMapProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-4 h-48 overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
        {/* Grid overlay for map effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute border-t border-white/10" style={{ top: `${i * 10}%`, width: '100%' }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute border-l border-white/10" style={{ left: `${i * 10}%`, height: '100%' }} />
          ))}
        </div>
      </div>

      {/* Activity Markers */}
      <div className="relative z-10 h-full">
        {activities.slice(0, 8).map((activity, index) => (
          <motion.div
            key={activity.id}
            className="absolute"
            style={{
              left: `${20 + (index * 12) % 60}%`,
              top: `${15 + (index * 8) % 50}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Ping Animation */}
            <motion.div
              className={`absolute inset-0 rounded-full ${
                activity.priority === 'high' ? 'bg-red-500' :
                activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.6, 0, 0.6],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
            
            {/* Activity Marker */}
            <div className={`relative w-4 h-4 rounded-full border-2 border-white ${
              activity.priority === 'high' ? 'bg-red-500' :
              activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
            } shadow-lg`}>
              <div className="absolute inset-0.5 rounded-full bg-white/30" />
            </div>
            
            {/* Activity Icon */}
            <div className="absolute -top-1 -left-1 w-6 h-6 flex items-center justify-center">
              {activity.type === 'booking' && <Car className="w-3 h-3 text-white" />}
              {activity.type === 'arrival' && <MapPin className="w-3 h-3 text-white" />}
              {activity.type === 'security' && <Shield className="w-3 h-3 text-white" />}
              {activity.type === 'vip' && <Star className="w-3 h-3 text-white" />}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-2 left-2 text-xs text-white/70">
        <div className="flex items-center gap-1">
          <Navigation className="w-3 h-3" />
          <span>Live Activity Map</span>
        </div>
      </div>
    </div>
  )
}

export default function EnhancedLiveActivityWidget() {
  const [activities, setActivities] = useState<LiveActivity[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [liveCount, setLiveCount] = useState(0)
  const [viewersCount, setViewersCount] = useState(0)

  // Generate realistic activities
  useEffect(() => {
    const activityTypes = ['booking', 'arrival', 'departure', 'security', 'vip'] as const
    const locations = [
      { name: 'Heathrow Airport', lat: 51.4700, lng: -0.4543 },
      { name: 'Gatwick Airport', lat: 51.1481, lng: -0.1903 },
      { name: 'London Bridge', lat: 51.5074, lng: -0.0877 },
      { name: 'Canary Wharf', lat: 51.5074, lng: -0.0235 },
      { name: 'Westminster', lat: 51.4994, lng: -0.1244 },
      { name: 'Kensington', lat: 51.5074, lng: -0.1947 },
      { name: 'Mayfair', lat: 51.5074, lng: -0.1481 },
    ]

    const messages = {
      booking: [
        'Executive booking confirmed for VIP client',
        'Corporate transport scheduled',
        'Airport transfer requested',
        'Security escort booked',
        'Premium vehicle assigned'
      ],
      arrival: [
        'SIA Officer arrived at pickup location',
        'Vehicle positioned at destination',
        'Security team in position',
        'Executive car ready for client',
        'Close protection detail deployed'
      ],
      departure: [
        'Client safely transported to destination',
        'Mission completed successfully',
        'Return journey initiated',
        'Security escort concluded',
        'Vehicle returning to base'
      ],
      security: [
        'Route security assessment completed',
        'Threat level: LOW - All clear',
        'Perimeter check completed',
        'Client safety confirmed',
        'Security protocols activated'
      ],
      vip: [
        'VIP client service activated',
        'Premium experience initiated',
        'Luxury vehicle deployed',
        'Five-star service commenced',
        'Executive treatment confirmed'
      ]
    }

    const generateActivity = (): LiveActivity => {
      const type = activityTypes[Math.floor(Math.random() * activityTypes.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      const messageList = messages[type]
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type,
        message: messageList[Math.floor(Math.random() * messageList.length)],
        location,
        timestamp: new Date(),
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        vehicleType: ['Mercedes S-Class', 'BMW 7 Series', 'Audi A8', 'Range Rover'][Math.floor(Math.random() * 4)],
        clientType: ['Corporate Executive', 'VIP Celebrity', 'Government Official', 'Private Client'][Math.floor(Math.random() * 4)]
      }
    }

    // Initial activities
    const initialActivities = Array(8).fill(null).map(() => generateActivity())
    setActivities(initialActivities)

    // Add new activities every 3-8 seconds
    const interval = setInterval(() => {
      const newActivity = generateActivity()
      setActivities(prev => [newActivity, ...prev.slice(0, 19)]) // Keep last 20
    }, Math.random() * 5000 + 3000)

    return () => clearInterval(interval)
  }, [])

  // Update live counters
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        return Math.max(12, Math.min(47, prev + change))
      })
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 10) - 5 // -5 to 4
        return Math.max(156, Math.min(1247, prev + change))
      })
    }, 2000)

    // Initial values
    setLiveCount(32)
    setViewersCount(834)

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Car className="w-4 h-4" />
      case 'arrival': return <MapPin className="w-4 h-4" />
      case 'departure': return <Navigation className="w-4 h-4" />
      case 'security': return <Shield className="w-4 h-4" />
      case 'vip': return <Star className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'low': return 'text-green-400 bg-green-500/20'
      default: return 'text-blue-400 bg-blue-500/20'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-black/90 backdrop-blur-lg border border-gray-800 rounded-xl p-4 w-96 max-h-[600px] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>
                <h3 className="font-semibold text-white">Live Activity</h3>
                <div className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full font-medium">
                  LIVE
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                ×
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{liveCount}</div>
                <div className="text-xs text-gray-400">Active Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{viewersCount}</div>
                <div className="text-xs text-gray-400">Watching</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{activities.length}</div>
                <div className="text-xs text-gray-400">Updates</div>
              </div>
            </div>

            {/* Mini Map */}
            <MiniMap 
              activities={activities} 
              center={{ lat: 51.5074, lng: -0.1278 }} 
            />

            {/* Activities List */}
            <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
              {activities.slice(0, 10).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${getPriorityColor(activity.priority)} border-gray-700/50`}
                >
                  <div className={`p-2 rounded-lg ${getPriorityColor(activity.priority)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium mb-1">{activity.message}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{activity.location.name}</span>
                      <Clock className="w-3 h-3 ml-1" />
                      <span>{new Date(activity.timestamp).toLocaleTimeString()}</span>
                    </div>
                    {activity.vehicleType && (
                      <div className="mt-1 px-2 py-1 bg-gray-800/50 rounded text-xs text-gray-300 inline-block">
                        {activity.vehicleType}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Real-time updates</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{viewersCount + Math.floor(Math.random() * 50)} watching</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setIsExpanded(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 group relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Notification Badge */}
            <motion.div
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {activities.length > 9 ? '9+' : activities.length}
            </motion.div>

            {/* Pulse Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span className="hidden group-hover:block text-sm font-medium">Live</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}