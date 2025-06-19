'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Power
} from 'lucide-react';
import { format, addDays, startOfWeek, endOfWeek, isSameDay } from 'date-fns';

interface ShiftScheduleProps {
  driverId: string;
}

interface Shift {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  zone: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  earnings?: number;
  rides?: number;
}

interface AvailabilitySlot {
  day: string;
  timeSlots: TimeSlot[];
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export default function ShiftSchedule({ driverId }: ShiftScheduleProps) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showAddShift, setShowAddShift] = useState(false);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        // Simulate API call
        const shiftsData: Shift[] = [
          {
            id: '1',
            date: '2024-01-15',
            startTime: '09:00',
            endTime: '17:00',
            zone: 'Central London',
            status: 'confirmed',
            earnings: 145.50,
            rides: 12
          },
          {
            id: '2',
            date: '2024-01-16',
            startTime: '14:00',
            endTime: '22:00',
            zone: 'Heathrow Airport',
            status: 'scheduled'
          },
          {
            id: '3',
            date: '2024-01-17',
            startTime: '06:00',
            endTime: '14:00',
            zone: 'Watford',
            status: 'scheduled'
          },
          {
            id: '4',
            date: '2024-01-18',
            startTime: '10:00',
            endTime: '18:00',
            zone: 'Central London',
            status: 'confirmed'
          }
        ];

        const availabilityData: AvailabilitySlot[] = [
          {
            day: 'Monday',
            timeSlots: [
              { id: '1', startTime: '06:00', endTime: '14:00', available: true },
              { id: '2', startTime: '14:00', endTime: '22:00', available: false }
            ]
          },
          {
            day: 'Tuesday',
            timeSlots: [
              { id: '3', startTime: '09:00', endTime: '17:00', available: true },
              { id: '4', startTime: '17:00', endTime: '01:00', available: true }
            ]
          }
        ];

        setShifts(shiftsData);
        setAvailability(availabilityData);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, [driverId]);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = [];
  
  for (let i = 0; i < 7; i++) {
    weekDays.push(addDays(weekStart, i));
  }

  const getShiftsForDay = (date: Date) => {
    return shifts.filter(shift => isSameDay(new Date(shift.date), date));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'scheduled': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-3 h-3" />;
      case 'scheduled': return <Clock className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'cancelled': return <AlertCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-yellow-500" />
          Shift Schedule
        </h3>
        <div className="flex items-center space-x-4">
          {/* Availability Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Available</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isAvailable ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isAvailable ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
            <Power className={`w-4 h-4 ${isAvailable ? 'text-green-400' : 'text-gray-400'}`} />
          </div>
          
          <button
            onClick={() => setShowAddShift(true)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Shift
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentWeek(addDays(currentWeek, -7))}
          className="text-gray-400 hover:text-white"
        >
          ← Previous Week
        </button>
        <span className="text-white font-medium">
          {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
        </span>
        <button
          onClick={() => setCurrentWeek(addDays(currentWeek, 7))}
          className="text-gray-400 hover:text-white"
        >
          Next Week →
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDays.map((day, index) => {
          const dayShifts = getShiftsForDay(day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <div key={index} className={`p-3 rounded-lg border ${
              isToday ? 'border-yellow-500 bg-yellow-500/5' : 'border-gray-700 bg-gray-800'
            }`}>
              <div className="text-center mb-2">
                <div className="text-xs text-gray-400">{format(day, 'EEE')}</div>
                <div className={`text-lg font-bold ${isToday ? 'text-yellow-500' : 'text-white'}`}>
                  {format(day, 'd')}
                </div>
              </div>
              
              <div className="space-y-1">
                {dayShifts.map((shift) => (
                  <motion.div
                    key={shift.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-2 rounded text-xs border ${getStatusColor(shift.status)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{shift.startTime}</span>
                      {getStatusIcon(shift.status)}
                    </div>
                    <div className="text-xs opacity-75">{shift.zone}</div>
                    {shift.earnings && (
                      <div className="text-xs font-bold mt-1">£{shift.earnings}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Shifts */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-4">Upcoming Shifts</h4>
        <div className="space-y-3">
          {shifts.filter(shift => shift.status !== 'completed').map((shift) => (
            <div key={shift.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${getStatusColor(shift.status)}`}>
                  {getStatusIcon(shift.status)}
                </div>
                <div>
                  <div className="text-white font-medium">
                    {format(new Date(shift.date), 'EEEE, MMM d')}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {shift.startTime} - {shift.endTime} • {shift.zone}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-yellow-500">
            {shifts.filter(s => s.status === 'scheduled' || s.status === 'confirmed').length}
          </div>
          <div className="text-sm text-gray-400">Upcoming</div>
        </div>
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-green-500">
            {shifts.filter(s => s.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
        <div className="text-center p-4 bg-gray-800 rounded-lg">
          <div className="text-2xl font-bold text-blue-500">42h</div>
          <div className="text-sm text-gray-400">This Week</div>
        </div>
      </div>
    </div>
  );
}