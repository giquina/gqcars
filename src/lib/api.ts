import axios from 'axios'
import { AppError } from './exceptions'
import { BookingFormData, BookingQueryParams, BookingUpdateData } from '../types/prisma'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          throw new AppError('Please log in to continue', 401, 'UNAUTHORIZED')
        case 403:
          throw new AppError('You do not have permission to perform this action', 403, 'FORBIDDEN')
        case 404:
          throw new AppError('Resource not found', 404, 'NOT_FOUND')
        case 422:
          throw new AppError('Invalid data provided', 422, 'VALIDATION_ERROR')
        default:
          throw new AppError(
            data?.message || 'An unexpected error occurred',
            status,
            data?.code
          )
      }
    }
    throw error
  }
)

export const bookingsApi = {
  create: async (data: BookingFormData) => {
    const response = await api.post('/bookings', data)
    return response.data
  },

  getAll: async (params?: BookingQueryParams) => {
    const response = await api.get('/bookings', { params })
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  },

  update: async (id: string, data: BookingUpdateData) => {
    const response = await api.patch(`/bookings/${id}`, data)
    return response.data
  },

  cancel: async (id: string) => {
    const response = await api.post(`/bookings/${id}/cancel`)
    return response.data
  },
}

export const quotesApi = {
  calculate: async (data: {
    pickupLat: number
    pickupLng: number
    destinationLat: number
    destinationLng: number
    serviceType: string
    scheduledDateTime: Date
  }) => {
    const response = await api.post('/quotes/calculate', data)
    return response.data
  },
}

export const paymentsApi = {
  createIntent: async (data: {
    bookingId: string
    amount: number
    currency?: string
  }) => {
    const response = await api.post('/payments/create-intent', data)
    return response.data
  },
}

export const locationsApi = {
  geocode: async (address: string) => {
    const response = await api.get('/locations/geocode', {
      params: { address },
    })
    return response.data
  },

  reverseGeocode: async (lat: number, lng: number) => {
    const response = await api.get('/locations/reverse-geocode', {
      params: { lat, lng },
    })
    return response.data
  },

  autocomplete: async (input: string) => {
    const response = await api.get('/locations/autocomplete', {
      params: { input },
    })
    return response.data
  },
}

export const usersApi = {
  updateProfile: async (data: {
    name?: string
    phone?: string
    email?: string
  }) => {
    const response = await api.patch('/users/profile', data)
    return response.data
  },

  getBookingHistory: async () => {
    const response = await api.get('/users/bookings')
    return response.data
  },
}