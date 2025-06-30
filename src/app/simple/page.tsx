export default function SimpleTest() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1f2937', 
      color: 'white', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fbbf24' }}>
          🚗 GQ Cars LTD
        </h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Website is WORKING! ✅
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          SIA Licensed Security Transport - London's Elite Service
        </p>
        <div style={{ 
          backgroundColor: '#059669', 
          padding: '1rem 2rem', 
          borderRadius: '0.5rem',
          display: 'inline-block',
          marginBottom: '1rem'
        }}>
          ✅ Next.js 14 Server Running Successfully
        </div>
        <br />
        <div style={{ 
          backgroundColor: '#7c3aed', 
          padding: '1rem 2rem', 
          borderRadius: '0.5rem',
          display: 'inline-block'
        }}>
          🔗 Access: http://localhost:3000/simple
        </div>
      </div>
    </div>
  )
}