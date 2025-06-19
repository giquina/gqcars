'use client'

import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Shield, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Car, 
  DollarSign,
  Clock,
  Target,
  Activity,
  Zap
} from 'lucide-react'
import { Line, Bar, Doughnut, Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface DashboardData {
  summary: {
    totalBookings: number
    revenue: number
    activeDrivers: number
    customerSatisfaction: number
    securityScore: number
  }
  trends: {
    bookingTrend: Array<{ x: string; y: number }>
    revenueTrend: Array<{ x: string; y: number }>
    demandHeatmap: Array<{ location: string; value: number; intensity: number }>
  }
  predictions: {
    demandForecast: Array<{ timeSlot: string; predictedDemand: number; confidence: number }>
    riskAlerts: Array<{ id: string; type: string; severity: string; title: string }>
    recommendations: string[]
  }
  realtime: {
    activeBookings: number
    availableDrivers: number
    currentIncidents: number
    systemHealth: number
  }
}

interface AnalyticsMetrics {
  customerAnalytics: {
    totalCustomers: number
    newCustomers: number
    churnRate: number
    lifetimeValue: number
    segmentDistribution: { [key: string]: number }
  }
  operationalMetrics: {
    driverUtilization: number
    averageResponseTime: number
    completionRate: number
    punctualityScore: number
  }
  securityMetrics: {
    incidentRate: number
    threatLevel: string
    secureRoutesUsed: number
    emergencyResponseTime: number
  }
}

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [analyticsMetrics, setAnalyticsMetrics] = useState<AnalyticsMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    loadDashboardData()
    const interval = setInterval(loadDashboardData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      // Simulated API calls - replace with actual endpoints
      const dashboardResponse = await fetch('/api/analytics/dashboard')
      const metricsResponse = await fetch('/api/analytics/metrics')
      
      // For now, using mock data
      setDashboardData(getMockDashboardData())
      setAnalyticsMetrics(getMockAnalyticsMetrics())
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !dashboardData || !analyticsMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gq-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gq-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gq-gold">GQ Cars Analytics Dashboard</h1>
            <p className="text-gray-400 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={loadDashboardData}
              className="bg-gq-gold text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
            >
              Refresh Data
            </button>
            <div className="bg-green-600 text-white px-3 py-2 rounded flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              System Health: {dashboardData.realtime.systemHealth}%
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'demand', label: 'Demand Analysis', icon: TrendingUp },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'operations', label: 'Operations', icon: Car },
            { id: 'alerts', label: 'Alerts', icon: AlertTriangle }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-gq-gold text-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <MetricCard
                title="Total Bookings"
                value={dashboardData.summary.totalBookings.toLocaleString()}
                icon={Car}
                trend="+12%"
                trendUp={true}
              />
              <MetricCard
                title="Revenue"
                value={`£${dashboardData.summary.revenue.toLocaleString()}`}
                icon={DollarSign}
                trend="+8%"
                trendUp={true}
              />
              <MetricCard
                title="Active Drivers"
                value={dashboardData.summary.activeDrivers.toString()}
                icon={Users}
                trend="+2"
                trendUp={true}
              />
              <MetricCard
                title="Customer Satisfaction"
                value={`${dashboardData.summary.customerSatisfaction.toFixed(1)}/5`}
                icon={Target}
                trend="+0.2"
                trendUp={true}
              />
              <MetricCard
                title="Security Score"
                value={`${dashboardData.summary.securityScore}%`}
                icon={Shield}
                trend="+5%"
                trendUp={true}
              />
            </div>

            {/* Real-time Status */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gq-gold">Real-time Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Active Bookings</span>
                    <span className="font-semibold">{dashboardData.realtime.activeBookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Available Drivers</span>
                    <span className="font-semibold">{dashboardData.realtime.availableDrivers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Incidents</span>
                    <span className={`font-semibold ${
                      dashboardData.realtime.currentIncidents > 0 ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {dashboardData.realtime.currentIncidents}
                    </span>
                  </div>
                </div>
              </div>

              {/* Booking Trend Chart */}
              <div className="bg-gray-800 p-6 rounded-lg lg:col-span-3">
                <h3 className="text-lg font-semibold mb-4 text-gq-gold">Booking Trends</h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: dashboardData.trends.bookingTrend.map(item => item.x),
                      datasets: [
                        {
                          label: 'Bookings',
                          data: dashboardData.trends.bookingTrend.map(item => item.y),
                          borderColor: '#EAB308',
                          backgroundColor: 'rgba(234, 179, 8, 0.1)',
                          tension: 0.4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: { beginAtZero: true },
                        x: { display: true }
                      },
                      plugins: { legend: { display: false } }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gq-gold flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                AI Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.predictions.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded border-l-4 border-gq-gold">
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demand Analysis Tab */}
        {activeTab === 'demand' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Demand Forecast */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gq-gold">24-Hour Demand Forecast</h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: dashboardData.predictions.demandForecast.map(item => 
                        new Date(item.timeSlot).getHours() + ':00'
                      ),
                      datasets: [
                        {
                          label: 'Predicted Demand',
                          data: dashboardData.predictions.demandForecast.map(item => item.predictedDemand),
                          borderColor: '#EAB308',
                          backgroundColor: 'rgba(234, 179, 8, 0.1)',
                          tension: 0.4
                        },
                        {
                          label: 'Confidence',
                          data: dashboardData.predictions.demandForecast.map(item => item.confidence * 10),
                          borderColor: '#60A5FA',
                          backgroundColor: 'rgba(96, 165, 250, 0.1)',
                          tension: 0.4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true } }
                    }}
                  />
                </div>
              </div>

              {/* Location Heatmap */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gq-gold">Demand by Location</h3>
                <div className="space-y-3">
                  {dashboardData.trends.demandHeatmap.slice(0, 8).map((location, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-gq-gold" />
                        <span className="text-sm">{location.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gq-gold h-2 rounded-full" 
                            style={{ width: `${location.intensity}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold w-8">{location.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Peak Hours Analysis */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gq-gold">Peak Hours Analysis</h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                    datasets: [
                      {
                        label: 'Average Bookings',
                        data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 15) + 1),
                        backgroundColor: 'rgba(234, 179, 8, 0.6)',
                        borderColor: '#EAB308',
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true } }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricCard
                title="Security Score"
                value={`${dashboardData.summary.securityScore}%`}
                icon={Shield}
                trend="+2%"
                trendUp={true}
              />
              <MetricCard
                title="Active Incidents"
                value={dashboardData.realtime.currentIncidents.toString()}
                icon={AlertTriangle}
                trend="0"
                trendUp={false}
              />
              <MetricCard
                title="Response Time"
                value={`${analyticsMetrics.securityMetrics.emergencyResponseTime}min`}
                icon={Clock}
                trend="-1min"
                trendUp={true}
              />
            </div>

            {/* Security Incidents Map */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gq-gold">Security Incident Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold mb-3">Incident Types</h4>
                  <div className="h-64">
                    <Doughnut
                      data={{
                        labels: ['Minor Incident', 'Traffic Issue', 'Suspicious Activity', 'Emergency'],
                        datasets: [
                          {
                            data: [45, 30, 20, 5],
                            backgroundColor: [
                              'rgba(34, 197, 94, 0.6)',
                              'rgba(234, 179, 8, 0.6)',
                              'rgba(251, 146, 60, 0.6)',
                              'rgba(239, 68, 68, 0.6)'
                            ],
                            borderColor: [
                              '#22C55E',
                              '#EAB308',
                              '#FB923C',
                              '#EF4444'
                            ],
                            borderWidth: 2
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-semibold mb-3">Route Security Scores</h4>
                  <div className="space-y-3">
                    {[
                      { route: 'London → Heathrow', score: 95 },
                      { route: 'Canary Wharf → City', score: 92 },
                      { route: 'Watford → London', score: 88 },
                      { route: 'Gatwick → London', score: 90 }
                    ].map((route, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{route.route}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                route.score >= 90 ? 'bg-green-500' : 
                                route.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${route.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-8">{route.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Analytics Tab */}
        {activeTab === 'customers' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Total Customers"
                value={analyticsMetrics.customerAnalytics.totalCustomers.toLocaleString()}
                icon={Users}
                trend="+15%"
                trendUp={true}
              />
              <MetricCard
                title="New Customers"
                value={analyticsMetrics.customerAnalytics.newCustomers.toString()}
                icon={Users}
                trend="+12"
                trendUp={true}
              />
              <MetricCard
                title="Churn Rate"
                value={`${analyticsMetrics.customerAnalytics.churnRate}%`}
                icon={TrendingUp}
                trend="-2%"
                trendUp={true}
              />
              <MetricCard
                title="Avg. Lifetime Value"
                value={`£${analyticsMetrics.customerAnalytics.lifetimeValue.toLocaleString()}`}
                icon={DollarSign}
                trend="+£200"
                trendUp={true}
              />
            </div>

            {/* Customer Segments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gq-gold">Customer Segments</h3>
                <div className="h-64">
                  <Doughnut
                    data={{
                      labels: Object.keys(analyticsMetrics.customerAnalytics.segmentDistribution),
                      datasets: [
                        {
                          data: Object.values(analyticsMetrics.customerAnalytics.segmentDistribution),
                          backgroundColor: [
                            'rgba(234, 179, 8, 0.6)',
                            'rgba(59, 130, 246, 0.6)',
                            'rgba(34, 197, 94, 0.6)',
                            'rgba(251, 146, 60, 0.6)',
                            'rgba(139, 92, 246, 0.6)'
                          ],
                          borderColor: [
                            '#EAB308',
                            '#3B82F6',
                            '#22C55E',
                            '#FB923C',
                            '#8B5CF6'
                          ],
                          borderWidth: 2
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gq-gold">Customer Satisfaction Trends</h3>
                <div className="h-64">
                  <Line
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [
                        {
                          label: 'Satisfaction Score',
                          data: [4.2, 4.3, 4.4, 4.5, 4.4, 4.6],
                          borderColor: '#EAB308',
                          backgroundColor: 'rgba(234, 179, 8, 0.1)',
                          tension: 0.4
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { 
                        y: { 
                          beginAtZero: false,
                          min: 3.5,
                          max: 5
                        } 
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Operations Tab */}
        {activeTab === 'operations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MetricCard
                title="Driver Utilization"
                value={`${analyticsMetrics.operationalMetrics.driverUtilization}%`}
                icon={Car}
                trend="+5%"
                trendUp={true}
              />
              <MetricCard
                title="Response Time"
                value={`${analyticsMetrics.operationalMetrics.averageResponseTime}min`}
                icon={Clock}
                trend="-2min"
                trendUp={true}
              />
              <MetricCard
                title="Completion Rate"
                value={`${analyticsMetrics.operationalMetrics.completionRate}%`}
                icon={Target}
                trend="+3%"
                trendUp={true}
              />
              <MetricCard
                title="Punctuality"
                value={`${analyticsMetrics.operationalMetrics.punctualityScore}%`}
                icon={Clock}
                trend="+1%"
                trendUp={true}
              />
            </div>

            {/* Driver Performance */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gq-gold">Driver Performance Overview</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-64">
                  <Bar
                    data={{
                      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      datasets: [
                        {
                          label: 'Active Drivers',
                          data: [45, 48, 52, 50, 55, 38, 32],
                          backgroundColor: 'rgba(234, 179, 8, 0.6)',
                          borderColor: '#EAB308',
                          borderWidth: 1
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: { y: { beginAtZero: true } }
                    }}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Top Performing Drivers</h4>
                  {[
                    { name: 'John Smith', rating: 4.9, bookings: 87 },
                    { name: 'Sarah Johnson', rating: 4.8, bookings: 82 },
                    { name: 'Michael Brown', rating: 4.8, bookings: 78 },
                    { name: 'Emma Wilson', rating: 4.7, bookings: 75 }
                  ].map((driver, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded">
                      <div>
                        <div className="font-semibold">{driver.name}</div>
                        <div className="text-sm text-gray-400">{driver.bookings} bookings</div>
                      </div>
                      <div className="text-gq-gold font-semibold">★ {driver.rating}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['critical', 'warning', 'info', 'resolved'].map((severity) => (
                <div key={severity} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">{severity} Alerts</span>
                    <span className={`text-lg font-bold ${
                      severity === 'critical' ? 'text-red-400' :
                      severity === 'warning' ? 'text-yellow-400' :
                      severity === 'info' ? 'text-blue-400' : 'text-green-400'
                    }`}>
                      {severity === 'critical' ? '2' : severity === 'warning' ? '5' : 
                       severity === 'info' ? '8' : '15'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Alerts */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-gq-gold">Active Alerts</h3>
              <div className="space-y-3">
                {dashboardData.predictions.riskAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500 bg-red-900/20' :
                    alert.severity === 'warning' ? 'border-yellow-500 bg-yellow-900/20' :
                    'border-blue-500 bg-blue-900/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{alert.title}</div>
                        <div className="text-sm text-gray-400 capitalize">{alert.type}</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="bg-gq-gold text-black px-3 py-1 rounded text-sm hover:bg-yellow-400">
                          View
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                          Resolve
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Metric Card Component
function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp 
}: { 
  title: string
  value: string
  icon: any
  trend: string
  trendUp: boolean
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-gq-gold" />
        <span className={`text-sm font-semibold ${
          trendUp ? 'text-green-400' : 'text-red-400'
        }`}>
          {trend}
        </span>
      </div>
      <div className="text-2xl font-bold text-white mb-2">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  )
}

// Mock data functions
function getMockDashboardData(): DashboardData {
  return {
    summary: {
      totalBookings: 1247,
      revenue: 87500,
      activeDrivers: 42,
      customerSatisfaction: 4.6,
      securityScore: 94
    },
    trends: {
      bookingTrend: Array.from({ length: 12 }, (_, i) => ({
        x: new Date(Date.now() - (11 - i) * 86400000).toLocaleDateString(),
        y: Math.floor(Math.random() * 50) + 30
      })),
      revenueTrend: Array.from({ length: 12 }, (_, i) => ({
        x: new Date(Date.now() - (11 - i) * 86400000).toLocaleDateString(),
        y: Math.floor(Math.random() * 5000) + 2000
      })),
      demandHeatmap: [
        { location: 'Canary Wharf', value: 15, intensity: 85 },
        { location: 'Heathrow Airport', value: 12, intensity: 70 },
        { location: 'City of London', value: 18, intensity: 95 },
        { location: 'Westminster', value: 8, intensity: 45 },
        { location: 'Kensington', value: 10, intensity: 60 },
        { location: 'Gatwick Airport', value: 7, intensity: 40 }
      ]
    },
    predictions: {
      demandForecast: Array.from({ length: 24 }, (_, i) => ({
        timeSlot: new Date(Date.now() + i * 3600000).toISOString(),
        predictedDemand: Math.floor(Math.random() * 10) + 2,
        confidence: 0.7 + Math.random() * 0.25
      })),
      riskAlerts: [
        { id: '1', type: 'security_threat', severity: 'warning', title: 'Increased incidents in Westminster area' },
        { id: '2', type: 'demand_spike', severity: 'info', title: 'High demand predicted for evening rush' },
        { id: '3', type: 'driver_shortage', severity: 'warning', title: 'Low driver availability in North London' }
      ],
      recommendations: [
        'Deploy additional drivers to Canary Wharf during peak hours',
        'Consider surge pricing for high-demand locations',
        'Increase security monitoring in Westminster area',
        'Offer incentives to drivers for off-peak availability'
      ]
    },
    realtime: {
      activeBookings: 23,
      availableDrivers: 19,
      currentIncidents: 1,
      systemHealth: 98
    }
  }
}

function getMockAnalyticsMetrics(): AnalyticsMetrics {
  return {
    customerAnalytics: {
      totalCustomers: 3247,
      newCustomers: 156,
      churnRate: 8.5,
      lifetimeValue: 2840,
      segmentDistribution: {
        'VIP': 145,
        'Regular Business': 890,
        'Occasional': 1456,
        'Corporate': 567,
        'New': 189
      }
    },
    operationalMetrics: {
      driverUtilization: 78,
      averageResponseTime: 8.5,
      completionRate: 96.2,
      punctualityScore: 94.8
    },
    securityMetrics: {
      incidentRate: 0.02,
      threatLevel: 'Low',
      secureRoutesUsed: 98.5,
      emergencyResponseTime: 4.2
    }
  }
}