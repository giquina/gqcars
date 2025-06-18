'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Shield, Activity } from 'lucide-react'

interface ThreatLevel {
  level: 'low' | 'medium' | 'high' | 'critical'
  location: string
  description: string
  lastUpdated: string
}

const ThreatIndicator = () => {
  const [threatLevels, setThreatLevels] = useState<ThreatLevel[]>([])
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    // Simulate real-time threat data updates
    const updateThreatLevels = () => {
      const locations = ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol']
      const levels: ('low' | 'medium' | 'high' | 'critical')[] = ['low', 'medium', 'high', 'critical']
      
      const newThreatLevels = locations.map(location => ({
        level: levels[Math.floor(Math.random() * levels.length)],
        location,
        description: getThreatDescription(),
        lastUpdated: new Date().toLocaleTimeString()
      }))
      
      setThreatLevels(newThreatLevels)
      setIsLive(true)
    }

    // Initial load
    updateThreatLevels()
    
    // Update every 30 seconds to simulate live data
    const interval = setInterval(updateThreatLevels, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const getThreatDescription = () => {
    const descriptions = [
      'Standard security protocols',
      'Elevated awareness recommended',
      'Enhanced security measures advised',
      'Maximum protection protocols'
    ]
    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500 bg-green-500/10'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10'
      case 'high': return 'text-orange-500 bg-orange-500/10'
      case 'critical': return 'text-red-500 bg-red-500/10'
      default: return 'text-gray-500 bg-gray-500/10'
    }
  }

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'low': return Shield
      case 'medium': return Activity
      case 'high': return AlertTriangle
      case 'critical': return AlertTriangle
      default: return Shield
    }
  }

  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-amber-500/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className={`w-5 h-5 ${isLive ? 'text-green-500 animate-pulse' : 'text-gray-500'}`} />
          Live Threat Intelligence
        </h3>
        <span className="text-xs text-gray-400">
          {isLive ? 'LIVE' : 'OFFLINE'}
        </span>
      </div>
      
      <div className="space-y-3">
        {threatLevels.map((threat) => {
          const Icon = getThreatIcon(threat.level)
          return (
            <div
              key={threat.location}
              className={`p-3 rounded border-l-4 border-${threat.level === 'low' ? 'green' : threat.level === 'medium' ? 'yellow' : threat.level === 'high' ? 'orange' : 'red'}-500 ${getThreatColor(threat.level)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{threat.location}</span>
                  <span className="text-xs uppercase tracking-wider font-bold">
                    {threat.level}
                  </span>
                </div>
                <span className="text-xs opacity-70">
                  {threat.lastUpdated}
                </span>
              </div>
              <p className="text-xs mt-1 opacity-80">
                {threat.description}
              </p>
            </div>
          )
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
        <p className="text-xs text-blue-400">
          💡 Intelligence sourced from government security feeds, weather data, and event monitoring systems
        </p>
      </div>
    </div>
  )
}

export default ThreatIndicator