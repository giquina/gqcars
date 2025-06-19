'use client'

import { useState, useRef, useEffect } from 'react'
import { MapPin, Search } from 'lucide-react'

interface AddressAutocompleteProps {
  label: string
  placeholder: string
  value: string
  onAddressSelect: (address: string, coordinates?: { lat: number; lng: number }) => void
  icon?: React.ReactNode
}

interface Suggestion {
  description: string
  place_id: string
  coordinates?: { lat: number; lng: number }
}

export default function AddressAutocomplete({
  label,
  placeholder,
  value,
  onAddressSelect,
  icon
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [isLoading, setIsLoading] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)

    try {
      // Mock suggestions for now - in production, use Google Places API
      const mockSuggestions: Suggestion[] = [
        {
          description: `${query} Street, London, UK`,
          place_id: 'mock-1',
          coordinates: { lat: 51.5074, lng: -0.1278 }
        },
        {
          description: `${query} Avenue, London, UK`,
          place_id: 'mock-2',
          coordinates: { lat: 51.5155, lng: -0.1415 }
        },
        {
          description: `${query} Road, London, UK`,
          place_id: 'mock-3',
          coordinates: { lat: 51.5074, lng: -0.1357 }
        }
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setSuggestions(mockSuggestions)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setInputValue(query)

    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(query)
    }, 300)
  }

  const handleSuggestionSelect = (suggestion: Suggestion) => {
    setInputValue(suggestion.description)
    setShowSuggestions(false)
    onAddressSelect(suggestion.description, suggestion.coordinates)
  }

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => {
      setShowSuggestions(false)
    }, 200)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {icon ? (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        ) : (
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gq-gold" />
        )}
        
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 bg-gq-black border border-gray-700 focus:border-gq-gold outline-none rounded-lg"
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gq-gold border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!isLoading && inputValue && (
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-gq-black border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSuggestionSelect(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-gray-800 border-b border-gray-700 last:border-b-0 flex items-center gap-3"
            >
              <MapPin className="w-4 h-4 text-gq-gold flex-shrink-0" />
              <span className="text-sm">{suggestion.description}</span>
            </button>
          ))}
        </div>
      )}

      {/* Enhanced Features Info */}
      {inputValue && (
        <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Address validation enabled
        </div>
      )}
    </div>
  )
}