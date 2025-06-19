'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Mic, MicOff, Eye, EyeOff, Type, Contrast } from 'lucide-react'

interface AccessibilitySettings {
  fontSize: 'normal' | 'large' | 'extra-large'
  highContrast: boolean
  voiceCommands: boolean
  screenReader: boolean
  keyboardNavigation: boolean
}

export default function AccessibilityHelper() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    highContrast: false,
    voiceCommands: false,
    screenReader: false,
    keyboardNavigation: true
  })
  
  const [showPanel, setShowPanel] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setVoiceSupported(true)
    }

    // Load saved settings
    const savedSettings = localStorage.getItem('gq_accessibility_settings')
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (error) {
        console.error('Error loading accessibility settings:', error)
      }
    }

    // Apply keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!settings.keyboardNavigation) return

      // Alt + A to open accessibility panel
      if (e.altKey && e.key === 'a') {
        e.preventDefault()
        setShowPanel(!showPanel)
      }

      // Alt + V for voice commands
      if (e.altKey && e.key === 'v') {
        e.preventDefault()
        toggleVoiceCommands()
      }

      // Tab navigation enhancement
      if (e.key === 'Tab') {
        const focusedElement = document.activeElement as HTMLElement
        if (focusedElement) {
          focusedElement.style.outline = '2px solid #EAB308'
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [settings.keyboardNavigation, showPanel])

  // Apply accessibility settings
  useEffect(() => {
    const root = document.documentElement

    // Font size
    switch (settings.fontSize) {
      case 'large':
        root.style.fontSize = '18px'
        break
      case 'extra-large':
        root.style.fontSize = '24px'
        break
      default:
        root.style.fontSize = '16px'
    }

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Save settings
    localStorage.setItem('gq_accessibility_settings', JSON.stringify(settings))
  }, [settings])

  const toggleVoiceCommands = () => {
    if (!voiceSupported) return

    if (!settings.voiceCommands) {
      startVoiceRecognition()
    } else {
      stopVoiceRecognition()
    }

    setSettings(prev => ({ ...prev, voiceCommands: !prev.voiceCommands }))
  }

  const startVoiceRecognition = () => {
    if (!voiceSupported) return

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
    recognitionRef.current = new SpeechRecognition()
    
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-GB'

    recognitionRef.current.onstart = () => {
      setIsListening(true)
    }

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase()
      
      // Voice commands
      if (transcript.includes('fill name')) {
        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement
        if (nameInput) nameInput.focus()
      }
      
      if (transcript.includes('fill email')) {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
        if (emailInput) emailInput.focus()
      }
      
      if (transcript.includes('next step') || transcript.includes('continue')) {
        const nextButton = document.querySelector('button[type="button"]:contains("Next")') as HTMLButtonElement
        if (nextButton) nextButton.click()
      }
      
      if (transcript.includes('submit form')) {
        const submitButton = document.querySelector('button[type="submit"]') as HTMLButtonElement
        if (submitButton) submitButton.click()
      }
    }

    recognitionRef.current.onerror = () => {
      setIsListening(false)
    }

    recognitionRef.current.onend = () => {
      setIsListening(false)
      if (settings.voiceCommands) {
        // Restart recognition if still enabled
        setTimeout(() => {
          if (recognitionRef.current) {
            recognitionRef.current.start()
          }
        }, 100)
      }
    }

    recognitionRef.current.start()
  }

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current = null
    }
    setIsListening(false)
  }

  const announceToScreenReader = (message: string) => {
    if (!settings.screenReader) return

    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.style.position = 'absolute'
    announcement.style.left = '-10000px'
    announcement.style.width = '1px'
    announcement.style.height = '1px'
    announcement.style.overflow = 'hidden'
    announcement.textContent = message

    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="fixed top-4 right-4 bg-gq-black border border-gray-700 p-3 rounded-full hover:border-gq-gold transition-colors z-50"
        title="Accessibility Options (Alt + A)"
        aria-label="Open accessibility settings"
      >
        <Eye className="w-5 h-5 text-gq-gold" />
      </button>

      {/* Voice Command Status */}
      {settings.voiceCommands && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs z-50 flex items-center gap-2">
          {isListening ? (
            <>
              <Mic className="w-3 h-3 animate-pulse" />
              Listening...
            </>
          ) : (
            <>
              <MicOff className="w-3 h-3" />
              Voice Ready
            </>
          )}
        </div>
      )}

      {/* Accessibility Panel */}
      {showPanel && (
        <div className="fixed top-4 right-20 bg-gq-black border border-gray-700 rounded-lg p-4 w-80 shadow-xl z-50">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-gq-gold" />
            <h3 className="font-bold text-sm">Accessibility Options</h3>
            <button
              onClick={() => setShowPanel(false)}
              className="ml-auto text-gray-400 hover:text-white"
              aria-label="Close accessibility panel"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Font Size</label>
              <div className="flex gap-2">
                {(['normal', 'large', 'extra-large'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setSettings(prev => ({ ...prev, fontSize: size }))}
                    className={`px-3 py-1 text-xs border rounded ${
                      settings.fontSize === size 
                        ? 'border-gq-gold bg-gq-gold/20' 
                        : 'border-gray-700 hover:border-gq-gold'
                    }`}
                  >
                    {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4" />
                <span className="text-sm">High Contrast</span>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }))}
                className={`w-10 h-6 rounded-full border transition-colors ${
                  settings.highContrast ? 'bg-gq-gold border-gq-gold' : 'bg-gray-700 border-gray-600'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.highContrast ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Voice Commands */}
            {voiceSupported && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.voiceCommands ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span className="text-sm">Voice Commands</span>
                </div>
                <button
                  onClick={toggleVoiceCommands}
                  className={`w-10 h-6 rounded-full border transition-colors ${
                    settings.voiceCommands ? 'bg-gq-gold border-gq-gold' : 'bg-gray-700 border-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.voiceCommands ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            )}

            {/* Screen Reader */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {settings.screenReader ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-sm">Screen Reader</span>
              </div>
              <button
                onClick={() => setSettings(prev => ({ ...prev, screenReader: !prev.screenReader }))}
                className={`w-10 h-6 rounded-full border transition-colors ${
                  settings.screenReader ? 'bg-gq-gold border-gq-gold' : 'bg-gray-700 border-gray-600'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.screenReader ? 'translate-x-5' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="pt-2 border-t border-gray-700">
              <h4 className="text-xs font-medium mb-2">Keyboard Shortcuts</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div>Alt + A: Toggle this panel</div>
                <div>Alt + V: Toggle voice commands</div>
                <div>Tab: Navigate form fields</div>
                <div>Space: Select checkboxes</div>
                <div>Enter: Submit or continue</div>
              </div>
            </div>

            {/* Voice Commands Help */}
            {settings.voiceCommands && (
              <div className="pt-2 border-t border-gray-700">
                <h4 className="text-xs font-medium mb-2">Voice Commands</h4>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>"Fill name" - Focus name field</div>
                  <div>"Fill email" - Focus email field</div>
                  <div>"Next step" - Continue to next step</div>
                  <div>"Submit form" - Submit the form</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* High Contrast Styles */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%) brightness(1.2);
        }
        .high-contrast input,
        .high-contrast select,
        .high-contrast textarea {
          border: 2px solid #ffffff !important;
          background: #000000 !important;
          color: #ffffff !important;
        }
        .high-contrast button {
          border: 2px solid #ffffff !important;
          background: #000000 !important;
          color: #ffffff !important;
        }
        .high-contrast button:hover {
          background: #333333 !important;
        }
      `}</style>
    </>
  )
}

declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}