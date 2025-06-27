import Link from 'next/link'
import { Crown, Clock, Phone, Shield, CheckCircle, ArrowLeft, Star, Car, Globe, Users, Building2 } from 'lucide-react'

export default function VIPServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900 to-black">
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
          <div className="absolute bottom-10 right-10 w-12 h-12 border border-gold-500 animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div className="bg-yellow-600 px-6 py-3 rounded-full">
                <span className="text-white font-bold tracking-wider">VIP EVENTS</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              VIP & Event Transport
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Secure, reliable, and discreet transportation for <span className="text-yellow-400 font-semibold">VIPs, celebrities</span>, and{' '}
              <span className="text-orange-500 font-semibold">high-profile events</span> across London with premium security
            </p>

            {/* 50% OFF BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl mb-8 border-2 border-red-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl mb-2">👑 VIP EXCLUSIVE OFFER 👑</h3>
                <p className="text-white font-bold text-3xl mb-2">50% OFF Your First VIP Service!</p>
                <p className="text-gray-100">New clients only • Use code: VIP50</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>VIP Hotline - 07407 655 203</span>
              </button>
              <button className="bg-gradient-to-r from-gold-600 to-yellow-600 hover:from-gold-500 hover:to-yellow-500 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Crown className="w-5 h-5" />
                <span>Get VIP Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Premium VIP Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-yellow-900/60 to-yellow-700/40 p-8 rounded-2xl border border-yellow-500/30">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Red Carpet Events</h3>
              <p className="text-gray-300 leading-relaxed">
                Seamless and secure experience for high-profile guests at premieres, awards nights, and charity galas.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-8 rounded-2xl border border-blue-500/30">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Sporting & Music Events</h3>
              <p className="text-gray-300 leading-relaxed">
                Navigate crowded venues with ease. Secure transport to major sporting events, concerts, and festivals.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/40 p-8 rounded-2xl border border-purple-500/30">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multi-Vehicle Coordination</h3>
              <p className="text-gray-300 leading-relaxed">
                Manage complex itineraries involving multiple vehicles, guests, and destinations for large-scale events.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/60 to-green-700/40 p-8 rounded-2xl border border-green-500/30">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Artist & Performer Transport</h3>
              <p className="text-gray-300 leading-relaxed">
                Secure and timely transport for artists, performers, and their entourage to arrive relaxed and ready.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Types */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Distinguished Clientele</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gold-800/50 to-yellow-600/30 p-8 rounded-2xl border border-yellow-500/30 text-center">
              <Building2 className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Executives</h3>
              <p className="text-gray-300">Corporate leaders and business executives requiring discrete, professional transport.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-800/50 to-pink-600/30 p-8 rounded-2xl border border-pink-500/30 text-center">
              <Star className="w-16 h-16 text-pink-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Celebrities</h3>
              <p className="text-gray-300">Entertainment and sports personalities needing secure, private transportation.</p>
            </div>

            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30 text-center">
              <Globe className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Diplomats</h3>
              <p className="text-gray-300">Government officials and diplomats requiring protocol-compliant security transport.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30 text-center">
              <Crown className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Private Clients</h3>
              <p className="text-gray-300">High-net-worth individuals and families seeking premium security services.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">VIP Service Benefits</h2>
            
            <div className="space-y-6">
              {[
                'SIA-licensed close protection officers with VIP experience',
                'Luxury armored vehicles with advanced security features',
                'Advance security planning and threat assessment',
                'Route and venue reconnaissance and planning',
                'Privacy protection measures and media management',
                'Secure extraction and emergency response protocols',
                'International security coordination capabilities',
                'Multi-agency liaison and cooperation',
                '24/7 monitoring and communication systems',
                'Bespoke security solutions for unique requirements'
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

      {/* Vehicle Fleet */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Premium Vehicle Fleet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-600/30 p-8 rounded-2xl border border-gray-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Mercedes-Maybach S680</h3>
              <p className="text-yellow-500 font-semibold mb-4">Ultra-Luxury Sedan</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Armored protection available</li>
                <li>• Extended wheelbase luxury</li>
                <li>• Premium executive interior</li>
                <li>• Advanced security systems</li>
                <li>• Executive seating configuration</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-800/50 to-green-600/30 p-8 rounded-2xl border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Range Rover SV</h3>
              <p className="text-yellow-500 font-semibold mb-4">Luxury Security SUV</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Armored capability options</li>
                <li>• All-terrain performance</li>
                <li>• Privacy tinted configuration</li>
                <li>• Enhanced security features</li>
                <li>• Command seating position</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">BMW 7 Series Protection</h3>
              <p className="text-yellow-500 font-semibold mb-4">Armored Executive Sedan</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Ballistic protection certified</li>
                <li>• Run-flat tire systems</li>
                <li>• Secure communications suite</li>
                <li>• Emergency response systems</li>
                <li>• Executive configuration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Service Packages */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">VIP Service Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-yellow-800/50 to-yellow-600/30 p-8 rounded-2xl border border-yellow-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Executive Protection</h3>
              <p className="text-gray-300 mb-6">Personal close protection with luxury transport for business executives and VIPs.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Dedicated CPO and driver</li>
                <li>• Luxury armored vehicle</li>
                <li>• Route planning & reconnaissance</li>
                <li>• 24/7 monitoring support</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">From £850/day</p>
                <p className="text-gray-400">50% off first service</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-800/50 to-orange-600/30 p-8 rounded-2xl border border-orange-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Celebrity & Event</h3>
              <p className="text-gray-300 mb-6">Complete event security including transport, venue liaison, and crowd management.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Multi-vehicle coordination</li>
                <li>• Venue security liaison</li>
                <li>• Media and crowd management</li>
                <li>• Emergency extraction plans</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">From £1,250/event</p>
                <p className="text-gray-400">Most popular for events</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Diplomatic Protocol</h3>
              <p className="text-gray-300 mb-6">Government and diplomatic transport with full protocol compliance and security.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Protocol-compliant procedures</li>
                <li>• Government liaison coordination</li>
                <li>• Advanced security clearance</li>
                <li>• International standards</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">Bespoke Quote</p>
                <p className="text-gray-400">Customized to requirements</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-yellow-900/50 to-orange-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Experience VIP Security Transport</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join an exclusive circle of clients who trust our premier VIP security and transport services.
            </p>
            
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mx-auto mb-8 w-fit animate-pulse">
              👑 50% OFF FIRST VIP SERVICE - Save up to £625! 👑
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07407655203" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>VIP Hotline - 07407 655 203</span>
              </a>
              <a href="mailto:vip@gqcars.co.uk" className="bg-gradient-to-r from-gold-600 to-yellow-600 hover:from-gold-500 hover:to-yellow-500 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>VIP Enquiries</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}