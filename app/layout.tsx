import type { Metadata } from 'next'
import './globals.css'
import { defaultSEO, organizationStructuredData } from './lib/seo'
import { generateMetadata } from './components/SEO'
import { GoogleAnalytics, PlausibleAnalytics, CookieConsent } from './lib/analytics'

export const metadata: Metadata = generateMetadata(defaultSEO)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData)
          }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e293b" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Favicon and PWA Icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//plausible.io" />
      </head>
      <body className="bg-slate-900 text-white">
        {children}
        
        {/* Analytics Scripts */}
        <GoogleAnalytics />
        <PlausibleAnalytics />
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
      </body>
    </html>
  )
}
