'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Download, Share2, Phone, MessageSquare, MapPin, Clock, User, Star, Shield, Calendar } from 'lucide-react'
import QRCode from 'react-qr-code'
import { Driver, BookingFormData } from '@/app/types/booking'

interface BookingConfirmationProps {
  booking: {
    bookingId: string
    referenceCode: string
    formData: BookingFormData
    driver: Driver
    estimatedPrice: number
  }
}

export default function BookingConfirmation({ booking }: BookingConfirmationProps) {
  const [timeUntilArrival, setTimeUntilArrival] = useState(booking.driver.eta || 5)
  const [trackingStatus, setTrackingStatus] = useState<'confirmed' | 'driver-assigned' | 'en-route' | 'arrived'>('driver-assigned')

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setTimeUntilArrival(prev => Math.max(0, prev - 1))
    }, 60000) // Update every minute

    // Simulate status updates
    const statusTimeout = setTimeout(() => {
      setTrackingStatus('en-route')
    }, 30000) // Driver en-route after 30 seconds

    return () => {
      clearInterval(interval)
      clearTimeout(statusTimeout)
    }
  }, [])

  const bookingDetails = {
    id: booking.bookingId,
    reference: booking.referenceCode,
    pickup: booking.formData.pickupAddress,
    destination: booking.formData.destinationAddress,
    passengers: booking.formData.passengerCount,
    scheduledTime: booking.formData.schedulingType === 'asap' ? 'ASAP' : `${booking.formData.date} ${booking.formData.time}`,
    price: booking.estimatedPrice,
    driverName: booking.driver.name,
    driverRating: booking.driver.rating,
    vehicleType: booking.formData.vehicleType,
    eta: timeUntilArrival
  }

  const qrCodeData = JSON.stringify({
    bookingId: booking.bookingId,
    reference: booking.referenceCode,
    driver: booking.driver.name,
    customer: booking.formData.customerName
  })

  const getStatusIcon = () => {
    switch (trackingStatus) {
      case 'confirmed':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'driver-assigned':
        return <User className="w-6 h-6 text-gq-gold" />
      case 'en-route':
        return <MapPin className="w-6 h-6 text-blue-500" />
      case 'arrived':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-400" />
    }
  }

  const getStatusMessage = () => {
    switch (trackingStatus) {
      case 'confirmed':
        return 'Booking confirmed - Finding your driver'
      case 'driver-assigned':
        return `${booking.driver.name} has been assigned to your booking`
      case 'en-route':
        return `${booking.driver.name} is on the way to pick you up`
      case 'arrived':
        return `${booking.driver.name} has arrived at your pickup location`
      default:
        return 'Processing your booking...'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-green-500 mb-2">Booking Confirmed!</h1>
        <p className="text-gray-300 text-lg">
          Your SIA-licensed driver has been assigned
        </p>
        <div className="mt-4 text-sm text-gray-400">
          Booking Reference: <span className="font-mono text-gq-gold">{booking.referenceCode}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Tracking Status */}
          <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              {getStatusIcon()}
              <div>
                <h3 className="text-lg font-bold">Live Tracking</h3>
                <p className="text-sm text-gray-400">{getStatusMessage()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-gq-gold">{timeUntilArrival}</div>
                <div className="text-sm text-gray-400">Minutes</div>
                <div className="text-xs text-gray-500">Until arrival</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-green-500">{booking.driver.rating}</div>
                <div className="text-sm text-gray-400">Rating</div>
                <div className="text-xs text-gray-500">Driver score</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-blue-500">#{booking.driver.siaLicense.slice(-4)}</div>
                <div className="text-sm text-gray-400">SIA License</div>
                <div className="text-xs text-gray-500">Verified</div>
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gq-gold" />
              Your Driver
            </h3>
            
            <div className="flex items-center gap-4 mb-4">
              <img
                src={booking.driver.photo}
                alt={booking.driver.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gq-gold"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold">{booking.driver.name}</h4>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{booking.driver.rating}</span>
                    <span className="text-gray-400">({booking.driver.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-gq-gold" />
                    <span>SIA Licensed</span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  {booking.driver.experience}+ years experience • {booking.driver.specializations.join(', ')}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                <Phone className="w-4 h-4" />
                <span>Call Driver</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 border border-gray-700 hover:border-gq-gold rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>Message</span>
              </button>
            </div>
          </div>

          {/* Journey Details */}
          <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gq-gold" />
              Journey Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-sm text-gray-400">{bookingDetails.pickup}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-sm text-gray-400">{bookingDetails.destination}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                <div>
                  <p className="text-sm text-gray-400">Passengers</p>
                  <p className="font-medium">{bookingDetails.passengers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Vehicle Type</p>
                  <p className="font-medium capitalize">{bookingDetails.vehicleType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Scheduled Time</p>
                  <p className="font-medium">{bookingDetails.scheduledTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Price</p>
                  <p className="font-medium text-gq-gold">£{bookingDetails.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* QR Code */}
          <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg text-center">
            <h3 className="text-lg font-bold mb-4">Booking QR Code</h3>
            <div className="bg-white p-4 rounded-lg mb-4 inline-block">
              <QRCode
                size={160}
                value={qrCodeData}
                viewBox="0 0 256 256"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Show this QR code to your driver for verification
            </p>
            <button className="flex items-center justify-center gap-2 w-full p-2 border border-gray-700 hover:border-gq-gold rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span>Save QR Code</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="flex items-center gap-2 w-full p-3 border border-gray-700 hover:border-gq-gold rounded-lg transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Booking Details</span>
              </button>
              <button className="flex items-center gap-2 w-full p-3 border border-gray-700 hover:border-gq-gold rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span>Download Receipt</span>
              </button>
              <button className="flex items-center gap-2 w-full p-3 border border-gray-700 hover:border-gq-gold rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-900/20 p-6 border border-red-500/30 rounded-lg">
            <h3 className="text-lg font-bold mb-2 text-red-400">Emergency Contact</h3>
            <p className="text-sm text-gray-300 mb-4">
              24/7 support line for any issues during your journey
            </p>
            <button className="flex items-center justify-center gap-2 w-full p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call Emergency Line</span>
            </button>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gq-black/50 p-6 border border-gray-700 rounded-lg">
        <h3 className="text-lg font-bold mb-4">What happens next?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-gq-gold rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-black font-bold">1</span>
            </div>
            <h4 className="font-medium mb-1">Driver En Route</h4>
            <p className="text-sm text-gray-400">Your driver is heading to your pickup location</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-gq-gold rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-black font-bold">2</span>
            </div>
            <h4 className="font-medium mb-1">Arrival Notification</h4>
            <p className="text-sm text-gray-400">You'll receive a notification when your driver arrives</p>
          </div>
          <div className="text-center p-4">
            <div className="w-8 h-8 bg-gq-gold rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-black font-bold">3</span>
            </div>
            <h4 className="font-medium mb-1">Secure Journey</h4>
            <p className="text-sm text-gray-400">Enjoy your safe journey with our SIA-licensed driver</p>
          </div>
        </div>
      </div>
    </div>
  )
}