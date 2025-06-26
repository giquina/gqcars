'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Briefcase, Car, Sparkles, ArrowRight } from 'lucide-react'
import SecurityAssessment from './SecurityAssessment' // The full assessment component

const services = [
  {
    name: 'Personal Protection',
    description: 'High-security transport for an individual',
    icon: Shield,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    name: 'Executive Transport',
    description: 'Professional travel for business needs',
    icon: Briefcase,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    iconColor: 'text-yellow-400',
  },
  {
    name: 'Event Security',
    description: 'Transport for weddings or special occasions',
    icon: Sparkles,
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    name: 'Airport Transfers',
    description: 'Secure and reliable airport transportation',
    icon: Car,
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
]

export default function HomePageAssessment() {
  const [isAssessmentVisible, setIsAssessmentVisible] = useState(false)

  if (isAssessmentVisible) {
    return <SecurityAssessment questions={[{
      id: 1,
      text: 'What is the primary purpose of your trip?',
      options: services.map(s => ({
        id: s.name.toLowerCase().replace(/ /g, '-'),
        text: s.name,
        subtext: s.description,
        icon: s.icon
      }))
    }]} onComplete={(answers) => {
      console.log('Assessment completed:', answers)
      setIsAssessmentVisible(false)
    }} />
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-[#0a0f21] to-black text-white py-20 sm:py-28">
        <div className="container mx-auto px-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-[#101830] to-[#0e1426] p-8 sm:p-12 rounded-3xl border border-blue-900/50 shadow-2xl shadow-black/50 max-w-4xl mx-auto"
            >
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 bg-gray-800/60 border border-gray-700 rounded-full px-4 py-2 mb-6">
                        <Shield className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium text-sm text-gray-300">SIA-Compliant Security Assessment</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Begin Your Security Profile</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
                        To provide a security service that is precisely tailored to your needs, we begin with a confidential assessment. This aligns with SIA "Know Your Client" best practices.
                    </p>
                    <h2 className="text-2xl font-semibold mb-8">What is the primary purpose of your trip?</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {services.map((service, index) => (
                        <motion.button
                            key={service.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            onClick={() => setIsAssessmentVisible(true)}
                            className={`group p-6 rounded-2xl border transition-all duration-300 text-left flex items-start gap-5 ${service.bgColor} ${service.borderColor} hover:bg-white/5 hover:border-white/20`}
                        >
                            <div className="flex-shrink-0">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-gray-900/50 group-hover:bg-gray-800/70`}>
                                    <service.icon className={`w-6 h-6 transition-colors duration-300 ${service.iconColor}`} />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-white mb-1">{service.name}</h3>
                                <p className="text-gray-400 text-sm">{service.description}</p>
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="text-center">
                    <button 
                        onClick={() => setIsAssessmentVisible(true)}
                        className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <span>Prefer to take the full assessment?</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </motion.div>
        </div>
    </div>
  )
} 