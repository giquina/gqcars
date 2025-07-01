"use client";
import Header from '@/components/ui/Header'
import { InteractiveHero } from '@/components/ui/InteractiveHero'
import { HomePageAssessment } from '@/components/ui/HomePageAssessment'
import TestimonialsSection from '@/components/ui/TestimonialsSection'
import InteractiveFeaturesShowcase from '@/components/ui/InteractiveFeaturesShowcase'
import ServicesOverview from '@/components/ui/ServicesOverview'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'
import Footer from '@/components/ui/Footer'
import QuoteWidget from '@/components/ui/QuoteWidget'
import LiveNotifications from '@/components/ui/LiveNotifications'
import Link from 'next/link'
import { Calculator } from 'lucide-react'
import SecurityAssessmentWrapper from '@/components/SecurityAssessmentWrapper'
import InteractiveTestimonials from '@/components/ui/InteractiveTestimonials'
import EnhancedChatWidget from '@/components/ui/EnhancedChatWidget'
import AIAssistantWidget from '@/components/ui/AIAssistantWidget'
import AIBadge from '@/components/ui/AIBadge'
import MobileAppBanner from '@/components/ui/MobileAppBanner'
import { CallToActionPanel } from '@/components/ui/CallToActionPanel'
import FloatingActionButton from '@/components/ui/FloatingActionButton'
import QuickActionPlatform from '@/components/ui/QuickActionPlatform'
import LocationBasedQuotes from '@/components/ui/LocationBasedQuotes'
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton'
import TrustBadges from '@/components/ui/TrustBadges'
import { ChevronDown } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Live Notifications - Always Visible, Top-Left, Highest Z-Index */}
      <div className="fixed top-6 left-6 z-[100]">
        <LiveNotifications />
      </div>
      
      {/* Interactive Hero Section */}
      <InteractiveHero>
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600">
            GQ Cars Security Transport
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional SIA Licensed Security Drivers for London's Elite
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Now
              </button>
            </Link>
            <Link href="/assessment">
              <button className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Take Security Assessment
              </button>
            </Link>
          </div>
        </div>
      </InteractiveHero>

      {/* Full Viewport Google-Style Booking Section */}
      <section className="min-h-screen flex flex-col bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black relative">
        {/* Main Heading - Positioned in upper third */}
        <div className="flex-1 flex flex-col pt-16 pb-8">
          <div className="text-center mb-16 md:mb-20 lg:mb-24">
            <div className="flex items-center justify-center mb-6 gap-3">
              <Calculator className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-bounce" />
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🔥 BOOKING IS EASY! GET INSTANT QUOTE
              </h2>
              <Calculator className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-bounce" />
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 font-medium max-w-4xl mx-auto px-4">
              Enter your journey details for real-time pricing with our SIA licensed security drivers
            </p>
          </div>

          {/* Booking Form - Center-center positioning */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl">
              <QuoteWidget />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="text-center mt-8 pb-8">
            <div className="inline-flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              <span className="text-sm font-medium">More Services</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <InteractiveFeaturesShowcase />

      {/* All Services Section */}
      <ServicesOverview />

      {/* Trust Badges Section */}
      <TrustBadges variant="horizontal" className="bg-gray-800" />

      {/* Security Assessment Section */}
      <HomePageAssessment />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* WhatsApp Widget - Always Highest Z-Index */}
      <div className="fixed bottom-6 right-6 z-[200]">
      <WhatsAppWidget />
      </div>

      <Footer />
    </main>
  );
}