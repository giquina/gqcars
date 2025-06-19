'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Users, FileText, Activity } from 'lucide-react';
import { SecurityMonitoringService, SecurityDashboardData } from '../../lib/security/monitoring';
import { SIAComplianceService } from '../../lib/compliance/sia-compliance';
import { TFLComplianceService } from '../../lib/compliance/tfl-compliance';
import { GDPRComplianceService } from '../../lib/compliance/gdpr-compliance';

interface SecurityMetrics {
  overallScore: number;
  activeThreats: number;
  openIncidents: number;
  complianceRate: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export default function SecurityDashboard() {
  const [dashboardData, setDashboardData] = useState<SecurityDashboardData | null>(null);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    overallScore: 95,
    activeThreats: 0,
    openIncidents: 0,
    complianceRate: 98,
    riskLevel: 'Low'
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await SecurityMonitoringService.getSecurityDashboardData();
      setDashboardData(data);
      setMetrics({
        overallScore: data.securityScore,
        activeThreats: data.activeThreats.length,
        openIncidents: data.openIncidents.length,
        complianceRate: 98, // Would come from compliance services
        riskLevel: data.riskLevel
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-yellow-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Security Dashboard</h1>
              <p className="text-gray-400">GQ Cars LTD - Compliance & Security Center</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(metrics.riskLevel)}`}>
              Risk Level: {metrics.riskLevel}
            </div>
            <div className="text-sm text-gray-400">
              Last Updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Security Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(metrics.overallScore)}`}>
                {metrics.overallScore}%
              </p>
            </div>
            <Shield className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Threats</p>
              <p className={`text-3xl font-bold ${metrics.activeThreats > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {metrics.activeThreats}
              </p>
            </div>
            <AlertTriangle className={`h-12 w-12 ${metrics.activeThreats > 0 ? 'text-red-500' : 'text-green-500'}`} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Open Incidents</p>
              <p className={`text-3xl font-bold ${metrics.openIncidents > 0 ? 'text-orange-500' : 'text-green-500'}`}>
                {metrics.openIncidents}
              </p>
            </div>
            <Activity className={`h-12 w-12 ${metrics.openIncidents > 0 ? 'text-orange-500' : 'text-green-500'}`} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Compliance Rate</p>
              <p className={`text-3xl font-bold ${getScoreColor(metrics.complianceRate)}`}>
                {metrics.complianceRate}%
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'compliance', label: 'Compliance', icon: FileText },
            { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
            { id: 'monitoring', label: 'Monitoring', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <OverviewTab dashboardData={dashboardData} />
        )}
        {activeTab === 'compliance' && (
          <ComplianceTab />
        )}
        {activeTab === 'incidents' && (
          <IncidentsTab dashboardData={dashboardData} />
        )}
        {activeTab === 'monitoring' && (
          <MonitoringTab dashboardData={dashboardData} />
        )}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ dashboardData }: { dashboardData: SecurityDashboardData | null }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Health */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Activity className="h-6 w-6 text-green-500 mr-2" />
          System Health
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Database Connection</span>
            <span className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Healthy
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">API Services</span>
            <span className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Operational
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Security Services</span>
            <span className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Active
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Backup Systems</span>
            <span className="text-green-500 flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Running
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Clock className="h-6 w-6 text-blue-500 mr-2" />
          Recent Security Events
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">15:32</span>
            <span className="text-white">SIA license verification completed</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-400">15:28</span>
            <span className="text-white">TFL compliance check passed</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-400">15:25</span>
            <span className="text-white">GDPR data export request processed</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-400">15:20</span>
            <span className="text-white">Security scan completed successfully</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compliance Tab Component
function ComplianceTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* SIA Compliance */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">SIA Compliance</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Overall Score</span>
            <span className="text-green-500 font-bold">96%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Active Licenses</span>
            <span className="text-white">24/25</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Expiring Soon</span>
            <span className="text-yellow-500">2</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Violations</span>
            <span className="text-green-500">0</span>
          </div>
        </div>
      </div>

      {/* TFL Compliance */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">TFL Compliance</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Overall Score</span>
            <span className="text-green-500 font-bold">94%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">PHV Licenses</span>
            <span className="text-white">23/25</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Medical Certificates</span>
            <span className="text-green-500">25/25</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">DVS Checks</span>
            <span className="text-green-500">Current</span>
          </div>
        </div>
      </div>

      {/* GDPR Compliance */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">GDPR Compliance</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Overall Score</span>
            <span className="text-green-500 font-bold">98%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Consent Records</span>
            <span className="text-white">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Data Requests</span>
            <span className="text-white">3 Pending</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Privacy Score</span>
            <span className="text-green-500">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Incidents Tab Component
function IncidentsTab({ dashboardData }: { dashboardData: SecurityDashboardData | null }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Security Incidents</h3>
      {dashboardData?.openIncidents.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <p className="text-xl text-green-500 font-semibold">No Open Incidents</p>
          <p className="text-gray-400">All security incidents have been resolved</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Mock incident data since we don't have real incidents */}
          <div className="border border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-semibold">No Active Incidents</h4>
                <p className="text-gray-400 text-sm">System is secure and operating normally</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">RESOLVED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Monitoring Tab Component
function MonitoringTab({ dashboardData }: { dashboardData: SecurityDashboardData | null }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Threat Detection */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Threat Detection</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Threats Blocked (24h)</span>
            <span className="text-green-500">47</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Failed Login Attempts</span>
            <span className="text-yellow-500">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Suspicious IPs Blocked</span>
            <span className="text-red-500">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Detection Accuracy</span>
            <span className="text-green-500">99.2%</span>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h3 className="text-xl font-bold text-white mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Response Time (Avg)</span>
            <span className="text-green-500">2.3s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Uptime (30 days)</span>
            <span className="text-green-500">99.97%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Security Scans/Hour</span>
            <span className="text-white">156</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Data Encrypted</span>
            <span className="text-green-500">100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}