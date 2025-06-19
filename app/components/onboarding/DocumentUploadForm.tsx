'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Shield, 
  Car, 
  CreditCard,
  CheckCircle,
  AlertTriangle,
  X,
  Eye,
  Download,
  Calendar,
  Clock
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';

interface DocumentUploadFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

interface DocumentRequirement {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: any;
  required: boolean;
  maxSize: number;
  acceptedTypes: string[];
  expiryRequired: boolean;
}

interface UploadedDocument {
  id: string;
  type: string;
  name: string;
  file: File;
  size: number;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  expiryDate?: string;
  preview?: string;
}

export default function DocumentUploadForm({ onComplete, initialData }: DocumentUploadFormProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(initialData?.documents || []);
  const [currentUpload, setCurrentUpload] = useState<string | null>(null);
  const [errors, setErrors] = useState<any>({});

  const documentRequirements: DocumentRequirement[] = [
    {
      id: 'sia_license',
      type: 'sia_license',
      name: 'SIA Close Protection License',
      description: 'Current SIA license certificate (PDF or image)',
      icon: Shield,
      required: true,
      maxSize: 5 * 1024 * 1024, // 5MB
      acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      expiryRequired: true
    },
    {
      id: 'driving_license',
      type: 'driving_license',
      name: 'UK Driving License',
      description: 'Full UK driving license (both sides)',
      icon: Car,
      required: true,
      maxSize: 5 * 1024 * 1024,
      acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      expiryRequired: true
    },
    {
      id: 'dbs_certificate',
      type: 'dbs_certificate',
      name: 'Enhanced DBS Certificate',
      description: 'Enhanced DBS check (must be less than 12 months old)',
      icon: FileText,
      required: true,
      maxSize: 5 * 1024 * 1024,
      acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      expiryRequired: false
    },
    {
      id: 'insurance',
      type: 'insurance',
      name: 'Commercial Insurance Certificate',
      description: 'Hire & Reward insurance (minimum £2M coverage)',
      icon: CreditCard,
      required: true,
      maxSize: 5 * 1024 * 1024,
      acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      expiryRequired: true
    },
    {
      id: 'vehicle_mot',
      type: 'vehicle_mot',
      name: 'Vehicle MOT Certificate',
      description: 'Current MOT certificate for your vehicle',
      icon: Car,
      required: true,
      maxSize: 5 * 1024 * 1024,
      acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      expiryRequired: true
    },
    {
      id: 'medical_certificate',
      type: 'medical_certificate',
      name: 'Medical Certificate',
      description: 'Driver medical certificate (if applicable)',
      icon: FileText,
      required: false,
      maxSize: 5 * 1024 * 1024,
      acceptedTypes: ['application/pdf', 'image/jpeg', 'image/png'],
      expiryRequired: true
    }
  ];

  const validateFile = (file: File, requirement: DocumentRequirement): string | null => {
    if (file.size > requirement.maxSize) {
      return `File size must be less than ${Math.round(requirement.maxSize / 1024 / 1024)}MB`;
    }
    
    if (!requirement.acceptedTypes.includes(file.type)) {
      return 'File type not supported. Please upload PDF, JPEG, or PNG files only.';
    }

    return null;
  };

  const simulateUpload = async (document: UploadedDocument): Promise<void> => {
    const uploadTime = 2000; // 2 seconds
    const intervals = 20;
    const increment = 100 / intervals;

    for (let i = 0; i <= intervals; i++) {
      await new Promise(resolve => setTimeout(resolve, uploadTime / intervals));
      
      setUploadedDocuments(prev => prev.map(doc => 
        doc.id === document.id 
          ? { ...doc, uploadProgress: Math.min(i * increment, 100) }
          : doc
      ));
    }

    setUploadedDocuments(prev => prev.map(doc => 
      doc.id === document.id 
        ? { ...doc, status: 'completed' }
        : doc
    ));
    setCurrentUpload(null);
  };

  const handleFileUpload = async (acceptedFiles: File[], requirement: DocumentRequirement) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const validationError = validateFile(file, requirement);
    if (validationError) {
      setErrors(prev => ({ ...prev, [requirement.id]: validationError }));
      return;
    }

    // Clear any previous errors
    setErrors(prev => ({ ...prev, [requirement.id]: null }));

    // Remove existing document of the same type
    setUploadedDocuments(prev => prev.filter(doc => doc.type !== requirement.type));

    const newDocument: UploadedDocument = {
      id: `${requirement.type}_${Date.now()}`,
      type: requirement.type,
      name: file.name,
      file,
      size: file.size,
      uploadProgress: 0,
      status: 'uploading'
    };

    setUploadedDocuments(prev => [...prev, newDocument]);
    setCurrentUpload(newDocument.id);

    // Simulate file upload
    await simulateUpload(newDocument);
  };

  const removeDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const updateExpiryDate = (documentId: string, expiryDate: string) => {
    setUploadedDocuments(prev => prev.map(doc => 
      doc.id === documentId ? { ...doc, expiryDate } : doc
    ));
  };

  const getDocumentStatus = (requirement: DocumentRequirement) => {
    const uploaded = uploadedDocuments.find(doc => doc.type === requirement.type);
    if (!uploaded) return null;
    return uploaded;
  };

  const isFormValid = () => {
    const requiredDocs = documentRequirements.filter(req => req.required);
    const uploadedTypes = uploadedDocuments
      .filter(doc => doc.status === 'completed')
      .map(doc => doc.type);
    
    return requiredDocs.every(req => uploadedTypes.includes(req.type)) &&
           uploadedDocuments.every(doc => 
             !documentRequirements.find(req => req.id === doc.type)?.expiryRequired || 
             doc.expiryDate
           );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onComplete({
        documents: uploadedDocuments,
        completedAt: new Date().toISOString()
      });
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const completedDocs = uploadedDocuments.filter(doc => doc.status === 'completed').length;
  const requiredDocs = documentRequirements.filter(req => req.required).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Progress Summary */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Document Upload Progress</h3>
          <span className="text-yellow-500 font-medium">{completedDocs}/{requiredDocs} Required</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(completedDocs / requiredDocs) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Upload all required documents to continue. Optional documents can be added later.
        </p>
      </div>

      {/* Document Requirements */}
      <div className="space-y-6">
        {documentRequirements.map((requirement) => {
          const uploadedDoc = getDocumentStatus(requirement);
          const IconComponent = requirement.icon;

          return (
            <DocumentUploadCard
              key={requirement.id}
              requirement={requirement}
              uploadedDoc={uploadedDoc}
              onFileUpload={(files) => handleFileUpload(files, requirement)}
              onRemove={() => uploadedDoc && removeDocument(uploadedDoc.id)}
              onExpiryUpdate={(date) => uploadedDoc && updateExpiryDate(uploadedDoc.id, date)}
              error={errors[requirement.id]}
              isUploading={currentUpload === uploadedDoc?.id}
            />
          );
        })}
      </div>

      {/* Requirements Checklist */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h4 className="text-blue-400 font-medium mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Document Requirements Checklist
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-blue-200 text-sm">Files must be PDF, JPEG, or PNG format</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-blue-200 text-sm">Maximum file size: 5MB per document</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-blue-200 text-sm">Documents must be clearly readable</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-blue-200 text-sm">All required documents must be current</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid()}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isFormValid()
            ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isFormValid() ? 'Continue to Vehicle Inspection' : 'Upload Required Documents to Continue'}
      </button>
    </motion.div>
  );
}

