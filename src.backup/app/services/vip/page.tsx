import Link from 'next/link'

export default function VIPService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Luxury VIP Transport
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Premium vehicles and professional chauffeurs for your special occasions. Arrive in style and comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Perfect For</h2>
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg border border-purple-500/30">
                <h3 className="font-bold mb-2">💒 Weddings</h3>
                <p className="text-gray-300">Make your special day perfect with luxury wedding cars</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold mb-2">🎭 Red Carpet Events</h3>
                <p className="text-gray-300">Premieres, galas, and award ceremonies</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-green-500/30">
                <h3 className="font-bold mb-2">🎂 Special Birthdays</h3>
                <p className="text-gray-300">Milestone birthdays and anniversaries</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold mb-2">💼 Important Meetings</h3>
                <p className="text-gray-300">Make the right impression for business</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Our Luxury Fleet</h2>
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold">Mercedes S-Class</h3>
                <p className="text-sm text-gray-300">Ultimate comfort and luxury</p>
                <p className="text-blue-400 font-bold">From £120/hour</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-purple-500/30">
                <h3 className="font-bold">BMW 7 Series</h3>
                <p className="text-sm text-gray-300">Sophisticated and powerful</p>
                <p className="text-purple-400 font-bold">From £110/hour</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-green-500/30">
                <h3 className="font-bold">Rolls Royce</h3>
                <p className="text-sm text-gray-300">The pinnacle of luxury</p>
                <p className="text-green-400 font-bold">From £250/hour</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold">Bentley</h3>
                <p className="text-sm text-gray-300">British luxury at its finest</p>
                <p className="text-yellow-400 font-bold">From £200/hour</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Ready for the VIP Treatment?</h2>
          <p className="text-gray-300 mb-8">All vehicles include professional chauffeur, complimentary refreshments, and red carpet service.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Book VIP Service
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