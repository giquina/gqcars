import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { CorporateRegistrationData } from '@/app/types/corporate'

const prisma = new PrismaClient()

// Validation schema for corporate registration
const corporateRegistrationSchema = z.object({
  // Company details
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  domain: z.string().email('Please enter a valid domain email'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.enum(['STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']),
  address: z.string().min(5, 'Please enter a complete address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  vatNumber: z.string().optional(),
  
  // Admin user details
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character'),
  position: z.string().min(2, 'Position is required'),
  
  // Initial settings
  monthlyBudgetLimit: z.number().positive().optional(),
  requireApprovalAbove: z.number().positive().min(100, 'Minimum approval amount is £100'),
  maxBookingAmount: z.number().positive().min(1000, 'Minimum maximum booking amount is £1000')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input data
    const validatedData = corporateRegistrationSchema.parse(body)
    
    // Check if company domain already exists
    const existingCompany = await prisma.company.findUnique({
      where: { domain: validatedData.domain }
    })
    
    if (existingCompany) {
      return NextResponse.json(
        { success: false, error: 'A company with this domain already exists' },
        { status: 400 }
      )
    }
    
    // Check if admin email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'A user with this email already exists' },
        { status: 400 }
      )
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)
    
    // Create company and admin user in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create company
      const company = await tx.company.create({
        data: {
          name: validatedData.companyName,
          domain: validatedData.domain,
          industry: validatedData.industry,
          size: validatedData.companySize,
          address: validatedData.address,
          city: validatedData.city,
          country: validatedData.country,
          phone: validatedData.phone,
          website: validatedData.website || undefined,
          vatNumber: validatedData.vatNumber || undefined
        }
      })
      
      // Create company settings
      const settings = await tx.companySettings.create({
        data: {
          companyId: company.id,
          requireApprovalAbove: validatedData.requireApprovalAbove,
          maxBookingAmount: validatedData.maxBookingAmount,
          monthlyBudgetLimit: validatedData.monthlyBudgetLimit || undefined,
          require2FA: false,
          requireVPN: false,
          allowedDomains: [validatedData.domain.split('@')[1]],
          enableSOXCompliance: false,
          enableGDPRCompliance: true,
          dataRetentionMonths: 84
        }
      })
      
      // Create admin user
      const adminUser = await tx.user.create({
        data: {
          email: validatedData.email,
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          position: validatedData.position,
          companyId: company.id,
          role: 'ADMIN',
          password: hashedPassword,
          status: 'ACTIVE',
          twoFactorEnabled: false
        }
      })
      
      // Create default permissions for admin
      const adminPermissions = [
        { resource: 'BOOKINGS', action: 'CREATE' },
        { resource: 'BOOKINGS', action: 'READ' },
        { resource: 'BOOKINGS', action: 'UPDATE' },
        { resource: 'BOOKINGS', action: 'DELETE' },
        { resource: 'BOOKINGS', action: 'APPROVE' },
        { resource: 'USERS', action: 'CREATE' },
        { resource: 'USERS', action: 'READ' },
        { resource: 'USERS', action: 'UPDATE' },
        { resource: 'USERS', action: 'DELETE' },
        { resource: 'DEPARTMENTS', action: 'CREATE' },
        { resource: 'DEPARTMENTS', action: 'READ' },
        { resource: 'DEPARTMENTS', action: 'UPDATE' },
        { resource: 'DEPARTMENTS', action: 'DELETE' },
        { resource: 'COST_CENTERS', action: 'CREATE' },
        { resource: 'COST_CENTERS', action: 'READ' },
        { resource: 'COST_CENTERS', action: 'UPDATE' },
        { resource: 'COST_CENTERS', action: 'DELETE' },
        { resource: 'BUDGETS', action: 'CREATE' },
        { resource: 'BUDGETS', action: 'READ' },
        { resource: 'BUDGETS', action: 'UPDATE' },
        { resource: 'BUDGETS', action: 'DELETE' },
        { resource: 'INVOICES', action: 'READ' },
        { resource: 'INVOICES', action: 'EXPORT' },
        { resource: 'POLICIES', action: 'CREATE' },
        { resource: 'POLICIES', action: 'READ' },
        { resource: 'POLICIES', action: 'UPDATE' },
        { resource: 'POLICIES', action: 'DELETE' },
        { resource: 'REPORTS', action: 'READ' },
        { resource: 'REPORTS', action: 'EXPORT' },
        { resource: 'SETTINGS', action: 'READ' },
        { resource: 'SETTINGS', action: 'UPDATE' }
      ]
      
      await tx.permission.createMany({
        data: adminPermissions.map(permission => ({
          userId: adminUser.id,
          resource: permission.resource as any,
          action: permission.action as any,
          granted: true
        }))
      })
      
      // Create default department
      const defaultDepartment = await tx.department.create({
        data: {
          name: 'General',
          description: 'Default department for all users',
          companyId: company.id,
          managerId: adminUser.id
        }
      })
      
      // Update admin user with department
      await tx.user.update({
        where: { id: adminUser.id },
        data: { departmentId: defaultDepartment.id }
      })
      
      // Create initial budget if monthly limit is set
      if (validatedData.monthlyBudgetLimit) {
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1
        
        await tx.budget.create({
          data: {
            name: `Monthly Budget - ${currentMonth}/${currentYear}`,
            companyId: company.id,
            departmentId: defaultDepartment.id,
            period: 'MONTHLY',
            year: currentYear,
            month: currentMonth,
            allocated: validatedData.monthlyBudgetLimit,
            spent: 0,
            committed: 0,
            available: validatedData.monthlyBudgetLimit,
            alertAt75: true,
            alertAt90: true,
            alertAt100: true,
            status: 'ACTIVE'
          }
        })
      }
      
      // Log activity
      await tx.userActivity.create({
        data: {
          userId: adminUser.id,
          action: 'LOGIN',
          resource: company.id,
          resourceType: 'company',
          details: { event: 'company_registration', ip: request.ip || 'unknown' },
          ipAddress: request.ip || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        }
      })
      
      return {
        company,
        settings,
        adminUser: {
          id: adminUser.id,
          email: adminUser.email,
          firstName: adminUser.firstName,
          lastName: adminUser.lastName,
          role: adminUser.role,
          position: adminUser.position
        },
        department: defaultDepartment
      }
    })
    
    // Send welcome email (would implement actual email service)
    console.log(`Welcome email would be sent to ${validatedData.email}`)
    
    return NextResponse.json({
      success: true,
      message: 'Corporate account created successfully',
      data: {
        companyId: result.company.id,
        companyName: result.company.name,
        adminUser: result.adminUser,
        department: result.department
      }
    })
    
  } catch (error: any) {
    console.error('Corporate registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: error.errors 
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}