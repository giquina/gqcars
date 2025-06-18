import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[60vh] overflow-hidden">
        {/* Optional video background for desktop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 hidden md:block"
        >
          <source src="/videos/security-hero.mp4" type="video/mp4" />
        </video>
        {/* Fallback image for mobile or if video fails */}
        <div className="absolute inset-0 md:hidden">
          <Image src="/images/hero.jpg" alt="Security Team" fill className="object-cover object-center opacity-40" />
        </div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-blue-500/30 to-slate-900/80 animate-gradient-slow z-10" />
        <div className="container mx-auto text-center relative z-20 py-24 px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            Elite Security Services
          </h1>
          <p className="text-2xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto drop-shadow-lg">
            SIA licensed professionals for close protection, luxury private hire, and corporate security. Discreet, reliable, and trusted by VIPs and businesses across the UK.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/book" className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
              Request a Quote
            </Link>
            <a href="tel:+442012345678" className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              +44 20 1234 5678
            </a>
          </div>
          <p className="text-gray-300 font-medium">24/7 Emergency Response Available</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-amber-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-amber-500 mb-4">
                Close Protection
              </h3>
              <p className="text-gray-300">
                SIA licensed officers providing elite personal security for high-profile clients and events.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-blue-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-blue-500 mb-4">
                Private Hire
              </h3>
              <p className="text-gray-300">
                Luxury vehicle fleet with professional chauffeurs for executive and VIP transportation.
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-lg shadow-xl hover:shadow-amber-500/10 transform hover:scale-105 transition-all duration-300 border border-slate-700">
              <div className="text-3xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-amber-500 mb-4">
                Corporate Security
              </h3>
              <p className="text-gray-300">
                Comprehensive security solutions tailored for businesses and corporate events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
          <div className="p-4">
            <div className="text-2xl font-bold text-amber-500">10+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-500">100%</div>
            <div className="text-gray-400">SIA Licensed</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-amber-500">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
          <div className="p-4">
            <div className="text-2xl font-bold text-blue-500">500+</div>
            <div className="text-gray-400">Satisfied Clients</div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-amber-500">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">“Professional, discreet, and always reliable. GQ Security made our event stress-free.”</p>
              <div className="text-amber-500 font-bold">— Sarah L.</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">“Their drivers and security team are top-notch. Highly recommended for VIPs.”</p>
              <div className="text-amber-500 font-bold">— James K.</div>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg shadow-lg">
              <p className="text-gray-300 mb-4">“We trust GQ Security for all our corporate events. The best in the business.”</p>
              <div className="text-amber-500 font-bold">— Corporate Client</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}