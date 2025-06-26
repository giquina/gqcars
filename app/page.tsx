import React from 'react';
import Header from './components/ui/Header';
import QuoteWidget from './components/ui/QuoteWidget';
import { InteractiveHero } from './components/ui/InteractiveHero';
import SecurityAssessmentWrapper from './components/SecurityAssessmentWrapper'
import InteractiveTestimonials from './components/ui/InteractiveTestimonials';
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import AIAssistantWidget from './components/ui/AIAssistantWidget';
import AIBadge from './components/ui/AIBadge';
import MobileAppBanner from './components/ui/MobileAppBanner';
import { CallToActionPanel } from './components/ui/CallToActionPanel';
import FloatingActionButton from './components/ui/FloatingActionButton';
import LiveNotifications from './components/ui/LiveNotifications';
import InteractiveFeaturesShowcase from './components/ui/InteractiveFeaturesShowcase';
import QuickActionPlatform from './components/ui/QuickActionPlatform';
import LocationBasedQuotes from './components/ui/LocationBasedQuotes';
import LiveActivityDashboard from './components/ui/LiveActivityDashboard';
import Footer from './components/ui/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      <InteractiveHero>
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold mb-4">GQ Cars Security Transport</h1>
          <p className="text-xl text-gray-300">Professional SIA Licensed Security Drivers</p>
        </div>
      </InteractiveHero>
      <SecurityAssessmentWrapper />
      <QuoteWidget />
      <InteractiveFeaturesShowcase />
      <InteractiveTestimonials />
      <LocationBasedQuotes />
      <LiveActivityDashboard />
      <MobileAppBanner />
      <CallToActionPanel />
      <WhatsAppWidget />
      <AIAssistantWidget />
      <QuickActionPlatform />
      <LiveNotifications />
      <AIBadge />
      <Footer />
    </main>
  );
}
