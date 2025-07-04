'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Shield, Star, Users, TrendingUp, Clock, Award, CheckCircle } from 'lucide-react'

interface TrustScoreWidgetProps {
  variant?: 'compact' | 'detailed' | 'minimal'
  showAnimation?: boolean
  className?: string
}

export default function TrustScoreWidget({ 
  variant = 'compact', 
  showAnimation = true,
  className = ''
}: TrustScoreWidgetProps) {
  const [trustScore, setTrustScore] = useState(4.89)
  const [satisfactionRate, setSatisfactionRate] = useState(98.7)
  const [totalClients, setTotalClients] = useState(1247)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setTrustScore(prev => Math.min(5.0, Math.max(4.5, prev + (Math.random() - 0.5) * 0.01)))
      setSatisfactionRate(prev => Math.min(100, Math.max(95, prev + (Math.random() - 0.5) * 0.1)))
      setTotalClients(prev => prev + Math.floor(Math.random() * 2))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 4.8) return 'text-green-400'
    if (score >= 4.5) return 'text-yellow-400'
    return 'text-orange-400'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 4.8) return 'EXCELLENT'
    if (score >= 4.5) return 'VERY GOOD'
    return 'GOOD'
  }

  if (variant === 'minimal') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.5 }}
        className={`inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 rounded-full px-4 py-2 ${className}`}
      >
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm font-black text-yellow-400">
          {trustScore.toFixed(1)}★
        </span>
        <span className="text-xs text-gray-400">
          ({totalClients.toLocaleString()} reviews)
        </span>
      </motion.div>
    )
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        className={`bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-yellow-400/20 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-black text-white">TRUST SCORE</span>
          </div>
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-400">Rating</span>
            </div>
            <div className="text-right">
              <div className={`text-lg font-black ${getScoreColor(trustScore)}`}>
                {trustScore.toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">
                {getScoreLabel(trustScore)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-gray-400">Clients</span>
            </div>
            <div className="text-sm font-black text-purple-400">
              {totalClients.toLocaleString()}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-xs text-gray-400">Satisfaction</span>
            </div>
            <div className="text-sm font-black text-green-400">
              {satisfactionRate.toFixed(1)}%
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Detailed variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 0.8 }}
      className={`bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-yellow-400/30 rounded-2xl p-6 ${className}`}
    >
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-blue-400" />
          <span className="text-lg font-black text-white">TRUST SCORE</span>
        </div>
        <motion.div
          className={`text-4xl font-black ${getScoreColor(trustScore)} mb-2`}
          key={trustScore}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {trustScore.toFixed(2)}
        </motion.div>
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < Math.floor(trustScore)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        <div className={`text-sm font-black ${getScoreColor(trustScore)}`}>
          {getScoreLabel(trustScore)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/30 rounded-lg p-3 text-center">
          <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <div className="text-xl font-black text-purple-400">
            {totalClients.toLocaleString()}
          </div>
          <div className="text-xs text-gray-400">Happy Clients</div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-3 text-center">
          <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <div className="text-xl font-black text-green-400">
            {satisfactionRate.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-400">Satisfaction</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">SIA Licensed</span>
          </div>
          <span className="text-green-400 font-black">✓</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">ISO 9001 Certified</span>
          </div>
          <span className="text-green-400 font-black">✓</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">24/7 Support</span>
          </div>
          <span className="text-green-400 font-black">✓</span>
        </div>
      </div>
    </motion.div>
  )
}