'use client'

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

// Web Speech API interfaces
interface SpeechRecognitionResult {
  transcript: string
  confidence: number
  isFinal: boolean
}

interface VoiceSettings {
  language: string
  voiceSpeed: number
  voicePitch: number
  voiceVolume: number
  autoSpeak: boolean
  backgroundNoise: boolean
  emergencyMode: boolean
}

interface VoiceContextType {
  // Speech Recognition
  isListening: boolean
  transcript: string
  confidence: number
  isSupported: boolean
  startListening: () => void
  stopListening: () => void
  
  // Text-to-Speech
  speak: (text: string, options?: Partial<SpeechSynthesisUtterance>) => void
  stopSpeaking: () => void
  isSpeaking: boolean
  
  // Voice Commands
  lastCommand: string
  processCommand: (command: string) => void
  
  // Settings
  settings: VoiceSettings
  updateSettings: (newSettings: Partial<VoiceSettings>) => void
  
  // Emergency
  triggerEmergency: () => void
  isEmergencyActive: boolean
  
  // Multilingual support
  availableLanguages: string[]
  switchLanguage: (lang: string) => void
}

const defaultSettings: VoiceSettings = {
  language: 'en-GB',
  voiceSpeed: 1.0,
  voicePitch: 1.0,
  voiceVolume: 1.0,
  autoSpeak: true,
  backgroundNoise: false,
  emergencyMode: false
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined)

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [confidence, setConfidence] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [lastCommand, setLastCommand] = useState('')
  const [settings, setSettings] = useState<VoiceSettings>(defaultSettings)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)

  const availableLanguages = [
    'en-GB', 'en-US', 'fr-FR', 'de-DE', 'es-ES', 'it-IT', 'pt-PT', 'ru-RU', 'zh-CN', 'ja-JP', 'ar-SA'
  ]

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for speech recognition support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = settings.language

        recognition.onstart = () => setIsListening(true)
        recognition.onend = () => setIsListening(false)
        
        recognition.onresult = (event: any) => {
          let finalTranscript = ''
          let interimTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            if (result.isFinal) {
              finalTranscript += result[0].transcript
              setConfidence(result[0].confidence)
            } else {
              interimTranscript += result[0].transcript
            }
          }
          
          if (finalTranscript) {
            setTranscript(finalTranscript)
            processCommand(finalTranscript)
          } else {
            setTranscript(interimTranscript)
          }
        }

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        setRecognition(recognition)
        setIsSupported(true)
      }

      // Initialize speech synthesis
      if (window.speechSynthesis) {
        setSynthesis(window.speechSynthesis)
      }
    }
  }, [settings.language])

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      recognition.start()
    }
  }, [recognition, isListening])

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop()
    }
  }, [recognition, isListening])

  const speak = useCallback((text: string, options?: Partial<SpeechSynthesisUtterance>) => {
    if (synthesis && settings.autoSpeak) {
      // Stop any current speech
      synthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = settings.language
      utterance.rate = settings.voiceSpeed
      utterance.pitch = settings.voicePitch
      utterance.volume = settings.voiceVolume
      
      // Apply custom options
      if (options) {
        Object.assign(utterance, options)
      }
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      synthesis.speak(utterance)
    }
  }, [synthesis, settings])

  const stopSpeaking = useCallback(() => {
    if (synthesis) {
      synthesis.cancel()
      setIsSpeaking(false)
    }
  }, [synthesis])

  const processCommand = useCallback((command: string) => {
    setLastCommand(command.toLowerCase().trim())
    
    // Emergency keywords detection
    const emergencyKeywords = ['emergency', 'help', 'urgent', 'panic', 'danger', 'threat']
    if (emergencyKeywords.some(keyword => command.toLowerCase().includes(keyword))) {
      triggerEmergency()
    }
  }, [])

  const triggerEmergency = useCallback(() => {
    setIsEmergencyActive(true)
    speak("Emergency protocol activated. Connecting you to GQ Cars emergency dispatch immediately.", {
      rate: 1.2,
      pitch: 1.1
    })
    
    // In a real implementation, this would trigger actual emergency protocols
    setTimeout(() => {
      setIsEmergencyActive(false)
    }, 30000) // Reset after 30 seconds
  }, [speak])

  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const switchLanguage = useCallback((lang: string) => {
    updateSettings({ language: lang })
    if (recognition) {
      recognition.lang = lang
    }
  }, [recognition, updateSettings])

  const contextValue: VoiceContextType = {
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
    processCommand,
    settings,
    updateSettings,
    triggerEmergency,
    isEmergencyActive,
    availableLanguages,
    switchLanguage
  }

  return (
    <VoiceContext.Provider value={contextValue}>
      {children}
    </VoiceContext.Provider>
  )
}

export function useVoice() {
  const context = useContext(VoiceContext)
  if (!context) {
    throw new Error('useVoice must be used within a VoiceProvider')
  }
  return context
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}