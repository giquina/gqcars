import AdvancedBookingForm from '@/app/components/booking/AdvancedBookingForm'
import { Shield, Clock, Award, Star, Zap, CheckCircle } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function BookingPage() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #d4af37'
          }
        }}
      />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-gq-gold" />
              <span className="text-gq-gold font-semibold">SIA Licensed Security Transport</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Book Your 
              <span className="bg-gradient-to-r from-gq-blue to-gq-gold bg-clip-text text-transparent"> Secure </span>
              Journey
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Professional SIA-licensed drivers, real-time tracking, and armored vehicle options. 
              Experience the ultimate in secure transportation.
            </p>
            
            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center gap-3 p-4 bg-gq-black/30 rounded-lg border border-gq-gold/20">
                <Clock className="w-6 h-6 text-gq-gold" />
                <span className="text-sm font-medium">< 5 Second Booking</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-gq-black/30 rounded-lg border border-gq-gold/20">
                <Zap className="w-6 h-6 text-gq-gold" />
                <span className="text-sm font-medium">Real-time Driver Tracking</span>
              </div>
              <div className="flex items-center justify-center gap-3 p-4 bg-gq-black/30 rounded-lg border border-gq-gold/20">
                <CheckCircle className="w-6 h-6 text-gq-gold" />
                <span className="text-sm font-medium">100% Price Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Booking Section */}
      <section className="py-20 bg-gradient-to-b from-gq-black to-gray-900">
        <div className="container mx-auto px-4">
          <AdvancedBookingForm />
        </div>
      </section>

      {/* Service Excellence */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose GQ Cars?</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We set the standard for professional security transport with our rigorous training, 
                advanced technology, and uncompromising commitment to safety.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 bg-gradient-to-b from-gq-blue/10 to-transparent rounded-lg border border-gray-700">
                <Shield className="w-16 h-16 text-gq-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">SIA Licensed</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  All drivers are fully SIA certified with enhanced DBS checks, close protection training, 
                  and continuous professional development.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-400">Verified & Active</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-b from-gq-gold/10 to-transparent rounded-lg border border-gray-700">
                <Clock className="w-16 h-16 text-gq-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">24/7 Availability</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Round-the-clock service with real-time driver availability, 
                  instant booking confirmation, and emergency response protocols.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  <span className="text-xs text-blue-400">Always Available</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-b from-gq-blue/10 to-transparent rounded-lg border border-gray-700">
                <Award className="w-16 h-16 text-gq-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Premium Fleet</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  From executive Mercedes to armored security vehicles, 
                  our fleet is maintained to the highest standards with full insurance coverage.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  <span className="text-xs text-yellow-400">Premium Quality</span>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-b from-gq-gold/10 to-transparent rounded-lg border border-gray-700">
                <Star className="w-16 h-16 text-gq-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">5-Star Service</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Consistently rated 5 stars by our clients for professionalism, 
                  punctuality, and discrete service across all sectors.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-xs text-amber-400">Highly Rated</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-gq-gold mb-2">99.9%</div>
                <div className="text-sm text-gray-400">On-time Performance</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gq-gold mb-2">24/7</div>
                <div className="text-sm text-gray-400">Emergency Support</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gq-gold mb-2">100%</div>
                <div className="text-sm text-gray-400">SIA Licensed</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-gq-gold mb-2">5★</div>
                <div className="text-sm text-gray-400">Client Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Standards */}
      <section className="py-16 bg-gradient-to-r from-gq-blue/10 to-gq-gold/10 border-y border-gq-gold/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-gq-gold" />
              Security & Compliance Standards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 bg-gq-black/30 rounded-lg">
                <h4 className="font-semibold text-gq-gold mb-2">Driver Certification</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>• SIA Close Protection License</li>
                  <li>• Enhanced DBS Clearance</li>
                  <li>• Professional Driving Permit</li>
                  <li>• First Aid Certification</li>
                </ul>
              </div>
              <div className="p-4 bg-gq-black/30 rounded-lg">
                <h4 className="font-semibold text-gq-gold mb-2">Vehicle Standards</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>• GPS Tracking Systems</li>
                  <li>• Secure Communication</li>
                  <li>• Full Insurance Coverage</li>
                  <li>• Regular Safety Inspections</li>
                </ul>
              </div>
              <div className="p-4 bg-gq-black/30 rounded-lg">
                <h4 className="font-semibold text-gq-gold mb-2">Operational Security</h4>
                <ul className="space-y-1 text-gray-400">
                  <li>• 24/7 Control Room</li>
                  <li>• Emergency Response</li>
                  <li>• Threat Assessment</li>
                  <li>• Incident Reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}