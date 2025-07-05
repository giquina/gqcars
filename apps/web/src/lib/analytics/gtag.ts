// Google Analytics 4 configuration for GQ Cars
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize GA4
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Google Analytics Measurement ID not found');
    }
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Configure gtag function
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_title: 'GQ Cars - SIA Licensed Security Transport',
    page_location: window.location.href,
    send_page_view: true,
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
    custom_map: {
      'custom_parameter_1': 'service_type',
      'custom_parameter_2': 'booking_method',
      'custom_parameter_3': 'risk_level'
    }
  });

  // Track initial page load performance
  if (typeof window !== 'undefined' && window.performance) {
    const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    if (loadTime > 0) {
      trackEvent('page_load_time', 'performance', 'initial_load', loadTime);
    }
  }
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
  if (!GA_MEASUREMENT_ID || !window.gtag) {
    if (process.env.NODE_ENV === 'development') {
      console.log('GA4 Event:', { action, category, label, value, customParameters });
    }
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
    ...customParameters
  });
};

// Track user engagement
export const trackEngagement = (
  engagementType: string,
  duration?: number,
  customData?: Record<string, any>
) => {
  trackEvent('user_engagement', 'engagement', engagementType, duration, {
    engagement_type: engagementType,
    engagement_duration: duration,
    ...customData
  });
};

// Track conversion events
export const trackConversion = (
  conversionType: string,
  value?: number,
  currency: string = 'GBP',
  customData?: Record<string, any>
) => {
  if (!window.gtag) return;

  window.gtag('event', 'conversion', {
    send_to: GA_MEASUREMENT_ID,
    conversion_type: conversionType,
    value: value,
    currency: currency,
    ...customData
  });
};

// Check if GA is loaded
export const isGALoaded = (): boolean => {
  return typeof window !== 'undefined' && !!window.gtag && !!GA_MEASUREMENT_ID;
};

// Get GA measurement ID (useful for debug)
export const getGAMeasurementID = (): string | undefined => {
  return GA_MEASUREMENT_ID;
};