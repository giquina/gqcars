'use client'

import { Shield } from 'lucide-react'

interface ImagePlaceholderProps {
  className?: string
  text?: string
}

export default function ImagePlaceholder({ className = '', text }: ImagePlaceholderProps) {
  return (
    <div className={`bg-gradient-to-br from-gq-blue to-gq-black flex items-center justify-center ${className}`}>
      <div className="text-center">
        <Shield className="w-12 h-12 text-gq-gold mx-auto mb-4 opacity-50" />
        {text && (
          <p className="text-sm text-gray-400">{text}</p>
        )}
      </div>
    </div>
  )
}