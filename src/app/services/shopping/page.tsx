"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, ShoppingBag, Phone, Calendar, MapPin, CheckCircle, Car } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function ShoppingSecurityPage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🛍️ SHOPPING SECURITY"
              subtitle="Secure shopping experiences in luxury retail environments. Discrete protection while you enjoy exclusive shopping and boutique experiences."
              icon={ShoppingBag}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🛍️ Book Shopping Security
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
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shopping Security Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Retail Security</h3>
              <p className="text-gray-300">Comprehensive security coverage in luxury retail and boutique environments.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <ShoppingBag className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Purchase Protection</h3>
              <p className="text-gray-300">Secure handling and protection of high-value purchases and transactions.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <CheckCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Discrete Service</h3>
              <p className="text-gray-300">Unobtrusive security allowing you to enjoy your shopping experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Locations */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Shopping Destinations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-rose-400">Luxury Districts</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Bond Street & Mayfair</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Knightsbridge & Sloane Street</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Regent Street & Oxford Street</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 text-rose-500 mr-3" />
                  <span>King's Road, Chelsea</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-rose-400">Security Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Personal protection during shopping</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Secure transport between locations</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Package and purchase security</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-rose-500 mr-3" />
                  <span>Discrete crowd management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Provide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Personal Security</h3>
              <p className="text-gray-300 text-sm">Close protection during shopping trips</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Transport</h3>
              <p className="text-gray-300 text-sm">Luxury vehicles between boutiques</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Package Security</h3>
              <p className="text-gray-300 text-sm">Safe handling of purchases</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Flexible Timing</h3>
              <p className="text-gray-300 text-sm">Available for extended shopping days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shopping Security Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-rose-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Perfect for my shopping trips to Bond Street. Security was discrete and professional, allowing me to enjoy my experience."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <p className="font-semibold">Lady Catherine</p>
                  <p className="text-sm text-gray-400">Luxury Shopper</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-rose-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Excellent service for my wife's shopping expeditions. She feels completely safe and can focus on enjoying her day."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold">Peter Hamilton</p>
                  <p className="text-sm text-gray-400">Executive Client</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-rose-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Professional security team that understands the luxury retail environment. Highly recommended for exclusive shopping."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">E</span>
                </div>
                <div>
                  <p className="font-semibold">Emma Sterling</p>
                  <p className="text-sm text-gray-400">Fashion Consultant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <BoldCard glowing className="text-center p-12">
              <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🛍️ LUXURY SHOPPING SECURITY
              </h2>
              <p className="text-gray-300 mb-8 text-lg">Shop with confidence in London's premium retail districts</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <BoldButton size="lg" className="text-lg">
                    🚗 Book Shopping Security
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