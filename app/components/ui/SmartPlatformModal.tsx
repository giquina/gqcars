'use client'

import { X, Shield, Car, Verified, CheckCircle, Award, Calendar, Users, Star, Clock } from 'lucide-react'
import SIALogo from './SIALogo'
import TFLLogo from './TFLLogo'

interface SmartPlatformModalProps {
  isOpen: boolean
  onClose: () => void
}

const CredentialCard = ({ logo, title, description, features, accentColor }) => (
  <div className={`bg-gray-900/50 p-6 rounded-2xl h-full border-t-4 border-${accentColor}`}>
    <div className="text-center mb-6">
      {logo}
      <h3 className={`mt-4 text-xl font-bold text-white`}>{title}</h3>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
    <div className="space-y-4">
      <ul className="space-y-2 text-sm text-gray-300">
        {features.map((item, i) => (
          <li key={i} className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-3 text-green-400 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default function SmartPlatformModal({ isOpen, onClose }: SmartPlatformModalProps) {
  if (!isOpen) return null

  const siaData = {
    logo: (
      <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500/50">
        <Shield size={48} className="text-blue-400" />
      </div>
    ),
    title: "SIA Licensed",
    description: "Security Industry Authority certified for your protection.",
    features: [
      "Professional Close Protection",
      "Conflict Management Trained",
      "Enhanced Background Checks",
      "First Aid & Emergency Response",
      "Continuous Professional Development",
    ],
    accentColor: 'blue-500'
  };

  const tflData = {
    logo: (
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/50">
        <Car size={48} className="text-green-400" />
      </div>
    ),
    title: "TFL Licensed",
    description: "Transport for London regulated for professional hire.",
    features: [
      "Enhanced DBS Criminal Record Checks",
      "Medical & Topographical Assessments",
      "Regular Vehicle Inspections",
      "Full Private Hire Operator License",
      "Comprehensive Insurance Coverage",
    ],
    accentColor: 'green-500'
  };
  
  const bookingData = {
    logo: (
        <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-purple-500/50">
            <Calendar size={48} className="text-purple-400" />
        </div>
    ),
    title: "Pre-Booking Advantages",
    description: "Reliability and peace of mind for every journey.",
    features: [
        "Guaranteed On-Time Pickup",
        "Fixed Pricing - No Surprises",
        "Advance Driver Details",
        "Flight & Delay Monitoring",
        "24/7 Priority Support",
    ],
    accentColor: 'purple-500'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg">
      <div className="bg-gradient-to-br from-gray-900 via-gray-900/50 to-black rounded-2xl border border-yellow-500/30 max-w-6xl w-full mx-auto shadow-2xl">
        
        {/* Header */}
        <div className="p-4 border-b border-yellow-500/20 flex justify-between items-center bg-black/30">
            <div className="flex items-center space-x-4">
               <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-purple-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                <Verified className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Certified, Licensed & Reliable</h2>
                <p className="text-gray-400 text-sm">Your safety and security, fully certified.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 bg-gray-700/50 hover:bg-gray-600/50 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

        {/* Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <CredentialCard {...siaData} />
          <CredentialCard {...tflData} />
          <CredentialCard {...bookingData} />
        </div>
      </div>
    </div>
  )
}