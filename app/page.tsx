export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            Elite Security Services
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Providing exceptional security and private hire services with unmatched professionalism and discretion
          </p>

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

          <div className="mt-20 space-y-6">
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-amber-500/20 transform hover:scale-105 transition-all duration-300">
                Request a Quote
              </button>
              <button className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/20 transform hover:scale-105 transition-all duration-300 border border-slate-700">
                +44 20 XXXX XXXX
              </button>
            </div>
            <p className="text-gray-400">24/7 Emergency Response Available</p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center">
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
        </div>
      </section>
    </div>
  )
}