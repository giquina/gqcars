"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Briefcase, Phone, Calendar, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function ProfessionalSupportPage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="💼 PROFESSIONAL SUPPORT"
              subtitle="Specialized security transport for professionals requiring discrete protection. Expert drivers trained in professional protocols and confidentiality."
              icon={Briefcase}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  💼 Book Professional Support
                </BoldButton>
              </Link>
              <a href="tel:07407655203">
                <BoldButton variant="outline" size="lg" className="text-lg">
                  📞 Call Now: 07407 655 203
                </BoldButton>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🛡️ PROFESSIONAL SUPPORT SERVICES"
              subtitle="Elite security solutions for professional environments"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BoldCard animated glowing className="text-center h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto">
                  <Shield className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  🤐 Confidential Service
                </h3>
                <p className="text-gray-300">Complete discretion and professional confidentiality for all client interactions.</p>
              </BoldCard>
              <BoldCard animated glowing className="text-center h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto">
                  <Users className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  👥 Meeting Security
                </h3>
                <p className="text-gray-300">Secure transport to meetings, conferences, and professional engagements.</p>
              </BoldCard>
              <BoldCard animated glowing className="text-center h-full group hover:scale-105 transition-transform duration-300">
                <div className="mb-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30 w-fit mx-auto">
                  <CheckCircle className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-black text-white mb-3 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  ✅ Client Protection
                </h3>
                <p className="text-gray-300">Professional protection services for high-value client meetings.</p>
              </BoldCard>
            </div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="✨ WHAT WE PROVIDE"
              subtitle="Comprehensive professional security solutions"
              centered
            />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-teal-400">Professional Transport</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Executive vehicle selection</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Professional attired drivers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Corporate account management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Flexible scheduling</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-teal-400">Security Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-teal-500 mr-3" />
                  <span>SIA licensed security drivers</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Threat assessment capabilities</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Secure communication protocols</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-teal-500 mr-3" />
                  <span>Professional confidentiality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

        {/* Case Studies Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="📋 PROFESSIONAL SUPPORT CASE STUDIES"
              subtitle="Specialized security solutions for professional environments"
              centered
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-4 border border-yellow-400/30">
                      <span className="text-yellow-400 font-black text-lg">⚖️</span>
                    </div>
                    <h3 className="text-xl font-black text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      High-Profile Legal Defense Team
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Client: International Law Firm | Location: Courts & Client Offices</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">🎯 Challenge</h4>
                    <p className="text-gray-300">Leading law firm required discrete security transport for legal team handling high-profile criminal defense case with media attention and potential security threats.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">💡 Solution</h4>
                    <p className="text-gray-300">Deployed armored vehicles with counter-surveillance trained drivers, secure communication protocols, and coordination with court security for seamless legal proceedings protection.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">📊 Results</h4>
                    <p className="text-gray-300">Zero security incidents throughout 6-month trial period, complete confidentiality maintained, and legal team able to focus entirely on case preparation.</p>
                  </div>
                </div>
              </BoldCard>

              <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-4 border border-yellow-400/30">
                      <span className="text-yellow-400 font-black text-lg">💰</span>
                    </div>
                    <h3 className="text-xl font-black text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Investment Banking M&A Team
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Client: Investment Bank | Location: City Offices & Client Sites</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">🎯 Challenge</h4>
                    <p className="text-gray-300">Investment banking team needed secure transport for confidential M&A negotiations worth £2.5B, with absolute confidentiality requirements and protection from industrial espionage.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">💡 Solution</h4>
                    <p className="text-gray-300">Provided counter-surveillance vehicles with TSCM (Technical Surveillance Countermeasures) capability, encrypted communication systems, and drivers with financial sector clearance.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">📊 Results</h4>
                    <p className="text-gray-300">Successful completion of deal with zero security breaches, no information leaks detected, and client confidence maintained throughout sensitive negotiations.</p>
                  </div>
                </div>
              </BoldCard>

              <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-4 border border-yellow-400/30">
                      <span className="text-yellow-400 font-black text-lg">🏥</span>
                    </div>
                    <h3 className="text-xl font-black text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Medical Professionals Protection
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Client: Private Medical Practice | Location: Harley Street & Patient Homes</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">🎯 Challenge</h4>
                    <p className="text-gray-300">Leading surgeon treating high-profile patients required secure transport to private residences and clinics while maintaining medical confidentiality and personal security.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">💡 Solution</h4>
                    <p className="text-gray-300">Implemented medical-grade secure transport with HIPAA-compliant protocols, medical emergency trained drivers, and discrete luxury vehicles for patient privacy.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">📊 Results</h4>
                    <p className="text-gray-300">100% patient confidentiality maintained, enhanced professional reputation through reliable service, and expanded practice through increased confidence to treat VIP patients.</p>
                  </div>
                </div>
              </BoldCard>

              <BoldCard animated glowing className="p-8 group hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-4 border border-yellow-400/30">
                      <span className="text-yellow-400 font-black text-lg">🎬</span>
                    </div>
                    <h3 className="text-xl font-black text-white bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      Entertainment Industry Executive
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">Client: Film Production Executive | Location: Studios & Industry Events</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">🎯 Challenge</h4>
                    <p className="text-gray-300">Film executive required discrete protection for industry meetings, premiere events, and talent negotiations while avoiding unwanted media attention and maintaining professional image.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">💡 Solution</h4>
                    <p className="text-gray-300">Deployed entertainment industry experienced security team with media-aware drivers, discrete vehicle selection, and coordination with event security for seamless transitions.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-yellow-400 mb-2">📊 Results</h4>
                    <p className="text-gray-300">Successfully navigated 25+ industry events without security incidents, maintained professional image, and enabled executive to focus on business relationships.</p>
                  </div>
                </div>
              </BoldCard>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="⭐ PROFESSIONAL SUPPORT REVIEWS"
              subtitle="Trusted by professionals worldwide"
              centered
            />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"Professional service for our executive team. Drivers understand business requirements and maintain complete confidentiality."</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-400/30">
                    <span className="text-yellow-400 font-black text-lg">R</span>
                  </div>
                  <div>
                    <p className="font-black text-white">Rachel Green</p>
                    <p className="text-sm text-gray-400">CEO, Tech Company</p>
                  </div>
                </div>
              </BoldCard>
              <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"Excellent professional support during our client meetings. Security was discrete and professional throughout."</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-400/30">
                    <span className="text-yellow-400 font-black text-lg">M</span>
                  </div>
                  <div>
                    <p className="font-black text-white">Michael Chen</p>
                    <p className="text-sm text-gray-400">Law Firm Partner</p>
                  </div>
                </div>
              </BoldCard>
              <BoldCard animated glowing className="h-full flex flex-col justify-between group hover:scale-105 transition-transform duration-300">
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">"Professional drivers who understand the importance of confidentiality in sensitive business meetings."</p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mr-3 border border-yellow-400/30">
                    <span className="text-yellow-400 font-black text-lg">S</span>
                  </div>
                  <div>
                    <p className="font-black text-white">Sarah Williams</p>
                    <p className="text-sm text-gray-400">Investment Manager</p>
                  </div>
                </div>
              </BoldCard>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldCard glowing className="text-center p-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                💼 PROFESSIONAL SECURITY SUPPORT
              </h2>
              <p className="text-gray-300 mb-8 text-lg">Discrete, professional, and secure transport for business needs</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <BoldButton size="lg" className="text-lg">
                    🚗 Book Professional Support
                  </BoldButton>
                </Link>
                <a href="tel:07407655203">
                  <BoldButton variant="outline" size="lg" className="text-lg">
                    📞 Call: 07407 655 203
                  </BoldButton>
                </a>
              </div>
            </BoldCard>
          </div>
        </section>

        <Footer />
      </div>
    </BoldAnimatedBackground>
  );
}