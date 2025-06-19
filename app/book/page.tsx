import SmartBookingForm from '@/app/components/booking/SmartBookingForm'
import SmartQuoteCalculator from '@/app/components/booking/SmartQuoteCalculator'
import { Shield, Clock, Award, Brain, Zap, Target } from 'lucide-react'

export default function BookingPage() {
  return (
    <>
      {/* Hero Section with AI Enhancement */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-gq-gold" />
              <span className="text-gq-gold font-medium">AI-Powered Booking</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Smart Security Service Booking
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience our intelligent booking system with AI-powered recommendations, 
              smart auto-completion, and real-time optimization for the perfect security solution.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-green-400" />
                <span>Instant AI Analysis</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Predictive Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Intelligent Service Request</h2>
                <p className="text-gray-400">
                  Our AI analyzes your requirements in real-time to provide optimal recommendations
                </p>
              </div>
              <SmartBookingForm />
            </div>

            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Smart Quote Calculator</h2>
                <p className="text-gray-400">
                  AI-powered pricing with market analysis and optimization
                </p>
              </div>
              <SmartQuoteCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="py-20 bg-gradient-to-r from-gq-black/50 to-transparent">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Intelligent Form Features</h2>
              <p className="text-gray-400">
                Experience the future of security service booking with our AI-enhanced platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gq-black/50 border border-gray-700 p-6 rounded-lg">
                <Brain className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Smart Auto-Completion</h3>
                <p className="text-gray-400">
                  AI-powered suggestions for locations, services, and requirements based on your input patterns.
                </p>
              </div>

              <div className="bg-gq-black/50 border border-gray-700 p-6 rounded-lg">
                <Target className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
                <p className="text-gray-400">
                  Intelligent analysis of location, time, and requirements to recommend optimal security levels.
                </p>
              </div>

              <div className="bg-gq-black/50 border border-gray-700 p-6 rounded-lg">
                <Zap className="w-12 h-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Real-Time Validation</h3>
                <p className="text-gray-400">
                  Instant field validation with confidence scores and helpful suggestions for improvement.
                </p>
              </div>

              <div className="bg-gq-black/50 border border-gray-700 p-6 rounded-lg">
                <Clock className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Dynamic Adaptation</h3>
                <p className="text-gray-400">
                  Form fields and steps adapt based on your service selection and requirements.
                </p>
              </div>

              <div className="bg-gq-black/50 border border-gray-700 p-6 rounded-lg">
                <Shield className="w-12 h-12 text-gq-gold mb-4" />
                <h3 className="text-xl font-bold mb-2">Auto-Save Recovery</h3>
                <p className="text-gray-400">
                  Never lose your progress with intelligent auto-save and form recovery features.
                </p>
              </div>

              <div className="bg-gq-black/50 border border-gray-700 p-6 rounded-lg">
                <Award className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">Accessibility AI</h3>
                <p className="text-gray-400">
                  Voice commands, screen reader support, and accessibility optimizations powered by AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Excellence */}
      <section className="py-20 bg-gq-black/50">
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