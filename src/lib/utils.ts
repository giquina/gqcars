import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow, format } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return format(d, 'PPP')
}

export function formatTimeAgo(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  }).format(price)
}

export function formatPhoneNumber(phoneNumber: string) {
  // Remove any non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '')
  
  // Format UK phone numbers
  if (cleaned.startsWith('44')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`
  }
  
  if (cleaned.startsWith('07') || cleaned.startsWith('02')) {
    return cleaned.replace(/(\d{5})(\d{6})/, '$1 $2')
  }
  
  return phoneNumber
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
}

export function generateBookingReference() {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase()
  return `GQ${timestamp}${randomStr}`
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180)
}

export function estimateJourneyTime(distanceInKm: number) {
  // Average speed in London: 25 km/h
  const averageSpeedKmH = 25
  const timeInHours = distanceInKm / averageSpeedKmH
  return Math.round(timeInHours * 60) // Convert to minutes
}

export function calculateBasePrice(distanceInKm: number, serviceLevel: string) {
  const basePrices = {
    STANDARD: 3.5, // £3.50 per km
    EXECUTIVE: 4.5,
    LUXURY: 6.0,
    VIP: 8.0,
  }

  const baseRate = basePrices[serviceLevel as keyof typeof basePrices] || basePrices.STANDARD
  const price = distanceInKm * baseRate

  // Minimum fare
  const minimumFares = {
    STANDARD: 15,
    EXECUTIVE: 25,
    LUXURY: 35,
    VIP: 50,
  }

  const minimumFare = minimumFares[serviceLevel as keyof typeof minimumFares] || minimumFares.STANDARD

  return Math.max(price, minimumFare)
}

export function applyPeakPricing(basePrice: number, dateTime: Date) {
  const hour = dateTime.getHours()
  const isPeakHour = hour >= 7 && hour <= 9 || hour >= 16 && hour <= 19
  const isNight = hour >= 22 || hour <= 5

  if (isPeakHour) return basePrice * 1.25 // 25% surge during peak hours
  if (isNight) return basePrice * 1.35 // 35% surge during night hours
  return basePrice
}

export const serviceTypes = [
  'AIRPORT_TRANSFER',
  'BUSINESS',
  'CORPORATE',
  'DIPLOMATIC',
  'EVENTS',
  'EXECUTIVE',
  'LUXURY',
  'SECURITY',
  'VIP',
  'WEDDING',
] as const

export const vehicleTypes = [
  'STANDARD',
  'EXECUTIVE',
  'LUXURY',
  'SUV',
  'VAN',
  'VIP',
] as const

export const bookingStatuses = [
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
  'IN_PROGRESS',
  'NO_SHOW',
] as const