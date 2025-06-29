'use client'
import { useState } from 'react'
import { Sparkles, Camera, Phone, Car, Verified } from 'lucide-react'
import SmartPlatformModal from './SmartPlatformModal'

export function CallToActionPanel() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-gray-900 via-blue-900/10 to-black p-8 sm:p-12 rounded-3xl border border-yellow-500/20 max-w-4xl mx-auto text-center shadow-2xl shadow-blue-500/10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Ready for a Smarter, Safer Journey?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of secure transport. Get your instant quote or speak to our team 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/quote"
              className="group relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-500 text-black font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/25 flex items-center justify-center space-x-2 text-lg"
            >
              <Car className="w-5 h-5" />
              <span>Enquire Now</span>
            </a>
            <a
              href="tel:07407655203"
              className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 flex items-center justify-center space-x-2 text-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span>AR Vehicle Preview</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>24/7 AI Assistant</span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Verified className="w-4 h-4 text-purple-400" />
              <span>Licensed & Certified</span>
            </button>
          </div>
        </div>
      </div>

      <SmartPlatformModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}
