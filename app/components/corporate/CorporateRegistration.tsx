'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import {
  Building2,
  Users,
  Settings,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Shield,
  Globe,
  Mail,
  Phone,
  MapPin,
  User,
  Eye,
  EyeOff
} from 'lucide-react'

import { CorporateRegistrationData, CompanySize } from '@/app/types/corporate'

// Validation schemas for each step
const companySchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  domain: z.string().email('Please enter a valid domain email'),
  industry: z.string().min(1, 'Please select an industry'),
  companySize: z.enum(['STARTUP', 'SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']),
  address: z.string().min(5, 'Please enter a complete address'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  vatNumber: z.string().optional()
})

const adminSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      'Password must contain uppercase, lowercase, number and special character'),
  position: z.string().min(2, 'Position is required')
})

const settingsSchema = z.object({
  monthlyBudgetLimit: z.number().positive().optional(),
  requireApprovalAbove: z.number().positive().min(100, 'Minimum approval amount is £100'),
  maxBookingAmount: z.number().positive().min(1000, 'Minimum maximum booking amount is £1000')
})

const fullSchema = companySchema.merge(adminSchema).merge(settingsSchema)

type FormData = z.infer<typeof fullSchema>

const INDUSTRIES = [
  'Financial Services',
  'Technology',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Legal Services',
  'Consulting',
  'Media & Entertainment',
  'Government',
  'Education',
  'Energy',
  'Transportation',
  'Other'
]

const COMPANY_SIZES = [
  { value: 'STARTUP', label: '1-10 employees', description: 'Early stage company' },
  { value: 'SMALL', label: '11-50 employees', description: 'Small business' },
  { value: 'MEDIUM', label: '51-200 employees', description: 'Medium enterprise' },
  { value: 'LARGE', label: '201-1000 employees', description: 'Large enterprise' },
  { value: 'ENTERPRISE', label: '1000+ employees', description: 'Enterprise corporation' }
]

interface CorporateRegistrationProps {
  onComplete?: (data: CorporateRegistrationData) => void
}

