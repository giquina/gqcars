'use client'

import { useEffect, useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard, 
  PieChart, 
  Calendar,
  Download,
  Filter
} from 'lucide-react'
import { AdminStore, BusinessMetrics } from '@/lib/stores/adminStore'

interface RevenueChartProps {
  data: any[]
  timeframe: 'hourly' | 'daily' | 'weekly' | 'monthly'
}

function RevenueChart({ data, timeframe }: RevenueChartProps) {
  // Mock chart component - in real implementation, use Recharts
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Revenue Trends</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md">
            {timeframe}
          </button>
        </div>
      </div>
      
      {/* Mock chart visualization */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
          <p className="text-gray-600">Revenue Chart ({timeframe} view)</p>
          <p className="text-sm text-gray-500 mt-1">Integration with Recharts coming soon</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-600">Peak Hour</div>
          <div className="font-semibold text-gray-900">2-3 PM</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Avg/Hour</div>
          <div className="font-semibold text-gray-900">£287</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Growth Rate</div>
          <div className="font-semibold text-green-600">+15.3%</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Forecast</div>
          <div className="font-semibold text-blue-600">£3,200</div>
        </div>
      </div>
    </div>
  )
}

interface ProfitMarginProps {
  serviceTypes: any[]
}

function ProfitMarginAnalysis({ serviceTypes }: ProfitMarginProps) {
  const mockData = [
    { service: 'Airport Transfer', revenue: 15420, costs: 8930, margin: 42.1 },
    { service: 'Corporate', revenue: 12850, costs: 6425, margin: 50.0 },
    { service: 'Private Hire', revenue: 9830, costs: 5898, margin: 40.0 },
    { service: 'Close Protection', revenue: 8750, costs: 3500, margin: 60.0 },
    { service: 'Wedding', revenue: 6420, costs: 2568, margin: 60.0 }
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Profit Margin by Service</h3>
      
      <div className="space-y-4">
        {mockData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900">{item.service}</div>
              <div className="text-sm text-gray-600">
                Revenue: £{item.revenue.toLocaleString()} • Costs: £{item.costs.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className={`text-lg font-bold ${
                item.margin >= 50 ? 'text-green-600' : 
                item.margin >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {item.margin.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Margin</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Optimization Recommendations</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Increase close protection pricing by 8% to maximize profit</li>
          <li>• Optimize airport transfer routes to reduce fuel costs</li>
          <li>• Bundle services for corporate clients to improve margins</li>
        </ul>
      </div>
    </div>
  )
}

interface PaymentMonitoringProps {
  payments: any[]
}

function PaymentMonitoring({ payments }: PaymentMonitoringProps) {
  const mockPayments = [
    { id: 'PAY-001', amount: 65.00, method: 'Card', status: 'completed', time: new Date() },
    { id: 'PAY-002', amount: 42.50, method: 'Cash', status: 'completed', time: new Date() },
    { id: 'PAY-003', amount: 125.00, method: 'Corporate', status: 'pending', time: new Date() },
    { id: 'PAY-004', amount: 89.75, method: 'Card', status: 'failed', time: new Date() }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Processing</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">97.8%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">£2,847</div>
          <div className="text-sm text-gray-600">Today's Total</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">3</div>
          <div className="text-sm text-gray-600">Failed Payments</div>
        </div>
      </div>

      <div className="space-y-3">
        {mockPayments.map((payment) => (
          <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-4 w-4 text-gray-400" />
              <div>
                <div className="font-medium text-gray-900">{payment.id}</div>
                <div className="text-sm text-gray-600">
                  {payment.method} • {payment.time.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">£{payment.amount.toFixed(2)}</div>
              <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                {payment.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FinancialAnalytics() {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null)
  const [timeframe, setTimeframe] = useState<'hourly' | 'daily' | 'weekly' | 'monthly'>('daily')
  const [selectedPeriod, setSelectedPeriod] = useState('Today')

  useEffect(() => {
    const unsubscribe = AdminStore.subscribe(
      state => state.metrics,
      (newMetrics) => setMetrics(newMetrics)
    )

    setMetrics(AdminStore.getState().metrics)
    return unsubscribe
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
        <h1 className="text-2xl font-bold text-gray-900">Financial Analytics</h1>
        <div className="flex space-x-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option>Today</option>
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Revenue</p>
              <p className="text-2xl font-bold text-gray-900">£{metrics.revenue.daily.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% vs yesterday
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Weekly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">£{metrics.revenue.weekly.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.3% vs last week
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">£{metrics.revenue.monthly.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.2% vs last month
              </p>
            </div>
            <PieChart className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Year to Date</p>
              <p className="text-2xl font-bold text-gray-900">£{metrics.revenue.yearToDate.toFixed(2)}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +22.7% vs last year
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={[]} timeframe={timeframe} />
        <ProfitMarginAnalysis serviceTypes={[]} />
      </div>

      {/* Payment Monitoring */}
      <PaymentMonitoring payments={[]} />

      {/* Financial Forecasting */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Forecasting</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">£3,200</div>
            <div className="text-sm text-blue-800">Tomorrow's Projected Revenue</div>
            <div className="text-xs text-blue-600 mt-1">Based on bookings + trend analysis</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">£22,500</div>
            <div className="text-sm text-green-800">Next Week's Projection</div>
            <div className="text-xs text-green-600 mt-1">95% confidence interval</div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">£95,000</div>
            <div className="text-sm text-purple-800">Monthly Target</div>
            <div className="text-xs text-purple-600 mt-1">82% progress towards goal</div>
          </div>
        </div>
      </div>
    </div>
  )
}