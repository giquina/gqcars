'use client';

import React, { useState, useRef } from 'react';
import { X, Star, Gift, Percent, Crown, Zap } from 'lucide-react';

interface Prize {
  id: number;
  text: string;
  discount: string;
  icon: React.ReactNode;
  color: string;
  probability: number;
}

const prizes: Prize[] = [
  { id: 1, text: '10% OFF', discount: '10OFF', icon: <Percent className="h-6 w-6" />, color: 'from-blue-400 to-blue-600', probability: 30 },
  { id: 2, text: '5% OFF', discount: '5OFF', icon: <Star className="h-6 w-6" />, color: 'from-green-400 to-green-600', probability: 40 },
  { id: 3, text: '15% OFF', discount: '15OFF', icon: <Gift className="h-6 w-6" />, color: 'from-purple-400 to-purple-600', probability: 15 },
  { id: 4, text: 'FREE UPGRADE', discount: 'UPGRADE', icon: <Crown className="h-6 w-6" />, color: 'from-yellow-400 to-yellow-600', probability: 10 },
  { id: 5, text: '20% OFF', discount: '20OFF', icon: <Zap className="h-6 w-6" />, color: 'from-red-400 to-red-600', probability: 5 },
];

interface SpinToWinProps {
  isOpen: boolean;
  onClose: () => void;
  onWin: (prize: Prize) => void;
}

const SpinToWin: React.FC<SpinToWinProps> = ({ isOpen, onClose, onWin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wonPrize, setWonPrize] = useState<Prize | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setShowResult(false);

    // Select prize based on probability
    const random = Math.random() * 100;
    let cumulativeProbability = 0;
    let selectedPrize = prizes[0];

    for (const prize of prizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        selectedPrize = prize;
        break;
      }
    }

    // Calculate rotation to land on selected prize
    const sectionAngle = 360 / prizes.length;
    const prizeIndex = prizes.findIndex(p => p.id === selectedPrize.id);
    const targetAngle = prizeIndex * sectionAngle + (sectionAngle / 2);
    const spins = 5; // Number of full rotations
    const finalRotation = rotation + (spins * 360) + (360 - targetAngle);

    setRotation(finalRotation);

    // Show result after spin animation
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      setShowResult(true);
      onWin(selectedPrize);
    }, 3000);
  };

  const closeModal = () => {
    setShowResult(false);
    setWonPrize(null);
    setRotation(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 animate-scale-in">
        
        {!showResult ? (
          // Spin Wheel Interface
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">🎡 Spin to Win!</h3>
              <p className="text-gray-600">Spin the wheel for exclusive discounts on your next ride!</p>
            </div>

            {/* Wheel Container */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-500 drop-shadow-lg"></div>
              </div>

              {/* Spinning Wheel */}
              <div 
                ref={wheelRef}
                className={`w-64 h-64 rounded-full border-8 border-white shadow-2xl transition-transform duration-[3000ms] ease-out ${isSpinning ? 'animate-pulse' : ''}`}
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  background: `conic-gradient(
                    from 0deg,
                    #3B82F6 0deg 72deg,
                    #10B981 72deg 144deg,
                    #8B5CF6 144deg 216deg,
                    #F59E0B 216deg 288deg,
                    #EF4444 288deg 360deg
                  )`
                }}
              >
                {/* Prize Sections */}
                {prizes.map((prize, index) => {
                  const angle = (360 / prizes.length) * index;
                  return (
                    <div
                      key={prize.id}
                      className="absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full"
                      style={{
                        transform: `translate(-50%, -100%) rotate(${angle + 36}deg)`,
                        height: '120px',
                        width: '2px'
                      }}
                    >
                      <div className="text-white font-bold text-sm transform -rotate-90 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          {prize.icon}
                          <span>{prize.text}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={spinWheel}
              disabled={isSpinning}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                isSpinning 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 shadow-lg'
              }`}
            >
              {isSpinning ? 'Spinning...' : '🎯 SPIN THE WHEEL!'}
            </button>

            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        ) : (
          // Result Interface
          <div className="text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h3>
              <p className="text-gray-600">You won an amazing discount!</p>
            </div>

            {/* Prize Display */}
            {wonPrize && (
              <div className={`bg-gradient-to-r ${wonPrize.color} text-white p-6 rounded-xl mb-6 shadow-lg`}>
                <div className="flex items-center justify-center space-x-3 mb-2">
                  {wonPrize.icon}
                  <span className="text-3xl font-bold">{wonPrize.text}</span>
                </div>
                <div className="text-lg font-medium">
                  Use code: <span className="bg-white/20 px-3 py-1 rounded-lg font-mono">{wonPrize.discount}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(wonPrize?.discount || '');
                  closeModal();
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                📋 Copy Code & Book Now
              </button>
              
              <button 
                onClick={closeModal}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpinToWin;