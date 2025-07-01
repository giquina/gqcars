'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VoiceInputProps {
  onTranscript: (text: string) => void
  placeholder?: string
  className?: string
}

export default function VoiceInput({ onTranscript, placeholder = "Click microphone and speak...", className = "" }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if Speech Recognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ''
          let interimTranscript = ''

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }

          const fullTranscript = finalTranscript || interimTranscript
          setTranscript(fullTranscript)
          
          if (finalTranscript) {
            onTranscript(finalTranscript.trim())
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onTranscript])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className={`p-2 text-center text-gray-500 text-sm ${className}`}>
        <MicOff className="w-4 h-4 mx-auto mb-1" />
        Voice input not supported in this browser
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Voice Input Button */}
      <motion.button
        onClick={toggleListening}
        className={`relative p-3 rounded-full transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
            : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!isSupported}
      >
        {isListening ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
        
        {/* Listening Animation */}
        {isListening && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-red-300"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.button>

      {/* Live Transcript Display */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center gap-2 mb-2">
              <Volume2 className="w-4 h-4 text-blue-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">Listening...</span>
            </div>
            <div className="text-gray-600 text-sm min-h-[20px]">
              {transcript || placeholder}
            </div>
            
            {/* Audio Visualization */}
            <div className="flex items-center justify-center mt-2 gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-blue-500 rounded-full"
                  animate={{
                    height: isListening ? [4, 16, 4] : 4,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Indicator */}
      <div className="absolute -top-1 -right-1">
        <div className={`w-3 h-3 rounded-full ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-green-500'
        }`} />
      </div>
    </div>
  )
}

// Type declarations for Speech Recognition API
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}