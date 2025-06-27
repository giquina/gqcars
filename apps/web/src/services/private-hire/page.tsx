import Link from 'next/link'
import { Car, Clock, Phone, Shield, CheckCircle, ArrowLeft, Star, MapPin, Users, Zap } from 'lucide-react'

export default function PrivateHirePage() {
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
                <span className="text-white font-bold tracking-wider">PRIVATE HIRE</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-yellow-500 bg-clip-text text-transparent">
              Secure Private Hire
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Professional, pre-booked car services with <span className="text-blue-400 font-semibold">SIA-licensed security drivers</span> for{' '}
              <span className="text-yellow-500 font-semibold">any occasion</span> - reliable, discreet, and punctual
            </p>

            {/* 50% OFF BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl mb-8 border-2 border-red-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl mb-2">🔥 LIMITED TIME OFFER 🔥</h3>
                <p className="text-white font-bold text-3xl mb-2">50% OFF Your First Private Hire!</p>
                <p className="text-gray-100">New customers only • Use code: HIRE50</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Book Now - 07407 655 203</span>
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Car className="w-5 h-5" />
                <span>Get Instant Quote</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Our Private Hire Service?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-8 rounded-2xl border border-blue-500/30">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pre-Booked & Punctual</h3>
              <p className="text-gray-300 leading-relaxed">
                Schedule your journeys in advance and rest assured your SIA-licensed driver will arrive on time, every time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/60 to-green-700/40 p-8 rounded-2xl border border-green-500/30">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Discreet & Professional</h3>
              <p className="text-gray-300 leading-relaxed">
                Our drivers provide a low-profile, professional service, ensuring your privacy and comfort on every trip.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/60 to-orange-700/40 p-8 rounded-2xl border border-yellow-500/30">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Flexible Hourly Rates</h3>
              <p className="text-gray-300 leading-relaxed">
                Book a driver for a few hours, a full day, or longer. Perfect for multi-stop itineraries and business meetings.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/60 to-purple-700/40 p-8 rounded-2xl border border-purple-500/30">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">As-Directed Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Whether you need a simple transfer or a driver at your disposal, our service is flexible to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Service Benefits</h2>
            
            <div className="space-y-6">
              {[
                'SIA-licensed professional drivers with security training',
                'Luxury vehicles maintained to highest standards',
                'Real-time GPS tracking for safety and coordination',
                'Flexible booking options - hourly, daily, or longer',
                'Professional appearance and discretion guaranteed',
                'Comprehensive insurance and liability coverage',
                'Multi-stop itineraries and route flexibility',
                'Corporate accounts and regular booking discounts',
                'Airport transfers and long-distance journeys',
                '24/7 customer support and driver communication'
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

      {/* Service Types Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Popular Private Hire Options</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-800/50 to-blue-600/30 p-8 rounded-2xl border border-blue-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Business & Corporate</h3>
              <p className="text-gray-300 mb-6">Professional transport for meetings, conferences, and corporate events with discretion and punctuality.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Executive meetings</li>
                <li>• Corporate events</li>
                <li>• Client entertainment</li>
                <li>• Conference transport</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-800/50 to-green-600/30 p-8 rounded-2xl border border-green-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Personal & Leisure</h3>
              <p className="text-gray-300 mb-6">Comfortable transport for shopping, dining, entertainment, and personal appointments across London.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Shopping trips</li>
                <li>• Dining & entertainment</li>
                <li>• Medical appointments</li>
                <li>• Social events</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-800/50 to-orange-600/30 p-8 rounded-2xl border border-yellow-500/30">
              <h3 className="text-2xl font-bold text-white mb-4">Special Occasions</h3>
              <p className="text-gray-300 mb-6">Premium transport for anniversaries, celebrations, and important life events with added security.</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Anniversary celebrations</li>
                <li>• Birthday parties</li>
                <li>• Theatre & opera</li>
                <li>• Special events</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready for Professional Private Hire?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of satisfied customers who trust our secure, reliable private hire services.
            </p>
            
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mx-auto mb-8 w-fit animate-pulse">
              🔥 50% OFF FIRST HIRE - Save up to £75! 🔥
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07407655203" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now - 07407 655 203</span>
              </a>
              <a href="mailto:bookings@gqcars.co.uk" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Email Booking</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}