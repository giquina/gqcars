import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/ui/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GQ Security Services - Professional Close Protection & Private Hire',
  description: 'SIA licensed close protection officers and professional private hire drivers for corporate, wedding, and VIP clients.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gq-black text-white`}>
        <Header />
        <main className="pt-16">{children}</main>
        <footer className="bg-gq-black/50 border-t border-gq-accent/10 py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold text-gq-gold mb-4">GQ Security Services</h3>
                <p className="text-sm text-gray-400">Professional close protection and private hire services for discerning clients.</p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/services/close-protection" className="hover:text-gq-gold">Close Protection</a></li>
                  <li><a href="/services/private-hire" className="hover:text-gq-gold">Private Hire</a></li>
                  <li><a href="/services/corporate" className="hover:text-gq-gold">Corporate Security</a></li>
                  <li><a href="/services/weddings" className="hover:text-gq-gold">Wedding Security</a></li>
                  <li><a href="/services/vip" className="hover:text-gq-gold">VIP Services</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/about" className="hover:text-gq-gold">About Us</a></li>
                  <li><a href="/team" className="hover:text-gq-gold">Our Team</a></li>
                  <li><a href="/contact" className="hover:text-gq-gold">Contact</a></li>
                  <li><a href="/careers" className="hover:text-gq-gold">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>24/7 Emergency: +44 20 XXXX XXXX</li>
                  <li>Email: info@gqsecurity.co.uk</li>
                  <li>London Office: XX Business Centre</li>
                  <li>Manchester Office: XX Corporate Park</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gq-accent/10 mt-8 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
              <p>&copy; {new Date().getFullYear()} GQ Security Services. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="hover:text-gq-gold">Privacy Policy</a>
                <a href="/terms" className="hover:text-gq-gold">Terms of Service</a>
                <a href="/cookies" className="hover:text-gq-gold">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}