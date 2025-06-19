'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Shield, 
  Upload, 
  Car, 
  Database, 
  GraduationCap, 
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

// Import all onboarding form components
import PersonalDetailsForm from '../components/onboarding/PersonalDetailsForm';
import SIAVerificationForm from '../components/onboarding/SIAVerificationForm';
import DocumentUploadForm from '../components/onboarding/DocumentUploadForm';
import VehicleInspectionForm from '../components/onboarding/VehicleInspectionForm';
import BackgroundCheckForm from '../components/onboarding/BackgroundCheckForm';
import TrainingModulesForm from '../components/onboarding/TrainingModulesForm';
import OnboardingComplete from '../components/onboarding/OnboardingComplete';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  component: any;
  completed: boolean;
}

interface OnboardingData {
  personalDetails?: any;
  siaVerification?: any;
  documents?: any;
  vehicleInspection?: any;
  backgroundCheck?: any;
  training?: any;
}

export default function DriverOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [isComplete, setIsComplete] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: 'personal-details',
      title: 'Personal Details',
      description: 'Basic information and contact details',
      icon: User,
      component: PersonalDetailsForm,
      completed: false
    },
    {
      id: 'sia-verification',
      title: 'SIA Verification',
      description: 'Security Industry Authority license check',
      icon: Shield,
      component: SIAVerificationForm,
      completed: false
    },
    {
      id: 'document-upload',
      title: 'Document Upload',
      description: 'Upload required documents and certificates',
      icon: Upload,
      component: DocumentUploadForm,
      completed: false
    },
    {
      id: 'vehicle-inspection',
      title: 'Vehicle Inspection',
      description: 'Vehicle details and safety inspection',
      icon: Car,
      component: VehicleInspectionForm,
      completed: false
    },
    {
      id: 'background-check',
      title: 'Background Check',
      description: 'DBS verification and personal history',
      icon: Database,
      component: BackgroundCheckForm,
      completed: false
    },
    {
      id: 'training-modules',
      title: 'Training Modules',
      description: 'Complete mandatory training and certification',
      icon: GraduationCap,
      component: TrainingModulesForm,
      completed: false
    }
  ];

  const [stepStates, setStepStates] = useState(steps);

  const handleStepComplete = (stepId: string, data: any) => {
    // Update onboarding data
    const stepKey = stepId.replace('-', '') as keyof OnboardingData;
    setOnboardingData(prev => ({
      ...prev,
      [stepKey]: data
    }));

    // Mark step as completed
    setStepStates(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));

    // Move to next step or complete onboarding
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    // Only allow going to completed steps or the next step
    const canGoToStep = stepIndex <= currentStep || stepStates[stepIndex - 1]?.completed;
    if (canGoToStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleFinalComplete = () => {
    // Redirect to driver portal or home page
    window.location.href = '/driver-portal';
  };

  if (isComplete) {
    return (
      <OnboardingComplete 
        driverData={onboardingData}
        onComplete={handleFinalComplete}
      />
    );
  }

  const CurrentStepComponent = stepStates[currentStep].component;
  const currentStepData = onboardingData[stepStates[currentStep].id.replace('-', '') as keyof OnboardingData];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white mb-2">Driver Onboarding</h1>
          <p className="text-gray-400">Complete all steps to join the GQ Cars team</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {stepStates.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index === currentStep;
              const isCompleted = step.completed;
              const canAccess = index <= currentStep || (index > 0 && stepStates[index - 1]?.completed);

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => goToStep(index)}
                    disabled={!canAccess}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-600 border-green-600 text-white'
                        : isActive
                        ? 'bg-yellow-500 border-yellow-500 text-black'
                        : canAccess
                        ? 'border-gray-600 text-gray-400 hover:border-gray-500'
                        : 'border-gray-700 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </button>

                  {index < stepStates.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step.completed ? 'bg-green-600' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Step Info */}
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-white">
              Step {currentStep + 1} of {stepStates.length}: {stepStates[currentStep].title}
            </h2>
            <p className="text-gray-400 text-sm">{stepStates[currentStep].description}</p>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentStepComponent
              onComplete={(data: any) => handleStepComplete(stepStates[currentStep].id, data)}
              initialData={currentStepData}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {stepStates.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index < currentStep
                    ? 'bg-green-600'
                    : index === currentStep
                    ? 'bg-yellow-500'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>

          <div className="text-gray-400 text-sm">
            {Math.round(((currentStep + 1) / stepStates.length) * 100)}% Complete
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h4 className="text-blue-400 font-medium mb-2">Need Help?</h4>
          <p className="text-blue-200 text-sm mb-3">
            If you encounter any issues during the onboarding process, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <a
              href="mailto:onboarding@gqcars.co.uk"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              📧 onboarding@gqcars.co.uk
            </a>
            <a
              href="tel:+442071234567"
              className="text-blue-300 hover:text-blue-200 transition-colors"
            >
              📞 +44 20 7123 4567
            </a>
            <span className="text-blue-300">
              ⏰ Mon-Fri, 9:00-17:00 GMT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}