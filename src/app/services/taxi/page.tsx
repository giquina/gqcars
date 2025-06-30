"use client";

import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { Shield, Clock, Star, Users, Car, Phone, Calendar, MapPin, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { BoldAnimatedBackground, BoldSectionHeader, BoldCard, BoldButton } from '@/components/ui/BoldDynamicComponents';

export default function SecurityTaxiPage() {
  return (
    <BoldAnimatedBackground>
      <div className="min-h-screen relative z-10">
        <Header />
      
        {/* Hero Section */}
        <section className="relative pt-24 pb-16">
          <div className="container mx-auto px-4">
            <BoldSectionHeader 
              title="🚖 SECURITY TAXI"
              subtitle="Standard security transport with SIA licensed drivers. Reliable, safe, and secure taxi service with professional protection standards."
              icon={Car}
              centered
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/book">
                <BoldButton size="lg" className="text-lg">
                  🚖 Book Security Taxi
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
          <h2 className="text-3xl font-bold text-center mb-12">Security Taxi Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Shield className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">SIA Licensed Drivers</h3>
              <p className="text-gray-300">All drivers are SIA licensed with security industry training and background checks.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">GPS Tracking</h3>
              <p className="text-gray-300">Real-time GPS tracking for all journeys with live location monitoring.</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">24/7 Availability</h3>
              <p className="text-gray-300">Round-the-clock security taxi service with immediate response capability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Service Coverage</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-400">London Areas</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Central London (Zones 1-2)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Greater London (Zones 3-6)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Airport connections</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Home Counties coverage</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-400">Security Features</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Enhanced DBS checked drivers</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Security protocols training</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Emergency response procedures</span>
                </li>
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-500 mr-3" />
                  <span>Vehicle security features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Vehicle Fleet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Standard Taxi</h3>
              <p className="text-gray-300 text-sm">1-4 passengers, secure transport</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Executive Taxi</h3>
              <p className="text-gray-300 text-sm">Premium vehicles, enhanced comfort</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Group Taxi</h3>
              <p className="text-gray-300 text-sm">5-8 passengers, people carriers</p>
            </div>
            <div className="text-center p-6 bg-gray-700 rounded-xl">
              <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Taxi</h3>
              <p className="text-gray-300 text-sm">Enhanced security features</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Book Security Taxi</h2>
            <div className="bg-gray-800 p-8 rounded-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Location</label>
                    <input type="text" placeholder="Enter pickup address" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Destination</label>
                    <input type="text" placeholder="Enter destination" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gray-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <input type="date" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <input type="time" className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gray-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Passengers</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gray-500">
                      <option>1 passenger</option>
                      <option>2 passengers</option>
                      <option>3 passengers</option>
                      <option>4 passengers</option>
                      <option>5+ passengers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Vehicle Type</label>
                    <select className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gray-500">
                      <option>Standard Taxi</option>
                      <option>Executive Taxi</option>
                      <option>Group Taxi</option>
                      <option>Secure Taxi</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-gray-500 hover:bg-gray-400 text-white font-bold py-4 px-6 rounded-lg transition-colors">
                  Book Security Taxi
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Security Taxi Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-gray-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Reliable security taxi service. Driver was professional and I felt safe throughout the journey."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">T</span>
                </div>
                <div>
                  <p className="font-semibold">Tom Johnson</p>
                  <p className="text-sm text-gray-400">Regular Customer</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-gray-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Great service for late night travel. SIA licensed driver gave me confidence in my security."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">L</span>
                </div>
                <div>
                  <p className="font-semibold">Lisa Chen</p>
                  <p className="text-sm text-gray-400">Night Shift Worker</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-700 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-gray-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
              </div>
              <p className="text-gray-300 mb-4">"Perfect for airport transfers. Always on time and security-conscious drivers."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold">Mark Davis</p>
                  <p className="text-sm text-gray-400">Business Traveler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-500 to-slate-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Professional Security Taxi</h2>
          <p className="text-white/90 mb-8 text-lg">Safe, secure, and reliable transport 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book">
              <button className="bg-white hover:bg-gray-100 text-gray-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Book Security Taxi
              </button>
            </Link>
            <a href="tel:07407655203">
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-600 font-bold py-4 px-8 rounded-lg transition-colors text-lg">
                Call: 07407 655 203
              </button>
            </a>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </BoldAnimatedBackground>
  );
}