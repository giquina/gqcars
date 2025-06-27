"use client"

import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GA_TRACKING_ID, trackPageView } from '../lib/analytics'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  // Don't load analytics in development
  if (process.env.NODE_ENV !== 'production') {
    return null
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />
      
      {/* Vercel Analytics */}
      <Script
        id="vercel-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
          `,
        }}
      />
    </>
  )
}

// SEO Component for enhanced meta tags
export function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  schemaMarkup,
}: {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  schemaMarkup?: any
}) {
  const defaultTitle = "GQ Cars LTD - SIA Licensed Security Taxi Service | Professional Drivers | London & Watford"
  const defaultDescription = "Premium security taxi service with SIA Licensed Close Protection Officers. Smart booking technology, professional drivers covering London, Watford, and all major airports. Book now: 07407 655 203"
  const defaultOgImage = "/images/gq-cars-og-image.jpg"
  
  const finalTitle = title ? `${title} | GQ Cars LTD` : defaultTitle
  const finalDescription = description || defaultDescription
  const finalOgImage = ogImage || defaultOgImage

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl || "https://gqcars.co.uk"} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="GQ Cars LTD" />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl || "https://gqcars.co.uk"} />
      <meta property="twitter:title" content={finalTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalOgImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="GQ Cars LTD" />
      
      {/* Business Information */}
      <meta name="geo.region" content="GB-ENG" />
      <meta name="geo.placename" content="London, Watford" />
      <meta name="geo.position" content="51.5074;-0.1278" />
      <meta name="ICBM" content="51.5074, -0.1278" />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Schema.org Markup */}
      {schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup)
          }}
        />
      )}
    </>
  )
}