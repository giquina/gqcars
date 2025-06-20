'use client'

import { useState } from 'react'
import { Shield, Users, MapPin, Clock, Star, ChevronRight, CheckCircle, AlertTriangle, Car, Crown, Award } from 'lucide-react'

export default function SecurityAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [showRecommendation, setShowRecommendation] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const questions = [
    {
      id: 0,
      question: "What type of security transport do you need?",
      options: [
        { value: "personal", label: "🚗 Personal Protection", description: "Individual security transport" },
        { value: "executive", label: "👔 Executive Transport", description: "Business/corporate travel" },
        { value: "event", label: "🎉 Event Security", description: "Weddings, parties, special events" },
        { value: "airport", label: "✈️ Airport Transfers", description: "Secure airport transportation" }
      ]
    },
    {
      id: 1,
      question: "How many passengers will you have?",
      options: [
        { value: "1-2", label: "👤 1-2 People", description: "Solo or couple travel" },
        { value: "3-4", label: "👥 3-4 People", description: "Small group or family" },
        { value: "5-8", label: "👨‍👩‍👧‍👦 5-8 People", description: "Larger group (requires GQ XL)" },
        { value: "8+", label: "🚌 8+ People", description: "Large group (multiple vehicles)" }
      ]
    },
    {
      id: 2,
      question: "What's your preferred travel distance?",
      options: [
        { value: "local", label: "🏙️ Local (0-10 miles)", description: "Within city/town limits" },
        { value: "regional", label: "🗺️ Regional (10-50 miles)", description: "Surrounding areas" },
        { value: "long", label: "🛣️ Long Distance (50+ miles)", description: "Cross-country travel" },
        { value: "airport", label: "✈️ Airport Routes", description: "Heathrow, Gatwick, etc." }
      ]
    },
    {
      id: 3,
      question: "When do you typically need transport?",
      options: [
        { value: "business", label: "🕘 Business Hours", description: "9 AM - 6 PM weekdays" },
        { value: "evening", label: "🌙 Evening/Night", description: "6 PM - 12 AM" },
        { value: "late", label: "🌃 Late Night/Early Morning", description: "12 AM - 6 AM" },
        { value: "24/7", label: "⏰ Any Time", description: "Flexible scheduling" }
      ]
    },
    {
      id: 4,
      question: "What level of security do you require?",
      options: [
        { value: "standard", label: "🛡️ Standard Security", description: "Basic SIA licensed driver" },
        { value: "enhanced", label: "🔒 Enhanced Security", description: "Advanced threat assessment" },
        { value: "executive", label: "👑 Executive Protection", description: "Full close protection service" },
        { value: "discrete", label: "🤫 Discrete Protection", description: "Low-profile security" }
      ]
    }
  ]

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value })
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowRecommendation(true)
      }, 300)
    }
  }

  const getRecommendation = () => {
    const passengers = answers[1]
    const security = answers[4]
    const distance = answers[2]
    
    if (passengers === "5-8" || passengers === "8+") {
      return {
        service: "GQ XL Group",
        price: "£7.20/mile",
        description: "Large group vehicles with SIA licensed security drivers",
        features: ["5-8 passenger capacity", "Extra luggage space", "Group booking discounts", "SIA licensed security driver"],
        icon: Users,
        color: "orange"
      }
    } else if (security === "executive" || security === "enhanced") {
      return {
        service: "GQ Executive",
        price: "£10.50/mile",
        description: "Premium luxury vehicles with SIA security drivers",
        features: ["Luxury vehicles", "Advanced security protocols", "Business amenities", "Priority service"],
        icon: Crown,
        color: "purple"
      }
    } else if (distance === "airport" || distance === "long") {
      return {
        service: "GQ Premium",
        price: "£8.50/mile",
        description: "Enhanced vehicles for longer journeys",
        features: ["Comfortable seating", "Climate control", "Wi-Fi available", "Professional SIA driver"],
        icon: Star,
        color: "emerald"
      }
    } else {
      return {
        service: "GQ Standard",
        price: "£6.50/mile",
        description: "Professional taxi service with SIA licensed security driver",
        features: ["SIA licensed security driver", "GPS tracking", "Secure transport", "Card payments"],
        icon: Car,
        color: "blue"
      }
    }
  }

  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowRecommendation(false)
  }

  const recommendation = showRecommendation ? getRecommendation() : null
  const IconComponent = recommendation?.icon || Shield

  return (
    <div 
      data-security-assessment
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6 sm:p-8 rounded-2xl border border-yellow-500/30 relative overflow-hidden shadow-2xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-8 h-8 border border-yellow-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-6 left-6 w-6 h-6 border border-blue-500 animate-bounce"></div>
        <div className="absolute top-1/2 left-8 w-4 h-4 bg-yellow-500 rounded-full animate-ping"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-500 animate-pulse" />
            <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Security Assessment
            </h3>
            <AlertTriangle className="w-8 h-8 text-yellow-500 animate-bounce" />
          </div>
          <p className="text-gray-300 text-sm sm:text-base">
            Answer 5 quick questions to get your personalized security transport recommendation
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-gray-800 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-yellow-500 text-sm font-bold mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {!showRecommendation ? (
          <div className="space-y-6">
            {/* Current Question */}
            <div className="text-center">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-6">
                {questions[currentQuestion].question}
              </h4>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="bg-gray-800/50 hover:bg-yellow-500/20 border border-gray-600 hover:border-yellow-500 p-4 rounded-xl transition-all transform hover:scale-105 text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="text-white font-bold text-sm sm:text-base mb-1 group-hover:text-yellow-400">
                        {option.label}
                      </h5>
                      <p className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">
                        {option.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mt-6">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index <= currentQuestion
                      ? 'bg-yellow-500'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Recommendation Result */
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle className="w-8 h-8 text-green-500 animate-bounce" />
                <h4 className="text-2xl font-bold text-white">Perfect Match Found!</h4>
              </div>
            </div>

            {/* Recommended Service */}
            <div className={`bg-gradient-to-br from-${recommendation?.color}-900/60 to-${recommendation?.color}-700/40 p-6 rounded-2xl border border-${recommendation?.color}-500/30 relative`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 bg-${recommendation?.color}-600 rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>RECOMMENDED</span>
                </div>
              </div>
              
              <h5 className="text-2xl font-bold text-white mb-2">{recommendation?.service}</h5>
              <p className="text-gray-300 text-sm mb-4">{recommendation?.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-500">{recommendation?.price}</div>
                  <div className="text-gray-300 text-sm">Starting Price</div>
                </div>
                <div className="bg-black/30 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">50% OFF</div>
                  <div className="text-gray-300 text-sm">First Ride</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <h6 className="text-white font-bold text-sm">Included Features:</h6>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendation?.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => window.open('tel:07407655203', '_self')}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105"
                >
                  📞 Book Now
                </button>
                <button 
                  onClick={() => {
                    const message = `Hello! I completed the security assessment and received a recommendation for ${recommendation?.service}. I'd like to book or get more information.`
                    window.open(`https://wa.me/447407655203?text=${encodeURIComponent(message)}`, '_blank')
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetAssessment}
                className="text-yellow-500 hover:text-yellow-400 text-sm font-bold flex items-center space-x-2 mx-auto"
              >
                <span>🔄 Take Assessment Again</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
