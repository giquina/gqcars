import { Shield, Clock, Award, MapPin, Building2, ChampagneGlass, Car, Star, Phone, CheckCircle, Users, Trophy, Lock } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Header with Trust Badge */}
      <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50" role="banner">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">GQ Security</h1>
            <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">SIA Licensed</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 hidden md:block">24/7 Emergency Response</span>
            <a href="tel:+442012345678" className="bg-amber-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-amber-700 transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-slate-900 pt-16" role="banner">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-transparent z-10" />
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900" />
        </div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            {/* Trust indicators */}
            <div className="flex items-center space-x-4 mb-4 animate-fade-in">
              <span className="text-amber-500 text-sm">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-300 text-sm">4.9/5 Rating</span>
              <span className="text-blue-400 text-sm">•</span>
              <span className="text-gray-300 text-sm">500+ Satisfied Clients</span>
              <span className="text-blue-400 text-sm">•</span>
              <span className="text-gray-300 text-sm">Award-Winning Service</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Award-Winning Elite Close Protection & Private Hire Services
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-slide-up max-w-3xl">
              Trust GQ Security's SIA-licensed professionals for discreet protection and premium transport. 
              Serving high-profile clients across the UK with <strong className="text-amber-500">99.8% client satisfaction</strong> 
              and zero security incidents.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-all hover:transform hover:scale-105 rounded-lg shadow-lg">
                Get Your Free Security Assessment
                <Shield className="ml-2 h-5 w-5" />
              </a>
              <a href="/certifications" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors rounded-lg">
                View Our Certifications
                <Award className="ml-2 h-5 w-5" />
              </a>
            </div>
            
            {/* Emergency CTA */}
            <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 max-w-md">
              <p className="text-red-400 text-sm mb-2">Emergency Protection Required?</p>
              <a href="tel:+442012345678" className="inline-flex items-center text-white font-medium hover:text-red-300">
                24/7 Emergency Response ➤
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals Bar */}
      <section className="py-6 bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-300">SIA Licensed</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Lock className="w-4 h-4 text-blue-500" />
              <span className="text-gray-300">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="text-gray-300">Award Winner 2023</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4 text-purple-500" />
              <span className="text-gray-300">£10M Insured</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className="text-gray-300">24/7 Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-800/50" role="region" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
            Professional Security Services
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Comprehensive security solutions backed by SIA licensing, military expertise, and industry-leading standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-8 border-l-4 border-blue-600 hover:border-amber-500 transition-all rounded-r-lg">
              <Shield className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">SIA Licensed Close Protection Officers</h3>
              <p className="text-gray-400 mb-4">Our Level 3 SIA-licensed specialists provide discreet personal security with advanced threat assessment. Trusted by executives, celebrities, and high-net-worth individuals.</p>
              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>• Ex-military and police backgrounds</li>
                <li>• Advanced defensive driving certified</li>
                <li>• 24/7 threat monitoring</li>
                <li>• Completely confidential service</li>
              </ul>
              <a href="/services/close-protection" className="text-amber-500 hover:text-amber-400 font-medium">
                Schedule Consultation →
              </a>
            </div>
            
            <div className="bg-slate-900/50 p-8 border-l-4 border-blue-600 hover:border-amber-500 transition-all rounded-r-lg">
              <Car className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Executive Chauffeur & Security Transport</h3>
              <p className="text-gray-400 mb-4">Premium armored and luxury vehicles with security-trained chauffeurs. Mercedes S-Class and Range Rover fleet with bulletproof options available.</p>
              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>• Enhanced security protocols</li>
                <li>• GPS tracking and secure communications</li>
                <li>• Meet & greet airport services</li>
                <li>• Corporate account management</li>
              </ul>
              <a href="/services/private-hire" className="text-amber-500 hover:text-amber-400 font-medium">
                Schedule Consultation →
              </a>
            </div>
            
            <div className="bg-slate-900/50 p-8 border-l-4 border-blue-600 hover:border-amber-500 transition-all rounded-r-lg">
              <Building2 className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Corporate Security Solutions</h3>
              <p className="text-gray-400 mb-4">Comprehensive security solutions for businesses and executive protection with risk assessment and crisis management capabilities.</p>
              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>• Executive protection programs</li>
                <li>• Threat risk assessments</li>
                <li>• Corporate event security</li>
                <li>• Crisis management planning</li>
              </ul>
              <a href="/services/corporate" className="text-amber-500 hover:text-amber-400 font-medium">
                Schedule Consultation →
              </a>
            </div>
            
            <div className="bg-slate-900/50 p-8 border-l-4 border-blue-600 hover:border-amber-500 transition-all rounded-r-lg">
              <ChampagneGlass className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Wedding Security & Luxury Transport</h3>
              <p className="text-gray-400 mb-4">Discreet protection and luxury transport for your special day, ensuring privacy and elegance throughout your celebration.</p>
              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>• Discrete venue security</li>
                <li>• Luxury bridal transport</li>
                <li>• Guest management</li>
                <li>• Photography privacy protection</li>
              </ul>
              <a href="/services/weddings" className="text-amber-500 hover:text-amber-400 font-medium">
                Schedule Consultation →
              </a>
            </div>
            
            <div className="bg-slate-900/50 p-8 border-l-4 border-blue-600 hover:border-amber-500 transition-all rounded-r-lg">
              <Star className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">VIP & Celebrity Protection</h3>
              <p className="text-gray-400 mb-4">Bespoke security and transport solutions for high-profile clients requiring maximum discretion and professional service.</p>
              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>• Celebrity protection specialists</li>
                <li>• Red carpet event security</li>
                <li>• Media management support</li>
                <li>• International travel coordination</li>
              </ul>
              <a href="/services/vip" className="text-amber-500 hover:text-amber-400 font-medium">
                Schedule Consultation →
              </a>
            </div>
            
            <div className="bg-slate-900/50 p-8 border-l-4 border-blue-600 hover:border-amber-500 transition-all rounded-r-lg">
              <MapPin className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-white">Event Security Coordination</h3>
              <p className="text-gray-400 mb-4">Professional security coordination for events and special occasions with comprehensive planning and execution.</p>
              <ul className="text-sm text-gray-300 space-y-1 mb-4">
                <li>• Event risk assessments</li>
                <li>• Crowd management</li>
                <li>• VIP area protection</li>
                <li>• Emergency response planning</li>
              </ul>
              <a href="/services/events" className="text-amber-500 hover:text-amber-400 font-medium">
                Schedule Consultation →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-slate-900" role="region" aria-label="Client testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">What Our Clients Say</h2>
          <p className="text-center text-gray-400 mb-12">Trusted by executives, celebrities, and organizations worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
              </div>
              <blockquote className="text-gray-300 mb-4">
                "GQ Security provided exceptional protection during our high-profile merger announcement. Their professionalism and discretion were outstanding. The team anticipated every need."
              </blockquote>
              <footer className="text-sm text-gray-400">
                <strong>Sarah M.</strong>, Event Director, Fortune 500 Company
              </footer>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
              </div>
              <blockquote className="text-gray-300 mb-4">
                "The team's attention to detail and proactive approach gave us complete peace of mind throughout our European tour. Their vehicles were immaculate and service flawless."
              </blockquote>
              <footer className="text-sm text-gray-400">
                <strong>David L.</strong>, Entertainment Industry Executive
              </footer>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="text-amber-500">⭐⭐⭐⭐⭐</div>
              </div>
              <blockquote className="text-gray-300 mb-4">
                "For our wedding day, GQ Security was invisible yet ever-present. They protected our privacy while ensuring every guest felt welcome. Truly professional service."
              </blockquote>
              <footer className="text-sm text-gray-400">
                <strong>Emily & James R.</strong>, Private Clients
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Why 500+ Clients Choose GQ Security</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-gray-400 font-medium">SIA Licensed Personnel</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Emergency Response</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">99.8%</div>
              <div className="text-gray-400 font-medium">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">10+</div>
              <div className="text-gray-400 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2">0</div>
              <div className="text-gray-400 font-medium">Security Incidents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Certifications & Accreditations</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="p-4">
              <div className="bg-white rounded-lg p-4 mb-4 h-20 flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">SIA</span>
              </div>
              <h4 className="text-white font-semibold mb-2">SIA Approved Contractor</h4>
              <p className="text-gray-400 text-sm">Government-approved security contractor</p>
            </div>
            
            <div className="p-4">
              <div className="bg-white rounded-lg p-4 mb-4 h-20 flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">ISO 9001</span>
              </div>
              <h4 className="text-white font-semibold mb-2">ISO 9001:2015</h4>
              <p className="text-gray-400 text-sm">Quality management certified</p>
            </div>
            
            <div className="p-4">
              <div className="bg-white rounded-lg p-4 mb-4 h-20 flex items-center justify-center">
                <span className="text-slate-900 font-bold text-sm">IOSH</span>
              </div>
              <h4 className="text-white font-semibold mb-2">IOSH Compliant</h4>
              <p className="text-gray-400 text-sm">Health & safety standards</p>
            </div>
            
            <div className="p-4">
              <div className="bg-white rounded-lg p-4 mb-4 h-20 flex items-center justify-center">
                <Trophy className="text-slate-900 w-8 h-8" />
              </div>
              <h4 className="text-white font-semibold mb-2">Security Excellence</h4>
              <p className="text-gray-400 text-sm">Award Winner 2023</p>
            </div>
            
            <div className="p-4">
              <div className="bg-white rounded-lg p-4 mb-4 h-20 flex items-center justify-center">
                <Star className="text-slate-900 w-8 h-8" />
              </div>
              <h4 className="text-white font-semibold mb-2">5-Star Rating</h4>
              <p className="text-gray-400 text-sm">Trustpilot verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900" role="region" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Experience Elite Security?
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Join 500+ satisfied clients who trust GQ Security for their protection needs. 
            Contact us now for a <strong className="text-amber-500">free confidential consultation</strong> and personalized security assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="tel:+442012345678" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-all hover:transform hover:scale-105 rounded-lg shadow-lg">
              Call Now - 24/7 Response
              <Phone className="ml-2 h-5 w-5" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors rounded-lg">
              Request Your Confidential Quote
              <Award className="ml-2 h-5 w-5" />
            </a>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>⚡ Immediate deployment available | 🔒 Completely confidential | 💬 No obligation consultation</p>
          </div>
        </div>
      </section>
    </>
  )
}