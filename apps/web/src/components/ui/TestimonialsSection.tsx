'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Quote, Shield, Building2, Car, Clock, ChevronLeft, ChevronRight, Check, Crown, Users, ShoppingBag, Briefcase, Heart } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from './BoldDynamicComponents'

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
    category: "Corporate"
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
    category: "Airport"
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
    category: "Weddings"
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
    category: "Protection"
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
    category: "Family Office"
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
    category: "VIP Events"
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
    category: "Family Office"
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
    category: "Shopping"
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
    category: "Lifestyle"
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
    category: "Diplomatic"
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

const categories = [
  { name: 'All', icon: Star, category: 'All' },
  { name: 'Corporate', icon: Briefcase, category: 'Corporate' },
  { name: 'Airport', icon: Building2, category: 'Airport' },
  { name: 'Protection', icon: Shield, category: 'Protection' },
  { name: 'Family Office', icon: Users, category: 'Family Office' },
  { name: 'Weddings', icon: Heart, category: 'Weddings' },
  { name: 'VIP Events', icon: Crown, category: 'VIP Events' },
  { name: 'Lifestyle', icon: Star, category: 'Lifestyle' },
  { name: 'Shopping', icon: ShoppingBag, category: 'Shopping' },
  { name: 'Diplomatic', icon: Shield, category: 'Diplomatic' },
]

export default function TestimonialsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredTmls, setFilteredTmls] = useState(testimonials)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
    ClassNames()
  ])

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTmls(testimonials)
    } else {
      setFilteredTmls(testimonials.filter(tml => tml.category === selectedCategory))
    }
    if (emblaApi) emblaApi.reInit()
  }, [selectedCategory, emblaApi])
  
  return (
    <BoldAnimatedBackground>
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          <BoldSectionHeader 
            title="CLIENT TESTIMONIALS"
            subtitle="🏆 Trusted by London's Elite - See why CEOs, celebrities, and high-net-worth families choose our SIA licensed security drivers"
            icon={Star}
            centered
          />

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <BoldCard animated glowing className="text-center">
              <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">500+</p>
              <p className="text-sm text-gray-300 font-semibold">🏆 Verified Reviews</p>
            </BoldCard>
            <BoldCard animated glowing className="text-center">
              <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">98%</p>
              <p className="text-sm text-gray-300 font-semibold">🔄 Client Retention</p>
            </BoldCard>
            <BoldCard animated glowing className="text-center">
              <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">15</p>
              <p className="text-sm text-gray-300 font-semibold">⏱️ Years Experience</p>
            </BoldCard>
            <BoldCard animated glowing className="text-center">
              <p className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">4.9★</p>
              <p className="text-sm text-gray-300 font-semibold">⭐ Average Rating</p>
            </BoldCard>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(({ name, icon: Icon, category }) => (
              <BoldButton
                key={name}
                variant={selectedCategory === category ? "primary" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                🔥 {name.toUpperCase()}
              </BoldButton>
            ))}
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {filteredTmls.map((tml) => (
                <div className="flex-grow-0 flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-3 embla__slide" key={tml.id}>
                  <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="text-3xl mr-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full w-12 h-12 flex items-center justify-center border border-yellow-400/30">
                          {tml.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-black text-white mb-1 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                            🛡️ {tml.name.toUpperCase()}
                          </h3>
                          <p className="text-xs text-gray-300 font-semibold">{tml.service}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < tml.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 font-semibold italic leading-relaxed">
                        "⚡ {tml.testimonial}"
                      </p>
                      <div className="mt-4 pt-4 border-t border-yellow-400/20">
                        <p className="text-xs text-yellow-400 font-bold">📍 {tml.location}</p>
                        {tml.verified && (
                          <div className="flex items-center mt-2">
                            <Check className="w-3 h-3 text-green-400 mr-1" />
                            <span className="text-xs text-green-400 font-semibold">Verified Client</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </BoldCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </BoldAnimatedBackground>
  )
}