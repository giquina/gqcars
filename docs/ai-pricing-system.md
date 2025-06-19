# GQ Cars AI-Powered Pricing System Documentation

## Overview

The GQ Cars AI-Powered Pricing System is a comprehensive intelligent quote calculator that provides real-time, accurate pricing for premium security taxi services. The system integrates multiple data sources and algorithms to deliver transparent, security-focused pricing.

## Architecture

### Core Components

1. **AIQuoteCalculator Component** (`app/components/booking/AIQuoteCalculator.tsx`)
   - Main user interface for the intelligent pricing system
   - Real-time quote calculations with visual breakdown
   - Alternative service suggestions
   - Security risk visualization

2. **Pricing Utilities** (`lib/pricing.ts`)
   - Core pricing algorithms and business logic
   - Security risk assessment functions
   - Time and demand multiplier calculations
   - Corporate discount calculations

3. **Maps Integration** (`lib/maps.ts`)
   - Google Maps API integration for route calculation
   - Real-time traffic analysis
   - Security-aware route optimization
   - Distance and duration calculations

4. **Quote API** (`app/api/quote/route.ts`)
   - RESTful API endpoint for quote calculations
   - Server-side processing of pricing factors
   - Integration with external data sources

## Pricing Structure

### Base Pricing
- **Rate**: £2.50 per mile
- **Minimum Fare**: £25
- **Currency**: GBP (British Pounds)

### Security Premium (15-30%)
- **Low Risk Areas**: 15% premium
- **Medium Risk Areas**: 20% premium  
- **High Risk Areas**: 30% premium

### Time Multipliers
- **Peak Hours** (7-9 AM, 5-7 PM weekdays): +25%
- **Night Hours** (10 PM - 6 AM): +15%
- **Weekend**: +10%

### Service Levels
- **Standard Security**: 1.0x base rate
- **Executive Protection**: 1.5x base rate
- **Full Protection**: 2.1x base rate

### Additional Premiums
- **Airport Transfers**: £15-30 depending on airport
- **Emergency Services**: £50
- **Corporate Discounts**: Up to 15% for high-volume clients

## Features

### 1. Intelligent Route Analysis
- Real-time distance and duration calculations
- Traffic-aware routing with Google Maps integration
- Security score assessment for proposed routes
- Alternative route suggestions with safety prioritization

### 2. Security Risk Assessment
The system evaluates security risk based on:

#### High-Risk Areas
- Hackney, Tower Hamlets, Newham, Southwark, Lambeth
- East London, Bermondsey, Elephant and Castle, Peckham
- Tottenham, Edmonton, Wood Green

#### Medium-Risk Areas  
- Brent, Haringey, Islington, Camden, Westminster
- North London, King's Cross, Euston, Paddington
- Stratford, Canary Wharf, Croydon

#### Low-Risk Areas
- Kensington, Chelsea, Hampstead, Richmond, Putney
- Wimbledon, Mayfair, Belgravia, Knightsbridge
- Notting Hill, South Kensington, Marylebone

### 3. Dynamic Demand Pricing
- Real-time demand analysis based on time of day
- Historical pattern recognition
- Event-based surge pricing
- Weekend and holiday adjustments

### 4. Airport Transfer Intelligence
Specialized handling for major airports:
- **Heathrow (LHR)**: £20 premium, 60min base time
- **Gatwick (LGW)**: £25 premium, 90min base time  
- **Stansted (STN)**: £30 premium, 75min base time
- **Luton (LTN)**: £30 premium, 80min base time
- **City Airport (LCY)**: £15 premium, 45min base time

### 5. Corporate Integration
- Volume-based discount tiers
- Monthly spend thresholds
- Booking frequency rewards
- Enterprise account management

## API Integration

### Google Maps Services
```typescript
// Route calculation
const route = await calculateRoute(pickup, destination)

// Alternative routes with security priority
const alternatives = await getRouteAlternatives(pickup, destination, 'high')

// Traffic information
const traffic = await getTrafficInformation(pickup, destination)
```

