"use client";
import Header from '@/components/ui/Header'
import { InteractiveHero } from '@/components/ui/InteractiveHero'
import Footer from '@/components/ui/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <InteractiveHero />
        
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">GQ Cars LTD</h2>
          <p className="text-xl text-gray-300 mb-8">
            Professional Security Transport Services
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
              Book Now
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
}