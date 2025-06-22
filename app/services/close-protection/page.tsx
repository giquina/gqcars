import { Shield, CheckCircle, Medal, Clock } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'

export default function CloseProtectionPage() {
  return (
    <>
      <ServiceHero
        title="Close Protection Services"
        description="SIA licensed close protection officers providing professional personal security and threat management for high-profile clients."
        Icon={Shield}
        image="/images/services/close-protection-hero.jpg"
      />

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gq-black/50 p-6 rounded-none border-l-4 border-gq-blue">
              <Shield className="w-10 h-10 text-gq-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">SIA Licensed</h3>
              <p className="text-gray-400">All officers hold current SIA licenses and advanced security certifications.</p>
            </div>
            
            <div className="bg-gq-black/50 p-6 rounded-none border-l-4 border-gq-blue">
              <CheckCircle className="w-10 h-10 text-gq-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Risk Assessment</h3>
              <p className="text-gray-400">Comprehensive threat analysis and security planning for all scenarios.</p>
            </div>
            
            <div className="bg-gq-black/50 p-6 rounded-none border-l-4 border-gq-blue">
              <Medal className="w-10 h-10 text-gq-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Elite Training</h3>
              <p className="text-gray-400">Officers trained in advanced protection techniques and crisis management.</p>
            </div>
            
            <div className="bg-gq-black/50 p-6 rounded-none border-l-4 border-gq-blue">
              <Clock className="w-10 h-10 text-gq-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Service</h3>
              <p className="text-gray-400">Round-the-clock protection and immediate professional response.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Officers Section */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Protection Officers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officers.map((officer) => (
              <div key={officer.name} className="bg-gq-black/50 overflow-hidden group">
                <div className="aspect-[3/4] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gq-black to-transparent z-10" />
                  <img
                    src={officer.image}
                    alt={officer.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-xl font-bold mb-1">{officer.name}</h3>
                    <p className="text-gq-gold mb-2">{officer.role}</p>
                    <p className="text-sm text-gray-400">{officer.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Protection Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-gq-black/50 p-8 border-l-4 border-gq-blue hover:border-gq-gold transition-all">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-gq-gold flex-shrink-0 mt-1" />
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Professional Protection?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us now to discuss your security requirements and receive a personalized protection plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
            >
              Request Quote
              <Shield className="ml-2 h-5 w-5" />
            </a>
            <a
              href="tel:+442012345678"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gq-gold border-2 border-gq-gold hover:bg-gq-gold hover:text-white transition-colors"
            >
              Call Now
              <Clock className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const officers = [
  {
    name: "James Wilson",
    role: "Head of Protection",
    image: "/images/officers/officer-1.jpg",
    description: "Former special forces with 15+ years in close protection. SIA licensed, advanced medical training."
  },
  {
    name: "Sarah Mitchell",
    role: "Protection Specialist",
    image: "/images/officers/officer-2.jpg",
    description: "Counter-surveillance expert with diplomatic protection experience. SIA licensed."
  },
  {
    name: "David Thompson",
    role: "Security Consultant",
    image: "/images/officers/officer-3.jpg",
    description: "Risk assessment specialist with corporate security background. SIA licensed."
  }
]

const services = [
  {
    title: "Executive Protection",
    features: [
      "24/7 personal security coverage",
      "Advance route planning and surveillance",
      "Secure transportation coordination",
      "Risk assessment and mitigation",
      "Crisis response protocols"
    ]
  },
  {
    title: "Event Security",
    features: [
      "VIP guest protection",
      "Venue security assessment",
      "Access control management",
      "Evacuation planning",
      "Coordination with local authorities"
    ]
  },
  {
    title: "Travel Security",
    features: [
      "International journey management",
      "Secure hotel arrangements",
      "Local security liaison",
      "Cultural security briefings",
      "Secure extraction planning"
    ]
  },
  {
    title: "Family Protection",
    features: [
      "Home security assessment",
      "School route protection",
      "Residential security teams",
      "Privacy protection measures",
      "Child protection specialists"
    ]
  },
  {
    title: "Corporate Security",
    features: [
      "Executive team protection",
      "Office security assessment",
      "Crisis management planning",
      "Staff security training",
      "Secure meeting arrangements"
    ]
  },
  {
    title: "Special Events",
    features: [
      "Wedding security teams",
      "Red carpet event protection",
      "Celebrity security details",
      "Crowd management",
      "Paparazzi management"
    ]
  }
]