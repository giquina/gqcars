'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Plus,
  Edit,
  Trash,
  Filter,
  Download,
  Settings,
  Users,
  Calendar,
  BarChart3,
  Target,
  Zap
} from 'lucide-react'

import {
  Budget,
  BudgetPeriod,
  BudgetStatus,
  Approval,
  ApprovalStatus,
  Booking,
  BudgetCreationData,
  BudgetAlert,
  Department,
  CostCenter
} from '@/app/types/corporate'

// Sample data
const sampleBudgets: Budget[] = [
  {
    id: '1',
    name: 'Executive Q2 Budget',
    companyId: 'comp1',
    departmentId: 'dept1',
    period: 'QUARTERLY',
    year: 2024,
    quarter: 2,
    allocated: 75000,
    spent: 52340,
    committed: 8500,
    available: 14160,
    alertAt75: true,
    alertAt90: true,
    alertAt100: true,
    status: 'ACTIVE',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Sales Monthly Budget',
    companyId: 'comp1',
    departmentId: 'dept2',
    period: 'MONTHLY',
    year: 2024,
    month: 6,
    allocated: 25000,
    spent: 18750,
    committed: 3200,
    available: 3050,
    alertAt75: true,
    alertAt90: true,
    alertAt100: true,
    status: 'ACTIVE',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date()
  }
]

const sampleApprovals: Approval[] = [
  {
    id: '1',
    bookingId: 'booking1',
    approverId: 'user1',
    status: 'PENDING',
    level: 1,
    required: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    bookingId: 'booking2',
    approverId: 'user2',
    status: 'APPROVED',
    level: 1,
    required: true,
    approvedAt: new Date(Date.now() - 86400000),
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date()
  }
]

const samplePendingBookings = [
  {
    id: 'booking1',
    service: 'Executive Protection',
    amount: 15000,
    user: 'John Doe',
    department: 'Executive Office',
    date: new Date('2024-06-25'),
    reason: 'High-value amount requires approval'
  },
  {
    id: 'booking2',
    service: 'Corporate Transport',
    amount: 2500,
    user: 'Jane Smith',
    department: 'Sales',
    date: new Date('2024-06-26'),
    reason: 'Department budget threshold exceeded'
  }
]

interface BudgetApprovalSystemProps {
  companyId: string
}

