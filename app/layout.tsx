import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GQ Security Services - Professional Close Protection & Private Hire',
  description: 'Elite security services including SIA licensed close protection officers and luxury private hire drivers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white min-h-screen`}>
        <nav className="fixed w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 z-50">
          <div className="container mx-auto flex flex-wrap justify-between items-center p-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent">
              GQ SECURITY
            </h1>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="hover:text-amber-500 transition-colors">Home</a>
              <a href="/services/close-protection" className="hover:text-amber-500 transition-colors">Close Protection</a>
              <a href="/services/private-hire" className="hover:text-amber-500 transition-colors">Private Hire</a>
              <a href="/services/corporate" className="hover:text-amber-500 transition-colors">Corporate</a>
              <a href="/contact" className="hover:text-amber-500 transition-colors">Contact</a>
            </div>
            <button className="md:hidden text-amber-500">
              Menu
            </button>
          </div>
        </nav>
        
        {/* Mobile menu - hidden by default */}
        <div className="hidden fixed inset-0 bg-slate-900/95 z-40">
          <div className="container mx-auto px-4 py-20 space-y-8 text-center">
            <a href="/" className="block text-xl hover:text-amber-500 transition-colors">Home</a>
            <a href="/services/close-protection" className="block text-xl hover:text-amber-500 transition-colors">Close Protection</a>
            <a href="/services/private-hire" className="block text-xl hover:text-amber-500 transition-colors">Private Hire</a>
            <a href="/services/corporate" className="block text-xl hover:text-amber-500 transition-colors">Corporate</a>
            <a href="/contact" className="block text-xl hover:text-amber-500 transition-colors">Contact</a>
          </div>
        </div>

        <main className="pt-16">{children}</main>
        
        <footer className="bg-slate-800/50 border-t border-slate-700 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-500 mb-4">GQ Security</h3>
                <p className="text-gray-400">Professional security services with unmatched excellence.</p>
              </div>
              <div>
                <h4 className="font-bold text-blue-500 mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/services/close-protection" className="hover:text-amber-500 transition-colors">Close Protection</a></li>
                  <li><a href="/services/private-hire" className="hover:text-amber-500 transition-colors">Private Hire</a></li>
                  <li><a href="/services/corporate" className="hover:text-amber-500 transition-colors">Corporate Security</a></li>
                  <li><a href="/services/events" className="hover:text-amber-500 transition-colors">Event Security</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-500 mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/about" className="hover:text-amber-500 transition-colors">About Us</a></li>
                  <li><a href="/contact" className="hover:text-amber-500 transition-colors">Contact</a></li>
                  <li><a href="/careers" className="hover:text-amber-500 transition-colors">Careers</a></li>
                  <li><a href="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-500 mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>London, United Kingdom</li>
                  <li>+44 20 XXXX XXXX</li>
                  <li>24/7 Emergency Response</li>
                  <li>info@gqsecurity.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} GQ Security Services. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}