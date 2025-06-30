"use client";
import Header from '@/components/ui/Header'
import InteractiveHero from '@/components/ui/InteractiveHero'
import Footer from '@/components/ui/Footer'
import { useState } from 'react'

export default function HomePage() {
  const [showSpinToWin, setShowSpinToWin] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Interactive Hero Section */}
      <InteractiveHero>
        {/* Hero content is now integrated within the component */}
      </InteractiveHero>

      <Footer />
      
      {/* Success Message */}
      <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
        ✅ Website Working on localhost:3000
      </div>
    </main>
  );
}