'use client'

import { useState } from 'react'
import { Menu, Phone } from 'lucide-react'
import MobileMenu from './MobileMenu'
import GQCarsLogo from './GQCarsLogo'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed w-full z-50 bg-black/95 backdrop-blur-lg border-b border-gray-800">
        <nav className="container mx-auto px-4 py-2 sm:py-3 flex items-center justify-between">
          {/* Mobile Menu Button - TOP LEFT - BIGGER */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              className="lg:hidden p-2 sm:p-3 text-white hover:text-yellow-500 transition-colors bg-gray-800 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Logo and Brand - AFTER HAMBURGER */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <GQCarsLogo className="w-8 h-8 sm:w-10 sm:h-10" />
              <div>
                <a href="/" className="text-base sm:text-xl font-bold tracking-wider text-yellow-500">GQ CARS LTD</a>
                <p className="text-xs text-gray-400 hidden sm:block">Professional • SIA Licensed • CPO Trained • Premium Transport</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation - WITH FAMILY SERVICES */}
          <div className="hidden lg:flex items-center space-x-4 text-sm text-white">
            <a href="/services/taxi" className="hover:text-yellow-500 transition-colors px-3 py-2 border-r border-gray-600">Taxi</a>
            <a href="/services/private-hire" className="hover:text-yellow-500 transition-colors px-3 py-2 border-r border-gray-600">Private Hire</a>
            <a href="/services/close-protection" className="hover:text-yellow-500 transition-colors px-3 py-2 border-r border-gray-600">SIA Security</a>
            <a href="/services/family-office" className="hover:text-yellow-500 transition-colors px-3 py-2 border-r border-gray-600">Family Office</a>
            <a href="/services/corporate" className="hover:text-yellow-500 transition-colors px-3 py-2 border-r border-gray-600">Corporate</a>
            <a href="/services/airport" className="hover:text-yellow-500 transition-colors px-3 py-2 border-r border-gray-600">Airports</a>
            <a href="/book" className="bg-gradient-to-r from-blue-600 to-yellow-500 text-white px-4 py-2 hover:opacity-90 transition-opacity rounded ml-4">Book</a>
          </div>

          {/* Phone Number - ALWAYS VISIBLE ON RIGHT */}
          <div className="flex items-center">
            <a 
              href="tel:07407655203" 
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-2 rounded font-bold text-sm flex items-center space-x-2 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">07407 655 203</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}