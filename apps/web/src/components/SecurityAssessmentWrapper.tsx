'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { SecurityAssessment } from './ui/SecurityAssessment'

export default function SecurityAssessmentWrapper() {
  const [isAssessmentVisible, setIsAssessmentVisible] = useState(false)

  if (isAssessmentVisible) {
    return <SecurityAssessment />
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-[#0a0f21] to-black text-white py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center space-x-3 bg-black/50 px-4 py-2 rounded-full mb-6">
            <Shield className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl sm:text-3xl font-bold">Security Assessment</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Take our professional security assessment to receive a personalized protection plan tailored to your needs.
          </p>
        </motion.div>

        <motion.button
          onClick={() => setIsAssessmentVisible(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto flex items-center justify-center space-x-3 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <Shield className="w-5 h-5" />
          <span>Start Assessment</span>
        </motion.button>
      </div>
    </div>
  )
}