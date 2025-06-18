import { Building2, BarChart, Shield, Users, CheckCircle, Clock, FileCheck } from 'lucide-react'
import ServiceHero from '@/app/components/ui/ServiceHero'
import Animate from '@/app/components/ui/Animate'

export default function CorporateSecurityPage() {
  return (
    <>
      <ServiceHero
        title="Corporate Security Services"
        description="Comprehensive security solutions for businesses, executives, and corporate events."
        Icon={Building2}
        image="/images/services/corporate-hero.jpg"
      />

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Complete Corporate Protection</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporateFeatures.map((feature, index) => (
              <Animate key={feature.title} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-8 border-l-4 border-gq-blue hover:border-gq-gold transition-all">
                  <feature.icon className="w-10 h-10 text-gq-gold mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20 bg-gradient-to-r from-gq-blue via-gq-black to-gq-blue">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Security Packages</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Animate key={pkg.title} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-8">
                  <h3 className="text-xl font-bold mb-4">{pkg.title}</h3>
                  <p className="text-gray-400 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-gq-gold flex-shrink-0 mt-1" />
                        <span className="text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
                  >
                    Request Quote
                  </a>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Animate key={industry.title} type="slide-up" delay={index * 0.1}>
                <div className="bg-gq-black/50 p-6 text-center">
                  <industry.icon className="w-12 h-12 text-gq-gold mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{industry.title}</h3>
                  <p className="text-gray-400">{industry.description}</p>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gq-black/50">
        <div className="container mx-auto px-4">
          <Animate type="fade">
            <h2 className="text-3xl font-bold text-center mb-12">Our Security Process</h2>
          </Animate>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Animate key={step.title} type="slide-up" delay={index * 0.1}>
                <div className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-gq-gold/20" />
                  )}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-gq-blue to-gq-gold rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Secure Your Business Today</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your corporate security requirements and receive a tailored protection plan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/book"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-gq-blue to-gq-gold hover:opacity-90 transition-opacity"
            >
              Request Consultation
            </a>
            <a
              href="tel:+442012345678"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-gq-gold border-2 border-gq-gold hover:bg-gq-gold hover:text-white transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-amber-500">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">“GQ Security provided outstanding protection for our executives.”</p>
              <div className="text-amber-500 font-bold">— Corporate Client</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">“Professional, reliable, and always available.”</p>
              <div className="text-amber-500 font-bold">— Business Owner</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const corporateFeatures = [
  {
    title: "Executive Protection",
    description: "Comprehensive security for corporate executives and management teams.",
    icon: Shield
  },
  {
    title: "Workplace Security",
    description: "Office and facility protection with trained security personnel.",
    icon: Building2
  },
  {
    title: "Event Security",
    description: "Professional security for corporate events and conferences.",
    icon: Users
  },
  {
    title: "Risk Assessment",
    description: "Detailed security audits and threat analysis for businesses.",
    icon: BarChart
  },
  {
    title: "Compliance",
    description: "Security measures aligned with industry regulations.",
    icon: FileCheck
  },
  {
    title: "24/7 Coverage",
    description: "Round-the-clock security presence and monitoring.",
    icon: Clock
  }
]

const packages = [
  {
    title: "Essential Corporate Security",
    description: "Core security services for small to medium businesses",
    features: [
      "Risk assessment and security audit",
      "Access control implementation",
      "Security personnel (business hours)",
      "Basic emergency response planning",
      "Monthly security reports"
    ]
  },
  {
    title: "Advanced Protection",
    description: "Comprehensive security for larger organizations",
    features: [
      "24/7 security personnel coverage",
      "Executive protection services",
      "CCTV monitoring and management",
      "Crisis management planning",
      "Weekly security briefings",
      "Employee security training"
    ]
  },
  {
    title: "Enterprise Security",
    description: "Full-spectrum security for major corporations",
    features: [
      "Dedicated security team",
      "Multi-site protection",
      "Executive travel security",
      "Threat intelligence",
      "Custom security protocols",
      "24/7 command center",
      "Regular penetration testing"
    ]
  }
]

const industries = [
  {
    title: "Financial Services",
    description: "Banks, investment firms, and financial institutions",
    icon: Building2
  },
  {
    title: "Technology",
    description: "Tech companies and data centers",
    icon: Shield
  },
  {
    title: "Manufacturing",
    description: "Production facilities and warehouses",
    icon: Users
  },
  {
    title: "Professional Services",
    description: "Consulting firms and corporate offices",
    icon: FileCheck
  }
]

const process = [
  {
    title: "Assessment",
    description: "Comprehensive security audit and risk evaluation"
  },
  {
    title: "Planning",
    description: "Custom security strategy development"
  },
  {
    title: "Implementation",
    description: "Deployment of security measures and personnel"
  },
  {
    title: "Monitoring",
    description: "Continuous oversight and regular reviews"
  }
]