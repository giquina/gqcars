'use client'

export default function TFLLogo({ className = "w-20 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center bg-white rounded p-2`}>
      <svg viewBox="0 0 120 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* TFL Blue Background */}
        <rect width="120" height="60" fill="#0019A8" rx="4"/>
        
        {/* TFL White Circle */}
        <circle cx="30" cy="30" r="22" fill="white"/>
        
        {/* TFL Red Bar */}
        <rect x="8" y="26" width="44" height="8" fill="#DC241F"/>
        
        {/* TFL Text */}
        <text x="65" y="25" fill="white" style={{fontSize: '12px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          TRANSPORT
        </text>
        <text x="65" y="40" fill="white" style={{fontSize: '12px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          FOR LONDON
        </text>
        
        {/* Private Hire text */}
        <text x="65" y="52" fill="#FFD320" style={{fontSize: '8px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          PRIVATE HIRE
        </text>
      </svg>
    </div>
  )
}
