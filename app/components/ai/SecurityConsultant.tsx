'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Bot, User, Send, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

interface Message {
  id: string
  type: 'user' | 'ai' | 'system'
  content: string
  timestamp: Date
  recommendations?: string[]
  urgency?: 'low' | 'medium' | 'high' | 'critical'
}

interface SecurityProfile {
  threatLevel: 'low' | 'medium' | 'high' | 'critical'
  clientType: 'individual' | 'corporate' | 'celebrity' | 'government'
  serviceRecommendation: string[]
  estimatedCost: string
  urgency: boolean
}

const SecurityConsultant = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [securityProfile, setSecurityProfile] = useState<SecurityProfile | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      const welcomeMessage: Message = {
        id: '1',
        type: 'ai',
        content: "Hello! I'm your AI Security Consultant. I can help assess your security needs, recommend appropriate services, and provide instant quotes. What type of protection are you looking for?",
        timestamp: new Date(),
        recommendations: [
          "Personal protection for executives",
          "Event security planning",
          "Corporate security assessment",
          "Emergency protection services"
        ]
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const analyzeSecurityNeeds = (userMessage: string): SecurityProfile => {
    const message = userMessage.toLowerCase()
    
    // Simple AI logic for demonstration
    let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low'
    let clientType: 'individual' | 'corporate' | 'celebrity' | 'government' = 'individual'
    let urgency = false
    let serviceRecommendation: string[] = []
    
    // Threat level analysis
    if (message.includes('threat') || message.includes('danger') || message.includes('urgent')) {
      threatLevel = 'high'
      urgency = true
    } else if (message.includes('corporate') || message.includes('executive')) {
      threatLevel = 'medium'
    }
    
    // Client type detection
    if (message.includes('company') || message.includes('corporate') || message.includes('business')) {
      clientType = 'corporate'
    } else if (message.includes('celebrity') || message.includes('famous') || message.includes('public figure')) {
      clientType = 'celebrity'
      threatLevel = 'high'
    }
    
    // Service recommendations
    if (message.includes('event') || message.includes('wedding') || message.includes('party')) {
      serviceRecommendation = ['Event Security', 'VIP Transport', 'Venue Assessment']
    } else if (message.includes('travel') || message.includes('transport')) {
      serviceRecommendation = ['Private Hire', 'Route Security', 'Close Protection']
    } else if (message.includes('home') || message.includes('residence')) {
      serviceRecommendation = ['Residential Security', 'Perimeter Protection', 'Emergency Response']
    } else {
      serviceRecommendation = ['Close Protection', 'Risk Assessment', '24/7 Security']
    }
    
    const estimatedCost = generateEstimate(clientType, threatLevel, serviceRecommendation.length)
    
    return {
      threatLevel,
      clientType,
      serviceRecommendation,
      estimatedCost,
      urgency
    }
  }

  const generateEstimate = (clientType: string, threatLevel: string, services: number): string => {
    let base = 500 // Base daily rate
    
    if (clientType === 'corporate') base *= 1.5
    if (clientType === 'celebrity') base *= 2
    if (threatLevel === 'high') base *= 1.3
    if (threatLevel === 'critical') base *= 1.8
    
    const daily = Math.round(base * services)
    const weekly = Math.round(daily * 7 * 0.9) // 10% discount for weekly
    
    return `£${daily}/day • £${weekly}/week`
  }

  const generateAIResponse = (userMessage: string): Message => {
    const profile = analyzeSecurityNeeds(userMessage)
    setSecurityProfile(profile)
    
    let response = ""
    let recommendations: string[] = []
    
    if (profile.urgency) {
      response = `🚨 I understand this is urgent. Based on your requirements, I recommend immediate consultation with our emergency response team. I'm escalating this to a senior security expert who will contact you within 15 minutes.`
    } else {
      response = `Based on your needs, I've identified you as a ${profile.clientType} client with ${profile.threatLevel} risk level. `
      
      if (profile.clientType === 'corporate') {
        response += "For corporate clients, we recommend a comprehensive security assessment covering personnel, facilities, and operational security."
      } else if (profile.clientType === 'celebrity') {
        response += "For high-profile clients, we specialize in discrete protection that maintains your privacy while ensuring comprehensive security."
      } else {
        response += "For personal protection, we'll create a tailored security plan that fits your lifestyle and specific threat profile."
      }
      
      response += `\n\nRecommended services: ${profile.serviceRecommendation.join(', ')}\nEstimated cost: ${profile.estimatedCost}`
      
      recommendations = [
        "Schedule security assessment",
        "Get detailed quote",
        "Emergency hotline setup",
        "Speak to specialist"
      ]
    }
    
    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      recommendations,
      urgency: profile.urgency ? 'critical' : profile.threatLevel
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)
    
    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleRecommendationClick = (recommendation: string) => {
    setInputValue(recommendation)
  }

  const getUrgencyIcon = (urgency?: string) => {
    switch (urgency) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'high': return <Shield className="w-4 h-4 text-orange-500" />
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />
      default: return <CheckCircle className="w-4 h-4 text-green-500" />
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-amber-600 to-blue-600 p-4 rounded-full shadow-lg hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-slate-900 border border-amber-500/20 rounded-lg shadow-2xl w-96 h-[500px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-blue-600 p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">AI Security Consultant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-70"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-white/80 mt-1">
              Powered by GQ Intelligence • Instant recommendations
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600' : 'bg-slate-800'} p-3 rounded-lg`}>
                  <div className="flex items-center gap-2 mb-1">
                    {message.type === 'user' && <User className="w-3 h-3" />}
                    {message.urgency && getUrgencyIcon(message.urgency)}
                    <span className="text-xs text-gray-400">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-white whitespace-pre-line">{message.content}</p>
                  
                  {message.recommendations && (
                    <div className="mt-2 space-y-1">
                      {message.recommendations.map((rec, index) => (
                        <button
                          key={index}
                          onClick={() => handleRecommendationClick(rec)}
                          className="block w-full text-left text-xs bg-slate-700 hover:bg-slate-600 p-2 rounded transition-colors"
                        >
                          {rec}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Describe your security needs..."
                className="flex-1 bg-slate-800 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-r from-amber-600 to-blue-600 p-2 rounded disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecurityConsultant