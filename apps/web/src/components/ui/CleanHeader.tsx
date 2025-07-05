'use client'

import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export default function CleanHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">GQ Cars</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="/services/airport" className="text-gray-700 hover:text-gray-900 font-medium">Airport</a>
            <a href="/services/vip" className="text-gray-700 hover:text-gray-900 font-medium">VIP</a>
            <a href="/services/taxi" className="text-gray-700 hover:text-gray-900 font-medium">Taxi</a>
            <a href="/services/close-protection" className="text-gray-700 hover:text-gray-900 font-medium">Security</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:07407655203"
              className="text-gray-700 hover:text-gray-900 font-medium inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              07407 655 203
            </a>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded-lg transition-colors">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              <a 
                href="/"
                className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/services/airport"
                className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Airport Transfers
              </a>
              <a 
                href="/services/vip"
                className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                VIP Transport
              </a>
              <a 
                href="/services/taxi"
                className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Taxi Service
              </a>
              <a 
                href="/services/close-protection"
                className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Personal Security
              </a>
              <div className="pt-4 space-y-3">
                <a 
                  href="tel:07407655203"
                  className="block w-full text-center border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
                >
                  Call: 07407 655 203
                </a>
                <button className="block w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-colors">
                  Book Now
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}