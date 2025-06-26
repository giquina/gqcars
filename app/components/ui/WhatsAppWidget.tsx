'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Phone, Clock, MapPin, Car, Shield, Star, Zap, Users, Calendar, ArrowRight, CheckCircle, AlertCircle, Sparkles, TrendingUp, Award, Clock3 } from 'lucide-react'

interface WhatsAppMessage {
  id: string
  text: string
  isTemplate: boolean
  timestamp: Date
  quickReplies?: QuickReply[]
  showTyping?: boolean
}

interface QuickReply {
  id: string
  text: string
  action: string
  icon?: any
  color?: string
  badge?: string
}

interface ServiceOption {
  id: string
  name: string
  description: string
  price: string
  icon: any
  features: string[]
  color: string
  popular?: boolean
}

interface LiveActivity {
  id: string
  type: 'booking' | 'review' | 'inquiry'
  text: string
  location: string
  time: string
  rating?: number
}

const serviceOptions: ServiceOption[] = [
  {
    id: 'standard',
    name: 'GQ Standard',
    description: 'Professional security transport',
    price: 'From £6.50/mile',
    icon: Car,
    features: ['SIA Licensed Driver', 'GPS Tracking', '24/7 Support'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'premium',
    name: 'GQ Premium',
    description: 'Enhanced security & comfort',
    price: 'From £8.50/mile',
    icon: Shield,
    features: ['Close Protection', 'Premium Vehicle', 'Priority Booking'],
    color: 'from-purple-500 to-purple-600',
    popular: true
  },
  {
    id: 'executive',
    name: 'GQ Executive',
    description: 'VIP security transport',
    price: 'From £10.50/mile',
    icon: Star,
    features: ['Executive Protection', 'Luxury Vehicle', 'Dedicated Driver'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'xl',
    name: 'GQ XL Group',
    description: 'Group security transport',
    price: 'From £7.20/mile',
    icon: Users,
    features: ['Group Protection', 'Spacious Vehicle', 'Team Coordination'],
    color: 'from-green-500 to-green-600'
  }
]

const popularDestinations = [
  { name: 'Heathrow Airport', time: '35-50 min', price: '£45-65', icon: '✈️' },
  { name: 'Gatwick Airport', time: '45-60 min', price: '£55-75', icon: '✈️' },
  { name: 'City of London', time: '20-35 min', price: '£25-40', icon: '🏢' },
  { name: 'Canary Wharf', time: '25-40 min', price: '£30-45', icon: '🏦' }
]

const liveActivities: LiveActivity[] = [
  { id: '1', type: 'booking', text: 'Just booked GQ Premium to Heathrow', location: 'Westminster', time: '2 min ago', rating: 5 },
  { id: '2', type: 'review', text: 'Left a 5-star review', location: 'Mayfair', time: '5 min ago', rating: 5 },
  { id: '3', type: 'inquiry', text: 'Asked about Executive service', location: 'The City', time: '8 min ago' }
]

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<WhatsAppMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showServices, setShowServices] = useState(false)
  const [showDestinations, setShowDestinations] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const [showLiveActivity, setShowLiveActivity] = useState(false)
  const [currentActivity, setCurrentActivity] = useState<LiveActivity | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [typingIndicator, setTypingIndicator] = useState('')
  const [notificationCount, setNotificationCount] = useState(1)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => {
        if (!isOpen && !isMinimized) {
          setIsOpen(true)
          initializeChat()
        }
      }, 2000)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isTyping) {
      const dots = ['', '.', '..', '...']
      let index = 0
      const interval = setInterval(() => {
        setTypingIndicator(dots[index])
        index = (index + 1) % dots.length
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isTyping])

  // Live activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const activity = liveActivities[Math.floor(Math.random() * liveActivities.length)]
        setCurrentActivity(activity)
        setShowLiveActivity(true)
        setTimeout(() => setShowLiveActivity(false), 5000)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const initializeChat = () => {
    const welcomeMessage: WhatsAppMessage = {
      id: 'welcome-1',
      text: "Hi! 👋 I'm your GQ Cars WhatsApp assistant. How can I help you today?",
      isTemplate: true,
      timestamp: new Date(),
      quickReplies: [
        { id: 'book-now', text: '🚗 Book a Ride', action: 'book', icon: Car, color: 'bg-green-500' },
        { id: 'get-quote', text: '💷 Get Quote', action: 'quote', icon: Calendar, color: 'bg-blue-500' },
        { id: 'services', text: '🛡️ Our Services', action: 'services', icon: Shield, color: 'bg-purple-500' },
        { id: 'emergency', text: '🚨 Emergency', action: 'emergency', icon: AlertCircle, color: 'bg-red-500' }
      ]
    }
    setMessages([welcomeMessage])
  }

  const addMessage = (text: string, isTemplate: boolean = false, quickReplies?: QuickReply[]) => {
    const newMessage: WhatsAppMessage = {
      id: `msg-${Date.now()}`,
      text,
      isTemplate,
      timestamp: new Date(),
      quickReplies
    }
    setMessages(prev => [...prev, newMessage])
  }

  const simulateTyping = (callback: () => void, delay: number = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleQuickReply = (reply: QuickReply) => {
    addMessage(reply.text, false)
    setNotificationCount(prev => Math.max(0, prev - 1))
    simulateTyping(() => {
      switch (reply.action) {
        case 'book':
          handleBookNow()
          break
        case 'quote':
          handleGetQuote()
          break
        case 'services':
          handleShowServices()
          break
        case 'emergency':
          handleEmergency()
          break
        case 'service-select':
          handleServiceSelection(reply.id)
          break
        case 'destination-select':
          handleDestinationSelection(reply.id)
          break
        case 'call-now':
          window.open('tel:07407655203', '_self')
          break
        case 'whatsapp-direct':
          openWhatsApp(reply.text)
          break
        case 'smart-suggest':
          handleSmartSuggestion(reply.id)
          break
        default:
          handleDefault()
      }
    })
  }

  const handleBookNow = () => {
    addMessage('Perfect! Let me help you book a ride. Which service would you prefer?', true, [
      { id: 'standard', text: '🚗 GQ Standard', action: 'service-select', color: 'bg-blue-500' },
      { id: 'premium', text: '⭐ GQ Premium', action: 'service-select', color: 'bg-purple-500', badge: 'Popular' },
      { id: 'executive', text: '👑 GQ Executive', action: 'service-select', color: 'bg-yellow-500' },
      { id: 'xl', text: '👥 GQ XL Group', action: 'service-select', color: 'bg-green-500' }
    ])
  }

  const handleServiceSelection = (serviceId: string) => {
    setSelectedService(serviceId)
    const service = serviceOptions.find(s => s.id === serviceId)
    if (service) {
      addMessage(`Great choice! ${service.name} - ${service.description}`, true, [
        { id: 'heathrow', text: '✈️ Heathrow Airport', action: 'destination-select', color: 'bg-blue-500' },
        { id: 'gatwick', text: '✈️ Gatwick Airport', action: 'destination-select', color: 'bg-blue-500' },
        { id: 'city', text: '🏢 City of London', action: 'destination-select', color: 'bg-blue-500' },
        { id: 'custom', text: '📍 Custom Location', action: 'custom-location', color: 'bg-gray-500' }
      ])
    }
  }

  const handleDestinationSelection = (destinationId: string) => {
    const destination = popularDestinations.find(d => 
      d.name.toLowerCase().includes(destinationId) || 
      destinationId.includes(d.name.toLowerCase().split(' ')[0])
    )
    
    if (destination) {
      addMessage(`Perfect! ${destination.name} - ${destination.time} journey, ${destination.price}`, true, [
        { id: 'confirm-booking', text: '✅ Confirm Booking', action: 'whatsapp-direct', color: 'bg-green-500' },
        { id: 'modify', text: '✏️ Modify Details', action: 'modify-booking', color: 'bg-blue-500' },
        { id: 'call-now', text: '📞 Call Now', action: 'call-now', color: 'bg-yellow-500' }
      ])
    }
  }

  const handleGetQuote = () => {
    addMessage('I\'ll help you get an instant quote! What type of journey do you need?', true, [
      { id: 'airport', text: '✈️ Airport Transfer', action: 'quote-airport', color: 'bg-blue-500' },
      { id: 'business', text: '💼 Business Travel', action: 'quote-business', color: 'bg-purple-500' },
      { id: 'event', text: '🎉 Event Transport', action: 'quote-event', color: 'bg-green-500' },
      { id: 'custom', text: '📍 Custom Quote', action: 'quote-custom', color: 'bg-gray-500' }
    ])
  }

  const handleShowServices = () => {
    setShowServices(true)
    addMessage('Here are our professional security transport services:', true, [
      { id: 'learn-more', text: '📖 Learn More', action: 'services-detail', color: 'bg-blue-500' },
      { id: 'compare', text: '⚖️ Compare Services', action: 'compare-services', color: 'bg-purple-500' },
      { id: 'book-service', text: '🚗 Book Now', action: 'book', color: 'bg-green-500' }
    ])
  }

  const handleEmergency = () => {
    setShowEmergency(true)
    addMessage('🚨 EMERGENCY SERVICES AVAILABLE 24/7!', true, [
      { id: 'emergency-call', text: '📞 Emergency Call', action: 'call-now', color: 'bg-red-500' },
      { id: 'emergency-whatsapp', text: '🆘 Emergency WhatsApp', action: 'whatsapp-direct', color: 'bg-orange-500' },
      { id: 'hospital', text: '🏥 Hospital Transfer', action: 'whatsapp-direct', color: 'bg-blue-500' }
    ])
  }

  const handleSmartSuggestion = (suggestionId: string) => {
    const suggestions = {
      'time-sensitive': 'I need transport within the next hour',
      'airport-rush': 'I have a flight to catch',
      'business-meeting': 'I have an important business meeting',
      'group-transport': 'I need transport for a group'
    }
    const message = suggestions[suggestionId as keyof typeof suggestions] || 'I need transport assistance'
    addMessage(message, false)
    simulateTyping(() => {
      addMessage('I understand! Let me get you the best option right away.', true, [
        { id: 'express-booking', text: '⚡ Express Booking', action: 'whatsapp-direct', color: 'bg-green-500' },
        { id: 'priority-service', text: '⭐ Priority Service', action: 'service-select', color: 'bg-purple-500' }
      ])
    })
  }

  const handleDefault = () => {
    addMessage('I\'m here to help! Would you like to book a ride or get a quote?', true, [
      { id: 'book-now', text: '🚗 Book a Ride', action: 'book', color: 'bg-green-500' },
      { id: 'get-quote', text: '💷 Get Quote', action: 'quote', color: 'bg-blue-500' }
    ])
  }

  const openWhatsApp = (message: string) => {
    const defaultMessage = "Hello GQ Cars! I'm interested in your security taxi services."
    const encodedMessage = encodeURIComponent(message || defaultMessage)
    window.open(`https://wa.me/447407655203?text=${encodedMessage}`, '_blank')
  }

  const handleMinimize = () => {
    setIsOpen(false)
    setIsMinimized(true)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setNotificationCount(0)
    if (messages.length === 0) {
      initializeChat()
    }
  }

  if (!isVisible) return null

  return (
    <>
      {isMinimized ? (
        <motion.button
          onClick={handleOpen}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-tr from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 group"
        >
          <div className="relative">
            <MessageCircle className="w-8 h-8" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                <span className="text-xs font-bold">{notificationCount}</span>
              </span>
            )}
          </div>
          <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">GQ Cars WhatsApp</h3>
                <div className="flex items-center space-x-1 text-xs opacity-90">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Online • Usually responds in 2 minutes</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleMinimize}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Live Activity Banner */}
          <AnimatePresence>
            {showLiveActivity && currentActivity && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-3 text-sm font-medium flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{currentActivity.text}</span>
                <span className="text-xs opacity-75">• {currentActivity.time}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${message.isTemplate ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    message.isTemplate
                      ? 'bg-white border border-gray-200 shadow-sm'
                      : 'bg-green-500 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    {message.quickReplies && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply) => (
                          <motion.button
                            key={reply.id}
                            onClick={() => handleQuickReply(reply)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left p-3 rounded-xl text-sm transition-all duration-200 flex items-center justify-between ${
                              reply.color || 'bg-gray-100'
                            } hover:opacity-80 text-white font-medium relative`}
                          >
                            <div className="flex items-center space-x-2">
                              {reply.icon && <reply.icon className="w-4 h-4" />}
                              <span>{reply.text}</span>
                            </div>
                            {reply.badge && (
                              <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                                {reply.badge}
                              </span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    )}
                    <div className={`text-xs mt-2 ${message.isTemplate ? 'text-gray-500' : 'text-green-100'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">GQ Cars is typing{typingIndicator}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Services Showcase */}
            {showServices && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-4"
              >
                <h4 className="font-bold text-gray-800 mb-3 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span>Our Services</span>
                </h4>
                <div className="space-y-3">
                  {serviceOptions.map((service) => (
                    <div key={service.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 relative">
                      {service.popular && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">
                          Popular
                        </div>
                      )}
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                        <service.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Emergency Services */}
            {showEmergency && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <h4 className="font-bold text-red-800">Emergency Services</h4>
                </div>
                <div className="space-y-2 text-sm text-red-700">
                  <div>🚨 24/7 Emergency Response</div>
                  <div>🏥 Hospital Transfers</div>
                  <div>🚔 Security Escorts</div>
                  <div>⚡ Immediate Dispatch</div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-gray-100 p-3 border-t border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => window.open('tel:07407655203', '_self')}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black p-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </button>
              <button
                onClick={() => openWhatsApp('Hello GQ Cars! I need immediate assistance.')}
                className="flex-1 bg-green-500 hover:bg-green-400 text-white p-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
} 