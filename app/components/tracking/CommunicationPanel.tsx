'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Phone, Mic, MicOff, Globe, MessageSquare, Shield } from 'lucide-react'
import { useTrackingStore } from '../../stores/trackingStore'

interface MessageTemplate {
  id: string
  category: string
  message: string
  translations: Record<string, string>
}

export default function CommunicationPanel() {
  const [newMessage, setNewMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [templates, setTemplates] = useState<MessageTemplate[]>([])
  const [showTemplates, setShowTemplates] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const {
    messages,
    currentTrip,
    currentDriver,
    addMessage,
    markMessageAsRead,
    isConnected
  } = useTrackingStore()

  useEffect(() => {
    // Load message templates
    fetch('/api/communication', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_templates' })
    })
    .then(res => res.json())
    .then(data => setTemplates(data.templates || []))
    .catch(err => console.error('Failed to load templates:', err))
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (content: string, type: 'text' | 'template' = 'text') => {
    if (!content.trim() || !currentTrip) return

    const message = {
      id: `msg-${Date.now()}`,
      tripId: currentTrip.tripId,
      senderId: 'customer',
      receiverId: currentDriver?.id || 'driver',
      content,
      type,
      timestamp: Date.now(),
      encrypted: true,
      delivered: false,
      read: false
    }

    addMessage(message)
    setNewMessage('')

    // Send to API
    try {
      const response = await fetch('/api/communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_message',
          data: message
        })
      })
      
      const result = await response.json()
      console.log('Message sent:', result)
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  const handleVoiceRecording = async () => {
    if (!isRecording) {
      setIsRecording(true)
      // Start recording logic would go here
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsRecording(false)
        handleSendVoiceMessage()
      }, 3000)
    } else {
      setIsRecording(false)
    }
  }

  const handleSendVoiceMessage = async () => {
    if (!currentTrip) return

    try {
      const response = await fetch('/api/communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_voice_message',
          data: {
            tripId: currentTrip.tripId,
            senderId: 'customer',
            receiverId: currentDriver?.id || 'driver',
            audioBlob: 'mock_audio_data'
          }
        })
      })
      
      const result = await response.json()
      
      const voiceMessage = {
        id: result.messageId,
        tripId: currentTrip.tripId,
        senderId: 'customer',
        receiverId: currentDriver?.id || 'driver',
        content: '🎤 Voice message (15s)',
        type: 'voice' as const,
        timestamp: Date.now(),
        encrypted: true,
        delivered: true,
        read: false
      }
      
      addMessage(voiceMessage)
    } catch (error) {
      console.error('Failed to send voice message:', error)
    }
  }

  const handleTemplateSelect = (template: MessageTemplate) => {
    const message = selectedLanguage === 'en' 
      ? template.message 
      : template.translations[selectedLanguage] || template.message
    
    handleSendMessage(message, 'template')
    setShowTemplates(false)
  }

  const handlePhoneCall = async () => {
    try {
      const response = await fetch('/api/communication', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'initiate_call',
          data: {
            tripId: currentTrip?.tripId,
            callType: 'masked'
          }
        })
      })
      
      const result = await response.json()
      console.log('Call initiated:', result)
      
      // Open masked number
      window.open(`tel:${result.maskedNumbers.driver}`, '_self')
    } catch (error) {
      console.error('Failed to initiate call:', error)
    }
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex flex-col h-96 bg-gray-800/50 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gq-gold" />
          <h3 className="font-semibold">Communication</h3>
          <Shield className="w-4 h-4 text-green-400" title="End-to-end encrypted" />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
          
          {/* Call Button */}
          <button
            onClick={handlePhoneCall}
            className="p-2 bg-green-600 hover:bg-green-500 rounded-full transition-colors"
            title="Call Driver (Masked)"
          >
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No messages yet</p>
            <p className="text-sm">Start a conversation with your driver</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === 'customer' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.senderId === 'customer'
                    ? 'bg-gq-gold text-black'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1 text-xs opacity-70">
                  <span>{formatTime(message.timestamp)}</span>
                  {message.encrypted && <Shield className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Connection Status */}
      <div className="px-4 py-2 bg-gray-700/50">
        <div className={`flex items-center gap-2 text-xs ${
          isConnected ? 'text-green-400' : 'text-red-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'
          }`} />
          {isConnected ? 'Connected • Messages encrypted' : 'Connecting...'}
        </div>
      </div>

      {/* Quick Templates */}
      {showTemplates && (
        <div className="border-t border-gray-700 p-4 max-h-32 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template)}
                className="text-left p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              >
                {selectedLanguage === 'en' 
                  ? template.message 
                  : template.translations[selectedLanguage] || template.message}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            title="Quick Messages"
          >
            <Globe className="w-4 h-4" />
          </button>
          
          <div className="flex-1 flex items-center gap-2 bg-gray-700 rounded-lg">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(newMessage)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent px-3 py-2 outline-none"
            />
            
            <button
              onClick={handleVoiceRecording}
              className={`p-2 rounded-full transition-colors ${
                isRecording 
                  ? 'bg-red-600 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-500'
              }`}
              title={isRecording ? 'Recording...' : 'Voice Message'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>
          
          <button
            onClick={() => handleSendMessage(newMessage)}
            disabled={!newMessage.trim()}
            className="p-2 bg-gq-gold text-black rounded-full hover:bg-gq-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}