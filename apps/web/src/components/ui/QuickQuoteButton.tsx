'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, X, MapPin, Clock, Users, ArrowRight } from 'lucide-react'

export default function QuickQuoteButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    service: 'taxi'
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to booking page with query parameters
    const params = new URLSearchParams(formData)
    window.location.href = `/book?${params.toString()}`
  }

  if (!mounted) return null

  return (
    <>
      {/* Floating Quick Quote Button - Mobile Only */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-20 left-4 z-40 p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl border-2 border-white/20 group"
      >
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
        <Calculator className="w-6 h-6 relative z-10 group-hover:animate-bounce" />
      </motion.button>

      {/* Quick Quote Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-br from-blue-900/95 via-purple-900/95 to-black/95 backdrop-blur-xl rounded-2xl border border-yellow-500/30 shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-yellow-400 mb-1">Quick Quote</h2>
                    <p className="text-sm text-gray-300">Get instant pricing for your journey</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Quick Quote Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Service Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Service Type</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    >
                      <option value="taxi">Taxi Service</option>
                      <option value="private-hire">Private Hire</option>
                      <option value="close-protection">Close Protection</option>
                      <option value="airport">Airport Transfer</option>
                      <option value="corporate">Corporate Transport</option>
                      <option value="vip">VIP Service</option>
                    </select>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      value={formData.pickup}
                      onChange={(e) => setFormData(prev => ({ ...prev, pickup: e.target.value }))}
                      placeholder="Enter pickup address"
                      className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Destination
                    </label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                      placeholder="Enter destination address"
                      className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-1" />
                        Time
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Passengers
                    </label>
                    <select
                      value={formData.passengers}
                      onChange={(e) => setFormData(prev => ({ ...prev, passengers: e.target.value }))}
                      className="w-full p-3 bg-gray-800/50 border border-yellow-500/30 rounded-xl text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    >
                      <option value="1">1 Passenger</option>
                      <option value="2">2 Passengers</option>
                      <option value="3">3 Passengers</option>
                      <option value="4">4 Passengers</option>
                      <option value="5">5+ Passengers</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black font-black text-lg rounded-xl shadow-2xl relative overflow-hidden group"
                  >
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Instant Quote
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </motion.button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 pt-4 border-t border-yellow-500/20">
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      SIA Licensed
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      TFL Approved
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      24/7 Available
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}