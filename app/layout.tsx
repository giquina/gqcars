import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GQ Security Services | Award-Winning Close Protection & Private Hire UK',
  description: 'SIA-licensed security professionals providing elite close protection, private hire, and corporate security services. 99.8% client satisfaction. Serving London, Birmingham, Manchester & nationwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        {/* Enhanced structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SecurityService",
              "name": "GQ Security Services",
              "description": "Professional close protection and private hire services across the UK",
              "url": "https://gqsecurity.co.uk",
              "telephone": "+44-20-1234-5678",
              "email": "info@gqsecurity.co.uk",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "GB",
                "addressRegion": "England"
              },
              "serviceArea": {
                "@type": "Country",
                "name": "United Kingdom"
              },
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "name": "SIA License",
                  "credentialCategory": "Security Industry Authority License"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "500"
              }
            })
          }}
        />
      </head>
      <body className="bg-slate-900 text-white">
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded">
          Skip to main content
        </a>
        
        <div id="main-content">
          {children}
        </div>
        
        {/* Enhanced footer with trust signals */}
        <footer className="bg-slate-800 border-t border-slate-700">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Company Info */}
              <div>
                <h3 className="text-lg font-bold mb-4 text-white">GQ Security Services</h3>
                <p className="text-gray-400 mb-4">Award-winning security professionals providing elite protection across the UK.</p>
                <div className="flex space-x-2">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">SIA Licensed</span>
                  <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">ISO 9001</span>
                </div>
              </div>
              
              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/services/close-protection" className="hover:text-amber-500">Close Protection</a></li>
                  <li><a href="/services/private-hire" className="hover:text-amber-500">Private Hire</a></li>
                  <li><a href="/services/corporate" className="hover:text-amber-500">Corporate Security</a></li>
                  <li><a href="/services/vip" className="hover:text-amber-500">VIP Services</a></li>
                  <li><a href="/services/weddings" className="hover:text-amber-500">Wedding Security</a></li>
                </ul>
              </div>
              
              {/* Legal */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/privacy-policy" className="hover:text-amber-500">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="hover:text-amber-500">Terms of Service</a></li>
                  <li><a href="/cookie-policy" className="hover:text-amber-500">Cookie Policy</a></li>
                  <li><a href="/accessibility" className="hover:text-amber-500">Accessibility</a></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <p>📞 <a href="tel:+442012345678" className="hover:text-amber-500">+44 (0) 20 1234 5678</a></p>
                  <p>✉️ <a href="mailto:info@gqsecurity.co.uk" className="hover:text-amber-500">info@gqsecurity.co.uk</a></p>
                  <p>🌐 24/7 Emergency Response</p>
                </div>
                
                <div className="mt-4">
                  <a href="/contact" className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity rounded">
                    Request Confidential Quote
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 GQ Security Services. All rights reserved. | SIA Licensed Security Professionals</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
