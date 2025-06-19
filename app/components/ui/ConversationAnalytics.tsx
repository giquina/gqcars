'use client'

import React, { useState, useEffect } from 'react'
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Phone,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { motion } from 'framer-motion'

interface AnalyticsData {
  totalConversations: number
  totalMessages: number
  averageSessionDuration: number
  escalationRate: number
  topIntents: { intent: string; count: number }[]
  languageDistribution: { language: string; percentage: number }[]
  satisfactionScore: number
  peakHours: { hour: number; conversations: number }[]
  commonQueries: string[]
  conversionRate: number
}

export default function ConversationAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalConversations: 0,
    totalMessages: 0,
    averageSessionDuration: 0,
    escalationRate: 0,
    topIntents: [],
    languageDistribution: [],
    satisfactionScore: 0,
    peakHours: [],
    commonQueries: [],
    conversionRate: 0
  })

  const [isVisible, setIsVisible] = useState(false)
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today')

  // Mock data for demonstration
  useEffect(() => {
    const mockData: AnalyticsData = {
      totalConversations: 147,
      totalMessages: 1289,
      averageSessionDuration: 4.2,
      escalationRate: 12.5,
      topIntents: [
        { intent: 'booking', count: 45 },
        { intent: 'pricing', count: 38 },
        { intent: 'airport_transfer', count: 28 },
        { intent: 'services_inquiry', count: 21 },
        { intent: 'emergency', count: 15 }
      ],
      languageDistribution: [
        { language: 'English', percentage: 78 },
        { language: 'Spanish', percentage: 12 },
        { language: 'French', percentage: 6 },
        { language: 'Arabic', percentage: 3 },
        { language: 'Russian', percentage: 1 }
      ],
      satisfactionScore: 4.6,
      peakHours: [
        { hour: 9, conversations: 15 },
        { hour: 12, conversations: 22 },
        { hour: 17, conversations: 18 },
        { hour: 20, conversations: 12 }
      ],
      commonQueries: [
        "How much does it cost to get to Heathrow?",
        "Are your drivers SIA licensed?",
        "Can I book for tonight?",
        "What's included in executive protection?",
        "Do you have vehicles available 24/7?"
      ],
      conversionRate: 23.8
    }
    setAnalyticsData(mockData)
  }, [timeRange])

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-40"
        title="View Analytics"
      >
        <BarChart3 className="w-5 h-5" />
      </button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      className="fixed top-6 right-6 w-96 bg-white rounded-lg shadow-2xl border z-40 max-h-[80vh] overflow-y-auto"
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-bold flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>AI Assistant Analytics</span>
          </h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        
        {/* Time Range Selector */}
        <div className="mt-3 flex space-x-2">
          {(['today', 'week', 'month'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-xs transition-colors ${
                timeRange === range 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-700 hover:bg-blue-500'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-600 font-medium">Conversations</p>
                <p className="text-lg font-bold text-green-800">{analyticsData.totalConversations}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-600 font-medium">Messages</p>
                <p className="text-lg font-bold text-blue-800">{analyticsData.totalMessages}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-yellow-600 font-medium">Avg Duration</p>
                <p className="text-lg font-bold text-yellow-800">{analyticsData.averageSessionDuration}m</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-600 font-medium">Conversion</p>
                <p className="text-lg font-bold text-purple-800">{analyticsData.conversionRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Top Intents */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span>Top Customer Intents</span>
          </h4>
          <div className="space-y-2">
            {analyticsData.topIntents.map((intent, index) => (
              <div key={intent.intent} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 capitalize">
                  {intent.intent.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(intent.count / analyticsData.topIntents[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{intent.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Distribution */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Language Distribution</span>
          </h4>
          <div className="space-y-2">
            {analyticsData.languageDistribution.map((lang, index) => (
              <div key={lang.language} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{lang.language}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{lang.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Performance Metrics</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Satisfaction Score</span>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <div
                      key={star}
                      className={`w-3 h-3 rounded-sm ${
                        star <= analyticsData.satisfactionScore ? 'bg-yellow-400' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{analyticsData.satisfactionScore}/5</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Escalation Rate</span>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-red-600">{analyticsData.escalationRate}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Common Queries */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Common Questions</span>
          </h4>
          <div className="space-y-2">
            {analyticsData.commonQueries.slice(0, 3).map((query, index) => (
              <div key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                "{query}"
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}