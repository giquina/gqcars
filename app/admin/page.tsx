'use client'

import { useState, useEffect } from 'react'
import { 
  Shield, 
  Car, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  UserCheck,
  Activity,
  Bell,
  Settings,
  BarChart3,
  Target,
  Zap
} from 'lucide-react'

interface DashboardStats {
  totalBookings: number
  activeBookings: number
  totalRevenue: number
  availableDrivers: number
  pendingPayments: number
  customerSatisfaction: number
}

interface Booking {
  id: string
  customerName: string
  service: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed'
  driver?: string
  vehicle?: string
  pickupTime: string
  location: string
  amount: number
}

interface Driver {
  id: string
  name: string
  status: 'available' | 'busy' | 'off_duty'
  currentLocation: string
  rating: number
  todayEarnings: number
  activeBooking?: string
}

interface Alert {
  id: string
  type: 'warning' | 'error' | 'info'
  message: string
  timestamp: Date
}

export default function OperationsControlCenter() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 247,
    activeBookings: 12,
    totalRevenue: 45680,
    availableDrivers: 8,
    pendingPayments: 3,
    customerSatisfaction: 4.8
  })

  const [recentBookings] = useState<Booking[]>([
    {
      id: 'BK001',
      customerName: 'John Smith',
      service: 'Close Protection',
      status: 'in_progress',
      driver: 'Alex Johnson',
      vehicle: 'BMW X5',
      pickupTime: '14:30',
      location: 'Central London',
      amount: 300
    },
    {
      id: 'BK002',
      customerName: 'Sarah Williams',
      service: 'Private Hire',
      status: 'confirmed',
      driver: 'Mike Brown',
      vehicle: 'Mercedes S-Class',
      pickupTime: '16:00',
      location: 'Heathrow Airport',
      amount: 120
    },
    {
      id: 'BK003',
      customerName: 'Corporate Client',
      service: 'Corporate Security',
      status: 'pending',
      pickupTime: '18:00',
      location: 'Canary Wharf',
      amount: 450
    }
  ])

  const [drivers] = useState<Driver[]>([
    {
      id: 'D001',
      name: 'Alex Johnson',
      status: 'busy',
      currentLocation: 'Central London',
      rating: 4.9,
      todayEarnings: 680,
      activeBooking: 'BK001'
    },
    {
      id: 'D002',
      name: 'Mike Brown',
      status: 'available',
      currentLocation: 'Heathrow Airport',
      rating: 4.8,
      todayEarnings: 420
    },
    {
      id: 'D003',
      name: 'Sarah Thompson',
      status: 'available',
      currentLocation: 'Westminster',
      rating: 4.9,
      todayEarnings: 580
    }
  ])

  const [alerts] = useState<Alert[]>([
    {
      id: 'A001',
      type: 'warning',
      message: 'High demand area detected: Central London',
      timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: 'A002',
      type: 'info',
      message: 'New booking request received',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: 'A003',
      type: 'error',
      message: 'Driver Alex Johnson: GPS signal lost',
      timestamp: new Date(Date.now() - 2 * 60 * 1000)
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'in_progress': return 'text-blue-400 bg-blue-400/10'
      case 'completed': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-400/10'
      case 'busy': return 'text-blue-400 bg-blue-400/10'
      case 'off_duty': return 'text-gray-400 bg-gray-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-400" />
      case 'info': return <Bell className="w-4 h-4 text-blue-400" />
      default: return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-amber-400">Operations Control Center</h1>
                <p className="text-xs text-gray-400">Real-time Business Intelligence</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">System Online</span>
              </div>
              <button className="p-2 text-gray-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  {alerts.length}
                </span>
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Bookings</p>
                <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Now</p>
                <p className="text-2xl font-bold text-green-400">{stats.activeBookings}</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-amber-400">£{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Available Drivers</p>
                <p className="text-2xl font-bold text-blue-400">{stats.availableDrivers}</p>
              </div>
              <UserCheck className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Satisfaction</p>
                <p className="text-2xl font-bold text-green-400">{stats.customerSatisfaction}/5</p>
              </div>
              <Target className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending Payments</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.pendingPayments}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Bookings</h3>
                <button className="text-amber-400 hover:text-amber-300 text-sm">View All</button>
              </div>
              
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="bg-gray-700/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {booking.customerName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{booking.customerName}</p>
                          <p className="text-sm text-gray-400">{booking.service}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{booking.pickupTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{booking.location}</span>
                      </div>
                      {booking.driver && (
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300">{booking.driver}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">£{booking.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Driver Status & Alerts */}
          <div className="space-y-6">
            {/* Driver Status */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Driver Status</h3>
              <div className="space-y-3">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{driver.name}</p>
                        <p className="text-xs text-gray-400">{driver.currentLocation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDriverStatusColor(driver.status)}`}>
                        {driver.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">£{driver.todayEarnings}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">System Alerts</h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-700/50 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-200">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex items-center gap-3 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <Calendar className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Assign Driver</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
              <CheckCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Approve Booking</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-medium">View Analytics</span>
            </button>
            <button className="flex items-center gap-3 p-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              <Zap className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Emergency Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}