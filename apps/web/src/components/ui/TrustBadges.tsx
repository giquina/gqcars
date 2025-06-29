'use client'

import { motion } from 'framer-motion'
import { Shield, Star, Award, CheckCircle, Clock, UserCheck, Globe, Zap, Phone, Lock, Target, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import SIALogo from './SIALogo'
import TFLLogo from './TFLLogo'
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard } from './BoldDynamicComponents'

interface TrustBadgesProps {
  variant?: 'horizontal' | 'grid' | 'compact'
  showText?: boolean
  className?: string
}

export default function TrustBadges({ 
  variant = 'horizontal', 
  showText = true, 
  className = '' 
}: TrustBadgesProps) {
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [clientCount, setClientCount] = useState(0)
  const [ratingCount, setRatingCount] = useState(0)

  // Animated counters
  useEffect(() => {
    const clientTimer = setInterval(() => {
      setClientCount(prev => prev < 1247 ? prev + 17 : 1247)
    }, 50)
    
    const ratingTimer = setInterval(() => {
      setRatingCount(prev => prev < 4.98 ? prev + 0.02 : 4.98)
    }, 100)

    return () => {
      clearInterval(clientTimer)
      clearInterval(ratingTimer)
    }
  }, [])

  // Rotating badge highlight
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentBadgeIndex(prev => (prev + 1) % 6)
        setIsAnimating(false)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const badges = [
    {
      icon: <SIALogo className="w-full h-full" />,
      title: "🛡️ SIA LICENSED",
      description: "Security Industry Authority Licensed Drivers",
      stat: "100% COMPLIANT",
      color: "from-blue-500 to-indigo-600",
      glow: "shadow-blue-500/50",
      particles: true
    },
    {
      icon: <TFLLogo className="w-full h-full" />,
      title: "🚗 TFL APPROVED", 
      description: "Transport for London Approved Operator",
      stat: "OFFICIAL STATUS",
      color: "from-red-500 to-pink-600",
      glow: "shadow-red-500/50",
      particles: true
    },
    {
      icon: <UserCheck className="w-12 h-12 text-white" />,
      title: "✅ DBS CHECKED",
      description: "Enhanced DBS Background Checked Drivers",
      stat: "ENHANCED LEVEL",
      color: "from-green-500 to-emerald-600",
      glow: "shadow-green-500/50",
      particles: true
    },
    {
      icon: <Award className="w-12 h-12 text-white" />,
      title: "🏆 ISO CERTIFIED",
      description: "ISO 9001 Quality Management Certified",
      stat: "ISO 9001:2015",
      color: "from-purple-500 to-violet-600",
      glow: "shadow-purple-500/50",
      particles: true
    },
    {
      icon: <Star className="w-12 h-12 text-white fill-current" />,
      title: "⭐ 5-STAR RATED",
      description: "Consistently rated 5 stars by our clients",
      stat: `${ratingCount.toFixed(2)}/5.00★`,
      color: "from-yellow-400 to-orange-500",
      glow: "shadow-yellow-500/50",
      particles: true
    },
    {
      icon: <Clock className="w-12 h-12 text-white" />,
      title: "⚡ 24/7 SUPPORT", 
      description: "Round-the-clock customer support available",
      stat: "365 DAYS/YEAR",
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/50",
      particles: true
    }
  ]

  const getGridClasses = () => {
    switch (variant) {
      case 'grid':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'
      case 'compact':
        return 'flex flex-wrap justify-center gap-3'
      default:
        return 'flex flex-wrap justify-center lg:justify-between gap-4'
    }
  }

  const getBadgeClasses = () => {
    switch (variant) {
      case 'compact':
        return 'w-12 h-12'
      case 'grid':
        return 'w-full'
      default:
        return 'w-20 h-20 lg:w-24 lg:h-24'
    }
  }

  return (
    <BoldAnimatedBackground>
      <section className={`relative py-20 z-10 overflow-hidden ${className}`}>
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {showText && (
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-8 py-4 mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Shield className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-black text-white">🏆 ELITE CERTIFICATIONS</span>
                <motion.div 
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                TRUSTED & CERTIFIED
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                🛡️ Licensed, certified, and trusted by <motion.span 
                  className="font-black text-yellow-400"
                  key={clientCount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {clientCount.toLocaleString()}+
                </motion.span> clients across London
              </p>
              
              {/* Live Stats Dashboard */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                <BoldCard glowing className="p-4">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-black text-yellow-400">{clientCount.toLocaleString()}</div>
                    <div className="text-xs text-gray-300">Happy Clients</div>
                  </motion.div>
                </BoldCard>
                
                <BoldCard glowing className="p-4">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-current" />
                    <div className="text-2xl font-black text-yellow-400">{ratingCount.toFixed(1)}★</div>
                    <div className="text-xs text-gray-300">Average Rating</div>
                  </motion.div>
                </BoldCard>
                
                <BoldCard glowing className="p-4">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-black text-yellow-400">24/7</div>
                    <div className="text-xs text-gray-300">Service Available</div>
                  </motion.div>
                </BoldCard>
                
                <BoldCard glowing className="p-4">
                  <motion.div 
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Globe className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-black text-yellow-400">100%</div>
                    <div className="text-xs text-gray-300">Compliance Rate</div>
                  </motion.div>
                </BoldCard>
              </div>
            </motion.div>
          )}

          {/* Main Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="perspective-1000"
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    z: 50
                  }}
                  className={`relative group transform-gpu ${
                    currentBadgeIndex === index ? 'z-20' : 'z-10'
                  }`}
                >
                  <BoldCard 
                    animated 
                    glowing 
                    className={`text-center h-full relative overflow-hidden transition-all duration-500 ${
                      currentBadgeIndex === index 
                        ? `ring-4 ring-yellow-400/50 ${badge.glow} shadow-2xl` 
                        : ''
                    }`}
                  >
                    {/* Animated Background Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${badge.color} opacity-10`}
                      animate={{
                        opacity: currentBadgeIndex === index ? [0.1, 0.3, 0.1] : 0.1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: currentBadgeIndex === index ? Infinity : 0,
                      }}
                    />
                    
                    {/* Particle Effects */}
                    {currentBadgeIndex === index && (
                      <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                            style={{
                              left: `${20 + Math.random() * 60}%`,
                              top: `${20 + Math.random() * 60}%`,
                            }}
                            animate={{
                              scale: [0, 1, 0],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Icon Container */}
                    <div className="relative z-10 p-6">
                      <motion.div 
                        className="w-16 h-16 mx-auto mb-4 relative"
                        whileHover={{ rotateY: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${badge.color} rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 border-2 border-yellow-400/30 group-hover:border-yellow-400/60`} />
                        <div className="relative w-full h-full flex items-center justify-center p-2">
                          {badge.icon}
                        </div>
                        
                        {/* Pulse Ring */}
                        <motion.div
                          className="absolute inset-0 border-2 border-yellow-400/50 rounded-full"
                          animate={{
                            scale: currentBadgeIndex === index ? [1, 1.2, 1] : 1,
                            opacity: currentBadgeIndex === index ? [0.5, 0, 0.5] : 0,
                          }}
                          transition={{
                            duration: 2,
                            repeat: currentBadgeIndex === index ? Infinity : 0,
                          }}
                        />
                      </motion.div>

                      {/* Badge Content */}
                      {showText && (
                        <div className="text-center">
                          <motion.h4 
                            className="text-sm font-black text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                          >
                            {badge.title}
                          </motion.h4>
                          
                          <p className="text-xs text-gray-300 font-semibold leading-tight mb-2">
                            {badge.description}
                          </p>
                          
                          <motion.div 
                            className="text-xs font-black text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full border border-yellow-400/20"
                            whileHover={{ scale: 1.1 }}
                          >
                            {badge.stat}
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </BoldCard>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Trust Indicators - Enhanced */}
          {showText && variant === 'horizontal' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <BoldCard glowing className="max-w-6xl mx-auto relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-orange-500/20 animate-pulse" />
                </div>
                
                <div className="relative z-10 p-8">
                  <motion.h3 
                    className="text-2xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.05 }}
                  >
                    🏆 ADDITIONAL CERTIFICATIONS & GUARANTEES
                  </motion.h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { icon: CheckCircle, text: "✅ Fully Insured", detail: "£10M Coverage" },
                      { icon: Lock, text: "🔒 GDPR Compliant", detail: "Data Protected" },
                      { icon: Target, text: "🏆 Professional Standards", detail: "Industry Leading" },
                      { icon: Phone, text: "📞 Emergency Response", detail: "< 5 Min Response" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="text-center group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300"
                          whileHover={{ rotateY: 180 }}
                          transition={{ duration: 0.6 }}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div className="text-sm font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {item.text}
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {item.detail}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Final CTA */}
                  <motion.div 
                    className="mt-8 text-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="inline-flex items-center gap-2 text-lg font-black text-yellow-400">
                      <Zap className="w-5 h-5" />
                      <span>BOOK WITH CONFIDENCE - GUARANTEED EXCELLENCE</span>
                      <Zap className="w-5 h-5" />
                    </div>
                  </motion.div>
                </div>
              </BoldCard>
            </motion.div>
          )}
        </div>
      </section>
    </BoldAnimatedBackground>
  )
}