'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Car, Building2, Sparkles, Star, Phone, X, Briefcase, Users, Heart, Plane, ChevronRight, Crown, ShoppingBag, Zap } from 'lucide-react'
import SmartPlatformButton from './SmartPlatformButton'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-gray-900/95 backdrop-blur-sm border-l border-yellow-500/20 z-50"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-yellow-500/20">
                <span className="text-xl font-bold text-yellow-500 uppercase tracking-wider">MENU</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:text-yellow-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Services</h3>
                  <ul className="space-y-1">
                    {services.map((service) => (
                      <li key={service.href}>
                        <a
                          href={service.href}
                          onClick={onClose}
                          className="flex flex-col gap-1 py-3 px-4 hover:bg-yellow-500/10 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <service.icon className="w-5 h-5 text-yellow-500" />
                            <span className="font-semibold text-white">{service.label}</span>
                          </div>
                          <p className="pl-8 text-xs text-gray-400">{service.description}</p>
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
                          className="block py-2 px-4 hover:bg-yellow-500/10 rounded-lg transition-colors"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* Actions */}
              <div className="p-4 border-t border-yellow-500/20 space-y-3">
                <SmartPlatformButton className="w-full justify-center" />
                <a
                  href="/quote"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-base hover:opacity-90 transition-opacity rounded-lg"
                >
                  Enquire Now
                  <Car className="w-5 h-5" />
                </a>
                <a
                  href="tel:07407655203"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 border-2 border-yellow-500 text-yellow-500 font-bold text-base hover:bg-yellow-500 hover:text-black transition-colors rounded-lg"
                >
                  Call: 07407 655 203
                  <Phone className="w-5 h-5" />
                </a>
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
    href: "/services/private-hire",
    label: "Private Hire & Taxi",
    description: "Reliable, pre-booked car services with security drivers.",
    icon: Car,
  },
  {
    href: "/services/airport",
    label: "Airport Transfers",
    description: "Secure, punctual transfers to all London airports.",
    icon: Plane,
  },
  {
    href: "/services/corporate",
    label: "Corporate",
    description: "Executive transport for meetings, events, and roadshows.",
    icon: Briefcase,
  },
  {
    href: "/services/close-protection",
    label: "Close Protection",
    description: "Personal security from elite, SIA-licensed CPOs.",
    icon: Shield,
  },
  {
    href: "/services/family-office",
    label: "Family Office",
    description: "Coordinated security transport for HNW families.",
    icon: Users,
  },
  {
    href: "/services/weddings",
    label: "Weddings",
    description: "Elegant and secure transport for your special day.",
    icon: Heart,
  },
  {
    href: "/services/diplomatic",
    label: "Diplomatic",
    description: "Protocol-aware transport for government and state affairs.",
    icon: Shield,
  },
  {
    href: "/services/vip",
    label: "VIP & Events",
    description: "Secure transport for galas, premieres, and major events.",
    icon: Crown,
  },
  {
    href: "/services/shopping",
    label: "Luxury Shopping",
    description: "Discreet driver service for your London shopping trips.",
    icon: ShoppingBag,
  },
  {
    href: "/services/lifestyle",
    label: "Lifestyle",
    description: "On-demand transport for your social engagements.",
    icon: Zap,
  },
]

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Team', href: '/team' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' }
]