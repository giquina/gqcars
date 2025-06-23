'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-yellow-500">Contact Us</h1>
          <p className="text-xl text-gray-300">Get in touch for immediate assistance or consultation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">24/7 Booking Line</h3>
                <p className="text-gray-300">07407 655 203</p>
                <p className="text-sm text-gray-400">Available for immediate bookings</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-300">gqcars@giquinaholdings.com</p>
                <p className="text-sm text-gray-400">We'll respond within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Service Areas</h3>
                <p className="text-gray-300">Watford & Hertfordshire</p>
                <p className="text-gray-300">Central London</p>
                <p className="text-gray-300">All London & SE England Airports</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-yellow-500 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-300">Professional services: 24/7</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-yellow-500">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
