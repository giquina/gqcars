import React, { useState, useEffect, useRef } from 'react'
import { MapPin, Navigation, Clock, Car, Shield, Zap } from 'lucide-react'

interface Driver {
  id: number
  name: string
  location: { lat: number, lng: number }
  available: boolean
  rating: number
  eta: string
  vehicleType: string
}

export default function InteractiveMap() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [userLocation, setUserLocation] = useState({ lat: 51.5074, lng: -0.1278 }) // London
  const mapRef = useRef<HTMLDivElement>(null)

  // Simulate live driver data
  useEffect(() => {
    const mockDrivers: Driver[] = [
      { id: 1, name: 'Michael S.', location: { lat: 51.5074, lng: -0.1278 }, available: true, rating: 4.9, eta: '3 min', vehicleType: 'Executive' },
      { id: 2, name: 'Sarah J.', location: { lat: 51.5155, lng: -0.1426 }, available: true, rating: 4.8, eta: '7 min', vehicleType: 'Standard' },
      { id: 3, name: 'David R.', location: { lat: 51.5007, lng: -0.1246 }, available: false, rating: 5.0, eta: '12 min', vehicleType: 'Premium' },
      { id: 4, name: 'Emma L.', location: { lat: 51.5099, lng: -0.1180 }, available: true, rating: 4.9, eta: '5 min', vehicleType: 'XL' }
    ]

    setDrivers(mockDrivers)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setDrivers(prev => prev.map(driver => ({
        ...driver,
        location: {
          lat: driver.location.lat + (Math.random() - 0.5) * 0.001,
          lng: driver.location.lng + (Math.random() - 0.5) * 0.001
        },
        available: Math.random() > 0.3,
        eta: `${Math.floor(Math.random() * 15) + 1} min`
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleDriverSelect = (driver: Driver) => {
    setSelectedDriver(driver)
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
          <MapPin className="w-6 h-6 text-yellow-500" />
          <span>Live Driver Locations</span>
        </h3>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 font-semibold">{drivers.filter(d => d.available).length} available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div 
            ref={mapRef}
            className="relative h-80 bg-gradient-to-br from-blue-900/30 to-slate-800/30 rounded-2xl border border-slate-600/50 overflow-hidden"
          >
            {/* Map Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600" />
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* User Location */}
            <div 
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse transform -translate-x-2 -translate-y-2"
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
            </div>

            {/* Driver Locations */}
            {drivers.map((driver, index) => (
              <div
                key={driver.id}
                className={`absolute transform -translate-x-2 -translate-y-2 cursor-pointer transition-all duration-300 ${
                  selectedDriver?.id === driver.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + (index * 10)}%`
                }}
                onClick={() => handleDriverSelect(driver)}
              >
                <div className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                  driver.available ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                }`}>
                  <Car className="w-3 h-3 text-white" />
                </div>
                
                {selectedDriver?.id === driver.id && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {driver.name} - {driver.eta}
                  </div>
                )}
              </div>
            ))}

            {/* Route Preview Line */}
            {selectedDriver && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="50%"
                  y1="50%"
                  x2={`${20 + (drivers.findIndex(d => d.id === selectedDriver.id) * 15)}%`}
                  y2={`${30 + (drivers.findIndex(d => d.id === selectedDriver.id) * 10)}%`}
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            )}
          </div>

          {/* Map Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors">
                <Navigation className="w-4 h-4" />
              </button>
              <span className="text-gray-400 text-sm">📍 Your Location</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Updates every 5s</span>
            </div>
          </div>
        </div>

        {/* Driver List */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white mb-4">Available Drivers</h4>
          
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                selectedDriver?.id === driver.id
                  ? 'border-yellow-500 bg-gradient-to-r from-yellow-500/10 to-orange-500/10'
                  : driver.available
                  ? 'border-green-500/30 bg-gradient-to-r from-green-500/5 to-emerald-500/5 hover:border-green-400'
                  : 'border-gray-600/30 bg-gradient-to-r from-gray-500/5 to-slate-500/5 opacity-60'
              }`}
              onClick={() => driver.available && handleDriverSelect(driver)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${driver.available ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                  <span className="text-white font-semibold">{driver.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < Math.floor(driver.rating) ? 'bg-yellow-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">{driver.vehicleType}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className={`font-semibold ${driver.available ? 'text-green-400' : 'text-gray-400'}`}>
                    {driver.available ? driver.eta : 'Busy'}
                  </span>
                </div>
              </div>

              {driver.available && selectedDriver?.id === driver.id && (
                <div className="mt-3 pt-3 border-t border-gray-600/50">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Book {driver.name}</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}