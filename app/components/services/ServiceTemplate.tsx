import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ServiceTemplateProps {
  title: string
  description: string
  features: string[]
  benefits: string[]
  image: string
  icon: React.ReactNode
}

export default function ServiceTemplate({
  title,
  description,
  features,
  benefits,
  image,
  icon
}: ServiceTemplateProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-block text-4xl mb-6 text-amber-500">
            {icon}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            {description}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services Include</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700"
              >
                <ChevronRight className="text-amber-500 mb-4" />
                <p className="text-gray-300">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                  ✓
                </div>
                <p className="text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Book Our Services?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us now for a personalized quote and consultation about your security needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-amber-500/20 transform hover:scale-105 transition-all duration-300"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}