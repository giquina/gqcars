'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/providers/SupabaseProvider'
import { db } from '@/lib/supabase'
import { PageLoader } from '@/components/ui/Loader'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { User, LogOut, Shield, Calendar, MapPin, Phone, Clock, CheckCircle, XCircle, BarChart } from 'lucide-react'

interface Booking {
  id: string
  service: string
  date: string
  time: string
  duration: string
  location: string
  name: string
  email: string
  phone: string
  requirements: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  created_at: string
}

interface Assessment {
  id: string
  threat_level: string
  risk_score: number
  recommendations: string
  answers: Record<string, string>
  status: 'completed' | 'pending'
  created_at: string
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [bookingsLoading, setBookingsLoading] = useState(true)
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [assessmentsLoading, setAssessmentsLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    if (!user) return
    
    try {
      setBookingsLoading(true)
      const { data, error } = await db.getUserBookings(user.id)
      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setBookingsLoading(false)
    }
  }, [user])

  const fetchAssessments = useCallback(async () => {
    if (!user) return
    
    try {
      setAssessmentsLoading(true)
      const { data, error } = await db.getUserAssessments(user.id)
      if (error) throw error
      setAssessments(data || [])
    } catch (error) {
      console.error('Error fetching assessments:', error)
    } finally {
      setAssessmentsLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchBookings()
      fetchAssessments()
    }
  }, [user, fetchBookings, fetchAssessments])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-500'
      case 'completed': return 'text-blue-500'
      case 'cancelled': return 'text-red-500'
      default: return 'text-yellow-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getThreatLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'severe / critical': return 'text-red-500'
      case 'substantial': return 'text-orange-500'
      case 'moderate': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  if (loading) {
    return <PageLoader />
  }

  if (!user) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">Welcome Back</h1>
          <p className="text-gray-300">
            Manage your bookings and account settings
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-8 border border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-black" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-white">
                {user.user_metadata?.full_name || user.email}
              </h2>
              <p className="text-gray-400">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-300">
                {user.user_metadata?.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>{user.user_metadata.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-yellow-500" />
                  <span>Verified Account</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div 
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer"
            onClick={() => router.push('/book')}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">New Booking</h3>
            </div>
            <p className="text-gray-400 mb-4">Book a new transport service</p>
            <button className="text-yellow-500 hover:text-yellow-400 font-medium">
              Book Now →
            </button>
          </div>

          <div 
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer"
            onClick={() => router.push('/assessment')}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Security Assessment</h3>
            </div>
            <p className="text-gray-400 mb-4">Complete your security assessment</p>
            <button className="text-yellow-500 hover:text-yellow-400 font-medium">
              Take Assessment →
            </button>
          </div>

          <div 
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer"
            onClick={() => router.push('/contact')}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Contact Support</h3>
            </div>
            <p className="text-gray-400 mb-4">Get help with your bookings</p>
            <button className="text-yellow-500 hover:text-yellow-400 font-medium">
              Contact Us →
            </button>
          </div>
        </div>

        {/* My Bookings Section */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">My Bookings</h3>
            <button 
              onClick={() => router.push('/book')}
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              + New Booking
            </button>
          </div>
          
          {bookingsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading bookings...</p>
            </div>
          ) : bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        <span className="font-medium capitalize">{booking.status}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDate(booking.created_at)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">{booking.service}</h4>
                      <div className="space-y-1 text-sm text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(booking.date)} at {booking.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{booking.duration} hours</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-white mb-2">Contact Details</h5>
                      <div className="space-y-1 text-sm text-gray-300">
                        <p>{booking.name}</p>
                        <p>{booking.email}</p>
                        <p>{booking.phone}</p>
                      </div>
                      {booking.requirements && (
                        <div className="mt-3">
                          <h6 className="font-medium text-white mb-1">Requirements</h6>
                          <p className="text-sm text-gray-300">{booking.requirements}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No bookings yet</p>
              <p className="text-sm text-gray-500">Start by creating your first booking</p>
              <button 
                onClick={() => router.push('/book')}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Book Now
              </button>
            </div>
          )}
        </div>

        {/* My Assessments Section */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Security Assessments</h3>
            <button 
              onClick={() => router.push('/assessment')}
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              + New Assessment
            </button>
          </div>
          
          {assessmentsLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading assessments...</p>
            </div>
          ) : assessments.length > 0 ? (
            <div className="space-y-4">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center space-x-1 ${getThreatLevelColor(assessment.threat_level)}`}>
                        <BarChart className="w-4 h-4" />
                        <span className="font-medium">{assessment.threat_level}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Risk Score: {assessment.risk_score}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDate(assessment.created_at)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium text-white mb-2">Recommendations</h5>
                      <p className="text-sm text-gray-300">{assessment.recommendations}</p>
                    </div>
                    
                    <div>
                      <h6 className="font-medium text-white mb-2">Assessment Details</h6>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                        {Object.entries(assessment.answers).map(([key, value]) => (
                          <div key={key} className="bg-gray-600 rounded px-2 py-1">
                            <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                            <span className="text-white ml-1 capitalize">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">No assessments yet</p>
              <p className="text-sm text-gray-500">Complete a security assessment to get personalized recommendations</p>
              <button 
                onClick={() => router.push('/assessment')}
                className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Take Assessment
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {bookings.length > 0 || assessments.length > 0 ? (
              <>
                {bookings.length > 0 && (
                  <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white">Latest booking: {bookings[0].service}</p>
                      <p className="text-sm text-gray-400">{formatDate(bookings[0].date)}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDate(bookings[0].created_at)}
                    </span>
                  </div>
                )}
                {assessments.length > 0 && (
                  <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white">Latest assessment: {assessments[0].threat_level}</p>
                      <p className="text-sm text-gray-400">Risk score: {assessments[0].risk_score}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {formatDate(assessments[0].created_at)}
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-400 py-8">
                <p>No recent activity</p>
                <p className="text-sm">Your activity will appear here</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 