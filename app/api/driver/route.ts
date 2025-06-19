import { NextRequest, NextResponse } from 'next/server';

// Driver data interfaces
interface DriverProfile {
  id: string;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationalInsurance: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      postcode: string;
      country: string;
    };
  };
  siaLicense: {
    licenseNumber: string;
    holderName: string;
    expiryDate: string;
    licenseType: string;
    status: 'active' | 'expired' | 'suspended';
    verifiedAt: string;
  };
  documents: DriverDocument[];
  status: 'pending' | 'approved' | 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

interface DriverDocument {
  id: string;
  type: string;
  name: string;
  status: 'valid' | 'expired' | 'pending' | 'rejected';
  uploadDate: string;
  expiryDate: string;
  fileUrl: string;
}

interface DriverStats {
  totalRides: number;
  averageRating: number;
  totalHours: number;
  completionRate: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
}

// Mock database - In production, this would be replaced with actual database queries
const mockDriverData: Record<string, DriverProfile> = {
  'DRV001': {
    id: 'DRV001',
    personalDetails: {
      firstName: 'James',
      lastName: 'Wilson',
      email: 'james.wilson@email.com',
      phone: '07400123456',
      dateOfBirth: '1985-03-15',
      nationalInsurance: 'AB123456C',
      address: {
        line1: '123 High Street',
        line2: 'Apartment 4B',
        city: 'Watford',
        postcode: 'WD17 1AA',
        country: 'United Kingdom'
      }
    },
    siaLicense: {
      licenseNumber: '12345678',
      holderName: 'James Wilson',
      expiryDate: '2026-06-15',
      licenseType: 'Close Protection',
      status: 'active',
      verifiedAt: '2024-01-10T10:30:00Z'
    },
    documents: [
      {
        id: 'DOC001',
        type: 'sia_license',
        name: 'SIA Close Protection License',
        status: 'valid',
        uploadDate: '2023-12-01T00:00:00Z',
        expiryDate: '2026-12-01T00:00:00Z',
        fileUrl: '/documents/sia_license_001.pdf'
      },
      {
        id: 'DOC002',
        type: 'driving_license',
        name: 'UK Driving License',
        status: 'valid',
        uploadDate: '2023-11-15T00:00:00Z',
        expiryDate: '2025-11-15T00:00:00Z',
        fileUrl: '/documents/driving_license_001.pdf'
      }
    ],
    status: 'active',
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-14T10:30:00Z'
  }
};

const mockDriverStats: Record<string, DriverStats> = {
  'DRV001': {
    totalRides: 1247,
    averageRating: 4.9,
    totalHours: 1840,
    completionRate: 98.5,
    weeklyEarnings: 485.50,
    monthlyEarnings: 2150.25
  }
};

// Utility functions
const authenticateDriver = (request: NextRequest): string | null => {
  // In production, implement proper JWT token validation
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  // Mock authentication - return driver ID
  return 'DRV001';
};

