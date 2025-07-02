import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { pickup, destination } = await request.json()
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    // Validate required inputs
    if (!pickup || !destination) {
      return NextResponse.json(
        { error: 'Pickup and destination are required' }, 
        { status: 400 }
      )
    }

    if (!apiKey) {
      console.error('Google Maps API key is not configured')
      return NextResponse.json(
        { error: 'Maps service is temporarily unavailable' }, 
        { status: 500 }
      )
    }

    // Build Google Maps Directions API URL
    const url = new URL('https://maps.googleapis.com/maps/api/directions/json')
    url.searchParams.append('origin', pickup)
    url.searchParams.append('destination', destination)
    url.searchParams.append('key', apiKey)
    url.searchParams.append('units', 'imperial') // Get distances in miles
    url.searchParams.append('region', 'uk') // Optimize for UK

    console.log('Fetching route from Google Maps API...')
    
    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status === 'OK' && data.routes && data.routes.length > 0) {
      const route = data.routes[0].legs[0]
      
      // Extract distance and duration
      const distance = route.distance.text // e.g., "21.6 mi"
      const duration = route.duration.text // e.g., "35 mins"
      const distanceValue = route.distance.value // in meters
      const durationValue = route.duration.value // in seconds

      console.log(`Route calculated: ${distance}, ${duration}`)

      return NextResponse.json({
        success: true,
        distance,
        duration,
        distanceValue,
        durationValue,
        startAddress: route.start_address,
        endAddress: route.end_address
      })
    } else {
      console.error('Google Maps API error:', data.status, data.error_message)
      
      // Return user-friendly error messages
      let errorMessage = 'Unable to calculate route'
      if (data.status === 'ZERO_RESULTS') {
        errorMessage = 'No route found between these locations'
      } else if (data.status === 'NOT_FOUND') {
        errorMessage = 'One or both locations could not be found'
      } else if (data.status === 'OVER_QUERY_LIMIT') {
        errorMessage = 'Service temporarily busy, please try again'
      }

      return NextResponse.json(
        { error: errorMessage }, 
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Maps API error:', error)
    return NextResponse.json(
      { error: 'An internal error occurred while calculating the route' }, 
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' }, 
    { status: 405 }
  )
}