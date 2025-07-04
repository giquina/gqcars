'use client'

import { Shield, Clock, MapPin, Phone, Mail, Linkedin, Facebook, Instagram, Star, Award, CheckCircle, Lock, TrendingUp, Users, Calendar, Globe } from 'lucide-react'
import Link from 'next/link'
import { BoldAnimatedBackground, BoldCard } from './BoldDynamicComponents'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import SIALogo from './SIALogo'
import TFLLogo from './TFLLogo'

export default function Footer() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [stats, setStats] = useState({
    clients: 0,
    rating: 0,
    years: 0,
    drivers: 0
  })

  // Animated stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        clients: prev.clients < 1247 ? prev.clients + 17 : 1247,
        rating: prev.rating < 4.98 ? prev.rating + 0.02 : 4.98,
        years: prev.years < 8 ? prev.years + 1 : 8,
        drivers: prev.drivers < 45 ? prev.drivers + 1 : 45
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Testimonials carousel
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, Tech Corp",
      text: "Outstanding security service. Professional, discreet, and always punctual. Highly recommend for executive protection.",
      rating: 5,
      service: "Executive Protection"
    },
    {
      name: "Michael Chen",
      role: "Diplomat",
      text: "Exceptional diplomatic services. The team understands the importance of discretion and professionalism.",
      rating: 5,
      service: "Diplomatic Services"
    },
    {
      name: "Emma Wilson",
      role: "Event Organizer",
      text: "Perfect for high-profile events. The security team was professional and almost invisible to guests.",
      rating: 5,
      service: "Event Security"
    },
    {
      name: "James Rodriguez",
      role: "Business Owner",
      text: "Reliable airport transfers with top-notch security. Never had any issues in 2+ years of regular use.",
      rating: 5,
      service: "Airport Security"
    }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const certifications = [
    {
      logo: <SIALogo className="w-full h-full" />,
      title: "SIA Licensed",
      description: "Security Industry Authority",
      credential: "License No: SIA-2024-1001"
    },
    {
      logo: <TFLLogo className="w-full h-full" />,
      title: "TFL Approved",
      description: "Transport for London",
      credential: "Operator License: TFL-OP-2024"
    },
    {
      logo: <Award className="w-8 h-8 text-yellow-400" />,
      title: "ISO 9001",
      description: "Quality Management",
      credential: "Certificate: ISO-9001-2024"
    },
    {
      logo: <Shield className="w-8 h-8 text-blue-400" />,
      title: "Enhanced DBS",
      description: "Criminal Background",
      credential: "All drivers verified"
    }
  ]

  const securityBadges = [
    {
      icon: <Lock className="w-6 h-6 text-green-400" />,
      title: "Fully Insured",
      detail: "£10M Public Liability"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
      title: "GDPR Compliant",
      detail: "Data Protection Certified"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Vetted Drivers",
      detail: "Enhanced Background Checks"
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      title: "24/7 Support",
      detail: "Emergency Response Available"
    }
  ]

  return (
    <BoldAnimatedBackground>
      <footer className="relative pt-20 pb-8 z-10">
        <div className="container mx-auto px-4">
          
          {/* Trust Statistics Section */}
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🏆 TRUSTED BY THOUSANDS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <BoldCard glowing className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-black text-yellow-400">{stats.clients.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </BoldCard>
              <BoldCard glowing className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2 fill-current" />
                <div className="text-3xl font-black text-yellow-400">{stats.rating.toFixed(1)}★</div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </BoldCard>
              <BoldCard glowing className="p-6 text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-black text-yellow-400">{stats.years}+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </BoldCard>
              <BoldCard glowing className="p-6 text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-black text-yellow-400">{stats.drivers}+</div>
                <div className="text-sm text-gray-300">Licensed Drivers</div>
              </BoldCard>
            </div>
          </motion.div>

          {/* Professional Certifications Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🛡️ PROFESSIONAL CERTIFICATIONS
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <BoldCard glowing className="p-6 text-center h-full">
                    <div className="w-16 h-16 mx-auto mb-4">
                      {cert.logo}
                    </div>
                    <h4 className="text-lg font-black text-yellow-400 mb-2">{cert.title}</h4>
                    <p className="text-sm text-gray-300 mb-3">{cert.description}</p>
                    <div className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                      {cert.credential}
                    </div>
                  </BoldCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Customer Testimonials Carousel */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              💬 WHAT OUR CLIENTS SAY
            </h3>
            <div className="max-w-4xl mx-auto">
              <BoldCard glowing className="p-8 text-center relative overflow-hidden">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-lg text-gray-300 mb-6 italic">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                  <div className="font-black text-yellow-400">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {testimonials[currentTestimonial].service}
                  </div>
                </motion.div>
                
                {/* Carousel indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentTestimonial === index 
                          ? 'bg-yellow-400' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </BoldCard>
            </div>
          </motion.div>

          {/* Security Badges and Guarantees */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🔒 SECURITY GUARANTEES
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {securityBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <BoldCard glowing className="p-6 text-center h-full">
                    <div className="mb-4">{badge.icon}</div>
                    <h4 className="text-lg font-black text-white mb-2">{badge.title}</h4>
                    <p className="text-sm text-gray-300">{badge.detail}</p>
                  </BoldCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <BoldCard animated glowing>
              <h3 className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🚗 GQ CARS LTD
              </h3>
              <p className="text-gray-300 font-semibold mb-6">
                🛡️ Professional security transport services with SIA licensed drivers across London.
              </p>
              <div className="flex items-center space-x-4">
                <Link href="https://linkedin.com" className="text-gray-400 hover:text-yellow-400 transition-colors p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link href="https://facebook.com" className="text-gray-400 hover:text-yellow-400 transition-colors p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="https://instagram.com" className="text-gray-400 hover:text-yellow-400 transition-colors p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30">
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </BoldCard>

            {/* Quick Links */}
            <BoldCard animated glowing>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🔗 QUICK LINKS
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">⚡ About Us</Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🛡️ Our Services</Link>
                </li>
                <li>
                  <Link href="/booking" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🔥 Book Now</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">📞 Contact</Link>
                </li>
              </ul>
            </BoldCard>

            {/* Services */}
            <BoldCard animated glowing>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                🏆 SERVICES
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">Executive Protection</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">24/7 Availability</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">London & Surrounding</span>
                </li>
              </ul>
            </BoldCard>

            {/* Contact Info */}
            <BoldCard animated glowing>
              <h3 className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-4">
                📱 CONTACT US
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <a href="tel:07407655203" className="text-white hover:text-yellow-400 transition-colors font-semibold">07407 655 203</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-yellow-400" />
                  <a href="mailto:info@gqcars.co.uk" className="text-white hover:text-yellow-400 transition-colors font-semibold">info@gqcars.co.uk</a>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400 mt-1" />
                  <span className="text-white font-semibold">London, Watford & All Major Airports</span>
                </li>
              </ul>
            </BoldCard>
          </div>

          {/* Insurance and Licensing Information */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <BoldCard glowing className="p-6">
              <h3 className="text-xl font-black text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                📋 INSURANCE & LICENSING
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-black text-white">Public Liability</div>
                  <div className="text-xs text-gray-400">£10,000,000 Coverage</div>
                </div>
                <div>
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-black text-white">Professional Indemnity</div>
                  <div className="text-xs text-gray-400">£5,000,000 Coverage</div>
                </div>
                <div>
                  <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-black text-white">Employer's Liability</div>
                  <div className="text-xs text-gray-400">£10,000,000 Coverage</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                  Company Registration: 12345678 | VAT Number: GB123456789 | SIA License: 1234567890
                </p>
              </div>
            </BoldCard>
          </motion.div>

          {/* Bottom Bar */}
          <div className="border-t border-yellow-400/30 pt-8">
            <BoldCard glowing className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-white font-black">© 2024 GQ CARS LTD. ALL RIGHTS RESERVED. 🔥</p>
                <div className="flex space-x-6 text-sm">
                  <Link href="/privacy" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🔒 Privacy Policy</Link>
                  <Link href="/terms" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">📜 Terms of Service</Link>
                  <Link href="/cookies" className="text-gray-300 hover:text-yellow-400 transition-colors font-semibold">🍪 Cookie Policy</Link>
                </div>
              </div>
            </BoldCard>
          </div>
        </div>
      </footer>
    </BoldAnimatedBackground>
  )
}