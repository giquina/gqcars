import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json();
    
    // Log the error (in production, you'd send this to a monitoring service)
    console.error('Client Error Reported:', {
      timestamp: new Date().toISOString(),
      ...errorData,
    });

    // In production, you would send this to services like:
    // - Sentry
    // - LogRocket  
    // - Datadog
    // - Your own logging service

    // For now, we'll just acknowledge receipt
    return NextResponse.json({ 
      success: true, 
      message: 'Error logged successfully' 
    });
    
  } catch (error) {
    console.error('Failed to process error report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to log error' },
      { status: 500 }
    );
  }
}