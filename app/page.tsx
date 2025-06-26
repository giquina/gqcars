import React, { Suspense } from 'react';
import Loading from './loading';
import Header from '@/app/components/ui/Header';
import QuoteWidget from '@/app/components/ui/QuoteWidget';
import InteractiveHero from '@/app/components/ui/InteractiveHero';
import SecurityAssessmentWrapper from '@/app/components/SecurityAssessmentWrapper';
import InteractiveTestimonials from '@/app/components/ui/InteractiveTestimonials';
import WhatsAppWidget from '@/app/components/ui/WhatsAppWidget';
import AIAssistantWidget from '@/app/components/ui/AIAssistantWidget';
import AIBadge from '@/app/components/ui/AIBadge';
import MobileAppBanner from '@/app/components/ui/MobileAppBanner';
import { CallToActionPanel } from '@/app/components/ui/CallToActionPanel';
import FloatingActionButton from '@/app/components/ui/FloatingActionButton';
import LiveNotifications from '@/app/components/ui/LiveNotifications';
import InteractiveFeaturesShowcase from '@/app/components/ui/InteractiveFeaturesShowcase';
import QuickActionPlatform from '@/app/components/ui/QuickActionPlatform';
import LocationBasedQuotes from '@/app/components/ui/LocationBasedQuotes';
import LiveActivityDashboard from '@/app/components/ui/LiveActivityDashboard';
import Footer from '@/app/components/ui/Footer';

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
