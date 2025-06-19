'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Car, 
  CreditCard,
  CheckCircle,
  AlertTriangle,
  Clock,
  Upload,
  Download,
  Eye,
  Calendar
} from 'lucide-react';
import { format, differenceInDays, parseISO } from 'date-fns';

interface DocumentStatusProps {
  driverId: string;
}

interface Document {
  id: string;
  type: 'sia_license' | 'driving_license' | 'dbs_certificate' | 'insurance' | 'vehicle_inspection' | 'medical_certificate';
  name: string;
  status: 'valid' | 'expiring_soon' | 'expired' | 'pending' | 'rejected';
  uploadDate: string;
  expiryDate: string;
  fileUrl?: string;
  notes?: string;
  renewalRequired: boolean;
}

interface DocumentRequirement {
  type: string;
  name: string;
  description: string;
  icon: any;
  mandatory: boolean;
  renewalPeriod: number; // days before expiry to show warning
}

export default function DocumentStatus({ driverId }: DocumentStatusProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  const documentRequirements: DocumentRequirement[] = [
    {
      type: 'sia_license',
      name: 'SIA Close Protection License',
      description: 'Valid SIA license for close protection services',
      icon: Shield,
      mandatory: true,
      renewalPeriod: 90
    },
    {
      type: 'driving_license',
      name: 'UK Driving License',
      description: 'Full UK driving license (3+ years, max 6 points)',
      icon: Car,
      mandatory: true,
      renewalPeriod: 30
    },
    {
      type: 'dbs_certificate',
      name: 'Enhanced DBS Certificate',
      description: 'Enhanced DBS check (max 12 months old)',
      icon: FileText,
      mandatory: true,
      renewalPeriod: 60
    },
    {
      type: 'insurance',
      name: 'Commercial Insurance',
      description: 'Hire & Reward insurance (min £2M coverage)',
      icon: CreditCard,
      mandatory: true,
      renewalPeriod: 30
    },
    {
      type: 'vehicle_inspection',
      name: 'Vehicle Inspection',
      description: 'MOT and vehicle safety inspection',
      icon: Car,
      mandatory: true,
      renewalPeriod: 30
    },
    {
      type: 'medical_certificate',
      name: 'Medical Certificate',
      description: 'Driver medical certificate',
      icon: FileText,
      mandatory: false,
      renewalPeriod: 60
    }
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Simulate API call
        const documentsData: Document[] = [
          {
            id: '1',
            type: 'sia_license',
            name: 'SIA Close Protection License',
            status: 'valid',
            uploadDate: '2023-12-01',
            expiryDate: '2026-12-01',
            renewalRequired: false
          },
          {
            id: '2',
            type: 'driving_license',
            name: 'UK Driving License',
            status: 'valid',
            uploadDate: '2023-11-15',
            expiryDate: '2025-11-15',
            renewalRequired: false
          },
          {
            id: '3',
            type: 'dbs_certificate',
            name: 'Enhanced DBS Certificate',
            status: 'expiring_soon',
            uploadDate: '2023-02-15',
            expiryDate: '2024-02-15',
            renewalRequired: true,
            notes: 'Renewal application submitted'
          },
          {
            id: '4',
            type: 'insurance',
            name: 'Commercial Insurance',
            status: 'valid',
            uploadDate: '2023-10-01',
            expiryDate: '2024-10-01',
            renewalRequired: false
          },
          {
            id: '5',
            type: 'vehicle_inspection',
            name: 'Vehicle MOT & Inspection',
            status: 'pending',
            uploadDate: '2024-01-10',
            expiryDate: '2025-01-10',
            renewalRequired: false,
            notes: 'Under review by compliance team'
          }
        ];
        setDocuments(documentsData);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [driverId]);

  const getStatusInfo = (document: Document) => {
    const daysToExpiry = differenceInDays(parseISO(document.expiryDate), new Date());
    const requirement = documentRequirements.find(req => req.type === document.type);
    
    switch (document.status) {
      case 'valid':
        if (daysToExpiry <= (requirement?.renewalPeriod || 30)) {
          return {
            color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
            icon: <AlertTriangle className="w-4 h-4" />,
            text: `Expires in ${daysToExpiry} days`
          };
        }
        return {
          color: 'text-green-400 bg-green-400/10 border-green-400/30',
          icon: <CheckCircle className="w-4 h-4" />,
          text: 'Valid'
        };
      case 'expiring_soon':
        return {
          color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: `Expires in ${daysToExpiry} days`
        };
      case 'expired':
        return {
          color: 'text-red-400 bg-red-400/10 border-red-400/30',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: 'Expired'
        };
      case 'pending':
        return {
          color: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
          icon: <Clock className="w-4 h-4" />,
          text: 'Under Review'
        };
      case 'rejected':
        return {
          color: 'text-red-400 bg-red-400/10 border-red-400/30',
          icon: <AlertTriangle className="w-4 h-4" />,
          text: 'Rejected'
        };
      default:
        return {
          color: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
          icon: <Clock className="w-4 h-4" />,
          text: 'Unknown'
        };
    }
  };

  const handleFileUpload = async (docType: string, file: File) => {
    setUploadingDoc(docType);
    // Simulate file upload
    setTimeout(() => {
      setUploadingDoc(null);
      // Update document status
      setDocuments(prev => prev.map(doc => 
        doc.type === docType 
          ? { ...doc, status: 'pending', uploadDate: new Date().toISOString() }
          : doc
      ));
    }, 2000);
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const validDocs = documents.filter(doc => doc.status === 'valid').length;
  const totalDocs = documentRequirements.filter(req => req.mandatory).length;
  const complianceRate = (validDocs / totalDocs) * 100;

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white flex items-center">
          <FileText className="w-5 h-5 mr-2 text-yellow-500" />
          Document Status
        </h3>
        <div className="text-right">
          <div className="text-sm text-gray-400">Compliance Rate</div>
          <div className={`text-lg font-bold ${complianceRate === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
            {complianceRate.toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Compliance Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Document Compliance</span>
          <span className="text-white">{validDocs}/{totalDocs} Valid</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              complianceRate === 100 ? 'bg-green-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${complianceRate}%` }}
          ></div>
        </div>
      </div>

      {/* Document List */}
      <div className="space-y-4">
        {documentRequirements.map((requirement) => {
          const document = documents.find(doc => doc.type === requirement.type);
          const statusInfo = document ? getStatusInfo(document) : null;
          const IconComponent = requirement.icon;

          return (
            <motion.div
              key={requirement.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <IconComponent className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{requirement.name}</div>
                    <div className="text-gray-400 text-sm">{requirement.description}</div>
                    {requirement.mandatory && (
                      <div className="text-red-400 text-xs mt-1">Required</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {document && statusInfo && (
                    <div className={`px-3 py-1 rounded-full border text-xs flex items-center space-x-1 ${statusInfo.color}`}>
                      {statusInfo.icon}
                      <span>{statusInfo.text}</span>
                    </div>
                  )}

                  <div className="flex space-x-1">
                    {document && (
                      <>
                        <button className="p-2 text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-white">
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    <label className="p-2 text-yellow-500 hover:text-yellow-400 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(requirement.type, file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {document && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Uploaded: </span>
                      <span className="text-white">
                        {format(parseISO(document.uploadDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Expires: </span>
                      <span className="text-white">
                        {format(parseISO(document.expiryDate), 'MMM d, yyyy')}
                      </span>
                    </div>
                  </div>
                  {document.notes && (
                    <div className="mt-2 text-sm text-gray-400">
                      <span className="font-medium">Notes: </span>
                      {document.notes}
                    </div>
                  )}
                </div>
              )}

              {uploadingDoc === requirement.type && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex items-center space-x-2 text-sm text-blue-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                    <span>Uploading document...</span>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Action Items */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-center mb-2">
          <Calendar className="w-4 h-4 text-yellow-500 mr-2" />
          <span className="text-yellow-500 font-medium">Action Required</span>
        </div>
        <div className="text-sm text-yellow-200">
          {documents.filter(doc => doc.renewalRequired || doc.status === 'expired').length} documents need attention
        </div>
      </div>
    </div>
  );
}