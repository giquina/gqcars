'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X, Phone, Calendar, Car, MapPin, Clock, Shield, Star, ChevronRight } from 'lucide-react'
import GQCarsLogo from './GQCarsLogo'

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
}

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState('')
  const [currentFlow, setCurrentFlow] = useState('welcome')

  // Show widget after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Auto-open after showing for 3 seconds
      setTimeout(() => {
        if (!isOpen && !isMinimized) {
          setIsOpen(true)
          initializeChat()
        }
      }, 3000)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

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
      text: '👋 Hello! I\'m your GQ Cars virtual assistant. Would you like to book a secure ride with our SIA licensed drivers today?',
      isBot: true,
      timestamp: new Date(),
      options: [
        { id: 'book-now', text: '🚗 Book Now', action: 'book', icon: Car },
        { id: 'schedule', text: '📅 Schedule Ride', action: 'schedule', icon: Calendar },
        { id: 'services', text: '🛡️ View Services', action: 'services', icon: Shield },
        { id: 'call', text: '📞 Call Directly', action: 'call', icon: Phone }
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
    // Add user's choice to chat
    addMessage(option.text, false)

    // Simulate typing and respond based on action
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
    addMessage('Here are our professional security transport services:', true, [
      { id: 'executive-protection', text: '🛡️ Executive Protection', action: 'more-info' },
      { id: 'airport-transfers', text: '✈️ Airport Transfers', action: 'airport' },
      { id: 'wedding-security', text: '💒 Wedding Security', action: 'more-info' },
      { id: 'corporate-transport', text: '🏢 Corporate Transport', action: 'more-info' }
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
      { id: 'urgent-call', text: '� CALL NOW', action: 'call' },
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
    const whatsappMessage = encodeURIComponent(`Hello GQ Cars! 

I'm interested in your professional security transport services. I was chatting with your virtual assistant and would like to speak with a team member about:

• Booking a ride with SIA licensed drivers
• Getting a personalized quote
• Learning more about your services

Thank you!`)
    
    addMessage(`Perfect! I'm connecting you with our professional booking team on WhatsApp. They'll help you with everything you need!`, true, [
      { id: 'open-whatsapp', text: '💬 Continue on WhatsApp', action: 'open-whatsapp' }
    ])

    setTimeout(() => {
      window.open(`https://wa.me/447407655203?text=${whatsappMessage}`, '_blank')
    }, 2000)
  }

  const handleDefault = () => {
    addMessage('I\'m here to help you with GQ Cars\' professional security transport services. Would you like to:', true, [
      { id: 'book-ride', text: '🚗 Book a Ride', action: 'book' },
      { id: 'get-info', text: 'ℹ️ Get Information', action: 'services' },
      { id: 'speak-human', text: '👤 Speak to Human', action: 'contact-human' }
    ])
  }

  const handleSpecialAction = (action: string) => {
    switch (action) {
      case 'close-and-scroll':
        handleMinimize()
        // Scroll to quote widget
        setTimeout(() => {
          const quoteWidget = document.querySelector('[data-quote-widget]')
          if (quoteWidget) {
            quoteWidget.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
        break
      case 'open-whatsapp':
        const whatsappMessage = encodeURIComponent(`Hello GQ Cars! I'm interested in your professional security transport services.`)
        window.open(`https://wa.me/447407655203?text=${whatsappMessage}`, '_blank')
        break
    }
  }

  // Don't show widget if not visible yet
  if (!isVisible) return null

  return (
    <>
      {/* Floating WhatsApp Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={handleOpen}
            className="bg-yellow-500 hover:bg-yellow-400 text-black p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 relative group"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Notification Badge */}
            {!isMinimized && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                1
              </div>
            )}
            {/* Floating Message - Better positioning */}
            {!isMinimized && (
              <div className="absolute bottom-full right-0 mb-4 bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                💬 Quick booking help available!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-yellow-500"></div>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center p-1">
                <GQCarsLogo className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-sm">GQ Security</h3>
                <p className="text-xs opacity-90">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={handleMinimize}
              className="text-black hover:bg-black/10 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className="max-w-xs">
                  <div
                    className={`p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-sm'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {/* Options Buttons */}
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            if (option.action.startsWith('close-') || option.action.startsWith('open-')) {
                              handleSpecialAction(option.action)
                            } else {
                              handleOptionClick(option)
                            }
                          }}
                          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-bold py-2 px-3 rounded-lg transition-colors flex items-center justify-between group"
                        >
                          <span>{option.text}</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="flex space-x-2">
              <button
                onClick={() => handleOptionClick({ id: 'quick-call', text: '📞 Call Now', action: 'call' })}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-1"
              >
                <Phone className="w-3 h-3" />
                <span>Call</span>
              </button>
              <button
                onClick={() => handleOptionClick({ id: 'quick-book', text: '🚗 Book', action: 'book' })}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-1"
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