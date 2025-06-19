'use client'

import BookingForm from '@/app/components/booking/BookingForm'
import QuoteCalculator from '@/app/components/booking/QuoteCalculator'
import AIQuoteCalculator from '@/app/components/booking/AIQuoteCalculator'
import { Shield, Clock, Award, Zap, Bot, Calculator } from 'lucide-react'

export default function BookingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Our Security Services</h1>
            <p className="text-xl text-gray-300 mb-8">
              Professional close protection and private hire services tailored to your needs.
            </p>
            <div className="flex items-center justify-center gap-2 text-gq-gold">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">Now featuring AI-powered intelligent pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Request a Service</h2>
              <BookingForm />
            </div>

            <div className="space-y-8">
              {/* AI Quote Calculator */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Bot className="w-6 h-6 text-gq-gold" />
                  <h2 className="text-2xl font-bold">AI Smart Quote</h2>
                  <span className="bg-gq-gold text-gq-black text-xs px-2 py-1 rounded font-bold">NEW</span>
                </div>
                <AIQuoteCalculator />
              </div>

              {/* Traditional Quote Calculator */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-gray-400" />
                  <h2 className="text-xl font-semibold text-gray-300">Standard Quote</h2>
                </div>
                <QuoteCalculator />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">AI-Powered Pricing Intelligence</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our Smart Quote Engine uses advanced algorithms to provide accurate, transparent pricing 
              based on real-time data and security analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Security Risk Assessment</h3>
              <p className="text-gray-400 text-sm">Intelligent analysis of route security factors and area risk levels</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Dynamic Time Pricing</h3>
              <p className="text-gray-400 text-sm">Real-time adjustments based on peak hours, traffic, and demand</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Service Level Optimization</h3>
              <p className="text-gray-400 text-sm">Intelligent recommendations for optimal security level</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Route Optimization</h3>
              <p className="text-gray-400 text-sm">Smart routing with security and efficiency considerations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">SIA Licensed</h3>
              <p className="text-gray-400">All our security personnel are fully licensed and certified.</p>
            </div>

            <div className="text-center">
              <Clock className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-400">Round-the-clock service for your security needs.</p>
            </div>

            <div className="text-center">
              <Award className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Premium Service</h3>
              <p className="text-gray-400">Excellence in every aspect of our security provision.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}