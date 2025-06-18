import { Metadata } from 'next'
import { Shield, Clock, Award, Users, CheckCircle } from 'lucide-react'
import { servicesSEO, serviceStructuredData } from '../../lib/seo'
import { generateMetadata, StructuredData, BreadcrumbStructuredData } from '../../components/SEO'

export const metadata: Metadata = generateMetadata(servicesSEO['close-protection'])

const serviceData = serviceStructuredData(
  'Close Protection Services',
  'Professional SIA licensed close protection officers providing discreet personal security and threat management services across the UK.',
  'Contact for Quote'
)

const breadcrumbItems = [
  { name: 'Home', url: 'https://gqsecurity.co.uk' },
  { name: 'Services', url: 'https://gqsecurity.co.uk/services' },
  { name: 'Close Protection', url: 'https://gqsecurity.co.uk/services/close-protection' }
]

export default function CloseProtectionPage() {
  return (
    <>
      <StructuredData data={serviceData} />
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      <div className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="relative h-96 flex items-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Close Protection Services
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Elite personal security with SIA licensed professionals. Discreet, reliable, and tailored to your unique requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity"
                >
                  Request Quote
                  <Shield className="ml-2 h-5 w-5" />
                </a>
                <a 
                  href="tel:+442012345678" 
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors"
                >
                  Call Now
                  <Award className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-20 bg-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">
                  Professional Personal Protection
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our close protection services provide the highest level of personal security for individuals who require professional protection. 
                  All our officers are SIA licensed and have extensive experience in threat assessment, risk mitigation, and personal security.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  We understand the importance of discretion and professionalism, ensuring your protection needs are met without compromising your lifestyle or business operations.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-300">SIA Licensed Officers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-300">24/7 Availability</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-300">Threat Assessment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-amber-500" />
                    <span className="text-gray-300">Discreet Operations</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600">
                  <Shield className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Expert Protection</h3>
                  <p className="text-gray-400">Highly trained security professionals with extensive experience.</p>
                </div>
                
                <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600">
                  <Clock className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">24/7 Service</h3>
                  <p className="text-gray-400">Round-the-clock protection when you need it most.</p>
                </div>
                
                <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600">
                  <Award className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Licensed & Insured</h3>
                  <p className="text-gray-400">Fully licensed and insured for your peace of mind.</p>
                </div>
                
                <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600">
                  <Users className="w-12 h-12 text-amber-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Tailored Solutions</h3>
                  <p className="text-gray-400">Customized security plans for your specific needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Comprehensive Security Solutions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Risk Assessment</h3>
                <p className="text-gray-400">
                  Comprehensive threat analysis and risk evaluation to develop effective security strategies.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Personal Security</h3>
                <p className="text-gray-400">
                  Experienced protection officers providing discrete personal security services.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">Emergency Response</h3>
                <p className="text-gray-400">
                  Rapid response capabilities and emergency protocols for critical situations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Need Professional Close Protection?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our security experts today to discuss your protection requirements and receive a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 transition-opacity"
              >
                Get Quote
                <Shield className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="tel:+442012345678" 
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors"
              >
                Call Now
                <Award className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}