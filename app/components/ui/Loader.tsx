'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function Loader({ size = 'md', text }: LoaderProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }}
      >
        <Shield className={`${sizes[size]} text-gq-gold`} />
      </motion.div>
      {text && (
        <p className="mt-4 text-sm text-gray-400">{text}</p>
      )}
    </div>
  )
}