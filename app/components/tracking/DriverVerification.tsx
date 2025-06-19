'use client'

import { useState, useEffect } from 'react'
import { Shield, Check, X, QrCode, Star, Phone, Camera, AlertTriangle } from 'lucide-react'
import { useTrackingStore } from '../../stores/trackingStore'

interface VerificationItem {
  id: string
  label: string
  status: 'pending' | 'verified' | 'failed'
  required: boolean
}

export default function DriverVerification() {
  const [verificationCode, setVerificationCode] = useState('')
  const [showQR, setShowQR] = useState(false)
  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>([
    { id: 'sia_license', label: 'SIA License Valid', status: 'pending', required: true },
    { id: 'identity', label: 'Driver Identity Verified', status: 'pending', required: true },
    { id: 'vehicle_match', label: 'Vehicle Registration Match', status: 'pending', required: true },
    { id: 'background_check', label: 'Background Check Clear', status: 'verified', required: true },
    { id: 'insurance', label: 'Insurance Coverage Active', status: 'verified', required: true },
    { id: 'medical', label: 'Medical Clearance Current', status: 'verified', required: false }
  ])

  const { currentDriver, currentVehicle } = useTrackingStore()

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      setVerificationItems(prev => prev.map(item => ({
        ...item,
        status: item.id === 'sia_license' || item.id === 'identity' || item.id === 'vehicle_match' 
          ? 'verified' 
          : item.status
      })))
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleQRVerification = () => {
    // Simulate QR code scan
    setVerificationCode('GQ-DRIVER-001-VERIFIED')
    setShowQR(true)
    
    // Auto-verify after showing QR
    setTimeout(() => {
      setVerificationItems(prev => prev.map(item => ({
        ...item,
        status: 'verified'
      })))
    }, 1500)
  }

  const getVerificationStatus = () => {
    const requiredItems = verificationItems.filter(item => item.required)
    const verifiedRequired = requiredItems.filter(item => item.status === 'verified')
    const failedRequired = requiredItems.filter(item => item.status === 'failed')
    
    if (failedRequired.length > 0) return 'failed'
    if (verifiedRequired.length === requiredItems.length) return 'verified'
    return 'pending'
  }

  const overallStatus = getVerificationStatus()

  if (!currentDriver || !currentVehicle) {
    return (
      <div className="bg-gray-800/50 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
        <p className="text-gray-400">No driver assigned to this trip</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Overall Verification Status */}
      <div className={`p-4 rounded-lg border-2 ${
        overallStatus === 'verified' 
          ? 'bg-green-500/20 border-green-500/50'
          : overallStatus === 'failed'
          ? 'bg-red-500/20 border-red-500/50'
          : 'bg-yellow-500/20 border-yellow-500/50'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${
            overallStatus === 'verified' 
              ? 'bg-green-500'
              : overallStatus === 'failed'
              ? 'bg-red-500'
              : 'bg-yellow-500'
          }`}>
            {overallStatus === 'verified' ? (
              <Check className="w-6 h-6 text-white" />
            ) : overallStatus === 'failed' ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Shield className="w-6 h-6 text-white" />
            )}
          </div>
          
          <div>
            <h3 className="font-bold text-lg">
              {overallStatus === 'verified' && 'Driver Verified'}
              {overallStatus === 'failed' && 'Verification Failed'}
              {overallStatus === 'pending' && 'Verification in Progress'}
            </h3>
            <p className="text-sm opacity-80">
              {overallStatus === 'verified' && 'All security checks passed'}
              {overallStatus === 'failed' && 'Security verification failed'}
              {overallStatus === 'pending' && 'Please wait while we verify your driver'}
            </p>
          </div>
        </div>
      </div>

      {/* Driver Profile */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold">{currentDriver.name.charAt(0)}</span>
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-lg">{currentDriver.name}</h3>
            <p className="text-gray-400">SIA License: {currentDriver.siaLicense}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(currentDriver.rating) ? 'text-gq-gold fill-current' : 'text-gray-600'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-400 ml-1">
                  {currentDriver.rating} ({currentDriver.reviewCount} reviews)
                </span>
              </div>
              {currentDriver.verified && (
                <div className="flex items-center gap-1 text-green-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Verified Driver</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => window.open(`tel:${currentDriver.phone}`, '_self')}
            className="p-3 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Vehicle Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Make & Model</p>
            <p className="font-medium">{currentVehicle.make} {currentVehicle.model}</p>
          </div>
          <div>
            <p className="text-gray-400">License Plate</p>
            <p className="font-medium font-mono">{currentVehicle.licensePlate}</p>
          </div>
          <div>
            <p className="text-gray-400">Year</p>
            <p className="font-medium">{currentVehicle.year}</p>
          </div>
          <div>
            <p className="text-gray-400">Color</p>
            <p className="font-medium">{currentVehicle.color}</p>
          </div>
        </div>
        
        {currentVehicle.features.length > 0 && (
          <div className="mt-3">
            <p className="text-gray-400 text-sm mb-2">Vehicle Features</p>
            <div className="flex flex-wrap gap-2">
              {currentVehicle.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gq-gold/20 text-gq-gold text-xs rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Verification */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">QR Code Verification</h4>
          <button
            onClick={handleQRVerification}
            className="flex items-center gap-2 px-4 py-2 bg-gq-gold text-black rounded-lg hover:bg-gq-gold/90 transition-colors"
          >
            <QrCode className="w-4 h-4" />
            Scan QR Code
          </button>
        </div>
        
        {showQR && (
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="w-32 h-32 mx-auto mb-4 bg-black rounded flex items-center justify-center">
              <QrCode className="w-16 h-16 text-white" />
            </div>
            <p className="text-black text-sm font-mono">{verificationCode}</p>
            <p className="text-gray-600 text-xs mt-2">Scan to verify driver identity</p>
          </div>
        )}
        
        <p className="text-sm text-gray-400 mt-3">
          Scan the driver's QR code to verify their identity and ensure they match our records.
        </p>
      </div>

      {/* Verification Checklist */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="font-semibold mb-4">Security Verification Checklist</h4>
        
        <div className="space-y-3">
          {verificationItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  item.status === 'verified' 
                    ? 'bg-green-500'
                    : item.status === 'failed'
                    ? 'bg-red-500'
                    : 'bg-yellow-500'
                }`}>
                  {item.status === 'verified' ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : item.status === 'failed' ? (
                    <X className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  )}
                </div>
                
                <div>
                  <p className="font-medium">{item.label}</p>
                  {item.required && (
                    <p className="text-xs text-gray-400">Required</p>
                  )}
                </div>
              </div>
              
              <span className={`text-sm font-medium ${
                item.status === 'verified' 
                  ? 'text-green-400'
                  : item.status === 'failed'
                  ? 'text-red-400'
                  : 'text-yellow-400'
              }`}>
                {item.status === 'verified' && 'Verified'}
                {item.status === 'failed' && 'Failed'}
                {item.status === 'pending' && 'Checking...'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Contact */}
      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-400" />
          <div>
            <h4 className="font-semibold text-blue-400">Security Guarantee</h4>
            <p className="text-sm text-gray-300">
              All drivers undergo comprehensive background checks and real-time verification. 
              If you have any security concerns, contact our 24/7 control center immediately.
            </p>
            <button className="mt-2 text-blue-400 hover:text-blue-300 text-sm font-medium">
              Contact Security Team →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}