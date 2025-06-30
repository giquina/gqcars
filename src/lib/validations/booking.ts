import * as z from 'zod'
import { serviceTypes, vehicleTypes, bookingStatuses } from '@/lib/utils'

export const bookingSchema = z.object({
  serviceType: z.enum(serviceTypes),
  vehicleType: z.enum(vehicleTypes),
  pickupAddress: z.string().min(1, 'Pickup address is required'),
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),
  destinationAddress: z.string().min(1, 'Destination address is required'),
  destinationLat: z.number().optional(),
  destinationLng: z.number().optional(),
  scheduledDateTime: z.date(),
  estimatedPrice: z.number().min(0),
  specialRequirements: z.string().optional(),
  securityLevel: z.enum(['STANDARD', 'ENHANCED', 'EXECUTIVE', 'VIP']),
})

export const bookingUpdateSchema = z.object({
  status: z.enum(bookingStatuses).optional(),
  actualPickupTime: z.date().optional(),
  actualDropoffTime: z.date().optional(),
  finalPrice: z.number().min(0).optional(),
  driverId: z.string().optional(),
  specialRequirements: z.string().optional(),
})

export const bookingQuerySchema = z.object({
  status: z.enum(bookingStatuses).optional(),
  fromDate: z.date().optional(),
  toDate: z.date().optional(),
  limit: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>
export type BookingUpdateData = z.infer<typeof bookingUpdateSchema>
export type BookingQueryParams = z.infer<typeof bookingQuerySchema>