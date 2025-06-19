'use client'

import { useEffect, useState } from 'react'
import { 
  Star, 
  TrendingUp, 
  Target, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  Award,
  BarChart3,
  Eye
} from 'lucide-react'
import { AdminStore, BusinessMetrics, Driver } from '@/lib/stores/adminStore'

interface PerformanceKPI {
  id: string
  name: string
  current: number
  target: number
  unit: string
  trend: 'up' | 'down' | 'neutral'
  changePercent: number
}

interface CustomerFeedback {
  id: string
  customerName: string
  driverName: string
  rating: number
  comment: string
  serviceType: string
  date: Date
}

function KPICard({ kpi }: { kpi: PerformanceKPI }) {
  const progress = (kpi.current / kpi.target) * 100
  const isOnTarget = progress >= 100
  const isNearTarget = progress >= 80

  const getProgressColor = () => {
    if (isOnTarget) return 'bg-green-500'
    if (isNearTarget) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTrendColor = () => {
    switch (kpi.trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{kpi.name}</h3>
        <Target className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {kpi.current.toFixed(1)}{kpi.unit}
          </span>
          <span className="text-sm text-gray-600">
            Target: {kpi.target}{kpi.unit}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getProgressColor()}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {progress.toFixed(1)}% of target
          </span>
          <span className={`text-sm flex items-center ${getTrendColor()}`}>
            {kpi.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
            {kpi.changePercent > 0 ? '+' : ''}{kpi.changePercent.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  )
}

function DriverLeaderboard({ drivers }: { drivers: Driver[] }) {
  const sortedDrivers = [...drivers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10)

  const getRankBadge = (index: number) => {
    const rank = index + 1
    if (rank === 1) return 'bg-yellow-100 text-yellow-800'
    if (rank === 2) return 'bg-gray-100 text-gray-800'
    if (rank === 3) return 'bg-orange-100 text-orange-800'
    return 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Award className="h-5 w-5 text-yellow-500 mr-2" />
        Top Performing Drivers
      </h3>
      
      <div className="space-y-3">
        {sortedDrivers.map((driver, index) => (
          <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBadge(index)}`}>
                #{index + 1}
              </span>
              <div>
                <div className="font-medium text-gray-900">{driver.name}</div>
                <div className="text-sm text-gray-600">
                  {driver.completedTrips} trips • £{driver.revenue.toFixed(2)} revenue
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-900">{driver.rating.toFixed(1)}</span>
              </div>
              <div className="text-sm text-gray-600">
                98.5% completion
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomerSatisfactionChart() {
  const mockData = [
    { period: 'This Week', satisfaction: 4.7, responses: 89 },
    { period: 'Last Week', satisfaction: 4.5, responses: 76 },
    { period: 'Last Month', satisfaction: 4.6, responses: 324 },
    { period: 'Last Quarter', satisfaction: 4.4, responses: 1247 }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Satisfaction Trends</h3>
      
      <div className="space-y-4">
        {mockData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{item.period}</div>
              <div className="text-sm text-gray-600">{item.responses} responses</div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-lg font-bold text-gray-900">{item.satisfaction.toFixed(1)}</span>
              </div>
              <div className={`text-sm ${
                item.satisfaction >= 4.5 ? 'text-green-600' : 
                item.satisfaction >= 4.0 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {item.satisfaction >= 4.5 ? 'Excellent' : 
                 item.satisfaction >= 4.0 ? 'Good' : 'Needs Improvement'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConversionAnalysis() {
  const conversionData = [
    { stage: 'Website Visits', count: 2847, percentage: 100 },
    { stage: 'Quote Requests', count: 1423, percentage: 50.0 },
    { stage: 'Bookings Made', count: 1247, percentage: 87.6 },
    { stage: 'Completed Trips', count: 1219, percentage: 97.8 },
    { stage: 'Repeat Customers', count: 892, percentage: 73.2 }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Booking Conversion Funnel</h3>
      
      <div className="space-y-3">
        {conversionData.map((stage, index) => (
          <div key={index} className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">{stage.stage}</span>
              <span className="text-sm text-gray-600">{stage.percentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"
                style={{ width: `${stage.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-500">{stage.count.toLocaleString()}</span>
              {index > 0 && (
                <span className="text-xs text-gray-500">
                  {((stage.count / conversionData[index - 1].count) * 100).toFixed(1)}% conversion
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WebsiteAnalytics() {
  const analyticsData = {
    pageViews: 12547,
    uniqueVisitors: 8934,
    bounceRate: 32.5,
    avgSessionDuration: '3:42',
    topPages: [
      { page: '/book', views: 3421, conversions: 28.3 },
      { page: '/services/airport', views: 2987, conversions: 24.1 },
      { page: '/services/corporate', views: 2156, conversions: 31.7 },
      { page: '/contact', views: 1834, conversions: 15.2 }
    ]
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <Eye className="h-5 w-5 text-blue-500 mr-2" />
        Website Analytics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{analyticsData.pageViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Page Views</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{analyticsData.uniqueVisitors.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Unique Visitors</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">{analyticsData.bounceRate}%</div>
          <div className="text-sm text-gray-600">Bounce Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{analyticsData.avgSessionDuration}</div>
          <div className="text-sm text-gray-600">Avg Session</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Top Performing Pages</h4>
        {analyticsData.topPages.map((page, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">{page.page}</div>
              <div className="text-sm text-gray-600">{page.views.toLocaleString()} views</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{page.conversions.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">conversion</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null)
  const [drivers, setDrivers] = useState<Driver[]>([])

  const kpis: PerformanceKPI[] = [
    {
      id: 'customer_satisfaction',
      name: 'Customer Satisfaction',
      current: 4.7,
      target: 4.5,
      unit: '★',
      trend: 'up',
      changePercent: 4.2
    },
    {
      id: 'conversion_rate',
      name: 'Booking Conversion',
      current: 87.6,
      target: 85.0,
      unit: '%',
      trend: 'up',
      changePercent: 2.8
    },
    {
      id: 'response_time',
      name: 'Avg Response Time',
      current: 2.3,
      target: 3.0,
      unit: 'min',
      trend: 'up',
      changePercent: -12.5
    },
    {
      id: 'repeat_customers',
      name: 'Repeat Customer Rate',
      current: 73.2,
      target: 70.0,
      unit: '%',
      trend: 'up',
      changePercent: 5.1
    },
    {
      id: 'driver_retention',
      name: 'Driver Retention',
      current: 94.5,
      target: 90.0,
      unit: '%',
      trend: 'up',
      changePercent: 3.2
    },
    {
      id: 'on_time_performance',
      name: 'On-Time Performance',
      current: 96.8,
      target: 95.0,
      unit: '%',
      trend: 'up',
      changePercent: 1.8
    }
  ]

  useEffect(() => {
    const unsubscribeMetrics = AdminStore.subscribe(
      state => state.metrics,
      (newMetrics) => setMetrics(newMetrics)
    )

    const unsubscribeDrivers = AdminStore.subscribe(
      state => state.drivers,
      (newDrivers) => setDrivers(newDrivers)
    )

    setMetrics(AdminStore.getState().metrics)
    setDrivers(AdminStore.getState().drivers)

    return () => {
      unsubscribeMetrics()
      unsubscribeDrivers()
    }
  }, [])

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Performance Metrics</h1>
        <div className="flex space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
            <option>Last Year</option>
          </select>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            <BarChart3 className="h-4 w-4 inline mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DriverLeaderboard drivers={drivers} />
        <CustomerSatisfactionChart />
      </div>

      {/* Conversion and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionAnalysis />
        <WebsiteAnalytics />
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-green-700">Excellent</div>
            <div className="text-sm text-green-600">Overall Performance Rating</div>
            <div className="text-xs text-green-500 mt-1">5 out of 6 KPIs exceeding targets</div>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-blue-700">+15.3%</div>
            <div className="text-sm text-blue-600">Quarter-over-Quarter Growth</div>
            <div className="text-xs text-blue-500 mt-1">All metrics trending positively</div>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-yellow-700">#1</div>
            <div className="text-sm text-yellow-600">Market Position</div>
            <div className="text-xs text-yellow-500 mt-1">Leading in customer satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  )
}