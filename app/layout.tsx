import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/ui/Header'
import WhatsAppWidget from './components/ui/WhatsAppWidget'

import TFLLogo from './components/ui/TFLLogo'
import SIALogo from './components/ui/SIALogo'
import MobileAppBanner from './components/ui/MobileAppBanner'
import { NextAuthProvider } from './providers/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GQ Cars LTD - SIA Licensed Security Taxi Service | Professional Drivers | London & Watford',
  description: 'Premium security taxi service with SIA Licensed Close Protection Officers. Smart booking technology, professional drivers covering London, Watford, and all major airports. Book now: 07407 655 203',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <NextAuthProvider>
          <Header />
          <WhatsAppWidget />
          <MobileAppBanner />
          <main className="pt-16">{children}</main>
        <footer className="bg-black/80 border-t border-gray-800 py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold text-yellow-500 mb-4">GQ Cars LTD</h3>
                <p className="text-sm text-gray-400">Premium <span className="text-blue-400">smart security taxi service</span> with <span className="text-yellow-500">SIA licensed Close Protection Officers</span>. Advanced technology meets professional security across London, Watford, and all major airports.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">SIA LICENSED</span>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded font-bold">CPO TRAINED</span>
                  <span className="bg-purple-600 text-white px-2 py-1 rounded font-bold">SMART TECH</span>
                </div>
                
                {/* Official Licensing Logos */}
                <div className="mt-6">
                  <p className="text-sm font-semibold text-white mb-3">Licensed & Regulated By:</p>
                  <div className="flex space-x-4">
                    <TFLLogo className="w-24 h-14" />
                    <SIALogo className="w-24 h-14" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/services/taxi" className="hover:text-yellow-500">Taxi Service</a></li>
                  <li><a href="/services/private-hire" className="hover:text-yellow-500">Private Hire</a></li>
                  <li><a href="/services/airport" className="hover:text-yellow-500">Airport Transfers</a></li>
                  <li><a href="/services/corporate" className="hover:text-yellow-500">Corporate Transport</a></li>
                  <li><a href="/services/close-protection" className="hover:text-yellow-500">Security Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-yellow-500">About Us</a></li>
                  <li><a href="/team" className="hover:text-yellow-500">Our Team</a></li>
                  <li><a href="/contact" className="hover:text-yellow-500">Contact</a></li>
                  <li><a href="/careers" className="hover:text-yellow-500">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>24/7 Bookings: 07407 655 203</li>
                  <li>Email: gqcars@giquinaholdings.com</li>
                  <li>Watford & Hertfordshire</li>
                  <li>Central London & All Airports</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
              <p>&copy; {new Date().getFullYear()} GQ Cars LTD. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="hover:text-yellow-500">Privacy Policy</a>
                <a href="/terms" className="hover:text-yellow-500">Terms of Service</a>
                <a href="/cookies" className="hover:text-yellow-500">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
        </NextAuthProvider>
      </body>
    </html>
  )
}