'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Minimize2, Car, Shield, Calendar, Phone, Send, Clock, MapPin, Star, CheckCircle } from 'lucide-react'

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

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState('')
  const [currentFlow, setCurrentFlow] = useState('welcome')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      setTimeout(() => {
        if (!isOpen && !isMinimized) {
          setIsOpen(true)
          initializeChat()
        }
      }, 3000)
    }, 30000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

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

  const handleOptionClick = (option: ChatOption) => {
    addMessage(option.text, false)
    simulateTyping(() => {
      switch (option.action) {
        case 'book':
          handleBookNow()
          break
        case 'schedule':
          handleSchedule()
          break
        case 'services':
          handleServices()
          break
        case 'call':
          handleCall()
          break
        case 'book-standard':
          handleBookService('Standard', '£6.50/mile')
          break
        case 'book-premium':
          handleBookService('Premium', '£8.50/mile')
          break
        case 'book-executive':
          handleBookService('Executive', '£10.50/mile')
          break
        case 'book-xl':
          handleBookService('XL Group', '£7.20/mile')
          break
        case 'get-quote':
          handleGetQuote()
          break
        case 'urgent':
          handleUrgent()
          break
        case 'airport':
          handleAirport()
          break
        case 'more-info':
          handleMoreInfo()
          break
        case 'contact-human':
          handleContactHuman()
          break
        case 'navigate':
          handleSpecialAction('navigate', option.data)
          break
        default:
          handleDefault()
      }
    })
  }

  const handleBookNow = () => {
    addMessage('Perfect! Let me help you book a ride. Which service would you prefer?', true, [
      { id: 'standard', text: '🚗 GQ Standard (£6.50/mile)', action: 'book-standard' },
      { id: 'premium', text: '⭐ GQ Premium (£8.50/mile)', action: 'book-premium' },
      { id: 'executive', text: '👑 GQ Executive (£10.50/mile)', action: 'book-executive' },
      { id: 'xl', text: '👥 GQ XL Group (£7.20/mile)', action: 'book-xl' }
    ])
  }

  const handleSchedule = () => {
    addMessage('Great! I can help you schedule a future ride. Would you like to:', true, [
      { id: 'schedule-today', text: '📅 Schedule for Today', action: 'get-quote' },
      { id: 'schedule-future', text: '🗓️ Schedule for Future Date', action: 'get-quote' },
      { id: 'recurring', text: '🔄 Set Up Recurring Rides', action: 'contact-human' }
    ])
  }

  const handleServices = () => {
    addMessage('Here are our professional services. Click any to learn more:', true, [
      { id: 'nav-executive', text: '👑 Executive Protection', action: 'navigate', data: '/services/executive' },
      { id: 'nav-premium', text: '⭐ Premium Transport', action: 'navigate', data: '/services/premium' },
      { id: 'nav-standard', text: '🚗 Standard Service', action: 'navigate', data: '/services/standard' },
      { id: 'nav-xl', text: '👥 XL Group Transport', action: 'navigate', data: '/services/xl' },
      { id: 'nav-airport', text: '✈️ Airport Transfers', action: 'navigate', data: '/services/airport' },
      { id: 'nav-corporate', text: '🏢 Corporate Transport', action: 'navigate', data: '/services/corporate' }
    ])
  }

  const handleCall = () => {
    addMessage('Connecting you to our 24/7 support line. Our SIA licensed team is standing by!', true)
    setTimeout(() => {
      window.open('tel:07407655203', '_self')
    }, 1000)
  }

  const handleBookService = (service: string, price: string) => {
    addMessage(`Excellent choice! ${service} service at ${price}. 

🎉 SPECIAL OFFER: 50% OFF your first ride!

To complete your booking, I'll connect you with our booking team who will:
• Confirm your pickup location
• Get your destination
• Provide exact quote
• Assign your SIA licensed driver

Would you like to proceed?`, true, [
      { id: 'proceed-whatsapp', text: '💬 Continue on WhatsApp', action: 'contact-human' },
      { id: 'proceed-call', text: '📞 Call to Book', action: 'call' },
      { id: 'get-quote-first', text: '💷 Get Quote First', action: 'get-quote' }
    ])
  }

  const handleGetQuote = () => {
    addMessage('I\'ll help you get an instant quote! Please use our quote widget on the homepage, or I can connect you directly with our team for a personalized quote.', true, [
      { id: 'use-widget', text: '📱 Use Quote Widget', action: 'close-and-scroll' },
      { id: 'personal-quote', text: '👤 Personal Quote', action: 'contact-human' },
      { id: 'urgent-booking', text: '⚡ Urgent Booking', action: 'urgent' }
    ])
  }

  const handleUrgent = () => {
    addMessage(`⚡ URGENT BOOKING SERVICE ⚡

For immediate assistance with urgent security transport needs, I'm connecting you directly to our professional support team.

⏰ Response time: 5-15 minutes
🛡️ SIA licensed driver will be dispatched
📍 Live GPS tracking provided

Contact us now for immediate dispatch:`, true, [
      { id: 'urgent-call', text: '📞 CALL NOW', action: 'call' },
      { id: 'urgent-whatsapp', text: '💬 Urgent WhatsApp', action: 'contact-human' }
    ])
  }

  const handleAirport = () => {
    addMessage(`Airport transfers are our specialty! ✈️

• Heathrow: From £140 (45-60 min)
• Gatwick: From £170 (60-75 min)  
• Stansted: From £190 (75-90 min)
• Luton: From £160 (60-75 min)

All include:
🛡️ SIA licensed security driver
📱 Flight tracking
🚗 Meet & greet service
💼 Luggage assistance

Which airport do you need?`, true, [
      { id: 'heathrow', text: '🛫 Heathrow', action: 'contact-human' },
      { id: 'gatwick', text: '🛫 Gatwick', action: 'contact-human' },
      { id: 'stansted', text: '🛫 Stansted', action: 'contact-human' },
      { id: 'other-airport', text: '🛫 Other Airport', action: 'contact-human' }
    ])
  }

  const handleMoreInfo = () => {
    addMessage(`I'd love to tell you more about our professional security services! Our team can provide detailed information about:`, true, [
      { id: 'sia-training', text: '🎓 SIA Training & Credentials', action: 'contact-human' },
      { id: 'vehicle-fleet', text: '🚗 Vehicle Fleet & Security Features', action: 'contact-human' },
      { id: 'pricing-packages', text: '💷 Pricing & Package Options', action: 'contact-human' },
      { id: 'testimonials', text: '⭐ Client Testimonials', action: 'contact-human' }
    ])
  }

  const handleContactHuman = () => {
    const whatsappMessage = encodeURIComponent(`Hello GQ Cars! I'd like to speak with someone about booking a secure ride. Can you help me?`)
    addMessage('Perfect! I\'m connecting you to our WhatsApp support team. They\'ll respond within 5 minutes.', true)
    setTimeout(() => {
      window.open(`https://wa.me/447407655203?text=${whatsappMessage}`, '_blank')
    }, 2000)
  }

  const handleDefault = () => {
    addMessage('I\'m here to help! Would you like to book a ride, get a quote, or learn more about our services?', true, [
      { id: 'book-now', text: '🚗 Book a Ride', action: 'book' },
      { id: 'get-quote', text: '💷 Get Quote', action: 'get-quote' },
      { id: 'call-now', text: '📞 Call Now', action: 'call' }
    ])
  }

  const handleSpecialAction = (action: string, data?: string) => {
    if (action === 'navigate' && data) {
      addMessage(`I'll take you to our ${data} page!`, true)
      setTimeout(() => {
        window.location.href = data
      }, 1500)
    }
  }

  if (!isVisible) return null

  return (
    <>
      {isMinimized && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md sm:w-[28rem] sm:h-[34rem] h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
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
              <button
                onClick={handleMinimize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleMinimize}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-white border border-gray-200'
                      : 'bg-green-500 text-white'
                  }`}
                >
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
                  <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-green-100'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  )
}