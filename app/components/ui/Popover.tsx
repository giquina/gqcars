'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PopoverProps {
  trigger: ReactNode
  content: ReactNode
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Popover({
  trigger,
  content,
  isOpen: controlledOpen,
  onOpenChange,
  className = '',
  align = 'start',
  side = 'bottom'
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setIsOpen = onOpenChange || setInternalOpen

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  // Close on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, setIsOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const getAlignmentClass = () => {
    switch (align) {
      case 'center':
        return 'left-1/2 -translate-x-1/2'
      case 'end':
        return 'right-0'
      default:
        return 'left-0'
    }
  }

  const getSideClass = () => {
    switch (side) {
      case 'top':
        return 'bottom-full mb-2'
      case 'left':
        return 'right-full mr-2 top-0'
      case 'right':
        return 'left-full ml-2 top-0'
      default:
        return 'top-full mt-2'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={triggerRef} onClick={toggleOpen}>
        {trigger}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <div className={`absolute z-50 ${getSideClass()} ${getAlignmentClass()}`}>
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
              style={{ minWidth: '240px' }}
            >
              {content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}