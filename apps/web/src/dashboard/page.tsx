'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"
import { Car, Clock, CreditCard, User, MapPin, Phone, Star } from "lucide-react"

interface Booking {
  id: string
  bookingReference: string
  serviceType: string
  vehicleType: string
  pickupAddress: string
  destinationAddress: string
  scheduledDateTime: string
  estimatedPrice: number
  status: string
  driver?: {
    name: string
    phone: string
    rating: number
    vehicle: {
      make: string
      model: string
      color: string
      licensePlate: string
    }
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('current')

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login")
    }
  }, [status])

  useEffect(() => {
    if (session?.user) {
      fetchBookings()
    }
  }, [session])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings)
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const currentBookings = bookings.filter(booking => 
    ['PENDING', 'CONFIRMED', 'DRIVER_ASSIGNED', 'EN_ROUTE_TO_PICKUP', 'ARRIVED_AT_PICKUP', 'IN_PROGRESS'].includes(booking.status)
  )
  
  const pastBookings = bookings.filter(booking => 
    ['COMPLETED', 'CANCELLED'].includes(booking.status)
  )

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Welcome back, {session?.user?.name}</h1>
          <p className="text-gray-300">Manage your bookings and account</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <Car className="w-8 h-8 text-yellow-500 mb-2" />
            <h3 className="text-2xl font-bold text-white">{bookings.length}</h3>
            <p className="text-gray-400">Total Bookings</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <Clock className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="text-2xl font-bold text-white">{currentBookings.length}</h3>
            <p className="text-gray-400">Active Bookings</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <Star className="w-8 h-8 text-green-500 mb-2" />
            <h3 className="text-2xl font-bold text-white">{pastBookings.filter(b => b.status === 'COMPLETED').length}</h3>
            <p className="text-gray-400">Completed Trips</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <CreditCard className="w-8 h-8 text-purple-500 mb-2" />
            <h3 className="text-2xl font-bold text-white">
              £{bookings.reduce((sum, booking) => sum + booking.estimatedPrice, 0).toFixed(2)}
            </h3>
            <p className="text-gray-400">Total Spent</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'current'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Current Bookings ({currentBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'past'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Past Bookings ({pastBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Profile
          </button>
        </div>

        {/* Content */}
        {activeTab === 'current' && (
          <div className="space-y-6">
            {currentBookings.length === 0 ? (
              <div className="text-center py-12">
                <Car className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No current bookings</h3>
                <p className="text-gray-500 mb-6">Ready to book your next ride?</p>
                <a
                  href="/book"
                  className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                >
                  Book Now
                </a>
              </div>
            ) : (
              currentBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastBookings.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No past bookings</h3>
                <p className="text-gray-500">Your booking history will appear here</p>
              </div>
            ) : (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-gray-900 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-yellow-500 mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{session?.user?.name}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <span className="text-white">{session?.user?.email}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-white">{session?.user?.phone}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function BookingCard({ booking }: { booking: Booking }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-500'
      case 'CONFIRMED': return 'text-blue-500'
      case 'DRIVER_ASSIGNED': return 'text-green-500'
      case 'IN_PROGRESS': return 'text-purple-500'
      case 'COMPLETED': return 'text-green-400'
      case 'CANCELLED': return 'text-red-500'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">
            {booking.bookingReference}
          </h3>
          <p className={`text-sm font-medium ${getStatusColor(booking.status)}`}>
            {booking.status.replace('_', ' ')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-yellow-500">£{booking.estimatedPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-400">{booking.serviceType}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-400">From</p>
            <p className="text-white">{booking.pickupAddress}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-400">To</p>
            <p className="text-white">{booking.destinationAddress}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-400">Scheduled</p>
            <p className="text-white">
              {new Date(booking.scheduledDateTime).toLocaleString()}
            </p>
          </div>
        </div>

        {booking.driver && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-white mb-2">Your Driver</h4>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-medium">{booking.driver.name}</p>
                <p className="text-gray-400 text-sm">{booking.driver.phone}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-yellow-500">{booking.driver.rating}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">
                  {booking.driver.vehicle.color} {booking.driver.vehicle.make} {booking.driver.vehicle.model}
                </p>
                <p className="text-gray-400 text-sm">{booking.driver.vehicle.licensePlate}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
