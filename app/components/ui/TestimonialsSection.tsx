'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, Shield, Building2, Car, Clock, ChevronLeft, ChevronRight, Check, Crown } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "James Richardson",
    title: "CEO, Richardson Financial Group",
    service: "Executive Transport",
    rating: 5,
    image: "👨‍💼",
    testimonial: "GQ Cars has been our exclusive transport provider for 3 years. Their SIA licensed drivers provide the security and professionalism our executives require. Never had a single issue.",
    location: "Canary Wharf, London",
    verified: true,
    serviceType: "corporate"
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    title: "International Business Consultant",
    service: "Airport Transfers",
    rating: 5,
    image: "👩‍💼",
    testimonial: "Fly into Heathrow monthly and GQ Cars is my go-to. Their drivers are always professional, vehicles immaculate, and the security training shows. Worth every penny.",
    location: "Heathrow Airport",
    verified: true,
    serviceType: "airport"
  },
  {
    id: 3,
    name: "David & Emma Thompson",
    title: "Wedding Clients",
    service: "Wedding Security Transport",
    rating: 5,
    image: "💑",
    testimonial: "On our wedding day, GQ Cars provided discreet security transport for our families. The SIA trained drivers were professional and kept everything smooth. Highly recommend!",
    location: "Central London",
    verified: true,
    serviceType: "wedding"
  },
  {
    id: 4,
    name: "Marcus Chen",
    title: "Tech Entrepreneur",
    service: "Personal Protection",
    rating: 5,
    image: "👨‍💻",
    testimonial: "After receiving threats, I needed reliable security transport. GQ Cars' close protection officers are exceptional. Professional, discrete, and always vigilant.",
    location: "Tech City, London",
    verified: true,
    serviceType: "protection"
  },
  {
    id: 5,
    name: "Lady Catherine Westbrook",
    title: "Private Client",
    service: "Family Office Transport",
    rating: 5,
    image: "👸",
    testimonial: "GQ Cars manages all our family's transport needs. Their SIA licensed drivers understand discretion and security. Exceptional service for high-net-worth families.",
    location: "Kensington, London",
    verified: true,
    serviceType: "family"
  },
  {
    id: 6,
    name: "Robert Davies",
    title: "Corporate Security Manager",
    service: "VIP Event Security",
    rating: 5,
    image: "🛡️",
    testimonial: "We use GQ Cars for all our VIP client events. Their security-trained drivers and luxury vehicles provide the perfect combination of safety and style.",
    location: "Mayfair, London",
    verified: true,
    serviceType: "vip"
  },
  {
    id: 7,
    name: "The Pemberton Family",
    title: "Family Office, Private Wealth Management",
    service: "Daily Family Security Transport",
    rating: 5,
    image: "👨‍👩‍👧‍👦",
    testimonial: "GQ Cars has been managing our family's transport security for 2 years. Their drivers are trained in family protection and our children feel completely safe. Professional, discrete, and completely reliable.",
    location: "Belgravia, London",
    verified: true,
    serviceType: "family"
  },
  {
    id: 8,
    name: "Sheikh Abdullah Al-Rashid",
    title: "International Business Leader",
    service: "Luxury Shopping Security",
    rating: 5,
    image: "🏛️",
    testimonial: "During our London shopping trips to Harrods and Bond Street, GQ Cars provided exceptional security. Their drivers understand luxury retail security and coordinated perfectly with store security teams.",
    location: "Harrods & Bond Street",
    verified: true,
    serviceType: "retail"
  },
  {
    id: 9,
    name: "Victoria Sterling",
    title: "Socialite & Philanthropist",
    service: "Nightlife & Event Security",
    rating: 5,
    image: "💃",
    testimonial: "For private member's clubs and charity galas, GQ Cars provides discrete security transport. Their drivers blend seamlessly into London's social scene while maintaining professional protection.",
    location: "Mayfair Private Clubs",
    verified: true,
    serviceType: "lifestyle"
  },
  {
    id: 10,
    name: "Dr. Harrison Blackwell",
    title: "Government Advisor",
    service: "Diplomatic Security Transport",
    rating: 5,
    image: "🎩",
    testimonial: "Sensitive government meetings require the highest security standards. GQ Cars' SIA licensed drivers have government clearance and understand diplomatic protocols perfectly. Essential service.",
    location: "Westminster, London",
    verified: true,
    serviceType: "government"
  }
]

