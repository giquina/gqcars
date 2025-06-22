import { Car, Clock, Phone, MapPin, Star, Shield, CreditCard } from 'lucide-react'
import GQCarsLogo from '@/app/components/ui/GQCarsLogo'

export default function TaxiService() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-yellow-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <GQCarsLogo className="w-20 h-20" />
          </div>
          <h1 className="text-5xl font-bold mb-6">Professional Taxi Service</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            <span className="text-black font-semibold">SIA Licensed Close Protection Officers</span> providing premium taxi service across London. 
            Not just drivers - security professionals with luxury transport experience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:07407655203"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center space-x-3 transition-colors"
            >
              <Phone className="w-6 h-6" />
              <span>CALL NOW: 07407 655 203</span>
            </a>
            <a
              href="/book"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Why Choose Us */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-yellow-500">Why Choose Our Security-Trained Drivers?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just a taxi company - we're <span className="text-yellow-500">SIA licensed security professionals</span> providing premium transport services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center p-6">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">24/7 Available</h3>
            <p className="text-gray-300">Round-the-clock service with <span className="text-yellow-500">security-trained drivers</span></p>
          </div>
          
          <div className="text-center p-6">
            <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">SIA Licensed CPOs</h3>
            <p className="text-gray-300"><span className="text-yellow-500">Close Protection Officers</span> with advanced security training</p>
          </div>
          
          <div className="text-center p-6">
            <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Premium Service</h3>
            <p className="text-gray-300">Professional service combining <span className="text-yellow-500">security expertise</span> with luxury transport</p>
          </div>
          
          <div className="text-center p-6">
            <CreditCard className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-gray-300">Card, contactless, and mobile payments with <span className="text-yellow-500">security protocols</span></p>
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-gray-900 p-8 rounded-xl mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-yellow-500">Service Areas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Central London</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Westminster</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Camden</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Islington</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Hackney</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Tower Hamlets</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">Southwark</p>
            </div>
            <div className="p-4">
              <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="font-semibold">& Many More</p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-yellow-500 p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Need a Ride Now?</h2>
          <p className="text-xl mb-8">Call us directly for immediate pickup or book online</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:07407655203"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>07407 655 203</span>
            </a>
            <a
              href="/book"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Book Online
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
