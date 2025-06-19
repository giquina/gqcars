# GQ Cars Tracking Components

## Component Architecture

### LiveMap.tsx
Real-time GPS tracking interface with live driver location updates.

**Features:**
- WebSocket connection for 10-second GPS updates
- Sub-10 meter accuracy validation
- ETA calculation with traffic data
- Emergency button integration
- Driver and vehicle information display

**Props:**
```typescript
interface LiveMapProps {
  tripId: string
  customerId: string
}
```

### EmergencyPanel.tsx
Comprehensive safety system with emergency response capabilities.

**Features:**
- Emergency panic button with 2-minute response guarantee
- Journey sharing with up to 5 emergency contacts
- Emergency contact management
- Safety monitoring dashboard
- Real-time response timer

**State Management:**
- Uses Zustand store for emergency mode
- Integrates with tracking API for alert dispatch
- Handles emergency contact notifications

### CommunicationPanel.tsx
Secure messaging and calling interface.

**Features:**
- End-to-end encrypted messaging with AES
- Voice message recording and playback
- Multi-language message templates
- Masked phone number calling
- Real-time message delivery and read receipts

**Security:**
- All messages encrypted with crypto-js
- Phone numbers masked for privacy
- Message templates with translations

### DriverVerification.tsx
Driver and vehicle identity verification system.

**Features:**
- QR code verification
- SIA license validation
- Driver rating and review display
- Vehicle information verification
- Security checklist monitoring

**Verification Process:**
1. SIA license check
2. Driver identity confirmation
3. Vehicle registration match
4. Background check validation
5. QR code verification

### ControlCenterDashboard.tsx
24/7 monitoring and emergency response dashboard.

**Features:**
- Real-time trip monitoring
- Emergency alert management
- Response team dispatch
- System statistics tracking
- Performance metrics dashboard

## State Management

### TrackingStore (Zustand)
Centralized state management for all tracking functionality.

**State Structure:**
```typescript
interface TrackingStore {
  currentTrip: TripData | null
  driverLocation: LocationData | null
  currentDriver: DriverProfile | null
  currentVehicle: VehicleInfo | null
  activeAlerts: SafetyAlert[]
  emergencyMode: boolean
  messages: Message[]
  isConnected: boolean
  trackingEnabled: boolean
}
```

## API Integration

### Tracking API
- `POST /api/tracking` - Location updates, trip management, emergency alerts
- `GET /api/tracking?tripId=xxx` - Trip status and driver information

### Communication API
- `POST /api/communication` - Send messages, initiate calls, voice messages
- `GET /api/communication?tripId=xxx` - Message history

## Security Features

### Message Encryption
```typescript
const encrypted = CryptoJS.AES.encrypt(content, ENCRYPTION_KEY).toString()
```

### Emergency Response
- Automatic dispatch to control center
- Emergency contact notification
- GPS location sharing
- Response time tracking

### Privacy Protection
- Masked phone numbers for calls
- Encrypted message storage
- Anonymous location sharing options

## Performance Requirements

- **GPS Accuracy:** < 10 meters
- **Update Frequency:** Every 10 seconds
- **Emergency Response:** < 2 minutes
- **System Uptime:** 99.9%
- **Message Delivery:** 100% rate

## Usage Examples

### Initialize Tracking
```typescript
const { setCurrentTrip, enableTracking } = useTrackingStore()

setCurrentTrip(tripData)
enableTracking()
```

### Send Emergency Alert
```typescript
const response = await fetch('/api/tracking', {
  method: 'POST',
  body: JSON.stringify({
    action: 'emergency_alert',
    data: { tripId, type: 'panic', location }
  })
})
```

### Send Encrypted Message
```typescript
const response = await fetch('/api/communication', {
  method: 'POST',
  body: JSON.stringify({
    action: 'send_message',
    data: { tripId, content, senderId, receiverId }
  })
})
```

## Dependencies

- **React 18** - Component framework
- **Socket.io** - Real-time communication
- **Zustand** - State management
- **Crypto-js** - Message encryption
- **Google Maps API** - Location services
- **Lucide React** - Icon library