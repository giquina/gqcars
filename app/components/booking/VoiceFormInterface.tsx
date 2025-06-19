'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Brain, MessageSquare, Loader } from 'lucide-react'

interface VoiceFormInterfaceProps {
  onFieldUpdate: (field: string, value: string) => void
  formData: any
  currentStep: number
}

interface VoiceCommand {
  command: string
  field: string
  value?: string
  confidence: number
}

interface SpeechState {
  isListening: boolean
  isProcessing: boolean
  transcript: string
  lastCommand: VoiceCommand | null
  feedback: string
}

export default function VoiceFormInterface({ 
  onFieldUpdate, 
  formData, 
  currentStep 
}: VoiceFormInterfaceProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [speechState, setSpeechState] = useState<SpeechState>({
    isListening: false,
    isProcessing: false,
    transcript: '',
    lastCommand: null,
    feedback: ''
  })
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [helpMode, setHelpMode] = useState(false)
  
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Check for speech recognition and synthesis support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      if ('speechSynthesis' in window) {
        setVoiceSupported(true)
        synthRef.current = window.speechSynthesis
      }
    }
  }, [])

  const speakFeedback = useCallback((text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.8
      utterance.pitch = 1
      utterance.volume = 0.8
      synthRef.current.speak(utterance)
    }
  }, [])

  const processVoiceCommand = useCallback((transcript: string): VoiceCommand | null => {
    const text = transcript.toLowerCase().trim()
    
    // Field mapping commands
    const fieldCommands = [
      // Name field
      { patterns: ['my name is', 'name is', 'call me'], field: 'name' },
      // Email field  
      { patterns: ['email is', 'my email is', 'email address is'], field: 'email' },
      // Phone field
      { patterns: ['phone number is', 'my phone is', 'call me on'], field: 'phone' },
      // Location field
      { patterns: ['location is', 'pickup from', 'starting from', 'pick me up from'], field: 'location' },
      // Destination field
      { patterns: ['going to', 'destination is', 'drop me at', 'take me to'], field: 'destination' },
      // Service selection
      { patterns: ['i need', 'book', 'want'], field: 'service' },
      // Time field
      { patterns: ['at', 'time is', 'pick me up at'], field: 'time' },
      // Date field
      { patterns: ['on', 'date is', 'for'], field: 'date' },
      // Requirements
      { patterns: ['special requirements', 'i also need', 'additional'], field: 'requirements' }
    ]

    // Navigation commands
    if (text.includes('next step') || text.includes('continue') || text.includes('go forward')) {
      return {
        command: 'navigation',
        field: 'next',
        confidence: 0.9
      }
    }

    if (text.includes('previous step') || text.includes('go back') || text.includes('back')) {
      return {
        command: 'navigation',
        field: 'previous',
        confidence: 0.9
      }
    }

    if (text.includes('submit') || text.includes('send') || text.includes('complete booking')) {
      return {
        command: 'navigation',
        field: 'submit',
        confidence: 0.9
      }
    }

    // Service type recognition
    const serviceTypes = [
      { keywords: ['close protection', 'bodyguard', 'personal security'], value: 'close-protection' },
      { keywords: ['private hire', 'taxi', 'driver'], value: 'private-hire' },
      { keywords: ['corporate', 'business', 'company'], value: 'corporate' },
      { keywords: ['wedding', 'marriage', 'ceremony'], value: 'weddings' },
      { keywords: ['vip', 'high profile', 'celebrity'], value: 'vip' }
    ]

    for (const service of serviceTypes) {
      if (service.keywords.some(keyword => text.includes(keyword))) {
        return {
          command: 'field_update',
          field: 'service',
          value: service.value,
          confidence: 0.85
        }
      }
    }

    // Field value extraction
    for (const fieldCmd of fieldCommands) {
      for (const pattern of fieldCmd.patterns) {
        if (text.includes(pattern)) {
          const valueStartIndex = text.indexOf(pattern) + pattern.length
          const value = text.substring(valueStartIndex).trim()
          
          if (value) {
            return {
              command: 'field_update',
              field: fieldCmd.field,
              value: value,
              confidence: 0.8
            }
          }
        }
      }
    }

    // Time parsing
    if (text.includes('o\'clock') || text.includes('am') || text.includes('pm')) {
      const timeMatch = text.match(/(\d{1,2})\s*(am|pm|o'clock)/i)
      if (timeMatch) {
        const hour = parseInt(timeMatch[1])
        const period = timeMatch[2].toLowerCase()
        let time24 = hour
        
        if (period === 'pm' && hour !== 12) time24 += 12
        if (period === 'am' && hour === 12) time24 = 0
        
        const timeString = `${time24.toString().padStart(2, '0')}:00`
        return {
          command: 'field_update',
          field: 'time',
          value: timeString,
          confidence: 0.9
        }
      }
    }

    // Date parsing
    const datePatterns = [
      /tomorrow/i,
      /today/i,
      /next (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
      /(\d{1,2})(st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)/i
    ]

    for (const pattern of datePatterns) {
      if (pattern.test(text)) {
        let date = new Date()
        
        if (/tomorrow/i.test(text)) {
          date.setDate(date.getDate() + 1)
        } else if (/next\s+(\w+)/i.test(text)) {
          const dayMatch = text.match(/next\s+(\w+)/i)
          if (dayMatch) {
            const targetDay = dayMatch[1].toLowerCase()
            const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
            const targetIndex = days.indexOf(targetDay)
            if (targetIndex !== -1) {
              const currentDay = date.getDay()
              const daysToAdd = (targetIndex - currentDay + 7) % 7 || 7
              date.setDate(date.getDate() + daysToAdd)
            }
          }
        }
        
        const dateString = date.toISOString().split('T')[0]
        return {
          command: 'field_update',
          field: 'date',
          value: dateString,
          confidence: 0.85
        }
      }
    }

    return null
  }, [])

  const startListening = useCallback(() => {
    if (!voiceSupported || recognitionRef.current) return

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-GB'

    recognitionRef.current.onstart = () => {
      setSpeechState(prev => ({ ...prev, isListening: true, feedback: 'Listening...' }))
      speakFeedback('I\'m listening. What would you like to do?')
    }

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript
      setSpeechState(prev => ({ ...prev, transcript }))

      if (event.results[event.results.length - 1].isFinal) {
        setSpeechState(prev => ({ ...prev, isProcessing: true }))
        
        const command = processVoiceCommand(transcript)
        
        if (command) {
          setSpeechState(prev => ({ 
            ...prev, 
            lastCommand: command,
            isProcessing: false,
            feedback: `Processing: ${command.field}`
          }))

          if (command.command === 'field_update' && command.value) {
            onFieldUpdate(command.field, command.value)
            speakFeedback(`Updated ${command.field} to ${command.value}`)
          } else if (command.command === 'navigation') {
            if (command.field === 'next') {
              const nextButton = document.querySelector('button[type="button"]:contains("Next")') as HTMLButtonElement
              if (nextButton) {
                nextButton.click()
                speakFeedback('Moving to next step')
              }
            } else if (command.field === 'submit') {
              const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
              if (submitButton) {
                submitButton.click()
                speakFeedback('Submitting your booking request')
              }
            }
          }
        } else {
          setSpeechState(prev => ({ 
            ...prev, 
            isProcessing: false,
            feedback: 'Sorry, I didn\'t understand that command'
          }))
          speakFeedback('I didn\'t understand that. Try saying something like "my name is" or "pickup from"')
        }
      }
    }

    recognitionRef.current.onerror = () => {
      setSpeechState(prev => ({ 
        ...prev, 
        isListening: false, 
        isProcessing: false,
        feedback: 'Voice recognition error'
      }))
    }

    recognitionRef.current.onend = () => {
      setSpeechState(prev => ({ ...prev, isListening: false }))
      if (isEnabled) {
        // Restart listening if still enabled
        setTimeout(() => {
          if (recognitionRef.current && isEnabled) {
            recognitionRef.current.start()
          }
        }, 100)
      }
    }

    recognitionRef.current.start()
  }, [voiceSupported, isEnabled, processVoiceCommand, onFieldUpdate, speakFeedback])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setSpeechState(prev => ({ 
      ...prev, 
      isListening: false, 
      isProcessing: false,
      transcript: '',
      feedback: 'Voice commands disabled'
    }))
  }, [])

  const toggleVoiceInterface = () => {
    setIsEnabled(!isEnabled)
    if (!isEnabled) {
      startListening()
    } else {
      stopListening()
    }
  }

  const showHelp = () => {
    setHelpMode(!helpMode)
    if (!helpMode) {
      speakFeedback('Voice commands available. You can say things like: my name is John, email is john at company dot com, pickup from Heathrow Airport, or next step to continue.')
    }
  }

  if (!voiceSupported) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Voice Interface Button */}
      <div className="flex flex-col gap-2">
        <button
          onClick={toggleVoiceInterface}
          className={`p-4 rounded-full border-2 transition-all duration-300 ${
            isEnabled 
              ? 'bg-green-500 border-green-400 hover:bg-green-600' 
              : 'bg-gq-black border-gray-700 hover:border-gq-gold'
          }`}
          title={isEnabled ? 'Disable Voice Commands' : 'Enable Voice Commands'}
        >
          {speechState.isListening ? (
            <Mic className="w-6 h-6 text-white animate-pulse" />
          ) : isEnabled ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-gq-gold" />
          )}
        </button>

        {isEnabled && (
          <button
            onClick={showHelp}
            className="p-3 bg-gq-black border border-gray-700 rounded-full hover:border-gq-gold transition-colors"
            title="Voice Commands Help"
          >
            <MessageSquare className="w-4 h-4 text-gq-gold" />
          </button>
        )}
      </div>

      {/* Voice Status Panel */}
      {isEnabled && (
        <div className="absolute bottom-full left-0 mb-2 bg-gq-black border border-gray-700 rounded-lg p-4 w-80 shadow-xl">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-sm">Voice Assistant</h3>
            <div className="ml-auto flex items-center gap-1">
              {speechState.isProcessing && <Loader className="w-3 h-3 animate-spin" />}
              {speechState.isListening ? (
                <Volume2 className="w-4 h-4 text-green-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>

          {/* Current Status */}
          <div className="mb-3">
            <div className={`text-sm px-3 py-2 rounded ${
              speechState.isListening ? 'bg-green-500/20 text-green-400' :
              speechState.isProcessing ? 'bg-blue-500/20 text-blue-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {speechState.feedback || 'Voice assistant ready'}
            </div>
          </div>

          {/* Live Transcript */}
          {speechState.transcript && (
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-1">You said:</div>
              <div className="text-sm bg-gq-blue/20 p-2 rounded">
                "{speechState.transcript}"
              </div>
            </div>
          )}

          {/* Last Command */}
          {speechState.lastCommand && (
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-1">Last command:</div>
              <div className="text-sm text-gq-gold">
                {speechState.lastCommand.field}: {speechState.lastCommand.value || 'action'}
                <span className="text-xs text-gray-400 ml-2">
                  ({Math.round(speechState.lastCommand.confidence * 100)}% confidence)
                </span>
              </div>
            </div>
          )}

          {/* Help Section */}
          {helpMode && (
            <div className="pt-3 border-t border-gray-700">
              <h4 className="text-xs font-medium mb-2 text-gq-gold">Voice Commands:</h4>
              <div className="text-xs text-gray-400 space-y-1 max-h-32 overflow-y-auto">
                <div>• "My name is [name]"</div>
                <div>• "Email is [email]"</div>
                <div>• "Phone number is [number]"</div>
                <div>• "Pickup from [location]"</div>
                <div>• "Going to [destination]"</div>
                <div>• "I need [service type]"</div>
                <div>• "At [time]" or "Tomorrow"</div>
                <div>• "Next step" or "Submit"</div>
                <div>• "Special requirements [text]"</div>
              </div>
            </div>
          )}

          {/* Current Form Context */}
          <div className="pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Step {currentStep} • {Object.keys(formData).filter(key => formData[key]).length} fields completed
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}