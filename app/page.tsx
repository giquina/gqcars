import React from 'react';
import Header from './components/ui/Header';
import QuoteWidget from './components/ui/QuoteWidget';
import { CleanHero } from './components/ui/CleanHero';
import SecurityAssessmentWrapper from './components/SecurityAssessmentWrapper'
import InteractiveTestimonials from './components/ui/InteractiveTestimonials';
import EnhancedChatWidget from './components/ui/EnhancedChatWidget';
import AIAssistantWidget from './components/ui/AIAssistantWidget';
import AIBadge from './components/ui/AIBadge';
import MobileAppBanner from './components/ui/MobileAppBanner';
import { CallToActionPanel } from './components/ui/CallToActionPanel';
import FloatingActionButton from './components/ui/FloatingActionButton';
import InteractiveFeaturesShowcase from './components/ui/InteractiveFeaturesShowcase';
import QuickActionPlatform from './components/ui/QuickActionPlatform';
import LocationBasedQuotes from './components/ui/LocationBasedQuotes';
import Footer from './components/ui/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      <CleanHero />
      <SecurityAssessmentWrapper />
      <QuoteWidget />
      <InteractiveFeaturesShowcase />
      <InteractiveTestimonials />
      <LocationBasedQuotes />
      <MobileAppBanner />
      <CallToActionPanel />
      <EnhancedChatWidget />
      <AIAssistantWidget />
      <QuickActionPlatform />
      <AIBadge />
      <Footer />
    </main>
  );
}
