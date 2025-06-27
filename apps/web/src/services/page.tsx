import Link from 'next/link'
import { 
  Car, Shield, Briefcase, Plane, Heart, ShoppingBag, 
  Users, Zap, Crown, Clock, ArrowRight 
} from 'lucide-react'

const services = [
  {
    id: 'taxi',
    name: 'Professional Taxi Service',
    description: 'SIA licensed security professionals providing premium taxi service across London.',
    icon: Car,
    href: '/services/taxi',
    color: 'from-blue-500 to-cyan-500',
    features: ['24/7 Available', 'SIA Licensed', 'Professional Service']
  },
  {
    id: 'private-hire',
    name: 'Private Hire',
    description: 'Reliable, pre-booked car services with security-trained drivers.',
    icon: Car,
    href: '/services/private-hire',
    color: 'from-green-500 to-emerald-500',
    features: ['Pre-booked', 'Security Trained', 'Reliable Service']
  },
  {
    id: 'airport',
    name: 'Airport Transfers',
    description: 'Secure, punctual transfers to all London airports with flight monitoring.',
    icon: Plane,
    href: '/services/airport',
    color: 'from-purple-500 to-violet-500',
    features: ['Flight Monitoring', 'Meet & Greet', 'All Airports']
  },
  {
    id: 'close-protection',
    name: 'Close Protection',
    description: 'Personal security from elite, SIA-licensed Close Protection Officers.',
    icon: Shield,
    href: '/services/close-protection',
    color: 'from-red-500 to-pink-500',
    features: ['SIA Licensed CPOs', 'Elite Security', 'Personal Protection']
  },
  {
    id: 'corporate',
    name: 'Corporate Transport',
    description: 'Executive transport for meetings, events, and corporate roadshows.',
    icon: Briefcase,
    href: '/services/corporate',
    color: 'from-gray-600 to-gray-800',
    features: ['Executive Service', 'Corporate Events', 'Professional Drivers']
  },
  {
    id: 'family-office',
    name: 'Family Office',
    description: 'Coordinated security transport for high-net-worth families.',
    icon: Users,
    href: '/services/family-office',
    color: 'from-yellow-500 to-orange-500',
    features: ['Family Coordination', 'HNW Service', 'Discrete Transport']
  },
  {
    id: 'vip',
    name: 'VIP & Events',
    description: 'Secure transport for galas, premieres, and major events.',
    icon: Crown,
    href: '/services/vip',
    color: 'from-purple-600 to-pink-600',
    features: ['Event Transport', 'VIP Service', 'Red Carpet Ready']
  },
  {
    id: 'weddings',
    name: 'Wedding Transport',
    description: 'Elegant and secure transport for your special day.',
    icon: Heart,
    href: '/services/weddings',
    color: 'from-pink-500 to-rose-500',
    features: ['Special Occasions', 'Elegant Service', 'Bridal Transport']
  },
  {
    id: 'diplomatic',
    name: 'Diplomatic Services',
    description: 'Protocol-aware transport for government and diplomatic affairs.',
    icon: Shield,
    href: '/services/diplomatic',
    color: 'from-indigo-500 to-blue-600',
    features: ['Protocol Aware', 'Government Service', 'Diplomatic Transport']
  },
  {
    id: 'shopping',
    name: 'Luxury Shopping',
    description: 'Discreet driver service for your London shopping experiences.',
    icon: ShoppingBag,
    href: '/services/shopping',
    color: 'from-emerald-500 to-teal-500',
    features: ['Luxury Shopping', 'Discreet Service', 'Personal Shopper Support']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle Services',
    description: 'On-demand transport for your social engagements and lifestyle needs.',
    icon: Zap,
    href: '/services/lifestyle',
    color: 'from-orange-500 to-red-500',
    features: ['On-Demand', 'Social Events', 'Lifestyle Support']
  },
  {
    id: 'professional-support',
    name: 'Professional Support',
    description: '24/7 professional support with intelligent dispatch and rapid response.',
    icon: Clock,
    href: '/services/professional-support',
    color: 'from-cyan-500 to-blue-500',
    features: ['24/7 Support', 'Rapid Response', 'Intelligent Dispatch']
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-yellow-500 hover:text-yellow-400 transition-colors">
            <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-16 h-16 border border-yellow-500 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 border border-blue-500 animate-bounce"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Our Professional Services
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Comprehensive security transport solutions with <span className="text-yellow-400 font-semibold">SIA licensed drivers</span> for all your travel needs
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
                <div className="text-gray-400">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">SIA</div>
                <div className="text-gray-400">Licensed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">12+</div>
                <div className="text-gray-400">Services</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <div
                  key={service.id}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{service.name}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-semibold transition-colors group-hover:transform group-hover:translate-x-2"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Book Your Service?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact our professional team for immediate booking or get an instant quote online.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07407655203"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Call Now - 07407 655 203</span>
              </a>
              <Link
                href="/book"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Book Online</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}