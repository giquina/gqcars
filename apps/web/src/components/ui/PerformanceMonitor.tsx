'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  FCP?: number;  // First Contentful Paint
  LCP?: number;  // Largest Contentful Paint
  FID?: number;  // First Input Delay
  CLS?: number;  // Cumulative Layout Shift
  TTFB?: number; // Time to First Byte
}

const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {};

    // Function to send metrics to analytics
    const sendMetrics = (name: string, value: number) => {
      // Store in sessionStorage for debugging
      sessionStorage.setItem(`perf_${name}`, value.toString());
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 Performance Metric - ${name}:`, `${value.toFixed(2)}ms`);
      }

      // Here you would typically send to your analytics service
      // Example: gtag('event', 'web_vitals', { name, value });
    };

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // First Contentful Paint (FCP)
      if ('PerformanceObserver' in window) {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
                metrics.FCP = entry.startTime;
                sendMetrics('FCP', entry.startTime);
              }
            }
          });
          observer.observe({ entryTypes: ['paint'] });
        } catch (e) {
          console.warn('Paint timing not supported');
        }

        // Largest Contentful Paint (LCP)
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.LCP = lastEntry.startTime;
            sendMetrics('LCP', lastEntry.startTime);
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          console.warn('LCP timing not supported');
        }

        // First Input Delay (FID)
        try {
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              metrics.FID = (entry as any).processingStart - entry.startTime;
              sendMetrics('FID', metrics.FID);
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          console.warn('FID timing not supported');
        }

        // Cumulative Layout Shift (CLS)
        try {
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            metrics.CLS = clsValue;
            sendMetrics('CLS', clsValue * 1000); // Convert to ms for consistency
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
          console.warn('CLS timing not supported');
        }
      }

      // Time to First Byte (TTFB)
      if ('performance' in window && 'timing' in window.performance) {
        const navigationTiming = performance.timing;
        metrics.TTFB = navigationTiming.responseStart - navigationTiming.navigationStart;
        sendMetrics('TTFB', metrics.TTFB);
      }
    };

    // Measure resource loading performance
    const measureResourcePerformance = () => {
      if ('performance' in window) {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        
        // Group resources by type
        const resourceTypes = {
          scripts: resources.filter(r => r.name.includes('.js')),
          styles: resources.filter(r => r.name.includes('.css')),
          images: resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)),
          fonts: resources.filter(r => r.name.match(/\.(woff|woff2|ttf|eot)$/i))
        };

        // Log slow resources in development
        if (process.env.NODE_ENV === 'development') {
          Object.entries(resourceTypes).forEach(([type, items]) => {
            const slowResources = items.filter(item => item.duration > 1000);
            if (slowResources.length > 0) {
              console.warn(`🐌 Slow ${type} resources:`, slowResources.map(r => ({
                name: r.name.split('/').pop(),
                duration: Math.round(r.duration)
              })));
            }
          });
        }
      }
    };

    // Bundle size analysis
    const analyzeBundleSize = () => {
      if ('performance' in window) {
        const scripts = performance.getEntriesByType('resource')
          .filter(r => r.name.includes('.js'))
          .map(r => ({
            name: r.name.split('/').pop(),
            size: (r as PerformanceResourceTiming).transferSize || 0,
            duration: Math.round(r.duration)
          }))
          .sort((a, b) => b.size - a.size);

        if (process.env.NODE_ENV === 'development' && scripts.length > 0) {
          console.log('📦 Bundle Analysis:', scripts.slice(0, 5));
        }
      }
    };

    // Run measurements
    measureWebVitals();
    
    // Wait for page load to measure resources
    if (document.readyState === 'complete') {
      measureResourcePerformance();
      analyzeBundleSize();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => {
          measureResourcePerformance();
          analyzeBundleSize();
        }, 1000);
      });
    }

    // Performance recommendations
    const logPerformanceRecommendations = () => {
      if (process.env.NODE_ENV !== 'development') return;

      setTimeout(() => {
        const recommendations = [];

        if (metrics.FCP && metrics.FCP > 3000) {
          recommendations.push('🟡 Consider optimizing images and reducing bundle size to improve FCP');
        }

        if (metrics.LCP && metrics.LCP > 4000) {
          recommendations.push('🟡 Optimize largest content element (images/text) to improve LCP');
        }

        if (metrics.FID && metrics.FID > 300) {
          recommendations.push('🟡 Consider code splitting to reduce main thread blocking and improve FID');
        }

        if (metrics.CLS && metrics.CLS > 0.25) {
          recommendations.push('🟡 Ensure proper dimensions for images and avoid layout shifts to improve CLS');
        }

        if (recommendations.length > 0) {
          console.log('💡 Performance Recommendations:', recommendations);
        } else {
          console.log('✅ Great performance metrics! All Core Web Vitals are in good ranges.');
        }
      }, 3000);
    };

    logPerformanceRecommendations();

    // Cleanup function
    return () => {
      // PerformanceObserver cleanup is handled by the browser
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;