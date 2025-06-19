"use client"

import { useState, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Phone, Car, Calculator, Clock } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  actions?: Array<{
    label: string
    action: string
    data?: any
  }>
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "👋 Hello! I'm your GQ Cars AI Assistant. I can help you with instant quotes, bookings, and security transport advice. How can I assist you today?",
      timestamp: new Date(),
      actions: [
        { label: "Get Instant Quote", action: "quote" },
        { label: "Book Now", action: "book" },
        { label: "Check Availability", action: "availability" },
        { label: "Security Info", action: "security" }
      ]
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (message: string) => {
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(async () => {
      const aiResponse = await getAIResponse(message)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI logic - in production, this would call your AI API
    const message = userMessage.toLowerCase()
    
    if (message.includes('quote') || message.includes('price') || message.includes('cost')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "I'd be happy to give you an instant quote! I need a few details:",
        timestamp: new Date(),
        actions: [
          { label: "Heathrow to City", action: "quote_airport", data: { from: "Heathrow", to: "City" } },
          { label: "Custom Route", action: "quote_custom" },
          { label: "Regular Taxi", action: "quote_standard" },
          { label: "Executive Car", action: "quote_executive" }
        ]
      }
    }
    
    if (message.includes('book') || message.includes('booking')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "Perfect! Let me help you book a security taxi. What type of service do you need?",
        timestamp: new Date(),
        actions: [
          { label: "Standard Security Taxi", action: "book_standard" },
          { label: "Executive Protection", action: "book_executive" },
          { label: "Close Protection Team", action: "book_protection" },
          { label: "Airport Transfer", action: "book_airport" }
        ]
      }
    }
    
    if (message.includes('security') || message.includes('sia') || message.includes('protection')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "All our drivers are SIA Licensed Close Protection Officers with advanced security training. We provide:",
        timestamp: new Date(),
        actions: [
          { label: "View Certifications", action: "certifications" },
          { label: "Security Levels", action: "security_levels" },
          { label: "Training Details", action: "training" },
          { label: "Call Security Team", action: "call", data: { number: "07407655203" } }
        ]
      }
    }
    
    if (message.includes('available') || message.includes('availability')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: "We're available 24/7! Our AI shows current availability in your area. When do you need transport?",
        timestamp: new Date(),
        actions: [
          { label: "Right Now", action: "availability_now" },
          { label: "Next Hour", action: "availability_hour" },
          { label: "Tomorrow", action: "availability_tomorrow" },
          { label: "Schedule Later", action: "schedule" }
        ]
      }
    }
    
    // Default response with smart suggestions
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: "I understand you're asking about '" + userMessage + "'. Let me connect you with the best option:",
      timestamp: new Date(),
      actions: [
        { label: "Speak to Human", action: "human" },
        { label: "Call Now", action: "call", data: { number: "07407655203" } },
        { label: "WhatsApp", action: "whatsapp" },
        { label: "Get Quote", action: "quote" }
      ]
    }
  }

  const handleAction = (action: string, data?: any) => {
    switch (action) {
      case 'quote':
        sendMessage("I need a quote for transport")
        break
      case 'book':
        sendMessage("I want to book a taxi")
        break
      case 'availability':
        sendMessage("Check availability")
        break
      case 'security':
        sendMessage("Tell me about security features")
        break
      case 'call':
        window.location.href = `tel:${data?.number || '07407655203'}`
        break
      case 'whatsapp':
        window.open('https://wa.me/447407655203?text=Hello%20GQ%20Cars!%20I%27m%20interested%20in%20your%20services.', '_blank')
        break
      case 'quote_airport':
        sendMessage(`Quote from ${data.from} to ${data.to}`)
        break
      default:
        sendMessage(`I selected: ${action}`)
    }
  }

  return (
    <>
      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 group"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            {/* AI indicator */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </button>
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[90vw] bg-white rounded-xl shadow-2xl border z-50 max-h-[70vh] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">GQ Cars AI Assistant</h3>
                <p className="text-xs opacity-90">Powered by Advanced AI • Always Available</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg' 
                    : 'bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg'
                } p-3`}>
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && <Bot className="w-4 h-4 mt-1 text-blue-600" />}
                    {message.type === 'user' && <User className="w-4 h-4 mt-1" />}
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  {message.actions && (
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {message.actions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => handleAction(action.action, action.data)}
                          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors border border-white/20"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-r-lg rounded-tl-lg p-3 flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                placeholder="Ask about quotes, bookings, security..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => sendMessage(inputMessage)}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2 mt-2 text-xs">
              <button 
                onClick={() => handleAction('call')}
                className="flex items-center space-x-1 bg-yellow-500 text-black px-2 py-1 rounded"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </button>
              <button 
                onClick={() => handleAction('quote')}
                className="flex items-center space-x-1 bg-green-600 text-white px-2 py-1 rounded"
              >
                <Calculator className="w-3 h-3" />
                <span>Quote</span>
              </button>
              <button 
                onClick={() => handleAction('book')}
                className="flex items-center space-x-1 bg-blue-600 text-white px-2 py-1 rounded"
              >
                <Car className="w-3 h-3" />
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
