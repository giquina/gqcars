'use client'

import { motion } from 'framer-motion'
import { 
  Car, 
  Shield, 
  Crown, 
  Users, 
  Plane, 
  Building2, 
  Heart, 
  ShoppingBag, 
  Sparkles,
  ArrowRight,
  Star,
  Phone
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'taxi',
    title: 'Professional Taxi',
    description: 'SIA licensed security drivers providing premium taxi service',
    Icon: Car,
    color: 'from-blue-500 to-blue-600',
    href: '/services/taxi',
    features: ['24/7 Available', 'GPS Tracking', 'Secure Payment'],
    popular: false
  },
  {
    id: 'private-hire',
    title: 'Private Hire',
    description: 'Premium private hire with security-trained drivers',
    Icon: Crown,
    color: 'from-purple-500 to-purple-600',
    href: '/services/private-hire',
    features: ['Premium Vehicles', 'Advance Booking', 'Professional Service'],
    popular: true
  },
  {
    id: 'close-protection',
    title: 'Close Protection',
    description: 'SIA licensed close protection officers and secure transport',
    Icon: Shield,
    color: 'from-red-500 to-red-600',
    href: '/services/close-protection',
    features: ['SIA Licensed CPOs', 'Threat Assessment', 'Secure Routes'],
    popular: false
  },
  {
    id: 'airport',
    title: 'Airport Transfers',
    description: 'Secure airport transfers to all London airports',
    Icon: Plane,
    color: 'from-green-500 to-green-600',
    href: '/services/airport',
    features: ['Flight Monitoring', 'Meet & Greet', 'Fixed Pricing'],
    popular: true
  },
  {
    id: 'corporate',
    title: 'Corporate Transport',
    description: 'Executive transport solutions for businesses',
    Icon: Building2,
    color: 'from-yellow-500 to-orange-500',
    href: '/services/corporate',
    features: ['Account Management', 'Reporting', 'Volume Discounts'],
    popular: false
  },
  {
    id: 'family-office',
    title: 'Family Office',
    description: 'Discrete family transport and security services',
    Icon: Users,
    color: 'from-indigo-500 to-indigo-600',
    href: '/services/family-office',
    features: ['Complete Discretion', 'Family Coordination', 'Security Protocols'],
    popular: false
  },
  {
    id: 'weddings',
    title: 'Wedding Transport',
    description: 'Special day transport with security and elegance',
    Icon: Heart,
    color: 'from-pink-500 to-pink-600',
    href: '/services/weddings',
    features: ['Bridal Packages', 'Decoration Options', 'Photography Support'],
    popular: false
  },
  {
    id: 'diplomatic',
    title: 'Diplomatic Services',
    description: 'High-level diplomatic and government transport',
    Icon: Star,
    color: 'from-gray-600 to-gray-700',
    href: '/services/diplomatic',
    features: ['Security Clearance', 'Protocol Training', 'Secure Communications'],
    popular: false
  },
  {
    id: 'vip',
    title: 'VIP Services',
    description: 'Ultra-premium transport for high-profile clients',
    Icon: Sparkles,
    color: 'from-yellow-400 to-yellow-500',
    href: '/services/vip',
    features: ['Luxury Vehicles', 'Red Carpet Service', 'Personal Concierge'],
    popular: false
  },
  {
    id: 'shopping',
    title: 'Shopping Tours',
    description: 'Secure shopping excursions and personal assistance',
    Icon: ShoppingBag,
    color: 'from-emerald-500 to-emerald-600',
    href: '/services/shopping',
    features: ['Personal Shopping', 'Package Security', 'Multiple Destinations'],
    popular: false
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Services',
    description: 'Comprehensive lifestyle and concierge transport',
    Icon: Crown,
    color: 'from-violet-500 to-violet-600',
    href: '/services/lifestyle',
    features: ['Event Planning', 'Restaurant Bookings', 'Personal Assistant'],
    popular: false
  },
  {
    id: 'professional-support',
    title: '24/7 Support',
    description: 'Round-the-clock professional support and assistance',
    Icon: Phone,
    color: 'from-blue-600 to-blue-700',
    href: '/services/professional-support',
    features: ['24/7 Available', 'Emergency Response', 'Live Tracking'],
    popular: false
  }
]

export default function ServicesOverview() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4">
            <Shield className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-semibold">Professional Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            SIA Licensed <span className="text-yellow-500">Security Transport</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Professional security-trained drivers providing premium transport services across London. 
            All our drivers are SIA licensed close protection officers.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link href={service.href} className="block">
                <div className={`
                  relative bg-gray-800/50 rounded-2xl p-6 border border-gray-700 
                  hover:border-yellow-500/50 transition-all duration-300 
                  hover:shadow-2xl hover:shadow-yellow-500/10
                  group-hover:scale-[1.02] overflow-hidden
                `}>
                  {/* Popular Badge */}
                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}

                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Service Icon */}
                  <div className={`
                    w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} 
                    flex items-center justify-center mb-4 relative z-10
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    <service.Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Service Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1 mb-4">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-500">
                          <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More Button */}
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-500 font-semibold text-sm group-hover:text-yellow-400 transition-colors">
                        Learn More
                      </span>
                      <ArrowRight className="w-4 h-4 text-yellow-500 group-hover:text-yellow-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/20 rounded-2xl transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-yellow-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our security-trained drivers can provide bespoke transport solutions for any requirement. 
              Contact us to discuss your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:07407655203"
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl transition-all inline-flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Call: 07407 655 203</span>
              </a>
              <a
                href="/quote"
                className="bg-transparent border-2 border-yellow-500 hover:bg-yellow-500 text-yellow-500 hover:text-black font-bold py-3 px-8 rounded-xl transition-all"
              >
                Get Custom Quote
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}