'use client'

import { useState } from 'react'
import { Menu, X, Shield, Phone, Award, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const navigationItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'Close Protection', href: '/services/close-protection' },
        { name: 'Private Hire', href: '/services/private-hire' },
        { name: 'Corporate Security', href: '/services/corporate' },
        { name: 'VIP Protection', href: '/services/vip' },
        { name: 'Wedding Security', href: '/services/weddings' },
        { name: 'Event Security', href: '/services/events' },
      ]
    },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
      {/* Trust Bar */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-green-500" />
                <span className="text-gray-300">SIA Licensed</span>
              </span>
              <span className="flex items-center space-x-1">
                <Award className="w-3 h-3 text-amber-500" />
                <span className="text-gray-300">Award Winner 2023</span>
              </span>
              <span className="hidden md:flex items-center space-x-1 text-gray-300">
                <span>⭐ 4.9/5 Rating</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-xs">24/7 Emergency Response</span>
              <a 
                href="tel:+442012345678" 
                className="text-amber-500 hover:text-amber-400 font-medium text-xs"
              >
                +44 (0) 20 1234 5678
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-amber-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">GQ Security</h1>
              <p className="text-xs text-gray-400">Elite Protection Services</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center space-x-1 text-gray-300 hover:text-amber-500 transition-colors font-medium"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    {/* Services Dropdown */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                        <div className="py-2">
                          {item.dropdown.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-300 hover:text-amber-500 hover:bg-slate-700 transition-colors"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="text-gray-300 hover:text-amber-500 transition-colors font-medium"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Free Security Assessment
            </a>
            <a
              href="tel:+442012345678"
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:block">Emergency</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700">
          <div className="container mx-auto px-4 py-6">
            
            {/* Mobile Navigation Links */}
            <nav className="space-y-4 mb-6">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div className="text-white font-medium text-lg mb-2">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-gray-300 hover:text-amber-500 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="block text-white font-medium text-lg hover:text-amber-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="space-y-3 pt-6 border-t border-slate-700">
              <a
                href="/contact"
                className="block w-full bg-gradient-to-r from-blue-600 to-amber-600 text-white text-center py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Free Security Assessment
              </a>
              <a
                href="tel:+442012345678"
                className="flex items-center justify-center space-x-2 w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Phone className="w-5 h-5" />
                <span>Emergency: +44 (0) 20 1234 5678</span>
              </a>
            </div>

            {/* Mobile Trust Signals */}
            <div className="pt-6 border-t border-slate-700 mt-6">
              <div className="grid grid-cols-2 gap-4 text-center text-sm">
                <div className="flex items-center justify-center space-x-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-gray-300">SIA Licensed</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="text-gray-300">Award Winner</span>
                </div>
                <div className="flex items-center justify-center space-x-1 col-span-2">
                  <span className="text-amber-500">⭐⭐⭐⭐⭐</span>
                  <span className="text-gray-300">4.9/5 Rating • 500+ Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}