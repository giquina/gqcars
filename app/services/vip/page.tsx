import { Star, Shield, Car, Globe, Users, Clock, CheckCircle, Building2 } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'
import Animate from '@/app/components/ui/Animate'

export default function VIPServicesPage() {
  return (
    <>
      <ServiceHero
        title="VIP Security Services"
        description="Bespoke security and transport solutions for high-profile clients."
        Icon={Star}
        image="/images/services/vip-hero.jpg"
      />

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Elite VIP Services</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vipServices.map((service, index) => (
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

      {/* Client Types */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Client Sectors</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {clientTypes.map((type, index) => (
              <Animate key={type.title} type="slide-up" delay={index * 0.1}>
                <div className="text-center">
                  <type.icon className="w-12 h-12 text-gq-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                  <p className="text-gray-400">{type.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Security Features</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Animate key={feature.title} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-8">
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <ul className="space-y-3">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gq-gold flex-shrink-0 mt-1" />
                        <span className="text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Global Coverage */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">International Service</h2>
            <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
              Professional security services coordinated across major global destinations.
            </p>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <Animate key={destination.region} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-8">
                  <h3 className="text-xl font-bold mb-4">{destination.region}</h3>
                  <ul className="space-y-2 text-gray-400">
                    {destination.locations.map((location, i) => (
                      <li key={i}>{location}</li>
                    ))}
                  </ul>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Transport */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Vehicle Fleet</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <Animate key={vehicle.model} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 overflow-hidden group">
                  <div className="aspect-[16/9] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gq-black to-transparent z-10" />
                    <div className="w-full h-full bg-gradient-to-br from-gq-blue to-gq-black" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <h3 className="text-xl font-bold mb-2">{vehicle.model}</h3>
                      <p className="text-gq-gold mb-2">{vehicle.category}</p>
                      <ul className="space-y-1">
                        {vehicle.features.map((feature, i) => (
                          <li key={i} className="text-gray-400 text-sm">{feature}</li>
                        ))}
                      </ul>
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
            <h2 className="text-3xl font-bold mb-6">Experience Elite Protection</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact us to discuss your VIP security requirements and receive a bespoke service proposal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
              >
                Request Consultation
                <Star className="ml-2 h-5 w-5" />
              </a>
              <a
                href="tel:+442012345678"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gq-gold border-2 border-gq-gold hover:bg-gq-gold hover:text-white transition-colors"
              >
                24/7 VIP Line
                <Clock className="ml-2 h-5 w-5" />
              </a>
            </div>
          </Animate>
        </div>
      </section>
    </>
  )
}

const vipServices = [
  {
    title: "Personal Protection",
    description: "Dedicated close protection officers for individual security.",
    icon: Shield
  },
  {
    title: "Secure Transport",
    description: "Armored vehicles and trained security drivers.",
    icon: Car
  },
  {
    title: "International Security",
    description: "Global security coordination and travel protection.",
    icon: Globe
  },
  {
    title: "Event Security",
    description: "Comprehensive security for private and public events.",
    icon: Users
  },
  {
    title: "Residential Security",
    description: "24/7 property protection and access control.",
    icon: Building2
  },
  {
    title: "Rapid Response",
    description: "Emergency response and crisis management.",
    icon: Clock
  }
]

const clientTypes = [
  {
    title: "Executives",
    description: "Corporate leaders and business executives",
    icon: Building2
  },
  {
    title: "Celebrities",
    description: "Entertainment and sports personalities",
    icon: Star
  },
  {
    title: "Diplomats",
    description: "Government officials and diplomats",
    icon: Globe
  },
  {
    title: "Private Clients",
    description: "High-net-worth individuals and families",
    icon: Shield
  }
]

const features = [
  {
    title: "Personal Security",
    items: [
      "24/7 close protection coverage",
      "Advance security planning",
      "Route and venue assessment",
      "Threat analysis and mitigation",
      "Privacy protection measures",
      "Emergency extraction protocols"
    ]
  },
  {
    title: "Travel Security",
    items: [
      "International security coordination",
      "Secure airport transfers",
      "Hotel security assessment",
      "Local security liaison",
      "Secure meeting arrangements",
      "Travel risk management"
    ]
  },
  {
    title: "Event Protection",
    items: [
      "Venue security assessment",
      "Access control systems",
      "VIP guest management",
      "Media management",
      "Emergency response teams",
      "Multi-agency coordination"
    ]
  },
  {
    title: "Technical Security",
    items: [
      "Counter-surveillance measures",
      "Communications security",
      "Cyber threat protection",
      "Asset tracking systems",
      "Security equipment deployment",
      "24/7 monitoring capabilities"
    ]
  }
]

const destinations = [
  {
    region: "Europe",
    locations: [
      "London & UK Cities",
      "Paris & French Riviera",
      "Monaco & Mediterranean",
      "Swiss Financial Centers",
      "Major EU Capitals"
    ]
  },
  {
    region: "Middle East",
    locations: [
      "Dubai & UAE",
      "Saudi Arabia",
      "Qatar & Bahrain",
      "Kuwait & Oman",
      "Regional Business Hubs"
    ]
  },
  {
    region: "Americas",
    locations: [
      "New York & East Coast",
      "Los Angeles & West Coast",
      "Miami & Florida",
      "Toronto & Vancouver",
      "Major Business Centers"
    ]
  }
]

const vehicles = [
  {
    model: "Mercedes-Maybach S680",
    category: "Ultra-Luxury Sedan",
    features: [
      "Armored protection available",
      "Extended wheelbase",
      "Premium interior",
      "Advanced security features",
      "Executive seating"
    ]
  },
  {
    model: "Range Rover SV",
    category: "Luxury SUV",
    features: [
      "Armored capability",
      "All-terrain performance",
      "Privacy configuration",
      "Enhanced security",
      "Command seating position"
    ]
  },
  {
    model: "BMW 7 Series Protection",
    category: "Armored Sedan",
    features: [
      "Ballistic protection",
      "Run-flat tires",
      "Secure communications",
      "Emergency systems",
      "Executive configuration"
    ]
  }
]