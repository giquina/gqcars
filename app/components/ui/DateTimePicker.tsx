'use client'

import { useState } from 'react'
import { Calendar as CalendarIcon, Clock } from 'lucide-react'
import Calendar from './Calendar'
import TimePicker from './TimePicker'
import Popover from './Popover'

interface DateTimePickerProps {
  date?: string
  time?: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  className?: string
  placeholder?: {
    date?: string
    time?: string
  }
}

export default function DateTimePicker({
  date,
  time,
  onDateChange,
  onTimeChange,
  className = '',
  placeholder = { date: 'Pick a date', time: 'Pick a time' }
}: DateTimePickerProps) {
  const [dateOpen, setDateOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return placeholder.date
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDisplayTime = (timeStr: string) => {
    if (!timeStr) return placeholder.time
    if (timeStr === 'now') return 'Right Now'
    if (timeStr === 'asap') return 'ASAP'
    return timeStr
  }

  const handleDateSelect = (selectedDate: Date) => {
    const dateString = selectedDate.toISOString().split('T')[0]
    onDateChange(dateString)
    setDateOpen(false)
  }

  const handleTimeSelect = (selectedTime: string) => {
    onTimeChange(selectedTime)
    setTimeOpen(false)
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium mb-2 text-amber-400">
          Journey Date
        </label>
        <Popover
          isOpen={dateOpen}
          onOpenChange={setDateOpen}
          align="start"
          trigger={
            <button
              type="button"
              className={`w-full p-3 bg-gray-900 border-2 border-gray-700 hover:border-amber-400 focus:border-amber-400 transition-all duration-200 text-left flex items-center space-x-3 group ${
                date ? 'text-white' : 'text-gray-400'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <CalendarIcon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="flex-1">{formatDisplayDate(date || '')}</span>
              <div className="text-xs text-gray-500">
                {date ? '✓' : '○'}
              </div>
            </button>
          }
          content={
            <Calendar
              selected={date ? new Date(date) : undefined}
              onSelect={handleDateSelect}
              minDate={new Date()}
            />
          }
        />
      </div>

      {/* Time Picker */}
      <div>
        <label className="block text-sm font-medium mb-2 text-amber-400">
          Journey Time
        </label>
        <Popover
          isOpen={timeOpen}
          onOpenChange={setTimeOpen}
          align="start"
          trigger={
            <button
              type="button"
              className={`w-full p-3 bg-gray-900 border-2 border-gray-700 hover:border-amber-400 focus:border-amber-400 transition-all duration-200 text-left flex items-center space-x-3 group ${
                time ? 'text-white' : 'text-gray-400'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(17, 24, 39, 0.9) 100%)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Clock className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="flex-1">{formatDisplayTime(time || '')}</span>
              <div className="text-xs text-gray-500">
                {time ? '✓' : '○'}
              </div>
            </button>
          }
          content={
            <TimePicker
              selected={time}
              onSelect={handleTimeSelect}
            />
          }
        />
      </div>

      {/* Status Indicators */}
      <div className="md:col-span-2">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${date ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className="text-gray-400">100% SIA Licensed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${time ? 'bg-blue-400' : 'bg-gray-600'}`} />
            <span className="text-gray-400">24/7 Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-gray-400">4.9★ Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className="text-gray-400">Real-time tracking</span>
          </div>
        </div>
      </div>
    </div>
  )
}