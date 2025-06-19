import { MapPin, Sparkles, Zap } from 'lucide-react'

export default function AIBadge() {
  return (
    <div className="fixed top-20 right-6 z-40 hidden md:block">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg border border-purple-400/30 animate-pulse">
        <div className="flex items-center space-x-2 text-sm font-bold">
          <Sparkles className="w-4 h-4" />
          <span>SMART PLATFORM</span>
          <Zap className="w-4 h-4" />
        </div>
      </div>
      
      {/* Mobile version */}
      <div className="md:hidden fixed top-16 right-4 z-40">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full shadow-lg">
          <Sparkles className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
