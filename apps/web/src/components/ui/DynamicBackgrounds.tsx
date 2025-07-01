'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParticleProps {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
  opacity: number
}

interface DynamicBackgroundsProps {
  variant?: 'particles' | 'geometric' | 'gradient' | 'aurora'
  intensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
  className?: string
}

export default function DynamicBackgrounds({
  variant = 'particles',
  intensity = 'medium',
  interactive = true,
  className = ''
}: DynamicBackgroundsProps) {
  const [particles, setParticles] = useState<ParticleProps[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])

  // Initialize particles
  useEffect(() => {
    const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80
    const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
    
    const initialParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: Math.random() * 0.6 + 0.2
    }))
    
    setParticles(initialParticles)
  }, [intensity])

  // Animate particles
  useEffect(() => {
    if (variant !== 'particles') return

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y > 100 ? -5 : particle.y + particle.speed * 0.1,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05
      })))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [variant])

  // Mouse tracking for interactive effects
  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  const renderParticles = () => (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: 'blur(0.5px)'
          }}
          animate={{
            scale: interactive ? [1, 1.2, 1] : 1,
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const renderGeometric = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-500/30 rotate-45"
        animate={{ rotate: [45, 405] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-500/20 rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-12 h-12 border border-cyan-500/40"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ y: y3 }}
      />
      {/* Add more geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-6 h-6 ${
            i % 3 === 0 ? 'bg-blue-500/10' : 
            i % 3 === 1 ? 'bg-purple-500/10' : 'bg-cyan-500/10'
          } rounded-full`}
          style={{
            left: `${20 + (i * 10)}%`,
            top: `${10 + (i * 8)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const renderGradient = () => (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2))',
            'linear-gradient(225deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
            'linear-gradient(45deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ['-100%', '100%'])
        }}
      />
    </div>
  )

  const renderAurora = () => (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full filter blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full filter blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1.2, 1, 1.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 left-1/2 w-96 h-96 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-full filter blur-3xl"
        animate={{
          x: [-50, 50, -50],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Interactive mouse effect */}
      {interactive && (
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full filter blur-2xl pointer-events-none"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  )

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    >
      {variant === 'particles' && renderParticles()}
      {variant === 'geometric' && renderGeometric()}
      {variant === 'gradient' && renderGradient()}
      {variant === 'aurora' && renderAurora()}
      
      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}