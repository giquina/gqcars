'use client'

import { useEffect, useState } from 'react'
import { 
  Activity, 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { AdminStore, BusinessMetrics, Driver, Booking } from '@/lib/stores/adminStore'

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
}

function MetricCard({ title, value, change, icon, trend = 'neutral' }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${trendColors[trend]} flex items-center mt-1`}>
              {trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
              {change}
            </p>
          )}
        </div>
        <div className="text-yellow-500">
          {icon}
        </div>
      </div>
    </div>
  )
}

interface DriverStatusProps {
  drivers: Driver[]
}

function DriverStatus({ drivers }: DriverStatusProps) {
  const activeDrivers = drivers.filter(d => d.status === 'available' || d.status === 'busy')
  const availableDrivers = drivers.filter(d => d.status === 'available')
  const busyDrivers = drivers.filter(d => d.status === 'busy')

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Driver Status</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{availableDrivers.length}</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{busyDrivers.length}</div>
          <div className="text-sm text-gray-600">On Trip</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{drivers.length - activeDrivers.length}</div>
          <div className="text-sm text-gray-600">Offline</div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activeDrivers.slice(0, 10).map((driver) => (
          <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                driver.status === 'available' ? 'bg-green-400' : 
                driver.status === 'busy' ? 'bg-blue-400' : 'bg-gray-400'
              }`} />
              <div>
                <div className="font-medium text-gray-900">{driver.name}</div>
                <div className="text-sm text-gray-600">
                  Rating: {driver.rating} • {driver.completedTrips} trips
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                £{driver.revenue.toFixed(2)}
              </div>
              <div className="text-xs text-gray-600">Today</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface RecentBookingsProps {
  bookings: Booking[]
}

function RecentBookings({ bookings }: RecentBookingsProps) {
  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in_progress':
        return <Activity className="h-4 w-4 text-blue-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusBg = (status: Booking['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700'
      case 'in_progress':
        return 'bg-blue-50 text-blue-700'
      case 'cancelled':
        return 'bg-red-50 text-red-700'
      default:
        return 'bg-yellow-50 text-yellow-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Bookings</h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {bookings.slice(0, 10).map((booking) => (
          <div key={booking.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3">
              {getStatusIcon(booking.status)}
              <div>
                <div className="font-medium text-gray-900">
                  {booking.pickupLocation} → {booking.destination}
                </div>
                <div className="text-sm text-gray-600">
                  {booking.serviceType} • {booking.scheduledTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xs px-2 py-1 rounded-full ${getStatusBg(booking.status)}`}>
                {booking.status.replace('_', ' ')}
              </div>
              <div className="text-sm font-medium text-gray-900 mt-1">
                £{(booking.actualFare || booking.estimatedFare).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  useEffect(() => {
    // Subscribe to store updates
    const unsubscribeMetrics = AdminStore.subscribe(
      state => state.metrics,
      (newMetrics) => setMetrics(newMetrics)
    )

    const unsubscribeDrivers = AdminStore.subscribe(
      state => state.drivers,
      (newDrivers) => setDrivers(newDrivers)
    )

    const unsubscribeBookings = AdminStore.subscribe(
      state => state.bookings,
      (newBookings) => setBookings(newBookings)
    )

    const unsubscribeUpdate = AdminStore.subscribe(
      state => state.lastUpdate,
      (newUpdate) => setLastUpdate(newUpdate)
    )

    // Get initial data
    const state = AdminStore.getState()
    setMetrics(state.metrics)
    setDrivers(state.drivers)
    setBookings(state.bookings)
    setLastUpdate(state.lastUpdate)

    return () => {
      unsubscribeMetrics()
      unsubscribeDrivers()
      unsubscribeBookings()
      unsubscribeUpdate()
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
        <h1 className="text-2xl font-bold text-gray-900">Operations Dashboard</h1>
        <div className="text-sm text-gray-600">
          Last updated: {lastUpdate.toLocaleString()}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Daily Revenue"
          value={`£${metrics.revenue.daily.toFixed(2)}`}
          change="+12.5% from yesterday"
          trend="up"
          icon={<DollarSign className="h-6 w-6" />}
        />
        <MetricCard
          title="Active Drivers"
          value={metrics.drivers.active}
          change={`${metrics.drivers.completionRate}% completion rate`}
          trend="up"
          icon={<Users className="h-6 w-6" />}
        />
        <MetricCard
          title="Today's Bookings"
          value={metrics.bookings.completed}
          change={`${metrics.bookings.conversionRate}% conversion`}
          trend="up"
          icon={<Car className="h-6 w-6" />}
        />
        <MetricCard
          title="Avg Trip Value"
          value={`£${metrics.bookings.averageValue.toFixed(2)}`}
          change="+5.2% this week"
          trend="up"
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DriverStatus drivers={drivers} />
        <RecentBookings bookings={bookings} />
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-green-900">API Response</div>
              <div className="text-lg font-bold text-green-700">248ms</div>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-green-900">Server Uptime</div>
              <div className="text-lg font-bold text-green-700">99.9%</div>
            </div>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
            <div>
              <div className="text-sm font-medium text-yellow-900">Queue Length</div>
              <div className="text-lg font-bold text-yellow-700">3 requests</div>
            </div>
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </div>
        </div>
      </div>
    </div>
  )
}