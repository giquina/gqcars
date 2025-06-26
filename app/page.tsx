import React from 'react';
import Header from './components/ui/Header';
import QuoteWidget from './components/ui/QuoteWidget';
import { InteractiveHero } from './components/ui/InteractiveHero';
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
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import FloatingWhatsAppButton from './components/ui/FloatingWhatsAppButton';

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
      <MobileAppBanner />
      <CallToActionPanel />
      <EnhancedChatWidget />
      <AIAssistantWidget />
      <QuickActionPlatform />
      <AIBadge />
      <Footer />
      
      {/* New Advanced WhatsApp Widgets */}
      <WhatsAppWidget />
      <FloatingWhatsAppButton 
        position="bottom-left"
        message="Hello GQ Cars! I need a quote for security transport services."
        showNotification={true}
        notificationCount={2}
        showTooltip={true}
        theme="green"
      />
    </main>
  );
}
