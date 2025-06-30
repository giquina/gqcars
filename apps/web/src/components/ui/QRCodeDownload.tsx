'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, Download, X, Smartphone, Apple } from 'lucide-react'

export default function QRCodeDownload() {
  const [showQR, setShowQR] = useState(false)

  // Simple QR code generator for app download URL
  const generateQRDataURL = (text: string) => {
    // For production, use a proper QR code library like 'qrcode'
    // This is a placeholder implementation
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 200
    
    if (ctx) {
      // Simple black and white pattern as placeholder
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, 200, 200)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(20, 20, 160, 160)
      ctx.fillStyle = '#000000'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('QR Code', 100, 100)
      ctx.fillText('GQ Cars App', 100, 120)
    }
    
    return canvas.toDataURL()
  }

  const appUrl = 'https://gqcars.app' // Replace with actual app URL

  return (
    <>
      {/* QR Code Trigger Button */}
      <button
        onClick={() => setShowQR(true)}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
      >
        <QrCode className="w-4 h-4" />
        <span>Scan QR</span>
      </button>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Download GQ Cars App
                </h3>
                <p className="text-gray-600">
                  Scan with your phone camera to download
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-gray-100 p-6 rounded-xl mb-6 flex justify-center">
                <div className="w-40 h-40 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  {/* Placeholder QR Code Pattern */}
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* App Store Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-black text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition-colors">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
                
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-green-700 transition-colors">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">▶</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
              </div>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">App Features:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Instant booking in 60 seconds
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Real-time driver tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    SIA licensed security drivers
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    24/7 customer support
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}