"use client";
import { useState } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

// Step 1: Start with basic components
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      {/* Hero Section - Built-in, no external component */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-400/30 animate-ping"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>

        <div className="text-center px-4 relative z-10">
          <h1 className="text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6 animate-pulse">
            GQ CARS
          </h1>
          <p className="text-3xl font-bold text-white mb-4">
            Premium Security Transport Services
          </p>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional SIA Licensed Close Protection Officers • 24/7 Luxury Transport • AI-Powered Booking
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 shadow-lg">
              🚗 Book Secure Transport
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg">
              🛡️ Security Assessment
            </button>
          </div>

          {/* Live Activity Counter */}
          <div className="mt-12 bg-black/30 backdrop-blur-sm rounded-lg p-4 inline-block">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>24 Active Bookings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>12 En Route</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>98% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Premium Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-700 transition-all">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="text-xl font-bold mb-4">Airport Transfer</h3>
              <p className="text-gray-300">Professional airport pickup and drop-off with luxury vehicles and security escort</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-700 transition-all">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-4">Close Protection</h3>
              <p className="text-gray-300">SIA licensed security officers for VIP transport and personal protection</p>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg text-center hover:bg-gray-700 transition-all">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold mb-4">Corporate Events</h3>
              <p className="text-gray-300">Executive transport for business meetings, conferences, and corporate events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold mb-8">Trusted by Leading Organizations</h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">SIA LICENSED</div>
            <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">TFL APPROVED</div>
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">DBS CHECKED</div>
            <div className="bg-yellow-600 text-black px-4 py-2 rounded-lg font-bold">⭐ 5-STAR RATED</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}