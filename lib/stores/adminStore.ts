import { create } from 'zustand'
import { io, Socket } from 'socket.io-client'

export interface BusinessMetrics {
  revenue: {
    daily: number
    weekly: number
    monthly: number
    yearToDate: number
  }
  bookings: {
    completed: number
    cancelled: number
    conversionRate: number
    averageValue: number
  }
  drivers: {
    active: number
    averageRating: number
    completionRate: number
    earnings: number
  }
  customers: {
    new: number
    returning: number
    satisfaction: number
    lifetime_value: number
  }
}

export interface Driver {
  id: string
  name: string
  status: 'available' | 'busy' | 'offline'
  location: { lat: number; lng: number }
  currentBooking?: string
  rating: number
  completedTrips: number
  revenue: number
  siaLicense: {
    number: string
    expiry: Date
    status: 'valid' | 'expiring' | 'expired'
  }
}

export interface Booking {
  id: string
  customerId: string
  driverId: string
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  pickupLocation: string
  destination: string
  scheduledTime: Date
  estimatedFare: number
  actualFare?: number
  serviceType: 'taxi' | 'private_hire' | 'corporate' | 'airport' | 'close_protection'
}

export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  acknowledged: boolean
  category: 'system' | 'compliance' | 'safety' | 'financial'
}

interface AdminState {
  // Connection status
  connected: boolean
  lastUpdate: Date
  
  // Business data
  metrics: BusinessMetrics
  drivers: Driver[]
  bookings: Booking[]
  alerts: Alert[]
  
  // Dashboard filters
  dateRange: {
    start: Date
    end: Date
  }
  selectedService: string | null
  
  // Actions
  connect: () => void
  disconnect: () => void
  updateMetrics: (metrics: Partial<BusinessMetrics>) => void
  updateDrivers: (drivers: Driver[]) => void
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void
  acknowledgeAlert: (alertId: string) => void
  setDateRange: (start: Date, end: Date) => void
  
  // Real-time updates
  socket: Socket | null
}

const generateMockData = (): Partial<AdminState> => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  return {
    metrics: {
      revenue: {
        daily: 2850.50,
        weekly: 18750.25,
        monthly: 78420.75,
        yearToDate: 485320.90
      },
      bookings: {
        completed: 1247,
        cancelled: 28,
        conversionRate: 97.8,
        averageValue: 42.50
      },
      drivers: {
        active: 28,
        averageRating: 4.7,
        completionRate: 98.2,
        earnings: 1250.75
      },
      customers: {
        new: 156,
        returning: 892,
        satisfaction: 4.6,
        lifetime_value: 340.80
      }
    },
    drivers: [
      {
        id: '1',
        name: 'Michael Johnson',
        status: 'available',
        location: { lat: 51.6624, lng: -0.3966 },
        rating: 4.9,
        completedTrips: 1247,
        revenue: 2150.50,
        siaLicense: {
          number: 'SIA-12345678',
          expiry: new Date(2024, 11, 15),
          status: 'valid'
        }
      },
      {
        id: '2',
        name: 'David Smith',
        status: 'busy',
        location: { lat: 51.5074, lng: -0.1278 },
        currentBooking: 'BK-001',
        rating: 4.8,
        completedTrips: 892,
        revenue: 1890.25,
        siaLicense: {
          number: 'SIA-87654321',
          expiry: new Date(2024, 9, 30),
          status: 'expiring'
        }
      }
    ],
    bookings: [
      {
        id: 'BK-001',
        customerId: 'CUST-001',
        driverId: '2',
        status: 'in_progress',
        pickupLocation: 'Watford Junction',
        destination: 'Heathrow Airport',
        scheduledTime: new Date(),
        estimatedFare: 65.00,
        serviceType: 'airport'
      }
    ],
    alerts: [
      {
        id: 'ALT-001',
        type: 'warning',
        title: 'SIA License Expiring',
        message: 'David Smith\'s SIA license expires in 30 days',
        timestamp: new Date(),
        acknowledged: false,
        category: 'compliance'
      },
      {
        id: 'ALT-002',
        type: 'critical',
        title: 'System Performance',
        message: 'API response time above threshold',
        timestamp: new Date(Date.now() - 300000),
        acknowledged: false,
        category: 'system'
      }
    ],
    dateRange: {
      start: today,
      end: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    }
  }
}

export const AdminStore = create<AdminState>((set, get) => ({
  connected: false,
  lastUpdate: new Date(),
  socket: null,
  ...generateMockData(),
  
  connect: () => {
    try {
      const socket = io('/admin', {
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      })
      
      socket.on('connect', () => {
        set({ connected: true, socket })
        console.log('Admin dashboard connected to real-time server')
      })
      
      socket.on('disconnect', () => {
        set({ connected: false })
        console.log('Admin dashboard disconnected from server')
      })
      
      socket.on('metrics_update', (metrics: BusinessMetrics) => {
        set({ 
          metrics,
          lastUpdate: new Date()
        })
      })
      
      socket.on('driver_update', (drivers: Driver[]) => {
        set({ 
          drivers,
          lastUpdate: new Date()
        })
      })
      
      socket.on('booking_update', (bookings: Booking[]) => {
        set({ 
          bookings,
          lastUpdate: new Date()
        })
      })
      
      socket.on('new_alert', (alert: Alert) => {
        set(state => ({
          alerts: [alert, ...state.alerts],
          lastUpdate: new Date()
        }))
      })
      
    } catch (error) {
      console.error('Failed to connect to admin server:', error)
      // Fallback to mock data updates
      setInterval(() => {
        set({ lastUpdate: new Date() })
      }, 10000)
    }
  },
  
  disconnect: () => {
    const { socket } = get()
    if (socket) {
      socket.disconnect()
      set({ connected: false, socket: null })
    }
  },
  
  updateMetrics: (newMetrics) => {
    set(state => ({
      metrics: { ...state.metrics, ...newMetrics },
      lastUpdate: new Date()
    }))
  },
  
  updateDrivers: (drivers) => {
    set({ drivers, lastUpdate: new Date() })
  },
  
  addAlert: (alert) => {
    const newAlert: Alert = {
      ...alert,
      id: `ALT-${Date.now()}`,
      timestamp: new Date()
    }
    
    set(state => ({
      alerts: [newAlert, ...state.alerts],
      lastUpdate: new Date()
    }))
  },
  
  acknowledgeAlert: (alertId) => {
    set(state => ({
      alerts: state.alerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    }))
  },
  
  setDateRange: (start, end) => {
    set({ dateRange: { start, end } })
  }
}))