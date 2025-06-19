'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  DollarSign, 
  FileText, 
  Star, 
  Clock, 
  Shield, 
  Users, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Bell,
  Settings
} from 'lucide-react';
import DriverStats from '../components/driver/DriverStats';
import EarningsSummary from '../components/driver/EarningsSummary';
import ShiftSchedule from '../components/driver/ShiftSchedule';
import DocumentStatus from '../components/driver/DocumentStatus';
import PerformanceMetrics from '../components/driver/PerformanceMetrics';
import NotificationCenter from '../components/driver/NotificationCenter';

export default function DriverPortal() {
  const [driver, setDriver] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching driver data
    const fetchDriverData = async () => {
      try {
        // In a real app, this would be an API call
        const driverData = {
          id: 'DRV001',
          name: 'James Wilson',
          siaLicense: 'SIA12345678',
          status: 'ACTIVE',
          rating: 4.9,
          totalEarnings: 2850.75,
          weeklyEarnings: 485.50,
          shiftsCompleted: 127,
          documentsValid: true,
          nextShift: '2024-01-15T09:00:00Z',
          notifications: 3
        };
        setDriver(driverData);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading Driver Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-yellow-500">Driver Portal</h1>
            <p className="text-gray-400">Welcome back, {driver?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              {driver?.notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {driver.notifications}
                </span>
              )}
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Weekly Earnings</p>
                <p className="text-2xl font-bold text-white">£{driver?.weeklyEarnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-200" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Driver Rating</p>
                <p className="text-2xl font-bold text-white">{driver?.rating}/5.0</p>
              </div>
              <Star className="w-8 h-8 text-blue-200" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Shifts Completed</p>
                <p className="text-2xl font-bold text-white">{driver?.shiftsCompleted}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-200" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`bg-gradient-to-r ${driver?.documentsValid ? 'from-green-600 to-green-700' : 'from-red-600 to-red-700'} p-6 rounded-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`${driver?.documentsValid ? 'text-green-100' : 'text-red-100'} text-sm`}>Documents</p>
                <p className="text-2xl font-bold text-white">{driver?.documentsValid ? 'Valid' : 'Action Required'}</p>
              </div>
              {driver?.documentsValid ? 
                <CheckCircle className="w-8 h-8 text-green-200" /> : 
                <AlertTriangle className="w-8 h-8 text-red-200" />
              }
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <EarningsSummary driverId={driver?.id} />
            <ShiftSchedule driverId={driver?.id} />
            <PerformanceMetrics driverId={driver?.id} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <DocumentStatus driverId={driver?.id} />
            <NotificationCenter driverId={driver?.id} />
            <DriverStats driverId={driver?.id} />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg text-center transition-colors"
            >
              <Calendar className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm">Schedule Shift</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg text-center transition-colors"
            >
              <FileText className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm">Upload Document</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg text-center transition-colors"
            >
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm">View Earnings</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg text-center transition-colors"
            >
              <Users className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm">Support</p>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}