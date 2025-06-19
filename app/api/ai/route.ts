import { NextRequest, NextResponse } from 'next/server';
import { AIOrchestrator } from '@/app/lib/ai/ai-orchestrator';

// Initialize AI orchestrator
const aiOrchestrator = new AIOrchestrator();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'process_booking':
        return await processBooking(data);
      
      case 'customer_message':
        return await processCustomerMessage(data);
      
      case 'refund_request':
        return await processRefundRequest(data);
      
      case 'business_intelligence':
        return await getBusinessIntelligence(data);
      
      case 'system_status':
        return await getSystemStatus();
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function processBooking(data: any) {
  const {
    serviceType,
    location,
    requestedTime,
    duration,
    customerId,
    weather,
    events,
    traffic
  } = data;

  // Mock external data if not provided
  const mockWeather = weather || {
    temperature: 18,
    precipitation: 0,
    windSpeed: 8,
    visibility: 10,
    conditions: 'clear',
    severity: 'low'
  };

  const mockEvents = events || [];
  
  const mockTraffic = traffic || {
    congestionLevel: 25,
    averageSpeed: 30,
    incidents: 0,
    predictedDelay: 0,
    optimalRoutes: []
  };

  const result = await aiOrchestrator.processBookingRequest(
    {
      serviceType,
      location,
      requestedTime: new Date(requestedTime),
      duration,
      customerId
    },
    {
      weather: mockWeather,
      events: mockEvents,
      traffic: mockTraffic
    }
  );

  return NextResponse.json({
    success: true,
    data: result
  });
}

async function processCustomerMessage(data: any) {
  const { sessionId, message, customerId } = data;

  const result = await aiOrchestrator.processCustomerMessage(
    sessionId,
    message,
    customerId
  );

  return NextResponse.json({
    success: true,
    data: result
  });
}

async function processRefundRequest(data: any) {
  const { transactionId, customerId, reason, amount, serviceType } = data;

  const result = await aiOrchestrator.processRefundRequest(
    transactionId,
    customerId,
    reason,
    amount,
    serviceType
  );

  return NextResponse.json({
    success: true,
    data: result
  });
}

async function getBusinessIntelligence(data: any) {
  const { timeframe = 'weekly' } = data;

  const result = await aiOrchestrator.getBusinessIntelligence(timeframe);

  return NextResponse.json({
    success: true,
    data: result
  });
}

async function getSystemStatus() {
  const status = aiOrchestrator.getSystemStatus();
  const health = aiOrchestrator.getHealthSummary();

  return NextResponse.json({
    success: true,
    data: {
      status,
      health
    }
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  try {
    switch (action) {
      case 'status':
        return await getSystemStatus();
      
      case 'health':
        const health = aiOrchestrator.getHealthSummary();
        return NextResponse.json({
          success: true,
          data: health
        });
      
      case 'metrics':
        const metrics = await aiOrchestrator.getAllPerformanceMetrics();
        return NextResponse.json({
          success: true,
          data: metrics
        });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI API GET Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}