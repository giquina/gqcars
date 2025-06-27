'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Minimize2, Car, Shield, Calendar, Phone, MapPin, Clock, RadioTower } from 'lucide-react'
import Link from 'next/link'

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  options?: ChatOption[]
}

interface ChatOption {
  id: string
  text: string
  action: string
  icon?: any
  data?: string
}

interface Activity {
  id: number
  name: string
  text: string
  location: string
  timestamp: Date
  type: 'booking' | 'inquiry' | 'review'
  rating?: number
  href: string
}

const names = ['James', 'Emma', 'Mohammed', 'Sarah', 'David', 'Olivia', 'Wei', 'Aisha']
const locations = ['Heathrow', 'Westminster', 'Mayfair', 'The City', 'Canary Wharf', 'Soho']
const activityVerbs = ['booked', 'inquired about']
const services = [
  { id: 'standard', name: 'GQ Standard', price: '£6.50/mile' },
  { id: 'premium', name: 'GQ Premium', price: '£8.50/mile' },
  { id: 'executive', name: 'GQ Executive', price: '£10.50/mile' },
  { id: 'xl', name: 'GQ XL Group', price: '£7.20/mile' }
]

const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)]

const generateRandomActivity = (isInitial: boolean = false): Activity => {
  const service = getRandomItem(services)
  return {
    id: Date.now() + Math.random(),
    name: getRandomItem(names),
    text: `${getRandomItem(activityVerbs)} ${service.name}`,
    location: getRandomItem(locations),
    timestamp: isInitial ? new Date(Date.now() - Math.random() * 8 * 60000) : new Date(),
    type: Math.random() > 0.5 ? 'booking' : 'inquiry',
    href: `/services/${service.id}`,
    rating: Math.random() > 0.7 ? 4 + Math.random() : undefined
  }
}

