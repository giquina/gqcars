'use client'

import { Shield, Car, Crown, Users, ArrowRight, Sparkles, CheckCircle, Phone, Calendar, Calculator, Star } from 'lucide-react'

// Define the props for your component
interface ResultsProps {
  recommendation: {
    service: string
    description: string
    icon: React.ElementType
  }
}

export default function SecurityAssessmentResults({ recommendation }: ResultsProps) {
  const Icon = recommendation.icon

  // Get service details based on recommendation
  const getServiceDetails = (serviceName: string) => {
    switch (serviceName) {
      case 'GQ Executive':
        return {
          price: '£10.50/mile',
          features: ['Luxury cars with premium comfort', 'Professional trained drivers', 'Wi-Fi and charging ports', 'Priority service'],
          color: 'purple',
          gradient: 'from-purple-600 to-purple-800'
        }
      case 'GQ XL':
        return {
          price: '£7.20/mile',
          features: ['Spacious vehicles for groups', 'Experienced safe drivers', 'Fits 5-8 people comfortably', 'Extra luggage space'],
          color: 'orange',
          gradient: 'from-orange-600 to-orange-800'
        }
      case 'GQ Standard':
      default:
        return {
          price: '£6.50/mile',
          features: ['Clean, comfortable cars', 'Friendly professional drivers', 'Live GPS tracking for safety', 'Reliable safe transport'],
          color: 'blue',
          gradient: 'from-blue-600 to-blue-800'
        }
    }
  }

  const serviceDetails = getServiceDetails(recommendation.service)

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 sm:p-8 lg:p-10 rounded-2xl border border-purple-500/30 w-full max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-8 right-8 w-16 h-16 border border-purple-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-8 left-8 w-12 h-12 border border-yellow-500 rotate-12 animate-pulse"></div>
        <div className="absolute top-1/2 right-12 w-6 h-6 bg-purple-500 rounded-full animate-ping"></div>
        <div className="absolute top-16 left-16 w-4 h-4 bg-yellow-500 rounded-full animate-bounce"></div>
      </div>

      <div className="relative z-10 text-center">
        {/* Celebration Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center space-x-3 bg-green-600/20 border border-green-500/50 px-6 py-3 rounded-full mb-6">
            <CheckCircle className="w-8 h-8 text-green-400 animate-pulse" />
            <span className="text-green-400 font-bold text-lg">Perfect Match Found!</span>
            <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Your Ideal Transport Service
          </h1>
          <p className="text-gray-300 text-base sm:text-lg px-4 leading-relaxed">
            Based on what you told us, we've found the <span className="text-purple-400 font-semibold">perfect ride service that fits exactly what you need</span>
          </p>
        </div>

        {/* Main Recommendation Card */}
        <div className={`bg-gradient-to-br ${serviceDetails.gradient}/20 border border-${serviceDetails.color}-500/50 rounded-2xl p-6 sm:p-8 lg:p-10 mb-8 relative overflow-hidden`}>
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-pulse"></div>
          
          <div className="relative z-10">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${serviceDetails.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-all duration-300 shadow-lg`}>
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-${serviceDetails.color}-300 mb-4`}>
              {recommendation.service}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
              {recommendation.description}
            </p>

            {/* Price Display */}
            <div className="bg-black/40 border border-gray-600/50 rounded-xl p-4 sm:p-6 mb-6 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Starting from</p>
                <p className={`text-3xl sm:text-4xl font-bold text-${serviceDetails.color}-400`}>
                  {serviceDetails.price}
                </p>
                <p className="text-gray-400 text-sm mt-1">Safe, reliable rides included</p>
              </div>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 max-w-2xl mx-auto">
              {serviceDetails.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-3 bg-black/30 border border-gray-600/30 rounded-lg p-3 sm:p-4"
                >
                  <CheckCircle className={`w-5 h-5 text-${serviceDetails.color}-400 flex-shrink-0`} />
                  <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Special Offer Banner */}
        <div className="bg-gradient-to-r from-red-600/30 to-pink-600/30 border border-red-500/50 rounded-xl p-4 sm:p-6 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Sparkles className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold text-sm sm:text-base">🔥 WELCOME BONUS 🔥</span>
              <Sparkles className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-white font-bold text-lg sm:text-xl mb-1">50% OFF Your First Ride!</p>
            <p className="text-gray-200 text-sm">Thank you for telling us about your travel needs</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:flex-col lg:flex-row gap-4 justify-center mb-8">
          <a
            href="/book"
            className={`group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r ${serviceDetails.gradient} hover:from-${serviceDetails.color}-500 hover:to-${serviceDetails.color}-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl`}
          >
            <Car className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Book {recommendation.service} Now
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="tel:07407655203"
            className="group inline-flex items-center justify-center px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-all transform hover:scale-105 shadow-lg"
          >
            <Phone className="w-5 h-5 mr-2 group-hover:animate-pulse" />
            Call: 07407 655 203
          </a>
        </div>

        {/* Additional Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <a
            href="/quote"
            className="group bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-yellow-500/50 rounded-xl p-4 transition-all transform hover:scale-105"
          >
            <Calculator className="w-8 h-8 text-yellow-500 mx-auto mb-2 group-hover:animate-bounce" />
            <h4 className="font-bold text-white text-sm">Get Price Estimate</h4>
            <p className="text-gray-400 text-xs mt-1">Custom pricing for your needs</p>
          </a>

          <a
            href="/schedule"
            className="group bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-blue-500/50 rounded-xl p-4 transition-all transform hover:scale-105"
          >
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2 group-hover:animate-bounce" />
            <h4 className="font-bold text-white text-sm">Book for Later</h4>
            <p className="text-gray-400 text-xs mt-1">Plan your safe transport</p>
          </a>

          <button
            onClick={() => window.location.reload()}
            className="group bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-purple-500/50 rounded-xl p-4 transition-all transform hover:scale-105"
          >
            <Shield className="w-8 h-8 text-purple-500 mx-auto mb-2 group-hover:animate-bounce" />
            <h4 className="font-bold text-white text-sm">Try Again</h4>
            <p className="text-gray-400 text-xs mt-1">Try different scenarios</p>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-gray-900/80 to-black/80 border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Why Choose {recommendation.service}?</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-yellow-500 font-bold text-2xl mb-1">100%</div>
              <div className="text-gray-300 text-xs">Licensed Drivers</div>
            </div>
            <div>
              <div className="text-yellow-500 font-bold text-2xl mb-1">24/7</div>
              <div className="text-gray-300 text-xs">Always Available</div>
            </div>
            <div>
              <div className="text-yellow-500 font-bold text-2xl mb-1">4.9★</div>
              <div className="text-gray-300 text-xs">Happy Customers</div>
            </div>
            <div>
              <div className="text-yellow-500 font-bold text-2xl mb-1">10+</div>
              <div className="text-gray-300 text-xs">Years Serving You</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}