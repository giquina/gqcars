'use client'

import { useState } from 'react'
import { Shield, Car, Building2, Sparkles, Star, Calendar, Clock, User, Mail, Phone, MapPin } from 'lucide-react'
import { db } from '@/lib/supabase'
import { useAuth } from '@/components/providers/SupabaseProvider'

interface BookingFormData {
  service: string
  subService: string
  date: string
  time: string
  duration: string
  location: string
  name: string
  email: string
  phone: string
  requirements: string
}

const initialFormData: BookingFormData = {
  service: '',
  subService: '',
  date: '',
  time: '',
  duration: '',
  location: '',
  name: '',
  email: '',
  phone: '',
  requirements: ''
}

export default function BookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, loading: authLoading } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (!user) {
      setError('You must be logged in to make a booking. Please log in first.')
      setLoading(false)
      return
    }

    try {
      const bookingData = {
        ...formData,
        user_id: user.id,
      }
      const { data, error } = await db.createBooking(bookingData)
      if (error) throw error
      setSuccess('Thank you for your booking request. We will contact you shortly.')
      setFormData(initialFormData)
      setStep(1)
    } catch (err: any) {
      setError(err.message || 'There was an error submitting your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => setStep(prev => prev + 1)
  const prevStep = () => setStep(prev => prev - 1)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`flex items-center ${num < 3 ? 'flex-1' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= num ? 'bg-gq-gold text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {num}
            </div>
            {num < 3 && (
              <div
                className={`flex-1 h-1 mx-4 ${
                  step > num ? 'bg-gq-gold' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Show error or success messages */}
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-500 text-sm mb-2">{success}</div>}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Select Service Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      handleChange({
                        target: { name: 'service', value: service.id }
                      } as any)
                      nextStep()
                    }}
                    className={`p-6 border-2 ${
                      formData.service === service.id
                        ? 'border-gq-gold'
                        : 'border-gray-700'
                    } hover:border-gq-gold transition-colors text-left`}
                  >
                    <service.icon className="w-8 h-8 text-gq-gold mb-3" />
                    <h3 className="font-bold mb-2">{service.name}</h3>
                    <p className="text-sm text-gray-400">{service.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Service Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="12">12 hours</option>
                  <option value="24">24 hours</option>
                  <option value="custom">Custom duration</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Special Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Please describe any special requirements or additional information"
                className="w-full px-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none h-32 resize-none"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-700 hover:border-gq-gold transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-10 pr-4 py-2 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-gray-700 hover:border-gq-gold transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

const services = [
  {
    id: 'close-protection',
    name: 'Close Protection',
    description: 'Professional personal security and threat management',
    icon: Shield
  },
  {
    id: 'private-hire',
    name: 'Private Hire',
    description: 'Luxury vehicle service with security trained drivers',
    icon: Car
  },
  {
    id: 'corporate',
    name: 'Corporate Security',
    description: 'Comprehensive business and executive protection',
    icon: Building2
  },
  {
    id: 'weddings',
    name: 'Wedding Security',
    description: 'Discreet security for your special day',
    icon: Sparkles
  },
  {
    id: 'vip',
    name: 'VIP Services',
    description: 'Bespoke security solutions for high-profile clients',
    icon: Star
  }
]