'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Star, 
  Target, 
  Clock,
  Users,
  MapPin,
  Zap,
  Award
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PerformanceMetricsProps {
  driverId: string;
}

interface PerformanceData {
  overallRating: number;
  ratingTrend: RatingData[];
  metrics: {
    punctuality: number;
    customerService: number;
    vehicleCleanliness: number;
    safetyScore: number;
    navigationSkills: number;
  };
  improvements: ImprovementSuggestion[];
  monthlyStats: MonthlyStats;
}

interface RatingData {
  date: string;
  rating: number;
  rides: number;
}

interface ImprovementSuggestion {
  area: string;
  suggestion: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
}

interface MonthlyStats {
  totalRides: number;
  averageTime: number;
  customerRetention: number;
  incidentCount: number;
}

export default function PerformanceMetrics({ driverId }: PerformanceMetricsProps) {
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const performanceData: PerformanceData = {
          overallRating: 4.8,
          ratingTrend: [
            { date: '2024-01-01', rating: 4.6, rides: 25 },
            { date: '2024-01-02', rating: 4.7, rides: 28 },
            { date: '2024-01-03', rating: 4.8, rides: 32 },
            { date: '2024-01-04', rating: 4.9, rides: 30 },
            { date: '2024-01-05', rating: 4.8, rides: 27 }
          ],
          metrics: {
            punctuality: 96,
            customerService: 94,
            vehicleCleanliness: 98,
            safetyScore: 99,
            navigationSkills: 92
          },
          improvements: [
            {
              area: 'Navigation Skills',
              suggestion: 'Consider using advanced route optimization during peak hours',
              priority: 'medium',
              impact: 'Reduce journey time by 8-12%'
            },
            {
              area: 'Customer Service',
              suggestion: 'Implement greeting templates for VIP clients',
              priority: 'high',
              impact: 'Increase customer satisfaction by 5%'
            }
          ],
          monthlyStats: {
            totalRides: 247,
            averageTime: 28,
            customerRetention: 85,
            incidentCount: 0
          }
        };
        setPerformance(performanceData);
      } catch (error) {
        console.error('Error fetching performance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [driverId]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="h-32 bg-gray-700 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!performance) return null;

  const metricsData = Object.entries(performance.metrics).map(([key, value]) => ({
    name: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value,
    color: value >= 95 ? '#10B981' : value >= 90 ? '#F59E0B' : '#EF4444'
  }));

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-yellow-500" />
          Performance Metrics
        </h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as any)}
          className="bg-gray-800 text-white px-3 py-1 rounded text-sm border border-gray-700"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
        </select>
      </div>

      {/* Overall Rating */}
      <div className="mb-6 text-center">
        <div className="text-4xl font-bold text-yellow-500 mb-2">{performance.overallRating}</div>
        <div className="flex justify-center items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-5 h-5 ${i < Math.floor(performance.overallRating) ? 'text-yellow-500 fill-current' : 'text-gray-600'}`} 
            />
          ))}
        </div>
        <div className="text-gray-400 text-sm">Overall Customer Rating</div>
      </div>

      {/* Rating Trend Chart */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-4">Rating Trend</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performance.ratingTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} />
              <YAxis domain={[4.0, 5.0]} stroke="#9CA3AF" fontSize={10} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#EAB308" 
                strokeWidth={2}
                dot={{ fill: '#EAB308', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-4">Skill Breakdown</h4>
        <div className="space-y-3">
          {metricsData.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">{metric.name}</span>
                <span className="text-white">{metric.value}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${metric.value}%`,
                    backgroundColor: metric.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-500">{performance.monthlyStats.totalRides}</div>
          <div className="text-xs text-gray-400">Total Rides</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-500">{performance.monthlyStats.averageTime}m</div>
          <div className="text-xs text-gray-400">Avg Duration</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-500">{performance.monthlyStats.customerRetention}%</div>
          <div className="text-xs text-gray-400">Retention</div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-500">{performance.monthlyStats.incidentCount}</div>
          <div className="text-xs text-gray-400">Incidents</div>
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div>
        <h4 className="text-white font-semibold mb-4">Improvement Suggestions</h4>
        <div className="space-y-3">
          {performance.improvements.map((improvement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                improvement.priority === 'high' 
                  ? 'bg-red-500/10 border-red-500/30' 
                  : improvement.priority === 'medium'
                  ? 'bg-yellow-500/10 border-yellow-500/30'
                  : 'bg-blue-500/10 border-blue-500/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1 rounded ${
                  improvement.priority === 'high' 
                    ? 'bg-red-500' 
                    : improvement.priority === 'medium'
                    ? 'bg-yellow-500'
                    : 'bg-blue-500'
                }`}>
                  <Target className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-sm">{improvement.area}</div>
                  <div className="text-gray-300 text-xs mt-1">{improvement.suggestion}</div>
                  <div className="text-gray-400 text-xs mt-2">Impact: {improvement.impact}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}