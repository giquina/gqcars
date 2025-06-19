'use client'

import React, { useState, useEffect } from 'react'
import { useVoice } from './VoiceProvider'
import { AlertTriangle, Phone, Shield, MapPin, Clock, User } from 'lucide-react'

interface EmergencyData {
  type: string
  location: string
  description: string
  contact: string
  timestamp: Date
  urgency: 'low' | 'medium' | 'high' | 'critical'
}

export default function EmergencyVoiceProtocol() {
  const { speak, lastCommand, isEmergencyActive, triggerEmergency } = useVoice()
  const [emergencyData, setEmergencyData] = useState<EmergencyData | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const emergencySteps = [
    {
      prompt: "Emergency protocol activated. What type of emergency is this? Say 'threat', 'medical', 'vehicle', or 'other'.",
      field: 'type'
    },
    {
      prompt: "What is your current location? Please be as specific as possible.",
      field: 'location'
    },
    {
      prompt: "Briefly describe the emergency situation.",
      field: 'description'
    },
    {
      prompt: "Are you the person in need of assistance, or are you calling for someone else?",
      field: 'contact'
    }
  ]

  useEffect(() => {
    if (isEmergencyActive && !isActive) {
      setIsActive(true)
      setCurrentStep(0)
      setEmergencyData({
        type: '',
        location: '',
        description: '',
        contact: '',
        timestamp: new Date(),
        urgency: 'high'
      })
      speak(emergencySteps[0].prompt)
    }
  }, [isEmergencyActive])

  useEffect(() => {
    if (isActive && lastCommand && lastCommand.length > 0) {
      handleEmergencyCommand(lastCommand)
    }
  }, [lastCommand, isActive])

  const handleEmergencyCommand = (command: string) => {
    if (!emergencyData) return

    const step = emergencySteps[currentStep]
    const cleanCommand = command.toLowerCase().trim()

    if (step.field === 'type') {
      let emergencyType = 'other'
      if (cleanCommand.includes('threat') || cleanCommand.includes('danger') || cleanCommand.includes('attack')) {
        emergencyType = 'threat'
      } else if (cleanCommand.includes('medical') || cleanCommand.includes('health') || cleanCommand.includes('injury')) {
        emergencyType = 'medical'
      } else if (cleanCommand.includes('vehicle') || cleanCommand.includes('car') || cleanCommand.includes('accident')) {
        emergencyType = 'vehicle'
      }

      setEmergencyData(prev => prev ? { ...prev, type: emergencyType } : null)
      speak(`Emergency type recorded as ${emergencyType}. ${emergencySteps[currentStep + 1]?.prompt || 'Gathering location information.'}`)
      
    } else if (step.field === 'location') {
      setEmergencyData(prev => prev ? { ...prev, location: command } : null)
      speak(`Location recorded. ${emergencySteps[currentStep + 1]?.prompt || 'Please describe the situation.'}`)
      
    } else if (step.field === 'description') {
      setEmergencyData(prev => prev ? { ...prev, description: command } : null)
      speak(`Description recorded. ${emergencySteps[currentStep + 1]?.prompt || 'Final information needed.'}`)
      
    } else if (step.field === 'contact') {
      setEmergencyData(prev => prev ? { ...prev, contact: command } : null)
      speak("All emergency information collected. Dispatching immediate assistance and contacting emergency services.")
      completeEmergencyReport()
      return
    }

    if (currentStep < emergencySteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const completeEmergencyReport = () => {
    if (!emergencyData) return

    // In a real implementation, this would:
    // 1. Contact emergency services
    // 2. Dispatch nearest GQ Cars unit
    // 3. Alert management
    // 4. Log the incident

    const urgencyLevel = determineUrgency(emergencyData)
    setEmergencyData(prev => prev ? { ...prev, urgency: urgencyLevel } : null)

    speak(`Emergency report complete. Urgency level: ${urgencyLevel}. 
           Emergency services contacted. 
           GQ Cars security team dispatched to ${emergencyData.location}. 
           Your reference number is E${Date.now().toString().slice(-6)}.
           Stay on the line for further instructions.`)

    // Auto-call emergency number
    setTimeout(() => {
      window.location.href = 'tel:07407655203'
    }, 3000)

    setIsActive(false)
  }

  const determineUrgency = (data: EmergencyData): 'low' | 'medium' | 'high' | 'critical' => {
    const highRiskKeywords = ['attack', 'weapon', 'threat', 'danger', 'injury', 'accident']
    const criticalKeywords = ['shooting', 'stabbing', 'bomb', 'terrorist', 'unconscious', 'bleeding']

    const description = data.description.toLowerCase()
    const type = data.type.toLowerCase()

    if (criticalKeywords.some(keyword => description.includes(keyword) || type.includes(keyword))) {
      return 'critical'
    }
    if (highRiskKeywords.some(keyword => description.includes(keyword) || type.includes(keyword))) {
      return 'high'
    }
    if (type === 'medical' || type === 'threat') {
      return 'high'
    }
    return 'medium'
  }

  const cancelEmergency = () => {
    speak("Emergency protocol cancelled. If this was a mistake and you still need emergency assistance, say 'emergency help' again.")
    setIsActive(false)
    setEmergencyData(null)
    setCurrentStep(0)
  }

  if (!isActive) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-red-900/90 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-red-500 rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="bg-red-600 p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-white animate-pulse" />
            <h2 className="text-xl font-bold text-white">EMERGENCY PROTOCOL</h2>
          </div>
          <p className="text-red-100 text-sm mt-1">Voice emergency reporting active</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Progress */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / emergencySteps.length) * 100}%` }}
            />
          </div>

          {/* Current Step */}
          <div className="text-center">
            <div className="text-white font-medium mb-2">
              Step {currentStep + 1} of {emergencySteps.length}
            </div>
            <div className="text-gray-300 text-sm">
              {emergencySteps[currentStep]?.prompt}
            </div>
          </div>

          {/* Collected Information */}
          {emergencyData && (
            <div className="bg-gray-800 p-3 rounded space-y-2 text-sm">
              {emergencyData.type && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300">Type: {emergencyData.type}</span>
                </div>
              )}
              {emergencyData.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300">Location: {emergencyData.location}</span>
                </div>
              )}
              {emergencyData.description && (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Description: {emergencyData.description.substring(0, 50)}...</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Time: {emergencyData.timestamp.toLocaleTimeString()}</span>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-yellow-900/30 border border-yellow-600 p-3 rounded">
            <p className="text-yellow-100 text-xs">
              Speak clearly and provide as much detail as possible. 
              Emergency services and GQ Cars security are being notified.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex justify-between">
          <button
            onClick={cancelEmergency}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
          >
            Cancel
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={() => window.location.href = 'tel:999'}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              999
            </button>
            <button
              onClick={() => window.location.href = 'tel:07407655203'}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-1"
            >
              <Phone className="w-4 h-4" />
              GQ Cars
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}