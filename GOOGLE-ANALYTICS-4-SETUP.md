# 📊 Google Analytics 4 Setup for GQ Cars

## 🎯 **COMPLETE GA4 IMPLEMENTATION GUIDE**

### **1. GA4 Property Setup**

#### **Create GA4 Property:**
1. Visit [Google Analytics](https://analytics.google.com/)
2. Create new GA4 property: "GQ Cars Security Transport"
3. Configure property details:
   - **Industry:** Transportation & Logistics
   - **Business Size:** Small business
   - **Use Case:** Improve user experience, measure advertising effectiveness
4. Copy **GA4 Measurement ID** (format: G-XXXXXXXXXX)

#### **Enhanced Ecommerce Setup:**
- Enable **Enhanced Ecommerce** for booking tracking
- Configure **Conversion Goals** for quote requests
- Set up **Custom Dimensions** for service types
- Enable **Demographics and Interests** reports

---

## 🛠️ **NEXT.JS IMPLEMENTATION**

### **Environment Variables**
Add to `.env.local`:
```bash
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GA_DEBUG=false
```

### **Core Analytics Configuration**
Create `/apps/web/src/lib/analytics/gtag.ts`:
```typescript
// Google Analytics 4 configuration for GQ Cars
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn('Google Analytics Measurement ID not found');
    return;
  }

  // Load gtag script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Configure gtag
  window.gtag = function() {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: 'GQ Cars - SIA Licensed Security Transport',
    page_location: window.location.href,
    send_page_view: true,
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure'
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: title || document.title,
    page_location: url,
    send_page_view: true
  });
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  customParameters?: Record<string, any>
) => {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters
  });
};
```

---

## 🎯 **BUSINESS-SPECIFIC EVENT TRACKING**

### **Booking & Quote Events**
Create `/apps/web/src/lib/analytics/events.ts`:
```typescript
import { trackEvent } from './gtag';

// 🚗 BOOKING EVENTS
export const trackBookingEvents = {
  // Quote request started
  quoteStarted: (serviceType: string, location: string) => {
    trackEvent('quote_started', 'booking', serviceType, undefined, {
      service_type: serviceType,
      pickup_location: location,
      currency: 'GBP',
      booking_flow: 'web'
    });
  },

  // Quote calculation completed
  quoteCalculated: (serviceType: string, price: number, distance: number) => {
    trackEvent('quote_calculated', 'booking', serviceType, price, {
      service_type: serviceType,
      estimated_price: price,
      distance_miles: distance,
      currency: 'GBP'
    });
  },

  // Booking form started
  bookingStarted: (serviceType: string) => {
    trackEvent('begin_checkout', 'ecommerce', serviceType, undefined, {
      service_type: serviceType,
      checkout_step: 1,
      booking_method: 'online_form'
    });
  },

  // Booking completed (conversion)
  bookingCompleted: (serviceType: string, price: number, bookingId: string) => {
    trackEvent('purchase', 'ecommerce', serviceType, price, {
      transaction_id: bookingId,
      service_type: serviceType,
      value: price,
      currency: 'GBP',
      booking_method: 'online_form'
    });
  },

  // Security assessment completed
  assessmentCompleted: (riskLevel: string, score: number) => {
    trackEvent('assessment_completed', 'security', riskLevel, score, {
      risk_level: riskLevel,
      security_score: score,
      assessment_type: 'online_questionnaire'
    });
  }
};

// 🎯 USER ENGAGEMENT EVENTS
export const trackEngagementEvents = {
  // Service page interactions
  serviceViewed: (serviceName: string, timeSpent: number) => {
    trackEvent('service_viewed', 'engagement', serviceName, timeSpent, {
      service_name: serviceName,
      time_spent_seconds: timeSpent,
      page_type: 'service_detail'
    });
  },

  // AI Chat interactions
  chatStarted: () => {
    trackEvent('chat_started', 'ai_interaction', 'claude_widget', undefined, {
      chat_type: 'ai_assistant',
      widget_type: 'claude'
    });
  },

  chatMessageSent: (messageType: string) => {
    trackEvent('chat_message', 'ai_interaction', messageType, undefined, {
      message_type: messageType,
      chat_session: 'active'
    });
  },

  // WhatsApp widget clicks
  whatsappClicked: (context: string) => {
    trackEvent('whatsapp_clicked', 'communication', context, undefined, {
      communication_method: 'whatsapp',
      click_context: context
    });
  },

  // Trust badge clicks
  trustBadgeClicked: (badgeType: string) => {
    trackEvent('trust_badge_clicked', 'credibility', badgeType, undefined, {
      badge_type: badgeType,
      certification: badgeType
    });
  }
};

// 📱 MOBILE & PWA EVENTS
export const trackMobileEvents = {
  // Mobile app banner interactions
  appBannerShown: () => {
    trackEvent('app_banner_shown', 'mobile', 'pwa_promotion');
  },

  appBannerClicked: () => {
    trackEvent('app_banner_clicked', 'mobile', 'pwa_download');
  },

  // QR code scans
  qrCodeScanned: (serviceType: string) => {
    trackEvent('qr_code_scanned', 'mobile', serviceType, undefined, {
      scan_method: 'mobile_camera',
      service_type: serviceType
    });
  }
};

// 🔍 PERFORMANCE EVENTS
export const trackPerformanceEvents = {
  // Page load performance
  pageLoadTime: (url: string, loadTime: number) => {
    trackEvent('page_load_time', 'performance', url, loadTime, {
      load_time_ms: loadTime,
      page_url: url
    });
  },

  // Component load errors
  componentError: (componentName: string, errorMessage: string) => {
    trackEvent('component_error', 'error', componentName, undefined, {
      component_name: componentName,
      error_message: errorMessage,
      error_type: 'react_component'
    });
  }
};
```

---

## 🔧 **NEXT.JS APP INTEGRATION**

### **Root Layout Integration**
Update `/apps/web/src/app/layout.tsx`:
```typescript
import { initGA, GA_MEASUREMENT_ID } from '@/lib/analytics/gtag';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Initialize Google Analytics
    if (GA_MEASUREMENT_ID) {
      initGA();
    }
  }, []);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_title: 'GQ Cars - SIA Licensed Security Transport',
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### **Page View Tracking Hook**
Create `/apps/web/src/hooks/useAnalytics.ts`:
```typescript
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView } from '@/lib/analytics/gtag';

