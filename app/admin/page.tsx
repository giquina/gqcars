'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Users, 
  Car, 
  Calendar, 
  DollarSign, 
  Activity, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Clock,
  MapPin
} from "lucide-react"

interface DashboardStats {
  totalBookings: number
  activeBookings: number
  totalRevenue: number
  totalDrivers: number
  activeDrivers: number
  totalCustomers: number
  completionRate: number
  averageRating: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentBookings, setRecentBookings] = useState([])

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login")
    }
    
    if (session?.user?.role !== "ADMIN") {
      redirect("/dashboard")
    }
  }, [status, session])

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      // In a real app, you'd fetch this from your API
      const mockStats: DashboardStats = {
        totalBookings: 1247,
        activeBookings: 23,
        totalRevenue: 89450.50,
        totalDrivers: 34,
        activeDrivers: 18,
        totalCustomers: 892,
        completionRate: 96.5,
        averageRating: 4.8
      }
      
      setStats(mockStats)
      setRecentBookings([]) // Would fetch real bookings
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-yellow-500 mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">GQ Cars LTD Operations Control Center</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-green-500/20 px-4 py-2 rounded-lg border border-green-500/30">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">SYSTEM ONLINE</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Last updated</p>
              <p className="text-white font-semibold">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 p-6 rounded-xl border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-white">£{stats?.totalRevenue.toLocaleString()}</p>
                <p className="text-green-400 text-sm mt-1">+12.5% this month</p>
              </div>
              <DollarSign className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600/20 to-green-800/20 p-6 rounded-xl border border-green-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Active Bookings</p>
                <p className="text-3xl font-bold text-white">{stats?.activeBookings}</p>
                <p className="text-yellow-400 text-sm mt-1">{stats?.totalBookings} total</p>
              </div>
              <Calendar className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 p-6 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Active Drivers</p>
                <p className="text-3xl font-bold text-white">{stats?.activeDrivers}/{stats?.totalDrivers}</p>
                <p className="text-blue-400 text-sm mt-1">SIA Licensed</p>
              </div>
              <Car className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 p-6 rounded-xl border border-yellow-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-400 text-sm font-medium">Customer Rating</p>
                <p className="text-3xl font-bold text-white">{stats?.averageRating}/5.0</p>
                <p className="text-green-400 text-sm mt-1">{stats?.completionRate}% completion</p>
              </div>
              <Shield className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-semibold">Manage Drivers</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition-colors">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-semibold">View Bookings</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition-colors">
                <Activity className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-semibold">Live Tracking</span>
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg transition-colors">
                <DollarSign className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-semibold">Reports</span>
              </button>
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <h3 className="text-xl font-bold text-white mb-6">System Alerts</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Activity className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-semibold text-sm">All Systems Operational</p>
                  <p className="text-gray-300 text-xs">Last checked: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-yellow-400 font-semibold text-sm">3 SIA Licenses Expiring Soon</p>
                  <p className="text-gray-300 text-xs">Review driver documentation</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-blue-400 font-semibold text-sm">Peak Demand Detected</p>
                  <p className="text-gray-300 text-xs">Central London area - consider surge pricing</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Live Activity Feed</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">LIVE</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">New booking confirmed</p>
                <p className="text-gray-400 text-sm">GQ1234567 - Airport Transfer to Heathrow</p>
              </div>
              <span className="text-gray-500 text-xs">2 min ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">Driver arrived at pickup</p>
                <p className="text-gray-400 text-sm">Driver Sarah M. - GQ1234556</p>
              </div>
              <span className="text-gray-500 text-xs">5 min ago</span>
            </div>
            
            <div className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">Payment completed</p>
                <p className="text-gray-400 text-sm">£89.50 - Corporate booking</p>
              </div>
              <span className="text-gray-500 text-xs">8 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
