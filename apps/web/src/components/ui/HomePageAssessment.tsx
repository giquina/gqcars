'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Briefcase, Car, Sparkles, ArrowRight } from 'lucide-react'
import { SecurityAssessment } from './SecurityAssessment' // The full assessment component
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from './BoldDynamicComponents'

const services = [
  {
    name: '🛡️ PERSONAL PROTECTION',
    description: 'High-security transport for an individual with SIA licensed CPOs',
    icon: Shield,
  },
  {
    name: '💼 EXECUTIVE TRANSPORT',
    description: 'Professional travel for business needs with VIP treatment',
    icon: Briefcase,
  },
  {
    name: '✨ EVENT SECURITY',
    description: 'Transport for weddings or special occasions with discrete protection',
    icon: Sparkles,
  },
  {
    name: '🚗 AIRPORT TRANSFERS',
    description: 'Secure and reliable airport transportation with flight tracking',
    icon: Car,
  },
]

export function HomePageAssessment() {
  const [isAssessmentVisible, setIsAssessmentVisible] = useState(false)

  if (isAssessmentVisible) {
    return <SecurityAssessment />
  }

  return (
    <BoldAnimatedBackground>
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <BoldSectionHeader 
              title="SECURITY ASSESSMENT"
              subtitle="🔥 Begin your personalized security profile with our SIA-compliant assessment"
              icon={Shield}
              centered
            />
            
            <BoldCard glowing className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-6 py-3 mb-8">
                <Shield className="w-6 h-6 text-yellow-400" />
                <span className="font-black text-sm text-white">🛡️ SIA-COMPLIANT SECURITY ASSESSMENT</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ⚡ WHAT IS THE PRIMARY PURPOSE OF YOUR TRIP?
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto mb-8 font-semibold">
                To provide a security service that is precisely tailored to your needs, we begin with a confidential assessment. This aligns with SIA "Know Your Client" best practices.
              </p>
            </BoldCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setIsAssessmentVisible(true)}
                  className="cursor-pointer"
                >
                  <BoldCard animated glowing className="group text-left h-full hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center group-hover:from-yellow-400/30 group-hover:to-orange-400/30 transition-all duration-300">
                          <service.icon className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                          {service.name}
                        </h3>
                        <p className="text-gray-300 font-semibold group-hover:text-gray-200 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </BoldCard>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <BoldButton 
                  variant="secondary"
                  size="lg"
                  onClick={() => setIsAssessmentVisible(true)}
                  className="group"
                >
                  <span className="flex items-center gap-3">
                    🔥 TAKE FULL ASSESSMENT
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </span>
                </BoldButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </BoldAnimatedBackground>
  )
} 