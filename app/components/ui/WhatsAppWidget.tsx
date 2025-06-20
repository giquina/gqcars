'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Phone, Calendar, Car, MapPin, Clock, Shield, Star, ChevronRight, ExternalLink, Maximize2, Minimize2 } from 'lucide-react'
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
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Show widget after 30 seconds
  useEffect(() => {
    // Check if user previously dismissed the widget
    const dismissed = localStorage.getItem('gq-whatsapp-dismissed')
    if (dismissed) {
      setIsDismissed(true)
      return
    }

    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
        // Auto-open after showing for 3 seconds
        setTimeout(() => {
          if (!isOpen && !isMinimized && !isDismissed) {
            setIsOpen(true)
            initializeChat()
          }
        }, 3000)
      }
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [isDismissed])

  const handleMinimize = () => {
    setIsOpen(false)
    setIsMinimized(true)
    setIsMaximized(false)
  }

  const handleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  const handleDismiss = () => {
    setIsOpen(false)
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('gq-whatsapp-dismissed', 'true')
  }

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    if (messages.length === 0) {
      initializeChat()
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initializeChat = () => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome-1',
      text: '👋 Hello! I\'m your GQ Cars virtual assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
      options: [
        { id: 'book-now', text: '🚗 Book Now', action: 'book' },
        { id: 'schedule', text: '📅 Schedule Ride', action: 'schedule' },
        { id: 'services', text: '🛡️ View Services', action: 'services' },
        { id: 'call', text: '📞 Call Directly', action: 'call' }
      ]
    }
    setMessages([welcomeMessage])
    
    // Auto-scroll to bottom when chat initializes
    setTimeout(scrollToBottom, 200)
  }

  const addMessage = (text: string, isBot: boolean = false, options?: ChatOption[]) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      isBot,
      timestamp: new Date(),
      options
    }
    setMessages(prev => {
      const updated = [...prev, newMessage]
      // Auto-scroll to bottom after message is added
      setTimeout(scrollToBottom, 100)
      return updated
    })
  }

  const simulateTyping = (callback: () => void, delay: number = 1500) => {
    setIsTyping(true)
    // Scroll to show typing indicator
    setTimeout(scrollToBottom, 100)
    
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
          handleViewServices()
          break
        case 'call':
          handleCall()
          break
        case 'get-quote':
          handleGetQuote()
          break
        case 'whatsapp-booking':
          handleWhatsAppBooking()
          break
        case 'view-pricing':
          handleViewPricing()
          break
        case 'airport-info':
          handleAirportInfo()
          break
        case 'emergency-booking':
          handleEmergencyBooking()
          break
        case 'security-assessment':
          handleSecurityAssessment()
          break
        default:
          handleDefault()
      }
    })
  }

  const handleBookNow = () => {
    addMessage(`🚗 **INSTANT BOOKING**

Choose your booking method:

📞 **Call** - Fastest (1-2 min)
Speak directly with our team

💬 **WhatsApp** - Quick & Easy
Send details, get instant response

📱 **Get Quote** - See Pricing First
Use our smart quote calculator

🎉 **50% OFF** your first ride!`, true, [
      { id: 'call-book', text: '📞 Call Now (Fastest)', action: 'call' },
      { id: 'whatsapp-book', text: '💬 WhatsApp Booking', action: 'whatsapp-booking' },
      { id: 'quote-first', text: '📱 Get Quote First', action: 'get-quote' }
    ])
  }

  const handleSchedule = () => {
    addMessage(`📅 **SCHEDULE YOUR RIDE**

Perfect for planning ahead!

🕰️ **Today** - Book for later today
📆 **Future** - Days/weeks ahead
🔄 **Regular** - Set up recurring rides

All with SIA licensed security drivers.`, true, [
      { id: 'schedule-today', text: '📞 Call to Schedule', action: 'call' },
      { id: 'schedule-whatsapp', text: '💬 WhatsApp Details', action: 'whatsapp-booking' },
      { id: 'security-check', text: '🛡️ Security Assessment', action: 'security-assessment' }
    ])
  }

  const handleViewServices = () => {
    addMessage(`🛡️ **GQ CARS SERVICES**

All with SIA Licensed Security Drivers:

🚗 **GQ Standard** - £6.50/mile
Professional taxi service

⭐ **GQ Premium** - £8.50/mile
Enhanced comfort vehicles

👑 **GQ Executive** - £10.50/mile
Luxury transport service

👥 **GQ XL** - £7.20/mile
5-8 passengers, extra space

✈️ **Airport Transfers** from £140
🏢 **Corporate Packages** available

🎉 **50% OFF first ride!**`, true, [
      { id: 'book-standard', text: '🚗 Book Standard (Nissan Leaf)', action: 'call' },
      { id: 'book-premium', text: '⭐ Book Premium (Mercedes S)', action: 'call' },
      { id: 'book-executive', text: '👑 Book Executive (Range Rover)', action: 'call' },
      { id: 'book-xl', text: '🚐 Book XL (Mercedes 7-Seater)', action: 'call' },
      { id: 'security-assessment', text: '🛡️ Security Assessment', action: 'security-assessment' },
      { id: 'emergency-booking', text: '🚨 Emergency Booking', action: 'call' }
    ])
  }

  const handleCall = () => {
    addMessage('📞 Connecting you to our 24/7 booking line...', true)
    setTimeout(() => {
      // Open phone dialer
      window.location.href = 'tel:07407655203'
    }, 1000)
  }

  const handleGetQuote = () => {
    addMessage(`📱 GET INSTANT QUOTE

I can help you get pricing right now:

🎯 Use our smart quote tool on the homepage
📞 Call for personal quote over the phone
💬 Send your trip details via WhatsApp

All quotes include SIA security driver!`, true, [
      { id: 'use-quote-tool', text: '📱 Use Quote Tool', action: 'security-assessment' },
      { id: 'call-quote', text: '📞 Call for Quote', action: 'call' },
      { id: 'whatsapp-quote', text: '💬 WhatsApp Quote', action: 'whatsapp-booking' }
    ])
  }

  const handleWhatsAppBooking = () => {
    addMessage('💬 Opening WhatsApp with pre-filled booking message...', true)
    
    const whatsappMessage = encodeURIComponent(`Hello GQ Cars! 🚗

I'd like to book a ride with your SIA licensed security drivers.

📍 Pickup: [Your location]
📍 Drop-off: [Your destination]  
📅 Date: [Today/Tomorrow/Date]
🕘 Time: [Preferred time]
👥 Passengers: [Number of people]

Please provide:
✅ Quote with 50% first-ride discount
✅ Available driver
✅ Estimated arrival time

Thank you!`)
    
    setTimeout(() => {
      window.open(`https://wa.me/447407655203?text=${whatsappMessage}`, '_blank')
    }, 1500)
  }

  const handleViewPricing = () => {
    addMessage(`💷 TRANSPARENT PRICING

🚗 GQ STANDARD - £6.50/mile
• SIA licensed security driver
• Professional vehicles
• GPS tracking included

⭐ GQ PREMIUM - £8.50/mile  
• Enhanced comfort vehicles
• Business amenities
• Priority service

👑 GQ EXECUTIVE - £10.50/mile
• Luxury vehicles only
• Advanced security protocols
• Concierge-level service

👥 GQ XL GROUP - £7.20/mile
• 5-8 passenger vehicles
• Extra luggage space
• Group booking discounts

✈️ AIRPORT TRANSFERS:
• Heathrow: From £140
• Gatwick: From £170
• Stansted: From £190
• Luton: From £160

🎉 50% OFF FIRST RIDE for new customers!`, true, [
      { id: 'book-standard', text: '📞 Book Standard Service', action: 'call' },
      { id: 'book-executive', text: '👑 Book Executive Service', action: 'call' },
      { id: 'airport-booking', text: '✈️ Book Airport Transfer', action: 'whatsapp-booking' }
    ])
  }

  const handleAirportInfo = () => {
    addMessage(`✈️ AIRPORT TRANSFER SPECIALISTS

🛫 ALL LONDON AIRPORTS COVERED:

Heathrow: £140 (45-60 min)
Gatwick: £170 (60-75 min)
Stansted: £190 (75-90 min)  
Luton: £160 (60-75 min)
City: £120 (30-45 min)

✅ INCLUDED:
🛡️ SIA licensed security driver
📱 Live flight tracking
🚗 Meet & greet service
💼 Luggage assistance
⏰ 1 hour FREE waiting time

🎉 50% OFF first airport transfer!`, true, [
      { id: 'book-airport', text: '📞 Book Airport Transfer', action: 'call' },
      { id: 'whatsapp-airport', text: '💬 WhatsApp Airport Details', action: 'whatsapp-booking' },
      { id: 'emergency-airport', text: '🚨 Emergency Airport Booking', action: 'emergency-booking' }
    ])
  }

  const handleEmergencyBooking = () => {
    addMessage(`🚨 EMERGENCY BOOKING ACTIVATED

For URGENT transport needs:

📞 CALL NOW: 07407 655 203
⏰ Response: 5-15 minutes
🛡️ SIA licensed driver dispatched
📍 Live GPS tracking provided

Emergency situations we handle:
🏥 Medical appointments
🚨 Security concerns  
✈️ Last-minute flights
🏢 Business emergencies`, true, [
      { id: 'emergency-call', text: '🚨 CALL EMERGENCY LINE', action: 'call' },
      { id: 'emergency-whatsapp', text: '💬 Emergency WhatsApp', action: 'whatsapp-booking' }
    ])
  }

  const handleSecurityAssessment = () => {
    addMessage('🛡️ Taking you to our Security Assessment tool...', true)
    
    setTimeout(() => {
      // Close widget and scroll to assessment
      handleMinimize()
      setTimeout(() => {
        const assessmentElement = document.querySelector('[data-security-assessment]') || 
                                document.querySelector('.security-assessment') ||
                                document.querySelector('[data-quote-widget]')
        if (assessmentElement) {
          assessmentElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        } else {
          // If element not found, just scroll to top of page
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 500)
    }, 1000)
  }

  const handleDefault = () => {
    addMessage('I\'m here to help with GQ Cars bookings and information. What would you like to do?', true, [
      { id: 'book-ride', text: '🚗 Book a Ride', action: 'book' },
      { id: 'get-info', text: '💷 Get Pricing', action: 'view-pricing' },
      { id: 'speak-human', text: '📞 Speak to Human', action: 'call' }
    ])
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
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 relative group"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Notification Badge */}
            {!isMinimized && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                1
              </div>
            )}
            {/* Floating Message */}
            {!isMinimized && (
              <div className="absolute bottom-full right-0 mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                💬 Quick booking help available!
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-yellow-500"></div>
              </div>
            )}
          </button>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className={`fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ${
          isMaximized 
            ? 'inset-4 md:inset-8' 
            : 'bottom-6 right-6 w-80 sm:w-96 h-96 sm:h-[500px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-black rounded-full flex items-center justify-center p-1">
                <GQCarsLogo className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base">GQ CARS LTD</h3>
                <p className="text-xs opacity-90">Typically replies instantly</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleMaximize}
                className="text-black hover:bg-black/10 p-2 rounded-full transition-colors"
                title={isMaximized ? 'Minimize' : 'Maximize'}
              >
                {isMaximized ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
              <button
                onClick={handleMinimize}
                className="text-black hover:bg-black/10 p-2 rounded-full transition-colors"
                title="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50 messages-container">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className="max-w-xs sm:max-w-sm">
                  <div
                    className={`p-3 sm:p-4 rounded-2xl shadow-sm ${
                      message.isBot
                        ? 'bg-white text-gray-800 border border-gray-100'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-medium'
                    }`}
                  >
                    <div className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                      message.isBot ? 'text-gray-800' : 'text-black'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                  
                  {/* Options Buttons */}
                  {message.options && (
                    <div className="mt-2 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black text-sm font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-between group transform hover:scale-[1.02]"
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
            
            {/* Invisible div for auto-scrolling */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Footer */}
          <div className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
            <div className="flex space-x-2">
              <button
                onClick={() => handleOptionClick({ id: 'quick-call', text: '📞 Call Now', action: 'call' })}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs sm:text-sm font-bold py-2 sm:py-3 px-3 rounded-lg flex items-center justify-center space-x-1 transition-colors"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Call</span>
              </button>
              <button
                onClick={() => handleOptionClick({ id: 'quick-book', text: '🚗 Book', action: 'book' })}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black text-xs sm:text-sm font-bold py-2 sm:py-3 px-3 rounded-lg flex items-center justify-center space-x-1 transition-all transform hover:scale-[1.02]"
              >
                <Car className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Book</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
