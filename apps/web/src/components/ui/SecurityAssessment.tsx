'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, User, MapPin, History, Zap, BarChart, ChevronLeft, CheckCircle, Briefcase, Users, Plane, Heart, Crown, ShoppingBag } from 'lucide-react'
import { db } from '@/lib/supabase'
import { useAuth } from '@/components/providers/SupabaseProvider'

type Option = {
  id: string;
  text: string;
  subtext?: string;
  icon: React.ElementType;
};

type Question = {
  id: string;
  stepTitle: string;
  stepIcon: React.ElementType;
  questionText: string;
  options: Option[];
  type: 'multiple-choice' | 'text';
};

const assessmentQuestions: Question[] = [
  {
    id: 'service',
    stepTitle: 'Service Requirement',
    stepIcon: Zap,
    questionText: 'What is the primary service you require?',
    type: 'multiple-choice',
    options: [
      { id: 'protection', text: 'Personal Protection', subtext: 'High-security for an individual or group.', icon: Shield },
      { id: 'executive', text: 'Executive Transport', subtext: 'Professional travel for business needs.', icon: Briefcase },
      { id: 'airport', text: 'Airport Transfer', subtext: 'Secure and reliable airport transportation.', icon: Plane },
      { id: 'event', text: 'Event Security', subtext: 'Transport for weddings or special occasions.', icon: Heart },
    ]
  },
  {
    id: 'principalProfile',
    stepTitle: 'Principal Profile (People)',
    stepIcon: User,
    questionText: 'What is the public profile of the person requiring protection?',
    type: 'multiple-choice',
    options: [
      { id: 'private', text: 'Private Individual', subtext: 'Low public visibility, personal travel.', icon: Users },
      { id: 'corporate', text: 'Corporate Executive', subtext: 'C-suite, board member, business figure.', icon: Briefcase },
      { id: 'publicFigure', text: 'Public Figure', subtext: 'Celebrity, politician, artist, or media personality.', icon: Crown },
      { id: 'other', text: 'Other / Prefer Not to Say', subtext: 'For sensitive or unique situations.', icon: Shield },
    ]
  },
  {
    id: 'locations',
    stepTitle: 'Journey Details (Places)',
    stepIcon: MapPin,
    questionText: 'Describe the primary locations for this journey.',
    type: 'multiple-choice',
    options: [
      { id: 'routine', text: 'Routine & Familiar', subtext: 'e.g., Home to office, known routes.', icon: MapPin },
      { id: 'varied', text: 'Varied Public Venues', subtext: 'e.g., Hotels, restaurants, event spaces.', icon: ShoppingBag },
      { id: 'highRisk', text: 'High-Risk / Unfamiliar', subtext: 'e.g., Overseas, high-crime areas, sensitive meetings.', icon: Shield },
      { id: 'secure', text: 'Secure / Private', subtext: 'e.g., FBOs, private residences, secure compounds.', icon: CheckCircle },
    ]
  },
  {
    id: 'threatHistory',
    stepTitle: 'Threat History (History)',
    stepIcon: History,
    questionText: 'Has the principal ever received specific threats?',
    type: 'multiple-choice',
    options: [
      { id: 'none', text: 'No Known Threats', subtext: 'No history of direct or indirect threats.', icon: CheckCircle },
      { id: 'unwanted', text: 'Unwanted Attention', subtext: 'e.g., Paparazzi, stalkers, online harassment.', icon: Users },
      { id: 'indirect', text: 'Indirect / Vague Threats', subtext: 'Non-specific threats have been made.', icon: Zap },
      { id: 'direct', text: 'Yes, Direct Threats', subtext: 'A credible, specific threat has been identified.', icon: Shield },
    ]
  },
  {
    id: 'perceivedRisk',
    stepTitle: 'Perceived Risk Level',
    stepIcon: BarChart,
    questionText: 'What is your perceived level of risk for this task?',
    type: 'multiple-choice',
    options: [
      { id: 'low', text: 'Low', subtext: 'An attack is unlikely. General awareness needed.', icon: BarChart },
      { id: 'moderate', text: 'Moderate', subtext: 'An attack is possible. Precautionary measures required.', icon: BarChart },
      { id: 'substantial', text: 'Substantial', subtext: 'An attack is a strong possibility. Heightened security required.', icon: BarChart },
      { id: 'severe', text: 'Severe / Critical', subtext: 'An attack is highly likely or expected.', icon: BarChart },
    ]
  }
];

