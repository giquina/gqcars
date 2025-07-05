'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { trackPageView, trackEvent, isGALoaded } from '@/lib/analytics/gtag';
import { 
  trackBookingEvents,
  trackEngagementEvents,
  trackMobileEvents,
  trackPerformanceEvents,
  trackBusinessEvents,
  trackSecurityEvents
} from '@/lib/analytics/events';

// Page tracking hook
export const usePageTracking = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      // Track page view
      trackPageView(url);
      
      // Track page load time
      if (typeof window !== 'undefined' && window.performance) {
        const loadTime = performance.now();
        trackPerformanceEvents.pageLoadTime(url, loadTime);
      }
    }
  }, [pathname, searchParams]);
};

// Performance tracking hook
export const usePerformanceTracking = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    const trackWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        
        getCLS((metric) => {
          trackEvent('web_vital_cls', 'performance', 'CLS', metric.value, {
            metric_name: 'Cumulative Layout Shift',
            metric_value: metric.value,
            rating: metric.rating
          });
        });

        getFID((metric) => {
          trackEvent('web_vital_fid', 'performance', 'FID', metric.value, {
            metric_name: 'First Input Delay',
            metric_value: metric.value,
            rating: metric.rating
          });
        });

        getFCP((metric) => {
          trackEvent('web_vital_fcp', 'performance', 'FCP', metric.value, {
            metric_name: 'First Contentful Paint',
            metric_value: metric.value,
            rating: metric.rating
          });
        });

        getLCP((metric) => {
          trackEvent('web_vital_lcp', 'performance', 'LCP', metric.value, {
            metric_name: 'Largest Contentful Paint',
            metric_value: metric.value,
            rating: metric.rating
          });
        });

        getTTFB((metric) => {
          trackEvent('web_vital_ttfb', 'performance', 'TTFB', metric.value, {
            metric_name: 'Time to First Byte',
            metric_value: metric.value,
            rating: metric.rating
          });
        });
      } catch (error) {
        console.warn('Web Vitals not available:', error);
      }
    };

    trackWebVitals();
  }, []);
};

// Error boundary tracking hook
export const useErrorTracking = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      trackPerformanceEvents.componentError(
        'Global Error',
        event.message,
        event.error?.stack
      );
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackPerformanceEvents.componentError(
        'Unhandled Promise Rejection',
        String(event.reason),
        undefined
      );
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
};

// Service page tracking hook
export const useServicePageTracking = (serviceName: string) => {
  useEffect(() => {
    const startTime = Date.now();
    
    // Track service page view immediately
    trackEngagementEvents.serviceViewed(serviceName, 0);
    
    return () => {
      // Track time spent when component unmounts
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 5) { // Only track if spent more than 5 seconds
        trackEngagementEvents.serviceViewed(serviceName, timeSpent);
      }
    };
  }, [serviceName]);

  // Return tracking functions for service-specific actions
  return {
    trackServiceCTA: (ctaType: string) => {
      trackEngagementEvents.serviceCtaClicked(serviceName, ctaType);
    },
    trackServiceEngagement: (engagementType: string) => {
      trackEvent('service_engagement', 'engagement', serviceName, undefined, {
        service_name: serviceName,
        engagement_type: engagementType
      });
    }
  };
};

// Form tracking hook
export const useFormTracking = (formName: string) => {
  const trackFormStart = useCallback(() => {
    trackEvent('form_start', 'form', formName, undefined, {
      form_name: formName,
      form_step: 'start'
    });
  }, [formName]);

  const trackFormStep = useCallback((step: number, stepName: string) => {
    trackEvent('form_step', 'form', formName, step, {
      form_name: formName,
      form_step: step,
      step_name: stepName
    });
  }, [formName]);

  const trackFormSubmit = useCallback((success: boolean, errorMessage?: string) => {
    if (success) {
      trackEvent('form_submit', 'form', formName, undefined, {
        form_name: formName,
        form_status: 'success'
      });
    } else {
      trackEvent('form_error', 'form', formName, undefined, {
        form_name: formName,
        form_status: 'error',
        error_message: errorMessage
      });
    }
  }, [formName]);

  const trackFormAbandon = useCallback((step: number, reason?: string) => {
    trackEvent('form_abandon', 'form', formName, step, {
      form_name: formName,
      abandon_step: step,
      abandon_reason: reason || 'unknown'
    });
  }, [formName]);

  return {
    trackFormStart,
    trackFormStep,
    trackFormSubmit,
    trackFormAbandon
  };
};

// Scroll tracking hook
export const useScrollTracking = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    const reached = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercent);

      scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          trackEvent('scroll_depth', 'engagement', `${milestone}%`, milestone, {
            scroll_percentage: milestone,
            page_url: window.location.pathname
          });
        }
      });
    };

    const throttledScroll = throttle(handleScroll, 500);
    window.addEventListener('scroll', throttledScroll);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      
      // Track final scroll depth on unmount
      if (maxScroll > 0) {
        trackEvent('max_scroll_depth', 'engagement', 'page_exit', maxScroll, {
          max_scroll_percentage: maxScroll,
          page_url: window.location.pathname
        });
      }
    };
  }, []);
};

// Click tracking hook for elements
export const useClickTracking = () => {
  const trackClick = useCallback((
    elementType: string,
    elementId: string,
    context?: string,
    customData?: Record<string, any>
  ) => {
    trackEvent('element_click', 'interaction', elementType, undefined, {
      element_type: elementType,
      element_id: elementId,
      click_context: context,
      ...customData
    });
  }, []);

  const trackExternalLink = useCallback((url: string, linkText: string) => {
    trackEvent('external_link_click', 'navigation', linkText, undefined, {
      external_url: url,
      link_text: linkText,
      outbound: true
    });
  }, []);

  const trackDownload = useCallback((fileName: string, fileType: string) => {
    trackBusinessEvents.fileDownload(fileName, fileType, 'direct_click');
  }, []);

  return {
    trackClick,
    trackExternalLink,
    trackDownload
  };
};

// Main analytics hook
export const useAnalytics = () => {
  return {
    // Core tracking
    trackPageView,
    trackEvent,
    isGALoaded,
    
    // Event categories
    booking: trackBookingEvents,
    engagement: trackEngagementEvents,
    mobile: trackMobileEvents,
    performance: trackPerformanceEvents,
    business: trackBusinessEvents,
    security: trackSecurityEvents,
    
    // Utility functions
    trackClick: useClickTracking().trackClick,
    trackExternalLink: useClickTracking().trackExternalLink,
    trackDownload: useClickTracking().trackDownload
  };
};

// Utility function to throttle events
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
}