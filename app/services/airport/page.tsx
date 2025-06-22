import { Plane, Clock, MapPin, Shield, Phone, Car } from 'lucide-react'
import GQCarsLogo from '@/app/components/ui/GQCarsLogo'

export default function AirportTransfers() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-yellow-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <Plane className="w-20 h-20 mx-auto mb-6 text-white" />
          <h1 className="text-5xl font-bold mb-6">Airport Transfers</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Professional airport transfer service covering all major London and South East England airports. 
            Reliable, punctual, and comfortable transfers from Watford and Central London.
          </p>
          
          <a
            href="tel:07407655203"
            className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center space-x-3 transition-colors"
          >
            <Phone className="w-6 h-6" />
            <span>BOOK NOW: 07407 655 203</span>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Airports We Cover */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-yellow-500">Airports We Cover</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Professional transfers to and from all major London and South East airports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <Plane className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Heathrow (LHR)</h3>
            <p className="text-gray-300 mb-4">All terminals • 45 mins from Central London</p>
            <p className="text-yellow-500 font-semibold text-lg">From £90</p>
            <p className="text-xs text-gray-400">SIA trained drivers</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <Plane className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Gatwick (LGW)</h3>
            <p className="text-gray-300 mb-4">North & South terminals • 1 hour from Central London</p>
            <p className="text-yellow-500 font-semibold text-lg">From £110</p>
            <p className="text-xs text-gray-400">SIA trained drivers</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <Plane className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Stansted (STN)</h3>
            <p className="text-gray-300 mb-4">Main terminal • 1 hour from Central London</p>
            <p className="text-yellow-500 font-semibold text-lg">From £100</p>
            <p className="text-xs text-gray-400">SIA trained drivers</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <Plane className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Luton (LTN)</h3>
            <p className="text-gray-300 mb-4">Main terminal • 45 mins from Central London</p>
            <p className="text-yellow-500 font-semibold text-lg">From £80</p>
            <p className="text-xs text-gray-400">SIA trained drivers</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <Plane className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">London City (LCY)</h3>
            <p className="text-gray-300 mb-4">Main terminal • 30 mins from Central London</p>
            <p className="text-yellow-500 font-semibold text-lg">From £70</p>
            <p className="text-xs text-gray-400">SIA trained drivers</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl text-center">
            <Plane className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Southend (SEN)</h3>
            <p className="text-gray-300 mb-4">Main terminal • 1.5 hours from Central London</p>
            <p className="text-yellow-500 font-semibold text-lg">From £130</p>
            <p className="text-xs text-gray-400">SIA trained drivers</p>
          </div>
        </div>

        {/* Service Areas */}
        <div className="bg-gray-900 p-8 rounded-xl mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center text-yellow-500">Our Service Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">From Watford & Surrounding Areas:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Watford Central</li>
                <li>• Kings Langley</li>
                <li>• Hemel Hempstead</li>
                <li>• St Albans</li>
                <li>• Rickmansworth</li>
                <li>• Bushey</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">From Central London Areas:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Westminster</li>
                <li>• Camden</li>
                <li>• Islington</li>
                <li>• Tower Hamlets</li>
                <li>• Southwark</li>
                <li>• All Central London postcodes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Flight Tracking</h3>
            <p className="text-gray-300">We monitor your flight and adjust pickup times accordingly</p>
          </div>
          
          <div className="text-center">
            <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Meet & Greet</h3>
            <p className="text-gray-300">Professional drivers waiting in arrivals with name board</p>
          </div>
          
          <div className="text-center">
            <Car className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Premium Vehicles</h3>
            <p className="text-gray-300">Clean, comfortable cars with ample luggage space</p>
          </div>
          
          <div className="text-center">
            <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-3">Door to Door</h3>
            <p className="text-gray-300">Direct service from your location to terminal</p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-yellow-500 p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Book Your Airport Transfer</h2>
          <p className="text-xl mb-8">Call us now for immediate booking or airport pickup</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:07407655203"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-3"
            >
              <Phone className="w-6 h-6" />
              <span>07407 655 203</span>
            </a>
            <a
              href="mailto:gqcars@giquinaholdings.com"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
