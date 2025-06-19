'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Phone, 
  Clock, 
  Shield, 
  Globe,
  Minimize2,
  Maximize2,
  RotateCcw,
  AlertCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// Types for the AI assistant
interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
  intent?: string
  confidence?: number
  suggestedActions?: string[]
}

interface ConversationAnalytics {
  sessionId: string
  startTime: Date
  messageCount: number
  intents: string[]
  escalatedToHuman: boolean
  language: string
}

// Supported languages
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

export default function AIAssistantWidget() {
  // Core state
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  
  // Voice features
  const [isListening, setIsListening] = useState(false)
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true)
  const [speechRecognition, setSpeechRecognition] = useState<any>(null)
  
  // UI state
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'connecting'>('online')
  
  // Analytics
  const [analytics, setAnalytics] = useState<ConversationAnalytics>({
    sessionId: `session_${Date.now()}`,
    startTime: new Date(),
    messageCount: 0,
    intents: [],
    escalatedToHuman: false,
    language: 'en'
  })

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = currentLanguage === 'en' ? 'en-GB' : currentLanguage

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInputMessage(transcript)
          setIsListening(false)
        }

        recognition.onerror = () => {
          setIsListening(false)
        }

        setSpeechRecognition(recognition)
      }

      // Initialize speech synthesis
      if (window.speechSynthesis) {
        synthRef.current = window.speechSynthesis
      }
    }
  }, [currentLanguage])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: `msg_${Date.now()}`,
        content: `👋 Hello! I'm your GQ Cars AI assistant. I'm here to help you with:\n\n🚗 Booking security taxi services\n🛡️ Information about our SIA licensed drivers\n💰 Getting quotes for protection services\n🏢 Executive and close protection\n✈️ Airport transfers\n\nHow can I assist you today?`,
        role: 'assistant',
        timestamp: new Date(),
        suggestedActions: ['Get Quote', 'Book Now', 'View Services', 'Call: 07407 655 203']
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  // Handle voice input
  const toggleListening = useCallback(() => {
    if (!speechRecognition) {
      alert('Speech recognition not supported in your browser')
      return
    }

    if (isListening) {
      speechRecognition.stop()
      setIsListening(false)
    } else {
      speechRecognition.start()
      setIsListening(true)
    }
  }, [speechRecognition, isListening])

  // Handle text-to-speech
  const speakMessage = useCallback((text: string) => {
    if (!isSpeechEnabled || !synthRef.current) return

    // Cancel any ongoing speech
    synthRef.current.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = currentLanguage === 'en' ? 'en-GB' : currentLanguage
    utterance.rate = 0.9
    utterance.pitch = 1
    
    synthRef.current.speak(utterance)
  }, [isSpeechEnabled, currentLanguage])

  // Send message to AI
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsTyping(true)
    setConnectionStatus('connecting')

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          language: currentLanguage
        })
      })

      setConnectionStatus('online')

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: `msg_${Date.now()}`,
        content: data.response,
        role: 'assistant',
        timestamp: new Date(),
        intent: data.intent,
        confidence: data.confidence,
        suggestedActions: data.suggestedActions
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        messageCount: prev.messageCount + 1,
        intents: [...prev.intents, data.intent].filter((v, i, a) => a.indexOf(v) === i)
      }))

      // Speak the response if enabled
      if (isSpeechEnabled) {
        speakMessage(data.response)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      setConnectionStatus('offline')
      
      const errorMessage: Message = {
        id: `msg_${Date.now()}`,
        content: `I apologize, but I'm having trouble connecting right now. For immediate assistance, please call us at 07407 655 203. Our security taxi services are available 24/7.`,
        role: 'assistant',
        timestamp: new Date(),
        suggestedActions: ['Call Now: 07407 655 203', 'Try Again', 'Get Emergency Help']
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  // Handle suggested action clicks
  const handleSuggestedAction = (action: string) => {
    if (action.includes('Call Now') || action.includes('07407 655 203')) {
      window.open('tel:+447407655203', '_self')
    } else if (action.includes('WhatsApp')) {
      window.open('https://wa.me/447407655203?text=Hello! I need help with your security services.', '_blank')
    } else if (action === 'Try Again') {
      sendMessage()
    } else if (action === 'Get Emergency Help') {
      setAnalytics(prev => ({ ...prev, escalatedToHuman: true }))
      window.open('tel:+447407655203', '_self')
    } else {
      setInputMessage(action)
      inputRef.current?.focus()
    }
  }

  // Clear conversation
  const clearConversation = () => {
    setMessages([])
    setAnalytics({
      sessionId: `session_${Date.now()}`,
      startTime: new Date(),
      messageCount: 0,
      intents: [],
      escalatedToHuman: false,
      language: currentLanguage
    })
  }

  // Escalate to human
  const escalateToHuman = () => {
    setAnalytics(prev => ({ ...prev, escalatedToHuman: true }))
    const escalationMessage: Message = {
      id: `msg_${Date.now()}`,
      content: `I'm connecting you with our human support team. Please call 07407 655 203 for immediate assistance, or continue chatting here while someone becomes available.`,
      role: 'assistant',
      timestamp: new Date(),
      suggestedActions: ['Call Now: 07407 655 203', 'WhatsApp Support', 'Continue Waiting']
    }
    setMessages(prev => [...prev, escalationMessage])
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <>
      {/* AI Assistant Floating Button */}
      <motion.div 
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 relative"
        >
          <Bot className="w-6 h-6" />
          {connectionStatus === 'offline' && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
          {messages.length > 0 && !isOpen && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {messages.filter(m => m.role === 'assistant').length}
            </span>
          )}
        </button>
      </motion.div>

      {/* AI Assistant Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-24 left-6 ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'} bg-white rounded-lg shadow-2xl border-2 border-yellow-500 z-50 flex flex-col`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-800 p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">GQ Cars AI Assistant</h3>
                  <div className="flex items-center space-x-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                    <span>{connectionStatus === 'online' ? 'Online' : connectionStatus === 'connecting' ? 'Connecting...' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                    className="p-2 hover:bg-yellow-700 rounded-lg transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </button>
                  {showLanguageSelector && (
                    <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 min-w-40">
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLanguage(lang.code)
                            setShowLanguageSelector(false)
                          }}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 ${currentLanguage === lang.code ? 'bg-yellow-100' : ''}`}
                        >
                          <span>{lang.flag}</span>
                          <span className="text-gray-800">{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Voice Toggle */}
                <button
                  onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                  className="p-2 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                  {isSpeechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Minimize/Maximize */}
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>

                {/* Close */}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Header Controls */}
                <div className="p-3 border-b bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{Math.floor((Date.now() - analytics.startTime.getTime()) / 60000)}m</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      <span>{analytics.messageCount}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={clearConversation}
                      className="p-1 hover:bg-gray-200 rounded text-gray-500"
                      title="Clear conversation"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                    <button
                      onClick={escalateToHuman}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      <span className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Human Agent</span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-yellow-500 text-gray-800 ml-8' 
                          : 'bg-gray-100 text-gray-800 mr-8'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {message.role === 'assistant' && (
                            <Bot className="w-4 h-4 mt-1 text-gray-600 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                              <span>{formatTime(message.timestamp)}</span>
                              {message.confidence && (
                                <span>Confidence: {Math.round(message.confidence * 100)}%</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Suggested Actions */}
                        {message.suggestedActions && message.suggestedActions.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.suggestedActions.map((action, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestedAction(action)}
                                className="px-3 py-1 text-xs bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full border transition-all"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 rounded-lg p-3 mr-8">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-gray-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask about our security taxi services..."
                        className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 text-gray-800"
                        disabled={isLoading}
                      />
                      {connectionStatus === 'offline' && (
                        <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                      )}
                    </div>
                    
                    {/* Voice Input Button */}
                    <button
                      onClick={toggleListening}
                      className={`p-3 rounded-lg transition-all ${
                        isListening 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                      }`}
                      disabled={!speechRecognition}
                    >
                      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    
                    {/* Send Button */}
                    <button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-gray-800 p-3 rounded-lg transition-all"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Emergency Contact */}
                  <div className="mt-3 flex items-center justify-center">
                    <button
                      onClick={() => window.open('tel:+447407655203', '_self')}
                      className="flex items-center space-x-2 text-sm text-gray-600 hover:text-yellow-600 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Emergency: 07407 655 203</span>
                      <Shield className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}