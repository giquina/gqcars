import { Shield, Star, Car, Clock, MapPin, Users, Building2, Sparkles } from 'lucide-react'

export default function FamilyOfficePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-yellow-500/20 px-6 py-3 rounded-full mb-6">
            <Star className="w-8 h-8 text-yellow-500" />
            <span className="text-yellow-500 font-bold text-lg">FAMILY OFFICE SERVICES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ultra-High-Net-Worth Family Transport
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Discretionary transport services for <span className="text-yellow-500">private families</span>, 
            <span className="text-blue-400"> family offices</span>, and ultra-high-net-worth individuals requiring 
            coordinated security and logistics management.
          </p>
          
          {/* AI Instant Quote Widget */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-6 rounded-2xl border border-yellow-500/30 max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-500 font-bold">AI INSTANT QUOTE</span>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-white font-semibold text-lg mb-4">Family Office Transport Estimate</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-black/40 p-3 rounded-lg">
                <span className="text-gray-400">Annual Retainer:</span>
                <div className="text-yellow-500 font-bold text-lg">£150,000+</div>
              </div>
              <div className="bg-black/40 p-3 rounded-lg">
                <span className="text-gray-400">Per Journey:</span>
                <div className="text-yellow-500 font-bold text-lg">£250-500</div>
              </div>
            </div>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold transition-colors">
              Get Custom Family Office Quote
            </button>
          </div>
        </div>

        {/* Service Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div className="bg-black/50 p-8 rounded-2xl border border-yellow-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Multi-Generational Coordination</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Seamless transport coordination for entire family networks, from principals to next-generation 
                members, with dedicated liaison teams managing complex scheduling and security protocols.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-2xl border border-blue-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Discreet Security Integration</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Close Protection Officers with family office experience, understanding the unique requirements 
                of UHNW transport including threat assessment, route security, and confidentiality protocols.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-black/50 p-8 rounded-2xl border border-purple-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Global Network Access</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Coordinated transport services across multiple jurisdictions with vetted partner networks, 
                ensuring consistent service standards for international travel and residence movements.
              </p>
            </div>

            <div className="bg-black/50 p-8 rounded-2xl border border-green-500/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">24/7 Concierge Integration</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Seamless integration with family office operations, household management, and existing 
                security infrastructure to provide comprehensive transport solutions without operational friction.
              </p>
            </div>
          </div>
        </div>

        {/* Service Tiers */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Service Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-600/30 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Essential Family</h3>
              <div className="text-3xl font-bold text-blue-400 mb-6">£75,000</div>
              <p className="text-gray-400 text-sm mb-6">Annual retainer</p>
              <ul className="text-gray-300 space-y-3 text-sm">
                <li>• Principal + immediate family</li>
                <li>• Standard security protocols</li>
                <li>• Regional coverage</li>
                <li>• Business hours priority</li>
              </ul>
            </div>

            <div className="bg-yellow-500/10 p-8 rounded-2xl border border-yellow-500/50 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Premium Family Office</h3>
              <div className="text-3xl font-bold text-yellow-400 mb-6">£150,000</div>
              <p className="text-gray-400 text-sm mb-6">Annual retainer</p>
              <ul className="text-gray-300 space-y-3 text-sm">
                <li>• Extended family network</li>
                <li>• Enhanced security coordination</li>
                <li>• International coverage</li>
                <li>• 24/7 priority response</li>
                <li>• Dedicated account management</li>
              </ul>
            </div>

            <div className="bg-purple-500/10 p-8 rounded-2xl border border-purple-500/50 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Ultra Family Office</h3>
              <div className="text-3xl font-bold text-purple-400 mb-6">£300,000+</div>
              <p className="text-gray-400 text-sm mb-6">Annual retainer</p>
              <ul className="text-gray-300 space-y-3 text-sm">
                <li>• Multi-generational coordination</li>
                <li>• Comprehensive threat management</li>
                <li>• Global network access</li>
                <li>• Integrated household services</li>
                <li>• Bespoke security solutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-8 rounded-2xl border border-yellow-500/30 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Discuss Your Family's Transport Requirements?</h3>
            <p className="text-gray-300 mb-6">Our family office specialists understand the unique needs of UHNW families and can design bespoke transport solutions.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:07407655203" className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold transition-colors">
                Call Family Office Team
              </a>
              <a href="mailto:family-office@gqcars.co.uk" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                Email Confidential Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
