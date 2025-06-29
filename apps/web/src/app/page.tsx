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

      {/* Integrated Get Instant Quote Section */}
      <section className="relative z-20 flex justify-center py-12 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black">
        <div className="w-full max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 gap-3">
              <Calculator className="w-7 h-7 text-yellow-400 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🔥 BOOKING IS EASY! GET INSTANT QUOTE
              </h2>
              <Calculator className="w-7 h-7 text-yellow-400 animate-bounce" />
            </div>
          </div>
          <QuoteWidget />
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