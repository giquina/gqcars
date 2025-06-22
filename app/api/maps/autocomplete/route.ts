import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { input } = await request.json()
  const apiKey = process.env.GOOGLE_MAPS_API_KEY

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 })
  }

  if (!apiKey) {
    console.error('Google Maps API key is not configured for autocomplete')
    return NextResponse.json({ error: 'Maps service is temporarily unavailable' }, { status: 500 })
  }

  // Restrict to UK and specific types for better results for a taxi service
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}&components=country:gb&types=address|establishment|geocode`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.status === 'OK') {
      const predictions = data.predictions.map((p: any) => ({
        description: p.description,
        place_id: p.place_id,
      }))
      return NextResponse.json({ predictions })
    } else {
      console.error('Google Places Autocomplete API error:', data.status, data.error_message)
      return NextResponse.json(
        { error: data.error_message || 'Failed to fetch autocomplete suggestions' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Autocomplete internal error:', error)
    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 })
  }
} 