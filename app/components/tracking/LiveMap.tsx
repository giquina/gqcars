'use client'

import { useState, useEffect, useCallback } from 'react'
import { Navigation, MapPin, Shield, Phone, MessageSquare, AlertTriangle } from 'lucide-react'
import { useTrackingStore } from '../../stores/trackingStore'

interface LiveMapProps {
  tripId: string
  customerId: string
}

export default function LiveMap({ tripId, customerId }: LiveMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [eta, setEta] = useState<number | null>(null)
  const [distance, setDistance] = useState<number | null>(null)
  
  const {
    currentTrip,
    driverLocation,
    customerLocation,
    currentDriver,
    currentVehicle,
    isConnected,
    emergencyMode,
    updateDriverLocation,
    setConnected
  } = useTrackingStore()

  // Simulate GPS updates every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate driver location updates with <10m accuracy
      const newLocation = {
        latitude: 51.5074 + (Math.random() - 0.5) * 0.001,
        longitude: -0.1278 + (Math.random() - 0.5) * 0.001,
        accuracy: Math.random() * 8 + 2, // 2-10 meters accuracy
        timestamp: Date.now(),
        speed: Math.random() * 30 + 20, // 20-50 km/h
        heading: Math.random() * 360
      }
      
      updateDriverLocation(newLocation)
      
      // Calculate ETA (mock calculation)
      const estimatedTime = Math.random() * 20 + 5 // 5-25 minutes
      setEta(Date.now() + estimatedTime * 60 * 1000)
      setDistance(Math.random() * 5 + 1) // 1-6 km
    }, 10000)

    // Mark as connected
    setConnected(true)
    setMapLoaded(true)

    return () => {
      clearInterval(interval)
      setConnected(false)
    }
  }, [updateDriverLocation, setConnected])

  const formatETA = useCallback((timestamp: number) => {
    const minutes = Math.round((timestamp - Date.now()) / 60000)
    return minutes > 0 ? `${minutes} min` : 'Arriving now'
  }, [])

  const handleEmergencyCall = () => {
    window.open('tel:+442079460000', '_self')
  }

  const handleDriverCall = () => {
    // Masked number calling
    window.open('tel:+442079460001', '_self')
  }

  return (
    <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
      {/* Connection Status */}
      <div className="absolute top-4 left-4 z-10">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
          isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
          }`} />
          {isConnected ? 'Live Tracking' : 'Connecting...'}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleEmergencyCall}
          className={`p-3 rounded-full transition-all ${
            emergencyMode 
              ? 'bg-red-500 animate-pulse shadow-red-500/50 shadow-lg' 
              : 'bg-red-600 hover:bg-red-500'
          }`}
          title="Emergency - Call Control Center"
        >
          <Shield className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mock Map Area */}
      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        {mapLoaded ? (
          <div className="text-center text-gray-400">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gq-gold" />
            <p className="text-lg font-semibold">Live Map View</p>
            <p className="text-sm">Real-time GPS tracking active</p>
            {driverLocation && (
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                <p className="text-xs">Last Update: {new Date(driverLocation.timestamp).toLocaleTimeString()}</p>
                <p className="text-xs">Accuracy: {driverLocation.accuracy.toFixed(1)}m</p>
                {driverLocation.speed && (
                  <p className="text-xs">Speed: {driverLocation.speed.toFixed(0)} km/h</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">Loading map...</div>
        )}
      </div>

      {/* Driver Info Panel */}
      {currentDriver && currentVehicle && (
        <div className="absolute bottom-4 left-4 right-4 bg-gq-black/90 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">{currentDriver.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{currentDriver.name}</p>
                <p className="text-sm text-gray-400">
                  {currentVehicle.make} {currentVehicle.model} • {currentVehicle.licensePlate}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${
                          i < Math.floor(currentDriver.rating) ? 'text-gq-gold' : 'text-gray-600'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">
                      {currentDriver.rating} ({currentDriver.reviewCount})
                    </span>
                  </div>
                  {currentDriver.verified && (
                    <Shield className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {eta && (
                <div className="text-right">
                  <p className="text-lg font-bold text-gq-gold">{formatETA(eta)}</p>
                  <p className="text-xs text-gray-400">ETA</p>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={handleDriverCall}
                  className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
                  title="Call Driver (Masked Number)"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded-full transition-colors"
                  title="Send Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          
          {distance && (
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
              <span>Distance: {distance.toFixed(1)} km</span>
              <span>•</span>
              <span>Updated: {isConnected ? 'Live' : 'Offline'}</span>
              {emergencyMode && (
                <>
                  <span>•</span>
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Emergency Mode Active
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}