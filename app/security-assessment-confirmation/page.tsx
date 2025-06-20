'use client'

import { CheckCircle, Shield, Phone, Mail, Clock, Home, Car, CalendarCheck } from 'lucide-react'
import Link from 'next/link'
import GQCarsLogo from '../components/ui/GQCarsLogo'

export default function SecurityAssessmentConfirmation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <GQCarsLogo className="w-10 h-10" />
              <span className="text-xl font-bold text-yellow-500">GQ CARS LTD</span>
            </Link>
            <div className="text-sm text-green-400 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Assessment Complete</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Security Assessment Completed Successfully!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Thank you for completing our security assessment. Our SIA licensed security specialists will review your requirements and contact you within 24 hours.
          </p>
        </div>

        {/* What Happens Next */}
        <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
            <Clock className="w-6 h-6 text-yellow-500" />
            <span>What Happens Next?</span>
          </h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-gray-700/30 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Assessment Review</h3>
              <p className="text-gray-300 text-sm">Our security experts review your assessment and requirements</p>
              <p className="text-yellow-500 text-xs mt-2">Within 2 hours</p>
            </div>
            
            <div className="text-center p-6 bg-gray-700/30 rounded-xl">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-black font-bold">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Personal Consultation</h3>
              <p className="text-gray-300 text-sm">We call to discuss your specific needs and provide recommendations</p>
              <p className="text-yellow-500 text-xs mt-2">Within 24 hours</p>
            </div>
            
            <div className="text-center p-6 bg-gray-700/30 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2">Service Booking</h3>
              <p className="text-gray-300 text-sm">Book your security transport service with confidence</p>
              <p className="text-yellow-500 text-xs mt-2">Same day available</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-bold text-white">Urgent Security Requirements?</h3>
          </div>
          <p className="text-gray-300 mb-4">
            If you have immediate security concerns or need emergency transport services, please contact us directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:+447407655203" 
              className="flex items-center space-x-3 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Emergency: 07407 655 203</span>
            </a>
            <a 
              href="mailto:security@gqcars.co.uk" 
              className="flex items-center space-x-3 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Mail className="w-5 h-5" />
              <span>security@gqcars.co.uk</span>
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link 
            href="/" 
            className="flex items-center space-x-3 bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 text-center justify-center"
          >
            <Home className="w-5 h-5" />
            <span>Return to Homepage</span>
          </Link>
          
          <Link 
            href="/services" 
            className="flex items-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 text-center justify-center"
          >
            <Car className="w-5 h-5" />
            <span>View Our Services</span>
          </Link>
        </div>

        {/* Security Assurance */}
        <div className="bg-gray-800/30 p-6 rounded-xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Your Information is Secure</span>
            <Shield className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-gray-400 text-sm">
            All assessment data is encrypted and stored securely in compliance with UK GDPR regulations. 
            Your information is only used for security service provision and is never shared with third parties.
          </p>
        </div>

        {/* Professional Services Badge */}
        <div className="text-center mt-8 opacity-75">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
            <span>🛡️ SIA Licensed</span>
            <span>•</span>
            <span>🏆 Professional Standards</span>
            <span>•</span>
            <span>⭐ 5-Star Rated</span>
            <span>•</span>
            <span>🔒 Fully Insured</span>
          </div>
        </div>
      </div>
    </div>
  )
}
