'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Building2,
  Users,
  Shield,
  CheckCircle,
  Clock,
  AlertTriangle,
  Filter,
  Search,
  Eye,
  Mail,
  Printer,
  Settings
} from 'lucide-react'

import {
  ExpenseReport,
  ComplianceReport,
  Invoice,
  InvoiceStatus,
  DepartmentExpense,
  CostCenterExpense,
  ServiceExpense
} from '@/app/types/corporate'

// Sample data
const sampleExpenseReports: ExpenseReport[] = [
  {
    id: '1',
    companyId: 'comp1',
    period: '2024-06',
    totalAmount: 45780,
    currency: 'GBP',
    departments: [
      {
        departmentId: 'dept1',
        departmentName: 'Executive Office',
        amount: 28400,
        bookingCount: 15,
        budgetUsage: 85
      },
      {
        departmentId: 'dept2',
        departmentName: 'Sales',
        amount: 12380,
        bookingCount: 22,
        budgetUsage: 67
      },
      {
        departmentId: 'dept3',
        departmentName: 'Legal',
        amount: 5000,
        bookingCount: 8,
        budgetUsage: 45
      }
    ],
    costCenters: [
      {
        costCenterId: 'cc1',
        costCenterName: 'Executive Transport',
        costCenterCode: 'EXT-001',
        amount: 28400,
        bookingCount: 15,
        budgetUsage: 85
      }
    ],
    serviceTypes: [
      {
        serviceType: 'EXECUTIVE_PROTECTION',
        amount: 32500,
        bookingCount: 18,
        averageCost: 1805
      },
      {
        serviceType: 'CORPORATE_TRANSPORT',
        amount: 8280,
        bookingCount: 12,
        averageCost: 690
      },
      {
        serviceType: 'AIRPORT_TRANSFER',
        amount: 5000,
        bookingCount: 15,
        averageCost: 333
      }
    ],
    createdAt: new Date('2024-07-01')
  }
]

const sampleInvoices: Invoice[] = [
  {
    id: '1',
    number: 'INV-2024-001',
    companyId: 'comp1',
    issueDate: new Date('2024-06-30'),
    dueDate: new Date('2024-07-30'),
    period: '2024-06',
    subtotal: 38150,
    vatAmount: 7630,
    totalAmount: 45780,
    currency: 'GBP',
    status: 'SENT',
    vatNumber: 'GB123456789',
    referenceNumber: 'REF-001',
    createdAt: new Date('2024-06-30'),
    updatedAt: new Date()
  },
  {
    id: '2',
    number: 'INV-2024-002',
    companyId: 'comp1',
    issueDate: new Date('2024-05-31'),
    dueDate: new Date('2024-06-30'),
    period: '2024-05',
    subtotal: 32400,
    vatAmount: 6480,
    totalAmount: 38880,
    currency: 'GBP',
    status: 'PAID',
    paidAt: new Date('2024-06-15'),
    vatNumber: 'GB123456789',
    referenceNumber: 'REF-002',
    createdAt: new Date('2024-05-31'),
    updatedAt: new Date()
  }
]

const sampleComplianceReports: ComplianceReport[] = [
  {
    id: '1',
    companyId: 'comp1',
    type: 'GDPR',
    period: '2024-Q2',
    generatedBy: 'user1',
    data: {
      dataProcessingActivities: 45,
      consentRecords: 123,
      dataSubjectRequests: 3,
      breachReports: 0
    },
    status: 'FINALIZED',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date()
  },
  {
    id: '2',
    companyId: 'comp1',
    type: 'FINANCIAL',
    period: '2024-06',
    generatedBy: 'user1',
    data: {
      totalTransactions: 67,
      totalValue: 45780,
      averageTransactionValue: 683,
      complianceScore: 98
    },
    status: 'DRAFT',
    createdAt: new Date('2024-07-02'),
    updatedAt: new Date()
  }
]

interface CorporateReportingProps {
  companyId: string
}