export const usePageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);
};

export const useAnalytics = () => {
  return {
    trackPageView,
    // Re-export all tracking functions
    ...require('@/lib/analytics/events')
  };
};
```

---

## 🎯 **COMPONENT-LEVEL TRACKING**

### **Booking Form Tracking**
Update `/apps/web/src/components/booking/BookingForm.tsx`:
```typescript
import { trackBookingEvents } from '@/lib/analytics/events';

export const BookingForm = () => {
  const handleQuoteStart = (serviceType: string, location: string) => {
    trackBookingEvents.quoteStarted(serviceType, location);
    // Continue with quote logic...
  };

  const handleBookingSubmit = async (bookingData: BookingData) => {
    trackBookingEvents.bookingStarted(bookingData.serviceType);
    
    try {
      const result = await submitBooking(bookingData);
      trackBookingEvents.bookingCompleted(
        bookingData.serviceType,
        result.price,
        result.bookingId
      );
    } catch (error) {
      // Track booking errors
      trackEvent('booking_error', 'error', error.message);
    }
  };
};
```

### **Security Assessment Tracking**
Update `/apps/web/src/components/ui/SecurityAssessment.tsx`:
```typescript
import { trackBookingEvents } from '@/lib/analytics/events';

export const SecurityAssessment = () => {
  const handleAssessmentComplete = (assessment: AssessmentResult) => {
    trackBookingEvents.assessmentCompleted(
      assessment.riskLevel,
      assessment.score
    );
  };
};
```

### **Service Page Tracking**
Add to all service pages `/apps/web/src/app/services/[service]/page.tsx`:
```typescript
import { trackEngagementEvents } from '@/lib/analytics/events';

