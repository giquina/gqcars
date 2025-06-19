# GQ Cars Driver Portal System

A comprehensive driver management system for GQ Cars LTD, featuring SIA verification, document management, shift scheduling, earnings tracking, and performance monitoring.

## 🚗 Overview

The Driver Portal System is designed to manage and maintain high SIA standards while ensuring driver satisfaction. It provides a complete solution for driver onboarding, verification, scheduling, and performance tracking.

## ✨ Key Features

### 1. **Driver Onboarding**
- Step-by-step registration process
- SIA license verification with real-time database checks
- Document upload and verification system
- Background check integration (DBS API)
- Vehicle inspection checklist with photo upload
- Training module completion tracking

### 2. **Shift Management**
- Availability calendar with shift scheduling
- Real-time availability toggle
- Automatic shift reminders
- Break time management
- Zone-based scheduling optimization
- Weekly/monthly shift overview

### 3. **Earnings & Performance**
- Real-time earnings dashboard
- Weekly/monthly payout calculations
- Performance metrics tracking (ratings, completion rate)
- Bonus and incentive calculations
- Earnings history and tax documentation
- Customer feedback and rating system

### 4. **Driver Support**
- Comprehensive notification center
- Document status monitoring with expiry alerts
- Training resource library
- Driver-to-support communication
- License renewal reminder system
- 24/7 support access

## 🏗️ System Architecture

