'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Search,
  UserCheck,
  Database,
  Lock,
  AlertCircle
} from 'lucide-react';

interface BackgroundCheckFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

interface PersonalInfo {
  previousNames: string[];
  previousAddresses: string[];
  bankruptcyHistory: boolean;
  bankruptcyDetails?: string;
  criminalConvictions: boolean;
  convictionDetails?: string;
  employmentGaps: boolean;
  gapDetails?: string;
  referencesProvided: boolean;
}

interface DBSCheck {
  applicationNumber: string;
  certificateNumber: string;
  issueDate: string;
  level: 'basic' | 'standard' | 'enhanced';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  disclosures: string[];
  verificationStatus: 'pending' | 'verified' | 'failed';
}

export default function BackgroundCheckForm({ onComplete, initialData }: BackgroundCheckFormProps) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    initialData?.personalInfo || {
      previousNames: [''],
      previousAddresses: [''],
      bankruptcyHistory: false,
      criminalConvictions: false,
      employmentGaps: false,
      referencesProvided: false
    }
  );

  const [dbsCheck, setDbsCheck] = useState<DBSCheck>(
    initialData?.dbsCheck || {
      applicationNumber: '',
      certificateNumber: '',
      issueDate: '',
      level: 'enhanced',
      status: 'pending',
      disclosures: [],
      verificationStatus: 'pending'
    }
  );

  const [isVerifying, setIsVerifying] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [verificationResults, setVerificationResults] = useState<any>(null);

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: any) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const addPreviousName = () => {
    setPersonalInfo(prev => ({
      ...prev,
      previousNames: [...prev.previousNames, '']
    }));
  };

  const removePreviousName = (index: number) => {
    setPersonalInfo(prev => ({
      ...prev,
      previousNames: prev.previousNames.filter((_, i) => i !== index)
    }));
  };

  const updatePreviousName = (index: number, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      previousNames: prev.previousNames.map((name, i) => i === index ? value : name)
    }));
  };

  const addPreviousAddress = () => {
    setPersonalInfo(prev => ({
      ...prev,
      previousAddresses: [...prev.previousAddresses, '']
    }));
  };

  const removePreviousAddress = (index: number) => {
    setPersonalInfo(prev => ({
      ...prev,
      previousAddresses: prev.previousAddresses.filter((_, i) => i !== index)
    }));
  };

  const updatePreviousAddress = (index: number, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      previousAddresses: prev.previousAddresses.map((address, i) => i === index ? value : address)
    }));
  };

  const handleDbsVerification = async () => {
    if (!dbsCheck.certificateNumber || !dbsCheck.issueDate) {
      setErrors(prev => ({ ...prev, dbs: 'Certificate number and issue date are required' }));
      return;
    }

    setIsVerifying(true);
    setErrors(prev => ({ ...prev, dbs: null }));

    try {
      // Simulate DBS verification API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock verification results
      const mockResults = {
        certificateValid: true,
        holderName: 'John Smith',
        certificateType: 'Enhanced',
        issueDate: dbsCheck.issueDate,
        disclosures: Math.random() > 0.8 ? ['Minor traffic violation in 2019'] : [],
        verificationStatus: 'verified',
        riskLevel: 'low'
      };

      setVerificationResults(mockResults);
      setDbsCheck(prev => ({
        ...prev,
        status: 'completed',
        verificationStatus: 'verified',
        disclosures: mockResults.disclosures
      }));

    } catch (error) {
      setErrors(prev => ({ ...prev, dbs: 'Verification failed. Please check your details.' }));
      setDbsCheck(prev => ({
        ...prev,
        status: 'failed',
        verificationStatus: 'failed'
      }));
    } finally {
      setIsVerifying(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: any = {};

    // Validate DBS certificate
    if (!dbsCheck.certificateNumber) {
      newErrors.certificateNumber = 'DBS certificate number is required';
    }
    if (!dbsCheck.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    }
    if (dbsCheck.verificationStatus !== 'verified') {
      newErrors.verification = 'DBS certificate must be verified';
    }

    // Validate personal info
    if (personalInfo.criminalConvictions && !personalInfo.convictionDetails) {
      newErrors.convictionDetails = 'Please provide details of criminal convictions';
    }
    if (personalInfo.bankruptcyHistory && !personalInfo.bankruptcyDetails) {
      newErrors.bankruptcyDetails = 'Please provide details of bankruptcy history';
    }
    if (personalInfo.employmentGaps && !personalInfo.gapDetails) {
      newErrors.gapDetails = 'Please provide details of employment gaps';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete({
        personalInfo,
        dbsCheck,
        verificationResults,
        completedAt: new Date().toISOString()
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <h3 className="text-blue-400 font-semibold mb-2 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Background Check & Verification
        </h3>
        <p className="text-blue-200 text-sm">
          Complete background verification is mandatory for all security personnel. 
          All information will be handled confidentially and in accordance with GDPR.
        </p>
      </div>

      {/* DBS Certificate Verification */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <Database className="w-5 h-5 mr-2 text-yellow-500" />
          DBS Certificate Verification
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              DBS Certificate Number *
            </label>
            <input
              type="text"
              value={dbsCheck.certificateNumber}
              onChange={(e) => setDbsCheck(prev => ({ ...prev, certificateNumber: e.target.value }))}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.certificateNumber ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="Enter 12-digit certificate number"
              maxLength={12}
            />
            {errors.certificateNumber && (
              <p className="text-red-400 text-xs mt-1">{errors.certificateNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Issue Date *
            </label>
            <input
              type="date"
              value={dbsCheck.issueDate}
              onChange={(e) => setDbsCheck(prev => ({ ...prev, issueDate: e.target.value }))}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.issueDate ? 'border-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.issueDate && (
              <p className="text-red-400 text-xs mt-1">{errors.issueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Check Level
            </label>
            <select
              value={dbsCheck.level}
              onChange={(e) => setDbsCheck(prev => ({ ...prev, level: e.target.value as any }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="basic">Basic</option>
              <option value="standard">Standard</option>
              <option value="enhanced">Enhanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Application Number (Optional)
            </label>
            <input
              type="text"
              value={dbsCheck.applicationNumber}
              onChange={(e) => setDbsCheck(prev => ({ ...prev, applicationNumber: e.target.value }))}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="If available"
            />
          </div>
        </div>

        {/* Verification Button */}
        <div className="mt-6">
          <button
            onClick={handleDbsVerification}
            disabled={isVerifying || dbsCheck.verificationStatus === 'verified'}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
              isVerifying 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : dbsCheck.verificationStatus === 'verified'
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isVerifying ? (
              <>
                <Clock className="w-4 h-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : dbsCheck.verificationStatus === 'verified' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Verified</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Verify Certificate</span>
              </>
            )}
          </button>
        </div>

        {/* Verification Results */}
        {verificationResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <h4 className="text-green-400 font-medium mb-3 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verification Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Certificate Valid:</span>
                <span className="text-green-400 ml-2">✓ Yes</span>
              </div>
              <div>
                <span className="text-gray-400">Holder Name:</span>
                <span className="text-white ml-2">{verificationResults.holderName}</span>
              </div>
              <div>
                <span className="text-gray-400">Certificate Type:</span>
                <span className="text-white ml-2">{verificationResults.certificateType}</span>
              </div>
              <div>
                <span className="text-gray-400">Risk Level:</span>
                <span className="text-green-400 ml-2 capitalize">{verificationResults.riskLevel}</span>
              </div>
            </div>
            
            {verificationResults.disclosures.length > 0 && (
              <div className="mt-4">
                <h5 className="text-yellow-400 font-medium mb-2">Disclosures:</h5>
                <ul className="text-sm text-gray-300">
                  {verificationResults.disclosures.map((disclosure: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <AlertCircle className="w-3 h-3 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span>{disclosure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {errors.dbs && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">{errors.dbs}</span>
            </div>
          </div>
        )}
      </div>

      {/* Personal Information */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <UserCheck className="w-5 h-5 mr-2 text-yellow-500" />
          Personal Information
        </h3>

        {/* Previous Names */}
        <div className="mb-6">
          <h4 className="text-white font-medium mb-3">Previous Names (if any)</h4>
          {personalInfo.previousNames.map((name, index) => (
            <div key={index} className="flex items-center space-x-3 mb-2">
              <input
                type="text"
                value={name}
                onChange={(e) => updatePreviousName(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter previous name"
              />
              {personalInfo.previousNames.length > 1 && (
                <button
                  onClick={() => removePreviousName(index)}
                  className="p-2 text-red-400 hover:text-red-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addPreviousName}
            className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Add Previous Name
          </button>
        </div>

        {/* Previous Addresses */}
        <div className="mb-6">
          <h4 className="text-white font-medium mb-3">Previous Addresses (last 5 years)</h4>
          {personalInfo.previousAddresses.map((address, index) => (
            <div key={index} className="flex items-center space-x-3 mb-2">
              <input
                type="text"
                value={address}
                onChange={(e) => updatePreviousAddress(index, e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Enter previous address"
              />
              {personalInfo.previousAddresses.length > 1 && (
                <button
                  onClick={() => removePreviousAddress(index)}
                  className="p-2 text-red-400 hover:text-red-300"
                >
                  <AlertTriangle className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addPreviousAddress}
            className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
          >
            Add Previous Address
          </button>
        </div>

        {/* Disclosure Questions */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                id="criminalConvictions"
                checked={personalInfo.criminalConvictions}
                onChange={(e) => handlePersonalInfoChange('criminalConvictions', e.target.checked)}
                className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-500"
              />
              <label htmlFor="criminalConvictions" className="text-white font-medium">
                I have criminal convictions or pending charges
              </label>
            </div>
            {personalInfo.criminalConvictions && (
              <textarea
                value={personalInfo.convictionDetails || ''}
                onChange={(e) => handlePersonalInfoChange('convictionDetails', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.convictionDetails ? 'border-red-500' : 'border-gray-500 focus:ring-yellow-500'
                }`}
                placeholder="Please provide full details including dates, charges, and outcomes"
                rows={4}
              />
            )}
            {errors.convictionDetails && (
              <p className="text-red-400 text-xs mt-1">{errors.convictionDetails}</p>
            )}
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                id="bankruptcyHistory"
                checked={personalInfo.bankruptcyHistory}
                onChange={(e) => handlePersonalInfoChange('bankruptcyHistory', e.target.checked)}
                className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-500"
              />
              <label htmlFor="bankruptcyHistory" className="text-white font-medium">
                I have a history of bankruptcy or financial difficulty
              </label>
            </div>
            {personalInfo.bankruptcyHistory && (
              <textarea
                value={personalInfo.bankruptcyDetails || ''}
                onChange={(e) => handlePersonalInfoChange('bankruptcyDetails', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.bankruptcyDetails ? 'border-red-500' : 'border-gray-500 focus:ring-yellow-500'
                }`}
                placeholder="Please provide details and dates"
                rows={3}
              />
            )}
            {errors.bankruptcyDetails && (
              <p className="text-red-400 text-xs mt-1">{errors.bankruptcyDetails}</p>
            )}
          </div>

          <div className="p-4 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                id="employmentGaps"
                checked={personalInfo.employmentGaps}
                onChange={(e) => handlePersonalInfoChange('employmentGaps', e.target.checked)}
                className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-500"
              />
              <label htmlFor="employmentGaps" className="text-white font-medium">
                I have unexplained gaps in employment (longer than 3 months)
              </label>
            </div>
            {personalInfo.employmentGaps && (
              <textarea
                value={personalInfo.gapDetails || ''}
                onChange={(e) => handlePersonalInfoChange('gapDetails', e.target.value)}
                className={`w-full px-3 py-2 bg-gray-600 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                  errors.gapDetails ? 'border-red-500' : 'border-gray-500 focus:ring-yellow-500'
                }`}
                placeholder="Please explain the gaps in employment"
                rows={3}
              />
            )}
            {errors.gapDetails && (
              <p className="text-red-400 text-xs mt-1">{errors.gapDetails}</p>
            )}
          </div>
        </div>
      </div>

      {/* Data Protection Notice */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h4 className="text-white font-medium mb-3 flex items-center">
          <Lock className="w-4 h-4 mr-2 text-yellow-500" />
          Data Protection & Privacy
        </h4>
        <div className="text-sm text-gray-400 space-y-2">
          <p>• All information is processed in accordance with GDPR and Data Protection Act 2018</p>
          <p>• Personal data is stored securely and accessed only by authorized personnel</p>
          <p>• Information is retained for 7 years as required by SIA regulations</p>
          <p>• You have the right to access, correct, or delete your personal data</p>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <input
            type="checkbox"
            id="dataConsent"
            className="w-4 h-4 text-yellow-500 bg-gray-600 border-gray-500 rounded focus:ring-yellow-500"
            required
          />
          <label htmlFor="dataConsent" className="text-white text-sm">
            I consent to the processing of my personal data for background verification purposes *
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
      >
        Continue to Training Modules
      </button>
    </motion.div>
  );
}