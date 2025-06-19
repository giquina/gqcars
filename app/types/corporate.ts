// Corporate Types and Interfaces for GQ Cars LTD Enterprise System

export type CompanySize = 'STARTUP' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE'
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE' | 'VIEWER'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED'
export type ServiceType = 
  | 'CLOSE_PROTECTION' 
  | 'PRIVATE_HIRE' 
  | 'CORPORATE_TRANSPORT' 
  | 'AIRPORT_TRANSFER' 
  | 'WEDDING_SECURITY' 
  | 'VIP_SERVICE' 
  | 'EXECUTIVE_PROTECTION'

export type BookingStatus = 
  | 'PENDING' 
  | 'APPROVED' 
  | 'REJECTED' 
  | 'CONFIRMED' 
  | 'IN_PROGRESS' 
  | 'COMPLETED' 
  | 'CANCELLED'

export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type SecurityLevel = 'STANDARD' | 'ENHANCED' | 'PREMIUM' | 'EXECUTIVE'
export type BudgetPeriod = 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
export type BudgetStatus = 'ACTIVE' | 'INACTIVE' | 'EXCEEDED' | 'FROZEN'
export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'

export interface Company {
  id: string
  name: string
  domain: string
  industry?: string
  size: CompanySize
  address: string
  city: string
  country: string
  phone: string
  website?: string
  vatNumber?: string
  settings?: CompanySettings
  users?: User[]
  departments?: Department[]
  costCenters?: CostCenter[]
  bookings?: Booking[]
  invoices?: Invoice[]
  policies?: Policy[]
  budgets?: Budget[]
  createdAt: Date
  updatedAt: Date
}

export interface CompanySettings {
  id: string
  companyId: string
  requireApprovalAbove: number
  maxBookingAmount: number
  monthlyBudgetLimit?: number
  quarterlyBudgetLimit?: number
  yearlyBudgetLimit?: number
  require2FA: boolean
  requireVPN: boolean
  allowedDomains: string[]
  enableSOXCompliance: boolean
  enableGDPRCompliance: boolean
  dataRetentionMonths: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  position?: string
  avatar?: string
  companyId: string
  company?: Company
  departmentId?: string
  department?: Department
  costCenterId?: string
  costCenter?: CostCenter
  role: UserRole
  permissions?: Permission[]
  monthlyLimit?: number
  quarterlyLimit?: number
  yearlyLimit?: number
  password: string
  emailVerified?: Date
  lastLogin?: Date
  twoFactorEnabled: boolean
  twoFactorSecret?: string
  bookings?: Booking[]
  approvals?: Approval[]
  activities?: UserActivity[]
  status: UserStatus
  invitedAt?: Date
  invitedBy?: string
  createdAt: Date
  updatedAt: Date
}

export interface Department {
  id: string
  name: string
  description?: string
  companyId: string
  company?: Company
  managerId?: string
  monthlyBudget?: number
  users?: User[]
  costCenters?: CostCenter[]
  bookings?: Booking[]
  budgets?: Budget[]
  createdAt: Date
  updatedAt: Date
}

export interface CostCenter {
  id: string
  name: string
  code: string
  description?: string
  companyId: string
  company?: Company
  departmentId?: string
  department?: Department
  monthlyBudget?: number
  users?: User[]
  bookings?: Booking[]
  budgets?: Budget[]
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  companyId: string
  company?: Company
  userId: string
  user?: User
  departmentId?: string
  department?: Department
  costCenterId?: string
  costCenter?: CostCenter
  serviceType: ServiceType
  date: Date
  time: string
  duration: number
  location: string
  destination?: string
  requirements?: string
  amount: number
  currency: string
  vatAmount?: number
  totalAmount: number
  status: BookingStatus
  approvalRequired: boolean
  riskLevel?: RiskLevel
  securityLevel?: SecurityLevel
  threatAssessment?: string
  approvals?: Approval[]
  invoiceItems?: InvoiceItem[]
  createdAt: Date
  updatedAt: Date
}

