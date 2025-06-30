import { TestimonialsAndCaseStudies } from '@/components/ui/TestimonialsAndCaseStudies'
import QuoteWidget from "@/components/ui/QuoteWidget";
import { LucideIcon } from "lucide-react";

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
}

export default function ServicePage({ title, description, heroImage, category, Icon, features }: ServicePageProps) {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-20 sm:py-32">
        <div className="absolute inset-0">
          <img src={heroImage} alt={title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
            <Icon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">{title}</h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-300">
            {description}
          </p>
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
                            <div key={index} className="bg-gray-900/50 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-yellow-500 mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Booking Widget */}
                <div>
                    <div className="sticky top-24">
                        <h2 className="text-3xl font-bold text-white mb-6">Get an Instant Quote</h2>
                        <QuoteWidget />
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Testimonials & Case Studies */}
      <TestimonialsAndCaseStudies />
    </div>
  )
} 