export default function CorporateReporting({ companyId }: CorporateReportingProps) {
  const [activeTab, setActiveTab] = useState<'expenses' | 'invoices' | 'compliance' | 'analytics'>('expenses')
  const [expenseReports, setExpenseReports] = useState<ExpenseReport[]>(sampleExpenseReports)
  const [invoices, setInvoices] = useState<Invoice[]>(sampleInvoices)
  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>(sampleComplianceReports)
  const [loading, setLoading] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('2024-06')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'ALL'>('ALL')

  useEffect(() => {
    loadReportingData()
  }, [companyId])

  const loadReportingData = async () => {
    setLoading(true)
    try {
      // API calls would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setExpenseReports(sampleExpenseReports)
      setInvoices(sampleInvoices)
      setComplianceReports(sampleComplianceReports)
    } catch (error) {
      toast.error('Failed to load reporting data')
    } finally {
      setLoading(false)
    }
  }

  const generateInvoice = async (period: string) => {
    setLoading(true)
    try {
      // API call to generate invoice
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        number: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
        companyId,
        issueDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        period,
        subtotal: 38150,
        vatAmount: 7630,
        totalAmount: 45780,
        currency: 'GBP',
        status: 'DRAFT',
        vatNumber: 'GB123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      setInvoices(prev => [newInvoice, ...prev])
      toast.success('Invoice generated successfully')
    } catch (error) {
      toast.error('Failed to generate invoice')
    } finally {
      setLoading(false)
    }
  }

  const generateExpenseReport = async (period: string) => {
    setLoading(true)
    try {
      // API call to generate expense report
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Expense report generated successfully')
    } catch (error) {
      toast.error('Failed to generate expense report')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getStatusColor = (status: InvoiceStatus) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-800'
      case 'SENT': return 'bg-blue-100 text-blue-800'
      case 'OVERDUE': return 'bg-red-100 text-red-800'
      case 'CANCELLED': return 'bg-gray-100 text-gray-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.period.includes(searchTerm)
    
    const matchesStatus = statusFilter === 'ALL' || invoice.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Corporate Reporting
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate reports, manage invoices, and ensure compliance
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="2024-06">June 2024</option>
            <option value="2024-05">May 2024</option>
            <option value="2024-04">April 2024</option>
            <option value="2024-Q2">Q2 2024</option>
            <option value="2024">2024</option>
          </select>
          <button
            onClick={() => generateExpenseReport(selectedPeriod)}
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(45780)}
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+8%</span>
            <span className="text-gray-600 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Bookings</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">67</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">45 this month</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Cost</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(683)}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">Per booking</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compliance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">98%</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">Excellent</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('expenses')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Expense Reports
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'compliance'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Compliance Reports
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {/* Expense Reports Tab */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Monthly Expense Breakdown
            </h3>
            
            {expenseReports.map((report) => (
              <div key={report.id} className="space-y-6">
                {/* Department Breakdown */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Department Expenses
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.departments.map((dept) => (
                      <div key={dept.departmentId} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {dept.departmentName}
                          </h5>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            dept.budgetUsage > 80 
                              ? 'bg-red-100 text-red-800' 
                              : dept.budgetUsage > 60 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {dept.budgetUsage}% used
                          </span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(dept.amount)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Bookings:</span>
                            <span className="text-gray-900 dark:text-white">{dept.bookingCount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Type Breakdown */}
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                    Service Type Analysis
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Total Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Bookings
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Avg Cost
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            % of Total
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {report.serviceTypes.map((service) => (
                          <tr key={service.serviceType}>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                              {service.serviceType.replace('_', ' ')}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {formatCurrency(service.amount)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {service.bookingCount}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {formatCurrency(service.averageCost)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                              {Math.round((service.amount / report.totalAmount) * 100)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as InvoiceStatus | 'ALL')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="ALL">All Status</option>
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent</option>
                <option value="PAID">Paid</option>
                <option value="OVERDUE">Overdue</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <button
              onClick={() => generateInvoice(selectedPeriod)}
              disabled={loading}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Invoice</span>
            </button>
          </div>

          {/* Invoices Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {invoice.number}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {invoice.referenceNumber}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {invoice.period}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(invoice.totalAmount)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            +{formatCurrency(invoice.vatAmount)} VAT
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {invoice.dueDate.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-700">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-700">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Reports Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceReports.map((report) => (
              <div key={report.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {report.type} Report
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {report.period}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'FINALIZED' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {Object.entries(report.data).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {typeof value === 'number' && key.includes('Value') 
                          ? formatCurrency(value) 
                          : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Generated: {report.createdAt.toLocaleDateString()}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <Download className="w-4 h-4 inline mr-1" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Spending Analytics
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Trend Analysis
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Month-over-month growth</span>
                    <span className="text-sm font-medium text-green-600">+8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Average booking value</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(683)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Peak booking day</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Thursday</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Most used service</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Executive Protection</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                  Cost Optimization
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Potential savings</span>
                    <span className="text-sm font-medium text-green-600">{formatCurrency(2340)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Budget efficiency</span>
                    <span className="text-sm font-medium text-green-600">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Cost per employee</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(1526)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">ROI on security</span>
                    <span className="text-sm font-medium text-green-600">145%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}