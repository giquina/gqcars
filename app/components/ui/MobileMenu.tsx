'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Car, Building2, GlassWater, Star, Phone, X, LogIn, UserPlus } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onOpenAuth?: (mode: 'signin' | 'signup') => void
}

export default function MobileMenu({ isOpen, onClose, onOpenAuth }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-gq-black border-l border-gq-accent/10 z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gq-accent/10">
                <span className="text-xl font-bold text-gq-gold">GQ Security</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:text-gq-gold transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Services</h3>
                  <ul className="space-y-2">
                    {services.map((service) => (
                      <li key={service.href}>
                        <a
                          href={service.href}
                          onClick={onClose}
                          className="flex items-center gap-3 py-2 hover:text-gq-gold transition-colors"
                        >
                          <service.icon className="w-5 h-5" />
                          {service.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Company</h3>
                  <ul className="space-y-2">
                    {company.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          onClick={onClose}
                          className="block py-2 hover:text-gq-gold transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* Actions */}
              <div className="p-4 border-t border-gq-accent/10 space-y-3">
                {/* Book Now - Fixed to use consistent gradient */}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-gq-blue to-gq-gold text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Book Now
                  <Shield className="w-5 h-5" />
                </button>

                {/* Call Button */}
                <a
                  href="tel:07407655203"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-gq-gold text-gq-gold font-semibold rounded-lg hover:bg-gq-gold hover:text-gq-black transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call: 07407 655 203
                </a>

                {/* Auth Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      onOpenAuth?.('signin')
                      onClose()
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gq-gold hover:text-gq-gold transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth?.('signup')
                      onClose()
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-gq-blue to-gq-gold text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const services = [
  {
    name: 'Book Taxi',
    href: '/services/taxi',
    icon: Car
  },
  {
    name: 'Private Hire',
    href: '/services/private-hire',
    icon: Car
  },
  {
    name: 'Airport Transfer',
    href: '/services/airport',
    icon: Shield
  },
  {
    name: 'Corporate Transport',
    href: '/services/corporate',
    icon: Building2
  },
  {
    name: 'Security Services',
    href: '/services/close-protection',
    icon: Shield
  },
  {
    name: 'Family Office Services',
    href: '/services/family-office',
    icon: Star
  },
  {
    name: 'Family Security',
    href: '/services/family-protection',
    icon: Shield
  },
  {
    name: 'Wedding Transport',
    href: '/services/weddings',
    icon: GlassWater
  }
]

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Team', href: '/team' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' }
]