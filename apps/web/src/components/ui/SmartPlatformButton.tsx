'use client'

import { useState } from 'react'
import { Verified } from 'lucide-react'
import SmartPlatformModal from './SmartPlatformModal'

export default function SmartPlatformButton({ className = '' }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`bg-gradient-to-r from-blue-500 via-purple-500 to-yellow-500 hover:from-blue-600 hover:via-purple-600 hover:to-yellow-600 text-white px-6 py-3 rounded-lg font-bold text-base flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg border border-white/20 group ${className}`}
      >
        <Verified className="w-5 h-5" />
        <span>Licensed & Certified</span>
      </button>

      <SmartPlatformModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}