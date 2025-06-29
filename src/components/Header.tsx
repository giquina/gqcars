'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const services = [
    { name: 'Airport Transfers', href: '/services/airport', description: 'Reliable rides to and from the airport' },
    { name: 'VIP Transport', href: '/services/vip', description: 'Luxury car service for special occasions' },
    { name: 'Personal Security', href: '/services/close-protection', description: 'Professional protection officers' },
    { name: 'Corporate Travel', href: '/services/corporate', description: 'Business transportation solutions' },
    { name: 'Event Security', href: '/services/weddings', description: 'Security for weddings and events' },
    { name: 'Shopping Trips', href: '/services/shopping', description: 'Safe transport for shopping' },
    { name: 'Private Hire', href: '/services/private-hire', description: 'Book a car with driver' },
    { name: 'Taxi Service', href: '/services/taxi', description: 'Standard taxi service' },
  ]

  return (
    <header className="bg-black/90 backdrop-blur-md border-b border-blue-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            GQ CARS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-white hover:text-blue-400 transition-colors">
                Services
              </button>
              <div className="absolute top-full left-0 w-80 bg-black/95 border border-blue-500/30 rounded-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="grid grid-cols-1 gap-2">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block p-3 rounded-lg hover:bg-blue-500/20 transition-colors"
                    >
                      <div className="font-semibold text-blue-400">{service.name}</div>
                      <div className="text-sm text-gray-300">{service.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/book" className="text-white hover:text-blue-400 transition-colors">
              Book Now
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500/30">
            <div className="space-y-2">
              <Link
                href="/"
                className="block px-4 py-2 text-white hover:bg-blue-500/20 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <div className="px-4 py-2">
                <div className="font-semibold text-blue-400 mb-2">Our Services</div>
                <div className="space-y-1 ml-4">
                  {services.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block py-1 text-sm text-gray-300 hover:text-blue-400"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/book"
                className="block px-4 py-2 text-white hover:bg-blue-500/20 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-2 text-white hover:bg-blue-500/20 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}