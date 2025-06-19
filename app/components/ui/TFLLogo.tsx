'use client'

export default function TFLLogo({ className = "w-20 h-12" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center bg-white rounded p-1`}>
      <svg viewBox="0 0 120 120" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* TFL Purple circle background */}
        <circle cx="60" cy="60" r="55" fill="#663399" stroke="#4B0082" strokeWidth="8"/>
        
        {/* White inner circle */}
        <circle cx="60" cy="60" r="42" fill="white"/>
        
        {/* Purple inner circle */}
        <circle cx="60" cy="60" r="28" fill="#9966CC"/>
        
        {/* White center circle */}
        <circle cx="60" cy="60" r="15" fill="white"/>
        
        {/* PRIVATE HIRE blue bar */}
        <rect x="20" y="52" width="80" height="16" fill="#4B0082" rx="2"/>
        
        {/* PRIVATE HIRE text */}
        <text x="60" y="64" textAnchor="middle" fill="white" 
              style={{fontSize: '10px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', letterSpacing: '1px'}}>
          PRIVATE HIRE
        </text>
        
        {/* Top text "Pre-booked only" */}
        <text x="60" y="25" textAnchor="middle" fill="white" 
              style={{fontSize: '8px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}>
          Pre-booked only
        </text>
      </svg>
    </div>
  )
}
