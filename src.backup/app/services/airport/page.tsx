import Link from 'next/link'

export default function AirportService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">✈️</div>
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Airport Transfers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Stress-free rides to and from any airport in London. We track your flight and adjust for delays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">What's Included</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Flight Tracking</h3>
                  <p className="text-gray-300">We monitor your flight and adjust pickup time for delays</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Meet & Greet</h3>
                  <p className="text-gray-300">Driver waits for you in arrivals with your name sign</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Luggage Help</h3>
                  <p className="text-gray-300">Driver helps with your bags and knows the best route</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">No Extra Charges</h3>
                  <p className="text-gray-300">Fixed price includes waiting time and flight delays</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Airports We Serve</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold">Heathrow (LHR)</h3>
                <p className="text-sm text-gray-300">£45 - 60 minutes</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold">Gatwick (LGW)</h3>
                <p className="text-sm text-gray-300">£55 - 70 minutes</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold">Stansted (STN)</h3>
                <p className="text-sm text-gray-300">£65 - 80 minutes</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold">Luton (LTN)</h3>
                <p className="text-sm text-gray-300">£55 - 75 minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Book Your Airport Transfer?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Book Airport Transfer
            </Link>
            <Link 
              href="tel:0800-123-4567" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Call: 0800 123 4567
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}