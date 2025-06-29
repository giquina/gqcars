'use client'

import { useState, useEffect } from 'react'
import { Calculator, Shield, Car, Users, Clock } from 'lucide-react'

interface QuoteCalculatorProps {
  onCalculate?: (total: number) => void
}

export default function QuoteCalculator({ onCalculate }: QuoteCalculatorProps) {
  const [service, setService] = useState('')
  const [officers, setOfficers] = useState(1)
  const [vehicles, setVehicles] = useState(0)
  const [hours, setHours] = useState(4)
  const [total, setTotal] = useState(0)

  const calculateTotal = () => {
    const baseRates = {
      'close-protection': 75, // Per hour per officer
      'private-hire': 95,    // Per hour per vehicle
      'corporate': 85,       // Per hour per officer
      'wedding': 65,         // Per hour per officer
      'vip': 95             // Per hour per officer
    }

    const baseRate = baseRates[service as keyof typeof baseRates] || 0
    const officerCost = service === 'private-hire' ? 0 : baseRate * officers * hours
    const vehicleCost = service === 'private-hire' ? baseRate * vehicles * hours : vehicles * 65 * hours

    const newTotal = officerCost + vehicleCost
    setTotal(newTotal)
    onCalculate?.(newTotal)
  }

  useEffect(() => {
    calculateTotal()
  }, [service, officers, vehicles, hours])

  return (
    <div className="bg-gq-black/50 p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-6 h-6 text-gq-gold" />
        <h3 className="text-xl font-bold">Quote Calculator</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Service Type</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
          >
            <option value="">Select service</option>
            <option value="close-protection">Close Protection</option>
            <option value="private-hire">Private Hire</option>
            <option value="corporate">Corporate Security</option>
            <option value="wedding">Wedding Security</option>
            <option value="vip">VIP Services</option>
          </select>
        </div>

        {service !== 'private-hire' && (
          <div>
            <label className="block text-sm font-medium mb-2">Number of Officers</label>
            <div className="flex items-center gap-4">
              <Shield className="w-5 h-5 text-gq-gold" />
              <input
                type="number"
                min="1"
                max="10"
                value={officers}
                onChange={(e) => setOfficers(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">
            {service === 'private-hire' ? 'Number of Vehicles' : 'Additional Vehicles'}
          </label>
          <div className="flex items-center gap-4">
            <Car className="w-5 h-5 text-gq-gold" />
            <input
              type="number"
              min="0"
              max="5"
              value={vehicles}
              onChange={(e) => setVehicles(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Duration (hours)</label>
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-gq-gold" />
            <input
              type="number"
              min="4"
              max="24"
              step="4"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Estimated Total</span>
            <span className="text-2xl font-bold text-gq-gold">£{total}</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            * This is an estimated price. Final quote may vary based on specific requirements.
          </p>
        </div>
      </div>
    </div>
  )
}