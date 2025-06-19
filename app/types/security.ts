// Security and Compliance Type Definitions for GQ Cars LTD
// Created by: Compliance & Security Specialist
// Purpose: Define comprehensive security framework types

export interface SecurityFramework {
  dataEncryption: {
    inTransit: 'TLS 1.3 for all communications';
    atRest: 'AES-256 encryption for databases';
    keys: 'Hardware security modules for key management';
  };
  accessControl: {
    authentication: 'Multi-factor authentication required';
    authorization: 'Role-based access control';
    sessions: 'Secure session management with timeout';
  };
  monitoring: {
    logging: 'Comprehensive audit logs for all activities';
    alerting: 'Real-time security incident alerts';
    response: 'Automated incident response procedures';
  };
}

export interface SIACompliance {
  id: string;
  driverId: string;
  licenseNumber: string;
  licenseType: 'Close Protection' | 'Security Guard' | 'Door Supervisor';
  issueDate: Date;
  expiryDate: Date;
  status: 'Active' | 'Expired' | 'Suspended' | 'Revoked';
  verificationStatus: 'Verified' | 'Pending' | 'Failed';
  lastVerified: Date;
  nextVerificationDue: Date;
  complianceScore: number; // 0-100
  violations: SIAViolation[];
}

export interface TFLCompliance {
  id: string;
  driverId: string;
  vehicleId: string;
  phvLicenseNumber: string;
  driverLicenseNumber: string;
  issueDate: Date;
  expiryDate: Date;
  status: 'Active' | 'Expired' | 'Suspended' | 'Revoked';
  medicalCertificate: {
    issueDate: Date;
    expiryDate: Date;
    status: 'Valid' | 'Expired' | 'Required';
  };
  dvsCheck: {
    lastCheck: Date;
    status: 'Clear' | 'Pending' | 'Failed';
    nextCheckDue: Date;
  };
  complianceScore: number; // 0-100
  violations: TFLViolation[];
}

export interface GDPRCompliance {
  userId: string;
  dataSubject: 'Customer' | 'Driver' | 'Staff' | 'Partner';
  consentRecords: ConsentRecord[];
  dataProcessingActivities: DataProcessingActivity[];
  dataRetentionPolicy: DataRetentionPolicy;
  privacySettings: PrivacySettings;
  dataExportRequests: DataExportRequest[];
  deletionRequests: DataDeletionRequest[];
  complianceScore: number; // 0-100
}

export interface ConsentRecord {
  id: string;
  userId: string;
  consentType: 'Marketing' | 'Analytics' | 'Essential' | 'Location' | 'Communications';
  granted: boolean;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  version: string;
  method: 'Explicit' | 'Implicit' | 'Legitimate Interest';
}

export interface DataProcessingActivity {
  id: string;
  purpose: string;
  legalBasis: 'Consent' | 'Contract' | 'Legal Obligation' | 'Legitimate Interest';
  dataCategories: string[];
  recipients: string[];
  retentionPeriod: string;
  securityMeasures: string[];
  crossBorderTransfers: boolean;
  automatedDecisionMaking: boolean;
}

export interface SecurityIncident {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  type: 'Data Breach' | 'Unauthorized Access' | 'System Compromise' | 'Compliance Violation';
  status: 'Open' | 'Investigating' | 'Contained' | 'Resolved' | 'Closed';
  reportedBy: string;
  reportedAt: Date;
  detectedAt: Date;
  title: string;
  description: string;
  affectedSystems: string[];
  affectedUsers: string[];
  impactAssessment: ImpactAssessment;
  response: IncidentResponse;
  timeline: IncidentTimeline[];
  lessons: string[];
  preventiveMeasures: string[];
}

export interface ImpactAssessment {
  dataBreachRisk: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  financialImpact: number;
  reputationalImpact: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  operationalImpact: 'None' | 'Low' | 'Medium' | 'High' | 'Critical';
  regulatoryNotificationRequired: boolean;
  customersAffected: number;
  dataVolume: number;
}

export interface IncidentResponse {
  responseTeam: string[];
  containmentActions: string[];
  investigationFindings: string[];
  remediationActions: string[];
  communicationPlan: CommunicationPlan;
  recoveryPlan: RecoveryPlan;
}

export interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  userRole: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  outcome: 'Success' | 'Failure' | 'Partial';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  complianceCategory: 'SIA' | 'TFL' | 'GDPR' | 'PCI-DSS' | 'ISO27001';
}

export interface SecurityMetrics {
  period: 'Daily' | 'Weekly' | 'Monthly' | 'Quarterly';
  timestamp: Date;
  incidentCount: number;
  incidentsByType: Record<string, number>;
  incidentsBySeverity: Record<string, number>;
  meanTimeToDetection: number; // minutes
  meanTimeToResolution: number; // minutes
  complianceScores: {
    sia: number;
    tfl: number;
    gdpr: number;
    pciDss: number;
    iso27001: number;
    overall: number;
  };
  vulnerabilityCount: number;
  vulnerabilityTrends: VulnerabilityTrend[];
  securityTrainingCompletion: number; // percentage
  auditFindings: number;
}

