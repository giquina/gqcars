'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  CreditCard,
  Target,
  Star,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface BookingData {
  // Step 1: Journey Details
  pickup: string;
  destination: string;
  date: string;
  time: string;
  service: string;
  passengers: number;
  
  // Step 2: Personal & Payment
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
  paymentMethod: string;
}

interface TwoStepBookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
}

const TwoStepBookingFlow: React.FC<TwoStepBookingFlowProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingData>({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    service: 'private-hire',
    passengers: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    paymentMethod: 'card'
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate price when journey details change
  useEffect(() => {
    if (formData.pickup && formData.destination && formData.service) {
      setIsCalculating(true);
      setTimeout(() => {
        // Simulate price calculation
        const basePrice = 45;
        const serviceMultiplier = getServiceMultiplier(formData.service);
        const estimatedDistance = Math.random() * 20 + 5; // 5-25 miles
        const calculatedPrice = Math.round(basePrice * serviceMultiplier * (estimatedDistance / 10));
        setEstimatedPrice(calculatedPrice);
        setIsCalculating(false);
      }, 1500);
    }
  }, [formData.pickup, formData.destination, formData.service]);

  const getServiceMultiplier = (service: string) => {
    const multipliers: { [key: string]: number } = {
      'private-hire': 1.0,
      'close-protection': 2.5,
      'corporate': 1.4,
      'vip': 2.0,
      'airport': 1.2,
      'wedding': 1.8
    };
    return multipliers[service] || 1.0;
  };

  const services = [
    { 
      value: 'private-hire', 
      label: '🚗 Private Hire', 
      description: 'Professional chauffeur service',
      icon: <Car className="w-6 h-6" />
    },
    { 
      value: 'close-protection', 
      label: '🛡️ Close Protection', 
      description: 'SIA licensed security officers',
      icon: <Shield className="w-6 h-6" />
    },
    { 
      value: 'corporate', 
      label: '💼 Corporate', 
      description: 'Business travel solutions',
      icon: <Target className="w-6 h-6" />
    },
    { 
      value: 'vip', 
      label: '⭐ VIP Service', 
      description: 'Premium luxury experience',
      icon: <Star className="w-6 h-6" />
    },
    { 
      value: 'airport', 
      label: '✈️ Airport Transfer', 
      description: 'Meet & greet included',
      icon: <MapPin className="w-6 h-6" />
    },
    { 
      value: 'wedding', 
      label: '💒 Wedding Transport', 
      description: 'Special occasion service',
      icon: <CheckCircle className="w-6 h-6" />
    }
  ];

  const handleInputChange = (field: keyof BookingData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    // Validate Step 1
    if (currentStep === 1) {
      if (!formData.pickup || !formData.destination || !formData.date || !formData.time) {
        alert('Please fill in all journey details');
        return;
      }
    }
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    // Validate Step 2
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required personal details');
      return;
    }
    
    onSubmit(formData);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setFormData({
      pickup: '',
      destination: '',
      date: '',
      time: '',
      service: 'private-hire',
      passengers: 1,
      name: '',
      email: '',
      phone: '',
      specialRequests: '',
      paymentMethod: 'card'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-black p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black">🚗 Book Your Secure Ride</h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-2"
            >
              ✕
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                currentStep >= 1 ? 'bg-yellow-400 text-black' : 'bg-gray-600 text-white'
              }`}>
                1
              </div>
              <span className={`font-semibold ${currentStep >= 1 ? 'text-yellow-400' : 'text-gray-400'}`}>
                Journey Details
              </span>
            </div>
            
            <div className={`flex-1 h-2 rounded-full ${
              currentStep >= 2 ? 'bg-yellow-400' : 'bg-gray-600'
            }`} />
            
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                currentStep >= 2 ? 'bg-yellow-400 text-black' : 'bg-gray-600 text-white'
              }`}>
                2
              </div>
              <span className={`font-semibold ${currentStep >= 2 ? 'text-yellow-400' : 'text-gray-400'}`}>
                Complete Booking
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 ? (
              // Step 1: Journey Details
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Where are you going?</h3>
                  <p className="text-gray-600">Tell us about your journey and we'll handle the rest</p>
                </div>

                {/* Location Inputs */}
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Pickup Location (e.g., Heathrow Terminal 5)"
                      value={formData.pickup}
                      onChange={(e) => handleInputChange('pickup', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                    />
                  </div>
                  
                  <div className="relative">
                    <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    <input
                      type="text"
                      placeholder="Destination (e.g., Central London)"
                      value={formData.destination}
                      onChange={(e) => handleInputChange('destination', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-500" />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Choose Your Service</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => (
                      <motion.button
                        key={service.value}
                        type="button"
                        onClick={() => handleInputChange('service', service.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.service === service.value
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          {service.icon}
                          <span className="font-bold">{service.label}</span>
                        </div>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-2">Number of Passengers</label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold hover:bg-gray-50 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold min-w-[3rem] text-center">{formData.passengers}</span>
                    <button
                      type="button"
                      onClick={() => handleInputChange('passengers', Math.min(8, formData.passengers + 1))}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Estimated Price */}
                {(formData.pickup && formData.destination) && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                    <div className="text-center">
                      <h4 className="font-bold text-gray-900 mb-2">Estimated Price</h4>
                      {isCalculating ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                          <span className="text-gray-600">Calculating...</span>
                        </div>
                      ) : (
                        <div className="text-3xl font-black text-green-600">£{estimatedPrice}</div>
                      )}
                      <p className="text-sm text-gray-600 mt-1">*Final price confirmed after booking</p>
                    </div>
                  </div>
                )}

                {/* Next Button */}
                <button
                  onClick={handleNextStep}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Continue to Personal Details</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              // Step 2: Personal & Payment Details
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Almost done!</h3>
                  <p className="text-gray-600">Just need a few details to complete your booking</p>
                </div>

                {/* Booking Summary */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3">Journey Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">From:</span>
                      <span className="font-semibold">{formData.pickup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">To:</span>
                      <span className="font-semibold">{formData.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date & Time:</span>
                      <span className="font-semibold">{formData.date} at {formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold">{services.find(s => s.value === formData.service)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Passengers:</span>
                      <span className="font-semibold">{formData.passengers}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="font-bold text-gray-900">Estimated Total:</span>
                      <span className="font-bold text-green-600 text-lg">£{estimatedPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  
                  <textarea
                    placeholder="Special Requirements (optional)"
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none h-24"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">Payment Method</h4>
                  <div className="space-y-3">
                    {[
                      { value: 'card', label: '💳 Credit/Debit Card', description: 'Secure online payment' },
                      { value: 'cash', label: '💷 Pay Cash', description: 'Pay driver upon completion' },
                      { value: 'account', label: '📋 Company Account', description: 'Bill to corporate account' }
                    ].map((method) => (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() => handleInputChange('paymentMethod', method.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          formData.paymentMethod === method.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">{method.label}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={handlePreviousStep}
                    className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <span>Complete Booking</span>
                    <CheckCircle className="w-5 h-5" />
                  </button>
                </div>

                {/* Security Note */}
                <div className="text-center text-sm text-gray-500">
                  🔒 Your personal information is encrypted and secure
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default TwoStepBookingFlow;