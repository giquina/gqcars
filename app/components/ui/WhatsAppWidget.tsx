'use client'

import { useState, useEffect, useRef } from 'react'
import { 
  MessageCircle, X, Phone, Calendar, Car, MapPin, Clock, Shield, Star, 
  ChevronRight, Send, Sparkles, Zap, ArrowLeft, Info, CreditCard,
  CheckCircle, Heart, Building2, Home, Users, Globe
} from 'lucide-react'
import GQCarsLogo from './GQCarsLogo'
import { getAllServices, getServiceById, ServiceConfig, FollowUpQuestion, FollowUpOption } from '@/lib/services-config'

interface ChatMessage {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  type?: 'text' | 'service-card' | 'feature-list' | 'options' | 'pricing' | 'input-form'
  serviceData?: ServiceConfig
  options?: ChatOption[]
  features?: string[]
  pricing?: { from: number; currency: string; unit: string }
  inputForm?: {
    type: 'signup' | 'callback' | 'contact'
    fields: string[]
    title: string
    description: string
  }
  metadata?: any
}

interface ChatOption {
  id: string
  text: string
  action: string
  icon?: any
  serviceId?: string
  metadata?: any
}

interface ChatState {
  currentService?: ServiceConfig
  currentFlow: string
  followUpStack: FollowUpQuestion[]
  userProfile: {
    name?: string
    email?: string
    phone?: string
    isRegistered: boolean
    preferredContact?: 'whatsapp' | 'call' | 'email'
  }
  userPreferences: {
    selectedService?: string
    location?: string
    timing?: string
  }
}

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [chatState, setChatState] = useState<ChatState>({
    currentFlow: 'welcome',
    followUpStack: [],
    userProfile: {
      isRegistered: false
    },
    userPreferences: {}
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Show widget after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      // Auto-open after showing for 3 seconds
      setTimeout(() => {
        if (!isOpen && !isMinimized) {
          setIsOpen(true)
        }
      }, 3000)
    }, 30000) // 30 seconds

    return () => clearTimeout(timer)
  }, [])

  // Initialize chat when widget opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat()
    }
  }, [isOpen, messages.length])

  const handleMinimize = () => {
    setIsOpen(false)
    setIsMinimized(true)
  }

  const handleOpen = () => {
    console.log('Opening widget...', { messagesLength: messages.length })
    setIsOpen(true)
    setIsMinimized(false)
  }

  const initializeChat = () => {
    console.log('Initializing chat...', { chatState, messages: messages.length })
    const services = getAllServices()
    const isRegistered = chatState.userProfile.isRegistered
    const userName = chatState.userProfile.name
    
    const welcomeMessage: ChatMessage = {
      id: 'welcome-1',
      text: isRegistered && userName ? 
        `👋 Welcome back, ${userName}! 

Your personal GQ CARS Ltd assistant is ready to help with your security, transport & events needs.

🎯 **Your Curated Experience**
• Personalized service recommendations
• Priority booking status
• Direct access to our specialist team

What would you like to do today?` :
        `👋 Welcome to GQ CARS Ltd! 

Your premier security, transport & events specialist across London & South East England.

🌟 **Get Your Curated Experience**
Sign up for personalized service, priority bookings, and direct specialist access.

🛡️ Security Services • 🚗 Luxury Transport • 🎉 Event Management`,
      isBot: true,
      timestamp: new Date(),
      type: 'text',
      options: isRegistered ? [
        { id: 'browse-services', text: '🔍 Browse All Services', action: 'show-services', icon: Car },
        { id: 'quick-booking', text: '⚡ Quick Booking', action: 'quick-book', icon: Zap },
        { id: 'request-callback', text: '📞 Request Callback', action: 'request-callback', icon: Phone },
        { id: 'emergency', text: '🚨 Emergency Service', action: 'emergency', icon: Phone }
      ] : [
        { id: 'signup', text: '⭐ Sign Up (FREE)', action: 'start-signup', icon: Star },
        { id: 'browse-services', text: '� Browse Services', action: 'show-services', icon: Car },
        { id: 'quick-contact', text: '📞 Quick Contact', action: 'quick-contact', icon: Phone },
        { id: 'emergency', text: '🚨 Emergency', action: 'emergency', icon: Phone }
      ]
    }
    console.log('Setting welcome message:', welcomeMessage)
    setMessages([welcomeMessage])
  }

  const addMessage = (
    text: string, 
    isBot: boolean = false, 
    options?: ChatOption[], 
    type: 'text' | 'service-card' | 'feature-list' | 'options' | 'pricing' | 'input-form' = 'text',
    additionalData?: any
  ) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      isBot,
      timestamp: new Date(),
      type,
      options,
      ...additionalData
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

    // Update chat state if service selected
    if (option.serviceId) {
      const service = getServiceById(option.serviceId)
      setChatState(prev => ({ ...prev, currentService: service }))
    }

          // Simulate typing and respond based on action
      simulateTyping(() => {
        switch (option.action) {
          case 'start-signup':
            startSignupFlow()
            break
          case 'request-callback':
            requestCallback()
            break
          case 'quick-contact':
            quickContact()
            break
          case 'show-services':
            showAllServices()
            break
          case 'quick-book':
            showQuickBooking()
            break
          case 'emergency':
            handleEmergency()
            break
          case 'quote-wizard':
            startQuoteWizard()
            break
          case 'service-detail':
            showServiceDetail(option.serviceId!)
            break
          case 'service-features':
            showServiceFeatures(option.serviceId!)
            break
          case 'service-pricing':
            showServicePricing(option.serviceId!)
            break
          case 'follow-up':
            handleFollowUpQuestion(option.metadata)
            break
          case 'book-service':
            initiateBooking(option.serviceId!)
            break
          case 'call':
            handleCall()
            break
          case 'contact':
            handleContactHuman(option.serviceId)
            break
          case 'back':
            handleBack()
            break
          default:
            handleDefault()
        }
      })
  }

  const startSignupFlow = () => {
    addMessage(
      `🌟 **Join GQ CARS Ltd Premium Experience**

Get exclusive benefits when you sign up:

✅ **Personalized Service** - Curated recommendations
✅ **Priority Booking** - Skip the queue
✅ **Direct Specialist Access** - Personal account manager  
✅ **Exclusive Offers** - Member-only discounts
✅ **24/7 Priority Support** - VIP assistance

Ready to upgrade your experience?`,
      true,
      [],
      'input-form',
      {
        inputForm: {
          type: 'signup',
          fields: ['name', 'email'],
          title: 'Create Your Premium Account',
          description: 'Just your name and email to get started'
        }
      }
    )
  }

  const requestCallback = () => {
    const userName = chatState.userProfile.name || 'there'
    addMessage(
      `📞 **Request Priority Callback**

Hi ${userName}! I'll arrange for one of our specialists to call you back at your convenience.

⏰ **Response Times:**
• Standard: Within 2 hours
• Priority: Within 30 minutes  
• Emergency: Within 5 minutes

Please provide your preferred contact details:`,
      true,
      [],
      'input-form',
      {
        inputForm: {
          type: 'callback',
          fields: ['phone', 'time'],
          title: 'Schedule Your Callback',
          description: 'Phone number and preferred time'
        }
      }
    )
  }

  const quickContact = () => {
    addMessage(
      `📱 **Quick Contact Options**

Get in touch with GQ CARS Ltd instantly:

🔥 **Fast Track Options:**`,
      true,
      [
        { id: 'signup-first', text: '⭐ Sign Up First (Recommended)', action: 'start-signup', icon: Star },
        { id: 'whatsapp-direct', text: '💬 WhatsApp Direct', action: 'contact', icon: MessageCircle },
        { id: 'call-now', text: '📞 Call Now', action: 'call', icon: Phone },
        { id: 'email-us', text: '📧 Email Us', action: 'contact', metadata: 'email', icon: CreditCard }
      ]
    )
  }

  const handleFormSubmit = (formType: 'signup' | 'callback' | 'contact', data: any) => {
    if (formType === 'signup') {
      // Update user profile
      setChatState(prev => ({
        ...prev,
        userProfile: {
          ...prev.userProfile,
          name: data.name,
          email: data.email,
          isRegistered: true
        }
      }))
      
      addMessage(
        `🎉 Welcome to GQ CARS Ltd Premium, ${data.name}!

Your account has been created successfully. You now have access to:

✅ **Personalized Service** - Custom recommendations
✅ **Priority Booking Status** - Skip standard queues  
✅ **Direct Specialist Access** - Your personal account manager
✅ **Member Exclusive Offers** - Special pricing & promotions

What would you like to do first?`,
        true,
        [
          { id: 'browse-services', text: '🔍 Browse All Services', action: 'show-services', icon: Car },
          { id: 'quick-booking', text: '⚡ Priority Booking', action: 'quick-book', icon: Zap },
          { id: 'request-callback', text: '📞 Request Callback', action: 'request-callback', icon: Phone }
        ]
      )
    } else if (formType === 'callback') {
      addMessage(
        `📞 **Callback Request Confirmed**

Thank you! Your callback has been scheduled:

📱 **Phone:** ${data.phone}
⏰ **Time:** ${data.time}
🎯 **Priority Status:** ${chatState.userProfile.isRegistered ? 'VIP Member' : 'Standard'}

Our specialist will call you ${data.time === 'asap' ? 'within 30 minutes' : `during your preferred ${data.time} slot`}.

You'll receive a confirmation SMS shortly.`,
        true,
        [
          { id: 'browse-services', text: '🔍 Browse Services', action: 'show-services', icon: Car },
          { id: 'contact-whatsapp', text: '💬 WhatsApp Chat', action: 'contact', icon: MessageCircle }
        ]
      )
    }
  }

  const showAllServices = () => {
    const services = getAllServices()
    
         addMessage(
       `🌟 **GQ CARS LTD Complete Service Portfolio**

Professional security, luxury transport & premium events management across London & South East England.

🛡️ All services include SIA-licensed specialists
🚗 Premium vehicle fleet available
🎯 Tailored solutions for every need

Select any service to explore:`, 
       true, 
       services.map(service => ({
         id: service.id,
         text: `${service.emoji} ${service.name} (from ${service.pricing.currency}${service.pricing.from})`,
         action: 'service-detail',
         serviceId: service.id,
         icon: service.icon
       })),
       'options'
     )
  }

  const showServiceDetail = (serviceId: string) => {
    const service = getServiceById(serviceId)
    if (!service) return

    // Service overview card
    addMessage(
      `${service.emoji} **${service.name}**

${service.description}

**Starting from ${service.pricing.currency}${service.pricing.from} ${service.pricing.unit}**`,
      true,
      [],
      'service-card',
      { serviceData: service }
    )

    // Quick facts
    setTimeout(() => {
      addMessage(
        `**Quick Facts:**
${service.quickFacts.map(fact => `• ${fact}`).join('\n')}`,
        true,
        [
          { id: 'features', text: '✨ View Features', action: 'service-features', serviceId: service.id, icon: Sparkles },
          { id: 'pricing', text: '💷 Pricing Details', action: 'service-pricing', serviceId: service.id, icon: CreditCard },
          { id: 'book', text: '🚗 Book Now', action: 'book-service', serviceId: service.id, icon: Car },
          { id: 'back', text: '↩️ Back to Services', action: 'show-services', icon: ArrowLeft }
        ],
        'text'
      )
    }, 800)

    // Start follow-up questions
    if (service.followUpQuestions.length > 0) {
      setTimeout(() => {
        handleFollowUpQuestion(service.followUpQuestions[0])
      }, 1600)
    }
  }

  const showServiceFeatures = (serviceId: string) => {
    const service = getServiceById(serviceId)
    if (!service) return

    addMessage(
      `**${service.name} Features:**`,
      true,
      [],
      'feature-list',
      { features: service.features }
    )

    setTimeout(() => {
      addMessage(
        'Would you like to proceed with booking or need more information?',
        true,
        [
          { id: 'book', text: '🚗 Book This Service', action: 'book-service', serviceId: service.id, icon: Car },
          { id: 'pricing', text: '💷 View Pricing', action: 'service-pricing', serviceId: service.id, icon: CreditCard },
          { id: 'questions', text: '❓ Ask Questions', action: 'contact', serviceId: service.id, icon: MessageCircle },
          { id: 'back', text: '↩️ Back to Service', action: 'service-detail', serviceId: service.id, icon: ArrowLeft }
        ]
      )
    }, 1000)
  }

  const showServicePricing = (serviceId: string) => {
    const service = getServiceById(serviceId)
    if (!service) return

    let pricingText = `**${service.name} Pricing:**

Base Price: ${service.pricing.currency}${service.pricing.from} ${service.pricing.unit}`

    if (service.subServices && service.subServices.length > 0) {
      pricingText += '\n\n**Specific Options:**'
      service.subServices.forEach(sub => {
        pricingText += `\n• ${sub.name}: ${sub.pricing.currency}${sub.pricing.from} ${sub.pricing.unit}`
      })
    }

    pricingText += '\n\n💡 **Special Offer: 50% OFF your first booking!**'

    addMessage(
      pricingText,
      true,
      [
        { id: 'book', text: '🚗 Book Now (50% OFF)', action: 'book-service', serviceId: service.id, icon: Car },
        { id: 'quote', text: '📋 Get Custom Quote', action: 'contact', serviceId: service.id, icon: CreditCard },
        { id: 'back', text: '↩️ Back to Service', action: 'service-detail', serviceId: service.id, icon: ArrowLeft }
      ],
      'pricing'
    )
  }

  const handleFollowUpQuestion = (question: FollowUpQuestion) => {
    addMessage(
      question.question,
      true,
      question.options.map(option => ({
        id: option.id,
        text: option.text,
        action: 'follow-up',
        metadata: option
      })),
      'options'
    )
  }

  const showQuickBooking = () => {
    const popularServices = getAllServices().slice(0, 4) // Get top 4 services
    
    addMessage(
      `⚡ **Quick Booking** - Choose your service:

Most popular services for immediate booking:`,
      true,
      popularServices.map(service => ({
        id: service.id,
        text: `${service.emoji} ${service.name} - ${service.pricing.currency}${service.pricing.from}`,
        action: 'book-service',
        serviceId: service.id,
        icon: service.icon
      }))
    )
  }

  const startQuoteWizard = () => {
    addMessage(
      `💷 **Quote Wizard** - Let's find the perfect service for you!

What type of service do you need?`,
      true,
      [
        { id: 'transport', text: '🚗 Transport Services', action: 'quote-category', metadata: 'transport' },
        { id: 'security', text: '🛡️ Security Services', action: 'quote-category', metadata: 'security' },
        { id: 'events', text: '🎉 Event Services', action: 'quote-category', metadata: 'events' },
        { id: 'not-sure', text: '🤔 Not Sure', action: 'show-services' }
      ]
    )
  }

  const initiateBooking = (serviceId: string) => {
    const service = getServiceById(serviceId)
    if (!service) return

    addMessage(
      `🎉 **Booking ${service.name}**

Great choice! To complete your booking, I'll connect you with our professional booking team who will:

✅ Confirm your specific requirements
✅ Provide exact quote with 50% OFF
✅ Assign your SIA-licensed driver
✅ Send booking confirmation

Ready to proceed?`,
      true,
      [
        { id: 'whatsapp', text: '💬 Continue on WhatsApp', action: 'contact', serviceId: service.id, icon: MessageCircle },
        { id: 'call', text: '📞 Call to Book', action: 'call', icon: Phone },
        { id: 'email', text: '📧 Email Quote', action: 'contact', serviceId: service.id, metadata: 'email' }
      ]
    )
  }

  const handleEmergency = () => {
    addMessage(
      `🚨 **EMERGENCY SERVICE ACTIVATED** 🚨

For immediate security transport assistance:

⏰ **Response Time:** 5-15 minutes
🛡️ **SIA-licensed driver** will be dispatched
📍 **Live GPS tracking** provided
🚗 **Premium secure vehicle**

**Emergency Contact:**`,
      true,
      [
        { id: 'emergency-call', text: '🚨 CALL EMERGENCY LINE NOW', action: 'call', icon: Phone },
        { id: 'emergency-whatsapp', text: '⚡ Emergency WhatsApp', action: 'contact', metadata: 'emergency' },
        { id: 'emergency-location', text: '📍 Share Location', action: 'contact', metadata: 'location' }
      ]
    )
  }

  const handleCall = () => {
    addMessage('📞 Connecting you to our 24/7 professional line...', true)
    setTimeout(() => {
      window.open('tel:07407655203', '_self')
    }, 1000)
  }

  const handleContactHuman = (serviceId?: string, metadata?: string) => {
    const service = serviceId ? getServiceById(serviceId) : null
    
         let whatsappMessage = `Hello GQ CARS LTD! 🚗

I'm interested in your professional security, transport & events services.`
    
    if (service) {
      whatsappMessage += ` I was looking at your ${service.name} service and would like to learn more.`
    }
    
    if (metadata === 'emergency') {
      whatsappMessage += ` This is an EMERGENCY request - I need immediate assistance.`
    }
    
    whatsappMessage += `

Please help me with:
• Booking and availability
• Custom quote
• Service details

Thank you!`
    
    addMessage(
      `Perfect! Connecting you with our professional team...

They'll help you with booking, pricing, and any questions you have. Our team typically responds within 2 minutes!`,
      true,
      [
        { id: 'open-whatsapp', text: '💬 Open WhatsApp Chat', action: 'open-whatsapp', metadata: whatsappMessage }
      ]
    )
  }

  const handleBack = () => {
    showAllServices()
  }

     const handleDefault = () => {
     addMessage(
       'I\'m here to help with GQ CARS LTD\'s professional security, transport & events services. How can I assist you?',
       true,
       [
         { id: 'services', text: '🔍 Browse Services', action: 'show-services' },
         { id: 'booking', text: '🚗 Quick Booking', action: 'quick-book' },
         { id: 'quote', text: '💷 Get Quote', action: 'quote-wizard' },
         { id: 'human', text: '👤 Speak to Human', action: 'contact' }
       ]
     )
   }

  const handleSpecialAction = (action: string, metadata?: any) => {
    switch (action) {
             case 'open-whatsapp':
         const message = metadata || `Hello GQ CARS LTD! I'm interested in your professional security, transport & events services.`
         const encodedMessage = encodeURIComponent(message)
         window.open(`https://wa.me/447407655203?text=${encodedMessage}`, '_blank')
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
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 relative group animate-pulse"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Enhanced Notification Badge */}
            {!isMinimized && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                AI
              </div>
            )}
                         {/* Enhanced Floating Message */}
             {!isMinimized && (
               <div className="absolute bottom-full right-0 mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-105">
                 🚗 Security • Transport • Events
                 <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-yellow-500"></div>
               </div>
             )}
          </button>
        </div>
      )}

      {/* Enhanced Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Enhanced Header */}
          <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 text-black p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center p-2 shadow-lg">
                <GQCarsLogo className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center">
                  GQ CARS Ltd
                  <Sparkles className="w-4 h-4 ml-1 animate-pulse" />
                </h3>
                <p className="text-xs opacity-90 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                  Security • Transport • Events • AI Assistant
                </p>
              </div>
            </div>
            <button
              onClick={handleMinimize}
              className="text-black hover:bg-black/10 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

                     {/* Enhanced Messages Area */}
           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
             {messages.length === 0 ? (
               <div className="flex justify-center items-center h-full">
                 <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 text-center">
                   <div className="flex items-center justify-center space-x-2 mb-3">
                     <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                     <span className="text-sm text-gray-600">Loading GQ CARS Ltd assistant...</span>
                   </div>
                   <button
                     onClick={initializeChat}
                     className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black text-xs font-bold py-2 px-3 rounded-lg transition-all"
                   >
                     Start Chat
                   </button>
                 </div>
               </div>
             ) : null}
             {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className="max-w-sm">
                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-2xl ${
                      message.isBot
                        ? 'bg-white text-gray-800 shadow-md border border-gray-100'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                    }`}
                  >
                    {/* Service Card Display */}
                    {message.type === 'service-card' && message.serviceData && (
                      <div className="mb-3">
                        <div className="flex items-center mb-2">
                          <message.serviceData.icon className="w-6 h-6 text-yellow-600 mr-2" />
                          <span className="font-bold text-lg">{message.serviceData.name}</span>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg">
                          <p className="text-sm text-gray-700 mb-2">{message.serviceData.shortDescription}</p>
                          <div className="flex items-center text-lg font-bold text-orange-600">
                            <CreditCard className="w-4 h-4 mr-1" />
                            From {message.serviceData.pricing.currency}{message.serviceData.pricing.from}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Feature List Display */}
                    {message.type === 'feature-list' && message.features && (
                      <div className="mb-3">
                        <div className="space-y-2">
                          {message.features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Input Form Display */}
                    {message.type === 'input-form' && message.inputForm && (
                      <div className="mt-4 bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-bold text-lg mb-2 text-gray-800">{message.inputForm.title}</h4>
                        <p className="text-sm text-gray-600 mb-4">{message.inputForm.description}</p>
                        <div className="space-y-3">
                          {message.inputForm.fields.includes('name') && (
                            <input
                              type="text"
                              placeholder="Your full name"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              id={`name-${message.id}`}
                            />
                          )}
                          {message.inputForm.fields.includes('email') && (
                            <input
                              type="email"
                              placeholder="Your email address"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              id={`email-${message.id}`}
                            />
                          )}
                          {message.inputForm.fields.includes('phone') && (
                            <input
                              type="tel"
                              placeholder="Your phone number"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              id={`phone-${message.id}`}
                            />
                          )}
                          {message.inputForm.fields.includes('time') && (
                            <select
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                              id={`time-${message.id}`}
                            >
                              <option value="">Select preferred time</option>
                              <option value="asap">ASAP</option>
                              <option value="morning">Morning (9AM-12PM)</option>
                              <option value="afternoon">Afternoon (12PM-5PM)</option>
                              <option value="evening">Evening (5PM-8PM)</option>
                            </select>
                          )}
                          <button
                            onClick={() => {
                              const formData: any = {}
                              message.inputForm!.fields.forEach(field => {
                                const input = document.getElementById(`${field}-${message.id}`) as HTMLInputElement | HTMLSelectElement
                                if (input) formData[field] = input.value
                              })
                              handleFormSubmit(message.inputForm!.type, formData)
                            }}
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-4 rounded-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>Submit</span>
                          </button>
                        </div>
                      </div>
                    )}

                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                  </div>
                  
                  {/* Enhanced Options Buttons */}
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            if (option.action.startsWith('open-') && option.metadata) {
                              handleSpecialAction(option.action, option.metadata)
                            } else {
                              handleOptionClick(option)
                            }
                          }}
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black text-sm font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between group shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          <span className="flex items-center">
                            {option.icon && <option.icon className="w-4 h-4 mr-2" />}
                            {option.text}
                          </span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Enhanced Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-spin" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Quick Actions Footer */}
          <div className="bg-white border-t border-gray-200 p-3">
            <div className="flex space-x-2">
              <button
                onClick={() => handleCall()}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center space-x-2 transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </button>
              <button
                onClick={() => handleOptionClick({ id: 'quick-book', text: '⚡ Quick Book', action: 'quick-book' })}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black text-xs font-bold py-3 px-3 rounded-xl flex items-center justify-center space-x-2 transition-all hover:scale-105"
              >
                <Zap className="w-4 h-4" />
                <span>Quick Book</span>
              </button>
            </div>
                         <div className="text-center mt-2">
               <p className="text-xs text-gray-500">Powered by GQ CARS LTD • SIA Licensed Specialists</p>
             </div>
          </div>
        </div>
      )}
    </>
  )
}