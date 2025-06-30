'use client';

import React, { useState } from 'react';
import { X, Share2, Copy, MessageCircle, Mail, Gift, Users, Star } from 'lucide-react';

interface ReferralPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralPopup: React.FC<ReferralPopupProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  const generateReferralCode = () => {
    const code = `GQ${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setReferralCode(code);
    return code;
  };

  const getReferralLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://gqcars.co.uk';
    const code = referralCode || generateReferralCode();
    return `${baseUrl}?ref=${code}`;
  };

  const handleGenerateLink = () => {
    if (!email) {
      alert('Please enter your email first');
      return;
    }
    
    const code = generateReferralCode();
    setShowSuccess(true);
    
    // Simulate saving referral to backend
    console.log('Referral generated:', { email, code });
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyMessage(`${type} copied!`);
      setTimeout(() => setCopyMessage(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaWhatsApp = () => {
    const message = `🚗 Join me on GQ Cars - Premium Security Transport! 

Use my referral code to get 15% OFF your first ride: ${referralCode}

Book now: ${getReferralLink()}

SIA Licensed • 24/7 Service • Professional Drivers`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = 'Get 15% OFF Your First GQ Cars Ride!';
    const body = `Hi there!

I wanted to share an amazing security transport service with you - GQ Cars!

🚗 SIA Licensed Close Protection Officers
🛡️ Professional Security Transport
⭐ 5-Star Rated Service
📱 Easy Mobile Booking

Use my referral code "${referralCode}" to get 15% OFF your first ride!

Book here: ${getReferralLink()}

Perfect for:
• Airport transfers with security
• Corporate travel
• VIP events
• Executive protection

Try it out - you'll love the professional service!

Best regards`;

    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };

  const shareViaSMS = () => {
    const message = `🚗 Try GQ Cars - Premium Security Transport! Use code "${referralCode}" for 15% OFF: ${getReferralLink()}`;
    const url = `sms:?body=${encodeURIComponent(message)}`;
    window.open(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4 animate-scale-in max-h-[90vh] overflow-y-auto">
        
        {!showSuccess ? (
          // Initial Form
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Refer a Friend</h3>
              <p className="text-gray-600">Share GQ Cars and you both get 15% OFF!</p>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl mb-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-yellow-500" />
                Referral Benefits
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span>Your friend gets <strong>15% OFF</strong> their first ride</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span>You get <strong>£10 credit</strong> when they book</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-2" />
                  <span>No limit on referrals - earn unlimited credits!</span>
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateLink}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-6 rounded-lg font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg mb-4"
            >
              🎁 Generate My Referral Link
            </button>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        ) : (
          // Success State with Sharing Options
          <div>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Referral Link Created!</h3>
              <p className="text-gray-600">Share your link and start earning rewards</p>
            </div>

            {/* Referral Code Display */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Your Referral Code</div>
                <div className="text-2xl font-bold text-gray-900 font-mono mb-3">{referralCode}</div>
                <button
                  onClick={() => copyToClipboard(referralCode, 'Code')}
                  className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center mx-auto"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </button>
              </div>
            </div>

            {/* Referral Link Display */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="text-sm text-gray-600 mb-2">Your Referral Link</div>
              <div className="bg-white p-3 rounded-lg border text-sm text-gray-800 break-all mb-3">
                {getReferralLink()}
              </div>
              <button
                onClick={() => copyToClipboard(getReferralLink(), 'Link')}
                className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Full Link
              </button>
            </div>

            {/* Share Options */}
            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Share Your Link
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={shareViaWhatsApp}
                  className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center text-sm"
                >
                  <MessageCircle className="h-6 w-6 mb-1" />
                  WhatsApp
                </button>
                
                <button
                  onClick={shareViaEmail}
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center text-sm"
                >
                  <Mail className="h-6 w-6 mb-1" />
                  Email
                </button>
                
                <button
                  onClick={shareViaSMS}
                  className="bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition-colors flex flex-col items-center text-sm"
                >
                  <MessageCircle className="h-6 w-6 mb-1" />
                  SMS
                </button>
              </div>
            </div>

            {/* Copy Success Message */}
            {copyMessage && (
              <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center mb-4 font-medium">
                ✅ {copyMessage}
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
            >
              Close
            </button>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralPopup;