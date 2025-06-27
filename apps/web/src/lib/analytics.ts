// Google Analytics and Vercel Analytics Setup
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'
export const VERCEL_ANALYTICS_ID = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID

// Analytics events for tracking user interactions
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Google Analytics tracking function
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args)
  }
}

// Track page views
export const trackPageView = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Generic event tracking
export const trackEvent = (event: AnalyticsEvent) => {
  gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event.custom_parameters,
  })
}

// Specific tracking functions for GQ Cars
export const trackBookingStarted = (serviceType?: string) => {
  trackEvent({
    action: 'booking_started',
    category: 'Booking Flow',
    label: serviceType || 'unknown',
    custom_parameters: {
      service_type: serviceType,
      timestamp: new Date().toISOString(),
    }
  })
}

export const trackBookingCompleted = (data: {
  serviceType: string
  pickupLocation: string
  dropoffLocation: string
  totalPrice?: number
}) => {
  trackEvent({
    action: 'booking_completed',
    category: 'Booking Flow',
    label: data.serviceType,
    value: data.totalPrice,
    custom_parameters: {
      pickup_location: data.pickupLocation,
      dropoff_location: data.dropoffLocation,
      service_type: data.serviceType,
      timestamp: new Date().toISOString(),
    }
  })
}

export const trackAssessmentStarted = () => {
  trackEvent({
    action: 'assessment_started',
    category: 'Security Assessment',
    label: 'security_questionnaire',
  })
}

export const trackAssessmentCompleted = (threatLevel: string, score: number) => {
  trackEvent({
    action: 'assessment_completed',
    category: 'Security Assessment',
    label: threatLevel,
    value: score,
    custom_parameters: {
      threat_level: threatLevel,
      risk_score: score,
      timestamp: new Date().toISOString(),
    }
  })
}

export const trackContactFormSubmitted = (formType: string) => {
  trackEvent({
    action: 'contact_form_submitted',
    category: 'Lead Generation',
    label: formType,
  })
}

export const trackPhoneCallClicked = (source: string) => {
  trackEvent({
    action: 'phone_call_clicked',
    category: 'Contact Interaction',
    label: source,
    custom_parameters: {
      phone_number: '07407655203',
      source_component: source,
    }
  })
}

export const trackWhatsAppClicked = (source: string) => {
  trackEvent({
    action: 'whatsapp_clicked',
    category: 'Contact Interaction',
    label: source,
  })
}

export const trackServicePageViewed = (serviceType: string) => {
  trackEvent({
    action: 'service_page_viewed',
    category: 'Service Interest',
    label: serviceType,
  })
}

export const trackQuoteRequested = (data: {
  from: string
  to: string
  serviceType: string
  estimatedPrice?: number
}) => {
  trackEvent({
    action: 'quote_requested',
    category: 'Quote Generation',
    label: data.serviceType,
    value: data.estimatedPrice,
    custom_parameters: {
      pickup_location: data.from,
      dropoff_location: data.to,
      service_type: data.serviceType,
    }
  })
}

export const trackUserRegistration = (method: string) => {
  trackEvent({
    action: 'user_registration',
    category: 'User Authentication',
    label: method,
  })
}

export const trackUserLogin = (method: string) => {
  trackEvent({
    action: 'user_login',
    category: 'User Authentication',
    label: method,
  })
}

// Error tracking
export const trackError = (error: string, context?: string) => {
  trackEvent({
    action: 'error_occurred',
    category: 'Error Tracking',
    label: error,
    custom_parameters: {
      error_message: error,
      context: context || 'unknown',
      timestamp: new Date().toISOString(),
    }
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  trackEvent({
    action: 'performance_metric',
    category: 'Site Performance',
    label: metric,
    value: value,
  })
}

// Conversion tracking
export const trackConversion = (conversionType: string, value?: number) => {
  trackEvent({
    action: 'conversion',
    category: 'Business Goals',
    label: conversionType,
    value: value,
  })
}