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
import WhatsAppWidget from './components/ui/WhatsAppWidget';
import FloatingWhatsAppButton from './components/ui/FloatingWhatsAppButton';
import ServicesOverview from './components/ui/ServicesOverview';
import Footer from './components/ui/Footer'
import { ChevronDown } from 'lucide-react';

export default function HomePage() {
  const scrollToQuote = () => {
    const quoteSection = document.querySelector('[data-quote-section]');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section with integrated content */}
      <InteractiveHero>
        <div className="space-y-6 text-center">
          <h1 className="text-5xl font-bold mb-4">GQ Cars Security Transport</h1>
          <p className="text-xl text-gray-300">Professional SIA Licensed Security Drivers</p>
          
          {/* Scroll Down Indicator */}
          <div className="flex flex-col items-center mt-8">
            <p className="text-sm text-gray-400 mb-3 animate-pulse">Get your instant quote below</p>
            <button
              onClick={scrollToQuote}
              className="flex flex-col items-center space-y-1 group cursor-pointer"
              aria-label="Scroll to quote section"
            >
              <div className="flex flex-col space-y-1 animate-bounce">
                <ChevronDown className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                <ChevronDown className="w-4 h-4 text-yellow-500/60 group-hover:text-yellow-400/60 transition-colors -mt-3" />
              </div>
              <span className="text-xs text-gray-400 group-hover:text-yellow-400 transition-colors">Scroll for Quote</span>
            </button>
          </div>
        </div>
      </InteractiveHero>

      {/* Integrated Quote Section - Directly below hero */}
      <section 
        data-quote-section 
        className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Booking is Easy! Get an <span className="text-yellow-500">Instant Quote</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Professional security transport with transparent pricing
            </p>
          </div>
          
          {/* Enhanced Quote Widget as integrated card */}
          <div className="relative">
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-yellow-500/10 rounded-3xl blur-xl" />
            
            <div className="relative bg-gray-900/95 backdrop-blur-lg border border-yellow-500/30 rounded-3xl shadow-2xl overflow-hidden">
              {/* Enhanced border glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl p-0.5">
                <div className="bg-gray-900/95 rounded-3xl h-full w-full" />
              </div>
              
              <div className="relative z-10">
                <QuoteWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for visual separation */}
      <div className="h-16"></div>

      {/* Rest of the sections */}
      <SecurityAssessmentWrapper />
      <ServicesOverview />
      <InteractiveFeaturesShowcase />
      <InteractiveTestimonials />
      <LocationBasedQuotes />
      <MobileAppBanner />
      <CallToActionPanel />
      <EnhancedChatWidget />
      <AIAssistantWidget />
      <QuickActionPlatform />
      <AIBadge />
      
      {/* Fixed Widgets with enhanced z-index */}
      <WhatsAppWidget />
      <FloatingWhatsAppButton 
        position="bottom-left"
        message="Hello GQ Cars! I need a quote for security transport services."
        showNotification={true}
        notificationCount={2}
      />
      
      <Footer />
    </main>
  );
}
