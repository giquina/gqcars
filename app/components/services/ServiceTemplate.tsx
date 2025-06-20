import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface ServiceTemplateProps {
  title: string
  subtitle?: string
  description: string
  features: {
    icon: string
    title: string
    description: string
  }[]
  benefits: string[]
  process?: {
    step: string
    title: string
    description: string
  }[]
  pricing?: {
    title: string
    subtitle: string
    packages: {
      name: string
      price: string
      period: string
      features: string[]
      popular?: boolean
    }[]
  }
  testimonials?: {
    text: string
    author: string
  }[]
  cta?: {
    title: string
    description: string
    primaryButton: string
    secondaryButton: string
  }
  image: string
  icon: React.ReactNode
}

export default function ServiceTemplate({
  title,
  description,
  subtitle,
  features,
  benefits,
  process,
  pricing,
  testimonials,
  cta,
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-2xl md:text-3xl text-gray-200 mb-6">{subtitle}</p>
          )}
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
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
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

      {/* Process Section */}
      {process && (
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((step, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700"
                >
                  <div className="text-3xl font-bold text-amber-500 mb-4">Step {step.step}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {pricing && (
        <section className="py-20 bg-slate-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{pricing.title}</h2>
            <p className="text-xl text-gray-300 mb-12 text-center">{pricing.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.packages.map((pkg, index) => (
                <div 
                  key={index}
                  className={`bg-slate-900/50 backdrop-blur-sm p-8 rounded-lg border ${
                    pkg.popular ? 'border-amber-500' : 'border-slate-700'
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-amber-500 mb-1">{pkg.price}</div>
                  <div className="text-gray-400 mb-6">{pkg.period}</div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/book"
                    className={`block text-center py-3 rounded-lg font-semibold transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-amber-600 text-white hover:shadow-amber-500/20'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-lg border border-slate-700"
                >
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <p className="text-amber-500 font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{cta ? cta.title : 'Ready to Book Our Services?'}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {cta ? cta.description : 'Contact us now for a personalized quote and consultation about your security needs.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-amber-500/20 transform hover:scale-105 transition-all duration-300"
            >
              {cta ? cta.primaryButton : 'Request a Quote'}
            </Link>
            <Link
              href="/contact"
              className="bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300"
            >
              {cta ? cta.secondaryButton : 'Learn More'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}