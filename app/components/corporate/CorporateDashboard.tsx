'use client'

import { useState, useEffect } from 'react'
import {
  Building2,
  Users,
  TrendingUp,
  Shield,
  AlertTriangle,
  Calendar,
  DollarSign,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Plus,
  Download,
  Settings,
  Bell
} from 'lucide-react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts'

import {
  CorporateDashboardData,
  BudgetAlert,
  UserActivity,
  DepartmentExpense,
  SecurityMetrics
} from '@/app/types/corporate'

// Sample data (would come from API)
const sampleDashboardData: CorporateDashboardData = {
  totalSpend: 156750,
  monthlySpend: 24580,
  budgetUtilization: 78,
  pendingApprovals: 5,
  activeBookings: 12,
  recentActivity: [
    {
      id: '1',
      userId: 'user1',
      action: 'BOOKING_CREATED',
      resource: 'booking1',
      resourceType: 'booking',
      details: { amount: 1250, service: 'EXECUTIVE_PROTECTION' },
      createdAt: new Date()
    },
    {
      id: '2',
      userId: 'user2',
      action: 'BOOKING_APPROVED',
      resource: 'booking2',
      resourceType: 'booking',
      details: { amount: 850, service: 'CORPORATE_TRANSPORT' },
      createdAt: new Date(Date.now() - 3600000)
    }
  ],
  topDepartments: [
    {
      departmentId: 'dept1',
      departmentName: 'Executive Office',
      amount: 45600,
      bookingCount: 28,
      budgetUsage: 85
    },
    {
      departmentId: 'dept2',
      departmentName: 'Sales',
      amount: 32400,
      bookingCount: 45,
      budgetUsage: 67
    },
    {
      departmentId: 'dept3',
      departmentName: 'Legal',
      amount: 28100,
      bookingCount: 18,
      budgetUsage: 72
    }
  ],
  budgetAlerts: [
    {
      id: 'alert1',
      type: 'APPROACHING_LIMIT',
      level: 90,
      message: 'Executive Office department approaching budget limit',
      budgetId: 'budget1',
      budgetName: 'Executive Monthly Budget',
      amount: 45600,
      limit: 50000,
      percentage: 91,
      createdAt: new Date()
    }
  ],
  securityMetrics: {
    highRiskBookings: 8,
    executiveProtectionHours: 156,
    threatAssessments: 12,
    securityIncidents: 0,
    complianceScore: 98
  }
}

const spendingTrendData = [
  { month: 'Jan', amount: 32000, target: 40000 },
  { month: 'Feb', amount: 28500, target: 40000 },
  { month: 'Mar', amount: 35200, target: 40000 },
  { month: 'Apr', amount: 41800, target: 40000 },
  { month: 'May', amount: 38900, target: 40000 },
  { month: 'Jun', amount: 24580, target: 40000 }
]

const serviceBreakdownData = [
  { name: 'Executive Protection', value: 45, color: '#EF4444' },
  { name: 'Corporate Transport', value: 30, color: '#F59E0B' },
  { name: 'Airport Transfers', value: 15, color: '#10B981' },
  { name: 'VIP Services', value: 10, color: '#3B82F6' }
]

interface CorporateDashboardProps {
  companyId: string
}

export default function CorporateDashboard({ companyId }: CorporateDashboardProps) {
  const [dashboardData, setDashboardData] = useState<CorporateDashboardData>(sampleDashboardData)
  const [loading, setLoading] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')

  useEffect(() => {
    loadDashboardData()
  }, [companyId, selectedTimeframe])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDashboardData(sampleDashboardData)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    return `${value}%`
  }

  const getAlertColor = (level: number) => {
    if (level >= 90) return 'text-red-500 bg-red-100'
    if (level >= 75) return 'text-yellow-500 bg-yellow-100'
    return 'text-green-500 bg-green-100'
  }

  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'BOOKING_CREATED':
        return <Plus className="w-4 h-4" />
      case 'BOOKING_APPROVED':
        return <CheckCircle className="w-4 h-4" />
      case 'BOOKING_REJECTED':
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Corporate Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enterprise security transport management
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Spend</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(dashboardData.totalSpend)}
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">+12%</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Budget Usage</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPercent(dashboardData.budgetUtilization)}
                </p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${dashboardData.budgetUtilization}%` }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Approvals</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.pendingApprovals}
                </p>
              </div>
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4">
              <button className="text-orange-600 dark:text-orange-400 text-sm hover:underline">
                Review pending
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.activeBookings}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <button className="text-green-600 dark:text-green-400 text-sm hover:underline">
                View all bookings
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Security Score</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {dashboardData.securityMetrics.complianceScore}%
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500">Excellent</span>
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Spending Trend */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Spending Trend
              </h3>
              <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                View Details
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={spendingTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#EF4444"
                  strokeDasharray="5 5"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Service Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Service Breakdown
              </h3>
              <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                View Details
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceBreakdownData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {serviceBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Budget Alerts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Budget Alerts
              </h3>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {dashboardData.budgetAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.level)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <span className="font-medium">{alert.level}% Used</span>
                    </div>
                    <span className="text-sm">{formatCurrency(alert.amount)}</span>
                  </div>
                  <p className="text-sm mt-1">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Departments */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Departments
              </h3>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {dashboardData.topDepartments.map((dept) => (
                <div key={dept.departmentId} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {dept.departmentName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {dept.bookingCount} bookings
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatCurrency(dept.amount)}
                    </p>
                    <p className={`text-sm ${dept.budgetUsage > 80 ? 'text-red-500' : 'text-green-500'}`}>
                      {dept.budgetUsage}% budget used
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {dashboardData.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    {getActivityIcon(activity.action)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action.replace('_', ' ').toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.createdAt.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}