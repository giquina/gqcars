import { Shield, Clock, Award, MapPin, Building2, GlassWater, Car, Star, Phone } from 'lucide-react'
import ThreatIndicator from './components/intelligence/ThreatIndicator'
import SmartScarcity from './components/booking/SmartScarcity'
import SecurityConsultant from './components/ai/SecurityConsultant'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Elite Close Protection & Private Hire
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              SIA licensed security professionals providing discreet protection and premium transport services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
                Book Now
                <Shield className="ml-2 h-5 w-5" />
              </a>
              <a href="/services" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
                Our Services
                <Star className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Powered Intelligence Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              AI-Powered Security Intelligence
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of security services with real-time threat assessment, intelligent booking, and instant expert consultation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Real-time Threat Intelligence */}
            <div className="lg:col-span-2">
              <ThreatIndicator />
            </div>
            
            {/* Smart Scarcity & Booking */}
            <div className="lg:col-span-1">
              <SmartScarcity />
            </div>
          </div>
        </div>
      </section>

      {/* Professional Security Services */}
      <section className="py-20 bg-slate-800/50">
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
              <GlassWater className="w-12 h-12 text-amber-500 mb-4" />
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

      {/* Why Choose GQ Security */}
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

      {/* Technology Leadership Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Technology Leadership
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Industry-first innovations that set new standards for security service delivery.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-500 mb-3">🤖 AI Intelligence</div>
              <h4 className="text-lg font-semibold text-white mb-2">Smart Security Analysis</h4>
              <p className="text-gray-400 text-sm">Advanced AI algorithms analyze threat patterns and provide real-time recommendations for optimal security deployment.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-500 mb-3">📊 Live Operations</div>
              <h4 className="text-lg font-semibold text-white mb-2">Transparent Service</h4>
              <p className="text-gray-400 text-sm">Real-time visibility into officer availability, response times, and service delivery metrics - unprecedented industry transparency.</p>
            </div>
            
            <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-500 mb-3">⚡ Instant Response</div>
              <h4 className="text-lg font-semibold text-white mb-2">Emergency Deployment</h4>
              <p className="text-gray-400 text-sm">AI-powered emergency response system ensures fastest possible deployment of security personnel when it matters most.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Experience Elite Security */}
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

      {/* AI Security Consultant Chat */}
      <SecurityConsultant />
    </>
  )
}