const UserAvatar = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase()
  const colors = ['from-gq-gold to-yellow-600', 'from-yellow-600 to-yellow-700']
  const color = colors[name.charCodeAt(0) % colors.length]
  
  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 border-2 border-white/30`}>
      {initial}
    </div>
  )
}

export default function EnhancedChatWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [activities, setActivities] = useState<Activity[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => {
        if (!isOpen && !isMinimized) {
          setIsOpen(true)
          initializeChat()
        }
      }, 3000)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const initialActivities = Array(3).fill(null).map(() => generateRandomActivity(true))
    setActivities(initialActivities)
    scheduleNextActivity()

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const scheduleNextActivity = () => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
    
    const randomInterval = Math.random() * (60000 - 20000) + 20000
    
    timeoutIdRef.current = setTimeout(() => {
      setActivities(prev => {
        const newActivity = generateRandomActivity()
        return [newActivity, ...prev].slice(0, 3)
      })
      scheduleNextActivity()
    }, randomInterval)
  }

  const handleMinimize = () => {
    setIsOpen(false)
    setIsMinimized(true)
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    if (messages.length === 0) {
      initializeChat()
    }
  }

  const initializeChat = () => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome-1',
      text: 'Hi! How can I help you today?',
      isBot: true,
      timestamp: new Date(),
      options: [
        { id: 'book-now', text: '🚗 Book a Ride', action: 'book', icon: Car },
        { id: 'view-services', text: '🛡️ Our Services', action: 'services', icon: Shield },
        { id: 'get-quote', text: '💷 Get Quote', action: 'get-quote', icon: Calendar },
        { id: 'call-now', text: '📞 Call Now', action: 'call', icon: Phone }
      ]
    }
    setMessages([welcomeMessage])
  }

  const handleOptionClick = (option: ChatOption) => {
    addMessage(option.text, false)
    simulateTyping(() => {
      switch (option.action) {
        case 'book':
          handleBookNow()
          break
        case 'services':
          handleServices()
          break
        case 'get-quote':
          handleGetQuote()
          break
        case 'call':
          handleCall()
          break
        default:
          handleDefault()
      }
    })
  }

  const addMessage = (text: string, isBot: boolean = false, options?: ChatOption[]) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      isBot,
      timestamp: new Date(),
      options
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

  const handleBookNow = () => {
    addMessage('Perfect! Let me help you book a ride. Which service would you prefer?', true, 
      services.map(s => ({
        id: s.id,
        text: `${s.id === 'standard' ? '🚗' : s.id === 'premium' ? '⭐' : s.id === 'executive' ? '👑' : '👥'} ${s.name} (${s.price})`,
        action: `book-${s.id}`
      }))
    )
  }

  const handleServices = () => {
              addMessage('Here are our professional services. Click any to learn more:', true, [
            { id: 'nav-executive', text: '👑 Close Protection', action: 'navigate', data: '/services/close-protection' },
            { id: 'nav-premium', text: '⭐ VIP Transport', action: 'navigate', data: '/services/vip' },
            { id: 'nav-standard', text: '🚗 Taxi Service', action: 'navigate', data: '/services/taxi' },
            { id: 'nav-xl', text: '👥 Corporate Transport', action: 'navigate', data: '/services/corporate' }
    ])
  }

  const handleCall = () => {
    addMessage('Connecting you to our 24/7 support line. Our SIA licensed team is standing by!', true)
    setTimeout(() => {
      window.open('tel:07407655203', '_self')
    }, 1000)
  }

  const handleGetQuote = () => {
    addMessage('I\'ll help you get an instant quote! Please use our quote widget or connect with our team:', true, [
      { id: 'use-widget', text: '📱 Use Quote Widget', action: 'close-and-scroll' },
      { id: 'personal-quote', text: '👤 Personal Quote', action: 'contact-human' }
    ])
  }

  const handleDefault = () => {
    addMessage('I\'m here to help! Would you like to book a ride or get a quote?', true, [
      { id: 'book-now', text: '🚗 Book a Ride', action: 'book' },
      { id: 'get-quote', text: '💷 Get Quote', action: 'get-quote' }
    ])
  }

  const getActivityGlow = (type: Activity['type']) => {
    switch(type) {
      case 'booking': return 'shadow-[0_0_35px_-5px_theme(colors.yellow.600/0.7)]'
      case 'inquiry': return 'shadow-[0_0_35px_-5px_theme(colors.yellow.500/0.7)]'
      case 'review': return 'shadow-[0_0_35px_-5px_theme(colors.yellow.400/0.7)]'
      default: return 'shadow-[0_0_35px_-5px_theme(colors.gray.800/0.7)]'
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
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-tr from-gq-gold to-yellow-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75 animate-ping"></span>
          <RadioTower className="w-7 h-7" />
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pointer-events-none">
        >
          {/* Activity Feed */}
          <div className="w-80 pointer-events-auto">
            <div className="bg-gradient-to-tr from-black/70 via-gray-900/60 to-black/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center p-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gq-gold"></span>
                  </span>
                  <h3 className="font-bold text-white text-sm">Live Activity</h3>
                </div>
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-3">
                <AnimatePresence>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="mb-3"
                    >
                      <div className={`relative bg-gradient-to-tr from-gray-900/80 via-black/70 to-gray-900/80 backdrop-blur-lg border border-white/10 rounded-xl p-3 ${getActivityGlow(activity.type)}`}>
                        <div className="flex items-start space-x-3">
                          <UserAvatar name={activity.name} />
                          <div>
                            <p className="text-sm text-white">
                              <span className="font-bold">{activity.name}</span> {activity.text}
                            </p>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{activity.location}</span>
                              <Clock className="w-3 h-3 ml-2 mr-1" />
                              <span>just now</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Chat Widget */}
          <div className="w-[28rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden pointer-events-auto">
            <div className="bg-gradient-to-r from-gq-gold to-yellow-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold">GQ Cars Support</h3>
                  <p className="text-xs opacity-90">Usually responds in 5 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={handleMinimize} className="p-1 hover:bg-white/20 rounded transition-colors">
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button onClick={handleMinimize} className="p-1 hover:bg-white/20 rounded transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white border border-gray-200'
                        : 'bg-gradient-to-r from-gq-gold to-yellow-600 text-white'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.options && (
                        <div className="mt-3 space-y-2">
                          {message.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => handleOptionClick(option)}
                              className="w-full text-left p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                            >
                              {option.text}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-gq-gold/75'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gq-gold rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gq-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gq-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}