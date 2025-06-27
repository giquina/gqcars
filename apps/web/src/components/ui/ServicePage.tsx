import { TestimonialsAndCaseStudies } from '@/app/components/ui/TestimonialsAndCaseStudies'
import QuoteWidget from "@/app/components/ui/QuoteWidget";
import { LucideIcon, Star, Shield, Check, Clock, Users, Award } from "lucide-react";
import { Metadata } from 'next';

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
  testimonials?: {
    name: string;
    role: string;
    content: string;
    rating: number;
  }[];
  caseStudies?: {
    title: string;
    challenge: string;
    solution: string;
    result: string;
  }[];
  pricing?: {
    title: string;
    description: string;
    features: string[];
    startingPrice?: string;
  }[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  seoKeywords?: string[];
}

export default function ServicePage({ 
  title, 
  description, 
  heroImage, 
  category, 
  Icon, 
  features,
  testimonials = [],
  caseStudies = [],
  pricing = [],
  faqs = [],
  seoKeywords = []
}: ServicePageProps) {
  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>{title} | GQ Security - Professional Transport & Security Services</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${category}, security transport, ${seoKeywords.join(', ')}, London security services`} />
        <meta property="og:title" content={`${title} | GQ Security`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={heroImage} />
        <meta property="og:type" content="service" />
        <link rel="canonical" href={`https://gqsecurity.co.uk/services/${category.toLowerCase().replace(/\s+/g, '-')}`} />
      </head>

      <div>
        {/* Enhanced Hero Section */}
        <div className="relative bg-gray-900 text-white py-20 sm:py-32">
          <div className="absolute inset-0">
            <img src={heroImage} alt={title} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <Icon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">{title}</h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-300 mb-8">
              {description}
            </p>
            
            {/* Trust Indicators */}
            <div className="flex justify-center items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-green-400" />
                SIA Licensed
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                5-Star Service
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                24/7 Available
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
                <h2 className="text-3xl font-bold text-white mb-6">Key Features</h2>
                <div className="space-y-6">
                  {features.map((feature, index) => (
                    <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-800 hover:border-yellow-500/30 transition-colors">
                      <h3 className="text-xl font-semibold text-yellow-500 mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Why Choose Us Section */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-white mb-6">Why Choose GQ Security?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                      <Shield className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Fully Licensed & Insured</h3>
                        <p className="text-gray-400">All our personnel are SIA licensed with comprehensive insurance coverage</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Users className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Experienced Team</h3>
                        <p className="text-gray-400">Over 10 years of combined experience in security and luxury transport</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">Premium Fleet</h3>
                        <p className="text-gray-400">Luxury vehicles maintained to the highest standards</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-6 h-6 text-purple-400 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">24/7 Availability</h3>
                        <p className="text-gray-400">Round-the-clock service for your peace of mind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Booking Widget */}
              <div>
                <div className="sticky top-24">
                  <h2 className="text-3xl font-bold text-white mb-6">Get an Instant Quote</h2>
                  <QuoteWidget />
                  
                  {/* Emergency Contact */}
                  <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-400 mb-2">Emergency Service</h3>
                    <p className="text-gray-300 text-sm mb-3">Need immediate assistance?</p>
                    <a href="tel:+447700000000" className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded text-center transition-colors">
                      Call: +44 7700 000 000
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service-Specific Testimonials */}
        {testimonials.length > 0 && (
          <div className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Client Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-black/50 p-6 rounded-lg border border-gray-700">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="border-t border-gray-700 pt-4">
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Case Studies */}
        {caseStudies.length > 0 && (
          <div className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Success Stories</h2>
              <div className="space-y-8">
                {caseStudies.map((study, index) => (
                  <div key={index} className="bg-gray-900/50 p-8 rounded-lg border border-gray-700">
                    <h3 className="text-2xl font-semibold text-yellow-500 mb-4">{study.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Challenge</h4>
                        <p className="text-gray-400">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Solution</h4>
                        <p className="text-gray-400">{study.solution}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Result</h4>
                        <p className="text-gray-400">{study.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Section */}
        {pricing.length > 0 && (
          <div className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Service Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pricing.map((pkg, index) => (
                  <div key={index} className="bg-black/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-colors">
                    <h3 className="text-xl font-semibold text-yellow-500 mb-2">{pkg.title}</h3>
                    <p className="text-gray-400 mb-4">{pkg.description}</p>
                    {pkg.startingPrice && (
                      <p className="text-2xl font-bold text-white mb-4">From {pkg.startingPrice}</p>
                    )}
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {faqs.length > 0 && (
          <div className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-semibold text-yellow-500 mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-yellow-600 to-yellow-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-black mb-4">Ready to Experience Premium Security Transport?</h2>
            <p className="text-lg text-black/80 mb-8 max-w-2xl mx-auto">
              Contact us today for a personalized quote and discover why discerning clients choose GQ Security for their transport needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/quote" className="bg-black text-yellow-500 hover:bg-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors">
                Get Instant Quote
              </a>
              <a href="tel:+447700000000" className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-yellow-500 font-semibold py-3 px-8 rounded-lg transition-colors">
                Call: +44 7700 000 000
              </a>
            </div>
          </div>
        </div>

        {/* Global Testimonials & Case Studies */}
        <TestimonialsAndCaseStudies />
      </div>
    </>
  );
} 