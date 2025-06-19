'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, MapPin, Phone, Users, Clock, Car, Activity } from 'lucide-react'

interface ActiveTrip {
  id: string
  customer: string
  driver: string
  status: 'en_route' | 'in_transit' | 'arrived' | 'emergency'
  location: { lat: number; lng: number }
  eta: number
  emergencyAlerts: number
}

interface EmergencyAlert {
  id: string
  tripId: string
  type: 'panic' | 'route_deviation' | 'sos' | 'medical'
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: number
  location: { lat: number; lng: number }
  status: 'active' | 'responding' | 'resolved'
  responseTeam?: string
}

export default function ControlCenterDashboard() {
  const [activeTrips, setActiveTrips] = useState<ActiveTrip[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [systemStats, setSystemStats] = useState({
    totalTrips: 24,
    activeDrivers: 18,
    emergencyAlerts: 2,
    systemUptime: 99.9,
    averageResponseTime: 87 // seconds
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // Update active trips
      setActiveTrips([
        {
          id: 'trip-001',
          customer: 'Sarah Mitchell',
          driver: 'James Wilson',
          status: 'in_transit',
          location: { lat: 51.5074, lng: -0.1278 },
          eta: Date.now() + 15 * 60 * 1000,
          emergencyAlerts: 0
        },
        {
          id: 'trip-002',
          customer: 'David Johnson',
          driver: 'Michael Brown',
          status: 'emergency',
          location: { lat: 51.5155, lng: -0.1415 },
          eta: Date.now() + 8 * 60 * 1000,
          emergencyAlerts: 1
        },
        {
          id: 'trip-003',
          customer: 'Emma Davis',
          driver: 'Robert Taylor',
          status: 'en_route',
          location: { lat: 51.4994, lng: -0.1245 },
          eta: Date.now() + 22 * 60 * 1000,
          emergencyAlerts: 0
        }
      ])

      // Update emergency alerts
      setEmergencyAlerts([
        {
          id: 'alert-001',
          tripId: 'trip-002',
          type: 'panic',
          severity: 'critical',
          timestamp: Date.now() - 2 * 60 * 1000,
          location: { lat: 51.5155, lng: -0.1415 },
          status: 'responding',
          responseTeam: 'Team Alpha'
        },
        {
          id: 'alert-002',
          tripId: 'trip-004',
          type: 'route_deviation',
          severity: 'medium',
          timestamp: Date.now() - 5 * 60 * 1000,
          location: { lat: 51.4994, lng: -0.1245 },
          status: 'active'
        }
      ])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleEmergencyResponse = (alertId: string) => {
    setEmergencyAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'responding', responseTeam: 'Team Bravo' }
          : alert
      )
    )
  }

  const handleResolveAlert = (alertId: string) => {
    setEmergencyAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' }
          : alert
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'emergency': return 'text-red-400 bg-red-500/20'
      case 'in_transit': return 'text-green-400 bg-green-500/20'
      case 'en_route': return 'text-yellow-400 bg-yellow-500/20'
      case 'arrived': return 'text-blue-400 bg-blue-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const formatTime = (timestamp: number) => {
    const minutes = Math.round((timestamp - Date.now()) / 60000)
    return minutes > 0 ? `${minutes}m` : 'Now'
  }

  const formatDuration = (timestamp: number) => {
    const minutes = Math.round((Date.now() - timestamp) / 60000)
    return `${minutes}m ago`
  }

  return (
    <div className="min-h-screen bg-gq-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Shield className="w-8 h-8 text-gq-gold" />
                GQ Cars Control Center
              </h1>
              <p className="text-gray-400 mt-1">Real-time monitoring and emergency response</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">System Status</p>
                <p className="text-green-400 font-semibold">Operational</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Car className="w-8 h-8 text-gq-gold" />
              <div>
                <p className="text-2xl font-bold">{systemStats.totalTrips}</p>
                <p className="text-sm text-gray-400">Active Trips</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-2xl font-bold">{systemStats.activeDrivers}</p>
                <p className="text-sm text-gray-400">Active Drivers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <div>
                <p className="text-2xl font-bold">{systemStats.emergencyAlerts}</p>
                <p className="text-sm text-gray-400">Emergency Alerts</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{systemStats.systemUptime}%</p>
                <p className="text-sm text-gray-400">System Uptime</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-gq-gold" />
              <div>
                <p className="text-2xl font-bold">{systemStats.averageResponseTime}s</p>
                <p className="text-sm text-gray-400">Avg Response</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Emergency Alerts */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Emergency Alerts
              </h2>
              <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm">
                {emergencyAlerts.filter(alert => alert.status === 'active').length} Active
              </span>
            </div>
            
            <div className="space-y-4">
              {emergencyAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-2 ${
                    alert.severity === 'critical' 
                      ? 'bg-red-500/20 border-red-500/50'
                      : 'bg-yellow-500/20 border-yellow-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        alert.severity === 'critical' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                      }`}>
                        {alert.type.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-400">{formatDuration(alert.timestamp)}</span>
                    </div>
                    
                    <span className={`text-xs px-2 py-1 rounded ${
                      alert.status === 'active' ? 'bg-red-500/20 text-red-400' :
                      alert.status === 'responding' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">Trip: {alert.tripId}</p>
                  
                  {alert.responseTeam && (
                    <p className="text-sm text-green-400 mb-3">
                      Responding: {alert.responseTeam}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    {alert.status === 'active' && (
                      <button
                        onClick={() => handleEmergencyResponse(alert.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm transition-colors"
                      >
                        Dispatch Response
                      </button>
                    )}
                    
                    {alert.status === 'responding' && (
                      <button
                        onClick={() => handleResolveAlert(alert.id)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded text-sm transition-colors"
                      >
                        Mark Resolved
                      </button>
                    )}
                    
                    <button className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm transition-colors">
                      View Location
                    </button>
                  </div>
                </div>
              ))}
              
              {emergencyAlerts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active emergency alerts</p>
                </div>
              )}
            </div>
          </div>

          {/* Active Trips */}
          <div className="bg-gray-800/50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6 text-gq-gold" />
                Active Trips
              </h2>
              <span className="bg-gq-gold/20 text-gq-gold px-3 py-1 rounded-full text-sm">
                {activeTrips.length} Live
              </span>
            </div>
            
            <div className="space-y-4">
              {activeTrips.map((trip) => (
                <div key={trip.id} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">{trip.customer}</p>
                      <p className="text-sm text-gray-400">Driver: {trip.driver}</p>
                    </div>
                    
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(trip.status)}`}>
                        {trip.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <p className="text-sm text-gray-400 mt-1">ETA: {formatTime(trip.eta)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>ID: {trip.id}</span>
                      <span>•</span>
                      <span>Lat: {trip.location.lat.toFixed(4)}</span>
                      <span>•</span>
                      <span>Lng: {trip.location.lng.toFixed(4)}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-gq-gold text-black hover:bg-gq-gold/90 rounded-full transition-colors">
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {trip.emergencyAlerts > 0 && (
                    <div className="mt-3 p-2 bg-red-500/20 border border-red-500/30 rounded">
                      <p className="text-red-400 text-sm">
                        ⚠️ {trip.emergencyAlerts} emergency alert(s) active
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Response Time Requirements */}
        <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Response Time Requirements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-400 font-semibold">Emergency Response</p>
              <p className="text-2xl font-bold">&lt; 2 minutes</p>
              <p className="text-sm text-gray-400">Police/security dispatch</p>
            </div>
            
            <div>
              <p className="text-green-400 font-semibold">System Uptime</p>
              <p className="text-2xl font-bold">99.9%</p>
              <p className="text-sm text-gray-400">Service availability</p>
            </div>
            
            <div>
              <p className="text-gq-gold font-semibold">Tracking Accuracy</p>
              <p className="text-2xl font-bold">&lt; 10m</p>
              <p className="text-sm text-gray-400">GPS precision</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}