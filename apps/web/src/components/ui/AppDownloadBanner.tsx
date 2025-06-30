'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone, QrCode } from 'lucide-react';

const AppDownloadBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in the last 24 hours
    const dismissed = localStorage.getItem('gq-app-banner-dismissed');
    const dismissedTime = dismissed ? new Date(dismissed).getTime() : 0;
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - dismissedTime > twentyFourHours) {
      // Show banner after 3 seconds
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem('gq-app-banner-dismissed', new Date().toISOString());
  };

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Banner - Top */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 text-black shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="animate-bounce">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <span className="font-bold text-lg">Get the GQ Cars App for the fastest booking experience!</span>
              <span className="ml-2 text-sm">Download now for exclusive app-only features</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* App Store Badges */}
            <div className="flex space-x-3">
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <div className="text-xs">
                  <div>Download on the</div>
                  <div className="font-bold">App Store</div>
                </div>
              </button>
              
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <div className="text-xs">
                  <div>Get it on</div>
                  <div className="font-bold">Google Play</div>
                </div>
              </button>
            </div>
            
            {/* QR Code Button */}
            <button 
              onClick={toggleQR}
              className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
              title="Show QR Code"
            >
              <QrCode className="h-5 w-5" />
            </button>
            
            {/* Close Button */}
            <button 
              onClick={dismissBanner}
              className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Banner - Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 text-black shadow-lg animate-slide-up">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="animate-bounce">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-sm">Get the GQ Cars App!</div>
                <div className="text-xs">Fastest booking experience</div>
              </div>
            </div>
            
            <button 
              onClick={dismissBanner}
              className="bg-white/20 p-1 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-800 transition-all duration-300">
              App Store
            </button>
            <button className="flex-1 bg-black text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-800 transition-all duration-300">
              Google Play
            </button>
            <button 
              onClick={toggleQR}
              className="bg-white/20 p-2 rounded-lg hover:bg-white/30 transition-all duration-300"
            >
              <QrCode className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 animate-scale-in">
            <div className="text-center">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Scan to Download</h3>
                <p className="text-gray-600">Scan with your phone camera to download the GQ Cars app instantly</p>
              </div>
              
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 mx-auto mb-4 bg-black flex items-center justify-center rounded-lg">
                <div className="text-white text-center">
                  <QrCode className="h-16 w-16 mx-auto mb-2" />
                  <div className="text-sm">QR Code</div>
                  <div className="text-xs opacity-70">App Store Link</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300">
                  <div className="flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download on App Store</span>
                  </div>
                </button>
                <button className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300">
                  <div className="flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Get it on Google Play</span>
                  </div>
                </button>
              </div>
              
              <button 
                onClick={() => setShowQR(false)}
                className="text-gray-500 hover:text-gray-700 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppDownloadBanner;