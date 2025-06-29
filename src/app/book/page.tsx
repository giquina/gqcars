export default function BookPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Book Your Service
          </h1>
          
          <div className="bg-black/50 p-8 rounded-lg border border-blue-500/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center p-6 bg-blue-500/20 rounded-lg border border-blue-500/50">
                <h2 className="text-2xl font-bold mb-4">📞 Call to Book</h2>
                <p className="text-gray-300 mb-4">Fastest way to book any service</p>
                <a href="tel:0800-123-4567" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors inline-block">
                  Call: 0800 123 4567
                </a>
              </div>
              
              <div className="text-center p-6 bg-green-500/20 rounded-lg border border-green-500/50">
                <h2 className="text-2xl font-bold mb-4">💬 WhatsApp</h2>
                <p className="text-gray-300 mb-4">Quick booking via WhatsApp</p>
                <a href="https://wa.me/447123456789" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors inline-block">
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">What We Need From You:</h3>
              <div className="text-left max-w-md mx-auto space-y-2 text-gray-300">
                <div>• Where you need to go</div>
                <div>• When you need the service</div>
                <div>• What type of service (ride, security, etc.)</div>
                <div>• Your contact details</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/50">
              <div className="text-center">
                <h3 className="font-bold mb-2">⚡ Emergency Booking</h3>
                <p className="text-sm text-gray-300">Need immediate service? Call us now - we're available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}