### Quote Calculation
```typescript
// Intelligent pricing calculation
const pricing = calculateIntelligentPrice({
  distance: 15.5,
  pickup: "Kensington",
  destination: "Heathrow Airport",
  dateTime: "2024-01-15T18:30:00Z",
  serviceLevel: "executive",
  userHistory: { totalBookings: 25, monthlySpend: 800 }
})
```

## User Interface Features

### Real-Time Quote Display
- **Live Calculation**: Updates as user types
- **Breakdown Transparency**: Detailed cost breakdown
- **Alternative Options**: Side-by-side service comparisons
- **Security Features**: Visual security assessment
- **Professional Design**: Mobile-first responsive interface

### Smart Features
- **Auto-completion**: Location suggestions
- **Validation**: UK postcode format checking
- **Error Handling**: Graceful fallbacks for API failures
- **Loading States**: Professional loading animations
- **Accessibility**: WCAG compliant design

## Implementation Details

### Frontend Architecture
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom GQ brand colors
- **Icons**: Lucide React icon library
- **State Management**: React hooks for local state
- **Animation**: Framer Motion for smooth transitions

### Backend Services
- **API Routes**: Next.js API routes for server-side processing
- **External APIs**: Google Maps Distance Matrix and Directions
- **Data Processing**: Real-time calculation algorithms
- **Error Handling**: Comprehensive error management

### Performance Optimizations
- **Debounced Calculations**: Prevents excessive API calls
- **Caching**: Strategic caching of route calculations  
- **Fallback Data**: Mock data for development and fallbacks
- **Lazy Loading**: Component-level code splitting

## Security Considerations

### Data Protection
- **API Key Security**: Environment variable protection
- **Input Validation**: Comprehensive input sanitization
- **Rate Limiting**: API call frequency controls
- **Error Disclosure**: Limited error information exposure

### Business Logic Security
- **Pricing Validation**: Server-side price verification
- **Discount Authorization**: Secure corporate discount validation
- **Route Verification**: Security score validation
- **Audit Logging**: Comprehensive pricing decision logging

## Deployment Configuration

### Environment Variables
```env
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_public_maps_key
```

### Required Dependencies
```json
{
  "@googlemaps/google-maps-services-js": "^3.x",
  "axios": "^1.x",
  "date-fns": "^2.x",
  "@types/google.maps": "^3.x"
}
```

## Testing Strategy

### Unit Tests
- Pricing calculation accuracy
- Security risk assessment logic
- Time multiplier calculations
- Discount calculation validation

### Integration Tests  
- Google Maps API integration
- Quote API endpoint functionality
- Error handling scenarios
- Performance benchmarks

### User Experience Tests
- Mobile responsiveness
- Accessibility compliance
- Loading performance
- Cross-browser compatibility

## Future Enhancements

### Phase 2 Features
1. **Machine Learning Integration**
   - Historical price optimization
   - Demand prediction algorithms
   - Customer behavior analysis
   - Dynamic pricing optimization

2. **Advanced Route Intelligence**
   - Real-time incident monitoring
   - Weather impact assessment
   - Event-based route planning
   - Multi-stop optimization

3. **Enhanced Security Features**
   - Live crime data integration
   - Social media sentiment analysis
   - Police incident correlation
   - Threat level automation

4. **Business Intelligence**
   - Revenue optimization
   - Competitive pricing analysis
   - Market demand forecasting
   - Customer lifetime value

## Support and Maintenance

### Monitoring
- **API Performance**: Response time monitoring
- **Error Rates**: Error frequency tracking
- **User Engagement**: Quote completion rates
- **Revenue Impact**: Pricing effectiveness metrics

### Regular Updates
- **Security Risk Data**: Monthly area assessment updates
- **Pricing Models**: Quarterly pricing review
- **Feature Enhancement**: Continuous improvement cycle
- **API Dependencies**: Regular dependency updates

## Contact Information

**Technical Support**: dev@gqcars.co.uk
**Business Inquiries**: bookings@gqcars.co.uk  
**Emergency Contact**: 07407 655 203

---

*Last Updated: January 2024*
*Version: 1.0.0*
*Author: GQ Cars Development Team*