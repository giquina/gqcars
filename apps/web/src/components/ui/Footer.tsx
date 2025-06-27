'use client'

import { Shield, Clock, MapPin, Phone, Mail, Linkedin, Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">GQ Cars LTD</h3>
            <p className="text-sm mb-4">Professional security transport services with SIA licensed drivers.</p>
            <div className="flex items-center space-x-4">
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-white transition-colors">Book Now</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span>Executive Protection</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span>24/7 Availability</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <span>London & Surrounding</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-500" />
                <a href="tel:07407655203" className="hover:text-white transition-colors">07407 655 203</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-500" />
                <a href="mailto:info@gqcars.co.uk" className="hover:text-white transition-colors">info@gqcars.co.uk</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-yellow-500 mt-1" />
                <span>London, Watford & All Major Airports</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm">© 2024 GQ Cars LTD. All rights reserved.</p>
            <div className="flex space-x-4 text-sm">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}