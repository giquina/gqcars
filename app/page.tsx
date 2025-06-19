import { Shield, Clock, Award, MapPin, Building2, Sparkles, Car, Star, Phone, Plane } from 'lucide-react'
import GQCarsLogo from './components/ui/GQCarsLogo'
import MobileAppCTA from './components/ui/MobileAppCTA'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          {/* You can add a background image of cars here */}
        </div>
        
        <div className="container mx-auto px-4 relative z-20 py-20">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-8">
              <GQCarsLogo className="w-16 h-16" />
              <div>
                <h1 className="text-6xl md:text-8xl font-bold text-yellow-500">GQ CARS</h1>
                <p className="text-2xl text-gray-300">SIA Licensed • CPO Trained • Premium Transport</p>
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Professional Security-Trained Drivers
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              <span className="text-yellow-500 font-semibold">SIA Licensed Close Protection Officers</span> providing premium taxi and private hire services. 
              We're not just drivers - we're security professionals with luxury transport experience.
            </p>
            
            <div className="flex flex-col lg:flex-row gap-6 mb-12">
              <a 
                href="tel:07407655203" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-6 rounded-xl font-bold text-xl flex items-center justify-center space-x-3 transition-colors group"
              >
                <Phone className="w-7 h-7 group-hover:animate-pulse" />
                <span>CALL NOW: 07407 655 203</span>
              </a>
              <a 
                href="/book" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-6 rounded-xl font-bold text-xl flex items-center justify-center space-x-3 transition-colors"
              >
                <Car className="w-7 h-7" />
                <span>BOOK ONLINE</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/20">
                <Clock className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">24/7 Service</h3>
                <p className="text-gray-300">Available round the clock with <span className="text-yellow-500">SIA trained drivers</span></p>
              </div>
              <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/20">
                <Shield className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">CPO Trained Drivers</h3>
                <p className="text-gray-300"><span className="text-yellow-500">Close Protection Officers</span> with advanced security training</p>
              </div>
              <div className="bg-black/50 p-6 rounded-xl border border-yellow-500/20">
                <Car className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Premium Security Fleet</h3>
                <p className="text-gray-300">Luxury vehicles operated by <span className="text-yellow-500">licensed security professionals</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App CTA */}
      <MobileAppCTA />

      {/* Services Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Professional Security Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Shield className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Close Protection</h3>
              <p className="text-gray-400">SIA licensed officers providing professional personal security and threat management.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Car className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Private Hire</h3>
              <p className="text-gray-400">Premium chauffeur services with trained security drivers and luxury vehicles.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Building2 className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Corporate Security</h3>
              <p className="text-gray-400">Comprehensive security solutions for businesses and executive protection.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Sparkles className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Wedding Security</h3>
              <p className="text-gray-400">Discreet protection and luxury transport for your special day.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Star className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">VIP Services</h3>
              <p className="text-gray-400">Bespoke security and transport solutions for high-profile clients.</p>
            </div>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <MapPin className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Event Security</h3>
              <p className="text-gray-400">Professional security coordination for events and special occasions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose GQ Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-gray-400 font-medium">SIA Licensed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Protection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">10+</div>
              <div className="text-gray-400 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience Elite Security?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us now to discuss your security requirements and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+442012345678" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
              Call Now
              <Phone className="ml-2 h-5 w-5" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
              Request Quote
              <Award className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}