// Document Upload Card Component
interface DocumentUploadCardProps {
  requirement: DocumentRequirement;
  uploadedDoc: UploadedDocument | null;
  onFileUpload: (files: File[]) => void;
  onRemove: () => void;
  onExpiryUpdate: (date: string) => void;
  error: string | null;
  isUploading: boolean;
}

function DocumentUploadCard({
  requirement,
  uploadedDoc,
  onFileUpload,
  onRemove,
  onExpiryUpdate,
  error,
  isUploading
}: DocumentUploadCardProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileUpload,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    disabled: !!uploadedDoc && uploadedDoc.status === 'completed'
  });

  const IconComponent = requirement.icon;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            <IconComponent className="w-5 h-5 text-yellow-500" />
          </div>
          <div>
            <h4 className="text-white font-medium">{requirement.name}</h4>
            <p className="text-gray-400 text-sm">{requirement.description}</p>
            <div className="flex items-center space-x-4 mt-1">
              {requirement.required && (
                <span className="text-red-400 text-xs font-medium">Required</span>
              )}
              <span className="text-gray-500 text-xs">
                Max {Math.round(requirement.maxSize / 1024 / 1024)}MB
              </span>
            </div>
          </div>
        </div>
      </div>

      {!uploadedDoc ? (
        // Upload Area
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-yellow-500 bg-yellow-500/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-white text-sm mb-1">
            {isDragActive ? 'Drop the file here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-gray-400 text-xs">PDF, JPEG, or PNG files only</p>
        </div>
      ) : (
        // Uploaded Document Display
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white text-sm font-medium">{uploadedDoc.name}</div>
                <div className="text-gray-400 text-xs">
                  {formatFileSize(uploadedDoc.size)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {uploadedDoc.status === 'completed' && (
                <>
                  <button className="p-1 text-gray-400 hover:text-white">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </button>
                </>
              )}
              <button onClick={onRemove} className="p-1 text-red-400 hover:text-red-300">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadedDoc.status === 'uploading' && (
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Uploading...</span>
                <span className="text-white">{Math.round(uploadedDoc.uploadProgress)}%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadedDoc.uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Expiry Date Input */}
          {requirement.expiryRequired && uploadedDoc.status === 'completed' && (
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Expiry Date *
              </label>
              <input
                type="date"
                value={uploadedDoc.expiryDate || ''}
                onChange={(e) => onExpiryUpdate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}