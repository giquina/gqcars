import { Phone, Mail, MessageCircle, Car, Shield, Clock } from 'lucide-react'

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-4">
            Get Your Security Taxi Quote
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Professional pricing for <span className="text-yellow-500">SIA Licensed</span> security transport services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Quote Form */}
          <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Request Quote</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Pickup Location" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Destination" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="date" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
                <input 
                  type="time" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <select className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none">
                <option>Service Type</option>
                <option>Standard Taxi</option>
                <option>Executive Car</option>
                <option>Close Protection Service</option>
                <option>Corporate Transport</option>
                <option>Airport Transfer</option>
              </select>
              
              <textarea 
                placeholder="Additional Requirements (Number of passengers, special needs, etc.)" 
                rows={4}
                className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              ></textarea>
              
              <button 
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 px-6 rounded-lg font-bold text-lg transition-colors"
              >
                GET INSTANT QUOTE
              </button>
            </form>
          </div>

          {/* Quick Contact & Info */}
          <div className="space-y-6">
            
            {/* Instant Contact */}
            <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Need Immediate Quote?</h3>
              <div className="space-y-4">
                <a 
                  href="tel:07407655203"
                  className="flex items-center space-x-3 bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-lg transition-colors group"
                >
                  <Phone className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="font-bold">Call: 07407 655 203</span>
                </a>
                
                <a 
                  href="https://wa.me/447407655203?text=Hi! I need a quote for security taxi services."
                  className="flex items-center space-x-3 bg-green-600 hover:bg-green-500 text-white p-4 rounded-lg transition-colors group"
                  target="_blank"
                >
                  <MessageCircle className="w-5 h-5 group-hover:bounce" />
                  <span className="font-bold">WhatsApp Quote</span>
                </a>
              </div>
            </div>

            {/* Service Features */}
            <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-6">What You Get</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-300">SIA Licensed Close Protection Officers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Car className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-300">Premium Security Fleet</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-yellow-500" />
                  <span className="text-gray-300">24/7 Availability</span>
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Transparent Pricing</h3>
              <ul className="text-gray-300 space-y-2 text-sm sm:text-base">
                <li>• No hidden fees</li>
                <li>• Competitive security transport rates</li>
                <li>• Volume discounts available</li>
                <li>• Corporate accounts welcome</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
