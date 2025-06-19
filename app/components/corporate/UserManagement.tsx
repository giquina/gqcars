'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
  Mail,
  Phone,
  Building2,
  Calendar,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  UserPlus,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react'

import {
  User,
  UserRole,
  UserStatus,
  UserInviteData,
  Permission,
  Department,
  CostCenter
} from '@/app/types/corporate'

// Sample data
const sampleUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+44 20 7123 4567',
    position: 'CEO',
    companyId: 'comp1',
    role: 'ADMIN',
    monthlyLimit: 25000,
    password: '',
    twoFactorEnabled: true,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date()
  },
  {
    id: '2',
    email: 'jane.smith@company.com',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+44 20 7123 4568',
    position: 'Head of Security',
    companyId: 'comp1',
    role: 'MANAGER',
    monthlyLimit: 15000,
    password: '',
    twoFactorEnabled: false,
    status: 'ACTIVE',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date()
  },
  {
    id: '3',
    email: 'bob.wilson@company.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    phone: '+44 20 7123 4569',
    position: 'Operations Manager',
    companyId: 'comp1',
    role: 'EMPLOYEE',
    monthlyLimit: 5000,
    password: '',
    twoFactorEnabled: false,
    status: 'PENDING',
    invitedAt: new Date('2024-06-10'),
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date()
  }
]

const sampleDepartments: Department[] = [
  { id: 'dept1', name: 'Executive Office', companyId: 'comp1', createdAt: new Date(), updatedAt: new Date() },
  { id: 'dept2', name: 'Sales', companyId: 'comp1', createdAt: new Date(), updatedAt: new Date() },
  { id: 'dept3', name: 'Legal', companyId: 'comp1', createdAt: new Date(), updatedAt: new Date() }
]

interface UserManagementProps {
  companyId: string
}

export default function UserManagement({ companyId }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(sampleUsers)
  const [departments, setDepartments] = useState<Department[]>(sampleDepartments)
  const [loading, setLoading] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState<string | null>(null)
  const [showBulkActions, setShowBulkActions] = useState(false)

  const [inviteFormData, setInviteFormData] = useState<UserInviteData>({
    email: '',
    firstName: '',
    lastName: '',
    role: 'EMPLOYEE',
    position: ''
  })

  useEffect(() => {
    loadUsers()
  }, [companyId])

  const loadUsers = async () => {
    setLoading(true)
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setUsers(sampleUsers)
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.position?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // API call to invite user
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add user to list with pending status
      const newUser: User = {
        id: Date.now().toString(),
        email: inviteFormData.email,
        firstName: inviteFormData.firstName,
        lastName: inviteFormData.lastName,
        position: inviteFormData.position,
        companyId,
        role: inviteFormData.role,
        monthlyLimit: inviteFormData.monthlyLimit,
        password: '',
        twoFactorEnabled: false,
        status: 'PENDING',
        invitedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      setUsers(prev => [...prev, newUser])
      setShowInviteModal(false)
      setInviteFormData({
        email: '',
        firstName: '',
        lastName: '',
        role: 'EMPLOYEE',
        position: ''
      })
      
      toast.success('User invitation sent successfully')
    } catch (error) {
      toast.error('Failed to send invitation')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleUserStatus = async (userId: string, currentStatus: UserStatus) => {
    try {
      const newStatus: UserStatus = currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      
      setUsers(prev => 
        prev.map(user => 
          user.id === userId 
            ? { ...user, status: newStatus, updatedAt: new Date() }
            : user
        )
      )
      
      toast.success(`User ${newStatus.toLowerCase()} successfully`)
    } catch (error) {
      toast.error('Failed to update user status')
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    try {
      setUsers(prev => prev.filter(user => user.id !== userId))
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error('Failed to delete user')
    }
  }

  const handleBulkAction = async (action: 'activate' | 'deactivate' | 'delete') => {
    if (selectedUsers.length === 0) {
      toast.error('Please select users first')
      return
    }

    if (action === 'delete' && !confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
      return
    }

    try {
      if (action === 'delete') {
        setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)))
        toast.success(`${selectedUsers.length} users deleted`)
      } else {
        const newStatus: UserStatus = action === 'activate' ? 'ACTIVE' : 'INACTIVE'
        setUsers(prev => 
          prev.map(user => 
            selectedUsers.includes(user.id) 
              ? { ...user, status: newStatus, updatedAt: new Date() }
              : user
          )
        )
        toast.success(`${selectedUsers.length} users ${action}d`)
      }
      
      setSelectedUsers([])
      setShowBulkActions(false)
    } catch (error) {
      toast.error(`Failed to ${action} users`)
    }
  }

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id))
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800'
      case 'MANAGER': return 'bg-blue-100 text-blue-800'
      case 'EMPLOYEE': return 'bg-green-100 text-green-800'
      case 'VIEWER': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'INACTIVE': return 'bg-gray-100 text-gray-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'SUSPENDED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'No limit'
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage corporate users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
          <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            <span>Import Users</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as UserRole | 'ALL')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="ALL">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="VIEWER">Viewer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as UserStatus | 'ALL')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {selectedUsers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedUsers.length} selected
                </span>
                <button
                  onClick={() => setShowBulkActions(!showBulkActions)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
                >
                  <Settings className="w-4 h-4" />
                  <span>Actions</span>
                </button>
              </div>
            )}
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {showBulkActions && selectedUsers.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Bulk Actions:
              </span>
              <button
                onClick={() => handleBulkAction('activate')}
                className="text-green-600 hover:text-green-700 text-sm"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="text-yellow-600 hover:text-yellow-700 text-sm"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="w-12 px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Monthly Limit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {user.firstName[0]}{user.lastName[0]}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </div>
                          {user.position && (
                            <div className="text-xs text-gray-400 dark:text-gray-500">
                              {user.position}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatCurrency(user.monthlyLimit)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowUserDetails(user.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user.id, user.status)}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          {user.status === 'ACTIVE' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Invite New User
              </h3>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteFormData.email}
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="user@company.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteFormData.firstName}
                    onChange={(e) => setInviteFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteFormData.lastName}
                    onChange={(e) => setInviteFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Position/Title
                </label>
                <input
                  type="text"
                  value={inviteFormData.position}
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Operations Manager"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={inviteFormData.role}
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, role: e.target.value as UserRole }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="MANAGER">Manager</option>
                  <option value="ADMIN">Admin</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Monthly Spending Limit (Optional)
                </label>
                <input
                  type="number"
                  min="0"
                  value={inviteFormData.monthlyLimit || ''}
                  onChange={(e) => setInviteFormData(prev => ({ 
                    ...prev, 
                    monthlyLimit: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  placeholder="5000"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}