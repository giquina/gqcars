'use client'

import { ReactNode, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  DollarSign, 
  TrendingUp, 
  Car, 
  Users, 
  Settings, 
  Bell, 
  LogOut,
  Shield,
  MapPin,
  Clock,
  AlertTriangle
} from 'lucide-react'
import { AdminStore } from '@/lib/stores/adminStore'
import { AlertSystem } from '@/components/admin/AlertSystem'
import { LiveDataIndicator } from '@/components/admin/LiveDataIndicator'

interface AdminLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: 'Operations Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Financial Analytics', href: '/admin/financial', icon: DollarSign },
  { name: 'Performance Metrics', href: '/admin/performance', icon: TrendingUp },
  { name: 'Fleet Management', href: '/admin/fleet', icon: Car },
  { name: 'Driver Management', href: '/admin/drivers', icon: Users },
  { name: 'Live Map', href: '/admin/map', icon: MapPin },
  { name: 'Compliance', href: '/admin/compliance', icon: Shield },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [alerts, setAlerts] = useState<any[]>([])
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Initialize real-time connection
  useEffect(() => {
    AdminStore.connect()
    
    const interval = setInterval(() => {
      setLastUpdate(new Date())
    }, 10000) // Update every 10 seconds

    return () => {
      clearInterval(interval)
      AdminStore.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">GQ Cars Admin</h1>
              <LiveDataIndicator lastUpdate={lastUpdate} />
            </div>
            
            <div className="flex items-center space-x-4">
              <AlertSystem />
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Last Update: {lastUpdate.toLocaleTimeString()}
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex pt-16">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white shadow-sm h-screen fixed overflow-y-auto">
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        group flex items-center px-2 py-2 text-sm font-medium rounded-md
                        ${isActive 
                          ? 'bg-yellow-100 text-yellow-900' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <item.icon
                        className={`
                          mr-3 h-5 w-5 flex-shrink-0
                          ${isActive ? 'text-yellow-500' : 'text-gray-400 group-hover:text-gray-500'}
                        `}
                      />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* System Status Panel */}
          <div className="mt-8 px-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">System Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">API Status</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Real-time Data</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Alert System</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}