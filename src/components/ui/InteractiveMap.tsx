'use client'

import { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, Polyline } from '@react-google-maps/api'
import { MapPin, Clock } from 'lucide-react'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 51.5074,
  lng: -0.1278,
}

const locations = [
  { id: 'lhr', name: 'Heathrow Airport', position: { lat: 51.4700, lng: -0.4543 } },
  { id: 'lgw', name: 'Gatwick Airport', position: { lat: 51.1537, lng: -0.1821 } },
  { id: 'stn', name: 'Stansted Airport', position: { lat: 51.8849, lng: 0.2354 } },
  { id: 'canary', name: 'Canary Wharf', position: { lat: 51.5050, lng: -0.0235 } },
  { id: 'mayfair', name: 'Mayfair', position: { lat: 51.5093, lng: -0.1499 } },
]

const driverPositions = [
    { id: 1, position: { lat: 51.51, lng: -0.1 } },
    { id: 2, position: { lat: 51.48, lng: -0.2 } },
    { id: 3, position: { lat: 51.52, lng: -0.15 } },
]

export function InteractiveMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  })

  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [route, setRoute] = useState<any>(null)
  const [eta, setEta] = useState('')

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location)
    // In a real app, you'd fetch the route and ETA from the Google Maps API
    // For this demo, we'll simulate it.
    if (location) {
        const simulatedEta = Math.floor(Math.random() * (60 - 20 + 1)) + 20; // Random ETA between 20-60 mins
        setEta(`${simulatedEta} mins`);
        // Simulate a route
        setRoute([
            center,
            location.position
        ]);
    } else {
        setRoute(null);
        setEta('');
    }
  }

  if (!isLoaded) return <div>Loading Map...</div>

  return (
    <section className="bg-gray-900/50 text-white py-12 sm:py-16 md:py-20 rounded-lg my-8 w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3">
                <h2 className="text-3xl font-bold mb-4">Live Driver Locations</h2>
                <div className="space-y-4">
                    {locations.map((loc) => (
                        <button
                            key={loc.id}
                            onClick={() => handleLocationSelect(loc)}
                            className={`w-full text-left p-3 rounded-lg transition-colors ${selectedLocation?.id === loc.id ? 'bg-yellow-500 text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                            <div className="flex items-center">
                                <MapPin className="h-5 w-5 mr-3"/>
                                <span>{loc.name}</span>
                            </div>
                        </button>
                    ))}
                </div>
                 {eta && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                        <h3 className="font-bold text-lg">Estimated Time</h3>
                        <div className="flex items-center mt-2 text-yellow-400">
                            <Clock className="h-5 w-5 mr-2" />
                            <span>{eta} to {selectedLocation?.name}</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full md:w-2/3 h-96 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {driverPositions.map(driver => (
                         <Marker
                            key={driver.id}
                            position={driver.position}
                            icon={{
                                path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z',
                                fillColor: '#facc15', // yellow-400
                                fillOpacity: 1,
                                scale: 1.2,
                                strokeColor: '#111827', // gray-900
                                strokeWeight: 1,
                                anchor: typeof window !== 'undefined' ? new window.google.maps.Point(12, 12) : undefined
                            }}
                        />
                    ))}

                    {locations.map((loc) => (
                        <Marker
                            key={loc.id}
                            position={loc.position}
                            onClick={() => handleLocationSelect(loc)}
                        />
                    ))}

                    {route && <Polyline path={route} options={{ strokeColor: '#facc15' }} />}
                </GoogleMap>
            </div>
        </div>
    </section>
  )
}
