'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { initGA, GA_MEASUREMENT_ID } from '@/lib/analytics/gtag';
import { 
  usePageTracking, 
  usePerformanceTracking, 
  useErrorTracking,
  useScrollTracking 
} from '@/hooks/useAnalytics';

interface GoogleAnalyticsProps {
  measurementId?: string;
  enablePerformanceTracking?: boolean;
  enableScrollTracking?: boolean;
  enableErrorTracking?: boolean;
  debugMode?: boolean;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  measurementId = GA_MEASUREMENT_ID,
  enablePerformanceTracking = true,
  enableScrollTracking = true,
  enableErrorTracking = true,
  debugMode = process.env.NODE_ENV === 'development'
}) => {
  // Enable various tracking hooks
  usePageTracking();
  
  if (enablePerformanceTracking) {
    usePerformanceTracking();
  }
  
  if (enableErrorTracking) {
    useErrorTracking();
  }
  
  if (enableScrollTracking) {
    useScrollTracking();
  }

  useEffect(() => {
    if (measurementId) {
      initGA();
      
      if (debugMode) {
        console.log('Google Analytics initialized:', measurementId);
      }
    }
  }, [measurementId, debugMode]);

  if (!measurementId) {
    if (debugMode) {
      console.warn('Google Analytics Measurement ID not provided');
    }
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      
      {/* Google Analytics Configuration */}
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${measurementId}', {
              page_title: 'GQ Cars - SIA Licensed Security Transport',
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: false, // We handle this in usePageTracking
              custom_map: {
                'custom_parameter_1': 'service_type',
                'custom_parameter_2': 'booking_method',
                'custom_parameter_3': 'risk_level',
                'custom_parameter_4': 'device_type',
                'custom_parameter_5': 'user_type'
              }
            });
            
            // Enhanced ecommerce configuration
            gtag('config', '${measurementId}', {
              custom_parameter_1: 'security_transport',
              custom_parameter_2: 'gq_cars_website',
              send_page_view: false
            });
            
            ${debugMode ? `
            // Debug mode logging
            gtag('config', '${measurementId}', {
              debug_mode: true
            });
            console.log('GA4 Debug Mode Enabled');
            ` : ''}
          `,
        }}
      />
      
      {/* Enhanced Measurement Features */}
      <Script
        id="enhanced-measurement"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Enhanced measurement for file downloads
            gtag('config', '${measurementId}', {
              enhanced_measurement: {
                file_downloads: true,
                outbound_links: true,
                page_changes: true,
                scrolls: true,
                site_search: true,
                video_engagement: true
              }
            });
          `,
        }}
      />
    </>
  );
};

// Cookie consent component for GDPR compliance
interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
  onManage: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
  onManage
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('ga-consent');
    if (consent) {
      setShowBanner(false);
      setConsentGiven(consent === 'true');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ga-consent', 'true');
    setConsentGiven(true);
    setShowBanner(false);
    onAccept();
    
    // Reinitialize GA with full tracking
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('ga-consent', 'false');
    setConsentGiven(false);
    setShowBanner(false);
    onDecline();
    
    // Update consent to denied
    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm">
              We use cookies to enhance your experience and analyze our website traffic. 
              By clicking "Accept", you consent to our use of cookies.{' '}
              <button 
                onClick={onManage}
                className="underline hover:text-blue-300"
              >
                Manage preferences
              </button>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Analytics provider component
interface AnalyticsProviderProps {
  children: React.ReactNode;
  enableCookieConsent?: boolean;
  measurementId?: string;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({
  children,
  enableCookieConsent = true,
  measurementId = GA_MEASUREMENT_ID
}) => {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [showConsentBanner, setShowConsentBanner] = useState(false);

  useEffect(() => {
    if (enableCookieConsent) {
      const consent = localStorage.getItem('ga-consent');
      if (consent === null) {
        setShowConsentBanner(true);
        setConsentGiven(null);
      } else {
        setConsentGiven(consent === 'true');
        setShowConsentBanner(false);
      }
    } else {
      setConsentGiven(true);
    }
  }, [enableCookieConsent]);

  const handleConsentAccept = () => {
    setConsentGiven(true);
    setShowConsentBanner(false);
  };

  const handleConsentDecline = () => {
    setConsentGiven(false);
    setShowConsentBanner(false);
  };

  const handleManagePreferences = () => {
    // Open preferences modal (implement as needed)
    console.log('Manage cookie preferences');
  };

  return (
    <>
      {/* Only load GA if consent is given or not required */}
      {(consentGiven === true || !enableCookieConsent) && (
        <GoogleAnalytics 
          measurementId={measurementId}
          enablePerformanceTracking={true}
          enableScrollTracking={true}
          enableErrorTracking={true}
        />
      )}
      
      {/* Cookie consent banner */}
      {showConsentBanner && (
        <CookieConsent
          onAccept={handleConsentAccept}
          onDecline={handleConsentDecline}
          onManage={handleManagePreferences}
        />
      )}
      
      {children}
    </>
  );
};

// Legacy hook for backward compatibility
export const useGoogleAnalytics = () => {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  }

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '', {
        page_path: url,
      })
    }
  }

  return { trackEvent, trackPageView }
}

export default GoogleAnalytics;