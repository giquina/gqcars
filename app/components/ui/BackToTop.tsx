'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-blue-600 to-amber-600 hover:from-blue-700 hover:to-amber-700 text-white w-12 h-12 rounded-full shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
      aria-label="Back to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
}
