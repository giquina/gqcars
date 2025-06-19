import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const bookingSchema = z.object({
  serviceType: z.enum(["TAXI", "PRIVATE_HIRE", "AIRPORT_TRANSFER", "CORPORATE", "SECURITY", "WEDDING"]),
  vehicleType: z.enum(["STANDARD", "EXECUTIVE", "SUV", "VAN", "LUXURY"]),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  destinationAddress: z.string().min(5, "Destination address is required"),
  scheduledDateTime: z.string().datetime(),
  specialRequirements: z.string().optional(),
  securityLevel: z.enum(["STANDARD", "ENHANCED", "EXECUTIVE", "VIP"]).default("STANDARD")
})

// Calculate pricing based on service type and security level
function calculateEstimatedPrice(serviceType: string, vehicleType: string, securityLevel: string): number {
  let basePrice = 50 // Base price in GBP
  
  // Service type multipliers
  const serviceMultipliers = {
    TAXI: 1.0,
    PRIVATE_HIRE: 1.2,
    AIRPORT_TRANSFER: 1.5,
    CORPORATE: 1.8,
    SECURITY: 2.5,
    WEDDING: 2.0
  }
  
  // Vehicle type multipliers
  const vehicleMultipliers = {
    STANDARD: 1.0,
    EXECUTIVE: 1.5,
    SUV: 1.3,
    VAN: 1.4,
    LUXURY: 2.0
  }
  
  // Security level multipliers (SIA premium)
  const securityMultipliers = {
    STANDARD: 1.0,
    ENHANCED: 1.3,
    EXECUTIVE: 1.8,
    VIP: 2.5
  }
  
  return basePrice * 
    (serviceMultipliers[serviceType as keyof typeof serviceMultipliers] || 1.0) *
    (vehicleMultipliers[vehicleType as keyof typeof vehicleMultipliers] || 1.0) *
    (securityMultipliers[securityLevel as keyof typeof securityMultipliers] || 1.0)
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Generate booking reference
    const bookingReference = `GQ${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Calculate estimated price
    const estimatedPrice = calculateEstimatedPrice(
      validatedData.serviceType,
      validatedData.vehicleType,
      validatedData.securityLevel
    )

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        userId: session.user.id,
        serviceType: validatedData.serviceType,
        vehicleType: validatedData.vehicleType,
        pickupAddress: validatedData.pickupAddress,
        destinationAddress: validatedData.destinationAddress,
        scheduledDateTime: new Date(validatedData.scheduledDateTime),
        specialRequirements: validatedData.specialRequirements,
        securityLevel: validatedData.securityLevel,
        estimatedPrice,
        status: "PENDING"
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true
          }
        }
      }
    })

    return NextResponse.json({
      message: "Booking created successfully",
      booking
    }, { status: 201 })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Booking creation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        driver: {
          include: {
            vehicle: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ bookings })

  } catch (error) {
    console.error("Fetch bookings error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
