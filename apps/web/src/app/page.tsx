"use client";
import Header from '@/components/ui/Header'
import InteractiveHero from '@/components/ui/InteractiveHero'
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
import AppDownloadBanner from '@/components/ui/AppDownloadBanner'
import SpinToWin from '@/components/ui/SpinToWin'
import ReferralPopup from '@/components/ui/ReferralPopup'
import FloatingActionButton from '@/components/ui/FloatingActionButton'
import QuickActionPlatform from '@/components/ui/QuickActionPlatform'
import LocationBasedQuotes from '@/components/ui/LocationBasedQuotes'
import FloatingWhatsAppButton from '@/components/ui/FloatingWhatsAppButton'
import TrustBadges from '@/components/ui/TrustBadges'
import QuickQuoteButton from '@/components/ui/QuickQuoteButton'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function HomePage() {
  const [showSpinToWin, setShowSpinToWin] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);

  // Trigger Spin to Win after successful booking (simulate)
  const handleBookingSuccess = () => {
    setShowSpinToWin(true);
  };

  // Handle prize won from spin to win
  const handlePrizeWon = (prize: any) => {
    console.log('Prize won:', prize);
    // You can add analytics or save to backend here
  };

  // Trigger referral popup on certain actions
  const handleShowReferral = () => {
    setShowReferralPopup(true);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Live Notifications - Always Visible, Top-Left, Highest Z-Index */}
      <div className="fixed top-6 left-6 z-[100]">
        <LiveNotifications />
      </div>
      
      {/* Interactive Hero Section */}
      <InteractiveHero>
        {/* Hero content is now integrated within the component */}
      </InteractiveHero>

      {/* Interactive Features Section */}
      <InteractiveFeaturesShowcase />

      {/* All Services Section */}
      <ServicesOverview />

      {/* Trust Badges Section */}
      <TrustBadges variant="horizontal" className="bg-gray-800" />

      {/* Security Assessment Section */}
      <HomePageAssessment />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Quick Quote Button - Mobile Only */}
      <QuickQuoteButton />

      {/* WhatsApp Widget - Always Highest Z-Index */}
      <div className="fixed bottom-6 right-6 z-[200]">
      <WhatsAppWidget />
      </div>

      <Footer />

      {/* App Download Banner */}
      <AppDownloadBanner />

      {/* Gamification Modals */}
      <SpinToWin 
        isOpen={showSpinToWin}
        onClose={() => setShowSpinToWin(false)}
        onWin={handlePrizeWon}
      />

      <ReferralPopup 
        isOpen={showReferralPopup}
        onClose={() => setShowReferralPopup(false)}
      />

      {/* Test Buttons - Remove in production */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        <button 
          onClick={() => setShowSpinToWin(true)}
          className="bg-purple-600 text-white px-3 py-2 rounded text-sm hover:bg-purple-700"
        >
          Test Spin
        </button>
        <button 
          onClick={() => setShowReferralPopup(true)}
          className="bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
        >
          Test Referral
        </button>
      </div>
    </main>
  );
}