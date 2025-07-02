/**
 * Static Mode Utilities
 * 
 * This file provides utilities for handling static export mode
 * where API routes and server-side features are not available.
 */

// Check if we're in static export mode
export const isStaticMode = () => {
  return process.env.BUILD_STATIC === 'true' || 
         (typeof window !== 'undefined' && window.location.hostname.includes('github.io'));
};

// Mock API responses for static mode
export const mockApiResponse = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Static-safe fetch wrapper
export const staticSafeFetch = async (url: string, options?: RequestInit) => {
  if (isStaticMode()) {
    console.warn(`Static mode: API call to ${url} disabled`);
    
    // Return mock responses based on URL
    if (url.includes('/api/bookings')) {
      return mockApiResponse({
        success: false,
        message: 'Booking API not available in static mode. Please use contact form.',
        data: null
      });
    }
    
    if (url.includes('/api/ai/chat')) {
      return mockApiResponse({
        message: 'AI chat not available in static mode. Please contact us directly.',
        timestamp: new Date().toISOString()
      });
    }
    
    if (url.includes('/api/errors')) {
      return mockApiResponse({ success: true });
    }
    
    // Default mock response
    return mockApiResponse({
      success: false,
      message: 'API not available in static mode',
      data: null
    });
  }
  
  // Normal fetch in non-static mode
  return fetch(url, options);
};

// Static mode configuration
export const STATIC_CONFIG = {
  enableBooking: !isStaticMode(),
  enableAIChat: !isStaticMode(),
  enableAnalytics: true, // Analytics still work in static mode
  enableContactForm: true, // Contact forms can use external services
  enablePayments: !isStaticMode(),
  enableDatabase: !isStaticMode(),
  
  // Fallback contact methods for static mode
  fallbackContact: {
    phone: '07407655203',
    email: 'bookings@gqcars.co.uk',
    whatsapp: 'https://wa.me/447407655203'
  }
};

// Static mode notification component
export const StaticModeNotice = () => {
  if (!isStaticMode()) return null;
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">
            <strong>Static Preview Mode:</strong> Some features (booking, AI chat) are limited. 
            For full functionality, please contact us directly at{' '}
            <a href="tel:07407655203" className="underline">07407655203</a> or{' '}
            <a href="mailto:bookings@gqcars.co.uk" className="underline">bookings@gqcars.co.uk</a>
          </p>
        </div>
      </div>
    </div>
  );
};