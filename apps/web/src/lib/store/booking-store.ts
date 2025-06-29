import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Booking } from '@prisma/client'

interface BookingState {
  currentBooking: Partial<Booking> | null
  setCurrentBooking: (booking: Partial<Booking> | null) => void
  recentBookings: Booking[]
  addRecentBooking: (booking: Booking) => void
  clearRecentBookings: () => void
  temporaryDetails: {
    pickupAddress?: string
    destinationAddress?: string
    scheduledDateTime?: Date
    passengers?: number
    serviceType?: string
  }
  setTemporaryDetails: (details: Partial<BookingState['temporaryDetails']>) => void
  clearTemporaryDetails: () => void
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      currentBooking: null,
      setCurrentBooking: (booking) => set({ currentBooking: booking }),
      recentBookings: [],
      addRecentBooking: (booking) =>
        set((state) => ({
          recentBookings: [booking, ...state.recentBookings].slice(0, 5),
        })),
      clearRecentBookings: () => set({ recentBookings: [] }),
      temporaryDetails: {},
      setTemporaryDetails: (details) =>
        set((state) => ({
          temporaryDetails: { ...state.temporaryDetails, ...details },
        })),
      clearTemporaryDetails: () => set({ temporaryDetails: {} }),
    }),
    {
      name: 'booking-store',
      partialize: (state) => ({
        recentBookings: state.recentBookings,
        temporaryDetails: state.temporaryDetails,
      }),
    }
  )
)