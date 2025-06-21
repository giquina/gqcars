'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CalendarProps {
  selected?: Date
  onSelect: (date: Date) => void
  className?: string
  minDate?: Date
  maxDate?: Date
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export default function Calendar({ selected, onSelect, className = '', minDate, maxDate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())
  const [direction, setDirection] = useState(0)

  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()

  // Previous month navigation
  const goToPrevMonth = () => {
    setDirection(-1)
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Next month navigation
  const goToNextMonth = () => {
    setDirection(1)
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Generate calendar days
  const calendarDays = []
  
  // Previous month overflow days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0)
  const prevMonthDays = prevMonth.getDate()
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth - 1, prevMonthDays - i)
    })
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(currentYear, currentMonth, day)
    })
  }

  // Next month overflow days
  const remainingDays = 42 - calendarDays.length // 6 rows × 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(currentYear, currentMonth + 1, day)
    })
  }

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }

  const isDateSelected = (date: Date) => {
    if (!selected) return false
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onSelect(date)
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  }

  return (
    <div className={`bg-gray-900 p-4 rounded-lg border border-gray-700 w-80 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPrevMonth}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-white">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
        </div>
        
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          type="button"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((day) => (
          <div key={day} className="text-center text-sm text-gray-400 py-2 font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={`${currentMonth}-${currentYear}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid grid-cols-7 gap-1"
          >
            {calendarDays.map((dayObj, index) => {
              const isDisabled = isDateDisabled(dayObj.date)
              const isSelected = isDateSelected(dayObj.date)
              const isTodayDate = isToday(dayObj.date)
              
              return (
                <motion.button
                  key={index}
                  type="button"
                  onClick={() => handleDateClick(dayObj.date)}
                  disabled={isDisabled}
                  whileHover={!isDisabled ? { scale: 1.05 } : {}}
                  whileTap={!isDisabled ? { scale: 0.95 } : {}}
                  className={`
                    h-10 w-10 text-sm rounded-lg transition-all duration-200 relative
                    ${!dayObj.isCurrentMonth 
                      ? 'text-gray-600 hover:text-gray-400' 
                      : 'text-white'
                    }
                    ${isSelected 
                      ? 'bg-gradient-to-r from-blue-600 to-amber-500 text-white font-semibold' 
                      : 'hover:bg-gray-800'
                    }
                    ${isTodayDate && !isSelected 
                      ? 'ring-2 ring-amber-400 ring-opacity-50' 
                      : ''
                    }
                    ${isDisabled 
                      ? 'text-gray-700 cursor-not-allowed' 
                      : 'cursor-pointer'
                    }
                  `}
                >
                  {dayObj.day}
                  {isTodayDate && !isSelected && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-amber-400 rounded-full"></div>
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick actions */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onSelect(today)}
            className="flex-1 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => onSelect(new Date(today.getTime() + 24 * 60 * 60 * 1000))}
            className="flex-1 px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Tomorrow
          </button>
        </div>
      </div>
    </div>
  )
}