export default function ServicePage({ params }: { params: { service: string } }) {
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEngagementEvents.serviceViewed(params.service, timeSpent);
    };
  }, [params.service]);
};
```

---

## 📊 **CUSTOM METRICS & DIMENSIONS**

### **Custom Dimensions Setup (GA4 Dashboard)**
1. **Service Type** - Track which services are most popular
2. **Risk Level** - Monitor security assessment outcomes  
3. **Booking Source** - Track conversion sources (web, mobile, QR)
4. **Client Type** - Categorize business vs. personal bookings
5. **Response Time** - Monitor quote and booking response times

### **Enhanced Ecommerce Configuration**
```typescript
// Enhanced ecommerce tracking
export const trackEcommerce = {
  // Add item to cart (service selection)
  addToCart: (serviceType: string, price: number) => {
    window.gtag('event', 'add_to_cart', {
      currency: 'GBP',
      value: price,
      items: [{
        item_id: serviceType,
        item_name: `GQ Cars ${serviceType}`,
        item_category: 'Security Transport',
        price: price,
        quantity: 1
      }]
    });
  },

  // Begin checkout
  beginCheckout: (serviceType: string, price: number) => {
    window.gtag('event', 'begin_checkout', {
      currency: 'GBP',
      value: price,
      items: [{
        item_id: serviceType,
        item_name: `GQ Cars ${serviceType}`,
        item_category: 'Security Transport',
        price: price,
        quantity: 1
      }]
    });
  },

  // Purchase completed
  purchase: (transactionId: string, serviceType: string, price: number) => {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      currency: 'GBP',
      value: price,
      items: [{
        item_id: serviceType,
        item_name: `GQ Cars ${serviceType}`,
        item_category: 'Security Transport',
        price: price,
        quantity: 1
      }]
    });
  }
};
```

---

## 🎯 **CONVERSION GOALS SETUP**

### **Primary Conversions:**
1. **Booking Completed** - Main business goal
2. **Quote Requested** - Lead generation
3. **Contact Form Submitted** - Customer inquiries
4. **Phone Number Clicked** - Direct contact
5. **WhatsApp Chat Started** - Customer engagement

### **Secondary Conversions:**
1. **Security Assessment Completed** - User engagement
2. **Service Page > 2 minutes** - Interest indication
3. **Mobile App Banner Clicked** - App adoption
4. **Trust Badge Clicked** - Credibility verification
5. **Social Media Clicked** - Brand engagement

---

## 📱 **MOBILE & PWA TRACKING**

### **Core Web Vitals Integration**
```typescript
// Performance monitoring
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => trackEvent('web_vital_cls', 'performance', 'CLS', metric.value));
      getFID((metric) => trackEvent('web_vital_fid', 'performance', 'FID', metric.value));
      getFCP((metric) => trackEvent('web_vital_fcp', 'performance', 'FCP', metric.value));
      getLCP((metric) => trackEvent('web_vital_lcp', 'performance', 'LCP', metric.value));
      getTTFB((metric) => trackEvent('web_vital_ttfb', 'performance', 'TTFB', metric.value));
    });
  }
};
```

---

## 🔐 **PRIVACY & GDPR COMPLIANCE**

### **Privacy Configuration**
```typescript
// GDPR-compliant analytics setup
export const initGDPRCompliantGA = (hasConsent: boolean) => {
  if (hasConsent) {
    initGA();
  } else {
    // Initialize with minimal tracking
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      ads_data_redaction: true,
      cookie_flags: 'SameSite=None;Secure',
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
  }
};
```

### **Cookie Consent Banner Integration**
```typescript
// Cookie consent component
export const CookieConsent = () => {
  const [hasConsent, setHasConsent] = useState(false);

  const handleAccept = () => {
    setHasConsent(true);
    localStorage.setItem('ga-consent', 'true');
    initGDPRCompliantGA(true);
  };

  const handleDecline = () => {
    setHasConsent(false);
    localStorage.setItem('ga-consent', 'false');
    initGDPRCompliantGA(false);
  };
};
```

---

## 📊 **REPORTING & DASHBOARD SETUP**

### **Custom GA4 Reports:**
1. **Service Performance Report** - Which services convert best
2. **Booking Funnel Analysis** - Where users drop off
3. **Security Assessment Insights** - Risk level distributions
4. **Mobile vs Desktop Performance** - Platform comparison
5. **Geographic Performance** - Location-based booking patterns

### **Automated Reporting:**
- **Weekly Service Report** - Top performing services
- **Monthly Conversion Report** - Booking trends
- **Quarterly Business Review** - Comprehensive analytics

---

## ✅ **IMPLEMENTATION CHECKLIST**

### **Setup Phase:**
- [ ] Create GA4 property for GQ Cars
- [ ] Configure enhanced ecommerce
- [ ] Set up custom dimensions
- [ ] Add measurement ID to environment variables

### **Development Phase:**
- [ ] Install analytics utilities
- [ ] Add tracking to all key components
- [ ] Implement conversion goal tracking
- [ ] Set up performance monitoring

### **Testing Phase:**
- [ ] Test all event tracking in GA4 debug mode
- [ ] Verify conversion goal tracking
- [ ] Check mobile tracking functionality
- [ ] Validate GDPR compliance

### **Launch Phase:**
- [ ] Enable all tracking in production
- [ ] Configure automated reports
- [ ] Set up conversion alerts
- [ ] Train team on analytics dashboard

---

## 🎯 **SUCCESS METRICS**

### **Key Performance Indicators:**
- **📈 Booking Conversion Rate** - Target: 3-5%
- **🎯 Quote-to-Booking Rate** - Target: 15-25%
- **📱 Mobile Engagement Rate** - Target: 60%+
- **⚡ Page Load Speed** - Target: <3 seconds
- **🔄 Return Visitor Rate** - Target: 25%+

---

**🎉 Complete GA4 implementation ready for GQ Cars production deployment!**

*Setup Time: ~2 hours | Implementation: ~4 hours | Testing: ~2 hours*