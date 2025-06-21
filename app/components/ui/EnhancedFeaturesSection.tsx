'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Zap, Mic, MapPin, Phone, Calculator, Shield, Clock, Star, ChevronRight } from 'lucide-react'

export default function EnhancedFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative py-20 px-4 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-amber-500/20 px-6 py-3 rounded-full border border-blue-500/30 mb-6">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold">SMART TECHNOLOGY PLATFORM</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              ADVANCED SECURITY TRANSPORT
            </span>
            <br />
            <span className="text-3xl md:text-5xl text-gray-300">
              with INTELLIGENT FEATURES
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-amber-400 font-semibold">PROFESSIONAL SIA LICENSED DRIVERS</span> backed by{' '}
            <span className="text-blue-400 font-semibold">SMART TECHNOLOGY</span> for
            seamless booking and <span className="text-green-400 font-semibold">SUPERIOR SERVICE</span>
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isActive={activeFeature === index}
              onClick={() => setActiveFeature(index)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
            <Phone className="w-5 h-5" />
            BOOK ONLINE
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:scale-105">
            <Calculator className="w-5 h-5" />
            GET QUOTE
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-amber-500/25 hover:scale-105">
            <Shield className="w-5 h-5" />
            SCHEDULE
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>


      </div>
    </div>
  )
}

function FeatureCard({ feature, isActive, onClick, delay }: {
  feature: any
  isActive: boolean
  onClick: () => void
  delay: number
}) {
  return (
    <div
      className={`relative group cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-105' : 'scale-100 hover:scale-102'
      }`}
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`p-8 rounded-2xl border transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-400 shadow-2xl shadow-blue-400/25'
          : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
      }`}>
        {/* Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
          isActive
            ? feature.bgColor + ' scale-110 shadow-lg'
            : 'bg-gray-800 group-hover:bg-gray-700'
        }`}>
          <feature.icon className={`w-8 h-8 transition-all duration-300 ${
            isActive ? 'text-white scale-110' : feature.iconColor + ' group-hover:scale-105'
          }`} />
        </div>

        {/* Content */}
        <div>
          <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-200 group-hover:text-white'
          }`}>
            {feature.title}
          </h3>
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${
            isActive ? 'text-blue-100' : 'text-gray-400 group-hover:text-gray-300'
          }`}>
            {feature.description}
          </p>
          
          {/* Feature highlights */}
          {isActive && (
            <div className="mt-4 space-y-2 animate-fadeIn">
              {feature.highlights?.map((highlight: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-green-300">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  {highlight}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active indicator */}
        {isActive && (
          <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
        )}
      </div>
    </div>
  )
}

const features = [
  {
    id: 'instant-support',
    title: 'Live Support',
    description: 'Instant responses from our team, smart guidance, 24/7 availability',
    icon: MessageCircle,
    iconColor: 'text-purple-400',
    bgColor: 'bg-gradient-to-br from-purple-600 to-purple-700',
    highlights: [
      'Real-time chat with security experts',
      'Emergency response coordination',
      'Multi-language support available'
    ]
  },
  {
    id: 'smart-quotes',
    title: 'Intelligent Pricing',
    description: 'Smart quote system with route optimization & security considerations',
    icon: Calculator,
    iconColor: 'text-blue-400',
    bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700',
    highlights: [
      'Dynamic pricing based on threat levels',
      'Route optimization for safety',
      'Transparent cost breakdown'
    ]
  },
  {
    id: 'voice-booking',
    title: 'Voice Features',
    description: 'Hands-free booking, voice commands, enhanced accessibility',
    icon: Mic,
    iconColor: 'text-purple-400',
    bgColor: 'bg-gradient-to-br from-purple-600 to-purple-700',
    highlights: [
      'Voice-activated booking system',
      'Hands-free journey management',
      'Audio status updates'
    ]
  },
  {
    id: 'location-services',
    title: 'Location Services',
    description: 'Automatic location detection, personalized recommendations, smart routing',
    icon: MapPin,
    iconColor: 'text-green-400',
    bgColor: 'bg-gradient-to-br from-green-600 to-green-700',
    highlights: [
      'GPS tracking for safety',
      'Geofenced security zones',
      'Real-time location sharing'
    ]
  }
]