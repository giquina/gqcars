'use client'

import { useState, useEffect } from 'react'
import { Menu, Phone } from 'lucide-react'
import MobileMenu from './MobileMenu'
import GQCarsLogo from './GQCarsLogo'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Enhanced scroll behavior with hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 10)
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false) // Scrolling down
      } else {
        setIsVisible(true) // Scrolling up
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-lg border-b border-gray-800 shadow-lg' 
            : 'bg-black/80 backdrop-blur-sm border-b border-gray-800/50'
        }`}
      >
        <nav className="container mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Mobile Menu Button - Enhanced with Animation */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              className="lg:hidden p-2 sm:p-3 text-white hover:text-yellow-500 transition-all duration-300 bg-gray-800/50 hover:bg-gray-800 rounded-lg hover:scale-105 mobile-touch-target group"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Logo and Brand - Enhanced with Hover Effects */}
            <div className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <GQCarsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <div>
                <a 
                  href="/" 
                  className="text-base sm:text-xl font-bold tracking-wider text-yellow-500 hover:text-yellow-400 transition-all duration-300 group-hover:scale-105"
                >
                  GQ CARS LTD
                </a>
                <p className="text-xs text-gray-400 hidden sm:block transition-colors duration-300 group-hover:text-gray-300">
                  Professional • SIA Licensed • CPO Trained • Premium Transport
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Enhanced with Better Hover Effects */}
          <div className="hidden lg:flex items-center space-x-1 text-sm text-white">
            {[
              { href: '/services/taxi', label: 'Taxi' },
              { href: '/services/private-hire', label: 'Private Hire' },
              { href: '/services/close-protection', label: 'SIA Security' },
              { href: '/services/family-office', label: 'Family Office' },
              { href: '/services/corporate', label: 'Corporate' },
              { href: '/services/airport', label: 'Airports' }
            ].map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="relative hover:text-yellow-500 transition-all duration-300 px-3 py-2 rounded-lg hover:bg-white/5 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/10 group-hover:to-orange-500/10 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
            
            <a
              href="/book"
              className="btn-primary ml-4 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>Book Now</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:animate-bounce" />
              </span>
            </a>
          </div>

          {/* Enhanced Phone Number Button */}
          <div className="flex items-center">
            <a 
              href="tel:07407655203" 
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black px-4 py-3 rounded-lg font-bold text-sm flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25 mobile-touch-target transform"
            >
              <Phone className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <span className="hidden sm:inline">07407 655 203</span>
              <span className="sm:hidden">Call</span>
              
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </a>
          </div>
        </nav>

        {/* Enhanced Navigation Indicator for Mobile */}
        <div className={`lg:hidden absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`} />
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}