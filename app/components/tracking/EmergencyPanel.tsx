'use client'

import { useState } from 'react'
import { Shield, Phone, Share2, Users, AlertTriangle, Check, Clock } from 'lucide-react'
import { useTrackingStore } from '../../stores/trackingStore'

interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
  isPrimary: boolean
}

export default function EmergencyPanel() {
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [journeyShared, setJourneyShared] = useState(false)
  const [responseTime, setResponseTime] = useState<number | null>(null)
  
  const { emergencyMode, toggleEmergencyMode, currentTrip } = useTrackingStore()

  const emergencyContacts: EmergencyContact[] = [
    { id: '1', name: 'Sarah Mitchell', phone: '+44 7123 456789', relationship: 'Partner', isPrimary: true },
    { id: '2', name: 'John Mitchell', phone: '+44 7234 567890', relationship: 'Father', isPrimary: false },
    { id: '3', name: 'Emma Davis', phone: '+44 7345 678901', relationship: 'Friend', isPrimary: false },
    { id: '4', name: 'Control Center', phone: '+44 20 7946 0000', relationship: 'Emergency', isPrimary: true }
  ]

  const handlePanicButton = async () => {
    setEmergencyActive(true)
    toggleEmergencyMode()
    
    // Start response timer
    const startTime = Date.now()
    setResponseTime(120) // 2 minutes in seconds
    
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const remaining = Math.max(0, 120 - elapsed)
      setResponseTime(remaining)
      
      if (remaining === 0) {
        clearInterval(timer)
      }
    }, 1000)

    // Simulate emergency response
    try {
      const response = await fetch('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'emergency_alert',
          data: {
            tripId: currentTrip?.tripId,
            type: 'panic',
            location: {
              latitude: 51.5074,
              longitude: -0.1278,
              timestamp: Date.now()
            },
            severity: 'critical'
          }
        })
      })
      
      const result = await response.json()
      console.log('Emergency alert sent:', result)
    } catch (error) {
      console.error('Emergency alert failed:', error)
    }
  }

  const handleShareJourney = () => {
    setJourneyShared(true)
    
    // Generate sharing link with trip details
    const shareData = {
      tripId: currentTrip?.tripId,
      driver: 'James Mitchell',
      vehicle: 'Mercedes S-Class GQ21 ABC',
      eta: new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString(),
      trackingUrl: `https://gq-cars.com/track/${currentTrip?.tripId}`
    }

    // In real implementation, send to emergency contacts
    console.log('Journey shared with emergency contacts:', shareData)
  }

  const handleContactCall = (contact: EmergencyContact) => {
    window.open(`tel:${contact.phone}`, '_self')
  }

  return (
    <div className="space-y-6">
      {/* Emergency Panic Button */}
      <div className="text-center">
        <button
          onClick={handlePanicButton}
          disabled={emergencyActive}
          className={`w-32 h-32 rounded-full border-4 transition-all duration-300 ${
            emergencyActive || emergencyMode
              ? 'bg-red-500 border-red-400 animate-pulse shadow-red-500/50 shadow-2xl scale-110'
              : 'bg-red-600 border-red-500 hover:bg-red-500 hover:scale-105'
          }`}
        >
          <div className="flex flex-col items-center justify-center text-white">
            <Shield className="w-8 h-8 mb-2" />
            <span className="text-sm font-bold">
              {emergencyActive ? 'ACTIVE' : 'EMERGENCY'}
            </span>
          </div>
        </button>
        
        <p className="text-sm text-gray-400 mt-4 max-w-md mx-auto">
          Press and hold for 3 seconds to activate emergency response. 
          Control center and emergency contacts will be notified immediately.
        </p>
        
        {responseTime !== null && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-red-400">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">
                {Math.floor(responseTime / 60)}:{(responseTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm mt-1">Emergency response dispatched</p>
          </div>
        )}
      </div>

      {/* Journey Sharing */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-gq-gold" />
            <h3 className="font-semibold">Journey Sharing</h3>
          </div>
          <button
            onClick={handleShareJourney}
            disabled={journeyShared}
            className={`px-4 py-2 rounded-lg transition-colors ${
              journeyShared
                ? 'bg-green-600 text-white'
                : 'bg-gq-gold text-black hover:bg-gq-gold/90'
            }`}
          >
            {journeyShared ? (
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Shared
              </div>
            ) : (
              'Share Live Location'
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mb-3">
          Share your live location and trip details with trusted contacts. 
          They will receive updates until 30 minutes after your trip ends.
        </p>
        
        {journeyShared && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              Journey shared with {emergencyContacts.length} contacts
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Including: Live location, driver details, ETA, and vehicle information
            </p>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gq-gold" />
          <h3 className="font-semibold">Emergency Contacts</h3>
        </div>
        
        <div className="space-y-3">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
            >
              <div>
                <p className="font-medium">{contact.name}</p>
                <p className="text-sm text-gray-400">{contact.relationship}</p>
                {contact.isPrimary && (
                  <span className="inline-block bg-gq-gold/20 text-gq-gold text-xs px-2 py-1 rounded mt-1">
                    Primary
                  </span>
                )}
              </div>
              
              <button
                onClick={() => handleContactCall(contact)}
                className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
                title={`Call ${contact.name}`}
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features Status */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-gq-gold" />
          <h3 className="font-semibold">Safety Monitoring</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Route Monitoring</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Speed Monitoring</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Geofence Alerts</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Emergency Response</span>
            <span className="text-gq-gold">&lt; 2 minutes</span>
          </div>
        </div>
      </div>
    </div>
  )
}