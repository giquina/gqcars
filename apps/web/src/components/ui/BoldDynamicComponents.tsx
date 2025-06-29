"use client"

import React from 'react'
import { Zap, Shield, Star, ArrowRight, Sparkles, Target, Car } from 'lucide-react'

// Bold Dynamic Button Component
export const BoldButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  onClick,
  className = '',
  ...props 
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: any
  onClick?: () => void
  className?: string
  [key: string]: any
}) => {
  const baseClasses = "font-black transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-105"
  
  const variants = {
    primary: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black",
    secondary: "bg-black/50 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black backdrop-blur-lg",
    ghost: "bg-transparent border border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10",
    outline: "bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl", 
    lg: "px-10 py-6 text-lg rounded-xl"
  }
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
      {variant === 'primary' && <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />}
    </button>
  )
}

// Bold Dynamic Card Component
export const BoldCard = ({ 
  children, 
  className = '',
  animated = true,
  glowing = false 
}: {
  children: React.ReactNode
  className?: string
  animated?: boolean
  glowing?: boolean
}) => {
  const baseClasses = "bg-black/30 backdrop-blur-lg rounded-2xl border border-yellow-500/30 p-6"
  const animatedClasses = animated ? "hover:scale-105 transition-all duration-300" : ""
  const glowClasses = glowing ? "shadow-2xl ring-2 ring-yellow-400/20" : "shadow-xl"
  
  return (
    <div className={`${baseClasses} ${animatedClasses} ${glowClasses} ${className}`}>
      {children}
    </div>
  )
}

// Bold Dynamic Badge Component
export const BoldBadge = ({ 
  children, 
  icon: Icon,
  variant = 'primary',
  animated = true 
}: {
  children: React.ReactNode
  icon?: any
  variant?: 'primary' | 'secondary' | 'success' | 'warning'
  animated?: boolean
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-black",
    secondary: "bg-blue-500/20 border border-blue-400/50 text-blue-300",
    success: "bg-green-500/20 border border-green-400/50 text-green-300", 
    warning: "bg-yellow-500/20 border border-yellow-400/50 text-yellow-300"
  }
  
  const animatedClasses = animated ? "animate-pulse hover:scale-105 transition-transform duration-300" : ""
  
  return (
    <div className={`inline-flex items-center font-bold px-4 py-2 rounded-full shadow-xl border-2 border-yellow-300/30 ${variants[variant]} ${animatedClasses}`}>
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </div>
  )
}

// Bold Dynamic Stats Component
export const BoldStats = ({ 
  value, 
  label, 
  icon: Icon,
  animated = true 
}: {
  value: string | number
  label: string
  icon?: any
  animated?: boolean
}) => {
  return (
    <div className={`text-center ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`}>
      <div className="flex items-center justify-center mb-2">
        {Icon && <Icon className="w-5 h-5 mr-2 text-yellow-400" />}
        <div className="text-3xl font-black text-white font-mono">{value}</div>
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-wide font-semibold">{label}</div>
    </div>
  )
}

// Bold Dynamic Section Header
export const BoldSectionHeader = ({ 
  title, 
  subtitle,
  icon: Icon,
  centered = false 
}: {
  title: string
  subtitle?: string
  icon?: any
  centered?: boolean
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <div className="flex items-center gap-3 mb-4">
        {Icon && (
          <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
            <Icon className="w-6 h-6 text-yellow-400" />
          </div>
        )}
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-xl text-gray-300 font-semibold max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

// Bold Dynamic Live Counter
export const BoldLiveCounter = ({ 
  value, 
  label, 
  icon: Icon,
  trend = 'up' 
}: {
  value: number
  label: string
  icon?: any
  trend?: 'up' | 'down' | 'stable'
}) => {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-red-400', 
    stable: 'text-yellow-400'
  }
  
  return (
    <div className="flex items-center bg-black/50 backdrop-blur-lg rounded-lg px-4 py-2 border border-yellow-400/30">
      {Icon && <Icon className="w-4 h-4 mr-2 text-yellow-400" />}
      <span className={`font-mono font-bold ${trendColors[trend]}`}>{value}</span>
      <span className="text-gray-300 text-sm ml-2">{label}</span>
    </div>
  )
}

// Bold Dynamic Animated Background
export const BoldAnimatedBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black overflow-hidden">
      {/* Lightning bolts */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`lightning-${i}`}
          className="absolute w-0.5 h-16 bg-gradient-to-b from-yellow-400 to-transparent opacity-60 animate-pulse"
          style={{
            left: `${10 + i * 12}%`,
            top: `${5 + i * 8}%`,
            transform: `rotate(${15 + i * 5}deg)`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${1.5 + Math.random()}s`
          }}
        />
      ))}
      
      {/* Ping circles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`circle-${i}`}
          className="absolute rounded-full border border-yellow-400/20 animate-ping"
          style={{
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            left: `${20 + i * 15}%`,
            top: `${10 + i * 12}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`
          }}
        />
      ))}
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-40 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
      
      {/* Glowing overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10"></div>
      
      {children}
    </div>
  )
}

export default {
  BoldButton,
  BoldCard,
  BoldBadge,
  BoldStats,
  BoldSectionHeader,
  BoldLiveCounter,
  BoldAnimatedBackground
}