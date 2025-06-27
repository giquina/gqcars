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
import Footer from './components/ui/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section with Scroll Indicator */}
      <div className="relative">
        <InteractiveHero>
          <div className="space-y-6 text-center">
            <h1 className="text-5xl font-bold mb-4">GQ Cars Security Transport</h1>
            <p className="text-xl text-gray-300">Professional SIA Licensed Security Drivers</p>
          </div>
        </InteractiveHero>
        
        {/* Subtle Scroll Down Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-yellow-400/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-yellow-400/80 text-sm font-medium">Scroll for Quote</span>
          </div>
        </div>
      </div>

      {/* Integrated Quote Section - Prominent Card Design */}
      <div className="relative -mt-16 z-20 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="container mx-auto max-w-4xl">
          {/* Glassmorphic Quote Card */}
          <div className="relative">
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-blue-500/5 to-purple-500/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
            
            {/* Content */}
            <div className="relative p-8 sm:p-12">
              {/* Header Section */}
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Booking is Easy! 
                  <span className="block text-yellow-400">Get an Instant Quote</span>
                </h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                  Professional security transport with SIA-licensed drivers. Enter your journey details for transparent, real-time pricing.
                </p>
              </div>
              
              {/* Quote Widget - Integrated */}
              <QuoteWidget />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Rest of Content */}
      <SecurityAssessmentWrapper />
      <InteractiveFeaturesShowcase />
      <InteractiveTestimonials />
      <LocationBasedQuotes />
      <MobileAppBanner />
      <CallToActionPanel />
      <EnhancedChatWidget />
      <AIAssistantWidget />
      <QuickActionPlatform />
      <AIBadge />
      
      {/* Fixed Widgets with Highest Z-Index */}
      <div className="fixed inset-0 pointer-events-none z-[200]">
        <div className="pointer-events-auto">
          <WhatsAppWidget />
        </div>
        <div className="pointer-events-auto">
          <FloatingWhatsAppButton 
            position="bottom-left"
            message="Hello GQ Cars! I need a quote for security transport services."
            showNotification={true}
            notificationCount={2}
          />
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
