import { TestimonialsAndCaseStudies } from '@/app/components/ui/TestimonialsAndCaseStudies'
import QuoteWidget from "@/app/components/ui/QuoteWidget";
import Header from './Header';
import Footer from './Footer';
import { LucideIcon, ArrowLeft, Home, List, Phone, MessageCircle } from "lucide-react";
import Link from 'next/link';

interface ServicePageProps {
  title: string;
  description: string;
  heroImage: string;
  category: string;
  Icon: LucideIcon;
  features: {
    title: string;
    description: string;
  }[];
}

export default function ServicePage({ title, description, heroImage, category, Icon, features }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Navigation Breadcrumbs */}
      <div className="pt-20 bg-black/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/" className="flex items-center space-x-2 text-yellow-500 hover:text-yellow-400 transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-gray-400">Services</span>
              <span className="text-gray-500">/</span>
              <span className="text-white font-semibold">{category}</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <Link href="/#services" className="flex items-center space-x-2 text-gray-400 hover:text-yellow-500 transition-colors text-sm">
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">All Services</span>
                <span className="sm:hidden">Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20 sm:py-32">
        <div className="absolute inset-0">
          <img src={heroImage} alt={title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Icon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">{title}</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
            {description}
          </p>
          
          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/book" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105 shadow-lg">
              Book Now - Instant Quote
            </Link>
            <a href="tel:07407655203" className="flex items-center space-x-2 bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 hover:text-black transition-all">
              <Phone className="w-5 h-5" />
              <span>Call: 07407 655 203</span>
            </a>
          </div>
        </div>
      </div>

      {/* Urgency & Trust Banner */}
      <div className="bg-yellow-500 text-black py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold">
            🚨 IMMEDIATE RESPONSE • SIA LICENSED DRIVERS • 24/7 AVAILABILITY • SECURE BOOKING IN UNDER 60 SECONDS
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 sm:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Features & Details */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-3xl font-bold text-white">Why Choose Our {category} Service?</h2>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">(4.9/5 from 500+ clients)</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-yellow-500/50 transition-all">
                    <h3 className="text-xl font-semibold text-yellow-500 mb-2 flex items-center">
                      <span className="bg-yellow-500 text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </span>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Additional Value Props */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-yellow-900/20 rounded-lg border border-yellow-500/30">
                <h3 className="text-xl font-bold text-yellow-500 mb-4">✅ What's Included in Every Booking</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">✓</span>
                    <span>SIA Licensed Professional Driver</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">✓</span>
                    <span>Real-time GPS Tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">✓</span>
                    <span>24/7 Customer Support</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">✓</span>
                    <span>Fully Insured & Licensed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">✓</span>
                    <span>Meet & Greet Service</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">✓</span>
                    <span>Flexible Cancellation Policy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Booking Widget */}
            <div>
              <div className="sticky top-24">
                <div className="bg-gray-900 p-6 rounded-lg border border-yellow-500/50">
                  <h2 className="text-2xl font-bold text-white mb-2">Get Your Instant Quote</h2>
                  <p className="text-yellow-500 font-semibold mb-4">⚡ Book in under 60 seconds</p>
                  <QuoteWidget />
                  
                  <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                    <div className="flex items-center space-x-2 text-green-400 mb-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="font-semibold">Need Help? Speak to Our Team</span>
                    </div>
                    <p className="text-sm text-gray-400">Available 24/7 for immediate assistance</p>
                    <a href="tel:07407655203" className="block mt-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-center font-semibold transition-colors">
                      Call Now: 07407 655 203
                    </a>
                  </div>
                </div>
                
                {/* Security Badges */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 mb-2">TRUSTED & CERTIFIED</p>
                  <div className="flex justify-center space-x-4 text-xs text-gray-400">
                    <span>🛡️ SIA Licensed</span>
                    <span>🔒 SSL Secure</span>
                    <span>✅ TfL Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials & Case Studies */}
      <TestimonialsAndCaseStudies />

      {/* Bottom CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Professional {category} Transport?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust GQ Cars for their security transport needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-400 hover:to-yellow-500 transition-all transform hover:scale-105">
              Book Your {category} Service Now
            </Link>
            <Link href="/" className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-bold text-lg hover:border-yellow-500 hover:text-yellow-500 transition-all">
              Explore Other Services
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 