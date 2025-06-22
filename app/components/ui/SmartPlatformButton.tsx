'use client'

import { useState } from 'react'
import { Sparkles, Zap } from 'lucide-react'
import SmartPlatformModal from './SmartPlatformModal'

export default function SmartPlatformButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        data-smart-platform
        onClick={() => setIsModalOpen(true)}
        className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-green-500 hover:from-purple-500 hover:via-blue-500 hover:to-green-400 text-white px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2 transition-all transform hover:scale-105 shadow-lg border border-white/20 group animate-pulse hover:animate-none"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
        
        {/* Button content */}
        <div className="relative flex items-center space-x-1 sm:space-x-2">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
          <span className="font-bold">SMART PLATFORM</span>
          <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
        
        {/* Pulsing border effect */}
        <div className="absolute inset-0 rounded-lg border border-white/40 animate-ping"></div>
      </button>

      <SmartPlatformModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}