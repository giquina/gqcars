'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Shield, MapPin, MessageSquare, User, AlertTriangle, Phone, Clock } from 'lucide-react'
import { useTrackingStore } from '../../stores/trackingStore'
import LiveMap from '../../components/tracking/LiveMap'
import EmergencyPanel from '../../components/tracking/EmergencyPanel'
import CommunicationPanel from '../../components/tracking/CommunicationPanel'
import DriverVerification from '../../components/tracking/DriverVerification'

export default function TrackingPage() {
  const params = useParams()
  const tripId = params.tripId as string
  const [activeTab, setActiveTab] = useState<'map' | 'safety' | 'communication' | 'verification'>('map')
  const [tripStatus, setTripStatus] = useState<'loading' | 'active' | 'completed' | 'error'>('loading')
  
  const {
    setCurrentTrip,
    setDriver,
    setVehicle,
    enableTracking,
    currentTrip,
    currentDriver,
    emergencyMode,
    isConnected
  } = useTrackingStore()

  useEffect(() => {
    // Initialize trip data
    const initializeTrip = async () => {
      try {
        const response = await fetch(`/api/tracking?tripId=${tripId}`)
        const data = await response.json()
        
        if (data.error) {
          setTripStatus('error')
          return
        }

        // Set trip data
        const tripData = {
          tripId: data.tripId,
          customerId: 'customer-001',
          driverId: data.driver.id,
          vehicleId: 'vehicle-001',
          status: data.status,
          pickupLocation: {
            latitude: 51.5074,
            longitude: -0.1278,
            accuracy: 5,
            timestamp: Date.now(),
            address: 'London, UK'
          },
          destinationLocation: {
            latitude: 51.5074,
            longitude: -0.1278,
            accuracy: 5,
            timestamp: Date.now(),
            address: 'Heathrow Airport, UK'
          },
          scheduledTime: Date.now(),
          estimatedArrival: data.eta,
          emergencyContacts: [
            { id: '1', name: 'Sarah Mitchell', phone: '+44 7123 456789', relationship: 'Partner', isPrimary: true },
            { id: '2', name: 'Control Center', phone: '+44 20 7946 0000', relationship: 'Emergency', isPrimary: true }
          ]
        }

        const driverData = {
          id: data.driver.id,
          name: data.driver.name,
          photo: data.driver.photo,
          licenseNumber: 'DL-123456',
          siaLicense: data.driver.license,
          rating: data.driver.rating,
          reviewCount: 247,
          phone: '+44 7946 0001',
          status: 'active' as const,
          specializations: ['Close Protection', 'Executive Transport'],
          verified: true
        }

        const vehicleData = {
          id: 'vehicle-001',
          make: data.vehicle.make,
          model: data.vehicle.model,
          year: 2023,
          color: data.vehicle.color,
          licensePlate: data.vehicle.plate,
          type: 'luxury' as const,
          capacity: 4,
          features: ['GPS Tracking', 'Emergency Button', 'Bulletproof Glass', 'Run-flat Tires']
        }

        setCurrentTrip(tripData)
        setDriver(driverData)
        setVehicle(vehicleData)
        enableTracking()
        setTripStatus('active')
        
      } catch (error) {
        console.error('Failed to initialize trip:', error)
        setTripStatus('error')
      }
    }

    if (tripId) {
      initializeTrip()
    }
  }, [tripId, setCurrentTrip, setDriver, setVehicle, enableTracking])

  const tabs = [
    { id: 'map', label: 'Live Map', icon: MapPin },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
    { id: 'verification', label: 'Driver ID', icon: User }
  ]

  if (tripStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gq-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gq-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (tripStatus === 'error') {
    return (
      <div className="min-h-screen bg-gq-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Trip Not Found</h1>
          <p className="text-gray-400">The tracking link may be invalid or expired.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 px-6 py-2 bg-gq-gold text-black rounded-lg hover:bg-gq-gold/90 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gq-black text-white">
      {/* Header */}
      <div className={`bg-gq-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50 ${
        emergencyMode ? 'border-red-500/50 bg-red-500/10' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Shield className="w-8 h-8 text-gq-gold" />
                GQ Cars Tracking
              </h1>
              <p className="text-gray-400">Trip ID: {tripId}</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                isConnected ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`} />
                {isConnected ? 'Connected' : 'Connecting...'}
              </div>
              
              {/* Emergency Contact */}
              <button
                onClick={() => window.open('tel:+442079460000', '_self')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  emergencyMode 
                    ? 'bg-red-500 animate-pulse text-white' 
                    : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                <Phone className="w-4 h-4" />
                Emergency
              </button>
            </div>
          </div>
          
          {emergencyMode && (
            <div className="mt-3 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">EMERGENCY MODE ACTIVE</span>
                <span className="text-sm">• Response team dispatched</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Trip Status Banner */}
        {currentTrip && (
          <div className="mb-6 p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg">
                  {currentTrip.status === 'in_transit' && 'Journey in Progress'}
                  {currentTrip.status === 'en_route' && 'Driver En Route'}
                  {currentTrip.status === 'arrived' && 'Driver Has Arrived'}
                  {currentTrip.status === 'completed' && 'Journey Completed'}
                </h2>
                <p className="text-gray-400">
                  From {currentTrip.pickupLocation.address} to {currentTrip.destinationLocation.address}
                </p>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 text-gq-gold">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">15 min</span>
                </div>
                <p className="text-sm text-gray-400">Estimated arrival</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-800/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-gq-gold text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'map' && (
            <div>
              <LiveMap tripId={tripId} customerId="customer-001" />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Tracking Accuracy</h3>
                  <p className="text-2xl font-bold text-green-400">&lt; 10m</p>
                  <p className="text-sm text-gray-400">GPS precision maintained</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Update Frequency</h3>
                  <p className="text-2xl font-bold text-gq-gold">10s</p>
                  <p className="text-sm text-gray-400">Real-time updates</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">System Uptime</h3>
                  <p className="text-2xl font-bold text-green-400">99.9%</p>
                  <p className="text-sm text-gray-400">Service availability</p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'safety' && <EmergencyPanel />}
          
          {activeTab === 'communication' && <CommunicationPanel />}
          
          {activeTab === 'verification' && <DriverVerification />}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-400">
            <p className="mb-2">GQ Cars LTD - Premium Security Transport</p>
            <p className="text-sm">24/7 Control Center: +44 20 7946 0000</p>
          </div>
        </div>
      </div>
    </div>
  )
}