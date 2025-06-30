"use client";
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function WorkingBackup() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-black mb-6 text-white">
            GQ CARS SECURITY
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            London's Premier Security Transport Service
          </p>
          
          <div className="bg-black/80 backdrop-blur-lg rounded-2xl p-8 border-2 border-yellow-500/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-black text-yellow-400 mb-4">🚀 BOOK YOUR RIDE</h3>
            <p className="text-white/80 mb-6">Professional security transport with SIA licensed drivers</p>
            
            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-black py-4 px-8 rounded-xl transition-all duration-300 text-lg shadow-2xl hover:scale-105">
              📞 Call Now: 07407 655 203
            </button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">🛡️ SIA Licensed</h3>
              <p className="text-gray-300">Professional security officers</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">⭐ 5-Star Rated</h3>
              <p className="text-gray-300">Excellent customer reviews</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-yellow-400 mb-2">🚗 24/7 Service</h3>
              <p className="text-gray-300">Available around the clock</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}