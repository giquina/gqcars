import dynamic from 'next/dynamic'
import Header from '@/components/ui/Header'
import InteractiveHero from '@/components/ui/InteractiveHero'
import ServicesOverview from '@/components/ui/ServicesOverview'

// Lazy load heavy components to prevent loading issues
const TrustBadges = dynamic(() => import('@/components/ui/TrustBadges'), { 
  ssr: false,
  loading: () => <div className="h-20 bg-gray-800/50 rounded-lg animate-pulse" />
})

const TestimonialsSection = dynamic(() => import('@/components/ui/TestimonialsSection'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-800/50 rounded-lg animate-pulse" />
})

const Footer = dynamic(() => import('@/components/ui/Footer'), { 
  ssr: false,
  loading: () => <div className="h-40 bg-gray-900 animate-pulse" />
})

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <Header />
      
      <main>
        <InteractiveHero />
        
        <section className="py-16">
          <TrustBadges />
        </section>
        
        <ServicesOverview />
        
        <section className="py-16">
          <TestimonialsSection />
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
