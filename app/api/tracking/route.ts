import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'update_location':
        return handleLocationUpdate(data);
      case 'start_trip':
        return handleStartTrip(data);
      case 'end_trip':
        return handleEndTrip(data);
      case 'emergency_alert':
        return handleEmergencyAlert(data);
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Tracking API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tripId = searchParams.get('tripId');
    const driverId = searchParams.get('driverId');

    if (tripId) {
      // Return trip tracking data
      return NextResponse.json({
        tripId,
        status: 'in_transit',
        driver: {
          id: 'driver-001',
          name: 'James Mitchell',
          photo: '/drivers/james.jpg',
          rating: 4.9,
          license: 'SIA-12345'
        },
        vehicle: {
          make: 'Mercedes-Benz',
          model: 'S-Class',
          plate: 'GQ21 ABC',
          color: 'Black'
        },
        location: {
          latitude: 51.5074,
          longitude: -0.1278,
          accuracy: 5,
          timestamp: Date.now()
        },
        eta: Date.now() + 15 * 60 * 1000 // 15 minutes
      });
    }

    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  } catch (error) {
    console.error('Tracking GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleLocationUpdate(data: any) {
  // In a real implementation, this would save to database and broadcast via WebSocket
  console.log('Location update:', data);
  
  // Validate accuracy requirement (<10m)
  if (data.accuracy > 10) {
    return NextResponse.json({ 
      warning: 'Location accuracy exceeds 10m threshold',
      accuracy: data.accuracy 
    });
  }

  // Broadcast to connected clients via WebSocket (Socket.io)
  // broadcastLocationUpdate(data);

  return NextResponse.json({ 
    success: true, 
    timestamp: Date.now(),
    accuracy: data.accuracy 
  });
}

async function handleStartTrip(data: any) {
  console.log('Starting trip:', data);
  
  // Initialize trip tracking
  const tripData = {
    tripId: data.tripId,
    status: 'started',
    startTime: Date.now(),
    driver: data.driver,
    vehicle: data.vehicle,
    customer: data.customer
  };

  return NextResponse.json({ success: true, trip: tripData });
}

async function handleEndTrip(data: any) {
  console.log('Ending trip:', data);
  
  return NextResponse.json({ 
    success: true, 
    endTime: Date.now(),
    tripId: data.tripId 
  });
}

async function handleEmergencyAlert(data: any) {
  console.log('EMERGENCY ALERT:', data);
  
  // Immediate response required - <2 minute response time
  const alert = {
    id: `alert-${Date.now()}`,
    type: data.type,
    location: data.location,
    timestamp: Date.now(),
    severity: 'critical',
    responseRequired: true
  };

  // In real implementation:
  // 1. Immediately notify control center
  // 2. Alert emergency contacts
  // 3. Dispatch emergency response team
  // 4. Log to emergency database

  return NextResponse.json({ 
    success: true, 
    alert,
    responseTime: '< 2 minutes',
    controlCenterNotified: true 
  });
}