'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Globe
} from 'lucide-react';

interface PersonalDetailsFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

export default function PersonalDetailsForm({ onComplete, initialData }: PersonalDetailsFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    nationalInsurance: initialData?.nationalInsurance || '',
    address: {
      line1: initialData?.address?.line1 || '',
      line2: initialData?.address?.line2 || '',
      city: initialData?.address?.city || '',
      postcode: initialData?.address?.postcode || '',
      country: initialData?.address?.country || 'United Kingdom'
    },
    emergencyContact: {
      name: initialData?.emergencyContact?.name || '',
      relationship: initialData?.emergencyContact?.relationship || '',
      phone: initialData?.emergencyContact?.phone || ''
    },
    rightToWork: initialData?.rightToWork || '',
    languages: initialData?.languages || ['English'],
    ...initialData
  });

  const [errors, setErrors] = useState<any>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors: any = {};

    // Basic validation
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+44|0)[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Invalid UK phone number';
    }

    // Date of birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const age = (Date.now() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 21) {
        newErrors.dateOfBirth = 'Must be at least 21 years old';
      }
    }

    // National Insurance validation
    if (!formData.nationalInsurance) {
      newErrors.nationalInsurance = 'National Insurance number is required';
    } else if (!/^[A-CEGHJ-PR-TW-Z]{2}[0-9]{6}[A-D]$/i.test(formData.nationalInsurance.replace(/\s/g, ''))) {
      newErrors.nationalInsurance = 'Invalid National Insurance number format';
    }

    // Address validation
    if (!formData.address.line1) newErrors['address.line1'] = 'Address line 1 is required';
    if (!formData.address.city) newErrors['address.city'] = 'City is required';
    if (!formData.address.postcode) {
      newErrors['address.postcode'] = 'Postcode is required';
    } else if (!/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i.test(formData.address.postcode)) {
      newErrors['address.postcode'] = 'Invalid UK postcode format';
    }

    // Emergency contact validation
    if (!formData.emergencyContact.name) newErrors['emergencyContact.name'] = 'Emergency contact name is required';
    if (!formData.emergencyContact.phone) newErrors['emergencyContact.phone'] = 'Emergency contact phone is required';

    // Right to work validation
    if (!formData.rightToWork) newErrors.rightToWork = 'Right to work status is required';

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = value;
    setFormData(prev => ({ ...prev, languages: newLanguages }));
  };

  const addLanguage = () => {
    setFormData(prev => ({ ...prev, languages: [...prev.languages, ''] }));
  };

  const removeLanguage = (index: number) => {
    if (formData.languages.length > 1) {
      const newLanguages = formData.languages.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, languages: newLanguages }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onComplete({
        ...formData,
        submittedAt: new Date().toISOString()
      });
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Personal Information */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-yellow-500" />
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="John"
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="Smith"
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Date of Birth *
            </label>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
                errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
            />
            {errors.dateOfBirth && <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              National Insurance Number *
            </label>
            <input
              type="text"
              value={formData.nationalInsurance}
              onChange={(e) => handleInputChange('nationalInsurance', e.target.value.toUpperCase())}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.nationalInsurance ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="AB123456C"
            />
            {errors.nationalInsurance && <p className="mt-1 text-sm text-red-400">{errors.nationalInsurance}</p>}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Mail className="w-5 h-5 mr-2 text-yellow-500" />
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="john.smith@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="07400 000 000"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-yellow-500" />
          Address
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Address Line 1 *
            </label>
            <input
              type="text"
              value={formData.address.line1}
              onChange={(e) => handleInputChange('address.line1', e.target.value)}
              className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                errors['address.line1'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
              }`}
              placeholder="123 Main Street"
            />
            {errors['address.line1'] && <p className="mt-1 text-sm text-red-400">{errors['address.line1']}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Address Line 2
            </label>
            <input
              type="text"
              value={formData.address.line2}
              onChange={(e) => handleInputChange('address.line2', e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Apartment, suite, etc."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => handleInputChange('address.city', e.target.value)}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors['address.city'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
                }`}
                placeholder="London"
              />
              {errors['address.city'] && <p className="mt-1 text-sm text-red-400">{errors['address.city']}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Postcode *
              </label>
              <input
                type="text"
                value={formData.address.postcode}
                onChange={(e) => handleInputChange('address.postcode', e.target.value.toUpperCase())}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  errors['address.postcode'] ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
                }`}
                placeholder="SW1A 1AA"
              />
              {errors['address.postcode'] && <p className="mt-1 text-sm text-red-400">{errors['address.postcode']}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Country
              </label>
              <select
                value={formData.address.country}
                onChange={(e) => handleInputChange('address.country', e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="United Kingdom">United Kingdom</option>
                <option value="Ireland">Ireland</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Right to Work */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">
          Right to Work in the UK *
        </h3>
        <select
          value={formData.rightToWork}
          onChange={(e) => handleInputChange('rightToWork', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 ${
            errors.rightToWork ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-yellow-500'
          }`}
        >
          <option value="">Select your status</option>
          <option value="british-citizen">British Citizen</option>
          <option value="eu-settled">EU Settled Status</option>
          <option value="work-visa">Work Visa</option>
          <option value="indefinite-leave">Indefinite Leave to Remain</option>
          <option value="other">Other</option>
        </select>
        {errors.rightToWork && <p className="mt-1 text-sm text-red-400">{errors.rightToWork}</p>}
      </div>

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
        {isValid ? 'Continue to SIA Verification' : 'Complete Personal Details'}
      </button>
    </motion.form>
  );
}