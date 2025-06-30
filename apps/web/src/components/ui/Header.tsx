'use client'

import { useState, useEffect } from 'react'
import { Menu, Phone, Zap, Shield, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import MobileMenu from './MobileMenu'
import GQCarsLogo from './GQCarsLogo'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-gradient-to-r from-blue-900/98 via-purple-900/98 to-black/98 backdrop-blur-xl shadow-2xl' 
            : 'bg-gradient-to-r from-blue-900/90 via-purple-900/90 to-black/90 backdrop-blur-lg'
        }`}
      >
        {/* Glassmorphic animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-yellow-400/20 blur-sm"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 animate-pulse"></div>
        
        <nav className="relative container mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Mobile Menu Button - Enhanced with ripple effect */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden relative p-2 sm:p-3 text-white hover:text-yellow-400 transition-all duration-300 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-400/30 hover:border-yellow-400/60 backdrop-blur-sm group overflow-hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {/* Ripple effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Menu className="w-6 h-6 sm:w-8 sm:h-8 relative z-10 transition-transform group-hover:rotate-180 duration-300" />
            </motion.button>

            {/* Logo and Brand - Enhanced with animations */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <GQCarsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              </motion.div>
              <div>
                <motion.a 
                  href="/" 
                  whileHover={{ scale: 1.05 }}
                  className="text-base sm:text-xl font-black tracking-wider bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent hover:from-yellow-300 hover:via-orange-400 hover:to-yellow-300 transition-all duration-300"
                >
                  GQ CARS LTD
                </motion.a>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs text-gray-300 hidden sm:block font-semibold"
                >
                  <Shield className="w-3 h-3 inline mr-1 text-green-400 animate-pulse" />Professional • 
                  <Zap className="w-3 h-3 inline mr-1 text-yellow-400 animate-bounce" />SIA Licensed • 
                  <Shield className="w-3 h-3 inline mr-1 text-blue-400 animate-pulse" />CPO Trained • Premium Transport
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Desktop Navigation - Enhanced with glassmorphic hover effects */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center space-x-1 text-sm text-white"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
                className="relative px-4 py-2 hover:text-yellow-400 transition-all duration-300 rounded-lg group overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10">{item.label}</span>
                {/* Animated border */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 to-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </motion.a>
            ))}
            
            {/* Enhanced Book Button */}
            <motion.a
              href="/book"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(234, 179, 8, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 text-white font-bold rounded-xl overflow-hidden group transition-all duration-300"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <span className="relative z-10 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Book Now</span>
              </span>
            </motion.a>
          </motion.div>

          {/* Enhanced Phone Button */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center"
          >
            <motion.a
              href="tel:07407655203"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(234, 179, 8, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-4 py-2 rounded-xl font-bold text-sm flex items-center space-x-2 transition-all duration-300 overflow-hidden group"
            >
              {/* Pulse animation */}
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
              <Phone className="w-4 h-4 relative z-10 group-hover:animate-bounce" />
              <span className="hidden sm:inline relative z-10">07407 655 203</span>
              <span className="sm:hidden relative z-10">Call</span>
            </motion.a>
          </motion.div>
        </nav>
      </motion.header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

const navItems = [
  { href: "/services/taxi", label: "Taxi" },
  { href: "/services/private-hire", label: "Private Hire" },
  { href: "/services/close-protection", label: "SIA Security" },
  { href: "/services/family-office", label: "Family Office" },
  { href: "/services/corporate", label: "Corporate" },
  { href: "/services/airport", label: "Airports" },
]