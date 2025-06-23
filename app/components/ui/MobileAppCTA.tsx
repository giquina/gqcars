'use client'

import { motion } from 'framer-motion'
import { Apple, Smartphone, Car, Shield, Download } from 'lucide-react'

// A custom component for the Google Play icon
const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
        <path fill="#4CAF50" d="M312 256l-96-96-32 32 64 64-64 64 32 32z"/>
        <path fill="#2196F3" d="M184 128l96 96-32 32-64-64-32-32z"/>
        <path fill="#FFC107" d="M184 384l96-96-32-32-64 64-32 32z"/>
        <path fill="#F44336" d="M416 256l-96 96-32-32 64-64-64-64 32-32z"/>
        <path fill="#FFC107" d="M312 256l-96 96-32-32 64-64-64-64 32-32z"/>
    </svg>
);


export function MobileAppCTA() {
  return (
    <div className="relative overflow-hidden bg-yellow-400 py-20 sm:py-28">
        <div className="absolute -left-48 -top-48 w-96 h-96 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -right-32 -bottom-56 w-96 h-96 bg-white/10 rounded-full"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-4">
              Get the <span className="text-white">GQ Cars</span> App
            </h2>
            <p className="text-lg text-gray-800 mb-8 max-w-lg mx-auto lg:mx-0">
              Instant bookings, real-time tracking, and exclusive in-app prices. Your personal security driver is just a tap away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#" className="flex items-center justify-center gap-3 bg-black text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors transform hover:scale-105">
                <Apple className="w-6 h-6" />
                <span>App Store</span>
              </a>
              <a href="#" className="flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors transform hover:scale-105">
                <GooglePlayIcon className="w-6 h-6" />
                <span>Google Play</span>
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-72 h-[36rem]">
              <div className="absolute inset-0 bg-black rounded-[2.5rem] border-8 border-gray-800 shadow-2xl"></div>
              <div className="absolute inset-x-2 inset-y-2 bg-yellow-400 rounded-[2rem]">
                {/* App Screen Content */}
                <div className="p-4 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-black text-2xl">GQ Cars</h3>
                        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-yellow-400"/>
                        </div>
                    </div>
                    
                    {/* Car Image */}
                    <div className="flex-grow flex items-center justify-center">
                        <motion.div
                             initial={{ scale: 0.9, opacity: 0 }}
                             animate={{ scale: 1, opacity: 1 }}
                             transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 150 }}
                        >
                            <Car className="w-48 h-48 text-black opacity-80 -rotate-6"/>
                        </motion.div>
                    </div>

                    {/* Button */}
                    <div className="mt-auto">
                        <button className="w-full bg-black text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-3 transform hover:scale-105 transition-transform duration-300">
                           <Download className="w-5 h-5"/>
                           <span>Order Now</span>
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
