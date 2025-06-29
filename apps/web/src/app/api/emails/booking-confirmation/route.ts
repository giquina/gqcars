import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    
    // Validate required fields
    const requiredFields = ['customerName', 'customerEmail', 'service', 'date', 'time', 'pickupLocation', 'bookingId'];
    for (const field of requiredFields) {
      if (!bookingData[field]) {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Send booking confirmation email
    const success = await emailService.sendBookingConfirmation(bookingData);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Booking confirmation email sent successfully' 
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send email' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error sending booking confirmation:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}