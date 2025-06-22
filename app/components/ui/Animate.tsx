'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

interface AnimateProps {
  children: ReactNode
  className?: string
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale'
  delay?: number
  duration?: number
}

export default function Animate({
  children,
  className = '',
  type = 'fade',
  delay = 0,
  duration = 0.5
}: AnimateProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    'slide-up': {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-down': {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    'slide-left': {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    'slide-right': {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  }

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[type]}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}