const caseStudies = [
  {
    id: 1,
    title: "High-Profile Celebrity Airport Transfer",
    client: "International Recording Artist",
    challenge: "Secure transport from Heathrow to West End hotel amid heavy media attention and paparazzi presence",
    solution: "Deployed 2 SIA licensed CPOs, luxury vehicle with tinted windows, coordinated route planning with decoy vehicles",
    result: "Zero security incidents, client arrived safely and on time, media successfully managed",
    duration: "3 hours",
    team: "2 CPO drivers + security coordinator",
    category: "Celebrity Protection"
  },
  {
    id: 2,
    title: "Family Office Weekly Security Transport",
    client: "Ultra-High-Net-Worth Family (£500M+ assets)",
    challenge: "Coordinated daily transport for family members including children to schools, spouse to charity events, and patriarch to business meetings",
    solution: "Dedicated fleet of 4 vehicles with SIA licensed family protection specialists, route variation protocols, child-trained CPOs",
    result: "24 months of incident-free family transport, 100% on-time school runs, enhanced family security posture",
    duration: "Ongoing 2-year contract",
    team: "6 specialized family CPO drivers + security manager",
    category: "Family Office Protection"
  },
  {
    id: 3,
    title: "Corporate Executive Weekly Security",
    client: "FTSE 100 Company CEO",
    challenge: "Daily secure transport between residences, offices, and high-risk business meetings following credible threats",
    solution: "Dedicated SIA licensed driver, executive protection vehicle with armor plating, real-time route monitoring and threat assessment",
    result: "18 months of incident-free transport, 100% on-time performance, enhanced executive confidence",
    duration: "Ongoing contract",
    team: "3 rotating CPO drivers + threat analyst",
    category: "Executive Protection"
  },
  {
    id: 4,
    title: "Royal Wedding Security Transport",
    client: "High-Profile Wedding (500+ guests)",
    challenge: "Coordinate secure transport for VIP guests including government officials, celebrities, and international dignitaries",
    solution: "Fleet of 8 security vehicles, 12 SIA licensed drivers, police liaison coordination, real-time guest tracking",
    result: "All VIPs transported safely, zero disruptions to ceremony, seamless coordination with royal protection unit",
    duration: "2 days",
    team: "12 CPO drivers + security manager + police liaison",
    category: "Event Security"
  },
  {
    id: 5,
    title: "Nightlife Security for Tech Billionaire",
    client: "Tech Industry Entrepreneur (Recent IPO)",
    challenge: "Discreet security transport for private member's clubs, Michelin-starred restaurants, and exclusive nightlife venues in Mayfair and Soho",
    solution: "2 unmarked luxury vehicles, 4 SIA licensed CPOs trained in hospitality security, venue liaison coordination, emergency extraction protocols",
    result: "6 months of incident-free nightlife protection, maintained client privacy, established venue security partnerships",
    duration: "6 months",
    team: "4 specialized hospitality CPO drivers + venue coordinator",
    category: "Lifestyle Protection"
  },
  {
    id: 6,
    title: "Harrods & Bond Street Shopping Security",
    client: "Middle Eastern Royal Family Member",
    challenge: "Secure shopping experience across Harrods, Selfridges, and Bond Street boutiques with significant purchase values and privacy concerns",
    solution: "3-vehicle security convoy, 6 SIA licensed CPOs, store security coordination, private shopping arrangements, secure payment processing",
    result: "£2M+ shopping experience completed safely, zero security incidents, enhanced store relationships for future visits",
    duration: "1 week London visit",
    team: "6 CPO drivers + retail security coordinator + store liaisons",
    category: "Retail Security"
  },
  {
    id: 7,
    title: "Government Diplomatic Transport",
    client: "Foreign Ministry Official Visit",
    challenge: "Secure transport for visiting government delegation during sensitive trade negotiations, requiring government-level security protocols",
    solution: "Armored diplomatic vehicles, SIA licensed CPOs with government clearance, Metropolitan Police coordination, secure route planning",
    result: "Successful 5-day diplomatic visit, all security protocols maintained, enhanced UK diplomatic relations",
    duration: "5 days",
    team: "8 government-cleared CPO drivers + diplomatic security manager",
    category: "Diplomatic Security"
  },
  {
    id: 8,
    title: "Private Jet to Mansion Transfer",
    client: "International Business Magnate",
    challenge: "Coordinated secure transport from private jet at Farnborough Airport to £50M Kensington mansion during hostile takeover period",
    solution: "Luxury armored vehicle, 3 SIA licensed CPOs, airport security coordination, residential security handover, media management",
    result: "Seamless high-profile arrival, zero media exposure, successful handover to residential security team",
    duration: "4 hours",
    team: "3 executive CPO drivers + media liaison + residential coordinator",
    category: "Executive Protection"
  },
  {
    id: 9,
    title: "Art Gallery & Auction House Security",
    client: "International Art Collector",
    challenge: "Secure transport to Sotheby's, Christie's, and private galleries for £10M+ art acquisitions with high-value item transport",
    solution: "Specialized art transport vehicle, 4 SIA licensed CPOs with art handling training, auction house security coordination, insurance compliance",
    result: "Successful acquisition of 12 pieces worth £15M total, zero damage or security incidents, enhanced auction house relationships",
    duration: "2 weeks",
    team: "4 specialized art security CPO drivers + art transport coordinator",
    category: "Specialized Security"
  },
  {
    id: 10,
    title: "Family Vacation Security Package",
    client: "Tech Executive Family (4 members)",
    challenge: "2-week London vacation security including children's activities, tourist attractions, and family dining with international threat concerns",
    solution: "2-vehicle family convoy, 4 SIA licensed family-trained CPOs, child protection specialists, tourist security planning, 24/7 availability",
    result: "Perfect family vacation experience, children's safety maintained, all attractions visited safely, family peace of mind",
    duration: "2 weeks",
    team: "4 family specialist CPO drivers + child protection coordinator",
    category: "Family Protection"
  }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCaseStudies, setShowCaseStudies] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.serviceType === selectedCategory)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 border border-yellow-500 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 border border-blue-500 rotate-12 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-black/50 px-6 py-3 rounded-full mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-yellow-500 font-bold">CLIENT TESTIMONIALS</span>
            <Shield className="w-6 h-6 text-yellow-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TRUSTED BY LONDON'S ELITE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See why CEOs, celebrities, and high-net-worth families choose our 
            <span className="text-yellow-500 font-semibold"> SIA licensed security drivers</span>
          </p>
        </div>

        {/* Toggle Between Testimonials and Case Studies */}
        <div className="flex justify-center mb-12">
          <div className="bg-black/50 p-2 rounded-xl border border-yellow-500/30">
            <button
              onClick={() => setShowCaseStudies(false)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                !showCaseStudies 
                  ? 'bg-yellow-500 text-black' 
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              TESTIMONIALS
            </button>
            <button
              onClick={() => setShowCaseStudies(true)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                showCaseStudies 
                  ? 'bg-yellow-500 text-black' 
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              CASE STUDIES
            </button>
          </div>
        </div>

        {!showCaseStudies ? (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { key: 'all', label: 'ALL', icon: Star },
                { key: 'corporate', label: 'CORPORATE', icon: Building2 },
                { key: 'airport', label: 'AIRPORT', icon: Car },
                { key: 'protection', label: 'PROTECTION', icon: Shield },
                { key: 'family', label: 'FAMILY OFFICE', icon: Users },
                { key: 'wedding', label: 'WEDDINGS', icon: Quote },
                { key: 'vip', label: 'VIP EVENTS', icon: Crown },
                { key: 'lifestyle', label: 'LIFESTYLE', icon: Star },
                { key: 'retail', label: 'SHOPPING', icon: Building2 },
                { key: 'government', label: 'DIPLOMATIC', icon: Shield }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                    selectedCategory === key 
                      ? 'bg-yellow-500 text-black' 
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Main Testimonial Display */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-black/50 p-8 rounded-2xl border border-yellow-500/30 max-w-4xl mx-auto relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <Quote className="w-6 h-6 text-yellow-500" />
                </div>

                {/* Stars Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <div className="text-center mb-8">
                  <blockquote className="text-xl md:text-2xl text-white italic mb-6 leading-relaxed">
                    "{filteredTestimonials[currentTestimonial]?.testimonial}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-4xl">{filteredTestimonials[currentTestimonial]?.image}</div>
                    <div className="text-left">
                      <h4 className="text-yellow-500 font-bold text-lg flex items-center space-x-2">
                        <span>{filteredTestimonials[currentTestimonial]?.name}</span>
                        {filteredTestimonials[currentTestimonial]?.verified && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </h4>
                      <p className="text-gray-300">{filteredTestimonials[currentTestimonial]?.title}</p>
                      <p className="text-blue-400 text-sm">{filteredTestimonials[currentTestimonial]?.service}</p>
                      <p className="text-gray-400 text-sm">{filteredTestimonials[currentTestimonial]?.location}</p>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-500 text-black p-2 rounded-full hover:bg-yellow-400 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Testimonial Dots */}
              <div className="flex justify-center space-x-2 mt-6">
                {filteredTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-yellow-500 scale-125' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Mini Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {testimonials.slice(0, 3).map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{testimonial.image}</span>
                    <div>
                      <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                      <p className="text-gray-400 text-xs">{testimonial.service}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm italic">
                    "{testimonial.testimonial.slice(0, 100)}..."
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Case Studies Section
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              REAL SECURITY SUCCESS STORIES
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <div key={study.id} className="bg-gradient-to-br from-gray-800/60 to-black/60 p-6 rounded-2xl border border-yellow-500/30 hover:border-yellow-500/60 transition-all hover:transform hover:scale-105">
                  <div className="mb-4">
                    <div className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">
                      {study.category}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{study.title}</h4>
                    <p className="text-blue-400 text-sm font-semibold">Client: {study.client}</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <h5 className="text-red-400 font-bold mb-1">CHALLENGE:</h5>
                      <p className="text-gray-300">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-blue-400 font-bold mb-1">SOLUTION:</h5>
                      <p className="text-gray-300">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h5 className="text-green-400 font-bold mb-1">RESULT:</h5>
                      <p className="text-gray-300">{study.result}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between text-xs text-gray-400">
                    <span>Duration: {study.duration}</span>
                    <span>Team: {study.team}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-gradient-to-r from-gray-900/80 to-black/80 p-8 rounded-2xl border border-yellow-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-yellow-500 font-bold text-3xl mb-2">500+</div>
              <div className="text-gray-300 text-sm">VERIFIED REVIEWS</div>
            </div>
            <div>
              <div className="text-yellow-500 font-bold text-3xl mb-2">98%</div>
              <div className="text-gray-300 text-sm">CLIENT RETENTION</div>
            </div>
            <div>
              <div className="text-yellow-500 font-bold text-3xl mb-2">15</div>
              <div className="text-gray-300 text-sm">YEARS EXPERIENCE</div>
            </div>
            <div>
              <div className="text-yellow-500 font-bold text-3xl mb-2">4.9★</div>
              <div className="text-gray-300 text-sm">AVERAGE RATING</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            JOIN OUR SATISFIED CLIENTS
          </h3>
          <p className="text-gray-300 mb-8">
            Experience the same professional security transport that London's elite trust
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:07407655203"
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Shield className="w-5 h-5" />
              <span>BOOK SECURITY TRANSPORT</span>
            </a>
            <a 
              href="/testimonials"
              className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Quote className="w-5 h-5" />
              <span>READ ALL REVIEWS</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}