'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed w-full z-50 bg-gq-black/90 backdrop-blur-lg border-b border-gq-accent/10">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold tracking-wider text-gq-gold">GQ SECURITY</a>
          <div className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider">
            <a href="/services/close-protection" className="hover:text-gq-gold transition-colors">Close Protection</a>
            <a href="/services/private-hire" className="hover:text-gq-gold transition-colors">Private Hire</a>
            <a href="/services/corporate" className="hover:text-gq-gold transition-colors">Corporate</a>
            <a href="/services/weddings" className="hover:text-gq-gold transition-colors">Weddings</a>
            <a href="/services/vip" className="hover:text-gq-gold transition-colors">VIP Services</a>
            <a href="/contact" className="bg-gradient-to-r from-gq-blue to-gq-gold text-white px-6 py-2 hover:opacity-90 transition-opacity">Book Now</a>
          </div>
          <button
            className="md:hidden p-2 hover:text-gq-gold transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}