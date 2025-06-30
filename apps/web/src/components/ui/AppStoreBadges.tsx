"use client"

import { motion } from 'framer-motion'
import { Apple, Smartphone, Download, ExternalLink } from 'lucide-react'

// Custom Google Play icon component
const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.88 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"
    />
  </svg>
)

interface AppStoreBadgesProps {
  showAnimations?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'minimal' | 'glow'
  onAppleClick?: () => void
  onGoogleClick?: () => void
}

export default function AppStoreBadges({ 
  showAnimations = true, 
  size = 'md', 
  variant = 'default',
  onAppleClick,
  onGoogleClick
}: AppStoreBadgesProps) {
  
  const sizeClasses = {
    sm: 'w-32 h-10 text-xs px-3 py-2',
    md: 'w-40 h-12 text-sm px-4 py-3',
    lg: 'w-48 h-14 text-base px-6 py-4'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleAppleClick = () => {
    if (onAppleClick) {
      onAppleClick()
    } else {
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'app_store_click', {
          event_category: 'App Download',
          event_label: 'Apple App Store'
        })
      }
      window.open('https://apps.apple.com/', '_blank')
    }
  }

  const handleGoogleClick = () => {
    if (onGoogleClick) {
      onGoogleClick()
    } else {
      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'app_store_click', {
          event_category: 'App Download',
          event_label: 'Google Play Store'
        })
      }
      window.open('https://play.google.com/store', '_blank')
    }
  }

  const badgeVariants = {
    animate: showAnimations ? {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    } : {},
    whileHover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    }
  }

  const glowEffect = variant === 'glow' ? 'shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50' : ''
  const minimalStyle = variant === 'minimal' ? 'border-2 border-white/20 bg-transparent' : ''

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
      {/* Apple App Store Badge */}
      <motion.button
        onClick={handleAppleClick}
        className={`
          ${sizeClasses[size]} 
          bg-black hover:bg-gray-800 text-white rounded-lg 
          font-semibold transition-all duration-300 
          flex items-center justify-center space-x-2 
          border border-gray-700 hover:border-gray-600
          ${glowEffect}
          ${minimalStyle}
          group relative overflow-hidden
        `}
        variants={badgeVariants}
        animate="animate"
        whileHover="whileHover"
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background effect */}
        {showAnimations && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
        
        <Apple className={`${iconSizes[size]} relative z-10`} />
        <div className="flex flex-col items-start relative z-10">
          <span className="text-[10px] opacity-80 leading-none">Download on the</span>
          <span className="leading-none">App Store</span>
        </div>
        <ExternalLink className="w-3 h-3 opacity-50 relative z-10" />
      </motion.button>

      {/* Google Play Store Badge */}
      <motion.button
        onClick={handleGoogleClick}
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 
          text-white rounded-lg font-semibold transition-all duration-300 
          flex items-center justify-center space-x-2 
          border border-green-500/50 hover:border-green-400/50
          ${glowEffect}
          ${minimalStyle}
          group relative overflow-hidden
        `}
        variants={badgeVariants}
        animate="animate"
        whileHover="whileHover"
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background effect */}
        {showAnimations && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
        
        <GooglePlayIcon className={`${iconSizes[size]} relative z-10`} />
        <div className="flex flex-col items-start relative z-10">
          <span className="text-[10px] opacity-80 leading-none">Get it on</span>
          <span className="leading-none">Google Play</span>
        </div>
        <ExternalLink className="w-3 h-3 opacity-50 relative z-10" />
      </motion.button>

      {/* Direct Download Alternative */}
      {variant === 'default' && (
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">or</div>
            <button className="text-blue-400 hover:text-blue-300 text-xs underline transition-colors duration-200 flex items-center space-x-1">
              <Download className="w-3 h-3" />
              <span>Direct Download</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// QR Code component (simple SVG placeholder)
export function AppDownloadQR({ size = 100 }: { size?: number }) {
  return (
    <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-gray-200">
      <div 
        className="bg-black relative"
        style={{ width: size, height: size }}
      >
        {/* Simple QR code pattern */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px p-1">
          {Array.from({ length: 64 }, (_, i) => (
            <div
              key={i}
              className={`
                ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}
                ${i < 8 || i >= 56 || i % 8 === 0 || i % 8 === 7 ? 'bg-black' : ''}
              `}
            />
          ))}
        </div>
        
        {/* Corner markers */}
        <div className="absolute top-1 left-1 w-4 h-4 bg-white border-2 border-black">
          <div className="absolute inset-1 bg-black"></div>
        </div>
        <div className="absolute top-1 right-1 w-4 h-4 bg-white border-2 border-black">
          <div className="absolute inset-1 bg-black"></div>
        </div>
        <div className="absolute bottom-1 left-1 w-4 h-4 bg-white border-2 border-black">
          <div className="absolute inset-1 bg-black"></div>
        </div>
      </div>
      
      <div className="text-center mt-2">
        <div className="text-xs font-bold text-gray-800">Scan to Download</div>
        <div className="text-xs text-gray-600">GQ Cars App</div>
      </div>
    </div>
  )
}