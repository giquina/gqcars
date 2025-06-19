'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  TrendingUp, 
  Clock, 
  Award, 
  Target,
  Users,
  Calendar,
  CheckCircle
} from 'lucide-react';

interface DriverStatsProps {
  driverId: string;
}

interface DriverStatsData {
  totalRides: number;
  averageRating: number;
  totalHours: number;
  completionRate: number;
  onTimeRate: number;
  repeatCustomers: number;
  monthlyTarget: number;
  monthlyProgress: number;
  achievements: Achievement[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

export default function DriverStats({ driverId }: DriverStatsProps) {
  const [stats, setStats] = useState<DriverStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriverStats = async () => {
      try {
        // Simulate API call
        const statsData: DriverStatsData = {
          totalRides: 1247,
          averageRating: 4.9,
          totalHours: 1840,
          completionRate: 98.5,
          onTimeRate: 96.2,
          repeatCustomers: 342,
          monthlyTarget: 180,
          monthlyProgress: 147,
          achievements: [
            {
              id: '1',
              title: '5-Star Champion',
              description: 'Maintain 4.8+ rating for 30 days',
              icon: 'star',
              earned: true,
              earnedDate: '2024-01-10'
            },
            {
              id: '2',
              title: 'Perfect Week',
              description: 'Complete all scheduled shifts without absence',
              icon: 'calendar',
              earned: true,
              earnedDate: '2024-01-05'
            },
            {
              id: '3',
              title: 'Safety First',
              description: 'Zero incidents for 90 days',
              icon: 'shield',
              earned: false
            },
            {
              id: '4',
              title: 'Customer Favorite',
              description: '100+ repeat customers',
              icon: 'users',
              earned: true,
              earnedDate: '2023-12-20'
            }
          ]
        };
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching driver stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverStats();
  }, [driverId]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-700 rounded"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            <div className="h-3 bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const getAchievementIcon = (iconType: string) => {
    switch (iconType) {
      case 'star': return <Star className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
        Performance Stats
      </h3>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.totalRides}</div>
          <div className="text-sm text-gray-400">Total Rides</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center">
            {stats.averageRating}
            <Star className="w-4 h-4 ml-1 fill-current" />
          </div>
          <div className="text-sm text-gray-400">Avg Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.totalHours}h</div>
          <div className="text-sm text-gray-400">Total Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.completionRate}%</div>
          <div className="text-sm text-gray-400">Completion</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">On-Time Rate</span>
            <span className="text-white">{stats.onTimeRate}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${stats.onTimeRate}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Monthly Target</span>
            <span className="text-white">{stats.monthlyProgress}/{stats.monthlyTarget}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(stats.monthlyProgress / stats.monthlyTarget) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-3">Achievements</h4>
        <div className="grid grid-cols-2 gap-2">
          {stats.achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-3 rounded-lg border ${
                achievement.earned 
                  ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500' 
                  : 'bg-gray-800 border-gray-700 text-gray-500'
              }`}
            >
              <div className="flex items-center mb-1">
                {getAchievementIcon(achievement.icon)}
                {achievement.earned && <CheckCircle className="w-3 h-3 ml-auto" />}
              </div>
              <div className="text-xs font-medium">{achievement.title}</div>
              <div className="text-xs opacity-75">{achievement.description}</div>
              {achievement.earned && achievement.earnedDate && (
                <div className="text-xs mt-1 opacity-60">
                  Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Repeat Customers */}
      <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-purple-400 text-sm">Repeat Customers</div>
            <div className="text-white font-bold text-lg">{stats.repeatCustomers}</div>
          </div>
          <Users className="w-8 h-8 text-purple-400" />
        </div>
        <div className="text-xs text-purple-300 mt-1">
          Building customer loyalty drives earnings
        </div>
      </div>
    </div>
  );
}