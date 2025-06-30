"use client"

import React, { useState, useEffect } from 'react'
import { Trophy, Star, Zap, Gift, Crown, Target, Sparkles } from 'lucide-react'

interface Achievement {
  id: string
  title: string
  description: string
  points: number
  unlocked: boolean
  icon: React.ReactNode
}

export default function GameifiedBooking() {
  const [userPoints, setUserPoints] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    // Initialize achievements
    const initialAchievements: Achievement[] = [
      {
        id: 'first-ride',
        title: 'Welcome Aboard!',
        description: 'Complete your first ride',
        points: 100,
        unlocked: false,
        icon: <Star className="w-5 h-5" />
      },
      {
        id: 'loyalty-streak',
        title: 'Loyalty Master',
        description: 'Book 5 rides in a row',
        points: 500,
        unlocked: false,
        icon: <Trophy className="w-5 h-5" />
      },
      {
        id: 'vip-status',
        title: 'VIP Member',
        description: 'Reach 1000 points',
        points: 1000,
        unlocked: false,
        icon: <Crown className="w-5 h-5" />
      },
      {
        id: 'speed-booker',
        title: 'Speed Booker',
        description: 'Book a ride in under 30 seconds',
        points: 250,
        unlocked: false,
        icon: <Zap className="w-5 h-5" />
      }
    ]
    setAchievements(initialAchievements)
  }, [])

  const handleBookingComplete = (bookingType: string) => {
    let pointsEarned = 0
    
    switch (bookingType) {
      case 'standard':
        pointsEarned = 50
        break
      case 'premium':
        pointsEarned = 75
        break
      case 'executive':
        pointsEarned = 100
        break
      case 'xl':
        pointsEarned = 125
        break
    }

    setUserPoints(prev => prev + pointsEarned)
    setCurrentStreak(prev => prev + 1)
    setShowReward(true)
    
    setTimeout(() => setShowReward(false), 3000)

    // Check for achievement unlocks
    checkAchievements(userPoints + pointsEarned, currentStreak + 1)
  }

  const checkAchievements = (points: number, streak: number) => {
    setAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement

      let shouldUnlock = false
      switch (achievement.id) {
        case 'first-ride':
          shouldUnlock = points >= 50
          break
        case 'loyalty-streak':
          shouldUnlock = streak >= 5
          break
        case 'vip-status':
          shouldUnlock = points >= 1000
          break
        case 'speed-booker':
          shouldUnlock = Math.random() > 0.7 // Simulate speed booking
          break
      }

      if (shouldUnlock) {
        setUserPoints(prev => prev + achievement.points)
        // Show achievement popup
        setTimeout(() => {
          alert(`🎉 Achievement Unlocked: ${achievement.title}! +${achievement.points} points`)
        }, 500)
      }

      return { ...achievement, unlocked: shouldUnlock }
    }))
  }

  const getProgressToNextLevel = () => {
    const nextLevelThreshold = Math.ceil(userPoints / 500) * 500
    const progress = (userPoints % 500) / 500 * 100
    return { nextLevelThreshold, progress }
  }

  const { nextLevelThreshold, progress } = getProgressToNextLevel()

  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30 relative overflow-hidden">
      {/* Reward Animation */}
      {showReward && (
        <div className="absolute inset-0 pointer-events-none z-20">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-6 py-3 rounded-full shadow-2xl">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>+Points Earned!</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Loyalty Rewards
          </span>
        </h3>
        <p className="text-gray-300">Earn points with every ride and unlock exclusive benefits!</p>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-yellow-400 mb-2">{userPoints}</div>
          <div className="text-gray-300 text-sm">Total Points</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{currentStreak}</div>
          <div className="text-gray-300 text-sm">Ride Streak</div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">{achievements.filter(a => a.unlocked).length}</div>
          <div className="text-gray-300 text-sm">Achievements</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-semibold">Progress to Next Level</span>
          <span className="text-gray-300 text-sm">{userPoints}/{nextLevelThreshold}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              achievement.unlocked
                ? 'border-yellow-500 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 shadow-lg shadow-yellow-500/20'
                : 'border-gray-600 bg-gradient-to-r from-gray-500/10 to-slate-500/10'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-600'
              }`}>
                {achievement.unlocked ? (
                  <div className="text-white animate-pulse">
                    {achievement.icon}
                  </div>
                ) : (
                  <div className="text-gray-400">
                    {achievement.icon}
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h4 className={`font-semibold ${achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {achievement.title}
                </h4>
                <p className="text-gray-300 text-sm">{achievement.description}</p>
                <div className="text-xs mt-1">
                  <span className={achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'}>
                    +{achievement.points} points
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Booking Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleBookingComplete('standard')}
          className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <div className="text-center">
            <div className="text-lg mb-1">Standard</div>
            <div className="text-xs opacity-80">+50 pts</div>
          </div>
        </button>
        
        <button
          onClick={() => handleBookingComplete('premium')}
          className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <div className="text-center">
            <div className="text-lg mb-1">Premium</div>
            <div className="text-xs opacity-80">+75 pts</div>
          </div>
        </button>
        
        <button
          onClick={() => handleBookingComplete('executive')}
          className="group bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative"
        >
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
            POPULAR
          </div>
          <div className="text-center">
            <div className="text-lg mb-1">Executive</div>
            <div className="text-xs opacity-80">+100 pts</div>
          </div>
        </button>
        
        <button
          onClick={() => handleBookingComplete('xl')}
          className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <div className="text-center">
            <div className="text-lg mb-1">XL</div>
            <div className="text-xs opacity-80">+125 pts</div>
          </div>
        </button>
      </div>

      {/* Rewards Section */}
      <div className="mt-8 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
        <div className="text-center mb-4">
          <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
            <Gift className="w-6 h-6 text-pink-500" />
            <span>Available Rewards</span>
          </h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-green-400 mb-1">10% Off</div>
            <div className="text-sm text-gray-300">500 points</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-blue-400 mb-1">Free Upgrade</div>
            <div className="text-sm text-gray-300">750 points</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-lg font-bold text-purple-400 mb-1">VIP Access</div>
            <div className="text-sm text-gray-300">1000 points</div>
          </div>
        </div>
      </div>
    </div>
  )
}