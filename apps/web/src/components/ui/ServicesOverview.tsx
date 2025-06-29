'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Car, 
  Building2, 
  Crown, 
  Users, 
  Heart, 
  ShoppingBag, 
  Briefcase, 
  Plane, 
  Star,
  MapPin,
  Phone,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from './BoldDynamicComponents'

const services = [
  {
    id: 'airport',
    name: 'Airport Transfers',
    description: 'Secure and reliable airport transportation with SIA licensed drivers',
    icon: Plane,
    color: 'from-blue-500 to-blue-600',
    features: ['Heathrow, Gatwick, City', 'Flight tracking', 'Meet & greet service']
  },
  {
    id: 'close-protection',
    name: 'Close Protection',
    description: 'Professional personal security and threat management',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    features: ['SIA licensed CPOs', 'Threat assessment', '24/7 protection']
  },
  {
    id: 'corporate',
    name: 'Corporate Security',
    description: 'Comprehensive business and executive protection',
    icon: Building2,
    color: 'from-purple-500 to-purple-600',
    features: ['Executive transport', 'Meeting security', 'Corporate events']
  },
  {
    id: 'diplomatic',
    name: 'Diplomatic Services',
    description: 'Government-level security for diplomatic missions',
    icon: Crown,
    color: 'from-yellow-500 to-orange-500',
    features: ['Government clearance', 'Diplomatic protocols', 'High-level security']
  },
  {
    id: 'family-office',
    name: 'Family Office',
    description: 'Discreet security for high-net-worth families',
    icon: Users,
    color: 'from-green-500 to-green-600',
    features: ['Family protection', 'Child security', 'Discrete service']
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle Security',
    description: 'Security for social events and lifestyle needs',
    icon: Star,
    color: 'from-pink-500 to-pink-600',
    features: ['Social events', 'Nightlife security', 'Luxury transport']
  },
  {
    id: 'private-hire',
    name: 'Private Hire',
    description: 'Luxury vehicle service with security trained drivers',
    icon: Car,
    color: 'from-indigo-500 to-indigo-600',
    features: ['Luxury vehicles', 'Professional drivers', 'Flexible booking']
  },
  {
    id: 'professional-support',
    name: 'Professional Support',
    description: 'Specialized security for professionals',
    icon: Briefcase,
    color: 'from-teal-500 to-teal-600',
    features: ['Professional transport', 'Meeting security', 'Client protection']
  },
  {
    id: 'shopping',
    name: 'Shopping Security',
    description: 'Secure shopping experiences in luxury retail',
    icon: ShoppingBag,
    color: 'from-rose-500 to-rose-600',
    features: ['Retail security', 'Purchase protection', 'Discrete service']
  },
  {
    id: 'taxi',
    name: 'Security Taxi',
    description: 'Standard security transport with SIA licensed drivers',
    icon: Car,
    color: 'from-gray-500 to-gray-600',
    features: ['SIA licensed drivers', 'GPS tracking', '24/7 availability']
  },
  {
    id: 'vip',
    name: 'VIP Services',
    description: 'Bespoke security solutions for high-profile clients',
    icon: Crown,
    color: 'from-amber-500 to-amber-600',
    features: ['VIP protection', 'Luxury vehicles', 'Dedicated service']
  },
  {
    id: 'weddings',
    name: 'Wedding Security',
    description: 'Discreet security for your special day',
    icon: Heart,
    color: 'from-red-400 to-pink-500',
    features: ['Wedding transport', 'Family protection', 'Event security']
  }
]

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <BoldCard animated glowing className="h-full">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
            <service.icon className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-black text-white mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all">
              🛡️ {service.name.toUpperCase()}
            </h3>
            <p className="text-gray-300 text-sm mb-4 font-semibold">
              {service.description}
            </p>
            <div className="space-y-2">
              {service.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center space-x-2 text-xs text-gray-400">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Hover overlay with CTA */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/services/${service.id}`}>
            <BoldButton variant="primary" size="lg">
              🔥 LEARN MORE
            </BoldButton>
          </Link>
        </div>
      </BoldCard>
    </motion.div>
  )
}

export default function ServicesOverview() {
  return (
    <BoldAnimatedBackground>
      <section className="relative py-20 z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BoldSectionHeader 
              title="COMPLETE SECURITY SOLUTIONS"
              subtitle="🛡️ From airport transfers to VIP protection - SIA licensed security drivers for every need"
              icon={Shield}
              centered
            />
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <BoldCard glowing className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🔥 NEED A CUSTOM SOLUTION?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-semibold">
                Our security experts design bespoke transport solutions tailored to your specific requirements and threat assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <BoldButton variant="primary" size="lg">
                    ⚡ CONTACT US NOW
                  </BoldButton>
                </Link>
                <Link href="/assessment">
                  <BoldButton variant="secondary" size="lg">
                    🛡️ SECURITY ASSESSMENT
                  </BoldButton>
                </Link>
              </div>
            </BoldCard>
          </motion.div>
        </div>
      </section>
    </BoldAnimatedBackground>
  )
} 