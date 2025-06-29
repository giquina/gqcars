'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Shield, Building2, Clock, MapPin, Car, User, Crown, ShoppingBag, Heart } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const testimonials = [
  {
    name: 'James Richardson',
    title: 'CEO, Financial Group',
    image: '👨‍💼',
    quote: 'GQ Cars has been our exclusive transport provider for 3 years. Their SIA licensed drivers provide the security and professionalism our executives require.',
    category: 'Corporate'
  },
  {
    name: 'Sarah Mitchell',
    title: 'International Consultant',
    image: '👩‍💼',
    quote: 'Fly into Heathrow monthly and GQ Cars is my go-to. Their drivers are always professional, vehicles immaculate, and the security training shows.',
    category: 'Airport'
  },
  {
    name: 'David & Emma Thompson',
    title: 'Wedding Clients',
    image: '💑',
    quote: 'Our wedding day security transport was flawless. The SIA trained drivers were professional and kept everything smooth.',
    category: 'Events'
  }
]

const caseStudies = [
  {
    title: 'High-Profile Airport Transfer',
    client: 'International Artist',
    challenge: 'Heavy media presence at Heathrow',
    solution: 'Multiple vehicle convoy, decoy routes',
    result: 'Zero security incidents, on-time arrival',
    icon: Car
  },
  {
    title: 'Royal Wedding Security',
    client: 'Private Wedding',
    challenge: 'Multiple VIP guests requiring protection',
    solution: 'Fleet of 8 security vehicles, police liaison',
    result: 'Seamless event security coordination',
    icon: Heart
  },
  {
    title: 'Corporate Executive Protection',
    client: 'FTSE 100 CEO',
    challenge: 'Daily secure transport, high-risk meetings',
    solution: 'Dedicated CPO team, armored vehicle',
    result: '18 months incident-free operation',
    icon: Building2
  }
]

export function TestimonialsAndCaseStudies() {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'cases'>('testimonials')
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-20 sm:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-4"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-semibold">Client Success Stories</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by London's Elite
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            See why CEOs, celebrities, and high-net-worth families choose our
            <span className="text-yellow-500"> SIA licensed security drivers</span>.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'testimonials'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Client Testimonials
            </button>
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'cases'
                  ? 'bg-yellow-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Case Studies
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {activeTab === 'testimonials' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{testimonial.image}</span>
                      <div>
                        <h3 className="font-semibold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {caseStudies.map((study, index) => (
                  <motion.div
                    key={study.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
                  >
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4">
                      <study.icon className="w-6 h-6 text-yellow-500" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">{study.title}</h3>
                    <p className="text-yellow-500 text-sm mb-4">{study.client}</p>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-400">
                        <span className="text-red-400 font-semibold">Challenge:</span> {study.challenge}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-blue-400 font-semibold">Solution:</span> {study.solution}
                      </p>
                      <p className="text-gray-400">
                        <span className="text-green-400 font-semibold">Result:</span> {study.result}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}