"use client";
import { useState, Suspense, lazy } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import DynamicBackgrounds from '@/components/ui/DynamicBackgrounds'

// Lazy load heavy components
const InteractiveHero = lazy(() => import('@/components/ui/InteractiveHero'))
const LiveNotifications = lazy(() => import('@/components/ui/LiveNotifications'))
const WhatsAppWidget = lazy(() => import('@/components/ui/WhatsAppWidget'))
const EnhancedLiveActivityWidget = lazy(() => import('@/components/ui/EnhancedLiveActivityWidget'))
const InteractiveFeaturesShowcase = lazy(() => import('@/components/ui/InteractiveFeaturesShowcase'))
const TrustBadges = lazy(() => import('@/components/ui/TrustBadges'))
const ServicesOverview = lazy(() => import('@/components/ui/ServicesOverview'))
const TestimonialsSection = lazy(() => import('@/components/ui/TestimonialsSection'))
const MobileAppBanner = lazy(() => import('@/components/ui/MobileAppBanner'))
const GameifiedBooking = lazy(() => import('@/components/ui/GameifiedBooking'))
const QuoteWidget = lazy(() => import('@/components/ui/QuoteWidget'))
const EnhancedChatWidget = lazy(() => import('@/components/ui/EnhancedChatWidget'))
const SpinToWin = lazy(() => import('@/components/ui/SpinToWin'))
const ExitIntentPopup = lazy(() => import('@/components/ui/ExitIntentPopup'))

// Import SecurityAssessment normally since it's destructured
import { SecurityAssessment } from '@/components/ui/SecurityAssessment'

// Loading components
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
  </div>
)

const SectionLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>
    {children}
  </Suspense>
)

export default function OptimizedHomePage() {
  const [showSpinToWin, setShowSpinToWin] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-900 text-white relative">
      {/* Dynamic Backgrounds - Load immediately for visual impact */}
      <DynamicBackgrounds variant="aurora" intensity="medium" />
      
      {/* Header - Load immediately */}
      <Header />
      
      {/* Hero Section - High priority, load first */}
      <SectionLoader>
        <InteractiveHero />
      </SectionLoader>

      {/* Interactive Features - Load after hero */}
      <SectionLoader>
        <InteractiveFeaturesShowcase />
      </SectionLoader>

      {/* Services Overview - Core content */}
      <SectionLoader>
        <ServicesOverview />
      </SectionLoader>

      {/* Trust Badges - Important for credibility */}
      <SectionLoader>
        <TrustBadges variant="horizontal" className="bg-gray-800" />
      </SectionLoader>

      {/* Below the fold - Lazy load with lower priority */}
      <SectionLoader>
        <TestimonialsSection />
      </SectionLoader>

      <SectionLoader>
        <MobileAppBanner />
      </SectionLoader>

      <SectionLoader>
        <GameifiedBooking />
      </SectionLoader>

      {/* Security Assessment - Load without suspense since it's not lazy */}
      <SecurityAssessment />

      <SectionLoader>
        <QuoteWidget />
      </SectionLoader>

      {/* Modals and overlays - Only load when needed */}
      <SectionLoader>
        <SpinToWin 
          isOpen={showSpinToWin}
          onClose={() => setShowSpinToWin(false)}
          onWin={(prize) => {
            console.log('Prize won:', prize);
          }}
        />
      </SectionLoader>

      <SectionLoader>
        <EnhancedChatWidget />
      </SectionLoader>

      <SectionLoader>
        <ExitIntentPopup />
      </SectionLoader>

      {/* Floating Components - Load last */}
      <SectionLoader>
        <div className="fixed top-6 left-6 z-[100]">
          <LiveNotifications />
        </div>
      </SectionLoader>
      
      <SectionLoader>
        <div className="fixed bottom-6 right-6 z-[200]">
          <WhatsAppWidget />
        </div>
      </SectionLoader>

      <SectionLoader>
        <EnhancedLiveActivityWidget />
      </SectionLoader>

      {/* Footer - Load last */}
      <Footer />
    </main>
  );
}