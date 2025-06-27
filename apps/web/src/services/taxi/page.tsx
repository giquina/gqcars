import Link from 'next/link'
import { Car, Clock, Phone, MapPin, Star, Shield, CreditCard, CheckCircle, ArrowLeft, Users, Zap } from 'lucide-react'
import GQCarsLogo from '@/app/components/ui/GQCarsLogo'

export default function TaxiService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-16 h-16 border border-yellow-500 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 border border-blue-500 animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
                <Car className="w-10 h-10 text-white" />
              </div>
              <div className="bg-blue-600 px-6 py-3 rounded-full">
                <span className="text-white font-bold tracking-wider">SECURITY TAXI</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-yellow-500 bg-clip-text text-transparent">
              Professional Taxi Service
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              <span className="text-blue-400 font-semibold">SIA Licensed Close Protection Officers</span> providing premium taxi service across London.{' '}
              <span className="text-yellow-500 font-semibold">Not just drivers</span> - security professionals with luxury transport experience.
            </p>

            {/* 50% OFF BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl mb-8 border-2 border-red-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl mb-2">🚕 SECURITY TAXI SPECIAL 🚕</h3>
                <p className="text-white font-bold text-3xl mb-2">50% OFF Your First Ride!</p>
                <p className="text-gray-100">New customers only • Use code: TAXI50</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07407655203"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>CALL NOW: 07407 655 203</span>
              </a>
              <a
                href="/book"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Car className="w-5 h-5" />
                <span>Book Online</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-white">Why Choose Our Security-Trained Drivers?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just a taxi company - we're <span className="text-yellow-500 font-semibold">SIA licensed security professionals</span> providing premium transport services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-8 rounded-2xl border border-blue-500/30 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">24/7 Available</h3>
              <p className="text-gray-300 leading-relaxed">Round-the-clock service with <span className="text-yellow-500">security-trained drivers</span></p>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/60 to-green-700/40 p-8 rounded-2xl border border-green-500/30 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">SIA Licensed CPOs</h3>
              <p className="text-gray-300 leading-relaxed"><span className="text-yellow-500">Close Protection Officers</span> with advanced security training</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-900/60 to-orange-700/40 p-8 rounded-2xl border border-yellow-500/30 text-center">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Service</h3>
              <p className="text-gray-300 leading-relaxed">Professional service combining <span className="text-yellow-500">security expertise</span> with luxury transport</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/40 p-8 rounded-2xl border border-purple-500/30 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure Payments</h3>
              <p className="text-gray-300 leading-relaxed">Card, contactless, and mobile payments with <span className="text-yellow-500">security protocols</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Security Taxi Benefits</h2>
            
            <div className="space-y-6">
              {[
                'SIA-licensed drivers with close protection training',
                'Advanced security awareness and threat assessment',
                'Professional appearance and discrete service',
                'Real-time GPS tracking for passenger safety',
                'Direct communication with security operations',
                'Enhanced vehicle security and safety features',
                'Background-checked and vetted drivers only',
                'Emergency response protocols and training',
                'Secure payment processing and data protection',
                'Premium vehicles maintained to highest standards'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Areas */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">London Service Areas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Central London', 'Westminster', 'Camden', 'Islington',
              'Hackney', 'Tower Hamlets', 'Southwark', 'Lambeth',
              'Kensington', 'Chelsea', 'Wandsworth', 'Hammersmith',
              'Canary Wharf', 'London Bridge', 'King\'s Cross', 'All London'
            ].map((area, index) => (
              <div key={index} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 text-center hover:border-yellow-500/50 transition-colors">
                <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-semibold text-white">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Types */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Taxi Service Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30">
              <Clock className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Immediate Pickup</h3>
              <p className="text-gray-300 mb-6">On-demand taxi service with security-trained drivers available for immediate pickup.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Call and go service</li>
                <li>• Average 8-minute arrival</li>
                <li>• GPS tracking provided</li>
                <li>• Secure ride guarantee</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-800/50 to-green-600/30 p-8 rounded-2xl border border-green-500/30">
              <Users className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Pre-Booked Journeys</h3>
              <p className="text-gray-300 mb-6">Advance booking for important appointments with guaranteed arrival times.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Schedule in advance</li>
                <li>• Guaranteed availability</li>
                <li>• Flight monitoring service</li>
                <li>• Meet and greet options</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-800/50 to-orange-600/30 p-8 rounded-2xl border border-yellow-500/30">
              <Zap className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Emergency Response</h3>
              <p className="text-gray-300 mb-6">Priority emergency transport with enhanced security protocols and rapid response.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• 24/7 emergency hotline</li>
                <li>• Priority dispatch</li>
                <li>• Security officer support</li>
                <li>• Medical assistance liaison</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Transparent Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Standard Taxi</h3>
              <p className="text-gray-300 mb-6">Security-trained driver with premium vehicle for standard journeys.</p>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-yellow-500 mb-2">£3.50</p>
                <p className="text-gray-400">Per mile + time</p>
              </div>
              <ul className="space-y-2 text-gray-400 text-left">
                <li>• SIA licensed driver</li>
                <li>• GPS tracking</li>
                <li>• Secure payment</li>
                <li>• Premium vehicle</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-800/50 to-orange-600/30 p-8 rounded-2xl border border-yellow-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Executive Taxi</h3>
              <p className="text-gray-300 mb-6">Enhanced service with luxury vehicle and additional security measures.</p>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-yellow-500 mb-2">£5.50</p>
                <p className="text-gray-400">Per mile + time</p>
              </div>
              <ul className="space-y-2 text-gray-400 text-left">
                <li>• Luxury executive vehicle</li>
                <li>• Enhanced security protocols</li>
                <li>• Priority booking</li>
                <li>• Business account options</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">VIP Security Taxi</h3>
              <p className="text-gray-300 mb-6">Premium service with close protection officer and armored vehicle options.</p>
              <div className="text-center mb-6">
                <p className="text-4xl font-bold text-yellow-500 mb-2">From £12</p>
                <p className="text-gray-400">Per mile + time</p>
              </div>
              <ul className="space-y-2 text-gray-400 text-left">
                <li>• Close protection officer</li>
                <li>• Armored vehicle available</li>
                <li>• Advanced security planning</li>
                <li>• Threat assessment included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Need a Secure Ride Now?</h2>
            <p className="text-xl text-gray-300 mb-8">Call us directly for immediate pickup or book online with our security-trained drivers</p>
            
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mx-auto mb-8 w-fit animate-pulse">
              🚕 50% OFF FIRST RIDE - Save up to £25! 🚕
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07407655203"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now - 07407 655 203</span>
              </a>
              <a
                href="/book"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Car className="w-5 h-5" />
                <span>Book Online</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