const validateDriverData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.personalDetails?.firstName) errors.push('First name is required');
  if (!data.personalDetails?.lastName) errors.push('Last name is required');
  if (!data.personalDetails?.email) errors.push('Email is required');
  if (!data.siaLicense?.licenseNumber) errors.push('SIA license number is required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// API Routes
export async function GET(request: NextRequest) {
  try {
    const driverId = authenticateDriver(request);
    if (!driverId) {
      return NextResponse.json(
        { error: 'Unauthorized - Valid driver token required' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');

    switch (endpoint) {
      case 'profile':
        const profile = mockDriverData[driverId];
        if (!profile) {
          return NextResponse.json(
            { error: 'Driver profile not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ driver: profile });

      case 'stats':
        const stats = mockDriverStats[driverId];
        if (!stats) {
          return NextResponse.json(
            { error: 'Driver stats not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ stats });

      case 'documents':
        const driver = mockDriverData[driverId];
        if (!driver) {
          return NextResponse.json(
            { error: 'Driver not found' },
            { status: 404 }
          );
        }
        return NextResponse.json({ documents: driver.documents });

      case 'earnings':
        // Mock earnings data
        const earningsData = {
          totalEarnings: 15420.75,
          weeklyEarnings: 485.50,
          monthlyEarnings: 2150.25,
          tips: 145.80,
          bonuses: 250.00,
          pendingPayout: 485.50,
          lastPayout: 2150.25,
          payoutDate: '2024-01-12T00:00:00Z',
          weeklyData: [
            { week: 'Week 1', earnings: 420.50, rides: 32 },
            { week: 'Week 2', earnings: 465.25, rides: 38 },
            { week: 'Week 3', earnings: 510.75, rides: 41 },
            { week: 'Week 4', earnings: 485.50, rides: 35 }
          ]
        };
        return NextResponse.json({ earnings: earningsData });

      case 'shifts':
        // Mock shifts data
        const shiftsData = [
          {
            id: '1',
            date: '2024-01-15',
            startTime: '09:00',
            endTime: '17:00',
            zone: 'Central London',
            status: 'confirmed',
            earnings: 145.50,
            rides: 12
          },
          {
            id: '2',
            date: '2024-01-16',
            startTime: '14:00',
            endTime: '22:00',
            zone: 'Heathrow Airport',
            status: 'scheduled'
          }
        ];
        return NextResponse.json({ shifts: shiftsData });

      case 'notifications':
        // Mock notifications data
        const notifications = [
          {
            id: '1',
            type: 'document',
            title: 'DBS Certificate Expiring Soon',
            message: 'Your Enhanced DBS Certificate expires in 30 days. Please upload a renewed certificate.',
            timestamp: '2024-01-14T10:30:00Z',
            read: false,
            priority: 'high',
            actionRequired: true
          },
          {
            id: '2',
            type: 'shift',
            title: 'New Shift Assignment',
            message: 'You have been assigned a VIP transfer for tomorrow at 14:00. Location: Heathrow Terminal 5.',
            timestamp: '2024-01-14T09:15:00Z',
            read: false,
            priority: 'medium'
          }
        ];
        return NextResponse.json({ notifications });

      default:
        return NextResponse.json(
          { error: 'Invalid endpoint parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Driver API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const driverId = authenticateDriver(request);
    if (!driverId) {
      return NextResponse.json(
        { error: 'Unauthorized - Valid driver token required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const url = new URL(request.url);
    const action = url.searchParams.get('action');

    switch (action) {
      case 'update-profile':
        const validation = validateDriverData(body);
        if (!validation.isValid) {
          return NextResponse.json(
            { error: 'Validation failed', details: validation.errors },
            { status: 400 }
          );
        }

        // Mock profile update
        if (mockDriverData[driverId]) {
          mockDriverData[driverId] = {
            ...mockDriverData[driverId],
            ...body,
            updatedAt: new Date().toISOString()
          };
        }

        return NextResponse.json({
          message: 'Profile updated successfully',
          driver: mockDriverData[driverId]
        });

      case 'upload-document':
        if (!body.documentType || !body.file) {
          return NextResponse.json(
            { error: 'Document type and file are required' },
            { status: 400 }
          );
        }

        // Mock document upload
        const newDocument: DriverDocument = {
          id: `DOC${Date.now()}`,
          type: body.documentType,
          name: body.fileName,
          status: 'pending',
          uploadDate: new Date().toISOString(),
          expiryDate: body.expiryDate || '',
          fileUrl: `/documents/${body.fileName}`
        };

        if (mockDriverData[driverId]) {
          mockDriverData[driverId].documents.push(newDocument);
          mockDriverData[driverId].updatedAt = new Date().toISOString();
        }

        return NextResponse.json({
          message: 'Document uploaded successfully',
          document: newDocument
        });

      case 'sia-verification':
        if (!body.siaLicenseNumber || !body.holderName) {
          return NextResponse.json(
            { error: 'SIA license number and holder name are required' },
            { status: 400 }
          );
        }

        // Mock SIA verification
        const verificationResult = {
          licenseNumber: body.siaLicenseNumber,
          holderName: body.holderName,
          status: 'active',
          licenseType: 'Close Protection',
          issueDate: '2021-06-15',
          expiryDate: '2026-06-15',
          sectors: ['Close Protection', 'Security Guarding'],
          verified: true,
          verifiedAt: new Date().toISOString()
        };

        return NextResponse.json({
          message: 'SIA license verified successfully',
          verification: verificationResult
        });

      case 'schedule-shift':
        if (!body.date || !body.startTime || !body.endTime || !body.zone) {
          return NextResponse.json(
            { error: 'Date, start time, end time, and zone are required' },
            { status: 400 }
          );
        }

        // Mock shift scheduling
        const newShift = {
          id: `SHIFT${Date.now()}`,
          date: body.date,
          startTime: body.startTime,
          endTime: body.endTime,
          zone: body.zone,
          status: 'scheduled',
          createdAt: new Date().toISOString()
        };

        return NextResponse.json({
          message: 'Shift scheduled successfully',
          shift: newShift
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Driver API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const driverId = authenticateDriver(request);
    if (!driverId) {
      return NextResponse.json(
        { error: 'Unauthorized - Valid driver token required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const url = new URL(request.url);
    const resource = url.searchParams.get('resource');
    const resourceId = url.searchParams.get('id');

    switch (resource) {
      case 'availability':
        // Mock availability update
        return NextResponse.json({
          message: 'Availability updated successfully',
          availability: {
            driverId,
            status: body.status,
            updatedAt: new Date().toISOString()
          }
        });

      case 'shift':
        if (!resourceId) {
          return NextResponse.json(
            { error: 'Shift ID is required' },
            { status: 400 }
          );
        }

        // Mock shift update
        return NextResponse.json({
          message: 'Shift updated successfully',
          shift: {
            id: resourceId,
            ...body,
            updatedAt: new Date().toISOString()
          }
        });

      default:
        return NextResponse.json(
          { error: 'Invalid resource parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Driver API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const driverId = authenticateDriver(request);
    if (!driverId) {
      return NextResponse.json(
        { error: 'Unauthorized - Valid driver token required' },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const resource = url.searchParams.get('resource');
    const resourceId = url.searchParams.get('id');

    if (!resourceId) {
      return NextResponse.json(
        { error: 'Resource ID is required' },
        { status: 400 }
      );
    }

    switch (resource) {
      case 'shift':
        // Mock shift deletion
        return NextResponse.json({
          message: 'Shift cancelled successfully',
          deletedShiftId: resourceId
        });

      case 'notification':
        // Mock notification deletion
        return NextResponse.json({
          message: 'Notification deleted successfully',
          deletedNotificationId: resourceId
        });

      default:
        return NextResponse.json(
          { error: 'Invalid resource parameter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Driver API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}