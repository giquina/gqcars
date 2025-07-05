import dynamic from 'next/dynamic'
import { Car, Shield, Clock, Star, Phone, MapPin } from 'lucide-react'

// Clean, minimal components
const CleanHeader = dynamic(() => import('@/components/ui/CleanHeader'), { 
  ssr: false,
  loading: () => <div className="h-16 bg-white border-b border-gray-200" />
})

const WhatsAppWidget = dynamic(() => import('@/components/ui/WhatsAppWidget'), { 
  ssr: false
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <CleanHeader />
      
      <main>
        {/* Clean Hero Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Need a ride in London?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Airport trips, city rides, special occasions - we've got you covered with friendly drivers and clean cars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg transition-colors">
                Book Now
              </button>
              <button className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors">
                Call Us: 07407 655 203
              </button>
            </div>
          </div>
        </section>

        {/* Clean Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <Car className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Airport Transfers</h3>
                <p className="text-gray-600 text-sm">Getting to the airport made easy. No stress, no rushing.</p>
                <a href="/services/airport" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-3 inline-block">
                  Learn more →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <Star className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">VIP Transport</h3>
                <p className="text-gray-600 text-sm">Special occasions? Travel in comfort with our nice cars.</p>
                <a href="/services/vip" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-3 inline-block">
                  Learn more →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <MapPin className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Taxi Service</h3>
                <p className="text-gray-600 text-sm">Quick rides around London. Clean cars, friendly drivers.</p>
                <a href="/services/taxi" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-3 inline-block">
                  Learn more →
                </a>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Security</h3>
                <p className="text-gray-600 text-sm">Sometimes you need extra security. Our trained team keeps you safe.</p>
                <a href="/services/close-protection" className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-3 inline-block">
                  Learn more →
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Clean Trust Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Licensed & Insured</h3>
                <p className="text-gray-600">All our drivers are fully licensed and our vehicles are insured.</p>
              </div>

              <div className="text-center">
                <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Always On Time</h3>
                <p className="text-gray-600">We track your flight and traffic to make sure you're never late.</p>
              </div>

              <div className="text-center">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">5-Star Service</h3>
                <p className="text-gray-600">Clean cars, friendly drivers, and excellent customer service.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Simple Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-2xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Book?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Call us now or book online - it's quick and easy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-8 rounded-lg transition-colors">
                Book Online
              </button>
              <a href="tel:07407655203" className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </section>

      </main>
      
      {/* Clean Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">GQ Cars LTD</h3>
              <p className="text-gray-600 text-sm">
                Professional transport services in London and surrounding areas.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
              <p className="text-gray-600 text-sm">Phone: 07407 655 203</p>
              <p className="text-gray-600 text-sm">Email: gqcars@giquinaholdings.com</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>Airport Transfers</li>
                <li>VIP Transport</li>
                <li>Taxi Service</li>
                <li>Personal Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
            © 2024 GQ Cars LTD. All rights reserved.
          </div>
        </div>
      </footer>

      <WhatsAppWidget />
    </div>
  )
}
