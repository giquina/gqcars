import Image from 'next/image'
import Link from 'next/link'
import FAQSection from './components/ui/FAQSection'
import EnhancedFeaturesSection from './components/ui/EnhancedFeaturesSection'
import DynamicHeroSection from './components/ui/DynamicHeroSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Dynamic Hero Section */}
      <DynamicHeroSection />

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent mb-12">
            Our Security Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-amber-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-lg font-bold text-amber-500 mb-3">
                Close Protection
              </h3>
              <p className="text-gray-300 text-sm">
                SIA licensed officers providing elite personal security for high-profile clients and events.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-blue-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-lg font-bold text-blue-500 mb-3">
                Private Hire
              </h3>
              <p className="text-gray-300 text-sm">
                Luxury vehicle fleet with professional chauffeurs for executive and VIP transportation.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-amber-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-amber-500 mb-3">
                Corporate Security
              </h3>
              <p className="text-gray-300 text-sm">
                Comprehensive security solutions tailored for businesses and corporate events.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-blue-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-lg font-bold text-blue-500 mb-3">
                Family Protection
              </h3>
              <p className="text-gray-300 text-sm">
                Dedicated security solutions for families seeking comprehensive protection and peace of mind.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl hover:shadow-amber-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🏛️</div>
              <h3 className="text-lg font-bold text-amber-500 mb-3">
                Family Office
              </h3>
              <p className="text-gray-300 text-sm">
                Sophisticated security for ultra-high-net-worth families and multi-generational wealth protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-amber-500">10+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-500">100%</div>
            <div className="text-gray-400">SIA Licensed</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-amber-500">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-500">500+</div>
            <div className="text-gray-400">Satisfied Clients</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-amber-500">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">"Professional, discreet, and always reliable. GQ Security made our event stress-free."</p>
              <div className="text-amber-500 font-bold">— Sarah L.</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">"Their drivers and security team are top-notch. Highly recommended for VIPs."</p>
              <div className="text-amber-500 font-bold">— James K.</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">"We trust GQ Security for all our corporate events. The best in the business."</p>
              <div className="text-amber-500 font-bold">— Corporate Client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <EnhancedFeaturesSection />

      {/* FAQ Section */}
      <FAQSection />
    </div>
  )
}
