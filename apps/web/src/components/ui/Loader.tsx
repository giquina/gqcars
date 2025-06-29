'use client'

import { Loader2 } from 'lucide-react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function Loader({ size = 'md', text, className = '' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-yellow-500`} />
      {text && (
        <p className="mt-2 text-sm text-gray-400">{text}</p>
      )}
    </div>
  )
}

// Full screen loader
export function FullScreenLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-yellow-500 mx-auto mb-4" />
        <p className="text-white text-lg">{text}</p>
      </div>
    </div>
  )
}

// Page loader
export function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <Loader2 className="w-16 h-16 animate-spin text-yellow-500 mx-auto mb-6" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">GQ Cars</h2>
        <p className="text-gray-400">Loading your secure transport experience...</p>
      </div>
    </div>
  )
}

// Button loader
export function ButtonLoader({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  return (
    <Loader2 className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'} animate-spin`} />
  )
}