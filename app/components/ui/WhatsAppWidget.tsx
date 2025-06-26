"use client"

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Phone, MapPin, Clock, Shield, Star, Users, Zap } from 'lucide-react'
import WhatsAppConfig from './WhatsAppConfig'

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: Array<{
    id: string
    text: string
    action: string
    data?: any
  }>
}

interface LiveActivity {
  id: string
  message: string
  timestamp: Date
  type: 'booking' | 'review' | 'inquiry'
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([])
  const [currentActivity, setCurrentActivity] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-show widget
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => {
        if (!isOpen) {
          setIsOpen(true)
          initializeChat()
        }
      }, WhatsAppConfig.animations.autoOpenDelay)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Live activities
  useEffect(() => {
    const generateActivities = () => {
      const activities = WhatsAppConfig.liveActivities.map((message, index) => ({
        id: `activity-${index}`,
        message,
        timestamp: new Date(Date.now() - Math.random() * 3600000),
        type: index % 3 === 0 ? 'booking' : index % 3 === 1 ? 'review' : 'inquiry'
      } as LiveActivity))
      setLiveActivities(activities)
    }

    generateActivities()
    const interval = setInterval(() => {
      setCurrentActivity(prev => (prev + 1) % WhatsAppConfig.liveActivities.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const initializeChat = () => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      text: `Hello! Welcome to ${WhatsAppConfig.businessName}. How can I help you today?`,
      isBot: true,
      timestamp: new Date(),
      options: WhatsAppConfig.quickReplies.map(reply => ({
        id: reply.id,
        text: reply.text,
        action: 'quick-reply',
        data: { message: reply.message }
      }))
    }
    setMessages([welcomeMessage])
  }

  const addMessage = (text: string, isBot: boolean = false, options?: any[]) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      isBot,
      timestamp: new Date(),
      options
    }
    setMessages(prev => [...prev, newMessage])
  }

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, WhatsAppConfig.animations.typingDelay)
  }

  const handleQuickReply = (option: any) => {
    addMessage(option.text, false)
    
    simulateTyping(() => {
      switch (option.action) {
        case 'quick-reply':
          handleBotResponse(option.data.message)
          break
        case 'select-service':
          handleServiceSelection(option.data.serviceId)
          break
        case 'book-destination':
          handleDestinationBooking(option.data.destinationId)
          break
        case 'emergency':
          handleEmergencyService()
          break
        default:
          handleBotResponse(option.text)
      }
    })
  }

  const handleBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('quote') || lowerMessage.includes('price')) {
      addMessage(
        "I'd be happy to help you get a quote! Which service are you interested in?",
        true,
        WhatsAppConfig.services.map(service => ({
          id: service.id,
          text: `${service.name} - ${service.price}`,
          action: 'select-service',
          data: { serviceId: service.id }
        }))
      )
    } else if (lowerMessage.includes('book') || lowerMessage.includes('taxi')) {
      addMessage(
        "Great! Let's get you booked. Where would you like to go?",
        true,
        WhatsAppConfig.destinations.map(dest => ({
          id: dest.id,
          text: `${dest.icon} ${dest.name} (${dest.estimatedTime})`,
          action: 'book-destination',
          data: { destinationId: dest.id }
        }))
      )
    } else if (lowerMessage.includes('emergency')) {
      handleEmergencyService()
    } else if (lowerMessage.includes('service')) {
      addMessage(
        "Here are our professional security transport services:",
        true,
        WhatsAppConfig.services.map(service => ({
          id: service.id,
          text: `${service.popular ? '⭐ ' : ''}${service.name} - ${service.description}`,
          action: 'select-service',
          data: { serviceId: service.id }
        }))
      )
    } else {
      addMessage(
        "Thank you for your message! Our team will connect with you shortly. In the meantime, would you like to:",
        true,
        [
          { id: 'call', text: '📞 Call Now', action: 'call' },
          { id: 'whatsapp', text: '💬 Continue on WhatsApp', action: 'whatsapp' },
          { id: 'quote', text: '💷 Get Quick Quote', action: 'quick-reply', data: { message: 'I need a quote' } }
        ]
      )
    }
  }

  const handleServiceSelection = (serviceId: string) => {
    const service = WhatsAppConfig.services.find(s => s.id === serviceId)
    if (service) {
      setSelectedService(serviceId)
      addMessage(
        `Excellent choice! ${service.name} offers ${service.description}. Starting at ${service.price}. Would you like to book now or get more details?`,
        true,
        [
          { id: 'book-now', text: '🚗 Book Now', action: 'book-now' },
          { id: 'more-info', text: 'ℹ️ More Details', action: 'service-details' },
          { id: 'call-quote', text: '📞 Call for Quote', action: 'call' }
        ]
      )
    }
  }

  const handleDestinationBooking = (destinationId: string) => {
    const destination = WhatsAppConfig.destinations.find(d => d.id === destinationId)
    if (destination) {
      addMessage(
        `Perfect! ${destination.icon} ${destination.name} - Estimated time: ${destination.estimatedTime}, Price: ${destination.estimatedPrice}. Ready to book?`,
        true,
        [
          { id: 'confirm-book', text: '✅ Confirm Booking', action: 'whatsapp' },
          { id: 'call-book', text: '📞 Call to Book', action: 'call' },
          { id: 'different-dest', text: '📍 Different Destination', action: 'quick-reply', data: { message: 'I want to book a taxi' } }
        ]
      )
    }
  }

  const handleEmergencyService = () => {
    addMessage(
      "🚨 EMERGENCY SERVICE ACTIVATED 🚨\n\nOur emergency team is standing by 24/7. Choose your preferred contact method:",
      true,
      [
        { id: 'emergency-call', text: '📞 CALL EMERGENCY LINE', action: 'call' },
        { id: 'emergency-whatsapp', text: '🆘 Emergency WhatsApp', action: 'emergency-whatsapp' }
      ]
    )
  }

  const handleAction = (action: string, data?: any) => {
    switch (action) {
      case 'call':
        window.location.href = `tel:${WhatsAppConfig.phoneNumber}`
        break
      case 'whatsapp':
        const message = selectedService 
          ? `Hi! I'm interested in ${WhatsAppConfig.services.find(s => s.id === selectedService)?.name} service.`
          : WhatsAppConfig.defaultMessage
        window.open(`https://wa.me/${WhatsAppConfig.phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
        break
      case 'emergency-whatsapp':
        window.open(`https://wa.me/${WhatsAppConfig.phoneNumber}?text=${encodeURIComponent(WhatsAppConfig.emergencyMessage)}`, '_blank')
        break
    }
  }

  const sendMessage = () => {
    if (inputMessage.trim()) {
      addMessage(inputMessage, false)
      const userMsg = inputMessage
      setInputMessage('')
      
      simulateTyping(() => {
        handleBotResponse(userMsg)
      })
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      {/* Live Activity Banner */}
      {!isOpen && liveActivities.length > 0 && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg animate-in slide-in-from-right-full">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">
              {liveActivities[currentActivity]?.message}
            </span>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen ? (
        <div className="w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">{WhatsAppConfig.businessName}</h3>
                <p className="text-xs opacity-90">Usually responds in 5 minutes</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Service Showcase Banner */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 border-b">
            <div className="flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-semibold">SIA Licensed</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-600">5-Star Service</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-green-600">24/7 Available</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-white border border-gray-200 text-gray-800'
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  
                  {/* Quick Reply Options */}
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleQuickReply(option)}
                          className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors flex items-center space-x-2"
                        >
                          <span>{option.text}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-white/75'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl p-3 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-500"
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white p-2 rounded-full transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex justify-center space-x-2 mt-3">
              <button 
                onClick={() => handleAction('call')}
                className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors hover:bg-blue-500"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </button>
              <button 
                onClick={() => handleAction('whatsapp')}
                className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors hover:bg-green-500"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Floating Button */
        <button
          onClick={() => {
            setIsOpen(true)
            if (messages.length === 0) initializeChat()
          }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative"
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Pulse Animation */}
          <div className="absolute inset-0 w-16 h-16 bg-green-500/50 rounded-full animate-ping" />
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
            !
          </div>
        </button>
      )}
    </div>
  )
}