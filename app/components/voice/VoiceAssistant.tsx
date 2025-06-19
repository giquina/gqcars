'use client'

import React, { useState, useEffect } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Settings, AlertTriangle, Phone } from 'lucide-react'
import { useVoice } from './VoiceProvider'

interface VoiceAssistantProps {
  onBookingRequest?: (details: any) => void
  onQuoteRequest?: (details: any) => void
}

export default function VoiceAssistant({ onBookingRequest, onQuoteRequest }: VoiceAssistantProps) {
  const {
    isListening,
    transcript,
    confidence,
    isSupported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSpeaking,
    lastCommand,
    settings,
    isEmergencyActive,
    triggerEmergency
  } = useVoice()

  const [isMinimized, setIsMinimized] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentMode, setCurrentMode] = useState<'standby' | 'booking' | 'quote' | 'info'>('standby')

  // Process voice commands
  useEffect(() => {
    if (lastCommand && lastCommand.length > 0) {
      processVoiceCommand(lastCommand)
    }
  }, [lastCommand])

  const processVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase()

    // Booking commands
    if (cmd.includes('book') || cmd.includes('reserve') || cmd.includes('schedule')) {
      setCurrentMode('booking')
      handleBookingCommand(cmd)
    }
    // Quote commands
    else if (cmd.includes('quote') || cmd.includes('price') || cmd.includes('cost') || cmd.includes('how much')) {
      setCurrentMode('quote')
      handleQuoteCommand(cmd)
    }
    // Information commands
    else if (cmd.includes('services') || cmd.includes('what do you offer') || cmd.includes('about')) {
      setCurrentMode('info')
      handleInfoCommand(cmd)
    }
    // Emergency commands
    else if (cmd.includes('emergency') || cmd.includes('help') || cmd.includes('urgent')) {
      triggerEmergency()
    }
    // Navigation commands
    else if (cmd.includes('go to') || cmd.includes('navigate') || cmd.includes('show me')) {
      handleNavigationCommand(cmd)
    }
  }

  const handleBookingCommand = (command: string) => {
    speak("I'll help you with your booking. Let me gather some information.")
    
    // Extract booking details from command
    const bookingDetails = extractBookingDetails(command)
    
    if (bookingDetails.hasMinimalInfo) {
      speak(`I understand you want to book ${bookingDetails.service} ${bookingDetails.fromLocation ? `from ${bookingDetails.fromLocation}` : ''} ${bookingDetails.toLocation ? `to ${bookingDetails.toLocation}` : ''}. Let me get you a quote.`)
      onBookingRequest?.(bookingDetails)
    } else {
      speak("I need more details for your booking. Could you please specify the pickup location, destination, and preferred time?")
    }
  }

  const handleQuoteCommand = (command: string) => {
    const quoteDetails = extractQuoteDetails(command)
    speak(`Getting you a quote for ${quoteDetails.service || 'security transport'}. ${quoteDetails.duration ? `For ${quoteDetails.duration} hours.` : ''}`)
    onQuoteRequest?.(quoteDetails)
  }

  const handleInfoCommand = (command: string) => {
    if (command.includes('services')) {
      speak("GQ Cars offers security taxi services, close protection, corporate transport, wedding security, VIP services, and private hire. All our drivers are SIA licensed Close Protection Officers.")
    } else if (command.includes('about')) {
      speak("GQ Cars is a premium security taxi service covering London, Watford, and all major airports. We provide professional transport with SIA licensed drivers available 24/7.")
    } else {
      speak("How can I help you today? I can assist with bookings, quotes, or information about our security transport services.")
    }
  }

  const handleNavigationCommand = (command: string) => {
    if (command.includes('booking') || command.includes('book')) {
      speak("Navigating to the booking page.")
      window.location.href = '/book'
    } else if (command.includes('services')) {
      speak("Here are our available services.")
      // Would scroll to services section or navigate to services page
    }
  }

  const extractBookingDetails = (command: string) => {
    const details: any = {
      service: 'security-taxi',
      fromLocation: '',
      toLocation: '',
      time: '',
      hasMinimalInfo: false
    }

    // Extract service type
    if (command.includes('vip')) details.service = 'vip'
    else if (command.includes('close protection')) details.service = 'close-protection'
    else if (command.includes('corporate')) details.service = 'corporate'
    else if (command.includes('wedding')) details.service = 'wedding'
    else if (command.includes('private hire')) details.service = 'private-hire'

    // Extract locations
    const fromMatches = command.match(/from ([^to]+)/i)
    const toMatches = command.match(/to ([^at]+)/i)
    
    if (fromMatches) details.fromLocation = fromMatches[1].trim()
    if (toMatches) details.toLocation = toMatches[1].trim()

    // Extract time
    const timeMatches = command.match(/at (\d{1,2}:?\d{0,2})/i)
    if (timeMatches) details.time = timeMatches[1]

    details.hasMinimalInfo = !!(details.fromLocation || details.toLocation)
    
    return details
  }

  const extractQuoteDetails = (command: string) => {
    const details: any = {
      service: 'security-taxi',
      duration: '',
      officers: 1,
      vehicles: 1
    }

    // Extract duration
    const durationMatches = command.match(/(\d+)\s*hours?/i)
    if (durationMatches) details.duration = durationMatches[1]

    // Extract officers
    const officerMatches = command.match(/(\d+)\s*officer[s]?/i)
    if (officerMatches) details.officers = parseInt(officerMatches[1])

    return details
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleEmergencyCall = () => {
    speak("Calling GQ Cars emergency line now.")
    window.location.href = 'tel:07407655203'
  }

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
        <p className="text-sm">Voice features are not supported in your browser.</p>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isMinimized ? 'w-16 h-16' : 'w-80 h-auto'}`}>
      {/* Emergency Alert */}
      {isEmergencyActive && (
        <div className="absolute -top-16 left-0 right-0 bg-red-600 text-white p-3 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm font-bold">EMERGENCY MODE</span>
            </div>
            <button
              onClick={handleEmergencyCall}
              className="bg-white text-red-600 px-3 py-1 rounded text-sm font-bold hover:bg-gray-100"
            >
              <Phone className="w-4 h-4 inline mr-1" />
              CALL NOW
            </button>
          </div>
        </div>
      )}

      {/* Main Voice Assistant */}
      <div className={`bg-gradient-to-br from-gq-blue to-gq-gold p-4 rounded-lg shadow-xl ${isMinimized ? 'p-2' : ''}`}>
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center text-white"
          >
            <Mic className="w-6 h-6" />
          </button>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-white font-bold text-sm">GQ Voice Assistant</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white/80 hover:text-white p-1"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-white/80 hover:text-white text-xs"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="text-white text-sm">
              <div className={`font-semibold ${currentMode === 'standby' ? 'text-green-200' : 'text-yellow-200'}`}>
                {currentMode === 'standby' && 'Ready to help'}
                {currentMode === 'booking' && 'Booking Assistant Active'}
                {currentMode === 'quote' && 'Quote Calculator Ready'}
                {currentMode === 'info' && 'Information Mode'}
              </div>
              {confidence > 0 && (
                <div className="text-xs text-white/70 mt-1">
                  Confidence: {Math.round(confidence * 100)}%
                </div>
              )}
            </div>

            {/* Transcript */}
            {transcript && (
              <div className="bg-black/20 p-2 rounded text-white text-sm max-h-20 overflow-y-auto">
                "{transcript}"
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={toggleListening}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span className="text-sm">{isListening ? 'Stop' : 'Listen'}</span>
              </button>

              <div className="flex gap-2">
                <button
                  onClick={isSpeaking ? stopSpeaking : () => speak("Hello! I'm your GQ Cars voice assistant. How can I help you today?")}
                  className="text-white/80 hover:text-white p-2"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={triggerEmergency}
                  className="text-red-200 hover:text-red-100 p-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Commands */}
            <div className="text-xs text-white/70 space-y-1">
              <div>Say: "Book a taxi from Heathrow to Canary Wharf"</div>
              <div>Say: "How much for 4 hours of security?"</div>
              <div>Say: "What services do you offer?"</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}