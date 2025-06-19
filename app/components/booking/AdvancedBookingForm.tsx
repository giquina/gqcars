'use client'

import { useState, useEffect } from 'react'
import { 
  MapPin, Clock, Users, Calendar, CreditCard, Shield, 
  Car, CheckCircle, ArrowRight, ArrowLeft, Star, Award,
  Navigation, Phone, Mail, User, Timer, Zap 
} from 'lucide-react'
import { BookingFormData, Driver, VEHICLE_TYPES, VehicleType } from '@/app/types/booking'
import AddressAutocomplete from './AddressAutocomplete'
import VehicleSelector from './VehicleSelector'
import DriverSelector from './DriverSelector'
import AdvancedPricingCalculator from './AdvancedPricingCalculator'
import BookingConfirmation from './BookingConfirmation'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const initialFormData: BookingFormData = {
  pickupAddress: '',
  destinationAddress: '',
  vehicleType: 'standard',
  passengerCount: 1,
  specialRequirements: '',
  schedulingType: 'asap',
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  additionalServices: []
}

export default function AdvancedBookingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BookingFormData>(initialFormData)
  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([])
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  // Mock data for available drivers
  useEffect(() => {
    if (formData.pickupAddress && formData.vehicleType) {
      fetchAvailableDrivers()
    }
  }, [formData.pickupAddress, formData.vehicleType])

  const fetchAvailableDrivers = async () => {
    // Simulate API call to fetch available drivers
    const mockDrivers: Driver[] = [
      {
        id: 'driver-1',
        name: 'James Morrison',
        photo: '/api/placeholder/80/80',
        rating: 4.9,
        siaLicense: 'SIA-123456789',
        experience: 8,
        specializations: ['Close Protection', 'VIP Transport'],
        currentLocation: { lat: 51.5074, lng: -0.1278 },
        isAvailable: true,
        eta: 5,
        vehicle: VEHICLE_TYPES[formData.vehicleType],
        reviews: 342,
        isOnline: true
      },
      {
        id: 'driver-2',
        name: 'Sarah Chen',
        photo: '/api/placeholder/80/80',
        rating: 4.8,
        siaLicense: 'SIA-987654321',
        experience: 6,
        specializations: ['Executive Protection', 'Corporate Security'],
        currentLocation: { lat: 51.5155, lng: -0.1415 },
        isAvailable: true,
        eta: 8,
        vehicle: VEHICLE_TYPES[formData.vehicleType],
        reviews: 218,
        isOnline: true
      },
      {
        id: 'driver-3',
        name: 'Marcus Williams',
        photo: '/api/placeholder/80/80',
        rating: 5.0,
        siaLicense: 'SIA-456789123',
        experience: 12,
        specializations: ['Armed Response', 'Threat Assessment', 'Counter-Surveillance'],
        currentLocation: { lat: 51.5074, lng: -0.1357 },
        isAvailable: true,
        eta: 3,
        vehicle: VEHICLE_TYPES[formData.vehicleType],
        reviews: 567,
        isOnline: true
      }
    ]
    
    setAvailableDrivers(mockDrivers)
  }

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddressSelect = (type: 'pickup' | 'destination', address: string, coordinates?: { lat: number; lng: number }) => {
    if (type === 'pickup') {
      setFormData(prev => ({
        ...prev,
        pickupAddress: address,
        pickupCoordinates: coordinates
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        destinationAddress: address,
        destinationCoordinates: coordinates
      }))
    }
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      setStep(prev => prev + 1)
      toast.success('Step completed successfully!')
    }
  }

  const prevStep = () => setStep(prev => prev - 1)

  const validateCurrentStep = (): boolean => {
    switch (step) {
      case 1:
        if (!formData.pickupAddress || !formData.destinationAddress) {
          toast.error('Please enter both pickup and destination addresses')
          return false
        }
        return true
      case 2:
        if (!formData.vehicleType) {
          toast.error('Please select a vehicle type')
          return false
        }
        return true
      case 3:
        if (!selectedDriver) {
          toast.error('Please select a driver')
          return false
        }
        return true
      case 4:
        if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
          toast.error('Please fill in all customer details')
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleBookingSubmit = async () => {
    setIsLoading(true)
    
    try {
      // Simulate booking API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const bookingData = {
        ...formData,
        selectedDriverId: selectedDriver?.id,
        finalPrice: estimatedPrice
      }

      // Here you would send the booking to your API
      console.log('Booking submitted:', bookingData)
      
      setBookingConfirmed(true)
      toast.success('Booking confirmed successfully!')
      
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Failed to process booking. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (bookingConfirmed) {
    return (
      <BookingConfirmation 
        booking={{
          bookingId: `GQ-${Date.now()}`,
          referenceCode: `REF${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          formData,
          driver: selectedDriver!,
          estimatedPrice
        }}
      />
    )
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= num 
                    ? 'bg-gradient-to-r from-gq-blue to-gq-gold text-white' 
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step > num ? <CheckCircle className="w-6 h-6" /> : num}
              </div>
              {num < 5 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step > num ? 'bg-gradient-to-r from-gq-blue to-gq-gold' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">
            {step === 1 && 'Journey Details'}
            {step === 2 && 'Vehicle Selection'}
            {step === 3 && 'Choose Your Driver'}
            {step === 4 && 'Customer Information'}
            {step === 5 && 'Confirmation & Payment'}
          </h2>
          <p className="text-gray-400">
            {step === 1 && 'Enter your pickup and destination addresses'}
            {step === 2 && 'Select your preferred vehicle type and service level'}
            {step === 3 && 'Choose from available SIA-licensed drivers'}
            {step === 4 && 'Provide your contact information'}
            {step === 5 && 'Review and confirm your booking'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Journey Details */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="w-6 h-6 text-gq-gold" />
                      <h3 className="text-xl font-bold">Journey Details</h3>
                    </div>

                    <div className="space-y-6">
                      <AddressAutocomplete
                        label="Pickup Location"
                        placeholder="Enter pickup address"
                        value={formData.pickupAddress}
                        onAddressSelect={(address, coordinates) => 
                          handleAddressSelect('pickup', address, coordinates)
                        }
                        icon={<Navigation className="w-5 h-5 text-gq-gold" />}
                      />

                      <AddressAutocomplete
                        label="Destination"
                        placeholder="Enter destination address"
                        value={formData.destinationAddress}
                        onAddressSelect={(address, coordinates) => 
                          handleAddressSelect('destination', address, coordinates)
                        }
                        icon={<MapPin className="w-5 h-5 text-gq-gold" />}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">Passengers</label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gq-gold" />
                            <select
                              value={formData.passengerCount}
                              onChange={(e) => handleInputChange('passengerCount', parseInt(e.target.value))}
                              className="w-full pl-10 pr-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            >
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">When do you need this?</label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gq-gold" />
                            <select
                              value={formData.schedulingType}
                              onChange={(e) => handleInputChange('schedulingType', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            >
                              <option value="asap">As soon as possible</option>
                              <option value="future">Schedule for later</option>
                              <option value="recurring">Recurring booking</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {formData.schedulingType === 'future' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">Date</label>
                            <input
                              type="date"
                              value={formData.date || ''}
                              onChange={(e) => handleInputChange('date', e.target.value)}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Time</label>
                            <input
                              type="time"
                              value={formData.time || ''}
                              onChange={(e) => handleInputChange('time', e.target.value)}
                              className="w-full px-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2">Special Requirements</label>
                        <textarea
                          value={formData.specialRequirements}
                          onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                          placeholder="Any special requirements or instructions..."
                          className="w-full px-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg h-24 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Vehicle Selection */}
              {step === 2 && (
                <VehicleSelector
                  selectedVehicle={formData.vehicleType}
                  onVehicleSelect={(vehicleType) => handleInputChange('vehicleType', vehicleType)}
                  passengerCount={formData.passengerCount}
                />
              )}

              {/* Step 3: Driver Selection */}
              {step === 3 && (
                <DriverSelector
                  drivers={availableDrivers}
                  selectedDriver={selectedDriver}
                  onDriverSelect={setSelectedDriver}
                  pickupLocation={formData.pickupCoordinates}
                />
              )}

              {/* Step 4: Customer Information */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="w-6 h-6 text-gq-gold" />
                      <h3 className="text-xl font-bold">Customer Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gq-gold" />
                          <input
                            type="text"
                            value={formData.customerName}
                            onChange={(e) => handleInputChange('customerName', e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gq-gold" />
                          <input
                            type="email"
                            value={formData.customerEmail}
                            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                            placeholder="Enter your email"
                            className="w-full pl-10 pr-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            required
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gq-gold" />
                          <input
                            type="tel"
                            value={formData.customerPhone}
                            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                            placeholder="Enter your phone number"
                            className="w-full pl-10 pr-4 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Confirmation */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle className="w-6 h-6 text-gq-gold" />
                      <h3 className="text-xl font-bold">Booking Summary</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gq-gold mb-2">Journey</h4>
                          <p className="text-sm text-gray-300">From: {formData.pickupAddress}</p>
                          <p className="text-sm text-gray-300">To: {formData.destinationAddress}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gq-gold mb-2">Service</h4>
                          <p className="text-sm text-gray-300">{VEHICLE_TYPES[formData.vehicleType].name}</p>
                          <p className="text-sm text-gray-300">{formData.passengerCount} passenger(s)</p>
                        </div>
                      </div>

                      {selectedDriver && (
                        <div>
                          <h4 className="font-semibold text-gq-gold mb-2">Your Driver</h4>
                          <div className="flex items-center gap-3">
                            <img
                              src={selectedDriver.photo}
                              alt={selectedDriver.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{selectedDriver.name}</p>
                              <div className="flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-300">{selectedDriver.rating}</span>
                                <span className="text-sm text-gray-400">• SIA Licensed</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Amount</span>
                        <span className="text-2xl font-bold text-gq-gold">£{estimatedPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 border border-gray-700 hover:border-gq-gold transition-colors rounded-lg"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
            )}

            <div className="ml-auto">
              {step < 5 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity rounded-lg font-medium"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleBookingSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gq-blue to-gq-gold text-white hover:opacity-90 transition-opacity rounded-lg font-medium disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Confirm Booking
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Real-time Pricing */}
          <AdvancedPricingCalculator
            formData={formData}
            selectedDriver={selectedDriver}
            onPriceUpdate={setEstimatedPrice}
          />

          {/* Service Features */}
          <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gq-gold" />
              Why Choose GQ Cars?
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gq-gold" />
                <span className="text-sm">SIA Licensed Drivers</span>
              </div>
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-gq-gold" />
                <span className="text-sm">< 5 Second Booking</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-gq-gold" />
                <span className="text-sm">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-gq-gold" />
                <span className="text-sm">100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}