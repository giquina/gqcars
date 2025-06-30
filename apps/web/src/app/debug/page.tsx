"use client";
import { useState } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function DebugPage() {
  const [showSpinToWin, setShowSpinToWin] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-6 text-white">
            🚗 GQ CARS SECURITY
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Debug Page - Testing Components Step by Step
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="bg-green-600 p-4 rounded-lg">
              ✅ Header Component Working
            </div>
            <div className="bg-green-600 p-4 rounded-lg">
              ✅ Basic React State Working
            </div>
            <div className="bg-green-600 p-4 rounded-lg">
              ✅ Tailwind CSS Working
            </div>
            <div className="bg-blue-600 p-4 rounded-lg">
              🧪 Next: Test InteractiveHero
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}