'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Car, Building2, Sparkles, Star, Phone, X, Briefcase, Users, Heart, Plane, ChevronRight, Crown, ShoppingBag, Zap, Calculator, Download, MessageCircle, Headphones, Clock, Award } from 'lucide-react'
import SmartPlatformButton from './SmartPlatformButton'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'services' | 'company' | 'support'>('services')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Reset to services tab when menu opens
    if (isOpen) {
      setActiveTab('services')
    }
  }, [isOpen])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-40"
          />

          {/* Full-screen app-like menu */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-900/98 via-purple-900/98 to-black/98 backdrop-blur-xl z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            <div className="flex flex-col h-full">
              {/* Enhanced Header with gradient */}
              <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative p-6 bg-gradient-to-r from-yellow-400/10 via-orange-400/10 to-yellow-400/10 border-b border-yellow-500/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 id="mobile-menu-title" className="text-2xl font-black text-yellow-400 uppercase tracking-wider">GQ Menu</h2>
                    <p className="text-sm text-gray-300 mt-1">Your premium transport services</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl transition-colors border border-yellow-500/30"
                    aria-label="Close mobile menu"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Priority Actions - Prominent Book Now */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 border-b border-yellow-500/10"
              >
                <motion.a
                  href="/book"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-3 w-full px-8 py-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-black font-black text-lg rounded-2xl shadow-2xl relative overflow-hidden group"
                >
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <Car className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">BOOK NOW</span>
                  <Sparkles className="w-6 h-6 animate-pulse relative z-10" />
                </motion.a>
              </motion.div>

              {/* Quick Actions Row */}
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="px-6 py-4 flex gap-3 overflow-x-auto"
              >
                <motion.a
                  href="/quote"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30 min-w-[90px] group"
                >
                  <Calculator className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />
                  <span className="text-xs text-blue-300 font-semibold">Quick Quote</span>
                </motion.a>
                
                <motion.a
                  href="tel:07407655203"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 bg-green-500/20 rounded-xl border border-green-400/30 min-w-[90px] group"
                >
                  <Phone className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                  <span className="text-xs text-green-300 font-semibold">Call Now</span>
                </motion.a>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 bg-purple-500/20 rounded-xl border border-purple-400/30 min-w-[90px] group"
                >
                  <Download className="w-6 h-6 text-purple-400 group-hover:animate-bounce" />
                  <span className="text-xs text-purple-300 font-semibold">Get App</span>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 p-4 bg-orange-500/20 rounded-xl border border-orange-400/30 min-w-[90px] group"
                >
                  <Headphones className="w-6 h-6 text-orange-400 group-hover:animate-pulse" />
                  <span className="text-xs text-orange-300 font-semibold">Support</span>
                </motion.div>
              </motion.div>

              {/* Tab Navigation */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex bg-gray-800/50 mx-6 rounded-xl p-1 mt-2"
              >
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="text-sm">{tab.label}</span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <AnimatePresence mode="wait">
                  {activeTab === 'services' && (
                    <motion.div
                      key="services"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      {services.map((service, index) => (
                        <motion.a
                          key={service.href}
                          href={service.href}
                          onClick={onClose}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-orange-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-yellow-500/30 group"
                        >
                          <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <service.icon className="w-6 h-6 text-yellow-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white group-hover:text-yellow-400 transition-colors">{service.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{service.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                        </motion.a>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'company' && (
                    <motion.div
                      key="company"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      {company.map((item, index) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-blue-500/30 group"
                        >
                          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <item.icon className="w-6 h-6 text-blue-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </motion.a>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'support' && (
                    <motion.div
                      key="support"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      {supportItems.map((item, index) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-green-500/30 group"
                        >
                          <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <item.icon className="w-6 h-6 text-green-400" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">{item.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Actions */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-6 border-t border-yellow-500/20 bg-gradient-to-r from-gray-900/50 to-black/50"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">SIA Licensed • TFL Approved • 24/7 Available</span>
                </div>
                <SmartPlatformButton className="w-full justify-center" />
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const tabs = [
  { id: 'services' as const, label: 'Services', icon: Car },
  { id: 'company' as const, label: 'Company', icon: Building2 },
  { id: 'support' as const, label: 'Support', icon: Headphones },
]

const services = [
  {
    href: "/services/taxi",
    name: "Taxi & Private Hire",
    description: "Professional taxi services with security-trained drivers",
    icon: Car,
  },
  {
    href: "/services/close-protection",
    name: "Close Protection",
    description: "Elite SIA-licensed close protection officers",
    icon: Shield,
  },
  {
    href: "/services/airport",
    name: "Airport Transfers",
    description: "Punctual transfers to all London airports",
    icon: Plane,
  },
  {
    href: "/services/corporate",
    name: "Corporate Transport",
    description: "Executive transport for business professionals",
    icon: Briefcase,
  },
  {
    href: "/services/family-office",
    name: "Family Office",
    description: "Coordinated transport for high-net-worth families",
    icon: Users,
  },
  {
    href: "/services/vip",
    name: "VIP & Events",
    description: "Premium transport for special occasions",
    icon: Crown,
  },
  {
    href: "/services/weddings",
    name: "Weddings",
    description: "Elegant transport for your special day",
    icon: Heart,
  },
  {
    href: "/services/diplomatic",
    name: "Diplomatic Services",
    description: "Protocol-aware transport for diplomatic missions",
    icon: Shield,
  },
  {
    href: "/services/lifestyle",
    name: "Lifestyle",
    description: "Personal transport for social engagements",
    icon: Zap,
  },
  {
    href: "/services/shopping",
    name: "Shopping Trips",
    description: "Discreet transport for luxury shopping",
    icon: ShoppingBag,
  },
]

const company = [
  { 
    name: 'About GQ Cars', 
    href: '/about', 
    icon: Building2,
    description: 'Learn about our premium security transport services'
  },
  { 
    name: 'Our Team', 
    href: '/team', 
    icon: Users,
    description: 'Meet our SIA-licensed security professionals'
  },
  { 
    name: 'Careers', 
    href: '/careers', 
    icon: Star,
    description: 'Join our elite team of security drivers'
  },
  { 
    name: 'Contact Us', 
    href: '/contact', 
    icon: MessageCircle,
    description: 'Get in touch with our team'
  }
]

const supportItems = [
  {
    name: 'Emergency Line',
    href: 'tel:07407655203',
    icon: Phone,
    description: '24/7 emergency support hotline'
  },
  {
    name: 'Live Chat',
    href: '#chat',
    icon: MessageCircle,
    description: 'Chat with our support team'
  },
  {
    name: 'Track Booking',
    href: '/track',
    icon: Clock,
    description: 'Real-time booking status updates'
  },
  {
    name: 'Help Center',
    href: '/help',
    icon: Headphones,
    description: 'FAQs and support documentation'
  }
]