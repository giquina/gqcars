import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { name: 'Airport Transfers', href: '/services/airport' },
    { name: 'VIP Transport', href: '/services/vip' },
    { name: 'Personal Security', href: '/services/close-protection' },
    { name: 'Corporate Travel', href: '/services/corporate' },
    { name: 'Event Security', href: '/services/weddings' },
    { name: 'Shopping Trips', href: '/services/shopping' },
    { name: 'Private Hire', href: '/services/private-hire' },
    { name: 'Taxi Service', href: '/services/taxi' },
  ]

  return (
    <footer className="bg-black/95 border-t border-blue-500/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              GQ CARS
            </h3>
            <p className="text-gray-300 mb-4">
              Professional transport and security services. Get where you need to go safely and in style.
            </p>
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-sm text-gray-300">Available 24/7</span>
            </div>
            <div className="text-sm text-gray-300">
              Licensed • Insured • Professional
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Our Services</h4>
            <div className="space-y-2">
              {services.slice(0, 4).map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* More Services */}
          <div>
            <h4 className="font-bold text-white mb-4">More Services</h4>
            <div className="space-y-2">
              {services.slice(4).map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="block text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-bold text-white mb-4">Get In Touch</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div>📞 Call: 0800 123 4567</div>
              <div>📱 WhatsApp: 07123 456789</div>
              <div>✉️ Email: book@gqcars.co.uk</div>
              <div>📍 London, UK</div>
            </div>
            
            <div className="mt-6 space-y-2">
              <Link href="/privacy" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/book" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} GQ Cars Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="text-xs text-gray-400">
              SIA Licensed • TFL Approved • Fully Insured
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}