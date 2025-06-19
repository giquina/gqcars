import { Shield, Clock, Award, MapPin, Building2, ChampagneGlass, Car, Star, Phone } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center bg-slate-900">
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
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Award-Winning Elite Close Protection & Private Hire Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
              Trust GQ Security's SIA-licensed professionals for discreet protection and premium transport. 
              Serving high-profile clients across the UK with <strong className="text-amber-500">99.8% client satisfaction</strong> 
              and zero security incidents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
                Get Your Free Security Assessment
                <Shield className="ml-2 h-5 w-5" />
              </a>
              <a href="/services" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
                View Our Certifications
                <Star className="ml-2 h-5 w-5" />
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
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-gray-300">SIA Licensed</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-gray-300">ISO 9001 Certified</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span className="text-gray-300">Award Winner 2023</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4 text-purple-500" />
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
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Professional Security Services</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Comprehensive security solutions backed by SIA licensing, military expertise, and industry-leading standards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Shield className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">SIA Licensed Close Protection Officers</h3>
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
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Car className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Executive Chauffeur & Security Transport</h3>
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
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Building2 className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Corporate Security Solutions</h3>
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
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <ChampagneGlass className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Wedding Security & Luxury Transport</h3>
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
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <Star className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">VIP & Celebrity Protection</h3>
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
            
            <div className="bg-slate-900/50 p-6 border-l-4 border-blue-600 hover:border-amber-500 transition-all">
              <MapPin className="w-12 h-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Event Security Coordination</h3>
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
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">What Our Clients Say</h2>
          <p className="text-center text-gray-400 mb-12">Trusted by executives, celebrities, and organizations worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-slate-900 to-blue-600">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why 500+ Clients Choose GQ Security</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">100%</div>
              <div className="text-gray-400 font-medium">SIA Licensed Personnel</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">24/7</div>
              <div className="text-gray-400 font-medium">Emergency Response</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">99.8%</div>
              <div className="text-gray-400 font-medium">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">500+</div>
              <div className="text-gray-400 font-medium">Satisfied Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">10+</div>
              <div className="text-gray-400 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-500 mb-2">0</div>
              <div className="text-gray-400 font-medium">Security Incidents</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Experience Elite Security?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Join 500+ satisfied clients who trust GQ Security for their protection needs. 
            Contact us now for a <strong className="text-amber-500">free confidential consultation</strong> and personalized security assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+442012345678" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-amber-600 hover:opacity-90 transition-opacity">
              Call Now - 24/7 Response
              <Phone className="ml-2 h-5 w-5" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-amber-500 border-2 border-amber-500 hover:bg-amber-500 hover:text-white transition-colors">
              Request Your Confidential Quote
              <Award className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
