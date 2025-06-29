'use client'

import { Shield, Clock, MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
import { BoldAnimatedBackground, BoldCard } from './BoldDynamicComponents'

export default function Footer() {
  return (
    <BoldAnimatedBackground>
      <footer className="relative pt-20 pb-8 z-10">
        <div className="container mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <BoldCard animated glowing>
              <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🚗 GQ CARS LTD
              </h3>
              <p className="text-gray-300 font-semibold mb-6">
                🛡️ Professional security transport services with SIA licensed drivers across London.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="https://linkedin.com" className="text-gray-400 hover:text-yellow-400 transition-colors p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="https://facebook.com" className="text-gray-400 hover:text-yellow-400 transition-colors p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="https://instagram.com" className="text-gray-400 hover:text-yellow-400 transition-colors p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </BoldCard>

            {/* Quick Links */}
            <BoldCard animated glowing>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🔗 QUICK LINKS
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">⚡ About Us</Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🛡️ Our Services</Link>
                </li>
                <li>
                  <Link href="/booking" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🔥 Book Now</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">📞 Contact</Link>
                </li>
              </ul>
            </BoldCard>

            {/* Services */}
            <BoldCard animated glowing>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🏆 SERVICES
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">Executive Protection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">24/7 Availability</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">London & Surrounding</span>
                </li>
              </ul>
            </BoldCard>

            {/* Contact Info */}
            <BoldCard animated glowing>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                📱 CONTACT US
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <a href="tel:07407655203" className="text-white hover:text-yellow-400 transition-colors font-semibold">07407 655 203</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <a href="mailto:info@gqcars.co.uk" className="text-white hover:text-yellow-400 transition-colors font-semibold">info@gqcars.co.uk</a>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                  <span className="text-white font-semibold">London, Watford & All Major Airports</span>
                </li>
              </ul>
            </BoldCard>
        </div>

          {/* Bottom Bar */}
          <div className="border-t border-yellow-400/30 pt-8">
            <BoldCard glowing className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-white font-black">© 2024 GQ CARS LTD. ALL RIGHTS RESERVED. 🔥</p>
                <div className="flex space-x-6 text-sm">
                  <Link href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🔒 Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">📜 Terms of Service</Link>
                  <Link href="/cookies" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🍪 Cookie Policy</Link>
                </div>
              </div>
            </BoldCard>
          </div>
        </div>
      </footer>
    </BoldAnimatedBackground>
  )
}