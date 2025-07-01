"use client";
import { useState } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import LiveNotifications from '@/components/ui/LiveNotifications'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'
import EnhancedLiveActivityWidget from '@/components/ui/EnhancedLiveActivityWidget'
import InteractiveFeaturesShowcase from '@/components/ui/InteractiveFeaturesShowcase'
import TrustBadges from '@/components/ui/TrustBadges'
import ServicesOverview from '@/components/ui/ServicesOverview'
import TestimonialsSection from '@/components/ui/TestimonialsSection'
import GameifiedBooking from '@/components/ui/GameifiedBooking'
import QuoteWidget from '@/components/ui/QuoteWidget'
import EnhancedChatWidget from '@/components/ui/EnhancedChatWidget'
import { SecurityAssessment } from '@/components/ui/SecurityAssessment'
import SpinToWin from '@/components/ui/SpinToWin'
import MobileAppBanner from '@/components/ui/MobileAppBanner'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import InteractiveHero from '@/components/ui/InteractiveHero'
import DynamicBackgrounds from '@/components/ui/DynamicBackgrounds'

// Step 5: Complete full-featured website
export default function HomePage() {
  const [showSpinToWin, setShowSpinToWin] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-900 text-white relative">
      {/* Dynamic Backgrounds */}
      <DynamicBackgrounds variant="aurora" intensity="medium" />
      
      <Header />
      
      {/* Interactive Hero Section */}
      <InteractiveHero />

      {/* Interactive Features Section */}
      <InteractiveFeaturesShowcase />

      {/* Services Overview Section */}
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
      <SpinToWin 
        isOpen={showSpinToWin}
        onClose={() => setShowSpinToWin(false)}
        onWin={(prize) => {
          console.log('Prize won:', prize);
        }}
      />

      {/* Enhanced Chat Widget with AI */}
      <EnhancedChatWidget />

      {/* Exit Intent Popup */}
      <ExitIntentPopup />

      {/* Floating Components */}
      <div className="fixed top-6 left-6 z-[100]">
        <LiveNotifications />
      </div>
      
      <div className="fixed bottom-6 right-6 z-[200]">
        <WhatsAppWidget />
      </div>

      <EnhancedLiveActivityWidget />

      <Footer />
    </main>
  );
}