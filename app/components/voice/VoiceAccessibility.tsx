'use client'

import React, { useState, useEffect } from 'react'
import { useVoice } from './VoiceProvider'
import { Eye, EyeOff, Volume2, VolumeX, Accessibility, Keyboard, MousePointer } from 'lucide-react'

interface AccessibilityFeatures {
  screenReader: boolean
  voiceNavigation: boolean
  highContrast: boolean
  largeText: boolean
  slowSpeech: boolean
  keyboardOnly: boolean
  skipAnimation: boolean
  emergencyVoice: boolean
}

export default function VoiceAccessibility() {
  const { speak, lastCommand, settings, updateSettings, isListening, startListening } = useVoice()
  const [features, setFeatures] = useState<AccessibilityFeatures>({
    screenReader: false,
    voiceNavigation: false,
    highContrast: false,
    largeText: false,
    slowSpeech: false,
    keyboardOnly: false,
    skipAnimation: false,
    emergencyVoice: true
  })
  const [isActive, setIsActive] = useState(false)
  const [currentElement, setCurrentElement] = useState<HTMLElement | null>(null)

  // Voice navigation commands
  useEffect(() => {
    if (features.voiceNavigation && lastCommand && lastCommand.length > 0) {
      handleVoiceNavigation(lastCommand)
    }
  }, [lastCommand, features.voiceNavigation])

  // Auto-announce page elements
  useEffect(() => {
    if (features.screenReader) {
      announcePageContent()
    }
  }, [features.screenReader])

  const handleVoiceNavigation = (command: string) => {
    const cmd = command.toLowerCase()

    // Navigation commands
    if (cmd.includes('go to') || cmd.includes('navigate')) {
      handleNavigationCommand(cmd)
    }
    // Reading commands
    else if (cmd.includes('read') || cmd.includes('describe')) {
      handleReadCommand(cmd)
    }
    // Form interaction commands
    else if (cmd.includes('fill') || cmd.includes('enter')) {
      handleFormCommand(cmd)
    }
    // Button activation commands
    else if (cmd.includes('click') || cmd.includes('press') || cmd.includes('activate')) {
      handleButtonCommand(cmd)
    }
    // Accessibility controls
    else if (cmd.includes('help') || cmd.includes('assistance')) {
      provideVoiceHelp()
    }
  }

  const handleNavigationCommand = (command: string) => {
    if (command.includes('booking') || command.includes('book')) {
      speak("Navigating to booking section. You can start a voice booking by saying 'start voice booking'.")
      scrollToSection('booking')
    } else if (command.includes('services')) {
      speak("Navigating to services section. Here you can explore our security taxi, close protection, and VIP services.")
      scrollToSection('services')
    } else if (command.includes('contact')) {
      speak("Navigating to contact section. You can call us at 07407 655 203 or use the contact form.")
      scrollToSection('contact')
    } else if (command.includes('top') || command.includes('header')) {
      speak("Going to top of page.")
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (command.includes('bottom') || command.includes('footer')) {
      speak("Going to bottom of page.")
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    }
  }

  const handleReadCommand = (command: string) => {
    if (command.includes('page') || command.includes('content')) {
      announcePageContent()
    } else if (command.includes('heading') || command.includes('title')) {
      readHeadings()
    } else if (command.includes('links')) {
      readLinks()
    } else if (command.includes('buttons')) {
      readButtons()
    } else if (command.includes('current') || command.includes('focused')) {
      readCurrentElement()
    }
  }

  const handleFormCommand = (command: string) => {
    // Extract form field and value from command
    const fieldMatch = command.match(/fill (.*?) with (.*)/i) || command.match(/enter (.*?) in (.*)/i)
    if (fieldMatch) {
      const [, value, field] = fieldMatch
      fillFormField(field, value)
    } else {
      speak("Please specify which field to fill and what value to enter. For example, say 'fill pickup with Heathrow Airport'.")
    }
  }

  const handleButtonCommand = (command: string) => {
    const buttonNames = ['book', 'quote', 'call', 'submit', 'send', 'schedule']
    const foundButton = buttonNames.find(name => command.includes(name))
    
    if (foundButton) {
      const button = document.querySelector(`button[aria-label*="${foundButton}"], button:contains("${foundButton}")`) as HTMLButtonElement
      if (button) {
        speak(`Activating ${foundButton} button.`)
        button.click()
      } else {
        speak(`Could not find ${foundButton} button. Available buttons are: ${getAvailableButtons().join(', ')}`)
      }
    }
  }

  const announcePageContent = () => {
    const mainContent = document.querySelector('main')
    const headings = document.querySelectorAll('h1, h2, h3')
    const buttons = document.querySelectorAll('button')
    const links = document.querySelectorAll('a')

    speak(`GQ Cars page loaded. This page has ${headings.length} headings, ${buttons.length} buttons, and ${links.length} links. Say 'read headings' to hear all headings, or 'voice help' for navigation assistance.`)
  }

  const readHeadings = () => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    const headingTexts = headings.map((h, index) => `${h.tagName.toLowerCase()}: ${h.textContent?.trim()}`).slice(0, 5)
    
    if (headingTexts.length > 0) {
      speak(`Page headings: ${headingTexts.join('. ')}`)
    } else {
      speak("No headings found on this page.")
    }
  }

  const readLinks = () => {
    const links = Array.from(document.querySelectorAll('a')).slice(0, 5)
    const linkTexts = links.map(link => link.textContent?.trim()).filter(text => text && text.length > 0)
    
    if (linkTexts.length > 0) {
      speak(`Available links: ${linkTexts.join(', ')}`)
    } else {
      speak("No links found on this page.")
    }
  }

  const readButtons = () => {
    const buttons = getAvailableButtons()
    if (buttons.length > 0) {
      speak(`Available buttons: ${buttons.join(', ')}`)
    } else {
      speak("No buttons found on this page.")
    }
  }

  const readCurrentElement = () => {
    const focused = document.activeElement
    if (focused && focused.tagName !== 'BODY') {
      const text = focused.textContent?.trim() || focused.getAttribute('aria-label') || focused.getAttribute('placeholder') || 'unnamed element'
      speak(`Currently focused on ${focused.tagName.toLowerCase()}: ${text}`)
    } else {
      speak("No element is currently focused.")
    }
  }

  const getAvailableButtons = (): string[] => {
    const buttons = Array.from(document.querySelectorAll('button'))
    return buttons.map(btn => 
      btn.textContent?.trim() || 
      btn.getAttribute('aria-label') || 
      'unnamed button'
    ).filter(text => text && text !== 'unnamed button').slice(0, 8)
  }

  const fillFormField = (fieldName: string, value: string) => {
    const field = findFormField(fieldName)
    if (field) {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.value = value
        field.dispatchEvent(new Event('input', { bubbles: true }))
        speak(`Filled ${fieldName} with ${value}`)
      } else if (field instanceof HTMLSelectElement) {
        const option = Array.from(field.options).find(opt => 
          opt.text.toLowerCase().includes(value.toLowerCase())
        )
        if (option) {
          field.value = option.value
          field.dispatchEvent(new Event('change', { bubbles: true }))
          speak(`Selected ${option.text} for ${fieldName}`)
        } else {
          speak(`Could not find option ${value} in ${fieldName}`)
        }
      }
    } else {
      speak(`Could not find field ${fieldName}`)
    }
  }

  const findFormField = (fieldName: string): HTMLElement | null => {
    // Try multiple ways to find the field
    const selectors = [
      `input[name*="${fieldName}"]`,
      `input[placeholder*="${fieldName}"]`,
      `textarea[name*="${fieldName}"]`,
      `select[name*="${fieldName}"]`,
      `input[aria-label*="${fieldName}"]`
    ]

    for (const selector of selectors) {
      const element = document.querySelector(selector)
      if (element) return element as HTMLElement
    }

    return null
  }

  const scrollToSection = (sectionName: string) => {
    const section = document.querySelector(`#${sectionName}`) || 
                   document.querySelector(`[data-section="${sectionName}"]`) ||
                   document.querySelector(`section[aria-label*="${sectionName}"]`)
    
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const provideVoiceHelp = () => {
    const helpText = `
      Voice navigation help:
      - Say "go to booking" to navigate to booking section
      - Say "read headings" to hear page headings
      - Say "read buttons" to hear available buttons
      - Say "click book now" to activate booking
      - Say "fill pickup with your location" to fill form fields
      - Say "emergency help" for emergency assistance
      - Say "call GQ Cars" to make a phone call
    `
    speak(helpText)
  }

  const toggleFeature = (feature: keyof AccessibilityFeatures) => {
    setFeatures(prev => {
      const newFeatures = { ...prev, [feature]: !prev[feature] }
      
      // Apply feature changes
      if (feature === 'slowSpeech') {
        updateSettings({ voiceSpeed: newFeatures.slowSpeech ? 0.7 : 1.0 })
      } else if (feature === 'highContrast') {
        document.body.classList.toggle('high-contrast', newFeatures.highContrast)
      } else if (feature === 'largeText') {
        document.body.classList.toggle('large-text', newFeatures.largeText)
      } else if (feature === 'skipAnimation') {
        document.body.classList.toggle('reduce-motion', newFeatures.skipAnimation)
      }
      
      return newFeatures
    })
    
    speak(`${feature.replace(/([A-Z])/g, ' $1').toLowerCase()} ${features[feature] ? 'disabled' : 'enabled'}`)
  }

  const startVoiceAccessibility = () => {
    setIsActive(true)
    setFeatures(prev => ({ ...prev, voiceNavigation: true, screenReader: true }))
    speak("Voice accessibility mode activated. Say 'voice help' for navigation commands, or use voice commands to navigate the page.")
    if (!isListening) {
      startListening()
    }
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      {/* Accessibility Toggle Button */}
      <button
        onClick={startVoiceAccessibility}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg shadow-lg flex items-center gap-2 mb-2"
        aria-label="Enable voice accessibility features"
      >
        <Accessibility className="w-5 h-5" />
        <span className="text-sm font-medium">Voice Accessibility</span>
      </button>

      {/* Accessibility Panel */}
      {isActive && (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 w-72 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Accessibility Features</h3>
            <button
              onClick={() => setIsActive(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close accessibility panel"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {/* Screen Reader */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm">Screen Reader</span>
              </div>
              <button
                onClick={() => toggleFeature('screenReader')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  features.screenReader ? 'bg-blue-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  features.screenReader ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Voice Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-green-400" />
                <span className="text-white text-sm">Voice Navigation</span>
              </div>
              <button
                onClick={() => toggleFeature('voiceNavigation')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  features.voiceNavigation ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  features.voiceNavigation ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Slow Speech */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <VolumeX className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm">Slow Speech</span>
              </div>
              <button
                onClick={() => toggleFeature('slowSpeech')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  features.slowSpeech ? 'bg-yellow-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  features.slowSpeech ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-purple-400" />
                <span className="text-white text-sm">High Contrast</span>
              </div>
              <button
                onClick={() => toggleFeature('highContrast')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  features.highContrast ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  features.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Keyboard Only */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-indigo-400" />
                <span className="text-white text-sm">Keyboard Only</span>
              </div>
              <button
                onClick={() => toggleFeature('keyboardOnly')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  features.keyboardOnly ? 'bg-indigo-600' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  features.keyboardOnly ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-4 border-t border-gray-600">
            <button
              onClick={provideVoiceHelp}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm"
            >
              Get Voice Help
            </button>
          </div>
        </div>
      )}

      {/* Hidden accessibility styles */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(2) brightness(1.2);
        }
        .large-text {
          font-size: 1.2em !important;
        }
        .large-text * {
          font-size: inherit !important;
        }
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
    </div>
  )
}