export default function CorporateRegistration({ onComplete }: CorporateRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: 'onChange',
    defaultValues: {
      requireApprovalAbove: 1000,
      maxBookingAmount: 10000
    }
  })

  const watchedValues = watch()

  const steps = [
    {
      number: 1,
      title: 'Company Information',
      description: 'Basic company details and contact information',
      icon: Building2,
      fields: ['companyName', 'domain', 'industry', 'companySize', 'address', 'city', 'country', 'phone', 'website', 'vatNumber']
    },
    {
      number: 2,
      title: 'Administrator Account',
      description: 'Create your admin user account',
      icon: User,
      fields: ['firstName', 'lastName', 'email', 'password', 'position']
    },
    {
      number: 3,
      title: 'Initial Settings',
      description: 'Configure basic policies and limits',
      icon: Settings,
      fields: ['monthlyBudgetLimit', 'requireApprovalAbove', 'maxBookingAmount']
    },
    {
      number: 4,
      title: 'Review & Complete',
      description: 'Review your information and complete registration',
      icon: CheckCircle,
      fields: []
    }
  ]

  const currentStepData = steps[currentStep - 1]

  const validateCurrentStep = async () => {
    const fieldsToValidate = currentStepData.fields
    const isStepValid = await trigger(fieldsToValidate as any)
    
    if (isStepValid && !completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep])
    }
    
    return isStepValid
  }

  const nextStep = async () => {
    if (await validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Corporate account created successfully!')
      onComplete?.(data as CorporateRegistrationData)
    } catch (error) {
      toast.error('Failed to create corporate account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (fieldName: string) => {
    return errors[fieldName as keyof typeof errors]?.message
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-yellow-500 mr-3" />
            <h1 className="text-3xl font-bold text-white">GQ Cars LTD</h1>
          </div>
          <h2 className="text-xl text-gray-300">Corporate Account Registration</h2>
          <p className="text-gray-400 mt-2">Enterprise-grade security transport solutions</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    completedSteps.includes(step.number)
                      ? 'bg-green-600 text-white'
                      : currentStep === step.number
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {completedSteps.includes(step.number) ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-white">{step.title}</p>
                  <p className="text-xs text-gray-400 max-w-24">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    completedSteps.includes(step.number) ? 'bg-green-600' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Company Information</h3>
                  <p className="text-gray-400">Tell us about your organization</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('companyName')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="Enter company name"
                      />
                    </div>
                    {getFieldError('companyName') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('companyName')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company Email Domain *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('domain')}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="admin@company.com"
                      />
                    </div>
                    {getFieldError('domain') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('domain')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Industry *
                    </label>
                    <select
                      {...register('industry')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="">Select industry</option>
                      {INDUSTRIES.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                    {getFieldError('industry') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('industry')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Company Size *
                    </label>
                    <select
                      {...register('companySize')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    >
                      <option value="">Select company size</option>
                      {COMPANY_SIZES.map(size => (
                        <option key={size.value} value={size.value}>
                          {size.label} - {size.description}
                        </option>
                      ))}
                    </select>
                    {getFieldError('companySize') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('companySize')}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Address *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('address')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="Enter full address"
                      />
                    </div>
                    {getFieldError('address') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('address')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      City *
                    </label>
                    <input
                      {...register('city')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      placeholder="Enter city"
                    />
                    {getFieldError('city') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('city')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Country *
                    </label>
                    <input
                      {...register('country')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      placeholder="Enter country"
                    />
                    {getFieldError('country') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('country')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="Enter phone number"
                      />
                    </div>
                    {getFieldError('phone') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('phone')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Website
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('website')}
                        type="url"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="https://company.com"
                      />
                    </div>
                    {getFieldError('website') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('website')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      VAT Number
                    </label>
                    <input
                      {...register('vatNumber')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      placeholder="Enter VAT number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Administrator Account */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Administrator Account</h3>
                  <p className="text-gray-400">Create your admin user account</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      First Name *
                    </label>
                    <input
                      {...register('firstName')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      placeholder="Enter first name"
                    />
                    {getFieldError('firstName') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('firstName')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Last Name *
                    </label>
                    <input
                      {...register('lastName')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      placeholder="Enter last name"
                    />
                    {getFieldError('lastName') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('lastName')}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="admin@company.com"
                      />
                    </div>
                    {getFieldError('email') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('email')}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-4 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Password must contain uppercase, lowercase, number and special character
                    </p>
                    {getFieldError('password') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('password')}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-white mb-2">
                      Position/Title *
                    </label>
                    <input
                      {...register('position')}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      placeholder="e.g., CEO, Head of Security, Operations Manager"
                    />
                    {getFieldError('position') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('position')}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Initial Settings */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Initial Settings</h3>
                  <p className="text-gray-400">Configure basic policies and spending limits</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Monthly Budget Limit (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                      <input
                        {...register('monthlyBudgetLimit', { valueAsNumber: true })}
                        type="number"
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                        placeholder="e.g., 50000"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Set a monthly spending limit for your organization
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Require Approval Above *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                      <input
                        {...register('requireApprovalAbove', { valueAsNumber: true })}
                        type="number"
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Bookings above this amount will require manager approval
                    </p>
                    {getFieldError('requireApprovalAbove') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('requireApprovalAbove')}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Maximum Booking Amount *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                      <input
                        {...register('maxBookingAmount', { valueAsNumber: true })}
                        type="number"
                        className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Maximum amount allowed for a single booking
                    </p>
                    {getFieldError('maxBookingAmount') && (
                      <p className="text-red-400 text-sm mt-1">{getFieldError('maxBookingAmount')}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Review & Complete</h3>
                  <p className="text-gray-400">Please review your information before completing registration</p>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Company Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-400">Company:</span> <span className="text-white">{watchedValues.companyName}</span></div>
                      <div><span className="text-gray-400">Domain:</span> <span className="text-white">{watchedValues.domain}</span></div>
                      <div><span className="text-gray-400">Industry:</span> <span className="text-white">{watchedValues.industry}</span></div>
                      <div><span className="text-gray-400">Size:</span> <span className="text-white">{watchedValues.companySize}</span></div>
                      <div className="col-span-2"><span className="text-gray-400">Address:</span> <span className="text-white">{watchedValues.address}, {watchedValues.city}, {watchedValues.country}</span></div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Administrator</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-400">Name:</span> <span className="text-white">{watchedValues.firstName} {watchedValues.lastName}</span></div>
                      <div><span className="text-gray-400">Email:</span> <span className="text-white">{watchedValues.email}</span></div>
                      <div><span className="text-gray-400">Position:</span> <span className="text-white">{watchedValues.position}</span></div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Settings</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="text-gray-400">Approval Required Above:</span> <span className="text-white">£{watchedValues.requireApprovalAbove}</span></div>
                      <div><span className="text-gray-400">Max Booking Amount:</span> <span className="text-white">£{watchedValues.maxBookingAmount}</span></div>
                      {watchedValues.monthlyBudgetLimit && (
                        <div><span className="text-gray-400">Monthly Budget Limit:</span> <span className="text-white">£{watchedValues.monthlyBudgetLimit}</span></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-600">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:opacity-90 flex items-center font-medium"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-lg hover:opacity-90 disabled:opacity-50 font-medium flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}