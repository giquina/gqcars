'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MessageCircle, Sparkles, Mic, MapPin, Zap, Bot, Cpu, Rocket, Shield, Brain, Eye, Waves, Orbit } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard } from './BoldDynamicComponents';

const features = [
  {
    icon: <Bot className="w-10 h-10 text-yellow-400" />,
    title: '⚡ INSTANT AI SUPPORT',
    description: '24/7 AI-powered chat with human backup for immediate assistance.',
    detail: 'Response time: < 30 seconds',
    tech: 'GPT-4 Powered',
    color: 'from-blue-500 to-cyan-500',
    particles: true,
    stats: { value: '24/7', label: 'Available' }
  },
  {
    icon: <Brain className="w-10 h-10 text-yellow-400" />,
    title: '🔥 SMART QUOTES',
    description: 'Transparent, upfront pricing in seconds with intelligent algorithms.',
    detail: 'Dynamic pricing based on 50+ factors',
    tech: 'Machine Learning',
    color: 'from-purple-500 to-pink-500',
    particles: true,
    stats: { value: '< 3s', label: 'Quote Time' }
  },
  {
    icon: <Mic className="w-10 h-10 text-yellow-400" />,
    title: '🎯 VOICE BOOKING',
    description: 'Book your secure transport hands-free with voice commands.',
    detail: '99.7% accuracy voice recognition',
    tech: 'Speech AI',
    color: 'from-green-500 to-emerald-500',
    particles: true,
    stats: { value: '99.7%', label: 'Accuracy' }
  },
  {
    icon: <Eye className="w-10 h-10 text-yellow-400" />,
    title: '🛡️ LIVE TRACKING',
    description: 'Real-time security tracking with smart routing and alerts.',
    detail: 'Military-grade GPS with 1m precision',
    tech: 'Satellite Network',
    color: 'from-red-500 to-orange-500',
    particles: true,
    stats: { value: '1m', label: 'Precision' }
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-150, 150], [30, -30])
  const rotateY = useTransform(mouseX, [-150, 150], [-30, 30])
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), index * 500)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: 45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        type: 'spring',
        stiffness: 100
      }}
      viewport={{ once: true, amount: 0.3 }}
      style={{ 
        perspective: 1000,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        mouseX.set(0)
        mouseY.set(0)
      }}
      whileHover={{ 
        scale: 1.05,
        z: 50,
        transition: { duration: 0.3 }
      }}
      className="transform-gpu group cursor-pointer"
    >
      <BoldCard 
        animated 
        glowing 
        className="relative overflow-hidden h-full flex flex-col"
      >
        {/* Animated Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20`}
          animate={{
            opacity: isActive ? [0.1, 0.3, 0.1] : 0.1,
            background: isHovered ? 'linear-gradient(45deg, #fbbf24, #f59e0b)' : `linear-gradient(to bottom right, ${feature.color})`,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
          }}
        />
        
        {/* Particle System */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
        
        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col h-full">
          {/* Icon Container */}
          <motion.div
            className="mb-6 relative mx-auto"
            whileHover={{ 
              rotateY: 360,
              scale: 1.1
            }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} p-1 relative`}
              animate={{
                boxShadow: isActive 
                  ? ['0 0 20px rgba(251, 191, 36, 0.5)', '0 0 40px rgba(251, 191, 36, 0.8)', '0 0 20px rgba(251, 191, 36, 0.5)']
                  : '0 0 20px rgba(251, 191, 36, 0.5)',
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-full flex items-center justify-center">
                {feature.icon}
              </div>
              
              {/* Orbiting Elements */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              <motion.div
                className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-400 rounded-full"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-xl font-black text-center mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {feature.title}
          </motion.h3>
          
          {/* Description */}
          <p className="text-gray-300 text-sm font-semibold text-center mb-4 flex-grow">
            {feature.description}
          </p>
          
          {/* Tech Badge */}
          <motion.div 
            className="text-center mb-4"
            whileHover={{ scale: 1.1 }}
          >
            <span className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-3 py-1 text-xs font-black text-yellow-400">
              {feature.tech}
            </span>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-black/50 rounded-lg p-3 border border-yellow-400/20">
              <div className="text-2xl font-black text-yellow-400">{feature.stats.value}</div>
              <div className="text-xs text-gray-400">{feature.stats.label}</div>
            </div>
          </motion.div>
          
          {/* Detail on Hover */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-yellow-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-yellow-400 font-semibold text-center">
              {feature.detail}
            </p>
          </motion.div>
        </div>
      </BoldCard>
    </motion.div>
  );
};

export default function InteractiveFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveFeature(prev => (prev + 1) % features.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <BoldAnimatedBackground>
      <section className="relative py-20 z-10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Tech Elements */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -60, -20],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {i % 4 === 0 && <Cpu className="w-4 h-4 text-yellow-400/20" />}
              {i % 4 === 1 && <Rocket className="w-4 h-4 text-blue-400/20" />}
              {i % 4 === 2 && <Zap className="w-4 h-4 text-purple-400/20" />}
              {i % 4 === 3 && <Orbit className="w-4 h-4 text-green-400/20" />}
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Enhanced Header */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            onViewportEnter={() => setIsInView(true)}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            {/* Technology Badge */}
            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full px-8 py-4 mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Cpu className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <span className="text-xl font-black text-white">🚀 CUTTING-EDGE TECHNOLOGY</span>
              <motion.div 
                className="w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.h2 
              className="text-5xl md:text-7xl font-black mb-6"
              style={{
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b, #ef4444, #8b5cf6, #06b6d4)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              THE GQ DIFFERENCE
            </motion.h2>
            
            <motion.p 
              className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              🔥 Experience the ultimate in <motion.span 
                className="font-black text-yellow-400"
                whileHover={{ scale: 1.1 }}
              >
                AI-powered security transport
              </motion.span> technology
            </motion.p>
            
            {/* Live Status Indicators */}
            <div className="flex justify-center gap-8 flex-wrap">
              {[
                { label: 'AI Systems', status: 'ONLINE', color: 'green' },
                { label: 'Security Network', status: 'ACTIVE', color: 'blue' },
                { label: 'Fleet Status', status: 'READY', color: 'yellow' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-gray-700"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`w-3 h-3 rounded-full ${
                      item.color === 'green' ? 'bg-green-400' :
                      item.color === 'blue' ? 'bg-blue-400' : 'bg-yellow-400'
                    }`}
                    animate={{ 
                      opacity: [1, 0.5, 1],
                      scale: [1, 1.2, 1] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.5 
                    }}
                  />
                  <span className="text-sm font-bold text-white">{item.label}</span>
                  <span className={`text-xs font-black ${
                    item.color === 'green' ? 'text-green-400' :
                    item.color === 'blue' ? 'text-blue-400' : 'text-yellow-400'
                  }`}>
                    {item.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
          
          {/* Interactive Demo Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <BoldCard glowing className="max-w-4xl mx-auto relative overflow-hidden">
              {/* Animated Tech Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {[...Array(48)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="border border-yellow-400/20"
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        backgroundColor: [
                          'rgba(251, 191, 36, 0.1)',
                          'rgba(239, 68, 68, 0.1)',
                          'rgba(139, 92, 246, 0.1)',
                          'rgba(251, 191, 36, 0.1)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 p-8">
                <motion.h3 
                  className="text-3xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  🤖 EXPERIENCE THE FUTURE OF SECURITY TRANSPORT
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { 
                      icon: <Brain className="w-8 h-8" />, 
                      title: 'Neural Network Routing', 
                      desc: 'AI optimizes routes in real-time',
                      color: 'from-purple-500 to-pink-500'
                    },
                    { 
                      icon: <Shield className="w-8 h-8" />, 
                      title: 'Quantum Encryption', 
                      desc: 'Military-grade data protection',
                      color: 'from-blue-500 to-cyan-500'
                    },
                    { 
                      icon: <Rocket className="w-8 h-8" />, 
                      title: 'Predictive Analytics', 
                      desc: 'Anticipates security needs',
                      color: 'from-green-500 to-emerald-500'
                    }
                  ].map((tech, i) => (
                    <motion.div
                      key={i}
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <motion.div
                        className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${tech.color} rounded-full flex items-center justify-center group-hover:shadow-2xl`}
                        whileHover={{ 
                          rotate: 360,
                          boxShadow: '0 0 30px rgba(251, 191, 36, 0.6)'
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div className="text-white">
                          {tech.icon}
                        </motion.div>
                      </motion.div>
                      <h4 className="text-lg font-black text-white mb-2 group-hover:text-yellow-400 transition-colors">
                        {tech.title}
                      </h4>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                        {tech.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-8"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-center gap-2 text-2xl font-black text-yellow-400">
                    <Zap className="w-6 h-6" />
                    <span>BOOK NOW - EXPERIENCE THE REVOLUTION</span>
                    <Zap className="w-6 h-6" />
                  </div>
                </motion.div>
              </div>
            </BoldCard>
          </motion.div>
        </div>
      </section>
    </BoldAnimatedBackground>
  );
} 