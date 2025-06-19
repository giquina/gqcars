'use client'

import { useState, useEffect } from 'react'
import { Bell, X, AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { AdminStore, Alert } from '@/lib/stores/adminStore'

export function AlertSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [alerts, setAlerts] = useState<Alert[]>([])
  
  useEffect(() => {
    // Subscribe to alerts from store
    const unsubscribe = AdminStore.subscribe(
      state => state.alerts,
      (newAlerts) => setAlerts(newAlerts)
    )
    
    // Get initial alerts
    setAlerts(AdminStore.getState().alerts)
    
    return unsubscribe
  }, [])

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged)
  const criticalAlerts = unacknowledgedAlerts.filter(alert => alert.type === 'critical')

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getAlertBg = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    AdminStore.getState().acknowledgeAlert(alertId)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
      >
        <Bell className="h-5 w-5" />
        {unacknowledgedAlerts.length > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unacknowledgedAlerts.length}
          </span>
        )}
        {criticalAlerts.length > 0 && (
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">
                Alerts ({unacknowledgedAlerts.length})
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {unacknowledgedAlerts.length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-500">
                No new alerts
              </div>
            ) : (
              <div className="p-2">
                {unacknowledgedAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 mb-2 rounded-lg border ${getAlertBg(alert.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-2">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {alert.message}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-500">
                              {alert.timestamp.toLocaleTimeString()}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              alert.category === 'critical' ? 'bg-red-100 text-red-800' :
                              alert.category === 'compliance' ? 'bg-yellow-100 text-yellow-800' :
                              alert.category === 'system' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {alert.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {unacknowledgedAlerts.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <button
                onClick={() => {
                  unacknowledgedAlerts.forEach(alert => 
                    acknowledgeAlert(alert.id)
                  )
                }}
                className="w-full text-sm text-center text-gray-600 hover:text-gray-800"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}