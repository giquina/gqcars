'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, User, MapPin, History, Zap, BarChart, ChevronLeft, CheckCircle, Briefcase, Users, Plane, Heart, Crown, ShoppingBag } from 'lucide-react'

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
    stepTitle: 'Your Trip',
    stepIcon: Zap,
    questionText: 'Where would you like to go?',
    type: 'multiple-choice',
    options: [
      { id: 'protection', text: 'Personal Trip', subtext: 'Going somewhere with family or friends', icon: Shield },
      { id: 'executive', text: 'Work Trip', subtext: 'Going to meetings or work events', icon: Briefcase },
      { id: 'airport', text: 'Airport Pickup/Dropoff', subtext: 'Need a ride to/from the airport', icon: Plane },
      { id: 'event', text: 'Special Day Out', subtext: 'Wedding, party or special occasion', icon: Heart },
    ]
  },
  {
    id: 'principalProfile',
    stepTitle: 'About You',
    stepIcon: User,
    questionText: 'Which sounds most like you?',
    type: 'multiple-choice',
    options: [
      { id: 'private', text: 'Regular Person', subtext: 'Just need a reliable ride', icon: Users },
      { id: 'corporate', text: 'Business Person', subtext: 'Need to look professional for work', icon: Briefcase },
      { id: 'publicFigure', text: 'Well-Known Person', subtext: 'Need extra privacy from the public', icon: Crown },
      { id: 'other', text: 'Rather Not Say', subtext: 'Prefer to keep details private', icon: Shield },
    ]
  },
  {
    id: 'locations',
    stepTitle: 'Places',
    stepIcon: MapPin,
    questionText: 'Where will you be going?',
    type: 'multiple-choice',
    options: [
      { id: 'routine', text: 'Places I Know', subtext: 'Regular places like home or work', icon: MapPin },
      { id: 'varied', text: 'Different Places', subtext: 'Shops, restaurants, or meeting spots', icon: ShoppingBag },
      { id: 'highRisk', text: 'Busy Areas', subtext: 'City centers or crowded places', icon: Shield },
      { id: 'secure', text: 'Private Places', subtext: 'Private homes or special locations', icon: CheckCircle },
    ]
  },
  {
    id: 'threatHistory',
    stepTitle: 'Privacy',
    stepIcon: History,
    questionText: 'How private would you like your ride to be?',
    type: 'multiple-choice',
    options: [
      { id: 'none', text: 'Normal Service', subtext: 'Just a regular professional ride', icon: CheckCircle },
      { id: 'unwanted', text: 'Extra Private', subtext: 'Would like more privacy', icon: Users },
      { id: 'indirect', text: 'Very Private', subtext: 'Need lots of privacy', icon: Zap },
      { id: 'direct', text: 'Super Private', subtext: 'Need maximum privacy', icon: Shield },
    ]
  },
  {
    id: 'perceivedRisk',
    stepTitle: 'Service Type',
    stepIcon: BarChart,
    questionText: 'What kind of service would you like?',
    type: 'multiple-choice',
    options: [
      { id: 'low', text: 'Basic', subtext: 'Simple professional ride', icon: BarChart },
      { id: 'moderate', text: 'Extra Nice', subtext: 'Added comfort and care', icon: BarChart },
      { id: 'substantial', text: 'Premium', subtext: 'VIP treatment', icon: BarChart },
      { id: 'severe', text: 'Ultimate', subtext: 'The very best service', icon: BarChart },
    ]
  }
];

export default function SecurityAssessment({ questions, onComplete }: { questions: any[], onComplete: (answers: Record<number, string>) => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < assessmentQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsCompleted(true);
      }
    }, 300);
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

      if (totalScore >= 16) return { level: 'Ultimate Service', color: 'text-purple-500', advice: 'Our best service with a luxury car and specially trained driver just for you.' };
      if (totalScore >= 12) return { level: 'Premium Service', color: 'text-blue-500', advice: 'Extra special service with a skilled driver and nice car.' };
      if (totalScore >= 7) return { level: 'Extra Nice Service', color: 'text-yellow-500', advice: 'Professional service with added comfort and care.' };
      return { level: 'Basic Service', color: 'text-green-500', advice: 'Safe and reliable ride with a professional driver.' };
  }

  const currentQuestion = assessmentQuestions[currentStep];
  const progressPercentage = (currentStep / (assessmentQuestions.length -1)) * 100;

  if (isCompleted) {
      const finalAssessment = getThreatLevel();
      return (
          <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-black p-8 sm:p-10 lg:p-12 rounded-2xl border border-yellow-500/30 w-full max-w-3xl mx-auto shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Assessment Complete</h2>
              <p className="text-gray-300 mb-6">Thank you for providing this information. Here is our preliminary assessment:</p>
              
              <div className="bg-black/50 p-6 rounded-xl border border-gray-700 mb-8">
                  <p className="text-lg text-gray-400 mb-2">Initial Threat Assessment</p>
                  <p className={`text-4xl font-extrabold ${finalAssessment.color}`}>{finalAssessment.level}</p>
              </div>

              <div className="bg-black/50 p-6 rounded-xl border border-gray-700 mb-8">
                 <p className="text-lg text-gray-400 mb-2">Recommended Action</p>
                 <p className="text-white text-lg">{finalAssessment.advice}</p>
              </div>

              <p className="text-gray-400 mb-6 text-sm">A member of our senior security team will contact you within 24 hours to conduct a confidential consultation and provide a detailed operational plan and quote.</p>
              
              <button onClick={() => { setIsCompleted(false); setCurrentStep(0); setAnswers({}) }} className="w-full bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-400 transition-colors">
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
            <h1 className="text-xl sm:text-2xl font-bold text-white">Let's Get You the Perfect Ride</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base">Answer a few quick questions so we can match you with the best ride. Your answers are private and help us keep you safe and comfortable.</p>
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
                    transition={{ duration: 0.4 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{currentQuestion.questionText}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswer(currentQuestion.id, option.id)}
                                className="group flex flex-col items-start sm:items-center bg-gray-800/70 border-2 border-transparent hover:border-yellow-400 focus:border-yellow-400 rounded-2xl p-6 transition-all shadow-lg hover:shadow-yellow-500/10 focus:shadow-yellow-500/20 outline-none focus:outline-none min-h-[120px] text-left sm:text-center"
                                tabIndex={0}
                            >
                                <option.icon className="w-8 h-8 mb-3 text-yellow-400 group-hover:scale-110 group-focus:scale-110 transition-transform" />
                                <span className="text-lg font-bold text-white mb-1">{option.text}</span>
                                {option.subtext && <span className="text-gray-300 text-sm">{option.subtext}</span>}
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