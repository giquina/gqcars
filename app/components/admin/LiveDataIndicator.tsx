'use client'

import { useEffect, useState } from 'react'
import { Wifi, WifiOff, Clock } from 'lucide-react'
import { AdminStore } from '@/lib/stores/adminStore'

interface LiveDataIndicatorProps {
  lastUpdate: Date
}

export function LiveDataIndicator({ lastUpdate }: LiveDataIndicatorProps) {
  const [connected, setConnected] = useState(false)
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0)

  useEffect(() => {
    // Subscribe to connection status
    const unsubscribe = AdminStore.subscribe(
      state => state.connected,
      (isConnected) => setConnected(isConnected)
    )

    // Get initial connection status
    setConnected(AdminStore.getState().connected)

    return unsubscribe
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000)
      setTimeSinceUpdate(diffInSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [lastUpdate])

  const getStatusColor = () => {
    if (!connected) return 'text-red-500'
    if (timeSinceUpdate < 30) return 'text-green-500'
    if (timeSinceUpdate < 60) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusText = () => {
    if (!connected) return 'Disconnected'
    if (timeSinceUpdate < 10) return 'Live'
    if (timeSinceUpdate < 30) return `${timeSinceUpdate}s ago`
    if (timeSinceUpdate < 60) return `${timeSinceUpdate}s ago`
    return 'Connection Lost'
  }

  return (
    <div className="ml-4 flex items-center space-x-2">
      <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
        {connected ? (
          <Wifi className="h-4 w-4" />
        ) : (
          <WifiOff className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">{getStatusText()}</span>
      </div>
      
      {connected && timeSinceUpdate < 30 && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500">Real-time</span>
        </div>
      )}
    </div>
  )
}