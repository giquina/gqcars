import Link from 'next/link'

export default function TaxiService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🚕</div>
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Professional Taxi Service
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Quick, safe rides anywhere in London. Like a regular taxi, but better - with professional drivers and fair prices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose Our Taxis</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Licensed Drivers</h3>
                  <p className="text-gray-300">All drivers are licensed and background checked for your safety</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Fixed Prices</h3>
                  <p className="text-gray-300">No surge pricing - you know the cost upfront</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Clean Cars</h3>
                  <p className="text-gray-300">Well-maintained vehicles cleaned after every ride</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Quick Response</h3>
                  <p className="text-gray-300">Average pickup time: 5-10 minutes</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Sample Prices</h2>
            <div className="space-y-3">
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30 flex justify-between">
                <span>Central London (short trip)</span>
                <span className="font-bold text-blue-400">£8-15</span>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-purple-500/30 flex justify-between">
                <span>Cross London</span>
                <span className="font-bold text-purple-400">£15-25</span>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-green-500/30 flex justify-between">
                <span>To/from Heathrow</span>
                <span className="font-bold text-green-400">£45</span>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-yellow-500/30 flex justify-between">
                <span>Night service (11pm-6am)</span>
                <span className="font-bold text-yellow-400">+20%</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/50">
              <h3 className="font-bold mb-2">Payment Options:</h3>
              <p className="text-sm text-gray-300">Cash, Card, Apple Pay, Google Pay - your choice!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
            <p className="text-gray-300">Call, WhatsApp, or book online</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🕐</div>
            <h3 className="text-xl font-bold mb-2">Available 24/7</h3>
            <p className="text-gray-300">Day or night, we're here for you</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
            <p className="text-gray-300">GPS tracking and emergency support</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Need a Taxi Right Now?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="tel:0800-123-4567" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Call for Immediate Pickup
            </Link>
            <Link 
              href="/book" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Book for Later
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}