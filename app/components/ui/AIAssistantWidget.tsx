'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Mic, MicOff, X, Send, Bot, User, Zap, Star, Shield, Car } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIAssistantWidgetProps {
  className?: string
}

const quickActions = [
  { icon: Car, label: 'Book Ride', action: 'book_ride' },
  { icon: Shield, label: 'Security Quote', action: 'security_quote' },
  { icon: Star, label: 'Check Status', action: 'check_status' },
  { icon: Zap, label: 'Emergency', action: 'emergency' },
]

export default function AIAssistantWidget({ className = '' }: AIAssistantWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hello! I'm your GQ Security AI Assistant. How can I help you today?",
      timestamp: new Date(),
      suggestions: ['Book a ride', 'Get a security quote', 'Check my bookings', 'Emergency support']
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock AI responses
  const aiResponses: { [key: string]: string } = {
    'book': "I'd be happy to help you book a ride! 🚗 What type of service do you need? We offer:\n• Private Hire\n• Airport Transfer\n• Corporate Transport\n• VIP Protection\n\nJust let me know your preference!",
    'security': "For security services, I can help you with: 🛡️\n• Close Protection\n• Corporate Security\n• Event Security\n• Family Protection\n\nWhat type of security service are you looking for?",
    'quote': "I'll help you get a personalized quote! 💰 To provide accurate pricing, I need:\n• Service type\n• Date and time\n• Duration\n• Location\n\nWould you like me to walk you through this?",
    'emergency': "🚨 For immediate emergency assistance, please call our 24/7 hotline: **07407 655 203**\n\nIf this is a life-threatening emergency, please call 999 immediately.",
    'status': "I can help you check your booking status! 📋 Would you like me to:\n• Show recent bookings\n• Check specific booking\n• View payment status\n• Track your ride",
    'hello': "Hello! 👋 I'm here to help with all your security and transport needs. What can I assist you with today?",
    'help': "I can help you with: ℹ️\n• Booking rides and security services\n• Getting quotes and pricing\n• Checking booking status\n• Emergency support\n• General questions\n\nWhat would you like to know?",
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateAIResponse(inputText)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const generateAIResponse = (input: string): { content: string; suggestions?: string[] } => {
    const lowerInput = input.toLowerCase()
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerInput.includes(key)) {
        return {
          content: response,
          suggestions: getSuggestions(key)
        }
      }
    }

    // Default intelligent response
    return {
      content: "I understand you're looking for assistance! 🤖 Let me connect you with the right information. Could you tell me more about what you need help with?",
      suggestions: ['Book a service', 'Get pricing', 'Check status', 'Emergency help']
    }
  }

  const getSuggestions = (key: string): string[] => {
    const suggestionMap: { [key: string]: string[] } = {
      'book': ['Private Hire', 'Airport Transfer', 'Corporate Transport', 'Security Service'],
      'security': ['Close Protection', 'Event Security', 'Corporate Security', 'Family Protection'],
      'quote': ['Get Instant Quote', 'Compare Prices', 'View Packages', 'Custom Quote'],
      'status': ['Recent Bookings', 'Track Ride', 'Payment Status', 'Driver Info'],
    }
    return suggestionMap[key] || []
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion)
    handleSendMessage()
  }

  const handleQuickAction = (action: string) => {
    const actionMap: { [key: string]: string } = {
      'book_ride': 'I want to book a ride',
      'security_quote': 'I need a security quote',
      'check_status': 'Check my booking status',
      'emergency': 'Emergency assistance needed',
    }
    
    setInputText(actionMap[action] || action)
    handleSendMessage()
  }

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-GB'

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    }
  }

  return (
    <>
      {/* AI Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`${className} fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-full p-4 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          boxShadow: isOpen ? 'none' : '0 0 20px rgba(59, 130, 246, 0.4)' 
        }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900 border border-gray-700 rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-amber-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">GQ AI Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex-1 flex flex-col items-center gap-1 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <action.icon className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-gray-300">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white' 
                      : 'bg-gray-800 text-gray-200'
                  } rounded-lg p-3`}>
                    <div className="flex items-center gap-2 mb-2">
                      {message.type === 'assistant' ? (
                        <Bot className="w-4 h-4 text-amber-400" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 rounded px-2 py-1 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-amber-400" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-amber-500 outline-none"
                  />
                </div>
                <button
                  onClick={startListening}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}