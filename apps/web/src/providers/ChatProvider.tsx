import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AIMessage, ConversationState, SecurityAssessment } from '@/types/ai'
import { useSession } from 'next-auth/react'

interface ChatContextType {
  conversation: ConversationState | null
  isLoading: boolean
  sendMessage: (message: string) => Promise<void>
  getSecurityAssessment: (pickup: string, dropoff: string) => Promise<SecurityAssessment | null>
  clearConversation: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession()
  const [conversation, setConversation] = useState<ConversationState | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Initialize conversation when session changes
    if (session?.user) {
      setConversation({
        id: `chat-${Date.now()}`,
        messages: [],
        context: {
          conversationId: `chat-${Date.now()}`,
          messages: [],
          userProfile: {
            id: session.user.id,
            name: session.user.name || 'Guest',
            preferences: {
              savedLocations: {},
              communicationPreferences: {
                language: 'en',
                notifications: true,
                contactMethod: 'chat'
              }
            },
            bookingHistory: []
          },
          systemState: {
            availableDrivers: [],
            currentDemand: 'low',
            pricing: {
              baseRates: {},
              securityPremium: {},
              demandMultiplier: 1
            }
          }
        }
      })
    }
  }, [session])

  const sendMessage = async (message: string) => {
    if (!conversation) return

    setIsLoading(true)
    try {
      // Add user message
      const userMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: message,
        timestamp: new Date()
      }

      setConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, userMessage]
      }))

      // Get AI response
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          conversationId: conversation.id
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()

      // Update conversation with AI response
      setConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, data.message],
        context: {
          ...prev!.context,
          ...data.context
        }
      }))

      // Handle any actions from the AI
      if (data.actions?.length > 0) {
        for (const action of data.actions) {
          switch (action.type) {
            case 'quote':
              if (action.payload.locations) {
                const assessment = await getSecurityAssessment(
                  action.payload.locations.pickup,
                  action.payload.locations.dropoff
                )
                if (assessment) {
                  setConversation(prev => ({
                    ...prev!,
                    securityAssessment: assessment
                  }))
                }
              }
              break
            // Add more action handlers as needed
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      // Add error message to conversation
      const errorMessage: AIMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      }
      setConversation(prev => ({
        ...prev!,
        messages: [...prev!.messages, errorMessage]
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getSecurityAssessment = async (pickup: string, dropoff: string) => {
    try {
      const response = await fetch('/api/ai/security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickup,
          dropoff,
          datetime: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get security assessment')
      }

      const { assessment } = await response.json()
      return assessment
    } catch (error) {
      console.error('Error getting security assessment:', error)
      return null
    }
  }

  const clearConversation = () => {
    if (!session?.user) return

    setConversation({
      id: `chat-${Date.now()}`,
      messages: [],
      context: {
        conversationId: `chat-${Date.now()}`,
        messages: [],
        userProfile: {
          id: session.user.id,
          name: session.user.name || 'Guest',
          preferences: {
            savedLocations: {},
            communicationPreferences: {
              language: 'en',
              notifications: true,
              contactMethod: 'chat'
            }
          },
          bookingHistory: []
        },
        systemState: {
          availableDrivers: [],
          currentDemand: 'low',
          pricing: {
            baseRates: {},
            securityPremium: {},
            demandMultiplier: 1
          }
        }
      }
    })
  }

  const value = {
    conversation,
    isLoading,
    sendMessage,
    getSecurityAssessment,
    clearConversation
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}