import { Shield, Clock, Award, MapPin, Building2, Sparkles, Car, Star, Phone, Plane, Mail, MessageCircle, Calendar, Quote, Calculator } from 'lucide-react'
import GQCarsLogo from './components/ui/GQCarsLogo'
import MobileAppCTA from './components/ui/MobileAppCTA'
import LocationBasedQuotes from './components/ui/LocationBasedQuotes'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-gray-900 to-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent z-10" />
          {/* You can add a background image of cars here */}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-10 sm:py-16 lg:py-20">
          <div className="max-w-4xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
              <GQCarsLogo className="w-12 h-12 sm:w-16 sm:h-16" />
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-yellow-500 leading-tight">GQ CARS LTD</h1>
                <p className="text-sm sm:text-lg md:text-2xl text-gray-300">SIA Licensed • CPO Trained • Premium Transport</p>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Professional Security Taxi Service with Expert Drivers
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 leading-relaxed">
              <span className="text-yellow-500 font-semibold">SIA Licensed Close Protection Officers</span> providing <span className="text-blue-400 font-semibold">premium security transport</span>. 
              Experience professional service with intelligent features that make booking faster, smarter, and safer.
            </p>
            
            {/* Smart Technology Highlight */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 rounded-xl border border-blue-500/30 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-300">💬 Instant Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-300">⚡ Smart Quotes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-300">🎤 Voice Booking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-300">📍 Location Services</span>
                </div>
              </div>
            </div>

            {/* Location-Based Smart Quotes */}
            <LocationBasedQuotes />
            
            {/* Multiple Call-to-Action Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-12">
              {/* 1. Call Now (Primary) */}
              <a 
                href="tel:07407655203" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-4 sm:px-6 sm:py-5 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all transform hover:scale-105 group shadow-lg"
              >
                <Phone className="w-4 h-4 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                <span className="text-center">CALL NOW</span>
              </a>

              {/* 2. Email Us */}
              <a 
                href="mailto:bookings@gqcars.co.uk?subject=GQ Cars Booking Enquiry&body=Hello, I would like to enquire about your security taxi services." 
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-4 sm:px-6 sm:py-5 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all transform hover:scale-105 group shadow-lg"
              >
                <Mail className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-12" />
                <span>EMAIL US</span>
              </a>

              {/* 3. WhatsApp Chat */}
              <a 
                href="https://wa.me/447407655203?text=Hello%20GQ%20Cars!%20I%27m%20interested%20in%20your%20security%20taxi%20services." 
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-4 sm:px-6 sm:py-5 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all transform hover:scale-105 group shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 group-hover:bounce" />
                <span>WHATSAPP</span>
              </a>

              {/* 4. Book Online (Secondary) */}
              <a 
                href="/book" 
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-4 sm:px-6 sm:py-5 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all transform hover:scale-105 group shadow-lg"
              >
                <Car className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1" />
                <span>BOOK ONLINE</span>
              </a>

              {/* 5. Get Quote */}
              <a 
                href="/quote" 
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-4 sm:px-6 sm:py-5 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all transform hover:scale-105 group shadow-lg"
              >
                <Quote className="w-4 h-4 sm:w-6 sm:h-6 group-hover:rotate-180" />
                <span>GET QUOTE</span>
              </a>

              {/* 6. Schedule Trip */}
              <a 
                href="/schedule" 
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-4 sm:px-6 sm:py-5 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 transition-all transform hover:scale-105 group shadow-lg"
              >
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110" />
                <span>SCHEDULE</span>
              </a>
            </div>

            {/* Smart Features Showcase */}
            <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-yellow-500/20 p-6 sm:p-8 rounded-2xl border border-yellow-500/30 mb-12">
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-3 bg-black/50 px-6 py-3 rounded-full mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-yellow-500 font-bold text-sm sm:text-base">🚀 SMART TECHNOLOGY PLATFORM</span>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Advanced Security Transport with Intelligent Features
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Professional drivers backed by smart technology for seamless booking and superior service
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-purple-500/20 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Live Support</h4>
                  <p className="text-gray-300 text-xs">Instant responses from our team, smart guidance, 24/7 availability</p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-blue-500/20 text-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Intelligent Pricing</h4>
                  <p className="text-gray-300 text-xs">Smart quote system with route optimization & security considerations</p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-green-500/20 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Location Services</h4>
                  <p className="text-gray-300 text-xs">Automatic location detection, personalized recommendations, smart routing</p>
                </div>

                <div className="bg-black/40 p-4 rounded-xl border border-yellow-500/20 text-center">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">Voice Features</h4>
                  <p className="text-gray-300 text-xs">Hands-free booking, voice commands, enhanced accessibility</p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 text-yellow-500 text-sm font-bold">
                  <Star className="w-4 h-4" />
                  <span>Why Choose Smart Security Transport?</span>
                  <Star className="w-4 h-4" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs">
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">50%</div>
                    <div className="text-gray-300">Faster Service</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">24/7</div>
                    <div className="text-gray-300">Live Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">100%</div>
                    <div className="text-gray-300">Professional</div>
                  </div>
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">0s</div>
                    <div className="text-gray-300">Wait Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Display */}
            <div className="bg-black/30 p-4 sm:p-6 rounded-xl border border-yellow-500/20 mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                <div>
                  <h4 className="text-yellow-500 font-bold text-sm sm:text-base mb-1">Phone</h4>
                  <p className="text-white text-xs sm:text-sm">07407 655 203</p>
                </div>
                <div>
                  <h4 className="text-yellow-500 font-bold text-sm sm:text-base mb-1">Email</h4>
                  <p className="text-white text-xs sm:text-sm">bookings@gqcars.co.uk</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <h4 className="text-yellow-500 font-bold text-sm sm:text-base mb-1">Available</h4>
                  <p className="text-white text-xs sm:text-sm">24/7 Security Services</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-black/50 p-4 sm:p-6 rounded-xl border border-yellow-500/20 hover:border-blue-500/50 transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
                  <div className="bg-blue-600 px-2 py-1 rounded text-xs text-white font-bold">SMART SERVICE</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">24/7 Professional Support</h3>
                <p className="text-sm sm:text-base text-gray-300">Round-the-clock service with <span className="text-yellow-500">SIA trained drivers</span> and <span className="text-blue-400">intelligent support system</span> for instant assistance</p>
              </div>
              <div className="bg-black/50 p-4 sm:p-6 rounded-xl border border-yellow-500/20 hover:border-blue-500/50 transition-all">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
                  <div className="bg-purple-600 px-2 py-1 rounded text-xs text-white font-bold">ENHANCED SECURITY</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Expert Security Professionals</h3>
                <p className="text-sm sm:text-base text-gray-300"><span className="text-yellow-500">Close Protection Officers</span> with <span className="text-blue-400">smart route planning</span> and advanced security protocols</p>
              </div>
              <div className="bg-black/50 p-4 sm:p-6 rounded-xl border border-yellow-500/20 hover:border-blue-500/50 transition-all sm:col-span-2 lg:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Car className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
                  <div className="bg-green-600 px-2 py-1 rounded text-xs text-white font-bold">PREMIUM TECH</div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">Advanced Fleet Management</h3>
                <p className="text-sm sm:text-base text-gray-300">Luxury vehicles with <span className="text-yellow-500">security professionals</span> and <span className="text-blue-400">smart booking features</span> for seamless experience</p>
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