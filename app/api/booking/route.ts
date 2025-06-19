import { NextRequest, NextResponse } from 'next/server'
import { BookingFormData, Driver, VEHICLE_TYPES, PRICING_CONFIG } from '@/app/types/booking'

// Mock database - in production, replace with real database
let bookings: any[] = []
let drivers: Driver[] = [
  {
    id: 'driver-1',
    name: 'James Morrison',
    photo: '/api/placeholder/80/80',
    rating: 4.9,
    siaLicense: 'SIA-123456789',
    experience: 8,
    specializations: ['Close Protection', 'VIP Transport'],
    currentLocation: { lat: 51.5074, lng: -0.1278 },
    isAvailable: true,
    eta: 5,
    vehicle: VEHICLE_TYPES.executive,
    reviews: 342,
    isOnline: true
  },
  {
    id: 'driver-2',
    name: 'Sarah Chen',
    photo: '/api/placeholder/80/80',
    rating: 4.8,
    siaLicense: 'SIA-987654321',
    experience: 6,
    specializations: ['Executive Protection', 'Corporate Security'],
    currentLocation: { lat: 51.5155, lng: -0.1415 },
    isAvailable: true,
    eta: 8,
    vehicle: VEHICLE_TYPES.standard,
    reviews: 218,
    isOnline: true
  },
  {
    id: 'driver-3',
    name: 'Marcus Williams',
    photo: '/api/placeholder/80/80',
    rating: 5.0,
    siaLicense: 'SIA-456789123',
    experience: 12,
    specializations: ['Armed Response', 'Threat Assessment', 'Counter-Surveillance'],
    currentLocation: { lat: 51.5074, lng: -0.1357 },
    isAvailable: true,
    eta: 3,
    vehicle: VEHICLE_TYPES.security,
    reviews: 567,
    isOnline: true
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    switch (action) {
      case 'create_booking':
        return handleCreateBooking(data)
      case 'get_available_drivers':
        return handleGetAvailableDrivers(data)
      case 'calculate_pricing':
        return handleCalculatePricing(data)
      case 'update_booking_status':
        return handleUpdateBookingStatus(data)
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  const bookingId = searchParams.get('bookingId')

  try {
    switch (action) {
      case 'get_booking':
        if (!bookingId) {
          return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
        }
        return handleGetBooking(bookingId)
      case 'get_bookings':
        return handleGetBookings()
      case 'get_drivers':
        return handleGetDrivers()
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function handleCreateBooking(data: BookingFormData & { selectedDriverId: string }) {
  const bookingId = `GQ-${Date.now()}`
  const referenceCode = `REF${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  
  // Find the selected driver
  const driver = drivers.find(d => d.id === data.selectedDriverId)
  if (!driver) {
    return NextResponse.json({ error: 'Driver not found' }, { status: 404 })
  }

  // Calculate pricing
  const pricing = calculateBookingPricing(data)
  
  // Create booking
  const booking = {
    id: bookingId,
    referenceCode,
    ...data,
    driver,
    pricing,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }

  // Mark driver as busy
  driver.isAvailable = false

  bookings.push(booking)

  return NextResponse.json({
    success: true,
    booking: {
      bookingId,
      referenceCode,
      driver,
      pricing,
      status: 'confirmed'
    }
  })
}

async function handleGetAvailableDrivers(data: { vehicleType: string; pickupLocation?: { lat: number; lng: number } }) {
  // Filter drivers by vehicle type and availability
  const availableDrivers = drivers.filter(driver => 
    driver.isAvailable && 
    driver.isOnline && 
    driver.vehicle.id === data.vehicleType
  )

  // Calculate ETAs based on pickup location (mock calculation)
  const driversWithETA = availableDrivers.map(driver => ({
    ...driver,
    eta: Math.floor(Math.random() * 15) + 3 // 3-18 minutes
  }))

  return NextResponse.json({
    success: true,
    drivers: driversWithETA
  })
}

async function handleCalculatePricing(data: BookingFormData) {
  const pricing = calculateBookingPricing(data)
  
  return NextResponse.json({
    success: true,
    pricing
  })
}

async function handleUpdateBookingStatus(data: { bookingId: string; status: string }) {
  const booking = bookings.find(b => b.id === data.bookingId)
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  booking.status = data.status
  booking.updatedAt = new Date().toISOString()

  // If booking is completed or cancelled, make driver available again
  if (data.status === 'completed' || data.status === 'cancelled') {
    const driver = drivers.find(d => d.id === booking.selectedDriverId)
    if (driver) {
      driver.isAvailable = true
    }
  }

  return NextResponse.json({
    success: true,
    booking
  })
}

async function handleGetBooking(bookingId: string) {
  const booking = bookings.find(b => b.id === bookingId)
  if (!booking) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    booking
  })
}

async function handleGetBookings() {
  return NextResponse.json({
    success: true,
    bookings
  })
}

async function handleGetDrivers() {
  return NextResponse.json({
    success: true,
    drivers
  })
}

function calculateBookingPricing(data: BookingFormData) {
  const vehicle = VEHICLE_TYPES[data.vehicleType]
  const estimatedDistance = Math.random() * 20 + 5 // Mock: 5-25 miles
  const estimatedDuration = Math.random() * 60 + 20 // Mock: 20-80 minutes
  
  // Base calculations
  const baseFare = Math.max(PRICING_CONFIG.baseFareMin, vehicle.basePrice * estimatedDistance)
  const siaLicensePremium = PRICING_CONFIG.siaLicensePremium
  const distanceCharge = estimatedDistance * PRICING_CONFIG.perMileRate * vehicle.priceMultiplier
  const timeCharge = estimatedDuration * PRICING_CONFIG.perMinuteRate

  // Calculate surcharges
  const surcharges: { name: string; amount: number }[] = []
  const currentHour = new Date().getHours()
  const currentDay = new Date().getDay()

  // Night surcharge (10PM - 6AM)
  if (currentHour >= 22 || currentHour <= 6) {
    const nightSurcharge = baseFare * PRICING_CONFIG.surcharges.nightTime.rate
    surcharges.push({
      name: PRICING_CONFIG.surcharges.nightTime.description,
      amount: nightSurcharge
    })
  }

  // Weekend surcharge
  if (currentDay === 0 || currentDay === 6) {
    const weekendSurcharge = baseFare * PRICING_CONFIG.surcharges.weekend.rate
    surcharges.push({
      name: PRICING_CONFIG.surcharges.weekend.description,
      amount: weekendSurcharge
    })
  }

  // Airport surcharge (mock detection)
  if (data.pickupAddress.toLowerCase().includes('airport') || 
      data.destinationAddress.toLowerCase().includes('airport')) {
    surcharges.push({
      name: PRICING_CONFIG.surcharges.airport.description,
      amount: PRICING_CONFIG.surcharges.airport.rate
    })
  }

  // Calculate totals
  const surchargeTotal = surcharges.reduce((sum, s) => sum + s.amount, 0)
  const tollCosts = Math.random() * 10 // Mock toll costs
  const parkingFees = Math.random() * 5 // Mock parking fees
  
  const subtotal = baseFare + siaLicensePremium + distanceCharge + timeCharge + surchargeTotal + tollCosts + parkingFees
  const taxes = subtotal * PRICING_CONFIG.taxes
  const total = subtotal + taxes

  // Regular taxi comparison (30% cheaper but no SIA license)
  const comparisonPrice = total * 0.7

  return {
    baseFare,
    siaLicensePremium,
    distanceCharge,
    timeCharge,
    surcharges,
    tollCosts,
    parkingFees,
    subtotal,
    taxes,
    total,
    estimatedDuration,
    estimatedDistance,
    comparisonPrice
  }
}