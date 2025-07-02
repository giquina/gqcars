'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Users, Shield, Star, ArrowRight } from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  client: string
  clientType: string
  challenge: string
  solution: string[]
  results: string[]
  duration: string
  teamSize: string
  testimonial: {
    quote: string
    author: string
    position: string
  }
  metrics: {
    label: string
    value: string
    icon: React.ComponentType<any>
  }[]
}

interface ServiceCaseStudiesProps {
  caseStudies: CaseStudy[]
  serviceTitle: string
}

export default function ServiceCaseStudies({ caseStudies, serviceTitle }: ServiceCaseStudiesProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {serviceTitle} <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Case Studies</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real examples of how GQ Cars has delivered exceptional security transport solutions for our clients
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-yellow-500/20 overflow-hidden hover:border-yellow-500/40 transition-all duration-300"
            >
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column: Challenge & Solution */}
                  <div className="space-y-6">
                    {/* Case Study Header */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                          CASE STUDY {index + 1}
                        </div>
                        <span className="text-gray-400 text-sm">{caseStudy.clientType}</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black text-white">
                        {caseStudy.title}
                      </h3>
                      <p className="text-lg text-yellow-400 font-semibold">{caseStudy.client}</p>
                    </div>

                    {/* Challenge */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white flex items-center">
                        <Shield className="w-5 h-5 text-red-400 mr-2" />
                        Challenge
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{caseStudy.challenge}</p>
                    </div>

                    {/* Solution */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                        GQ Cars Solution
                      </h4>
                      <ul className="space-y-2">
                        {caseStudy.solution.map((item, idx) => (
                          <li key={idx} className="flex items-start text-gray-300">
                            <ArrowRight className="w-4 h-4 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="w-4 h-4 mr-2" />
                        {caseStudy.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Users className="w-4 h-4 mr-2" />
                        {caseStudy.teamSize}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Results & Testimonial */}
                  <div className="space-y-6">
                    {/* Results */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-white flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 mr-2" />
                        Results Achieved
                      </h4>
                      <ul className="space-y-2">
                        {caseStudy.results.map((result, idx) => (
                          <li key={idx} className="flex items-start text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      {caseStudy.metrics.map((metric, idx) => {
                        const IconComponent = metric.icon
                        return (
                          <div key={idx} className="bg-gray-800/50 rounded-lg p-4 text-center">
                            <IconComponent className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                            <div className="text-xs text-gray-400">{metric.label}</div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20">
                      <div className="mb-4">
                        <svg className="w-8 h-8 text-yellow-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                        </svg>
                      </div>
                      <blockquote className="text-white italic text-lg leading-relaxed mb-4">
                        "{caseStudy.testimonial.quote}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-bold text-yellow-400">{caseStudy.testimonial.author}</div>
                        <div className="text-gray-400">{caseStudy.testimonial.position}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-2xl border border-yellow-500/20 p-8">
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
              Ready to Experience the <span className="text-yellow-400">GQ Cars Difference?</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our prestigious client roster and experience the same level of professional, secure transport solutions showcased in these case studies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/book"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-8 py-4 rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 flex items-center justify-center"
              >
                Book Your Service
                <ArrowRight className="w-5 h-5 ml-2" />
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-yellow-500 text-yellow-400 font-bold px-8 py-4 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                Discuss Your Requirements
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}