export function SecurityAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { user } = useAuth();

  const handleAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < assessmentQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsCompleted(true);
        saveAssessment(newAnswers);
      }
    }, 300);
  };

  const saveAssessment = async (finalAnswers: Record<string, string>) => {
    if (!user) {
      setSaveStatus('error');
      return;
    }

    setSaving(true);
    setSaveStatus('idle');

    try {
      const finalAssessment = getThreatLevel();
      const assessmentData = {
        user_id: user.id,
        answers: finalAnswers,
        threat_level: finalAssessment.level,
        risk_score: calculateRiskScore(finalAnswers),
        recommendations: finalAssessment.advice,
        status: 'completed'
      };

      const { data, error } = await db.createAssessment(assessmentData);
      if (error) throw error;
      
      setSaveStatus('success');
    } catch (error) {
      console.error('Error saving assessment:', error);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  const calculateRiskScore = (answers: Record<string, string>): number => {
    const scores = {
      service: { protection: 4, executive: 2, airport: 1, event: 2 },
      principalProfile: { private: 1, corporate: 2, publicFigure: 4, other: 3 },
      locations: { routine: 1, varied: 2, highRisk: 4, secure: 1 },
      threatHistory: { none: 1, unwanted: 2, indirect: 3, direct: 4 },
      perceivedRisk: { low: 1, moderate: 2, substantial: 3, severe: 4 }
    };
    
    let totalScore = 0;
    totalScore += scores.service[answers.service as keyof typeof scores.service] || 0;
    totalScore += scores.principalProfile[answers.principalProfile as keyof typeof scores.principalProfile] || 0;
    totalScore += scores.locations[answers.locations as keyof typeof scores.locations] || 0;
    totalScore += scores.threatHistory[answers.threatHistory as keyof typeof scores.threatHistory] || 0;
    totalScore += (scores.perceivedRisk[answers.perceivedRisk as keyof typeof scores.perceivedRisk] || 0) * 2;
    
    return totalScore;
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const getThreatLevel = (): { level: string, color: string, advice: string } => {
      const scores = {
          service: { protection: 4, executive: 2, airport: 1, event: 2 },
          principalProfile: { private: 1, corporate: 2, publicFigure: 4, other: 3 },
          locations: { routine: 1, varied: 2, highRisk: 4, secure: 1 },
          threatHistory: { none: 1, unwanted: 2, indirect: 3, direct: 4 },
          perceivedRisk: { low: 1, moderate: 2, substantial: 3, severe: 4 }
      };
      
      let totalScore = 0;
      totalScore += scores.service[answers.service as keyof typeof scores.service] || 0;
      totalScore += scores.principalProfile[answers.principalProfile as keyof typeof scores.principalProfile] || 0;
      totalScore += scores.locations[answers.locations as keyof typeof scores.locations] || 0;
      totalScore += scores.threatHistory[answers.threatHistory as keyof typeof scores.threatHistory] || 0;
      totalScore += (scores.perceivedRisk[answers.perceivedRisk as keyof typeof scores.perceivedRisk] || 0) * 2;

      if (totalScore >= 16) return { level: 'Severe / Critical', color: 'text-red-500', advice: 'Requires immediate, comprehensive security planning. A specialist will contact you urgently.' };
      if (totalScore >= 12) return { level: 'Substantial', color: 'text-orange-500', advice: 'Requires a dedicated security detail and threat mitigation plan.' };
      if (totalScore >= 7) return { level: 'Moderate', color: 'text-yellow-500', advice: 'A professional security driver and vehicle is strongly recommended.' };
      return { level: 'Low', color: 'text-green-500', advice: 'A professional security driver provides peace of mind and enhanced safety.' };
  }

  const currentQuestion = assessmentQuestions[currentStep];
  const progressPercentage = (currentStep / (assessmentQuestions.length -1)) * 100;

  if (isCompleted) {
      const finalAssessment = getThreatLevel();
      return (
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8 sm:p-10 lg:p-12 rounded-2xl border border-yellow-500/30 w-full max-w-3xl mx-auto shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Assessment Complete</h2>
              <p className="text-gray-300 mb-6">Thank you for providing this information. Here is our preliminary assessment:</p>
              
              {/* Save Status Messages */}
              {saving && (
                <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-500 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                    <span className="text-blue-300">Saving your assessment...</span>
                  </div>
                </div>
              )}
              
              {saveStatus === 'success' && (
                <div className="bg-green-900/50 p-4 rounded-xl border border-green-500 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">Assessment saved successfully!</span>
                  </div>
                </div>
              )}
              
              {saveStatus === 'error' && (
                <div className="bg-red-900/50 p-4 rounded-xl border border-red-500 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-red-300">Failed to save assessment. Please try again.</span>
                  </div>
                </div>
              )}
              
              <div className="bg-black/50 p-6 rounded-xl border border-gray-700 mb-8">
                  <p className="text-lg text-gray-400 mb-2">Initial Threat Assessment</p>
                  <p className={`text-4xl font-extrabold ${finalAssessment.color}`}>{finalAssessment.level}</p>
              </div>

              <div className="bg-black/50 p-6 rounded-xl border border-gray-700 mb-8">
                 <p className="text-lg text-gray-400 mb-2">Recommended Action</p>
                 <p className="text-white text-lg">{finalAssessment.advice}</p>
              </div>

              <p className="text-gray-400 mb-6 text-sm">A member of our senior security team will contact you within 24 hours to conduct a confidential consultation and provide a detailed operational plan and quote.</p>
              
              <button 
                onClick={() => { 
                  setIsCompleted(false); 
                  setCurrentStep(0); 
                  setAnswers({}); 
                  setSaveStatus('idle');
                }} 
                className="w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors"
              >
                  Start New Assessment
              </button>
          </div>
      )
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-6 sm:p-8 lg:p-10 rounded-2xl border border-yellow-500/30 w-full max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 bg-black/50 px-4 py-2 rounded-full mb-4">
            <Shield className="w-6 h-6 text-yellow-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-white">SIA-Compliant Security Assessment</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">This confidential assessment helps us understand your needs, aligning with "Know Your Client" best practices.</p>
        </div>

        <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <currentQuestion.stepIcon className="w-5 h-5 text-yellow-500" />
                    <span className="text-white font-semibold">{currentQuestion.stepTitle}</span>
                </div>
                <span className="text-xs text-gray-400">Step {currentStep + 1} of {assessmentQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                className="bg-yellow-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
            </div>
        </div>
        
        <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-xl sm:text-2xl font-bold text-center text-white mb-6">
                        {currentQuestion.questionText}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentQuestion.options.map(option => (
                        <button
                            key={option.id}
                            onClick={() => handleAnswer(currentQuestion.id, option.id)}
                            className="group p-4 border-2 rounded-xl transition-all duration-200 text-left flex items-center gap-4 border-gray-700 bg-gray-800/50 hover:border-yellow-500 hover:bg-gray-800"
                        >
                            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-yellow-500 transition-colors">
                                <option.icon className="w-5 h-5 text-yellow-500 group-hover:text-black transition-colors" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">{option.text}</h3>
                                {option.subtext && <p className="text-sm text-gray-400">{option.subtext}</p>}
                            </div>
                        </button>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-gray-600"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  )
}