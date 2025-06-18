import { Shield, Clock, Award, MapPin, Building2, ChampagneGlass, Car, Star, Phone } from 'lucide-react'
import { reviewStructuredData } from './lib/seo'
import { StructuredData } from './components/SEO'

// Sample reviews data for structured data
const reviews = [
  {
    author: "James Smith",
    rating: 5,
    text: "Exceptional close protection service. Professional, discreet, and highly skilled team."
  },
  {
    author: "Sarah Williams",
    rating: 5,
    text: "Outstanding wedding security service. Made our special day worry-free and memorable."
  },
  {
    author: "Michael Brown",
    rating: 5,
    text: "Reliable corporate security solutions. Excellent communication and professionalism."
  },
  {
    author: "Emma Davis",
    rating: 5,
    text: "Top-quality VIP transport service. Luxury vehicles and experienced security drivers."
  }
]

export default function Home() {
  const reviewData = reviewStructuredData(reviews)

  return (
    <>
      <StructuredData data={reviewData} />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Elite Close Protection & Private Hire
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
              SIA licensed security professionals providing discreet protection and premium transport services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/book" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
                Book Now
                <Shield className="ml-2 h-5 w-5" />
              </a>
              <a href="#services" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
                Our Services
                <Star className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Professional Security Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="/services/close-protection" className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all group">
              <Shield className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-500 transition-colors">Close Protection</h3>
              <p className="text-gray-400">SIA licensed officers providing professional personal security and threat management.</p>
            </a>
            
            <a href="/services/private-hire" className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all group">
              <Car className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-500 transition-colors">Private Hire</h3>
              <p className="text-gray-400">Premium chauffeur services with trained security drivers and luxury vehicles.</p>
            </a>
            
            <a href="/services/corporate" className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all group">
              <Building2 className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-500 transition-colors">Corporate Security</h3>
              <p className="text-gray-400">Comprehensive security solutions for businesses and executive protection.</p>
            </a>
            
            <a href="/services/weddings" className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all group">
              <ChampagneGlass className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-500 transition-colors">Wedding Security</h3>
              <p className="text-gray-400">Discreet protection and luxury transport for your special day.</p>
            </a>
            
            <a href="/services/vip" className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all group">
              <Star className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-amber-500 transition-colors">VIP Services</h3>
              <p className="text-gray-400">Bespoke security and transport solutions for high-profile clients.</p>
            </a>
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <MapPin className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Event Security</h3>
              <p className="text-gray-400">Professional security coordination for events and special occasions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Choose GQ Security</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-gray-400 font-medium">SIA Licensed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Protection</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">10+</div>
              <div className="text-gray-400 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Schema */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Client Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-slate-900/50 p-6 border-l-4 border-amber-500">
                <div className="flex items-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                <p className="text-amber-500 font-semibold">- {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience Elite Security?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us now to discuss your security requirements and receive a personalized quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+442012345678" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
              Call Now
              <Phone className="ml-2 h-5 w-5" />
            </a>
            <a href="/book" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
              Request Quote
              <Award className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
