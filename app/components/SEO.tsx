import React from 'react'
import { Metadata } from 'next'
import { SEOConfig } from '../lib/seo'

interface SEOProps {
  config: SEOConfig
}

export function generateMetadata(config: SEOConfig): Metadata {
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords?.join(', '),
    alternates: {
      canonical: config.canonical
    },
    openGraph: {
      title: config.openGraph.title,
      description: config.openGraph.description,
      type: config.openGraph.type,
      url: config.openGraph.url,
      images: config.openGraph.images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt
      })),
      siteName: 'GQ Security Services',
      locale: 'en_GB'
    },
    twitter: {
      card: config.twitter.card,
      title: config.twitter.title,
      description: config.twitter.description,
      images: config.twitter.images,
      site: '@gqsecurity',
      creator: '@gqsecurity'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    }
  }
}

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  )
}

// Additional meta tags component for pages that need custom meta
export function AdditionalMeta({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>
}

// Schema.org Breadcrumb component
export function BreadcrumbStructuredData({ items }: { 
  items: Array<{ name: string; url: string }> 
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return <StructuredData data={breadcrumbData} />
}

// FAQ Schema component
export function FAQStructuredData({ faqs }: { 
  faqs: Array<{ question: string; answer: string }> 
}) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return <StructuredData data={faqData} />
}