export default function BudgetApprovalSystem({ companyId }: BudgetApprovalSystemProps) {
  const [activeTab, setActiveTab] = useState<'budgets' | 'approvals' | 'settings'>('budgets')
  const [budgets, setBudgets] = useState<Budget[]>(sampleBudgets)
  const [approvals, setApprovals] = useState<Approval[]>(sampleApprovals)
  const [pendingBookings, setPendingBookings] = useState(samplePendingBookings)
  const [loading, setLoading] = useState(false)
  const [showCreateBudget, setShowCreateBudget] = useState(false)
  const [budgetFilter, setBudgetFilter] = useState<BudgetStatus | 'ALL'>('ALL')

  const [budgetFormData, setBudgetFormData] = useState<BudgetCreationData>({
    name: '',
    period: 'MONTHLY',
    year: new Date().getFullYear(),
    allocated: 0,
    alertAt75: true,
    alertAt90: true,
    alertAt100: true
  })

  useEffect(() => {
    loadBudgetData()
  }, [companyId])

  const loadBudgetData = async () => {
    setLoading(true)
    try {
      // API calls would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setBudgets(sampleBudgets)
      setApprovals(sampleApprovals)
    } catch (error) {
      toast.error('Failed to load budget data')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBudget = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newBudget: Budget = {
        id: Date.now().toString(),
        name: budgetFormData.name,
        companyId,
        departmentId: budgetFormData.departmentId,
        costCenterId: budgetFormData.costCenterId,
        period: budgetFormData.period,
        year: budgetFormData.year,
        month: budgetFormData.month,
        quarter: budgetFormData.quarter,
        allocated: budgetFormData.allocated,
        spent: 0,
        committed: 0,
        available: budgetFormData.allocated,
        alertAt75: budgetFormData.alertAt75,
        alertAt90: budgetFormData.alertAt90,
        alertAt100: budgetFormData.alertAt100,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      setBudgets(prev => [...prev, newBudget])
      setShowCreateBudget(false)
      setBudgetFormData({
        name: '',
        period: 'MONTHLY',
        year: new Date().getFullYear(),
        allocated: 0,
        alertAt75: true,
        alertAt90: true,
        alertAt100: true
      })
      
      toast.success('Budget created successfully')
    } catch (error) {
      toast.error('Failed to create budget')
    } finally {
      setLoading(false)
    }
  }

  const handleApprovalAction = async (approvalId: string, action: 'approve' | 'reject', comments?: string) => {
    try {
      const newStatus: ApprovalStatus = action === 'approve' ? 'APPROVED' : 'REJECTED'
      
      setApprovals(prev => 
        prev.map(approval => 
          approval.id === approvalId 
            ? { 
                ...approval, 
                status: newStatus, 
                comments,
                approvedAt: new Date(),
                updatedAt: new Date()
              }
            : approval
        )
      )

      // Remove from pending bookings if approved/rejected
      const approval = approvals.find(a => a.id === approvalId)
      if (approval) {
        setPendingBookings(prev => prev.filter(booking => booking.id !== approval.bookingId))
      }
      
      toast.success(`Booking ${action}d successfully`)
    } catch (error) {
      toast.error(`Failed to ${action} booking`)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const formatPercent = (value: number) => {
    return `${Math.round(value)}%`
  }

  const getBudgetUtilization = (budget: Budget) => {
    return (budget.spent / budget.allocated) * 100
  }

  const getBudgetStatus = (budget: Budget) => {
    const utilization = getBudgetUtilization(budget)
    if (utilization >= 100) return { color: 'red', text: 'Exceeded' }
    if (utilization >= 90) return { color: 'red', text: 'Critical' }
    if (utilization >= 75) return { color: 'yellow', text: 'Warning' }
    return { color: 'green', text: 'Healthy' }
  }

  const filteredBudgets = budgets.filter(budget => 
    budgetFilter === 'ALL' || budget.status === budgetFilter
  )

  const pendingApprovalsCount = approvals.filter(a => a.status === 'PENDING').length

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Budget & Approval Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Control spending, manage budgets, and handle approval workflows
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {pendingApprovalsCount > 0 && (
            <div className="flex items-center space-x-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{pendingApprovalsCount} pending approvals</span>
            </div>
          )}
          <button
            onClick={() => setShowCreateBudget(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            <span>Create Budget</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('budgets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'budgets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Budget Management
          </button>
          <button
            onClick={() => setActiveTab('approvals')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'approvals'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Approval Workflow
            {pendingApprovalsCount > 0 && (
              <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                {pendingApprovalsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Budget Management Tab */}
      {activeTab === 'budgets' && (
        <div className="space-y-6">
          {/* Budget Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Allocated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(budgets.reduce((sum, b) => sum + b.allocated, 0))}
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(budgets.reduce((sum, b) => sum + b.spent, 0))}
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(budgets.reduce((sum, b) => sum + b.available, 0))}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Budget Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value as BudgetStatus | 'ALL')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="ALL">All Budgets</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="EXCEEDED">Exceeded</option>
                <option value="FROZEN">Frozen</option>
              </select>
            </div>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>

          {/* Budget Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Budget Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Allocated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Available
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredBudgets.map((budget) => {
                    const utilization = getBudgetUtilization(budget)
                    const status = getBudgetStatus(budget)
                    
                    return (
                      <tr key={budget.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {budget.name}
                            </div>
                            {budget.departmentId && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Department Budget
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {budget.period} {budget.year}
                          {budget.month && ` - ${budget.month}`}
                          {budget.quarter && ` Q${budget.quarter}`}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {formatCurrency(budget.allocated)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {formatCurrency(budget.spent)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {formatCurrency(budget.available)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                              <div
                                className={`h-2 rounded-full ${
                                  status.color === 'green' 
                                    ? 'bg-green-500' 
                                    : status.color === 'yellow' 
                                    ? 'bg-yellow-500' 
                                    : 'bg-red-500'
                                }`}
                                style={{ width: `${Math.min(utilization, 100)}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {formatPercent(utilization)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            status.color === 'green' 
                              ? 'bg-green-100 text-green-800' 
                              : status.color === 'yellow' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Approval Workflow Tab */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          {/* Pending Approvals */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Pending Approvals ({pendingBookings.length})
            </h3>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {booking.service}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {booking.user} • {booking.department}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {booking.date.toLocaleDateString()} • {booking.reason}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(booking.amount)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => {
                          const approval = approvals.find(a => a.bookingId === booking.id)
                          if (approval) handleApprovalAction(approval.id, 'approve')
                        }}
                        className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          const approval = approvals.find(a => a.bookingId === booking.id)
                          if (approval) handleApprovalAction(approval.id, 'reject')
                        }}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {pendingBookings.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No pending approvals
                </div>
              )}
            </div>
          </div>

          {/* Recent Approvals */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Approval Activity
            </h3>
            <div className="space-y-3">
              {approvals.filter(a => a.status !== 'PENDING').map((approval) => (
                <div key={approval.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`p-1 rounded-full ${
                      approval.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {approval.status === 'APPROVED' ? 
                        <CheckCircle className="w-4 h-4" /> : 
                        <XCircle className="w-4 h-4" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Booking {approval.status.toLowerCase()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {approval.approvedAt?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    approval.status === 'APPROVED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {approval.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Approval Workflow Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Require Approval Above
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">£</span>
                  <input
                    type="number"
                    defaultValue={1000}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Booking Amount
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">£</span>
                  <input
                    type="number"
                    defaultValue={10000}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="autoApprove" defaultChecked />
                <label htmlFor="autoApprove" className="text-sm text-gray-700 dark:text-gray-300">
                  Auto-approve bookings within user limits
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Budget Alert Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">75% Budget Alert</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notify when budget reaches 75%</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">90% Budget Alert</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notify when budget reaches 90%</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Budget Exceeded Alert</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notify when budget is exceeded</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Budget Modal */}
      {showCreateBudget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Budget
              </h3>
              <button
                onClick={() => setShowCreateBudget(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateBudget} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Budget Name
                </label>
                <input
                  type="text"
                  required
                  value={budgetFormData.name}
                  onChange={(e) => setBudgetFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Q2 Executive Budget"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Period
                </label>
                <select
                  value={budgetFormData.period}
                  onChange={(e) => setBudgetFormData(prev => ({ ...prev, period: e.target.value as BudgetPeriod }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="MONTHLY">Monthly</option>
                  <option value="QUARTERLY">Quarterly</option>
                  <option value="YEARLY">Yearly</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    min="2024"
                    max="2030"
                    value={budgetFormData.year}
                    onChange={(e) => setBudgetFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {budgetFormData.period === 'MONTHLY' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Month
                    </label>
                    <select
                      value={budgetFormData.month || ''}
                      onChange={(e) => setBudgetFormData(prev => ({ ...prev, month: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Month</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {budgetFormData.period === 'QUARTERLY' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quarter
                    </label>
                    <select
                      value={budgetFormData.quarter || ''}
                      onChange={(e) => setBudgetFormData(prev => ({ ...prev, quarter: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Quarter</option>
                      <option value="1">Q1</option>
                      <option value="2">Q2</option>
                      <option value="3">Q3</option>
                      <option value="4">Q4</option>
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Allocated Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                  <input
                    type="number"
                    min="0"
                    required
                    value={budgetFormData.allocated}
                    onChange={(e) => setBudgetFormData(prev => ({ ...prev, allocated: parseFloat(e.target.value) }))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    placeholder="25000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Alert Settings</p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={budgetFormData.alertAt75}
                      onChange={(e) => setBudgetFormData(prev => ({ ...prev, alertAt75: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Alert at 75%</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={budgetFormData.alertAt90}
                      onChange={(e) => setBudgetFormData(prev => ({ ...prev, alertAt90: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Alert at 90%</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={budgetFormData.alertAt100}
                      onChange={(e) => setBudgetFormData(prev => ({ ...prev, alertAt100: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Alert when exceeded</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateBudget(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Budget'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}