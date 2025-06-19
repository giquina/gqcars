'use client'

import { useState, useEffect, useRef } from 'react'
import { LucideIcon, CheckCircle, AlertCircle, Brain, MapPin } from 'lucide-react'

interface SmartInputProps {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  icon?: LucideIcon
  placeholder?: string
  required?: boolean
  aiSuggestions?: string[]
  className?: string
}

interface ValidationResult {
  isValid: boolean
  message: string
  confidence: number
}

export default function SmartInput({
  label,
  name,
  type,
  value,
  onChange,
  icon: Icon,
  placeholder,
  required = false,
  aiSuggestions = [],
  className = ''
}: SmartInputProps) {
  const [focused, setFocused] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Smart validation with AI
  useEffect(() => {
    if (value) {
      setIsValidating(true)
      const timer = setTimeout(() => {
        const result = validateInput(name, value, type)
        setValidation(result)
        setIsValidating(false)
      }, 500)

      return () => clearTimeout(timer)
    } else {
      setValidation(null)
      setIsValidating(false)
    }
  }, [value, name, type])

  // Auto-completion with AI suggestions
  useEffect(() => {
    if (value && focused) {
      const filteredSuggestions = getSmartSuggestions(name, value, aiSuggestions)
      setSuggestions(filteredSuggestions)
      setShowSuggestions(filteredSuggestions.length > 0)
    } else {
      setShowSuggestions(false)
      setSelectedSuggestion(-1)
    }
  }, [value, focused, name, aiSuggestions])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        if (selectedSuggestion >= 0) {
          e.preventDefault()
          selectSuggestion(suggestions[selectedSuggestion])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedSuggestion(-1)
        break
      case 'Tab':
        if (selectedSuggestion >= 0) {
          e.preventDefault()
          selectSuggestion(suggestions[selectedSuggestion])
        }
        break
    }
  }

  const selectSuggestion = (suggestion: string) => {
    const syntheticEvent = {
      target: { name, value: suggestion }
    } as React.ChangeEvent<HTMLInputElement>
    onChange(syntheticEvent)
    setShowSuggestions(false)
    setSelectedSuggestion(-1)
    inputRef.current?.focus()
  }

  const getValidationIcon = () => {
    if (isValidating) {
      return <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
    }
    if (validation?.isValid) {
      return <CheckCircle className="w-4 h-4 text-green-400" />
    }
    if (validation && !validation.isValid) {
      return <AlertCircle className="w-4 h-4 text-red-400" />
    }
    return null
  }

  const getInputClassName = () => {
    let baseClass = `w-full px-4 py-2 bg-gq-black border transition-all duration-200 outline-none ${className}`
    
    if (Icon) {
      baseClass += ' pl-10'
    }
    
    if (validation?.isValid === false) {
      baseClass += ' border-red-500 focus:border-red-400'
    } else if (validation?.isValid === true) {
      baseClass += ' border-green-500 focus:border-green-400'
    } else if (focused) {
      baseClass += ' border-gq-gold'
    } else {
      baseClass += ' border-gray-700'
    }

    return baseClass
  }

  return (
    <div className="relative">
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        
        <input
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow for selection
            setTimeout(() => {
              setFocused(false)
              setShowSuggestions(false)
            }, 200)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={getInputClassName()}
          required={required}
          aria-describedby={validation ? `${name}-validation` : undefined}
          aria-expanded={showSuggestions}
          aria-autocomplete="list"
          role="combobox"
        />

        {(validation || isValidating) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {getValidationIcon()}
          </div>
        )}

        {/* Smart Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-gq-black border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto"
            role="listbox"
          >
            <div className="p-2 text-xs text-gray-400 flex items-center gap-2">
              <Brain className="w-3 h-3" />
              AI Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectSuggestion(suggestion)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                  index === selectedSuggestion ? 'bg-gq-gold/20 border-l-2 border-gq-gold' : ''
                }`}
                role="option"
                aria-selected={index === selectedSuggestion}
              >
                <div className="flex items-center gap-2">
                  {name === 'location' && <MapPin className="w-3 h-3 text-gray-400" />}
                  <span className="text-sm">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Validation Message */}
      {validation && (
        <div
          id={`${name}-validation`}
          className={`mt-1 text-xs flex items-center gap-2 ${
            validation.isValid ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {validation.message}
          <span className="text-gray-500">
            ({Math.round(validation.confidence * 100)}% confidence)
          </span>
        </div>
      )}

      {/* Character count for longer inputs */}
      {(type === 'text' || type === 'email') && value && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {value.length} characters
        </div>
      )}
    </div>
  )
}

// AI-powered validation function
function validateInput(name: string, value: string, type: string): ValidationResult {
  switch (name) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return {
          isValid: false,
          message: 'Please enter a valid email address',
          confidence: 1.0
        }
      }
      // Check for common corporate domains
      const corporateDomains = ['gov.uk', 'police.uk', 'mod.uk', 'company.com']
      const isCorpEmail = corporateDomains.some(domain => value.includes(domain))
      return {
        isValid: true,
        message: isCorpEmail ? 'Corporate email detected' : 'Valid email format',
        confidence: isCorpEmail ? 0.9 : 0.8
      }

    case 'phone':
      // UK phone number validation
      const ukPhoneRegex = /^(\+44\s?7\d{9}|\(?07\d{9}\)?|\+44\s?20\s?\d{4}\s?\d{4}|020\s?\d{4}\s?\d{4})$/
      const cleanPhone = value.replace(/\s+/g, '')
      if (ukPhoneRegex.test(cleanPhone)) {
        return {
          isValid: true,
          message: 'Valid UK phone number',
          confidence: 0.95
        }
      }
      return {
        isValid: false,
        message: 'Please enter a valid UK phone number',
        confidence: 0.9
      }

    case 'name':
      if (value.length < 2) {
        return {
          isValid: false,
          message: 'Name too short',
          confidence: 1.0
        }
      }
      const hasNumbers = /\d/.test(value)
      if (hasNumbers) {
        return {
          isValid: false,
          message: 'Name should not contain numbers',
          confidence: 0.8
        }
      }
      return {
        isValid: true,
        message: 'Valid name format',
        confidence: 0.9
      }

    case 'location':
      // Check for security-sensitive locations
      const securityLocations = ['embassy', 'government', 'parliament', 'downing', 'mi5', 'mi6']
      const isSecurityLocation = securityLocations.some(loc => 
        value.toLowerCase().includes(loc)
      )
      if (isSecurityLocation) {
        return {
          isValid: true,
          message: 'High-security location detected - enhanced protection recommended',
          confidence: 0.95
        }
      }
      return {
        isValid: true,
        message: 'Location format valid',
        confidence: 0.8
      }

    default:
      return {
        isValid: true,
        message: 'Input looks good',
        confidence: 0.7
      }
  }
}

// Smart suggestions generator
function getSmartSuggestions(fieldName: string, value: string, baseSuggestions: string[]): string[] {
  const lowerValue = value.toLowerCase()
  
  // Filter base suggestions first
  let suggestions = baseSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(lowerValue)
  )

  // Add field-specific smart suggestions
  switch (fieldName) {
    case 'location':
      const ukLocations = [
        'London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow', 'Liverpool',
        'Newcastle', 'Sheffield', 'Bristol', 'Nottingham', 'Leicester', 'Coventry',
        'Heathrow Airport', 'Gatwick Airport', 'Stansted Airport', 'Luton Airport',
        'Canary Wharf', 'The City', 'Westminster', 'Mayfair', 'Kensington',
        'Chelsea', 'Belgravia', 'Marylebone', 'Fitzrovia', 'Shoreditch'
      ]
      
      const locationMatches = ukLocations.filter(location =>
        location.toLowerCase().includes(lowerValue) && !suggestions.includes(location)
      )
      suggestions = [...suggestions, ...locationMatches].slice(0, 8)
      break

    case 'name':
      // No auto-suggestions for names for privacy
      suggestions = []
      break

    case 'email':
      if (value.includes('@')) {
        const [username] = value.split('@')
        const commonDomains = ['gmail.com', 'outlook.com', 'company.com', 'gov.uk']
        suggestions = commonDomains.map(domain => `${username}@${domain}`)
          .filter(email => !baseSuggestions.includes(email))
          .slice(0, 4)
      }
      break

    case 'requirements':
      const commonRequirements = [
        'Airport transfer required',
        'Discreet protection needed',
        'VIP client - maximum security',
        'Corporate event security',
        'Wedding day protection',
        'High-risk assessment needed',
        'Multiple vehicle escort',
        'Close protection team required'
      ]
      
      const reqMatches = commonRequirements.filter(req =>
        req.toLowerCase().includes(lowerValue)
      )
      suggestions = [...suggestions, ...reqMatches].slice(0, 6)
      break
  }

  return suggestions.slice(0, 8) // Limit to 8 suggestions max
}