"use client"

import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { BoldAnimatedBackground, BoldSectionHeader, BoldButton, BoldCard, BoldStats } from './BoldDynamicComponents'
import { Shield, Star, Clock, Users, Phone, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

interface ServicePageProps {
  title: string
  subtitle: string
  description: string
  icon: any
  features: string[]
  stats: { value: string; label: string; icon?: any }[]
  pricing?: string
  color?: string
}

export default function BoldServiceTemplate({
  title,
  subtitle, 
  description,
  icon: Icon,
  features,
  stats,
  pricing,
  color = 'red'
}: ServicePageProps) {
  const colorVariants = {
    red: 'from-red-500 via-red-600 to-red-700',
    blue: 'from-blue-500 via-blue-600 to-blue-700',
    green: 'from-green-500 via-green-600 to-green-700',
    purple: 'from-purple-500 via-purple-600 to-purple-700',
    orange: 'from-orange-500 via-orange-600 to-orange-700'
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <BoldAnimatedBackground>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl">
              
              {/* Service Badge */}
              <div className="flex justify-start mb-8">
                <div className={`inline-flex items-center bg-gradient-to-r ${colorVariants[color]} text-white font-black px-6 py-3 rounded-full animate-pulse shadow-2xl border-2 border-yellow-300/30 hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 mr-2" />
                  🛡️ PREMIUM {title.toUpperCase()} SERVICE 🛡️
                  <Zap className="w-5 h-5 ml-2" />
                </div>
              </div>

              {/* Service Title */}
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight text-left">
                <span className="block text-white drop-shadow-2xl hover:scale-105 transition-transform duration-300 origin-left">{title}</span>
                <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  <span className="inline-block hover:scale-110 transition-transform duration-300 origin-left">SERVICE</span>
                </span>
              </h1>

              {/* Service Description */}
              <p className="text-xl md:text-2xl text-white mb-12 font-semibold text-left max-w-4xl">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-start mb-16">
                <Link href="/book">
                  <BoldButton variant="primary" size="lg" icon={Shield}>
                    BOOK {title.toUpperCase()} NOW
                  </BoldButton>
                </Link>
                <a href="tel:07407655203">
                  <BoldButton variant="secondary" size="lg" icon={Phone}>
                    CALL: 07407 655 203
                  </BoldButton>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
                {stats.map((stat, index) => (
                  <BoldStats 
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-20 z-10">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="Service Features"
              subtitle={`Everything included with our ${title.toLowerCase()} service`}
              icon={Shield}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <BoldCard key={index} animated glowing>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2 mr-4 animate-pulse"></div>
                    <p className="text-white font-semibold text-lg">{feature}</p>
                  </div>
                </BoldCard>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        {pricing && (
          <section className="relative py-20 z-10">
            <div className="container mx-auto px-4 text-center">
              <BoldCard className="max-w-2xl mx-auto" glowing>
                <h3 className="text-3xl font-black text-white mb-4">Premium Pricing</h3>
                <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                  {pricing}
                </div>
                <p className="text-gray-300 mb-8">Professional {title.toLowerCase()} service with SIA licensed personnel</p>
                <Link href="/book">
                  <BoldButton variant="primary" size="lg">
                    Book Service Now
                  </BoldButton>
                </Link>
              </BoldCard>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="relative py-20 z-10">
          <div className="container mx-auto px-4 text-center">
            <BoldCard className="max-w-4xl mx-auto" glowing>
              <h3 className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
                Ready to Book Your {title}?
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Contact our team 24/7 for immediate service or advance bookings
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:07407655203">
                  <BoldButton variant="primary" size="lg" icon={Phone}>
                    Call Now: 07407 655 203
                  </BoldButton>
                </a>
                <Link href="/book">
                  <BoldButton variant="secondary" size="lg">
                    Online Booking
                  </BoldButton>
                </Link>
              </div>
            </BoldCard>
          </div>
        </section>
      </BoldAnimatedBackground>
      
      <Footer />
    </div>
  )
}