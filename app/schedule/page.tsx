import { Calendar, Clock, Phone, MessageCircle, Shield, Car } from 'lucide-react'

export default function SchedulePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-500 mb-4">
            Schedule Your Security Transport
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
            Plan ahead with <span className="text-yellow-500">professional SIA licensed drivers</span> for your important journeys
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Scheduling Form */}
          <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
            <h2 className="text-2xl font-bold text-white mb-6">Schedule Trip</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
                <input 
                  type="tel" 
                  placeholder="Contact Number" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <input 
                type="email" 
                placeholder="Email for Confirmation" 
                className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Pickup Address" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
                <input 
                  type="text" 
                  placeholder="Drop-off Address" 
                  className="bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-yellow-500 text-sm font-bold mb-2 block">Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-yellow-500 text-sm font-bold mb-2 block">Time</label>
                  <input 
                    type="time" 
                    className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-yellow-500 text-sm font-bold mb-2 block">Passengers</label>
                  <select className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5+</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-yellow-500 text-sm font-bold mb-2 block">Service Level</label>
                <select className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none">
                  <option>Standard Security Taxi</option>
                  <option>Executive Protection Service</option>
                  <option>Close Protection with Advance Team</option>
                  <option>Corporate Group Transport</option>
                  <option>VIP Airport Transfer</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-yellow-500 text-sm font-bold mb-2 block">Return Journey?</label>
                  <select className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none">
                    <option>No return needed</option>
                    <option>Yes - same day</option>
                    <option>Yes - different date</option>
                  </select>
                </div>
                <div>
                  <label className="text-yellow-500 text-sm font-bold mb-2 block">Payment Method</label>
                  <select className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none">
                    <option>Card Payment</option>
                    <option>Bank Transfer</option>
                    <option>Corporate Account</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>
              
              <textarea 
                placeholder="Special Requirements (child seats, accessibility needs, security briefing, etc.)" 
                rows={3}
                className="w-full bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-yellow-500 focus:outline-none"
              ></textarea>
              
              <button 
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 px-6 rounded-lg font-bold text-lg transition-colors"
              >
                SCHEDULE SECURITY TRANSPORT
              </button>
            </form>
          </div>

          {/* Scheduling Info & Contact */}
          <div className="space-y-6">
            
            {/* Immediate Booking */}
            <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Need Immediate Booking?</h3>
              <div className="space-y-4">
                <a 
                  href="tel:07407655203"
                  className="flex items-center space-x-3 bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-lg transition-colors group"
                >
                  <Phone className="w-5 h-5 group-hover:animate-pulse" />
                  <span className="font-bold">Call Now: 07407 655 203</span>
                </a>
                
                <a 
                  href="https://wa.me/447407655203?text=Hi! I need to schedule security transport."
                  className="flex items-center space-x-3 bg-green-600 hover:bg-green-500 text-white p-4 rounded-lg transition-colors group"
                  target="_blank"
                >
                  <MessageCircle className="w-5 h-5 group-hover:bounce" />
                  <span className="font-bold">WhatsApp Schedule</span>
                </a>
              </div>
            </div>

            {/* Scheduling Benefits */}
            <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-6">Why Schedule in Advance?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Guaranteed Availability</h4>
                    <p className="text-gray-300 text-sm">Secure your preferred time slot with SIA trained drivers</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Security Planning</h4>
                    <p className="text-gray-300 text-sm">Advanced route planning and security assessments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Car className="w-6 h-6 text-yellow-500 mt-1" />
                  <div>
                    <h4 className="text-white font-bold">Vehicle Selection</h4>
                    <p className="text-gray-300 text-sm">Choose the perfect vehicle for your requirements</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timing Info */}
            <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Booking Timeline</h3>
              <div className="space-y-3 text-gray-300 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span>Same day booking:</span>
                  <span className="text-yellow-500">Available 24/7</span>
                </div>
                <div className="flex justify-between">
                  <span>Advanced booking:</span>
                  <span className="text-yellow-500">Up to 6 months</span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmation time:</span>
                  <span className="text-yellow-500">Within 30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Cancellation:</span>
                  <span className="text-yellow-500">Free up to 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}