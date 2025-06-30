"use client";
import Header from '@/components/ui/Header'
import InteractiveHero from '@/components/ui/InteractiveHero'
import Footer from '@/components/ui/Footer'
import { useState } from 'react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Interactive Hero Section */}
      <InteractiveHero>
        {/* Hero content is now integrated within the component */}
      </InteractiveHero>

      <Footer />
    </main>
  );
}