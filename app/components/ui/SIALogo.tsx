'use client'

export default function SIALogo({ className = "w-20 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center bg-white rounded p-1`}>
      <svg viewBox="0 0 120 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Main SIA text */}
        <text x="60" y="40" textAnchor="middle" fill="#1E5A96" 
              style={{fontSize: '36px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', letterSpacing: '2px'}}>
          sia
        </text>
        
        {/* Small dot above 'i' */}
        <circle cx="60" cy="15" r="3" fill="#1E5A96"/>
        
        {/* Licensed bar */}
        <rect x="20" y="55" width="80" height="18" fill="#1E5A96"/>
        
        {/* Licensed text */}
        <text x="60" y="67" textAnchor="middle" fill="white" 
              style={{fontSize: '12px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', letterSpacing: '2px'}}>
          Licensed
        </text>
      </svg>
    </div>
  )
}
