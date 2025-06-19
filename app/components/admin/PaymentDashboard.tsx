'use client'

import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  FileText,
  Download,
  Filter,
  Search
} from 'lucide-react';

interface PaymentMetrics {
  totalRevenue: number;
  totalTransactions: number;
  successRate: number;
  averageTransactionValue: number;
  pendingPayments: number;
  failedPayments: number;
  refundRequests: number;
  disputeCount: number;
  revenueChange: number;
  transactionChange: number;
}

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  status: 'succeeded' | 'failed' | 'pending' | 'refunded' | 'disputed';
  serviceType: string;
  paymentMethod: string;
  createdAt: Date;
  bookingId: string;
  failureReason?: string;
}

interface RefundRequest {
  id: string;
  paymentId: string;
  customerName: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  notes?: string;
}

export default function PaymentDashboard() {
  const [metrics, setMetrics] = useState<PaymentMetrics | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'refunds' | 'analytics'>('overview');
  const [dateRange, setDateRange] = useState('7d');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API calls
  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    // Mock API calls - replace with actual endpoints
    try {
      // Load metrics
      const mockMetrics: PaymentMetrics = {
        totalRevenue: 47329.50,
        totalTransactions: 284,
        successRate: 99.3,
        averageTransactionValue: 166.65,
        pendingPayments: 3,
        failedPayments: 2,
        refundRequests: 1,
        disputeCount: 0,
        revenueChange: 12.5,
        transactionChange: 8.3
      };

      // Load recent transactions
      const mockTransactions: Transaction[] = [
        {
          id: 'pi_1234567890',
          customerId: 'cus_abc123',
          customerName: 'John Smith',
          amount: 125.00,
          status: 'succeeded',
          serviceType: 'VIP Service',
          paymentMethod: 'Visa •••• 4242',
          createdAt: new Date('2024-01-15T10:30:00Z'),
          bookingId: 'bk_987654321'
        },
        {
          id: 'pi_1234567891',
          customerId: 'cus_def456',
          customerName: 'Sarah Johnson',
          amount: 89.50,
          status: 'succeeded',
          serviceType: 'Standard',
          paymentMethod: 'Mastercard •••• 5555',
          createdAt: new Date('2024-01-15T09:15:00Z'),
          bookingId: 'bk_987654322'
        },
        {
          id: 'pi_1234567892',
          customerId: 'cus_ghi789',
          customerName: 'Mike Wilson',
          amount: 245.00,
          status: 'failed',
          serviceType: 'Close Protection',
          paymentMethod: 'Visa •••• 1234',
          createdAt: new Date('2024-01-15T08:45:00Z'),
          bookingId: 'bk_987654323',
          failureReason: 'Insufficient funds'
        }
      ];

      // Load refund requests
      const mockRefunds: RefundRequest[] = [
        {
          id: 'ref_123456',
          paymentId: 'pi_1234567890',
          customerName: 'Emma Davis',
          amount: 75.00,
          reason: 'Service cancellation',
          status: 'pending',
          requestedAt: new Date('2024-01-15T11:00:00Z'),
          notes: 'Customer had to cancel due to emergency'
        }
      ];

      setMetrics(mockMetrics);
      setTransactions(mockTransactions);
      setRefundRequests(mockRefunds);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefundAction = async (refundId: string, action: 'approve' | 'reject') => {
    try {
      // Mock API call
      console.log(`${action} refund ${refundId}`);
      
      // Update local state
      setRefundRequests(prev => 
        prev.map(refund => 
          refund.id === refundId 
            ? { ...refund, status: action === 'approve' ? 'approved' : 'rejected' }
            : refund
        )
      );
    } catch (error) {
      console.error(`Error ${action}ing refund:`, error);
    }
  };

  const exportData = (type: 'transactions' | 'refunds' | 'metrics') => {
    // Mock export functionality
    console.log(`Exporting ${type} data`);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSearch = transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-32 bg-gray-700 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Payment Dashboard</h1>
            <p className="text-gray-400 mt-2">Monitor payments, transactions, and financial metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-gq-gold outline-none"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 bg-gq-gold text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">£{metrics.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+{metrics.revenueChange}%</span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Transactions</p>
                  <p className="text-2xl font-bold text-white">{metrics.totalTransactions}</p>
                </div>
                <div className="bg-blue-900/20 p-3 rounded-lg">
                  <CreditCard className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400 text-sm">+{metrics.transactionChange}%</span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Success Rate</p>
                  <p className="text-2xl font-bold text-white">{metrics.successRate}%</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-400 text-sm">Target: 99.5%</span>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Issues</p>
                  <p className="text-2xl font-bold text-white">
                    {metrics.pendingPayments + metrics.refundRequests + metrics.disputeCount}
                  </p>
                </div>
                <div className="bg-orange-900/20 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-400 text-sm">Requires attention</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: DollarSign },
              { id: 'transactions', label: 'Transactions', icon: CreditCard },
              { id: 'refunds', label: 'Refunds', icon: RefreshCw },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-gq-gold text-gq-gold'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'transactions' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search transactions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gq-gold outline-none"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-gq-gold outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="succeeded">Succeeded</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
                  <button
                    onClick={() => exportData('transactions')}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{transaction.id}</div>
                          <div className="text-sm text-gray-400">{transaction.paymentMethod}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">{transaction.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">£{transaction.amount.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'succeeded' ? 'bg-green-900/20 text-green-400' :
                          transaction.status === 'failed' ? 'bg-red-900/20 text-red-400' :
                          transaction.status === 'pending' ? 'bg-yellow-900/20 text-yellow-400' :
                          'bg-blue-900/20 text-blue-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {transaction.createdAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'refunds' && (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Refund Requests</h2>
                <button
                  onClick={() => exportData('refunds')}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-700">
              {refundRequests.map((refund) => (
                <div key={refund.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-white">{refund.customerName}</h3>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          refund.status === 'pending' ? 'bg-yellow-900/20 text-yellow-400' :
                          refund.status === 'approved' ? 'bg-green-900/20 text-green-400' :
                          'bg-red-900/20 text-red-400'
                        }`}>
                          {refund.status}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gq-gold mb-2">£{refund.amount.toFixed(2)}</div>
                      <p className="text-gray-300 mb-2">Reason: {refund.reason}</p>
                      <p className="text-sm text-gray-400">
                        Requested: {refund.requestedAt.toLocaleDateString()}
                      </p>
                      {refund.notes && (
                        <p className="text-sm text-gray-400 mt-2">Notes: {refund.notes}</p>
                      )}
                    </div>
                    
                    {refund.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRefundAction(refund.id, 'approve')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRefundAction(refund.id, 'reject')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional tabs would go here */}
      </div>
    </div>
  );
}