'use client'

import React, { useState } from 'react'
import { useVoice } from './VoiceProvider'
import { Settings, Volume2, Languages, Mic, TestTube, Save, RotateCcw } from 'lucide-react'

export default function VoiceSettings() {
  const { 
    settings, 
    updateSettings, 
    speak, 
    availableLanguages, 
    switchLanguage,
    isSupported 
  } = useVoice()
  
  const [isOpen, setIsOpen] = useState(false)
  const [testText, setTestText] = useState("Hello! This is a test of your voice settings. GQ Cars provides premium security taxi services.")

  const languageNames = {
    'en-GB': 'English (UK)',
    'en-US': 'English (US)',
    'fr-FR': 'French',
    'de-DE': 'German',
    'es-ES': 'Spanish',
    'it-IT': 'Italian',
    'pt-PT': 'Portuguese',
    'ru-RU': 'Russian',
    'zh-CN': 'Chinese',
    'ja-JP': 'Japanese',
    'ar-SA': 'Arabic'
  }

  const handleLanguageChange = (language: string) => {
    switchLanguage(language)
    speak(`Language changed to ${languageNames[language as keyof typeof languageNames]}`)
  }

  const handleSpeedChange = (speed: number) => {
    updateSettings({ voiceSpeed: speed })
  }

  const handlePitchChange = (pitch: number) => {
    updateSettings({ voicePitch: pitch })
  }

  const handleVolumeChange = (volume: number) => {
    updateSettings({ voiceVolume: volume })
  }

  const toggleAutoSpeak = () => {
    const newAutoSpeak = !settings.autoSpeak
    updateSettings({ autoSpeak: newAutoSpeak })
    if (newAutoSpeak) {
      speak("Auto speak enabled")
    }
  }

  const toggleBackgroundNoise = () => {
    updateSettings({ backgroundNoise: !settings.backgroundNoise })
    speak(`Background noise filtering ${settings.backgroundNoise ? 'disabled' : 'enabled'}`)
  }

  const testVoiceSettings = () => {
    speak(testText)
  }

  const resetToDefaults = () => {
    updateSettings({
      language: 'en-GB',
      voiceSpeed: 1.0,
      voicePitch: 1.0,
      voiceVolume: 1.0,
      autoSpeak: true,
      backgroundNoise: false
    })
    speak("Voice settings reset to defaults")
  }

  const voiceProfiles = [
    {
      name: 'Default',
      settings: { voiceSpeed: 1.0, voicePitch: 1.0, voiceVolume: 1.0 }
    },
    {
      name: 'Slow & Clear',
      settings: { voiceSpeed: 0.7, voicePitch: 0.9, voiceVolume: 1.0 }
    },
    {
      name: 'Fast',
      settings: { voiceSpeed: 1.3, voicePitch: 1.1, voiceVolume: 1.0 }
    },
    {
      name: 'Deep Voice',
      settings: { voiceSpeed: 0.9, voicePitch: 0.7, voiceVolume: 1.0 }
    },
    {
      name: 'High Voice',
      settings: { voiceSpeed: 1.0, voicePitch: 1.3, voiceVolume: 1.0 }
    }
  ]

  const applyVoiceProfile = (profile: typeof voiceProfiles[0]) => {
    updateSettings(profile.settings)
    speak(`Applied ${profile.name} voice profile`)
  }

  if (!isSupported) {
    return null
  }

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg shadow-lg z-50"
        aria-label="Open voice settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <Volume2 className="w-6 h-6 text-gq-gold" />
                <h2 className="text-xl font-bold text-white">Voice Settings</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  <Languages className="w-4 h-4 inline mr-2" />
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-gq-gold focus:border-transparent"
                >
                  {availableLanguages.map(lang => (
                    <option key={lang} value={lang}>
                      {languageNames[lang as keyof typeof languageNames] || lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voice Speed */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Speed: {settings.voiceSpeed.toFixed(1)}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings.voiceSpeed}
                  onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Slow</span>
                  <span>Normal</span>
                  <span>Fast</span>
                </div>
              </div>

              {/* Voice Pitch */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Pitch: {settings.voicePitch.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={settings.voicePitch}
                  onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Low</span>
                  <span>Normal</span>
                  <span>High</span>
                </div>
              </div>

              {/* Voice Volume */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Volume: {Math.round(settings.voiceVolume * 100)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.voiceVolume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Quiet</span>
                  <span>Normal</span>
                  <span>Loud</span>
                </div>
              </div>

              {/* Voice Profiles */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Quick Profiles
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {voiceProfiles.map((profile) => (
                    <button
                      key={profile.name}
                      onClick={() => applyVoiceProfile(profile)}
                      className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded text-sm transition-colors"
                    >
                      {profile.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-gq-gold" />
                    <span className="text-white text-sm">Auto Speak Responses</span>
                  </div>
                  <button
                    onClick={toggleAutoSpeak}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.autoSpeak ? 'bg-gq-gold' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoSpeak ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-blue-400" />
                    <span className="text-white text-sm">Background Noise Filtering</span>
                  </div>
                  <button
                    onClick={toggleBackgroundNoise}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.backgroundNoise ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.backgroundNoise ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Test Voice */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  <TestTube className="w-4 h-4 inline mr-2" />
                  Test Voice Settings
                </label>
                <textarea
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-gq-gold focus:border-transparent"
                  placeholder="Enter text to test voice settings..."
                />
                <button
                  onClick={testVoiceSettings}
                  className="mt-2 bg-gq-gold hover:bg-yellow-600 text-black py-2 px-4 rounded font-medium transition-colors"
                >
                  <Volume2 className="w-4 h-4 inline mr-2" />
                  Test Voice
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-700">
              <button
                onClick={resetToDefaults}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </button>
              
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gq-gold hover:bg-yellow-600 text-black py-2 px-6 rounded font-medium transition-colors"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #EAB308;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #EAB308;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  )
}