'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Smartphone, Zap, Shield, Star, ChevronUp } from 'lucide-react';

interface PWAInstallBannerProps {
  className?: string;
}

const PWAInstallBanner: React.FC<PWAInstallBannerProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const alreadyInstalled = localStorage.getItem('pwa-installed') || window.matchMedia('(display-mode: standalone)').matches;
    
    if (dismissed || alreadyInstalled) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
      
      // Show banner after a short delay
      setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    };

    // Listen for successful app install
    const handleAppInstalled = () => {
      localStorage.setItem('pwa-installed', 'true');
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS Safari (doesn't support beforeinstallprompt)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches;
    
    if (isIOS && !isInStandaloneMode && !dismissed) {
      setTimeout(() => {
        setIsVisible(true);
        setIsInstallable(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        localStorage.setItem('pwa-installed', 'true');
      }
      
      setDeferredPrompt(null);
      setIsVisible(false);
    } else {
      // For iOS Safari, show instructions
      showIOSInstructions();
    }
  };

  const showIOSInstructions = () => {
    alert(`To install GQ Cars app on your iPhone:\n\n1. Tap the Share button 📤\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install the app\n\nEnjoy quick access to book secure rides!`);
  };

  const handleDismiss = () => {
    localStorage.setItem('pwa-install-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible || !isInstallable) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed bottom-0 left-0 right-0 z-[90] bg-gradient-to-r from-blue-900 via-purple-900 to-black border-t-2 border-yellow-400/50 shadow-2xl ${className}`}
      >
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            {/* Floating particles */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-10, -30, -10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between">
                
                {/* Content */}
                <div className="flex items-center space-x-4 flex-1">
                  {/* App Icon */}
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Smartphone className="w-6 h-6 text-black" />
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-white font-black text-lg">📱 Install GQ Cars App</h3>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-2">
                      🚀 Faster booking • 🛡️ Enhanced security • 📍 Real-time tracking • 🎁 Exclusive offers
                    </p>
                    
                    {/* Features Pills */}
                    <div className="flex flex-wrap gap-2">
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Zap className="w-3 h-3 mr-1" />
                        Instant Booking
                      </div>
                      <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        Secure Platform
                      </div>
                      <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-bold">
                        💰 App-Only Deals
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 ml-4">
                  {/* Install Button */}
                  <motion.button
                    onClick={handleInstallClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center space-x-2 transition-all duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install App</span>
                  </motion.button>

                  {/* Close Button */}
                  <button
                    onClick={handleDismiss}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* iOS Instructions Hint */}
              {/iPad|iPhone|iPod/.test(navigator.userAgent) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-white/10"
                >
                  <div className="flex items-center justify-center text-center text-xs text-gray-400">
                    <ChevronUp className="w-3 h-3 mr-1" />
                    <span>Tap "Install App" for instructions on adding to your home screen</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Glowing border effect */}
          <div className="absolute inset-0 border-t-2 border-yellow-400/50 animate-pulse"></div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PWAInstallBanner;