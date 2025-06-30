import BookingForm from '@/components/booking/BookingForm'
import QuoteCalculator from '@/components/booking/QuoteCalculator'
import { Shield, Clock, Award } from 'lucide-react'

export default function BookingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Our Security Services</h1>
            <p className="text-xl text-gray-300">
              Professional close protection and private hire services tailored to your needs.
            </p>
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

            <div>
              <h2 className="text-2xl font-bold mb-8">Instant Quote</h2>
              <QuoteCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
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