```
├── app/
│   ├── driver-portal/           # Main driver dashboard
│   ├── driver-onboarding/       # Registration & verification
│   ├── components/
│   │   ├── driver/              # Driver portal components
│   │   │   ├── DriverStats.tsx
│   │   │   ├── EarningsSummary.tsx
│   │   │   ├── ShiftSchedule.tsx
│   │   │   ├── DocumentStatus.tsx
│   │   │   ├── PerformanceMetrics.tsx
│   │   │   └── NotificationCenter.tsx
│   │   └── onboarding/          # Onboarding form components
│   │       ├── PersonalDetailsForm.tsx
│   │       ├── SIAVerificationForm.tsx
│   │       ├── DocumentUploadForm.tsx
│   │       ├── VehicleInspectionForm.tsx
│   │       ├── BackgroundCheckForm.tsx
│   │       ├── TrainingModulesForm.tsx
│   │       └── OnboardingComplete.tsx
│   └── api/
│       └── driver/              # Driver API endpoints
└── docs/
    └── DRIVER-PORTAL-README.md  # This documentation
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Next.js 14+
- TypeScript

### Dependencies
```bash
npm install
```

Key packages installed:
- `@radix-ui/*` - UI components
- `framer-motion` - Animations
- `lucide-react` - Icons
- `date-fns` - Date handling
- `react-hook-form` - Form validation
- `zod` - Schema validation
- `recharts` - Data visualization
- `react-dropzone` - File uploads

### Environment Variables
Create a `.env.local` file:
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
SIA_API_KEY=your_sia_api_key
DBS_API_KEY=your_dbs_api_key

# Database (when implemented)
DATABASE_URL=your_database_url

# Authentication
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret

# File Storage
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=5242880  # 5MB

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### Run Development Server
```bash
npm run dev
```

Access the application:
- Driver Portal: `http://localhost:3000/driver-portal`
- Driver Onboarding: `http://localhost:3000/driver-onboarding`

## 📱 Driver Portal Features

### Dashboard Overview
- **Quick Stats**: Weekly earnings, driver rating, shifts completed, document status
- **Performance Metrics**: Detailed analytics with improvement suggestions
- **Earnings Summary**: Real-time earnings with trend charts
- **Shift Schedule**: Calendar view with availability management
- **Document Status**: Compliance tracking with expiry alerts
- **Notification Center**: Real-time alerts and system messages

### Key Components

#### DriverStats Component
```typescript
interface DriverStatsProps {
  driverId: string;
}

// Features:
- Total rides and ratings
- Achievement tracking
- Progress monitoring
- Performance trends
```

#### EarningsSummary Component
```typescript
interface EarningsData {
  totalEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  tips: number;
  bonuses: number;
  pendingPayout: number;
}

// Features:
- Earnings breakdown
- Payment history
- Tax documentation
- Export functionality
```

#### ShiftSchedule Component
```typescript
interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  zone: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
}

// Features:
- Calendar view
- Availability toggle
- Shift management
- Zone optimization
```

## 🔐 Driver Onboarding Process

### Step 1: Personal Details
- Basic information collection
- Address verification
- Contact details
- Right to work verification

### Step 2: SIA Verification
- Real-time SIA license checking
- License status validation
- Sector authorization verification
- Expiry date monitoring

### Step 3: Document Upload
- Enhanced DBS certificate
- Driving license validation
- Commercial insurance verification
- Vehicle inspection documents

### Step 4: Vehicle Inspection
- MOT certificate verification
- Vehicle safety checklist
- Photo documentation
- Insurance validation

### Step 5: Background Check
- DBS API integration
- Reference verification
- Employment history check
- Criminal record screening

### Step 6: Training Modules
- Mandatory safety training
- Customer service protocols
- Security procedures
- Emergency response training

### Step 7: Application Review
- Compliance verification
- Final approval process
- Welcome package delivery
- System access provision

## 🔌 API Documentation

### Authentication
All API endpoints require Bearer token authentication:
```bash
Authorization: Bearer <driver_token>
```

### Driver Profile Endpoints

#### Get Driver Profile
```bash
GET /api/driver?endpoint=profile
```

#### Update Driver Profile
```bash
POST /api/driver?action=update-profile
Content-Type: application/json

{
  "personalDetails": {
    "firstName": "James",
    "lastName": "Wilson",
    "email": "james@example.com",
    "phone": "07400123456"
  }
}
```

### SIA Verification Endpoints

#### Verify SIA License
```bash
POST /api/driver?action=sia-verification
Content-Type: application/json

{
  "siaLicenseNumber": "12345678",
  "holderName": "James Wilson",
  "dateOfBirth": "1985-03-15",
  "licenseType": "close-protection"
}
```

### Document Management Endpoints

#### Get Documents
```bash
GET /api/driver?endpoint=documents
```

#### Upload Document
```bash
POST /api/driver?action=upload-document
Content-Type: multipart/form-data

{
  "documentType": "sia_license",
  "file": <file_data>,
  "fileName": "sia_license.pdf",
  "expiryDate": "2026-06-15"
}
```

### Shift Management Endpoints

#### Get Shifts
```bash
GET /api/driver?endpoint=shifts
```

#### Schedule Shift
```bash
POST /api/driver?action=schedule-shift
Content-Type: application/json

{
  "date": "2024-01-15",
  "startTime": "09:00",
  "endTime": "17:00",
  "zone": "Central London"
}
```

#### Update Shift
```bash
PUT /api/driver?resource=shift&id=SHIFT123
Content-Type: application/json

{
  "status": "confirmed",
  "notes": "VIP client transfer"
}
```

#### Cancel Shift
```bash
DELETE /api/driver?resource=shift&id=SHIFT123
```

### Earnings Endpoints

#### Get Earnings
```bash
GET /api/driver?endpoint=earnings
```

### Notifications Endpoints

#### Get Notifications
```bash
GET /api/driver?endpoint=notifications
```

#### Delete Notification
```bash
DELETE /api/driver?resource=notification&id=NOTIF123
```

### Availability Management

#### Update Availability
```bash
PUT /api/driver?resource=availability
Content-Type: application/json

{
  "status": "available",
  "timeSlots": [
    {
      "day": "monday",
      "startTime": "09:00",
      "endTime": "17:00"
    }
  ]
}
```

## 📊 Performance Tracking

### Driver KPIs
- **Customer Rating**: Average 4.8+ required
- **Completion Rate**: 95%+ target
- **On-Time Performance**: 96%+ target
- **Customer Retention**: 85%+ target
- **Safety Score**: 99%+ required

### Achievement System
- **5-Star Champion**: Maintain 4.8+ rating for 30 days
- **Perfect Week**: Complete all shifts without absence
- **Safety First**: Zero incidents for 90 days
- **Customer Favorite**: 100+ repeat customers

### Performance Metrics
```typescript
interface PerformanceMetrics {
  punctuality: number;           // 96%
  customerService: number;       // 94%
  vehicleCleanliness: number;    // 98%
  safetyScore: number;          // 99%
  navigationSkills: number;      // 92%
}
```

## 📋 Document Requirements

### Mandatory Documents

1. **SIA Close Protection License**
   - Real-time verification with SIA database
   - Must be valid and active
   - 90-day expiry notification

2. **UK Driving License**
   - Full license (3+ years experience)
   - Maximum 6 penalty points
   - DVLA integration for verification

3. **Enhanced DBS Certificate**
   - Maximum 12 months old
   - Annual renewal required
   - Criminal record screening

4. **Commercial Insurance**
   - Hire & Reward coverage
   - Minimum £2M public liability
   - Monthly certificate verification

5. **Vehicle Inspection**
   - Valid MOT certificate
   - Safety inspection checklist
   - Photo documentation

### Document Compliance Tracking
- Automatic expiry notifications
- Renewal reminders (90, 60, 30 days)
- Compliance rate monitoring
- Instant suspension for expired documents

## 🔔 Notification System

### Notification Types
1. **Document Alerts**: Expiry warnings, renewal reminders
2. **Shift Updates**: New assignments, schedule changes
3. **Payment Notifications**: Payout confirmations, bonus alerts
4. **System Messages**: App updates, policy changes
5. **Training Alerts**: Mandatory courses, certification renewals
6. **Customer Feedback**: Ratings, reviews, complaints

### Priority Levels
- **High**: Document expiry, safety alerts, urgent shifts
- **Medium**: New assignments, schedule changes
- **Low**: General updates, feedback, system messages

## 💰 Earnings & Payouts

### Payment Structure
- **Base Rate**: £15-25 per hour (zone dependent)
- **Tips**: Customer tips (100% to driver)
- **Bonuses**: Performance bonuses, perfect attendance
- **Incentives**: Peak time multipliers, long-distance premiums

### Payout Schedule
- **Weekly Payouts**: Every Friday
- **Minimum Payout**: £50
- **Payment Methods**: Bank transfer, digital wallets
- **Tax Documentation**: Automatic generation

### Earnings Breakdown
```typescript
interface EarningsBreakdown {
  baseEarnings: number;
  tips: number;
  bonuses: number;
  incentives: number;
  deductions: number;
  netEarnings: number;
  tax: number;
  finalPayout: number;
}
```

## 🛡️ Security & Compliance

### Data Protection
- GDPR compliant data handling
- Encrypted document storage
- Secure API endpoints
- Regular security audits

### SIA Compliance
- Real-time license verification
- Automatic compliance monitoring
- Regulatory reporting
- Audit trail maintenance

### Quality Assurance
- Customer feedback integration
- Performance monitoring
- Regular vehicle inspections
- Continuous training requirements

## 🚀 Success Criteria

### Target Metrics
✅ **50+ verified SIA drivers onboarded**
✅ **4.8+ average driver rating**
✅ **95%+ shift completion rate**
✅ **100% document compliance**
✅ **<24 hour onboarding approval**

### Driver Satisfaction KPIs
- 90%+ driver retention rate
- 4.5+ driver app rating
- <2 hour support response time
- 95%+ payout accuracy

## 🔧 Technical Implementation

### Frontend Stack
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Radix UI** for components

### API Integration
- RESTful API design
- JWT authentication
- File upload handling
- Real-time notifications
- External API integrations (SIA, DBS, DVLA)

### Database Schema (Recommended)
```sql
-- Drivers table
CREATE TABLE drivers (
  id UUID PRIMARY KEY,
  personal_details JSONB,
  sia_license JSONB,
  status VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Documents table
CREATE TABLE driver_documents (
  id UUID PRIMARY KEY,
  driver_id UUID REFERENCES drivers(id),
  type VARCHAR(50),
  status VARCHAR(20),
  file_url TEXT,
  upload_date TIMESTAMP,
  expiry_date TIMESTAMP
);

-- Shifts table
CREATE TABLE driver_shifts (
  id UUID PRIMARY KEY,
  driver_id UUID REFERENCES drivers(id),
  date DATE,
  start_time TIME,
  end_time TIME,
  zone VARCHAR(50),
  status VARCHAR(20),
  earnings DECIMAL(10,2)
);
```

## 📞 Support & Contact

### Development Team
- **Lead Developer**: Driver Portal Specialist
- **Email**: developers@gqcars.com
- **Documentation**: Internal knowledge base

### Driver Support
- **24/7 Support**: 07407 655 203
- **Email**: drivers@gqcars.com
- **Live Chat**: Available in driver portal

### API Support
- **Technical Issues**: api-support@gqcars.com
- **Integration Help**: integrations@gqcars.com
- **Documentation**: `/api-docs` endpoint

## 📈 Future Enhancements

### Planned Features
1. **Mobile Application**: Native iOS/Android apps
2. **Real-time Tracking**: GPS integration for live tracking
3. **Advanced Analytics**: AI-powered performance insights
4. **Automated Scheduling**: AI-based shift optimization
5. **Customer App Integration**: Direct customer-driver communication
6. **Fleet Management**: Vehicle tracking and maintenance
7. **Training Platform**: Interactive learning modules
8. **Gamification**: Driver engagement and rewards system

### Integration Roadmap
- **SIA Database API**: Direct real-time verification
- **DBS Checking Service**: Automated background checks
- **DVLA Integration**: License validation
- **Payment Gateways**: Multiple payment options
- **Insurance APIs**: Automated policy verification
- **Mapping Services**: Route optimization
- **Communication APIs**: SMS/Email notifications

---

**© 2024 GQ Cars LTD - Professional Driver Management System**

*Building the future of professional transportation with SIA-trained drivers and cutting-edge technology.*