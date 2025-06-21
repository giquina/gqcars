import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const driverSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string(),
  licenseNumber: z.string(),
  siaLicense: z.string().optional(),
  yearsExperience: z.number().optional(),
  specializations: z.array(z.string()).optional(),
})

// Create new driver
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    // TODO: Add admin role check
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const validatedData = driverSchema.parse(data)

    // Check if driver already exists
    const existingDriver = await prisma.driver.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          { licenseNumber: validatedData.licenseNumber }
        ]
      }
    })

    if (existingDriver) {
      return NextResponse.json(
        { error: 'Driver with this email or license already exists' },
        { status: 400 }
      )
    }

    const driver = await prisma.driver.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        licenseNumber: validatedData.licenseNumber,
        siaLicense: validatedData.siaLicense,
        yearsExperience: validatedData.yearsExperience,
        specializations: validatedData.specializations || [],
        status: 'AVAILABLE',
      }
    })

    return NextResponse.json({
      success: true,
      driver,
    })

  } catch (error) {
    console.error('Driver creation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid driver data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create driver' },
      { status: 500 }
    )
  }
}

// Get all drivers
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where = status ? { status: status.toUpperCase() } : {}

    const [drivers, total] = await Promise.all([
      prisma.driver.findMany({
        where,
        include: {
          bookings: {
            select: {
              id: true,
              status: true,
              date: true,
              serviceType: true,
            },
            orderBy: { date: 'desc' },
            take: 5,
          },
          vehicles: {
            include: {
              vehicle: {
                select: {
                  make: true,
                  model: true,
                  year: true,
                  licensePlate: true,
                }
              }
            }
          },
          _count: {
            select: {
              bookings: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.driver.count({ where }),
    ])

    return NextResponse.json({
      drivers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    })

  } catch (error) {
    console.error('Driver retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve drivers' },
      { status: 500 }
    )
  }
}

// Update driver status
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { driverId, status, currentLocation } = await request.json()

    const driver = await prisma.driver.update({
      where: { id: driverId },
      data: {
        status: status.toUpperCase(),
        ...(currentLocation && { currentLocation }),
        updatedAt: new Date(),
      }
    })

    return NextResponse.json({
      success: true,
      driver,
    })

  } catch (error) {
    console.error('Driver update error:', error)
    return NextResponse.json(
      { error: 'Failed to update driver' },
      { status: 500 }
    )
  }
}