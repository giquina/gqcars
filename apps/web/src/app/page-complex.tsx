"use client";
import Header from '@/components/ui/Header'
import InteractiveHero from '@/components/ui/InteractiveHero'
import Footer from '@/components/ui/Footer'
import LiveNotifications from '@/components/ui/LiveNotifications'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'
import InteractiveFeaturesShowcase from '@/components/ui/InteractiveFeaturesShowcase'
import ServicesOverview from '@/components/ui/ServicesOverview'
import TrustBadges from '@/components/ui/TrustBadges'
import TestimonialsSection from '@/components/ui/TestimonialsSection'
import MobileAppBanner from '@/components/ui/MobileAppBanner'
import GameifiedBooking from '@/components/ui/GameifiedBooking'
import SpinToWin from '@/components/ui/SpinToWin'
import { SecurityAssessment } from '@/components/ui/SecurityAssessment'
import QuoteWidget from '@/components/ui/QuoteWidget'
import EnhancedChatWidget from '@/components/ui/EnhancedChatWidget'
import { useState } from 'react'

export default function HomePage() {
  const [showSpinToWin, setShowSpinToWin] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);

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

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Mobile App Banner */}
      <MobileAppBanner />

      {/* Gamified Booking Section */}
      <GameifiedBooking />

      {/* Security Assessment Section */}
      <SecurityAssessment />

      {/* Quote Widget Section */}
      <QuoteWidget />

      {/* Spin to Win Modal */}
      {showSpinToWin && (
        <SpinToWin 
          onClose={() => setShowSpinToWin(false)}
          onPrizeWon={(prize) => {
            console.log('Prize won:', prize);
            setShowSpinToWin(false);
          }}
        />
      )}

      {/* Enhanced Chat Widget with AI */}
      <EnhancedChatWidget />

      {/* WhatsApp Widget - Always Highest Z-Index */}
      <div className="fixed bottom-6 right-6 z-[200]">
        <WhatsAppWidget />
      </div>

      <Footer />
    </main>
  );
}