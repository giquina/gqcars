import Link from 'next/link'
import { Clock, Shield, Phone, Car, CheckCircle, ArrowLeft, Star, Zap } from 'lucide-react'

export default function ProfessionalSupportPage() {
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
                <Clock className="w-10 h-10 text-white" />
              </div>
              <div className="bg-blue-600 px-6 py-3 rounded-full">
                <span className="text-white font-bold tracking-wider">SMART SERVICE</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-yellow-500 bg-clip-text text-transparent">
              24/7 Professional Support
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Round-the-clock service with <span className="text-blue-400 font-semibold">SIA trained drivers</span> and{' '}
              <span className="text-yellow-500 font-semibold">intelligent support system</span> for instant assistance
            </p>

            {/* 50% OFF BANNER */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl mb-8 border-2 border-red-500/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 animate-pulse"></div>
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl mb-2">🔥 LIMITED TIME OFFER 🔥</h3>
                <p className="text-white font-bold text-3xl mb-2">50% OFF Your First Ride!</p>
                <p className="text-gray-100">New customers only • Use code: FIRST50</p>
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
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose Our Professional Support?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/60 to-blue-700/40 p-8 rounded-2xl border border-blue-500/30">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">24/7 Availability</h3>
              <p className="text-gray-300 leading-relaxed">
                Our professional support team is available round the clock, 365 days a year. No matter when you need us, we're here to help.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-900/60 to-green-700/40 p-8 rounded-2xl border border-green-500/30">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">SIA Licensed Drivers</h3>
              <p className="text-gray-300 leading-relaxed">
                All our drivers are SIA licensed security professionals with extensive training in close protection and security protocols.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/60 to-orange-700/40 p-8 rounded-2xl border border-yellow-500/30">
              <div className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Rapid Response</h3>
              <p className="text-gray-300 leading-relaxed">
                Average 15-minute response time with real-time tracking and intelligent dispatch system for optimal efficiency.
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
                'Professional SIA trained drivers available 24/7',
                'Real-time GPS tracking for enhanced security',
                'Intelligent dispatch system for rapid response',
                'Premium vehicles maintained to highest standards',
                'Comprehensive insurance and liability coverage',
                'Discrete and professional service approach',
                'Advanced communication systems',
                'Crisis response protocols'
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

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience Professional Support?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of satisfied customers who trust our professional security transport services.
            </p>
            
            <div className="bg-red-500 text-white px-6 py-3 rounded-full text-lg font-bold mx-auto mb-8 w-fit animate-pulse">
              🔥 50% OFF FIRST RIDE - Save up to £50! 🔥
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07407655203" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now - 07407 655 203</span>
              </a>
              <a href="mailto:bookings@gqcars.co.uk" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}