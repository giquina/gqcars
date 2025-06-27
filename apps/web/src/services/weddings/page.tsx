import Link from 'next/link'
import { Heart, Clock, Phone, Shield, CheckCircle, ArrowLeft, Star, Car, Camera, Crown, Users } from 'lucide-react'

export default function WeddingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-pink-900 to-black">
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
          <div className="absolute bottom-10 right-10 w-12 h-12 border border-pink-500 animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-pink-600 rounded-2xl flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <div className="bg-pink-600 px-6 py-3 rounded-full">
                <span className="text-white font-bold tracking-wider">WEDDING TRANSPORT</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-yellow-500 bg-clip-text text-transparent">
              Secure Wedding Transport
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Elegant, reliable, and secure transportation for your <span className="text-pink-400 font-semibold">special day</span>, ensuring{' '}
              <span className="text-yellow-500 font-semibold">peace of mind</span> for you and your guests with professional service
            </p>

            {/* 50% OFF BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl mb-8 border-2 border-red-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl mb-2">💒 WEDDING SPECIAL OFFER 💒</h3>
                <p className="text-white font-bold text-3xl mb-2">50% OFF Your Wedding Transport!</p>
                <p className="text-gray-100">New couples only • Use code: WEDDING50</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Book Now - 07407 655 203</span>
              </button>
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Get Wedding Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Perfect Wedding Day Transport</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-pink-900/60 to-pink-700/40 p-8 rounded-2xl border border-pink-500/30">
              <div className="w-16 h-16 bg-pink-600 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Bridal & Groom Transport</h3>
              <p className="text-gray-300 leading-relaxed">
                Arrive in style and security with immaculate luxury vehicles for the bride, groom, and bridal party.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-8 rounded-2xl border border-blue-500/30">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Guest Transportation</h3>
              <p className="text-gray-300 leading-relaxed">
                Coordinate seamless transport for your guests between venues with our luxury fleet and professional drivers.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/60 to-green-700/40 p-8 rounded-2xl border border-green-500/30">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Discreet Security</h3>
              <p className="text-gray-300 leading-relaxed">
                Our SIA-licensed drivers provide subtle security, managing access and ensuring your day proceeds flawlessly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/40 p-8 rounded-2xl border border-purple-500/30">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Custom Decoration</h3>
              <p className="text-gray-300 leading-relaxed">
                We adorn our vehicles with ribbons and decorations to perfectly match your wedding's color scheme and theme.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Services */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Complete Wedding Transport Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-800/50 to-pink-600/30 p-8 rounded-2xl border border-pink-500/30">
              <Crown className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Bridal Party Luxury</h3>
              <p className="text-gray-300 mb-6">Elegant transportation for the bride, bridesmaids, and immediate family with premium styling.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Luxury bridal vehicle with decoration</li>
                <li>• Bridesmaids group transport</li>
                <li>• Family member coordination</li>
                <li>• Professional photography assistance</li>
                <li>• Timing coordination with ceremony</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30">
              <Star className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Guest Management</h3>
              <p className="text-gray-300 mb-6">Comprehensive guest transport logistics from hotels to ceremony and reception venues.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Hotel to ceremony shuttles</li>
                <li>• Reception venue transfers</li>
                <li>• Multi-vehicle coordination</li>
                <li>• Guest assistance and guidance</li>
                <li>• Late-night return services</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30">
              <Shield className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Security & Privacy</h3>
              <p className="text-gray-300 mb-6">Professional security presence ensuring privacy and managing uninvited guests or media.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• SIA-licensed security drivers</li>
                <li>• Privacy protection protocols</li>
                <li>• Access control management</li>
                <li>• Media screening (if required)</li>
                <li>• Emergency response planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Wedding Transport Benefits</h2>
            
            <div className="space-y-6">
              {[
                'SIA-licensed drivers with wedding experience and discretion',
                'Luxury vehicles professionally cleaned and decorated',
                'Comprehensive wedding day logistics coordination',
                'Backup vehicle and driver contingency planning',
                'Flexible timing adjustments for ceremony delays',
                'Professional photos and video cooperation',
                'Guest assistance and venue familiarity',
                'Special occasion insurance coverage',
                'Complimentary champagne service for the couple',
                'Post-wedding late night guest transportation'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-pink-500/50 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Wedding Packages */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Wedding Transport Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-800/50 to-pink-600/30 p-8 rounded-2xl border border-pink-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Essential Wedding</h3>
              <p className="text-gray-300 mb-6">Core bridal transport with security driver and vehicle decoration for intimate ceremonies.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Bridal transport to ceremony</li>
                <li>• Ceremony to reception transfer</li>
                <li>• Vehicle decoration included</li>
                <li>• Professional security driver</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">From £350</p>
                <p className="text-gray-400">50% off first booking</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-800/50 to-yellow-600/30 p-8 rounded-2xl border border-yellow-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Complete Wedding</h3>
              <p className="text-gray-300 mb-6">Full day coverage including bridal party, family, and guest transportation with coordination.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Full bridal party transport</li>
                <li>• Guest shuttle services</li>
                <li>• Multi-vehicle coordination</li>
                <li>• Photography assistance</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">From £750</p>
                <p className="text-gray-400">Most popular choice</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Luxury VIP Wedding</h3>
              <p className="text-gray-300 mb-6">Premium service with luxury fleet, security detail, and complete guest management.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Luxury vehicle fleet</li>
                <li>• Security detail coordination</li>
                <li>• VIP guest management</li>
                <li>• Concierge services</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">Bespoke Quote</p>
                <p className="text-gray-400">Tailored to your celebration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Specialization */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">London Wedding Venues We Serve</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'St. Paul\'s Cathedral', 'Westminster Abbey', 'Royal Courts of Justice', 'Guildhall',
              'The Shard', 'Tower Bridge', 'Hampton Court Palace', 'Kensington Palace',
              'The Ritz London', 'Claridge\'s', 'The Savoy', 'Dorchester Hotel',
              'Natural History Museum', 'V&A Museum', 'British Museum', 'Tate Modern'
            ].map((venue, index) => (
              <div key={index} className="bg-gray-800/30 p-4 rounded-xl border border-gray-700 text-center">
                <span className="text-gray-300 font-medium">{venue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-pink-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Make Your Wedding Day Perfect</h2>
            <p className="text-xl text-gray-300 mb-8">
              Trust your special day to London's premier wedding transport specialists with security expertise.
            </p>
            
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mx-auto mb-8 w-fit animate-pulse">
              💒 50% OFF WEDDING TRANSPORT - Save up to £375! 💒
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07407655203" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now - 07407 655 203</span>
              </a>
              <a href="mailto:bookings@gqcars.co.uk" className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Email Wedding Planning</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}