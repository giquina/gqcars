'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Gift,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface EarningsSummaryProps {
  driverId: string;
}

interface EarningsData {
  totalEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  tips: number;
  bonuses: number;
  pendingPayout: number;
  lastPayout: number;
  payoutDate: string;
  weeklyData: WeeklyEarning[];
  recentTransactions: Transaction[];
}

interface WeeklyEarning {
  week: string;
  earnings: number;
  rides: number;
}

interface Transaction {
  id: string;
  type: 'payout' | 'bonus' | 'tip' | 'ride';
  amount: number;
  date: string;
  description: string;
}

export default function EarningsSummary({ driverId }: EarningsSummaryProps) {
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        // Simulate API call
        const earningsData: EarningsData = {
          totalEarnings: 15420.75,
          weeklyEarnings: 485.50,
          monthlyEarnings: 2150.25,
          tips: 145.80,
          bonuses: 250.00,
          pendingPayout: 485.50,
          lastPayout: 2150.25,
          payoutDate: '2024-01-12',
          weeklyData: [
            { week: 'Week 1', earnings: 420.50, rides: 32 },
            { week: 'Week 2', earnings: 465.25, rides: 38 },
            { week: 'Week 3', earnings: 510.75, rides: 41 },
            { week: 'Week 4', earnings: 485.50, rides: 35 },
          ],
          recentTransactions: [
            {
              id: '1',
              type: 'payout',
              amount: 2150.25,
              date: '2024-01-12',
              description: 'Weekly payout - Week 1'
            },
            {
              id: '2',
              type: 'bonus',
              amount: 50.00,
              date: '2024-01-11',
              description: 'Perfect attendance bonus'
            },
            {
              id: '3',
              type: 'tip',
              amount: 25.50,
              date: '2024-01-11',
              description: 'Customer tip - Airport transfer'
            },
            {
              id: '4',
              type: 'ride',
              amount: 45.75,
              date: '2024-01-11',
              description: 'Ride earnings - Central London'
            }
          ]
        };
        setEarnings(earningsData);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [driverId]);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="h-20 bg-gray-700 rounded"></div>
            <div className="h-20 bg-gray-700 rounded"></div>
          </div>
          <div className="h-40 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!earnings) return null;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payout': return <CreditCard className="w-4 h-4 text-green-400" />;
      case 'bonus': return <Gift className="w-4 h-4 text-purple-400" />;
      case 'tip': return <DollarSign className="w-4 h-4 text-yellow-400" />;
      default: return <DollarSign className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
          Earnings Summary
        </h3>
        <button className="text-yellow-500 hover:text-yellow-400 flex items-center text-sm">
          <Download className="w-4 h-4 mr-1" />
          Export
        </button>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-green-700 p-4 rounded-lg"
        >
          <div className="text-green-100 text-xs mb-1">This Week</div>
          <div className="text-white font-bold text-lg">£{earnings.weeklyEarnings}</div>
          <div className="flex items-center text-green-200 text-xs mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +12.5%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-lg"
        >
          <div className="text-blue-100 text-xs mb-1">This Month</div>
          <div className="text-white font-bold text-lg">£{earnings.monthlyEarnings}</div>
          <div className="flex items-center text-blue-200 text-xs mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +8.3%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 rounded-lg"
        >
          <div className="text-purple-100 text-xs mb-1">Tips</div>
          <div className="text-white font-bold text-lg">£{earnings.tips}</div>
          <div className="flex items-center text-purple-200 text-xs mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +15.2%
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 rounded-lg"
        >
          <div className="text-yellow-100 text-xs mb-1">Bonuses</div>
          <div className="text-white font-bold text-lg">£{earnings.bonuses}</div>
          <div className="flex items-center text-yellow-200 text-xs mt-1">
            <ArrowUpRight className="w-3 h-3 mr-1" />
            +25.0%
          </div>
        </motion.div>
      </div>

      {/* Earnings Chart */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-white font-semibold">Weekly Earnings Trend</h4>
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button 
              className={`px-3 py-1 text-xs rounded ${timeRange === 'week' ? 'bg-yellow-500 text-black' : 'text-gray-400'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-xs rounded ${timeRange === 'month' ? 'bg-yellow-500 text-black' : 'text-gray-400'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1 text-xs rounded ${timeRange === 'year' ? 'bg-yellow-500 text-black' : 'text-gray-400'}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earnings.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Bar dataKey="earnings" fill="#EAB308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payout Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-400 text-sm">Pending Payout</div>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-white font-bold text-xl">£{earnings.pendingPayout}</div>
          <div className="text-yellow-500 text-xs mt-1">Next payout: Friday</div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-400 text-sm">Last Payout</div>
            <CreditCard className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-white font-bold text-xl">£{earnings.lastPayout}</div>
          <div className="text-green-500 text-xs mt-1">
            Paid: {new Date(earnings.payoutDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h4 className="text-white font-semibold mb-4">Recent Transactions</h4>
        <div className="space-y-3">
          {earnings.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                {getTransactionIcon(transaction.type)}
                <div className="ml-3">
                  <div className="text-white text-sm font-medium">{transaction.description}</div>
                  <div className="text-gray-400 text-xs">
                    {new Date(transaction.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-green-400 font-semibold">
                +£{transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}