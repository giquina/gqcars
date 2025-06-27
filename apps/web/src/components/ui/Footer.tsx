'use client'

import React, { useState, useEffect, useRef } from 'react'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield, 
  Star, 
  ChevronUp,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react'

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer 
        ref={footerRef}
        className={`relative bg-gradient-to-b from-slate-900 to-black text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500" />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <div className="group">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4 transition-all duration-300 group-hover:scale-105">
                  GQ CARS LTD
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Professional security transport services with SIA licensed Close Protection Officers. 
                  Your safety and comfort are our top priorities.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2 bg-blue-600/20 px-3 py-2 rounded-full transition-all duration-300 hover:bg-blue-600/30 hover:scale-105">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-semibold">SIA Licensed</span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-600/20 px-3 py-2 rounded-full transition-all duration-300 hover:bg-yellow-600/30 hover:scale-105">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-semibold">5-Star Service</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={`space-y-6 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
              <nav className="space-y-3">
                {[
                  { label: 'Private Hire', href: '/services/private-hire' },
                  { label: 'Close Protection', href: '/services/close-protection' },
                  { label: 'Airport Transfers', href: '/services/airport' },
                  { label: 'Corporate Transport', href: '/services/corporate' },
                  { label: 'Wedding Services', href: '/services/weddings' },
                  { label: 'Family Office', href: '/services/family-office' }
                ].map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-2 relative group"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <span className="relative">
                      {link.label}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className={`space-y-6 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <div className="space-y-4">
                <a
                  href="tel:07407655203"
                  className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-semibold">07407 655 203</p>
                    <p className="text-sm text-gray-400">24/7 Emergency Line</p>
                  </div>
                </a>

                <a
                  href="mailto:info@gqcars.co.uk"
                  className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold">info@gqcars.co.uk</p>
                    <p className="text-sm text-gray-400">Business Inquiries</p>
                  </div>
                </a>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold">London & Watford</p>
                    <p className="text-sm text-gray-400">Service Areas</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-gray-300">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-semibold">24/7 Available</p>
                    <p className="text-sm text-gray-400">Always Ready</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className={`space-y-6 transition-all duration-700 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              <h4 className="text-lg font-semibold text-white mb-4">Stay Connected</h4>
              
              {/* Newsletter Signup */}
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">Get updates on our latest services and security insights.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-500 text-white placeholder-gray-400 transition-all duration-300"
                  />
                  <button className="btn-secondary text-xs px-4 py-2 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-sm text-gray-400 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  {[
                    { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
                    { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className={`p-2 bg-gray-800/50 rounded-lg text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-gray-700/50`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={`mt-12 pt-8 border-t border-gray-800 transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {currentYear} GQ Cars LTD. All rights reserved. | SIA Licensed Security Transport
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Professional • Secure • Reliable • Premium Service
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="/privacy" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="/cookies" className="text-gray-400 hover:text-yellow-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:from-yellow-400 hover:to-orange-400 mobile-touch-target ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
}