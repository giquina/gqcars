'use client'

import { useState } from 'react'
import { Star, Shield, Clock, MapPin, Award, User, Phone, Navigation } from 'lucide-react'
import { Driver } from '@/app/types/booking'
import { motion } from 'framer-motion'

interface DriverSelectorProps {
  drivers: Driver[]
  selectedDriver: Driver | null
  onDriverSelect: (driver: Driver) => void
  pickupLocation?: { lat: number; lng: number }
}

export default function DriverSelector({
  drivers,
  selectedDriver,
  onDriverSelect,
  pickupLocation
}: DriverSelectorProps) {
  const [sortBy, setSortBy] = useState<'eta' | 'rating' | 'experience'>('eta')

  const sortedDrivers = [...drivers].sort((a, b) => {
    switch (sortBy) {
      case 'eta':
        return (a.eta || 0) - (b.eta || 0)
      case 'rating':
        return b.rating - a.rating
      case 'experience':
        return b.experience - a.experience
      default:
        return 0
    }
  })

  const cardVariants = {
    hover: { scale: 1.02, y: -2 },
    tap: { scale: 0.98 }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-gq-gold" />
            <h3 className="text-xl font-bold">Select Your Driver</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 bg-gq-black border border-gray-700 rounded text-sm focus:border-gq-gold outline-none"
            >
              <option value="eta">Arrival Time</option>
              <option value="rating">Rating</option>
              <option value="experience">Experience</option>
            </select>
          </div>
        </div>

        {/* Live Driver Map Preview */}
        <div className="mb-6 h-48 bg-gray-800 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-8 h-8 text-gq-gold mx-auto mb-2" />
              <p className="text-sm text-gray-400">Live driver locations</p>
              <p className="text-xs text-gray-500">
                {drivers.filter(d => d.isOnline).length} drivers online near you
              </p>
            </div>
          </div>
          
          {/* Mock driver positions */}
          {drivers.slice(0, 3).map((driver, index) => (
            <div
              key={driver.id}
              className={`absolute w-4 h-4 rounded-full border-2 border-white ${
                driver.isAvailable ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{
                left: `${25 + index * 20}%`,
                top: `${30 + index * 15}%`
              }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {sortedDrivers.map((driver) => {
            const isSelected = selectedDriver?.id === driver.id

            return (
              <motion.div
                key={driver.id}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-gq-gold bg-gq-gold/10'
                    : 'border-gray-700 hover:border-gq-gold/50'
                }`}
                onClick={() => onDriverSelect(driver)}
              >
                <div className="flex items-center gap-4">
                  {/* Driver Photo & Status */}
                  <div className="relative">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gq-black ${
                        driver.isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}
                    />
                  </div>

                  {/* Driver Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-bold text-white">{driver.name}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gq-gold" />
                          <span className="text-gq-gold font-medium">{driver.eta} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white font-medium">{driver.rating}</span>
                          <span className="text-gray-400">({driver.reviews})</span>
                        </div>
                      </div>
                    </div>

                    {/* Credentials & Experience */}
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-gq-gold" />
                        <span className="text-gray-300">SIA: {driver.siaLicense}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-gq-gold" />
                        <span className="text-gray-300">{driver.experience}+ years</span>
                      </div>
                    </div>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {driver.specializations.map((spec, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gq-gold/20 text-gq-gold text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <div className="w-2 h-2 bg-gq-gold rounded-full" />
                        <span>{driver.vehicle.name}</span>
                      </div>
                      
                      {driver.isAvailable ? (
                        <div className="flex items-center gap-1 text-green-500 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <span>Available Now</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span>Busy</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-col gap-2">
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-8 h-8 bg-gq-gold rounded-full flex items-center justify-center"
                      >
                        <span className="text-black font-bold text-sm">✓</span>
                      </motion.div>
                    )}
                    
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gq-gold transition-colors"
                      title="Call driver"
                    >
                      <Phone className="w-4 h-4" />
                    </button>
                    
                    <button
                      type="button"
                      className="p-2 text-gray-400 hover:text-gq-gold transition-colors"
                      title="View location"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Extended Info for Selected Driver */}
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <h5 className="font-semibold text-gq-gold mb-2">Recent Reviews</h5>
                        <div className="space-y-1 text-gray-300">
                          <p>"Excellent service, very professional" ⭐⭐⭐⭐⭐</p>
                          <p>"Punctual and courteous driver" ⭐⭐⭐⭐⭐</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gq-gold mb-2">Current Journey</h5>
                        <div className="text-gray-300">
                          <p>ETA: {driver.eta} minutes</p>
                          <p>Distance: {Math.round(Math.random() * 5 + 1)} miles away</p>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gq-gold mb-2">Vehicle Details</h5>
                        <div className="text-gray-300">
                          <p>{driver.vehicle.name}</p>
                          <p>Capacity: {driver.vehicle.capacity} passengers</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* No Drivers Available */}
        {drivers.length === 0 && (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No drivers available</h3>
            <p className="text-sm text-gray-500">
              Please check back shortly or adjust your pickup location
            </p>
          </div>
        )}

        {/* Driver Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-gq-gold">{drivers.filter(d => d.isAvailable).length}</div>
            <div className="text-sm text-gray-400">Available Now</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-gq-gold">
              {drivers.length > 0 ? (drivers.reduce((acc, d) => acc + d.rating, 0) / drivers.length).toFixed(1) : '0'}
            </div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-2xl font-bold text-gq-gold">
              {drivers.length > 0 ? Math.min(...drivers.map(d => d.eta || 999)) : '0'} min
            </div>
            <div className="text-sm text-gray-400">Fastest ETA</div>
          </div>
        </div>
      </div>
    </div>
  )
}