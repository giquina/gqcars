'use client'

import { useState } from 'react'
import { Car, Shield, Users, Check, Star, Zap, Wifi, Phone } from 'lucide-react'
import { VEHICLE_TYPES, VehicleType } from '@/app/types/booking'
import { motion } from 'framer-motion'

interface VehicleSelectorProps {
  selectedVehicle: string
  onVehicleSelect: (vehicleType: string) => void
  passengerCount: number
}

export default function VehicleSelector({
  selectedVehicle,
  onVehicleSelect,
  passengerCount
}: VehicleSelectorProps) {
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null)

  const getVehicleIcon = (vehicleId: string) => {
    switch (vehicleId) {
      case 'standard':
        return <Car className="w-8 h-8 text-gq-gold" />
      case 'executive':
        return <Star className="w-8 h-8 text-gq-gold" />
      case 'security':
        return <Shield className="w-8 h-8 text-gq-gold" />
      default:
        return <Car className="w-8 h-8 text-gq-gold" />
    }
  }

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, JSX.Element> = {
      'SIA Licensed Driver': <Shield className="w-4 h-4 text-gq-gold" />,
      'GPS Tracking': <Zap className="w-4 h-4 text-gq-gold" />,
      'Card Payment': <Check className="w-4 h-4 text-gq-gold" />,
      'Professional Service': <Star className="w-4 h-4 text-gq-gold" />,
      'Close Protection Officer': <Shield className="w-4 h-4 text-gq-gold" />,
      'Luxury Vehicle': <Car className="w-4 h-4 text-gq-gold" />,
      'WiFi': <Wifi className="w-4 h-4 text-gq-gold" />,
      'Complimentary Water': <Check className="w-4 h-4 text-gq-gold" />,
      'Premium Interior': <Star className="w-4 h-4 text-gq-gold" />,
      'Armored Vehicle': <Shield className="w-4 h-4 text-gq-gold" />,
      'Armed Protection': <Shield className="w-4 h-4 text-gq-gold" />,
      'Secure Communications': <Phone className="w-4 h-4 text-gq-gold" />,
      'Threat Assessment': <Shield className="w-4 h-4 text-gq-gold" />,
      'Emergency Response': <Zap className="w-4 h-4 text-gq-gold" />
    }
    return iconMap[feature] || <Check className="w-4 h-4 text-gq-gold" />
  }

  const isVehicleRecommended = (vehicle: VehicleType) => {
    return passengerCount <= vehicle.capacity
  }

  const cardVariants = {
    hover: { scale: 1.02, y: -5 },
    tap: { scale: 0.98 }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
        <div className="flex items-center gap-3 mb-6">
          <Car className="w-6 h-6 text-gq-gold" />
          <h3 className="text-xl font-bold">Choose Your Vehicle</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(VEHICLE_TYPES).map(([id, vehicle]) => {
            const isSelected = selectedVehicle === id
            const isRecommended = isVehicleRecommended(vehicle)
            const capacityExceeded = passengerCount > vehicle.capacity

            return (
              <motion.div
                key={id}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-gq-gold bg-gq-gold/10'
                    : capacityExceeded
                    ? 'border-red-500/50 bg-red-500/5 opacity-50'
                    : 'border-gray-700 hover:border-gq-gold/50'
                }`}
                onHoverStart={() => setHoveredVehicle(id)}
                onHoverEnd={() => setHoveredVehicle(null)}
                onClick={() => !capacityExceeded && onVehicleSelect(id)}
              >
                {/* Recommended Badge */}
                {isRecommended && !capacityExceeded && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-gq-blue to-gq-gold text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMENDED
                  </div>
                )}

                {/* Capacity Exceeded Badge */}
                {capacityExceeded && (
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    CAPACITY EXCEEDED
                  </div>
                )}

                <div className="text-center mb-4">
                  {getVehicleIcon(id)}
                  <h4 className="text-lg font-bold mt-3 mb-2">{vehicle.name}</h4>
                  <p className="text-sm text-gray-400 mb-4">{vehicle.description}</p>
                  
                  <div className="flex items-center justify-center gap-4 text-sm text-gray-300 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{vehicle.capacity} seats</span>
                    </div>
                    <div className="text-gq-gold font-bold">
                      £{vehicle.basePrice}/mile
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {getFeatureIcon(feature)}
                      <span className="text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 w-6 h-6 bg-gq-gold rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-black" />
                  </motion.div>
                )}

                {/* Pricing Multiplier Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Price Level</span>
                    <div className="flex items-center gap-1">
                      {[...Array(Math.ceil(vehicle.priceMultiplier))].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-4 rounded-sm ${
                            i < vehicle.priceMultiplier
                              ? 'bg-gq-gold'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gq-gold mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gq-gold mb-2">Security & Licensing Information</h4>
              <p className="text-sm text-gray-300 mb-2">
                All our drivers are fully SIA (Security Industry Authority) licensed and undergo rigorous 
                background checks, training, and continuous monitoring.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-400">
                <div>• Enhanced DBS (Criminal Records) Check</div>
                <div>• Professional Driving Assessment</div>
                <div>• Close Protection Training Certified</div>
                <div>• First Aid & Emergency Response Trained</div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Comparison */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gq-gold">Feature</th>
                <th className="text-center py-2">SIA Taxi</th>
                <th className="text-center py-2">Executive</th>
                <th className="text-center py-2">Security</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="py-2">SIA Licensed Driver</td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Close Protection Officer</td>
                <td className="text-center text-gray-500">-</td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Armored Vehicle</td>
                <td className="text-center text-gray-500">-</td>
                <td className="text-center text-gray-500">-</td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-2">Armed Protection</td>
                <td className="text-center text-gray-500">-</td>
                <td className="text-center text-gray-500">-</td>
                <td className="text-center"><Check className="w-4 h-4 text-green-500 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}