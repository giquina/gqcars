"use client"

import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, TrendingUp, TrendingDown } from 'lucide-react'

interface WeatherData {
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy'
  temperature: number
  description: string
  priceMultiplier: number
}

export default function WeatherPricingWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    condition: 'sunny',
    temperature: 18,
    description: 'Clear and mild',
    priceMultiplier: 1.0
  })
  
  const [basePrice] = useState(25.50)
  const [isLoading, setIsLoading] = useState(false)

  // Simulate weather updates
  useEffect(() => {
    const weatherConditions: WeatherData[] = [
      { condition: 'sunny', temperature: 22, description: 'Sunny and warm', priceMultiplier: 1.0 },
      { condition: 'cloudy', temperature: 18, description: 'Partly cloudy', priceMultiplier: 1.1 },
      { condition: 'rainy', temperature: 15, description: 'Light rain', priceMultiplier: 1.3 },
      { condition: 'snowy', temperature: 2, description: 'Snow expected', priceMultiplier: 1.5 },
      { condition: 'windy', temperature: 12, description: 'Strong winds', priceMultiplier: 1.2 }
    ]

    const interval = setInterval(() => {
      setIsLoading(true)
      setTimeout(() => {
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)]
        setWeather(randomWeather)
        setIsLoading(false)
      }, 1000)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = () => {
    const iconClass = "w-8 h-8"
    switch (weather.condition) {
      case 'sunny':
        return <Sun className={`${iconClass} text-yellow-500 animate-pulse`} />
      case 'cloudy':
        return <Cloud className={`${iconClass} text-gray-400`} />
      case 'rainy':
        return <CloudRain className={`${iconClass} text-blue-500 animate-bounce`} />
      case 'snowy':
        return <CloudSnow className={`${iconClass} text-blue-200 animate-pulse`} />
      case 'windy':
        return <Wind className={`${iconClass} text-gray-500 animate-spin`} />
      default:
        return <Sun className={`${iconClass} text-yellow-500`} />
    }
  }

  const getWeatherColor = () => {
    switch (weather.condition) {
      case 'sunny':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
      case 'cloudy':
        return 'from-gray-500/20 to-slate-500/20 border-gray-500/30'
      case 'rainy':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
      case 'snowy':
        return 'from-blue-200/20 to-white/20 border-blue-200/30'
      case 'windy':
        return 'from-gray-400/20 to-slate-400/20 border-gray-400/30'
      default:
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
    }
  }

  const adjustedPrice = basePrice * weather.priceMultiplier
  const priceChange = ((weather.priceMultiplier - 1) * 100)

  return (
    <div className={`bg-gradient-to-r ${getWeatherColor()} backdrop-blur-sm rounded-2xl p-6 border transition-all duration-500`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-blue-400" />
          <span>Weather Pricing</span>
        </h3>
        
        {isLoading && (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather Info */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            {getWeatherIcon()}
          </div>
          <div className="text-2xl font-bold text-white mb-1">{weather.temperature}°C</div>
          <div className="text-gray-300 text-sm capitalize">{weather.description}</div>
        </div>

        {/* Pricing Info */}
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-2">
            £{adjustedPrice.toFixed(2)}
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            {priceChange > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm font-semibold">
                  +{priceChange.toFixed(0)}%
                </span>
              </>
            ) : priceChange < 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm font-semibold">
                  {priceChange.toFixed(0)}%
                </span>
              </>
            ) : (
              <span className="text-gray-400 text-sm">Standard rate</span>
            )}
          </div>
        </div>
      </div>

      {/* Weather Impact Explanation */}
      <div className="mt-4 p-3 bg-black/20 rounded-xl">
        <div className="text-center">
          <p className="text-gray-300 text-xs leading-relaxed">
            {weather.condition === 'rainy' && 'Higher demand during rain increases pricing'}
            {weather.condition === 'snowy' && 'Snow conditions require special vehicles and experienced drivers'}
            {weather.condition === 'windy' && 'Strong winds may affect travel times and safety measures'}
            {weather.condition === 'cloudy' && 'Mild weather conditions with slight demand increase'}
            {weather.condition === 'sunny' && 'Perfect weather means standard pricing applies'}
          </p>
        </div>
      </div>

      {/* Real-time Update Indicator */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Live weather pricing • Updates every 8s</span>
      </div>
    </div>
  )
}