export interface VulnerabilityTrend {
  date: Date;
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface ComplianceReport {
  id: string;
  generatedAt: Date;
  period: {
    start: Date;
    end: Date;
  };
  reportType: 'SIA' | 'TFL' | 'GDPR' | 'PCI-DSS' | 'ISO27001' | 'Comprehensive';
  executiveSummary: string;
  overallScore: number;
  keyFindings: string[];
  riskAssessment: RiskAssessment;
  recommendations: Recommendation[];
  actionItems: ActionItem[];
  nextReviewDate: Date;
  approvedBy: string;
  status: 'Draft' | 'Under Review' | 'Approved' | 'Published';
}

export interface RiskAssessment {
  overallRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  riskFactors: RiskFactor[];
  mitigationStrategies: string[];
  residualRisk: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface RiskFactor {
  category: string;
  description: string;
  likelihood: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  impact: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  riskScore: number;
  mitigationMeasures: string[];
}

export interface Recommendation {
  id: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  category: string;
  description: string;
  rationale: string;
  estimatedCost: number;
  estimatedTimeframe: string;
  expectedBenefit: string;
  assignedTo: string;
  status: 'Open' | 'In Progress' | 'Completed' | 'Deferred';
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  assignedTo: string;
  dueDate: Date;
  status: 'Open' | 'In Progress' | 'Completed' | 'Overdue';
  dependencies: string[];
  progress: number; // 0-100
  notes: string[];
}

// Additional supporting types
export interface SIAViolation {
  id: string;
  type: string;
  description: string;
  severity: 'Minor' | 'Major' | 'Critical';
  date: Date;
  resolved: boolean;
  resolutionDate?: Date;
}

export interface TFLViolation {
  id: string;
  type: string;
  description: string;
  severity: 'Minor' | 'Major' | 'Critical';
  date: Date;
  resolved: boolean;
  resolutionDate?: Date;
}

export interface DataRetentionPolicy {
  dataType: string;
  retentionPeriod: number; // days
  purgeMethod: 'Soft Delete' | 'Hard Delete' | 'Anonymization';
  lastReviewed: Date;
  nextReview: Date;
}

export interface PrivacySettings {
  marketingConsent: boolean;
  analyticsConsent: boolean;
  locationTracking: boolean;
  dataSharing: boolean;
  communicationPreferences: string[];
}

export interface DataExportRequest {
  id: string;
  userId: string;
  requestDate: Date;
  status: 'Pending' | 'Processing' | 'Completed' | 'Failed';
  completionDate?: Date;
  downloadUrl?: string;
  expiryDate?: Date;
}

export interface DataDeletionRequest {
  id: string;
  userId: string;
  requestDate: Date;
  status: 'Pending' | 'Approved' | 'Processing' | 'Completed' | 'Rejected';
  approvedBy?: string;
  approvalDate?: Date;
  completionDate?: Date;
  reason?: string;
}

export interface CommunicationPlan {
  internalNotifications: InternalNotification[];
  externalNotifications: ExternalNotification[];
  mediaResponse?: MediaResponse;
  customerCommunication?: CustomerCommunication;
}

export interface InternalNotification {
  recipient: string;
  method: 'Email' | 'SMS' | 'Phone' | 'Slack';
  message: string;
  sentAt?: Date;
  acknowledged?: boolean;
}

export interface ExternalNotification {
  authority: 'ICO' | 'TFL' | 'SIA' | 'Police' | 'Other';
  required: boolean;
  deadline: Date;
  submitted: boolean;
  submissionDate?: Date;
  reference?: string;
}

export interface MediaResponse {
  statement: string;
  spokesperson: string;
  approvedBy: string;
  publishedAt?: Date;
}

export interface CustomerCommunication {
  template: string;
  channels: ('Email' | 'SMS' | 'App Notification' | 'Website')[];
  sentTo: number;
  sentAt?: Date;
}

export interface RecoveryPlan {
  steps: RecoveryStep[];
  estimatedTimeframe: string;
  responsibleTeam: string[];
  checkpoints: Checkpoint[];
}

export interface RecoveryStep {
  id: string;
  description: string;
  responsible: string;
  estimatedDuration: number; // minutes
  dependencies: string[];
  status: 'Pending' | 'In Progress' | 'Completed' | 'Failed';
  startTime?: Date;
  completionTime?: Date;
}

export interface Checkpoint {
  id: string;
  description: string;
  criteria: string[];
  status: 'Pending' | 'Met' | 'Failed';
  checkedBy?: string;
  checkedAt?: Date;
}

export interface IncidentTimeline {
  timestamp: Date;
  event: string;
  details: string;
  actionBy: string;
  category: 'Detection' | 'Response' | 'Investigation' | 'Containment' | 'Recovery' | 'Communication';
}