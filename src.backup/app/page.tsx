import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            GQ CARS
          </h1>
          <p className="text-3xl mb-4 font-bold">
            Safe Rides & Personal Protection
          </p>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Need to get somewhere safely? Want a professional driver? Need personal security? 
            We've got you covered 24/7 across London.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/book" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Book a Ride Now
            </Link>
            <Link 
              href="/services/close-protection" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Get Security Protection
            </Link>
          </div>

          {/* Live Status */}
          <div className="inline-flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span className="text-sm">Online: 247 Cars Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
              <span className="text-sm">12 Security Officers Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Link href="/services/airport" className="bg-black/50 p-8 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors group">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400">Airport Rides</h3>
            <p className="text-gray-300">Reliable transport to and from any airport. No stress, just comfort.</p>
          </Link>

          <Link href="/services/vip" className="bg-black/50 p-8 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors group">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-purple-400">Luxury Cars</h3>
            <p className="text-gray-300">Premium vehicles for special occasions. Arrive in style.</p>
          </Link>

          <Link href="/services/close-protection" className="bg-black/50 p-8 rounded-lg border border-blue-500/30 hover:border-blue-400 transition-colors group">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400">Personal Security</h3>
            <p className="text-gray-300">Professional protection officers for your safety and peace of mind.</p>
          </Link>

          <Link href="/services/corporate" className="bg-black/50 p-8 rounded-lg border border-green-500/30 hover:border-green-400 transition-colors group">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-green-400">Business Travel</h3>
            <p className="text-gray-300">Reliable transport for meetings, events, and business trips.</p>
          </Link>

          <Link href="/services/weddings" className="bg-black/50 p-8 rounded-lg border border-pink-500/30 hover:border-pink-400 transition-colors group">
            <div className="text-4xl mb-4">💒</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-pink-400">Weddings & Events</h3>
            <p className="text-gray-300">Make your special day perfect with our luxury service.</p>
          </Link>

          <Link href="/services/taxi" className="bg-black/50 p-8 rounded-lg border border-yellow-500/30 hover:border-yellow-400 transition-colors group">
            <div className="text-4xl mb-4">🚕</div>
            <h3 className="text-xl font-bold mb-4 group-hover:text-yellow-400">Taxi Service</h3>
            <p className="text-gray-300">Quick, safe rides anywhere in London. Just like a regular taxi, but better.</p>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">Why People Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-4">Trusted & Safe</h3>
            <p className="text-gray-300">All our drivers are licensed and background checked. Your safety is our priority.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🕐</div>
            <h3 className="text-xl font-bold mb-4">Always Available</h3>
            <p className="text-gray-300">24/7 service, 365 days a year. We're here when you need us most.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-4">Fair Prices</h3>
            <p className="text-gray-300">No hidden fees, no surge pricing. What you see is what you pay.</p>
          </div>
        </div>
      </div>
    </div>
  )
}