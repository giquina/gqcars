'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Shield, 
  FileText, 
  Car,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertTriangle,
  Clock
} from 'lucide-react';
import PersonalDetailsForm from '../components/onboarding/PersonalDetailsForm';
import SIAVerificationForm from '../components/onboarding/SIAVerificationForm';
import DocumentUploadForm from '../components/onboarding/DocumentUploadForm';
import VehicleInspectionForm from '../components/onboarding/VehicleInspectionForm';
import BackgroundCheckForm from '../components/onboarding/BackgroundCheckForm';
import TrainingModulesForm from '../components/onboarding/TrainingModulesForm';
import OnboardingComplete from '../components/onboarding/OnboardingComplete';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
  required: boolean;
}

export default function DriverOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Personal Details',
      description: 'Basic information and contact details',
      icon: UserPlus,
      completed: false,
      required: true
    },
    {
      id: 2,
      title: 'SIA Verification',
      description: 'SIA license verification and validation',
      icon: Shield,
      completed: false,
      required: true
    },
    {
      id: 3,
      title: 'Document Upload',
      description: 'Upload required documents and certificates',
      icon: FileText,
      completed: false,
      required: true
    },
    {
      id: 4,
      title: 'Vehicle Inspection',
      description: 'Vehicle details and inspection checklist',
      icon: Car,
      completed: false,
      required: true
    },
    {
      id: 5,
      title: 'Background Check',
      description: 'DBS check and background verification',
      icon: Shield,
      completed: false,
      required: true
    },
    {
      id: 6,
      title: 'Training Modules',
      description: 'Complete mandatory training courses',
      icon: FileText,
      completed: false,
      required: true
    },
    {
      id: 7,
      title: 'Complete',
      description: 'Application review and approval',
      icon: CheckCircle,
      completed: false,
      required: true
    }
  ];

  const [stepStates, setStepStates] = useState(steps);

  const updateStepCompletion = (stepId: number, completed: boolean) => {
    setStepStates(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed } : step
    ));
  };

  const handleStepData = (stepId: number, data: any) => {
    setApplicationData(prev => ({
      ...prev,
      [`step${stepId}`]: data
    }));
    updateStepCompletion(stepId, true);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDetailsForm
            onComplete={(data) => {
              handleStepData(1, data);
              nextStep();
            }}
            initialData={applicationData.step1}
          />
        );
      case 2:
        return (
          <SIAVerificationForm
            onComplete={(data) => {
              handleStepData(2, data);
              nextStep();
            }}
            initialData={applicationData.step2}
          />
        );
      case 3:
        return (
          <DocumentUploadForm
            onComplete={(data) => {
              handleStepData(3, data);
              nextStep();
            }}
            initialData={applicationData.step3}
          />
        );
      case 4:
        return (
          <VehicleInspectionForm
            onComplete={(data) => {
              handleStepData(4, data);
              nextStep();
            }}
            initialData={applicationData.step4}
          />
        );
      case 5:
        return (
          <BackgroundCheckForm
            onComplete={(data) => {
              handleStepData(5, data);
              nextStep();
            }}
            initialData={applicationData.step5}
          />
        );
      case 6:
        return (
          <TrainingModulesForm
            onComplete={(data) => {
              handleStepData(6, data);
              nextStep();
            }}
            initialData={applicationData.step6}
          />
        );
      case 7:
        return (
          <OnboardingComplete
            applicationData={applicationData}
            onComplete={() => {
              updateStepCompletion(7, true);
            }}
          />
        );
      default:
        return null;
    }
  };

  const completedSteps = stepStates.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500 mb-2">Driver Onboarding</h1>
          <p className="text-gray-400">Join the GQ Cars team of professional SIA drivers</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex justify-between items-center overflow-x-auto pb-4">
            {stepStates.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.completed;
              const isPast = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center min-w-[120px]">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isActive 
                      ? 'bg-yellow-500 text-black' 
                      : isPast
                      ? 'bg-gray-600 text-gray-300'
                      : 'bg-gray-700 text-gray-400'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <IconComponent className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-medium ${
                      isActive ? 'text-yellow-500' : isCompleted ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 max-w-[100px]">
                      {step.description}
                    </div>
                  </div>
                  {index < stepStates.length - 1 && (
                    <div className={`hidden md:block absolute h-0.5 w-16 mt-6 ml-16 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            {steps[currentStep - 1] && (
              <>
                {React.createElement(steps[currentStep - 1].icon, { className: "w-6 h-6 text-yellow-500 mr-3" })}
                <div>
                  <h2 className="text-xl font-bold text-white">{steps[currentStep - 1].title}</h2>
                  <p className="text-gray-400">{steps[currentStep - 1].description}</p>
                </div>
              </>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Processing...</p>
            </div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {completedSteps}/{steps.length} steps completed
            </div>
            {currentStep < steps.length && !stepStates[currentStep - 1].completed && (
              <div className="flex items-center text-yellow-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                Complete this step to continue
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 mt-1" />
            <div>
              <h3 className="text-blue-400 font-medium mb-2">Need Help?</h3>
              <p className="text-blue-200 text-sm mb-3">
                Our support team is available 24/7 to assist with your application.
              </p>
              <div className="flex space-x-4 text-sm">
                <span className="text-blue-300">📞 07407 655 203</span>
                <span className="text-blue-300">✉️ drivers@gqcars.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}