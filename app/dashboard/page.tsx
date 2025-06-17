'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Shield, User, Settings, LogOut, Calendar, FileText, UserCheck, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    bookings: 0,
    securityLogs: 0,
    lastLogin: null
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'bg-red-600'
      case 'ADMIN': return 'bg-purple-600'
      case 'STAFF': return 'bg-blue-600'
      case 'CLIENT': return 'bg-green-600'
      default: return 'bg-gray-600'
    }
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN': return 'Super Admin'
      case 'ADMIN': return 'Admin'
      case 'STAFF': return 'Staff'
      case 'CLIENT': return 'Client'
      default: return role
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <h1 className="text-xl font-bold text-white">GQ Security Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium">{session.user?.name}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded-full ${getRoleBadgeColor(session.user?.role)}`}>
                      {getRoleDisplayName(session.user?.role)}
                    </span>
                    {session.user?.twoFactorEnabled && (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        2FA ✓
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-slate-400 hover:text-white transition p-2 rounded-lg hover:bg-slate-700"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {session.user?.name?.split(' ')[0]}!
          </h2>
          <p className="text-slate-400">
            Here's your security dashboard overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Bookings</p>
                <p className="text-2xl font-bold text-white">{stats.bookings}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Security Events</p>
                <p className="text-2xl font-bold text-white">{stats.securityLogs}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Account Status</p>
                <p className="text-2xl font-bold text-green-400">Active</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link
            href="/book"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-6 rounded-lg transition group"
          >
            <Calendar className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">Book Service</h3>
            <p className="text-blue-100 text-sm">Schedule close protection or private hire</p>
          </Link>

          <Link
            href="/profile"
            className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-white p-6 rounded-lg transition group"
          >
            <User className="w-8 h-8 mb-4 text-slate-400 group-hover:text-white transition" />
            <h3 className="font-semibold text-lg mb-2">Profile</h3>
            <p className="text-slate-400 text-sm">Manage your account settings</p>
          </Link>

          <Link
            href="/bookings"
            className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-white p-6 rounded-lg transition group"
          >
            <FileText className="w-8 h-8 mb-4 text-slate-400 group-hover:text-white transition" />
            <h3 className="font-semibold text-lg mb-2">My Bookings</h3>
            <p className="text-slate-400 text-sm">View and manage your bookings</p>
          </Link>

          <Link
            href="/security"
            className="bg-slate-800 border border-slate-700 hover:border-slate-600 text-white p-6 rounded-lg transition group"
          >
            <Settings className="w-8 h-8 mb-4 text-slate-400 group-hover:text-white transition" />
            <h3 className="font-semibold text-lg mb-2">Security</h3>
            <p className="text-slate-400 text-sm">Two-factor auth and security logs</p>
          </Link>
        </div>

        {/* Role-specific sections */}
        {(session.user?.role === 'ADMIN' || session.user?.role === 'SUPER_ADMIN') && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Admin Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/users"
                className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition text-center"
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <span className="font-medium">Manage Users</span>
              </Link>
              <Link
                href="/admin/bookings"
                className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg transition text-center"
              >
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <span className="font-medium">All Bookings</span>
              </Link>
              <Link
                href="/admin/security"
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-4 rounded-lg transition text-center"
              >
                <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                <span className="font-medium">Security Logs</span>
              </Link>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <div>
              <h4 className="text-blue-400 font-medium">Security Notice</h4>
              <p className="text-blue-200 text-sm">
                Your account is protected with enterprise-grade security. 
                {!session.user?.twoFactorEnabled && (
                  <span className="ml-1">
                    <Link href="/security/2fa" className="underline hover:no-underline">
                      Enable 2FA for enhanced security.
                    </Link>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}