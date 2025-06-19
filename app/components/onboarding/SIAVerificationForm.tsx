'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Search,
  ExternalLink,
  User,
  Calendar,
  FileText
} from 'lucide-react';

interface SIAVerificationFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

interface SIALicense {
  licenseNumber: string;
  holderName: string;
  issueDate: string;
  expiryDate: string;
  licenseType: string;
  status: 'active' | 'expired' | 'suspended' | 'revoked';
  sectors: string[];
}

export default function SIAVerificationForm({ onComplete, initialData }: SIAVerificationFormProps) {
  const [formData, setFormData] = useState({
    siaLicenseNumber: initialData?.siaLicenseNumber || '',
    holderName: initialData?.holderName || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    licenseType: initialData?.licenseType || '',
    ...initialData
  });

  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'checking' | 'verified' | 'failed'>('idle');
  const [licenseData, setLicenseData] = useState<SIALicense | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData, licenseData]);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.siaLicenseNumber) {
      newErrors.siaLicenseNumber = 'SIA license number is required';
    } else if (!/^[0-9]{8}$/.test(formData.siaLicenseNumber)) {
      newErrors.siaLicenseNumber = 'SIA license number must be 8 digits';
    }

    if (!formData.holderName) {
      newErrors.holderName = 'License holder name is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.licenseType) {
      newErrors.licenseType = 'License type is required';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && verificationStatus === 'verified');
  };

  const verifySIALicense = async () => {
    if (!formData.siaLicenseNumber || formData.siaLicenseNumber.length !== 8) {
      return;
    }

    setVerificationStatus('checking');

    try {
      // Simulate API call to SIA database
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock response - in reality this would be a real API call
      const mockLicenseData: SIALicense = {
        licenseNumber: formData.siaLicenseNumber,
        holderName: formData.holderName,
        issueDate: '2021-06-15',
        expiryDate: '2026-06-15',
        licenseType: 'Close Protection',
        status: 'active',
        sectors: ['Close Protection', 'Security Guarding']
      };

      setLicenseData(mockLicenseData);
      setVerificationStatus('verified');
    } catch (error) {
      setVerificationStatus('failed');
      setLicenseData(null);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-verify when license number is complete
    if (field === 'siaLicenseNumber' && value.length === 8) {
      setTimeout(() => verifySIALicense(), 500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid && licenseData) {
      onComplete({
        ...formData,
        licenseData,
        verificationStatus,
        verifiedAt: new Date().toISOString()
      });
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'checking':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusMessage = () => {
    switch (verificationStatus) {
      case 'checking':
        return 'Verifying license with SIA database...';
      case 'verified':
        return 'License verified successfully';
      case 'failed':
        return 'License verification failed';
      default:
        return 'Enter your SIA license details for verification';
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Verification Status */}
      <div className={`p-4 rounded-lg border ${
        verificationStatus === 'verified' 
          ? 'bg-green-500/10 border-green-500/30' 
          : verificationStatus === 'failed'
          ? 'bg-red-500/10 border-red-500/30'
          : verificationStatus === 'checking'
          ? 'bg-yellow-500/10 border-yellow-500/30'
          : 'bg-gray-800 border-gray-700'
      }`}>
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <div className="font-medium text-white">SIA License Verification</div>
            <div className="text-sm text-gray-400">{getStatusMessage()}</div>
          </div>
        </div>
      </div>

      {/* SIA License Number */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          SIA License Number *
        </label>
        <div className="relative">
          <input
            type="text"
            value={formData.siaLicenseNumber}
            onChange={(e) => handleInputChange('siaLicenseNumber', e.target.value)}
            placeholder="12345678"
            maxLength={8}
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.siaLicenseNumber 
                ? 'border-red-500 focus:ring-red-500' 
                : verificationStatus === 'verified'
                ? 'border-green-500 focus:ring-green-500'
                : 'border-gray-600 focus:ring-yellow-500'
            }`}
          />
          <div className="absolute right-3 top-3">
            {verificationStatus === 'checking' && (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-500"></div>
            )}
            {verificationStatus === 'verified' && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
        {errors.siaLicenseNumber && (
          <p className="mt-1 text-sm text-red-400">{errors.siaLicenseNumber}</p>
        )}
        <p className="mt-1 text-xs text-gray-400">
          Your 8-digit SIA license number (found on your license card)
        </p>
      </div>

      {/* License Holder Name */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          License Holder Name *
        </label>
        <input
          type="text"
          value={formData.holderName}
          onChange={(e) => handleInputChange('holderName', e.target.value)}
          placeholder="As shown on your SIA license"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
            errors.holderName 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600 focus:ring-yellow-500'
          }`}
        />
        {errors.holderName && (
          <p className="mt-1 text-sm text-red-400">{errors.holderName}</p>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Date of Birth *
        </label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 ${
            errors.dateOfBirth 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600 focus:ring-yellow-500'
          }`}
        />
        {errors.dateOfBirth && (
          <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>
        )}
      </div>

      {/* License Type */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          License Type *
        </label>
        <select
          value={formData.licenseType}
          onChange={(e) => handleInputChange('licenseType', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 ${
            errors.licenseType 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600 focus:ring-yellow-500'
          }`}
        >
          <option value="">Select license type</option>
          <option value="close-protection">Close Protection</option>
          <option value="security-guarding">Security Guarding</option>
          <option value="door-supervision">Door Supervision</option>
          <option value="cctv-operation">CCTV Operation</option>
          <option value="cash-transit">Cash and Valuables in Transit</option>
        </select>
        {errors.licenseType && (
          <p className="mt-1 text-sm text-red-400">{errors.licenseType}</p>
        )}
      </div>

      {/* Verified License Data Display */}
      {licenseData && verificationStatus === 'verified' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
        >
          <h3 className="text-green-400 font-medium mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Verified License Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">License Number:</span>
              <span className="text-white ml-2">{licenseData.licenseNumber}</span>
            </div>
            <div>
              <span className="text-gray-400">Status:</span>
              <span className="text-green-400 ml-2 capitalize">{licenseData.status}</span>
            </div>
            <div>
              <span className="text-gray-400">Issue Date:</span>
              <span className="text-white ml-2">{new Date(licenseData.issueDate).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-400">Expiry Date:</span>
              <span className="text-white ml-2">{new Date(licenseData.expiryDate).toLocaleDateString()}</span>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-400">Authorized Sectors:</span>
              <div className="mt-1">
                {licenseData.sectors.map((sector, index) => (
                  <span key={index} className="inline-block bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2 mb-1">
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Manual Verification Button */}
      {formData.siaLicenseNumber.length === 8 && verificationStatus === 'idle' && (
        <button
          type="button"
          onClick={verifySIALicense}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Verify SIA License
        </button>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isValid
            ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {isValid ? 'Continue to Document Upload' : 'Complete SIA Verification'}
      </button>

      {/* Help Text */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <FileText className="w-5 h-5 text-blue-400 mt-1" />
          <div>
            <h4 className="text-blue-400 font-medium mb-2">SIA License Requirements</h4>
            <ul className="text-blue-200 text-sm space-y-1">
              <li>• Must be a valid, active SIA license</li>
              <li>• Close Protection license required for VIP services</li>
              <li>• License must not expire within 90 days</li>
              <li>• No suspensions or restrictions</li>
            </ul>
            <a 
              href="https://www.gov.uk/sia-licence-check"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm mt-2"
            >
              Verify your license on SIA website
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </motion.form>
  );
}