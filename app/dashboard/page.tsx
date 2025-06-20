'use client'

import { useState } from 'react'
import { Shield, Calendar, Clock, MapPin, Car, CreditCard, Settings, LogOut, Bell, Edit3, Save } from 'lucide-react'

interface Booking {
  id: string
  service: string
  date: string
  time: string
  pickup: string
  dropoff: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  driver: string
  vehicle: string
  cost: number
}

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
  memberSince: string
  totalBookings: number
  preferredPayment: string
}

const mockBookings: Booking[] = [
  {
    id: 'BK001',
    service: 'Private Hire',
    date: '2025-06-25',
    time: '14:30',
    pickup: 'Heathrow Airport',
    dropoff: 'Canary Wharf',
    status: 'confirmed',
    driver: 'James Wilson',
    vehicle: 'Mercedes S-Class',
    cost: 120
  },
  {
    id: 'BK002',
    service: 'Close Protection',
    date: '2025-06-20',
    time: '09:00',
    pickup: 'Home Address',
    dropoff: 'Business Meeting',
    status: 'completed',
    driver: 'Sarah Thompson',
    vehicle: 'BMW X5',
    cost: 300
  }
]

const mockProfile: UserProfile = {
  name: 'Alexander Johnson',
  email: 'alex.johnson@email.com',
  phone: '+44 7700 900123',
  address: '123 Kensington High Street, London, W8 5SF',
  memberSince: '2023-03-15',
  totalBookings: 47,
  preferredPayment: '**** **** **** 1234'
}

export default function SecureCustomerPortal() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'completed': return 'text-blue-400 bg-blue-400/10'
      case 'cancelled': return 'text-red-400 bg-red-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
    ))
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
                <h1 className="text-lg font-bold text-amber-400">Customer Portal</h1>
                <p className="text-xs text-gray-400">Secure Account Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Shield },
                { id: 'bookings', label: 'My Bookings', icon: Calendar },
                { id: 'profile', label: 'Profile', icon: Settings }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, {profile.name}</h2>
                  <p className="text-gray-400">Here's an overview of your account and recent activity.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="font-semibold">Total Bookings</h3>
                        <p className="text-2xl font-bold text-blue-400">{profile.totalBookings}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <Clock className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="font-semibold">Active Bookings</h3>
                        <p className="text-2xl font-bold text-green-400">
                          {bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center gap-3">
                      <Shield className="w-8 h-8 text-amber-400" />
                      <div>
                        <h3 className="font-semibold">Member Since</h3>
                        <p className="text-lg font-bold text-amber-400">Mar 2023</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Recent Bookings</h3>
                  <div className="space-y-3">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Car className="w-5 h-5 text-amber-400" />
                          <div>
                            <p className="font-medium">{booking.service}</p>
                            <p className="text-sm text-gray-400">{booking.date} at {booking.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">My Bookings</h2>
                  <p className="text-gray-400">View and manage all your security service bookings.</p>
                </div>

                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-bold">{booking.service}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{booking.date} at {booking.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{booking.pickup}</span>
                            </div>
                            {booking.dropoff && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>To: {booking.dropoff}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Car className="w-4 h-4 text-gray-400" />
                              <span>{booking.vehicle}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-xl font-bold text-amber-400">£{booking.cost}</p>
                            <p className="text-sm text-gray-400">ID: {booking.id}</p>
                          </div>
                          
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => cancelBooking(booking.id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Profile Settings</h2>
                    <p className="text-gray-400">Manage your personal information.</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-amber-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                    {isEditing ? 'Save' : 'Edit'}
                  </button>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-700 rounded-lg">{profile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-700 rounded-lg">{profile.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-amber-500 outline-none"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-700 rounded-lg">{profile.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Payment Method</label>
                      <p className="px-4 py-3 bg-gray-700 rounded-lg flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {profile.preferredPayment}
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
                      {isEditing ? (
                        <textarea
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-amber-500 outline-none h-24 resize-none"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-700 rounded-lg">{profile.address}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}