import { TestimonialsAndCaseStudies } from '@/app/components/ui/TestimonialsAndCaseStudies';
import QuoteWidget from "@/app/components/ui/QuoteWidget";
import { LucideIcon, ArrowLeft, Home, Grid3X3, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  rating: number;
  image?: string;
}

interface Review {
  platform: string;
  rating: number;
  text: string;
  author: string;
  date: string;
}

interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  metrics?: string;
}

interface ServicePageProps {
  title: string;
  description: string;
  heroImage: string;
  category: string;
  Icon: LucideIcon;
  features: {
    title: string;
    description: string;
  }[];
  testimonials?: Testimonial[];
  reviews?: Review[];
  caseStudies?: CaseStudy[];
}

export default function ServicePage({ 
  title, 
  description, 
  heroImage, 
  category, 
  Icon, 
  features,
  testimonials = [],
  reviews = [],
  caseStudies = []
}: ServicePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20 sm:py-32">
        <div className="absolute inset-0">
          <img src={heroImage} alt={title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center space-x-2 mb-6 text-sm">
            <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href="/#services" className="text-gray-400 hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-yellow-500">{category}</span>
          </div>

          <div className="text-center">
            <Icon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">{title}</h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-300">
              {description}
            </p>
            
            {/* Quick CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="#quote" className="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                Get Instant Quote
              </Link>
              <Link href="#case-studies" className="border border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-black transition-colors">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 sm:py-24 bg-black">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Features & Details */}
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold text-white mb-6">Key Features & Benefits</h2>
                    <div className="space-y-6">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-yellow-500/30 transition-colors">
                                <div className="flex items-start space-x-4">
                                  <CheckCircle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                                  <div>
                                    <h3 className="text-xl font-semibold text-yellow-500 mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                  </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Booking Widget */}
                <div>
                    <div className="sticky top-24">
                        <div id="quote">
                          <h2 className="text-3xl font-bold text-white mb-6">Get an Instant Quote</h2>
                          <QuoteWidget />
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="mt-8 bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                          <h3 className="text-lg font-semibold text-white mb-4">Why Choose {category}?</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">SIA Licensed</span>
                              <span className="text-yellow-500 font-semibold">✓ 100%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Response Time</span>
                              <span className="text-yellow-500 font-semibold">< 15 mins</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Client Satisfaction</span>
                              <span className="text-yellow-500 font-semibold">98.5%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Insurance Coverage</span>
                              <span className="text-yellow-500 font-semibold">£10M+</span>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Service-Specific Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">What Our {category} Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-black/50 p-6 rounded-lg border border-gray-800">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 font-bold text-lg mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.title}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific Reviews */}
      {reviews.length > 0 && (
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Recent {category} Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-yellow-500 font-semibold">{review.platform}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"{review.text}"</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{review.author}</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific Case Studies */}
      {caseStudies.length > 0 && (
        <section id="case-studies" className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white text-center mb-12">{category} Success Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-black/50 p-8 rounded-lg border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                  <p className="text-yellow-500 font-semibold mb-6">{study.client}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2">Challenge:</h4>
                      <p className="text-gray-300">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-2">Solution:</h4>
                      <p className="text-gray-300">{study.solution}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">Result:</h4>
                      <p className="text-gray-300">{study.result}</p>
                    </div>

                    {study.metrics && (
                      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                        <h4 className="text-yellow-500 font-semibold mb-2">Key Metrics:</h4>
                        <p className="text-gray-300">{study.metrics}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Testimonials & Case Studies (fallback) */}
      <TestimonialsAndCaseStudies />

      {/* Navigation Footer */}
      <section className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <span className="text-gray-600 hidden sm:block">|</span>
            <Link href="/#services" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Grid3X3 className="w-4 h-4 mr-2" />
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
} 