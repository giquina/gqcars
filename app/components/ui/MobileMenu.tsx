'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, Car, Building2, GlassWater, Star, Phone, X, LogIn, UserPlus,
  Plane, Crown, Users, Heart, Briefcase, MapPin, Clock, Award,
  UserCheck, ShieldCheck, Camera, Sparkles
} from 'lucide-react'

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
  }, [])

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
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
          />

          {/* Enhanced Menu - Now takes up more screen space */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 w-full bg-gradient-to-br from-gq-black via-gray-900 to-gq-black border-l border-gq-accent/20 z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gq-accent/20 bg-gradient-to-r from-gq-blue/10 to-gq-gold/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-gq-blue to-gq-gold rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gq-gold">GQ Security</span>
                    <p className="text-xs text-gray-400">Premium Transport & Security</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:text-gq-gold transition-colors rounded-full hover:bg-white/5"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Main Services Grid - No scrolling needed */}
              <div className="flex-1 px-4 py-4 overflow-hidden">
                {/* Quick Actions */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gq-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Quick Book
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <motion.a
                        key={action.href}
                        href={action.href}
                        onClick={onClose}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gq-blue/20 to-gq-gold/20 hover:from-gq-blue/30 hover:to-gq-gold/30 transition-all border border-gq-accent/10 hover:border-gq-accent/30"
                      >
                        <action.icon className="w-5 h-5 text-gq-gold" />
                        <div>
                          <div className="font-semibold text-sm text-white">{action.name}</div>
                          <div className="text-xs text-gray-400">{action.description}</div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Premium Services */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-gq-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Premium Services
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {premiumServices.map((service, index) => (
                      <motion.a
                        key={service.href}
                        href={service.href}
                        onClick={onClose}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 hover:bg-gradient-to-r hover:from-gq-blue/20 hover:to-gq-gold/20 transition-all border border-transparent hover:border-gq-accent/20"
                      >
                        <service.icon className="w-4 h-4 text-gq-gold" />
                        <span className="text-sm font-medium text-white">{service.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Security & Protection */}
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gq-gold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Security & Protection
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {securityServices.map((service, index) => (
                      <motion.a
                        key={service.href}
                        href={service.href}
                        onClick={onClose}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 p-2 rounded-lg bg-red-900/20 hover:bg-red-900/30 transition-all border border-red-500/20 hover:border-red-500/40"
                      >
                        <service.icon className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-white">{service.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 border-t border-gq-accent/20 bg-gradient-to-r from-gq-blue/5 to-gq-gold/5">
                {/* Primary CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-4 mb-3 bg-gradient-to-r from-gq-blue to-gq-gold text-white font-bold rounded-xl hover:shadow-lg hover:shadow-gq-gold/25 transition-all"
                >
                  <Car className="w-5 h-5" />
                  Book Now - Instant Quote
                </motion.button>

                {/* Contact & Auth */}
                <div className="flex gap-2 mb-3">
                  <a
                    href="tel:07407655203"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-gq-gold text-gq-gold font-semibold rounded-lg hover:bg-gq-gold hover:text-gq-black transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href="/contact"
                    onClick={onClose}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gq-gold hover:text-gq-gold transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Contact
                  </a>
                </div>

                {/* Auth Row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onOpenAuth?.('signin')
                      onClose()
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-gq-gold hover:text-gq-gold transition-colors text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onOpenAuth?.('signup')
                      onClose()
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-gq-blue/80 to-gq-gold/80 text-white rounded-lg hover:from-gq-blue hover:to-gq-gold transition-all text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
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

// Quick Actions - Most used services
const quickActions = [
  {
    name: 'Book Taxi',
    description: 'Instant booking',
    href: '/services/taxi',
    icon: Car
  },
  {
    name: 'Private Hire',
    description: 'Premium travel',
    href: '/services/private-hire',
    icon: Car
  },
  {
    name: 'Airport Transfer',
    description: 'Reliable service',
    href: '/services/airport',
    icon: Plane
  },
  {
    name: 'Get Quote',
    description: 'Instant pricing',
    href: '/quote',
    icon: Clock
  }
]

// Premium Services
const premiumServices = [
  {
    name: 'VIP Experiences',
    href: '/services/vip-experiences',
    icon: Crown
  },
  {
    name: 'Corporate Transport',
    href: '/services/corporate',
    icon: Building2
  },
  {
    name: 'Wedding Transport',
    href: '/services/weddings',
    icon: Heart
  },
  {
    name: 'Family Office',
    href: '/services/family-office',
    icon: Star
  },
  {
    name: 'VIP Services',
    href: '/services/vip',
    icon: Award
  },
  {
    name: 'Professional Support',
    href: '/services/professional-support',
    icon: Briefcase
  }
]

// Security Services
const securityServices = [
  {
    name: 'Close Protection',
    href: '/services/close-protection',
    icon: Shield
  },
  {
    name: 'Security Assessment',
    href: '/security-assessment',
    icon: ShieldCheck
  },
  {
    name: 'Family Security',
    href: '/services/family-security',
    icon: Users
  },
  {
    name: 'Executive Protection',
    href: '/services/professional-support',
    icon: UserCheck
  }
]