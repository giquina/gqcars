'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle, 
  Download,
  Mail,
  Calendar,
  Car,
  Shield,
  Star,
  Clock,
  FileText,
  Users,
  ArrowRight,
  Sparkles,
  Trophy
} from 'lucide-react';

interface OnboardingCompleteProps {
  driverData: any;
  onComplete: () => void;
}

interface CompletionStats {
  documentsVerified: number;
  trainingCompleted: number;
  averageScore: number;
  processingTime: string;
  certificationEarned: boolean;
}

interface NextStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  status: 'pending' | 'ready' | 'completed';
  estimatedTime: string;
}

export default function OnboardingComplete({ driverData, onComplete }: OnboardingCompleteProps) {
  const [showCelebration, setShowCelebration] = useState(true);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const stats: CompletionStats = {
    documentsVerified: driverData?.documents?.length || 6,
    trainingCompleted: driverData?.training?.modules?.length || 7,
    averageScore: driverData?.training?.progress?.overallScore || 92,
    processingTime: '24 hours',
    certificationEarned: true
  };

  const nextSteps: NextStep[] = [
    {
      id: 'admin_review',
      title: 'Administrative Review',
      description: 'Our compliance team will review your application within 24 hours',
      icon: FileText,
      status: 'ready',
      estimatedTime: '24 hours'
    },
    {
      id: 'welcome_call',
      title: 'Welcome Call',
      description: 'Schedule your welcome call with our operations manager',
      icon: Calendar,
      status: 'pending',
      estimatedTime: '30 minutes'
    },
    {
      id: 'first_assignment',
      title: 'First Assignment',
      description: 'Receive your first client assignment and briefing',
      icon: Car,
      status: 'pending',
      estimatedTime: '2-3 days'
    },
    {
      id: 'mentor_pairing',
      title: 'Mentor Assignment',
      description: 'Get paired with an experienced driver for guidance',
      icon: Users,
      status: 'pending',
      estimatedTime: '1 week'
    }
  ];

  useEffect(() => {
    // Simulate certificate generation
    const timer = setTimeout(() => {
      setCertificateGenerated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const downloadCertificate = () => {
    // Simulate certificate download
    const link = document.createElement('a');
    link.href = '/certificates/gq-cars-completion-certificate.pdf';
    link.download = 'GQ-Cars-Driver-Certification.pdf';
    link.click();
  };

  const sendWelcomeEmail = () => {
    // Simulate sending welcome email
    alert('Welcome email sent! Check your inbox for important next steps and contact information.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 relative overflow-hidden"
    >
      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="bg-gray-800 p-8 rounded-lg text-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-6xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-2xl font-bold text-yellow-500 mb-2">Congratulations!</h2>
            <p className="text-white mb-4">You've successfully completed the GQ Cars driver onboarding!</p>
            <button
              onClick={() => setShowCelebration(false)}
              className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Trophy className="w-16 h-16 text-yellow-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to the GQ Cars Team!
          </h1>
          <p className="text-xl text-gray-300">
            Your driver onboarding is now complete
          </p>
        </motion.div>

        {/* Completion Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.documentsVerified}</div>
            <div className="text-sm text-gray-400">Documents Verified</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.trainingCompleted}</div>
            <div className="text-sm text-gray-400">Training Modules</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.averageScore}%</div>
            <div className="text-sm text-gray-400">Average Score</div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.processingTime}</div>
            <div className="text-sm text-gray-400">Processing Time</div>
          </div>
        </motion.div>

        {/* Certificate Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 p-8 rounded-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Official Completion Certificate
              </h3>
              <p className="text-yellow-200">
                Your professional driver certification from GQ Cars LTD
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-12 h-12 text-yellow-400" />
            </motion.div>
          </div>

          <div className="bg-white p-6 rounded-lg mb-6 text-black">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">GQ CARS LTD</div>
              <div className="text-lg mb-4">PROFESSIONAL DRIVER CERTIFICATION</div>
              <div className="border-t border-b border-gray-300 py-4 mb-4">
                <div className="text-xl font-semibold">
                  {driverData?.personalDetails?.firstName} {driverData?.personalDetails?.lastName}
                </div>
                <div className="text-gray-600 mt-1">Driver ID: GQ{Date.now().toString().slice(-6)}</div>
              </div>
              <div className="text-sm text-gray-700 mb-4">
                This certifies that the above named individual has successfully completed
                all required training modules and verification processes for professional
                driver services with GQ Cars LTD.
              </div>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <div>Issue Date: {new Date().toLocaleDateString()}</div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  SIA Verified
                </div>
                <div>Certificate ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadCertificate}
              disabled={!certificateGenerated}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                certificateGenerated
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>{certificateGenerated ? 'Download Certificate' : 'Generating Certificate...'}</span>
            </button>
            
            <button
              onClick={sendWelcomeEmail}
              className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Welcome Package</span>
            </button>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <ArrowRight className="w-5 h-5 mr-2 text-yellow-500" />
            What Happens Next?
          </h3>
          
          <div className="space-y-4">
            {nextSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`flex items-center p-4 rounded-lg border ${
                    step.status === 'ready' ? 'border-green-500 bg-green-500/10' :
                    step.status === 'completed' ? 'border-blue-500 bg-blue-500/10' :
                    'border-gray-600 bg-gray-700/50'
                  }`}
                >
                  <div className={`p-3 rounded-lg mr-4 ${
                    step.status === 'ready' ? 'bg-green-600' :
                    step.status === 'completed' ? 'bg-blue-600' :
                    'bg-gray-600'
                  }`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">Est. {step.estimatedTime}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        step.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                        step.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {step.status === 'ready' ? 'Starting Soon' :
                         step.status === 'completed' ? 'Completed' :
                         'Pending'}
                      </span>
                    </div>
                  </div>

                  {step.status === 'ready' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg"
        >
          <h4 className="text-blue-400 font-medium mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Your Support Team
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-white font-medium">Operations Manager</div>
              <div className="text-blue-200">Sarah Johnson</div>
              <div className="text-blue-300">sarah.johnson@gqcars.co.uk</div>
              <div className="text-blue-300">+44 20 7123 4567</div>
            </div>
            <div>
              <div className="text-white font-medium">Driver Support</div>
              <div className="text-blue-200">24/7 Driver Helpline</div>
              <div className="text-blue-300">driver.support@gqcars.co.uk</div>
              <div className="text-blue-300">+44 20 7123 4500</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onComplete}
            className="flex-1 py-4 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Car className="w-5 h-5" />
            <span>Access Driver Portal</span>
          </button>
          
          <button
            onClick={() => window.open('/handbook/driver-handbook.pdf', '_blank')}
            className="flex-1 py-4 px-6 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <FileText className="w-5 h-5" />
            <span>Download Handbook</span>
          </button>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center py-8"
        >
          <div className="text-6xl mb-4">🚗✨</div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Professional Excellence
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            You're now part of an elite team of professional drivers. We look forward to 
            providing exceptional service together and building long-lasting client relationships.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}