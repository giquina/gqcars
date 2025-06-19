const { Server } = require('socket.io')
const http = require('http')

// Create HTTP server
const server = http.createServer()

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

// Mock data generators
function generateRandomMetrics() {
  return {
    revenue: {
      daily: 2850.50 + (Math.random() - 0.5) * 500,
      weekly: 18750.25 + (Math.random() - 0.5) * 2000,
      monthly: 78420.75 + (Math.random() - 0.5) * 8000,
      yearToDate: 485320.90 + (Math.random() - 0.5) * 50000
    },
    bookings: {
      completed: Math.floor(1247 + (Math.random() - 0.5) * 100),
      cancelled: Math.floor(28 + (Math.random() - 0.5) * 10),
      conversionRate: 97.8 + (Math.random() - 0.5) * 5,
      averageValue: 42.50 + (Math.random() - 0.5) * 10
    },
    drivers: {
      active: Math.floor(28 + (Math.random() - 0.5) * 8),
      averageRating: 4.7 + (Math.random() - 0.5) * 0.4,
      completionRate: 98.2 + (Math.random() - 0.5) * 3,
      earnings: 1250.75 + (Math.random() - 0.5) * 300
    },
    customers: {
      new: Math.floor(156 + (Math.random() - 0.5) * 50),
      returning: Math.floor(892 + (Math.random() - 0.5) * 100),
      satisfaction: 4.6 + (Math.random() - 0.5) * 0.3,
      lifetime_value: 340.80 + (Math.random() - 0.5) * 100
    }
  }
}

function generateDriverUpdates() {
  const drivers = [
    {
      id: '1',
      name: 'Michael Johnson',
      status: Math.random() > 0.7 ? 'busy' : 'available',
      location: { 
        lat: 51.6624 + (Math.random() - 0.5) * 0.01, 
        lng: -0.3966 + (Math.random() - 0.5) * 0.01 
      },
      rating: 4.9 + (Math.random() - 0.5) * 0.1,
      completedTrips: Math.floor(1247 + Math.random() * 10),
      revenue: 2150.50 + (Math.random() - 0.5) * 200,
      siaLicense: {
        number: 'SIA-12345678',
        expiry: new Date(2024, 11, 15),
        status: 'valid'
      }
    },
    {
      id: '2',
      name: 'David Smith',
      status: Math.random() > 0.5 ? 'busy' : 'available',
      location: { 
        lat: 51.5074 + (Math.random() - 0.5) * 0.01, 
        lng: -0.1278 + (Math.random() - 0.5) * 0.01 
      },
      rating: 4.8 + (Math.random() - 0.5) * 0.1,
      completedTrips: Math.floor(892 + Math.random() * 10),
      revenue: 1890.25 + (Math.random() - 0.5) * 200,
      siaLicense: {
        number: 'SIA-87654321',
        expiry: new Date(2024, 9, 30),
        status: 'expiring'
      }
    }
  ]
  
  return drivers
}

function generateBookingUpdates() {
  const bookings = [
    {
      id: 'BK-001',
      customerId: 'CUST-001',
      driverId: '2',
      status: Math.random() > 0.8 ? 'completed' : 'in_progress',
      pickupLocation: 'Watford Junction',
      destination: 'Heathrow Airport',
      scheduledTime: new Date(),
      estimatedFare: 65.00,
      serviceType: 'airport'
    },
    {
      id: 'BK-002',
      customerId: 'CUST-002',
      driverId: '1',
      status: 'pending',
      pickupLocation: 'Central London',
      destination: 'Gatwick Airport',
      scheduledTime: new Date(Date.now() + 3600000),
      estimatedFare: 85.00,
      serviceType: 'airport'
    }
  ]
  
  return bookings
}

function generateRandomAlert() {
  const alertTypes = [
    {
      type: 'critical',
      title: 'System Performance Alert',
      message: 'API response time exceeded 5 seconds',
      category: 'system'
    },
    {
      type: 'warning',
      title: 'Driver License Expiring',
      message: 'John Doe\'s SIA license expires in 15 days',
      category: 'compliance'
    },
    {
      type: 'info',
      title: 'High Demand Period',
      message: 'Booking requests increased by 40% in the last hour',
      category: 'financial'
    },
    {
      type: 'critical',
      title: 'Vehicle Breakdown',
      message: 'Vehicle GQ24 ABC reported mechanical issue',
      category: 'safety'
    }
  ]
  
  const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
  
  return {
    id: `ALT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...randomAlert,
    timestamp: new Date(),
    acknowledged: false
  }
}

// WebSocket connection handling
io.of('/admin').on('connection', (socket) => {
  console.log(`Admin client connected: ${socket.id}`)
  
  // Send initial data
  socket.emit('metrics_update', generateRandomMetrics())
  socket.emit('driver_update', generateDriverUpdates())
  socket.emit('booking_update', generateBookingUpdates())
  
  // Start real-time updates every 10 seconds
  const metricsInterval = setInterval(() => {
    socket.emit('metrics_update', generateRandomMetrics())
  }, 10000)
  
  // Driver location updates every 5 seconds
  const driverInterval = setInterval(() => {
    socket.emit('driver_update', generateDriverUpdates())
  }, 5000)
  
  // Booking updates every 15 seconds
  const bookingInterval = setInterval(() => {
    socket.emit('booking_update', generateBookingUpdates())
  }, 15000)
  
  // Random alerts every 30-120 seconds
  const alertInterval = setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance of alert
      socket.emit('new_alert', generateRandomAlert())
    }
  }, 30000)
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Admin client disconnected: ${socket.id}`)
    clearInterval(metricsInterval)
    clearInterval(driverInterval)
    clearInterval(bookingInterval)
    clearInterval(alertInterval)
  })
  
  // Handle alert acknowledgment
  socket.on('acknowledge_alert', (alertId) => {
    console.log(`Alert acknowledged: ${alertId}`)
    // In a real implementation, this would update the database
  })
  
  // Handle admin actions
  socket.on('update_driver_status', (data) => {
    console.log(`Driver status update:`, data)
    // Broadcast to all admin clients
    socket.broadcast.emit('driver_status_changed', data)
  })
  
  socket.on('emergency_alert', (data) => {
    console.log(`Emergency alert:`, data)
    // Broadcast emergency alert to all admin clients
    io.of('/admin').emit('emergency_alert', {
      id: `EMG-${Date.now()}`,
      type: 'critical',
      title: 'EMERGENCY ALERT',
      message: data.message,
      timestamp: new Date(),
      category: 'safety',
      acknowledged: false
    })
  })
})

// Health check endpoint
server.on('request', (req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ 
      status: 'healthy', 
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      connections: io.of('/admin').sockets.size
    }))
  } else {
    res.writeHead(404)
    res.end('Not Found')
  }
})

// Start server
const PORT = process.env.ADMIN_WEBSOCKET_PORT || 4000

server.listen(PORT, () => {
  console.log(`🚀 GQ Cars Admin WebSocket Server running on port ${PORT}`)
  console.log(`📊 Admin namespace: /admin`)
  console.log(`🏥 Health check: http://localhost:${PORT}/health`)
  
  // Log server stats every 60 seconds
  setInterval(() => {
    const connectedClients = io.of('/admin').sockets.size
    console.log(`📈 Server Status: ${connectedClients} admin client(s) connected, uptime: ${Math.floor(process.uptime())}s`)
  }, 60000)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})