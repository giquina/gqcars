'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX'

// Google Analytics component
export function GoogleAnalytics() {
  return (
    <React.Fragment>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </React.Fragment>
  )
}

// Privacy-friendly analytics alternative (Plausible)
export function PlausibleAnalytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'gqsecurity.co.uk'
  
  return (
    <Script
      defer
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}

// Analytics tracking functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args)
  }
}

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Specific tracking functions for GQ Security
export const trackServiceView = (serviceName: string) => {
  trackEvent('view_service', 'Services', serviceName)
}

export const trackQuoteRequest = (serviceType: string) => {
  trackEvent('quote_request', 'Conversion', serviceType)
}

export const trackPhoneCall = () => {
  trackEvent('phone_call', 'Contact', 'Header Phone')
}

export const trackBookingStart = () => {
  trackEvent('booking_start', 'Conversion', 'Booking Form')
}

export const trackBookingComplete = (serviceType: string, value?: number) => {
  gtag('event', 'purchase', {
    event_category: 'Conversion',
    event_label: serviceType,
    value: value || 0,
    currency: 'GBP'
  })
}

// Enhanced E-commerce tracking for services
export const trackServiceDetails = (service: {
  id: string
  name: string
  category: string
  price?: number
}) => {
  gtag('event', 'view_item', {
    currency: 'GBP',
    value: service.price || 0,
    items: [{
      item_id: service.id,
      item_name: service.name,
      item_category: service.category,
      price: service.price || 0,
      quantity: 1
    }]
  })
}

// GDPR Consent Management
export const initializeAnalytics = (hasConsent: boolean) => {
  if (hasConsent) {
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
  } else {
    gtag('consent', 'default', {
      analytics_storage: 'denied'
    })
  }
}

// Cookie banner component (simple version)
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(true)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent) {
      setShowBanner(false)
      setHasConsent(consent === 'true')
      initializeAnalytics(consent === 'true')
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true')
    setHasConsent(true)
    setShowBanner(false)
    initializeAnalytics(true)
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false')
    setHasConsent(false)
    setShowBanner(false)
    initializeAnalytics(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-gray-700 p-4 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          We use cookies to improve your experience and analyze site usage. 
          <a href="/privacy" className="text-amber-500 hover:underline ml-1">
            Learn more
          </a>
        </p>
        <div className="flex gap-2">
          <button
            onClick={declineCookies}
            className="px-4 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 text-sm bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}