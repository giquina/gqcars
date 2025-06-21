'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Zap, Timer } from 'lucide-react'

interface TimePickerProps {
  selected?: string
  onSelect: (time: string) => void
  className?: string
  is24Hour?: boolean
}

const QUICK_OPTIONS = [
  { label: 'Right Now', value: 'now', icon: Zap },
  { label: 'ASAP', value: 'asap', icon: Timer }
]

const POPULAR_TIMES = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00'
]

export default function TimePicker({ selected, onSelect, className = '', is24Hour = false }: TimePickerProps) {
  const [hour, setHour] = useState(9)
  const [minute, setMinute] = useState(0)
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM')
  const [activeTab, setActiveTab] = useState<'quick' | 'popular' | 'custom'>('quick')

  // Parse selected time when component mounts or selected changes
  useEffect(() => {
    if (selected && selected !== 'now' && selected !== 'asap') {
      const [timeStr] = selected.split(' ')
      const [h, m] = timeStr.split(':').map(Number)
      
      if (is24Hour) {
        setHour(h)
        setMinute(m)
      } else {
        if (h === 0) {
          setHour(12)
          setPeriod('AM')
        } else if (h === 12) {
          setHour(12)
          setPeriod('PM')
        } else if (h > 12) {
          setHour(h - 12)
          setPeriod('PM')
        } else {
          setHour(h)
          setPeriod('AM')
        }
      }
    }
  }, [selected, is24Hour])

  const formatTime = (h: number, m: number, p: 'AM' | 'PM') => {
    if (is24Hour) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    }
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${p}`
  }

  const handleQuickSelect = (value: string) => {
    if (value === 'now') {
      const now = new Date()
      const currentTime = formatTime(
        is24Hour ? now.getHours() : now.getHours() % 12 || 12,
        now.getMinutes(),
        now.getHours() >= 12 ? 'PM' : 'AM'
      )
      onSelect('now')
    } else if (value === 'asap') {
      onSelect('asap')
    }
  }

  const handlePopularTimeSelect = (time: string) => {
    onSelect(time)
  }

  const handleCustomTimeChange = () => {
    const timeString = formatTime(hour, minute, period)
    onSelect(timeString)
  }

  const generateHours = () => {
    if (is24Hour) {
      return Array.from({ length: 24 }, (_, i) => i)
    }
    return Array.from({ length: 12 }, (_, i) => i + 1)
  }

  const generateMinutes = () => {
    return Array.from({ length: 12 }, (_, i) => i * 5)
  }

  const tabs = [
    { id: 'quick', label: 'Quick', icon: Zap },
    { id: 'popular', label: 'Popular', icon: Clock },
    { id: 'custom', label: 'Custom', icon: Timer }
  ]

  return (
    <div className={`bg-gray-900 rounded-lg border border-gray-700 w-80 ${className}`}>
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-amber-400 bg-gray-800'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </div>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-amber-400"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Quick Options */}
        {activeTab === 'quick' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {QUICK_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleQuickSelect(option.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                  selected === option.value
                    ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600 text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <option.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-gray-400">
                      {option.value === 'now' ? 'Book for immediate service' : 'As soon as possible'}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Popular Times */}
        {activeTab === 'popular' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 gap-2"
          >
            {POPULAR_TIMES.map((time) => (
              <motion.button
                key={time}
                type="button"
                onClick={() => handlePopularTimeSelect(time)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selected === time
                    ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {time}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Custom Time */}
        {activeTab === 'custom' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              {/* Hour Selector */}
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2">Hour</label>
                <select
                  value={hour}
                  onChange={(e) => {
                    setHour(Number(e.target.value))
                    setTimeout(handleCustomTimeChange, 0)
                  }}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-amber-400 outline-none"
                >
                  {generateHours().map((h) => (
                    <option key={h} value={h}>
                      {String(h).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-2xl text-gray-400 mt-6">:</div>

              {/* Minute Selector */}
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-2">Minute</label>
                <select
                  value={minute}
                  onChange={(e) => {
                    setMinute(Number(e.target.value))
                    setTimeout(handleCustomTimeChange, 0)
                  }}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-amber-400 outline-none"
                >
                  {generateMinutes().map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>

              {/* AM/PM Selector */}
              {!is24Hour && (
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-2">Period</label>
                  <select
                    value={period}
                    onChange={(e) => {
                      setPeriod(e.target.value as 'AM' | 'PM')
                      setTimeout(handleCustomTimeChange, 0)
                    }}
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-amber-400 outline-none"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              )}
            </div>

            {/* Time Preview */}
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Selected Time</div>
              <div className="text-2xl font-bold text-amber-400">
                {formatTime(hour, minute, period)}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}