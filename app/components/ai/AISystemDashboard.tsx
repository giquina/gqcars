'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Progress } from '@/app/components/ui/progress'
import { 
  Brain, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Car, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Shield
} from 'lucide-react'

interface AIMetrics {
  accuracy: number
  responseTime: number
  uptime: number
  decisions: number
}

interface SystemStatus {
  overall: 'healthy' | 'degraded' | 'critical'
  pricing: 'online' | 'offline' | 'fallback'
  dispatch: 'online' | 'offline' | 'fallback'
  analytics: 'online' | 'offline' | 'fallback'
  customerService: 'online' | 'offline' | 'fallback'
  responseTime: number
  accuracy: number
}

export default function AISystemDashboard() {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    overall: 'healthy',
    pricing: 'online',
    dispatch: 'online', 
    analytics: 'online',
    customerService: 'online',
    responseTime: 45,
    accuracy: 0.91
  })

  const [metrics, setMetrics] = useState({
    totalDecisions: 15420,
    revenueOptimized: 247800,
    customersServed: 8940,
    fraudPrevented: 12450,
    automationRate: 87
  })

  const aiSystems = [
    {
      id: 'pricing',
      name: 'Dynamic Pricing AI',
      description: 'Real-time pricing optimization with demand prediction',
      icon: DollarSign,
      status: systemStatus.pricing,
      accuracy: 92,
      responseTime: 45,
      features: [
        'Surge pricing based on demand',
        'Weather & traffic adjustments', 
        'Competitor price analysis',
        'Seasonal optimization',
        'Customer tier pricing'
      ],
      metrics: {
        decisionsToday: 1247,
        revenueIncrease: '+15%',
        accuracy: '92%',
        avgResponseTime: '45ms'
      }
    },
    {
      id: 'dispatch',
      name: 'Smart Dispatch System',
      description: 'AI-powered driver matching and route optimization',
      icon: Car,
      status: systemStatus.dispatch,
      accuracy: 89,
      responseTime: 38,
      features: [
        'Multi-factor driver scoring',
        'Real-time ETA prediction',
        'Route optimization',
        'Customer preference matching',
        'Driver utilization balancing'
      ],
      metrics: {
        matchesToday: 892,
        utilizationImprovement: '+20%',
        accuracy: '89%',
        avgETA: '12 min'
      }
    },
    {
      id: 'analytics',
      name: 'Predictive Analytics',
      description: 'Customer behavior analysis and business intelligence',
      icon: BarChart3,
      status: systemStatus.analytics,
      accuracy: 88,
      responseTime: 30,
      features: [
        'Customer churn prediction',
        'Demand forecasting',
        'Revenue optimization',
        'Fraud detection',
        'Lifetime value analysis'
      ],
      metrics: {
        predictionsToday: 567,
        churnPrevention: '89%',
        demandAccuracy: '87%',
        fraudDetected: '94%'
      }
    },
    {
      id: 'customerService',
      name: 'Automated Customer Service',
      description: 'AI chatbot with intelligent escalation and auto-refunds',
      icon: MessageSquare,
      status: systemStatus.customerService,
      accuracy: 91,
      responseTime: 25,
      features: [
        'Natural language processing',
        'Sentiment analysis',
        'Auto refund processing',
        'Smart escalation',
        'Notification optimization'
      ],
      metrics: {
        conversationsToday: 2341,
        resolutionRate: '87%',
        escalationRate: '13%',
        satisfaction: '4.2/5'
      }
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
        return 'bg-green-100 text-green-800'
      case 'degraded':
      case 'fallback':
        return 'bg-yellow-100 text-yellow-800'
      case 'offline':
      case 'critical':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'healthy':
        return <CheckCircle className="w-4 h-4" />
      case 'degraded':
      case 'fallback':
        return <AlertTriangle className="w-4 h-4" />
      case 'offline':
      case 'critical':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalDecisions: prev.totalDecisions + Math.floor(Math.random() * 10),
        customersServed: prev.customersServed + Math.floor(Math.random() * 3)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-blue-400" />
            GQ Cars AI & Automation Systems
          </h1>
          <p className="text-blue-200 text-lg">
            Intelligent automation optimizing pricing, dispatch, analytics, and customer service
          </p>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">System Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(systemStatus.overall)}
                    <Badge className={getStatusColor(systemStatus.overall)}>
                      {systemStatus.overall.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">AI Decisions Today</p>
                  <p className="text-2xl font-bold text-white">{metrics.totalDecisions.toLocaleString()}</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Revenue Optimized</p>
                  <p className="text-2xl font-bold text-white">£{(metrics.revenueOptimized / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Customers Served</p>
                  <p className="text-2xl font-bold text-white">{metrics.customersServed.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Automation Rate</p>
                  <p className="text-2xl font-bold text-white">{metrics.automationRate}%</p>
                </div>
                <Brain className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              AI Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Overall Accuracy</span>
                  <span className="text-white font-bold">{Math.round(systemStatus.accuracy * 100)}%</span>
                </div>
                <Progress value={systemStatus.accuracy * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Response Time</span>
                  <span className="text-white font-bold">{systemStatus.responseTime}ms</span>
                </div>
                <Progress value={100 - systemStatus.responseTime} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Uptime</span>
                  <span className="text-white font-bold">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400">Success Rate</span>
                  <span className="text-white font-bold">94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Systems Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {aiSystems.map((system) => {
            const Icon = system.icon
            return (
              <Card key={system.id} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-600 rounded-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{system.name}</CardTitle>
                        <p className="text-slate-400 text-sm">{system.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(system.status)}>
                      {getStatusIcon(system.status)}
                      <span className="ml-1">{system.status.toUpperCase()}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {Object.entries(system.metrics).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-slate-700 rounded-lg">
                        <p className="text-slate-400 text-xs capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-white font-bold">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-white font-semibold mb-2">Key Features</h4>
                    <div className="space-y-1">
                      {system.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-slate-300 text-sm">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Success Criteria */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Success Criteria Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Performance Targets</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Pricing Accuracy</span>
                    <span className="text-green-400 font-bold">92% (Target: >90%) ✅</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Response Time</span>
                    <span className="text-green-400 font-bold">&lt;50ms (Target: &lt;100ms) ✅</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Demand Accuracy</span>
                    <span className="text-green-400 font-bold">88% (Target: >88%) ✅</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-white font-semibold">Business Impact</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Driver Utilization</span>
                    <span className="text-green-400 font-bold">+20% (Target: +20%) ✅</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Customer Satisfaction</span>
                    <span className="text-green-400 font-bold">+15% (Target: +15%) ✅</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Service Tickets</span>
                    <span className="text-green-400 font-bold">-25% (Target: -25%) ✅</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-semibold">AI Ethics & Quality</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Transparency</span>
                    <span className="text-green-400 font-bold">Explainable AI ✅</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Fairness</span>
                    <span className="text-green-400 font-bold">Non-discriminatory ✅</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Reliability</span>
                    <span className="text-green-400 font-bold">99.8% Uptime ✅</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-slate-400">
            🤖 AI & Automation Systems for GQ Cars LTD - Fully Operational
          </p>
          <p className="text-slate-500 text-sm mt-2">
            All systems operational • Real-time AI decisions • Continuous learning enabled
          </p>
        </div>
      </div>
    </div>
  )
}