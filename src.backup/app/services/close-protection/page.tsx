import Link from 'next/link'

export default function CloseProtectionService() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🛡️</div>
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Personal Security Services
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional protection officers for your safety and peace of mind. All our officers are licensed and trained.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">When You Might Need Protection</h2>
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg border border-blue-500/30">
                <h3 className="font-bold mb-2">🏠 High-Value Shopping</h3>
                <p className="text-gray-300">Buying expensive items? We'll keep you safe while shopping.</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-purple-500/30">
                <h3 className="font-bold mb-2">🎭 Events & Parties</h3>
                <p className="text-gray-300">VIP protection for premieres, galas, or private events.</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-green-500/30">
                <h3 className="font-bold mb-2">💼 Business Meetings</h3>
                <p className="text-gray-300">Discreet protection for important business occasions.</p>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="font-bold mb-2">✈️ Travel Security</h3>
                <p className="text-gray-300">Safe escort to airports or train stations.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">What Our Officers Do</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Risk Assessment</h3>
                  <p className="text-gray-300">Check the area and identify potential problems before you arrive</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Close Protection</h3>
                  <p className="text-gray-300">Stay close to you and watch for any threats or problems</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Crowd Management</h3>
                  <p className="text-gray-300">Help you move safely through busy areas or events</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h3 className="font-bold">Emergency Response</h3>
                  <p className="text-gray-300">Trained to handle emergencies and keep you safe</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-500/20 rounded-lg border border-blue-500/50">
              <h3 className="font-bold mb-2">All Officers Are:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• SIA Licensed (Security Industry Authority)</li>
                <li>• Background Checked & Vetted</li>
                <li>• Professionally Trained</li>
                <li>• Smartly Dressed & Discreet</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-8">Need Personal Protection?</h2>
          <p className="text-gray-300 mb-8">Starting from £150/day. Available 24/7 across London.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Request Security Officer
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