export interface Approval {
  id: string
  bookingId: string
  booking?: Booking
  approverId: string
  approver?: User
  status: ApprovalStatus
  comments?: string
  approvedAt?: Date
  level: number
  required: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Budget {
  id: string
  name: string
  companyId: string
  company?: Company
  departmentId?: string
  department?: Department
  costCenterId?: string
  costCenter?: CostCenter
  period: BudgetPeriod
  year: number
  month?: number
  quarter?: number
  allocated: number
  spent: number
  committed: number
  available: number
  alertAt75: boolean
  alertAt90: boolean
  alertAt100: boolean
  status: BudgetStatus
  createdAt: Date
  updatedAt: Date
}

export interface Invoice {
  id: string
  number: string
  companyId: string
  company?: Company
  issueDate: Date
  dueDate: Date
  period: string
  subtotal: number
  vatAmount: number
  totalAmount: number
  currency: string
  status: InvoiceStatus
  paidAt?: Date
  vatNumber?: string
  referenceNumber?: string
  items?: InvoiceItem[]
  createdAt: Date
  updatedAt: Date
}

export interface InvoiceItem {
  id: string
  invoiceId: string
  invoice?: Invoice
  bookingId: string
  booking?: Booking
  description: string
  quantity: number
  unitPrice: number
  totalPrice: number
  vatRate: number
  vatAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface Policy {
  id: string
  name: string
  description: string
  companyId: string
  company?: Company
  rules?: PolicyRule[]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PolicyRule {
  id: string
  policyId: string
  policy?: Policy
  type: 'AMOUNT_LIMIT' | 'SERVICE_RESTRICTION' | 'TIME_RESTRICTION' | 'LOCATION_RESTRICTION' | 'APPROVAL_REQUIRED'
  field: string
  operator: string
  value: string
  action: 'APPROVE' | 'REJECT' | 'REQUIRE_APPROVAL'
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  id: string
  userId: string
  user?: User
  resource: 'BOOKINGS' | 'USERS' | 'DEPARTMENTS' | 'COST_CENTERS' | 'BUDGETS' | 'INVOICES' | 'POLICIES' | 'REPORTS' | 'SETTINGS'
  action: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'EXPORT'
  granted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserActivity {
  id: string
  userId: string
  user?: User
  action: 'LOGIN' | 'LOGOUT' | 'BOOKING_CREATED' | 'BOOKING_APPROVED' | 'BOOKING_REJECTED' | 'USER_INVITED' | 'BUDGET_EXCEEDED' | 'POLICY_VIOLATED' | 'INVOICE_GENERATED' | 'SETTINGS_CHANGED'
  resource?: string
  resourceType?: string
  details?: any
  ipAddress?: string
  userAgent?: string
  createdAt: Date
}

// Form interfaces for corporate registration
export interface CorporateRegistrationData {
  // Company details
  companyName: string
  domain: string
  industry: string
  companySize: CompanySize
  address: string
  city: string
  country: string
  phone: string
  website?: string
  vatNumber?: string
  
  // Admin user details
  firstName: string
  lastName: string
  email: string
  password: string
  position: string
  
  // Initial settings
  monthlyBudgetLimit?: number
  requireApprovalAbove: number
  maxBookingAmount: number
}

export interface UserInviteData {
  email: string
  firstName: string
  lastName: string
  role: UserRole
  departmentId?: string
  costCenterId?: string
  monthlyLimit?: number
  position?: string
}

export interface DepartmentCreationData {
  name: string
  description?: string
  managerId?: string
  monthlyBudget?: number
}

export interface CostCenterCreationData {
  name: string
  code: string
  description?: string
  departmentId?: string
  monthlyBudget?: number
}

export interface BudgetCreationData {
  name: string
  period: BudgetPeriod
  year: number
  month?: number
  quarter?: number
  allocated: number
  departmentId?: string
  costCenterId?: string
  alertAt75: boolean
  alertAt90: boolean
  alertAt100: boolean
}

export interface PolicyCreationData {
  name: string
  description: string
  rules: PolicyRuleData[]
}

export interface PolicyRuleData {
  type: 'AMOUNT_LIMIT' | 'SERVICE_RESTRICTION' | 'TIME_RESTRICTION' | 'LOCATION_RESTRICTION' | 'APPROVAL_REQUIRED'
  field: string
  operator: string
  value: string
  action: 'APPROVE' | 'REJECT' | 'REQUIRE_APPROVAL'
}

// Executive Protection specific interfaces
export interface ExecutiveProtectionRequest {
  principalName: string
  principalTitle: string
  riskLevel: RiskLevel
  securityLevel: SecurityLevel
  threatAssessment: string
  venues: ProtectionVenue[]
  personnel: ProtectionPersonnel[]
  duration: number
  startDate: Date
  endDate: Date
  specialRequirements?: string
}

export interface ProtectionVenue {
  name: string
  address: string
  type: 'HOTEL' | 'OFFICE' | 'RESTAURANT' | 'EVENT_VENUE' | 'AIRPORT' | 'PRIVATE_RESIDENCE' | 'OTHER'
  riskAssessment: string
  arrivalTime?: Date
  departureTime?: Date
}

export interface ProtectionPersonnel {
  type: 'CLOSE_PROTECTION_OFFICER' | 'DRIVER' | 'ADVANCE_TEAM' | 'SECURITY_COORDINATOR'
  count: number
  qualifications: string[]
  specialization?: string
}

// Compliance and Reporting interfaces
export interface ComplianceReport {
  id: string
  companyId: string
  type: 'SOX' | 'GDPR' | 'FINANCIAL' | 'SECURITY'
  period: string
  generatedBy: string
  data: any
  status: 'DRAFT' | 'FINALIZED' | 'SUBMITTED'
  createdAt: Date
  updatedAt: Date
}

export interface ExpenseReport {
  id: string
  companyId: string
  period: string
  totalAmount: number
  currency: string
  departments: DepartmentExpense[]
  costCenters: CostCenterExpense[]
  serviceTypes: ServiceExpense[]
  createdAt: Date
}

export interface DepartmentExpense {
  departmentId: string
  departmentName: string
  amount: number
  bookingCount: number
  budgetUsage: number
}

export interface CostCenterExpense {
  costCenterId: string
  costCenterName: string
  costCenterCode: string
  amount: number
  bookingCount: number
  budgetUsage: number
}

export interface ServiceExpense {
  serviceType: ServiceType
  amount: number
  bookingCount: number
  averageCost: number
}

// Dashboard and Analytics interfaces
export interface CorporateDashboardData {
  totalSpend: number
  monthlySpend: number
  budgetUtilization: number
  pendingApprovals: number
  activeBookings: number
  recentActivity: UserActivity[]
  topDepartments: DepartmentExpense[]
  budgetAlerts: BudgetAlert[]
  securityMetrics: SecurityMetrics
}

export interface BudgetAlert {
  id: string
  type: 'APPROACHING_LIMIT' | 'LIMIT_EXCEEDED' | 'BUDGET_DEPLETED'
  level: 75 | 90 | 100
  message: string
  budgetId: string
  budgetName: string
  amount: number
  limit: number
  percentage: number
  createdAt: Date
}

export interface SecurityMetrics {
  highRiskBookings: number
  executiveProtectionHours: number
  threatAssessments: number
  securityIncidents: number
  complianceScore: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Audit and Activity types
export interface AuditLog {
  id: string
  userId: string
  action: string
  resource: string
  resourceId: string
  oldValues?: any
  newValues?: any
  ipAddress: string
  userAgent: string
  timestamp: Date
}

export interface ActivitySummary {
  totalLogins: number
  totalBookings: number
  totalApprovals: number
  totalUsers: number
  averageBookingValue: number
  securityIncidents: number
  policyViolations: number
}

// Integration types for external systems
export interface ExpenseSystemIntegration {
  provider: 'SAP' | 'ORACLE' | 'WORKDAY' | 'QUICKBOOKS' | 'XERO'
  apiKey: string
  endpoint: string
  mappings: FieldMapping[]
  active: boolean
  lastSync?: Date
}

export interface FieldMapping {
  localField: string
  externalField: string
  dataType: 'string' | 'number' | 'date' | 'boolean'
  required: boolean
}

// Notification types
export interface NotificationPreferences {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  budgetAlerts: boolean
  approvalRequests: boolean
  bookingUpdates: boolean
  securityAlerts: boolean
  complianceReports: boolean
}

export interface NotificationTemplate {
  id: string
  type: 'EMAIL' | 'SMS' | 'PUSH'
  trigger: string
  subject: string
  body: string
  variables: string[]
  active: boolean
}