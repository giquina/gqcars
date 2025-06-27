import Link from 'next/link'
import { ShoppingBag, Clock, Phone, Shield, CheckCircle, ArrowLeft, Star, MapPin, Crown, Car } from 'lucide-react'

export default function ShoppingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
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
          <div className="absolute bottom-10 right-10 w-12 h-12 border border-purple-500 animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <div className="bg-purple-600 px-6 py-3 rounded-full">
                <span className="text-white font-bold tracking-wider">LUXURY SHOPPING</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-yellow-500 bg-clip-text text-transparent">
              Secure Shopping Excursions
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Enjoy luxury retail therapy in London with a <span className="text-purple-400 font-semibold">professional security driver</span> at your{' '}
              <span className="text-yellow-500 font-semibold">complete disposal</span> - hands-free shopping with expert navigation
            </p>

            {/* 50% OFF BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl mb-8 border-2 border-red-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl mb-2">🛍️ LUXURY SHOPPING OFFER 🛍️</h3>
                <p className="text-white font-bold text-3xl mb-2">50% OFF Your First Shopping Trip!</p>
                <p className="text-gray-100">New customers only • Use code: SHOP50</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Book Now - 07407 655 203</span>
              </button>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Get Shopping Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Luxury Shopping Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/40 p-8 rounded-2xl border border-purple-500/30">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium Destinations</h3>
              <p className="text-gray-300 leading-relaxed">
                Expert navigation to Bond Street, Sloane Street, Harrods, and exclusive artisan workshops across London.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/60 to-green-700/40 p-8 rounded-2xl border border-green-500/30">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Discreet</h3>
              <p className="text-gray-300 leading-relaxed">
                Your SIA-licensed driver provides low-profile security, safeguarding you and your purchases discreetly.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-8 rounded-2xl border border-blue-500/30">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Hands-Free Shopping</h3>
              <p className="text-gray-300 leading-relaxed">
                Enjoy your day without carrying bags. Your driver securely stores all purchases in the vehicle for you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/60 to-orange-700/40 p-8 rounded-2xl border border-yellow-500/30">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">As-Directed Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Book for set hours with complete flexibility for multiple stops and spontaneous itinerary changes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Shopping Districts */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Exclusive Shopping Districts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30">
              <Crown className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Mayfair & Bond Street</h3>
              <p className="text-gray-300 mb-6">The epicenter of luxury shopping with flagship stores of the world's most prestigious brands.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Hermès • Chanel • Louis Vuitton</li>
                <li>• Cartier • Tiffany & Co.</li>
                <li>• Bulgari • Van Cleef & Arpels</li>
                <li>• Rolex • Patek Philippe</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30">
              <Star className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Knightsbridge</h3>
              <p className="text-gray-300 mb-6">Home to Harrods and Harvey Nichols, offering unparalleled luxury shopping experiences.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Harrods Department Store</li>
                <li>• Harvey Nichols</li>
                <li>• Sloane Street Boutiques</li>
                <li>• Designer Fashion Houses</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-800/50 to-green-600/30 p-8 rounded-2xl border border-green-500/30">
              <ShoppingBag className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Chelsea & Kensington</h3>
              <p className="text-gray-300 mb-6">Elegant boutiques, antique shops, and exclusive designer stores in charming surroundings.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• King's Road Boutiques</li>
                <li>• Antique Markets</li>
                <li>• Designer Galleries</li>
                <li>• Bespoke Tailoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Service Benefits */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Shopping Service Benefits</h2>
            
            <div className="space-y-6">
              {[
                'SIA-licensed drivers with luxury retail experience',
                'Secure storage and handling of high-value purchases',
                'Expert knowledge of London\'s premium shopping districts',
                'Personal shopping assistance and recommendations',
                'Flexible hourly bookings for leisurely shopping',
                'Discreet security presence throughout your trip',
                'Climate-controlled vehicle for delicate items',
                'VIP treatment and priority access coordination',
                'Multi-language driver support available',
                'Professional photography services for special occasions'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-4 bg-gray-800/30 p-4 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-colors">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Packages */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Popular Shopping Packages</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-800/50 to-purple-600/30 p-8 rounded-2xl border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Half Day Luxury</h3>
              <p className="text-gray-300 mb-6">4-hour premium shopping experience with security driver and vehicle storage.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• 4 hours of dedicated service</li>
                <li>• 2-3 premium shopping destinations</li>
                <li>• Secure purchase storage</li>
                <li>• Professional recommendations</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">From £250</p>
                <p className="text-gray-400">50% off first booking</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gold-800/50 to-yellow-600/30 p-8 rounded-2xl border border-yellow-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Full Day VIP</h3>
              <p className="text-gray-300 mb-6">8-hour comprehensive shopping tour with luxury dining and personal assistance.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• 8 hours of VIP service</li>
                <li>• Multiple shopping districts</li>
                <li>• Luxury lunch included</li>
                <li>• Personal shopping assistant</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">From £450</p>
                <p className="text-gray-400">Most popular choice</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-800/50 to-pink-600/30 p-8 rounded-2xl border border-pink-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Bespoke Experience</h3>
              <p className="text-gray-300 mb-6">Custom itinerary designed around your specific shopping goals and preferences.</p>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Flexible duration</li>
                <li>• Custom route planning</li>
                <li>• Private showroom access</li>
                <li>• Concierge services</li>
              </ul>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-500">Bespoke Quote</p>
                <p className="text-gray-400">Tailored to your needs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready for Your Luxury Shopping Experience?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join discerning clients who choose our secure, luxurious shopping services in London's finest districts.
            </p>
            
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mx-auto mb-8 w-fit animate-pulse">
              🛍️ 50% OFF FIRST SHOPPING TRIP - Save up to £225! 🛍️
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07407655203" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now - 07407 655 203</span>
              </a>
              <a href="mailto:bookings@gqcars.co.uk" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Email Booking</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 