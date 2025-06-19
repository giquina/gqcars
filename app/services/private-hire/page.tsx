import { Car, Shield, Star, MapPin, Clock, CheckCircle, Sparkles, Building2 } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'

export default function PrivateHirePage() {
  return (
    <>
      <ServiceHero
        title="Private Hire Services"
        description="Premium chauffeur services with trained security drivers and luxury vehicles for discerning clients."
        Icon={Car}
        image="/images/services/private-hire-hero.jpg"
      />

      {/* Fleet Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Luxury Fleet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <div key={vehicle.model} className="bg-gq-black/50 overflow-hidden group">
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-gq-black to-transparent z-10" />
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{vehicle.model}</h3>
                  <p className="text-gq-gold mb-4">{vehicle.category}</p>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-400">
                        <CheckCircle className="w-4 h-4 text-gq-gold" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Private Hire Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="bg-gq-black/50 p-8 border-l-4 border-gq-blue hover:border-gq-gold transition-all">
                <service.icon className="w-10 h-10 text-gq-gold mb-4" />
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <Shield className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Trained Drivers</h3>
              <p className="text-gray-400">Security-trained professional chauffeurs</p>
            </div>
            <div>
              <Star className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Luxury Vehicles</h3>
              <p className="text-gray-400">Premium fleet with advanced security</p>
            </div>
            <div>
              <Clock className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Service</h3>
              <p className="text-gray-400">Available any time, anywhere</p>
            </div>
            <div>
              <MapPin className="w-12 h-12 text-gq-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
              <p className="text-gray-400">International travel arrangements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Book Your Secure Transport</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the perfect blend of luxury and security with our professional chauffeur service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
            >
              Book Now
              <Car className="ml-2 h-5 w-5" />
            </a>
            <a
              href="tel:+442012345678"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gq-gold border-2 border-gq-gold hover:bg-gq-gold hover:text-white transition-colors"
            >
              Inquire
              <Clock className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const vehicles = [
  {
    model: "Mercedes-Benz S-Class",
    category: "Executive Sedan",
    image: "/images/vehicles/s-class.jpg",
    features: [
      "Armored protection available",
      "Privacy glass",
      "Extended legroom",
      "Wi-Fi connectivity",
      "Refreshment cooler"
    ]
  },
  {
    model: "Range Rover Autobiography",
    category: "Luxury SUV",
    image: "/images/vehicles/range-rover.jpg",
    features: [
      "Enhanced security features",
      "All-terrain capability",
      "Executive seating",
      "Climate control",
      "Secure storage"
    ]
  },
  {
    model: "BMW 7 Series",
    category: "Executive Sedan",
    image: "/images/vehicles/7-series.jpg",
    features: [
      "Advanced safety systems",
      "Rear entertainment",
      "Mobile office setup",
      "Air purification",
      "Massage seats"
    ]
  }
]

const services = [
  {
    title: "Corporate Transport",
    icon: Building2,
    description: "Professional chauffeur service for executives and business teams.",
    features: [
      "Airport transfers",
      "Conference transportation",
      "Road show logistics",
      "Multi-vehicle coordination",
      "Executive protection"
    ]
  },
  {
    title: "Event Transportation",
    icon: Sparkles,
    description: "Luxury transport for special occasions and events.",
    features: [
      "Wedding car service",
      "Awards ceremonies",
      "VIP event transport",
      "Celebrity protection",
      "Red carpet arrival"
    ]
  },
  {
    title: "Security Transport",
    icon: Shield,
    description: "Secure transportation with trained protection officers.",
    features: [
      "Armored vehicles",
      "Security driver",
      "Route planning",
      "Threat assessment",
      "Emergency protocols"
    ]
  }
]