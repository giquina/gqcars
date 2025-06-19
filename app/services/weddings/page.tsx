import { ChampagneGlass, Shield, Car, Users, Camera, Clock, MapPin, CheckCircle } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'
import Animate from '@/app/components/ui/Animate'

export default function WeddingSecurityPage() {
  return (
    <>
      <ServiceHero
        title="Wedding Security Services"
        description="Discreet security and luxury transport for your special day."
        Icon={ChampagneGlass}
        image="/images/services/wedding-hero.jpg"
      />

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Wedding Security</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {weddingServices.map((service, index) => (
              <Animate key={service.title} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-8 border-l-4 border-gq-blue hover:border-gq-gold transition-all">
                  <service.icon className="w-10 h-10 text-gq-gold mb-4" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Wedding Security Packages</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Animate key={pkg.title} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-8">
                  <h3 className="text-xl font-bold mb-4">{pkg.title}</h3>
                  <p className="text-gray-400 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gq-gold flex-shrink-0 mt-1" />
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
                  >
                    Request Quote
                  </a>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose GQ Security</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Animate key={feature.title} type="slide-up" delay={index * 0.1}>
                <div className="text-center">
                  <feature.icon className="w-12 h-12 text-gq-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Venues Section */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Venue Experience</h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Our security teams have extensive experience protecting events at prestigious venues across the UK.
            </p>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue, index) => (
              <Animate key={venue.name} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 overflow-hidden group">
                  <div className="aspect-[16/9] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gq-black to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-gq-blue to-gq-black" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
                      <p className="text-gray-400">{venue.description}</p>
                    </div>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Animate type="fade">
            <h2 className="text-3xl font-bold mb-6">Secure Your Special Day</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your wedding security requirements and receive a personalized protection plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
              >
                Request Consultation
                <ChampagneGlass className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:+442012345678"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gq-gold border-2 border-gq-gold hover:bg-gq-gold hover:text-white transition-colors"
              >
                Call Now
                <Clock className="ml-2 h-5 w-5" />
              </a>
            </div>
          </Animate>
        </div>
      </section>
    </>
  )
}

const weddingServices = [
  {
    title: "Venue Security",
    description: "Professional security teams for venue protection and access control.",
    icon: Shield
  },
  {
    title: "VIP Transport",
    description: "Luxury vehicles with trained security drivers for the wedding party.",
    icon: Car
  },
  {
    title: "Guest Management",
    description: "Discreet security personnel for guest list management and crowd control.",
    icon: Users
  },
  {
    title: "Asset Protection",
    description: "Secure storage and monitoring of gifts, valuables, and personal items.",
    icon: Shield
  },
  {
    title: "Media Management",
    description: "Control of photography and social media according to client wishes.",
    icon: Camera
  },
  {
    title: "Emergency Response",
    description: "Rapid response team for any security or medical emergencies.",
    icon: Clock
  }
]

const packages = [
  {
    title: "Essential Wedding Security",
    description: "Core security services for intimate weddings",
    features: [
      "2 SIA licensed security officers",
      "Access control and guest list management",
      "Secure gift storage",
      "Basic emergency response planning",
      "6 hours of coverage"
    ]
  },
  {
    title: "Premium Protection",
    description: "Comprehensive security for larger celebrations",
    features: [
      "4 SIA licensed security officers",
      "Luxury vehicle service",
      "VIP guest management",
      "Asset protection team",
      "Media access control",
      "12 hours of coverage",
      "Advanced emergency planning"
    ]
  },
  {
    title: "Elite Wedding Security",
    description: "Full-spectrum security for high-profile weddings",
    features: [
      "6+ SIA licensed security officers",
      "Multiple luxury vehicles",
      "Close protection for key family members",
      "Professional media management",
      "Comprehensive security planning",
      "24-hour coverage",
      "Dedicated emergency response team"
    ]
  }
]

const features = [
  {
    title: "SIA Licensed",
    description: "All security officers hold current SIA licenses.",
    icon: Shield
  },
  {
    title: "Luxury Fleet",
    description: "Premium vehicles with security-trained drivers.",
    icon: Car
  },
  {
    title: "Experience",
    description: "Extensive high-profile event security experience.",
    icon: Clock
  },
  {
    title: "UK Coverage",
    description: "Service available at venues across the UK.",
    icon: MapPin
  }
]

const venues = [
  {
    name: "Luxury Hotels",
    description: "Five-star hotels and exclusive venues across London"
  },
  {
    name: "Country Estates",
    description: "Historic manor houses and private estates"
  },
  {
    name: "City Landmarks",
    description: "Iconic urban venues and prestigious locations"
  },
  {
    name: "Religious Venues",
    description: "Churches, synagogues, and other religious venues"
  },
  {
    name: "Outdoor Venues",
    description: "Gardens, parks, and marquee events"
  },
  {
    name: "Private Clubs",
    description: "Exclusive members clubs and private venues"
  }
]