export default function Footer() {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-blue-500 bg-clip-text text-transparent mb-4">
              GQ Security
            </h3>
            <p className="text-gray-400">
              Professional security services with unmatched excellence and discretion.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="/services/close-protection" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Close Protection
                </a>
              </li>
              <li>
                <a href="/services/private-hire" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Private Hire
                </a>
              </li>
              <li>
                <a href="/services/corporate" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Corporate Security
                </a>
              </li>
              <li>
                <a href="/services/events" className="text-gray-400 hover:text-blue-500 transition-colors">
                  Event Security
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>24/7 Emergency: +44 20 XXXX XXXX</li>
              <li>Email: contact@gqsecurity.com</li>
              <li>London Office: 123 Security St</li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Certifications</h4>
            <ul className="space-y-2 text-gray-400">
              <li>SIA Licensed</li>
              <li>ISO 9001:2015</li>
              <li>BSIA Member</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GQ Security. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}