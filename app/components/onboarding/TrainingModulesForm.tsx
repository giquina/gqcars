'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Play, 
  CheckCircle, 
  Clock,
  BookOpen,
  Award,
  FileText,
  Target,
  Shield,
  Car,
  Users,
  AlertTriangle,
  Lock
} from 'lucide-react';

interface TrainingModulesFormProps {
  onComplete: (data: any) => void;
  initialData?: any;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'text' | 'interactive' | 'quiz';
  category: string;
  required: boolean;
  completed: boolean;
  score?: number;
  content: string;
  questions?: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Progress {
  totalModules: number;
  completedModules: number;
  totalDuration: number;
  completedDuration: number;
  overallScore: number;
}

export default function TrainingModulesForm({ onComplete, initialData }: TrainingModulesFormProps) {
  const [modules, setModules] = useState<TrainingModule[]>([
    {
      id: 'sia_basics',
      title: 'SIA Regulations & Standards',
      description: 'Understanding SIA requirements and professional standards',
      duration: 45,
      type: 'video',
      category: 'Regulatory',
      required: true,
      completed: false,
      content: 'This module covers the fundamental SIA regulations, licensing requirements, and professional standards that all security personnel must understand and adhere to.'
    },
    {
      id: 'customer_service',
      title: 'Professional Customer Service',
      description: 'Delivering exceptional service in security environments',
      duration: 30,
      type: 'interactive',
      category: 'Service',
      required: true,
      completed: false,
      content: 'Learn how to provide professional, courteous service while maintaining security protocols. Covers communication techniques, conflict resolution, and professional presentation.'
    },
    {
      id: 'threat_assessment',
      title: 'Threat Assessment & Risk Management',
      description: 'Identifying and responding to security threats',
      duration: 60,
      type: 'video',
      category: 'Security',
      required: true,
      completed: false,
      content: 'Comprehensive training on identifying potential threats, assessing risk levels, and implementing appropriate response protocols.'
    },
    {
      id: 'vehicle_security',
      title: 'Vehicle Security Protocols',
      description: 'Secure transportation and vehicle safety procedures',
      duration: 40,
      type: 'interactive',
      category: 'Operations',
      required: true,
      completed: false,
      content: 'Detailed protocols for secure vehicle operations, passenger safety, route planning, and emergency procedures.'
    },
    {
      id: 'emergency_response',
      title: 'Emergency Response Procedures',
      description: 'Critical incident management and emergency protocols',
      duration: 50,
      type: 'video',
      category: 'Emergency',
      required: true,
      completed: false,
      content: 'Training on emergency response procedures, incident reporting, communication protocols, and coordination with emergency services.'
    },
    {
      id: 'legal_compliance',
      title: 'Legal Framework & Compliance',
      description: 'Understanding legal obligations and compliance requirements',
      duration: 35,
      type: 'text',
      category: 'Legal',
      required: true,
      completed: false,
      content: 'Overview of relevant legislation, compliance requirements, data protection, and legal obligations for security personnel.'
    },
    {
      id: 'final_assessment',
      title: 'Final Knowledge Assessment',
      description: 'Comprehensive assessment of all training modules',
      duration: 45,
      type: 'quiz',
      category: 'Assessment',
      required: true,
      completed: false,
      content: 'Final comprehensive assessment covering all training areas.',
      questions: [
        {
          id: 'q1',
          question: 'What is the minimum Enhanced DBS certificate requirement for SIA licensing?',
          options: [
            'Certificate must be less than 6 months old',
            'Certificate must be less than 12 months old',
            'Certificate must be less than 24 months old',
            'No time requirement'
          ],
          correctAnswer: 1,
          explanation: 'Enhanced DBS certificates must be less than 12 months old for SIA licensing applications.'
        },
        {
          id: 'q2',
          question: 'In a threat assessment situation, what is the first priority?',
          options: [
            'Neutralize the threat',
            'Call for backup',
            'Ensure personal safety',
            'Document the incident'
          ],
          correctAnswer: 2,
          explanation: 'Personal safety is always the first priority in any threat assessment situation.'
        },
        {
          id: 'q3',
          question: 'What should you do if a client requests you to exceed legal speed limits?',
          options: [
            'Comply with the client\'s request',
            'Politely decline and explain legal obligations',
            'Ignore the request',
            'Report the client to authorities'
          ],
          correctAnswer: 1,
          explanation: 'You must politely decline and explain your legal obligations. Safety and legal compliance always take priority.'
        }
      ]
    }
  ]);

  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [moduleId: string]: { [questionId: string]: number } }>({});
  const [moduleProgress, setModuleProgress] = useState<{ [moduleId: string]: number }>({});

  const calculateProgress = (): Progress => {
    const totalModules = modules.length;
    const completedModules = modules.filter(m => m.completed).length;
    const totalDuration = modules.reduce((sum, m) => sum + m.duration, 0);
    const completedDuration = modules.filter(m => m.completed).reduce((sum, m) => sum + m.duration, 0);
    const scores = modules.filter(m => m.score !== undefined).map(m => m.score!);
    const overallScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 0;

    return {
      totalModules,
      completedModules,
      totalDuration,
      completedDuration,
      overallScore
    };
  };

  const startModule = (moduleId: string) => {
    setCurrentModule(moduleId);
    if (moduleProgress[moduleId] === undefined) {
      setModuleProgress(prev => ({ ...prev, [moduleId]: 0 }));
    }
  };

  const completeModule = (moduleId: string, score?: number) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, completed: true, score }
        : module
    ));
    setModuleProgress(prev => ({ ...prev, [moduleId]: 100 }));
    setCurrentModule(null);
  };

  const handleQuizAnswer = (moduleId: string, questionId: string, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [questionId]: answerIndex
      }
    }));
  };

  const submitQuiz = (moduleId: string) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module || !module.questions) return;

    const answers = quizAnswers[moduleId] || {};
    let correctAnswers = 0;

    module.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = (correctAnswers / module.questions.length) * 100;
    completeModule(moduleId, score);
  };

  const simulateModuleProgress = (moduleId: string) => {
    const duration = modules.find(m => m.id === moduleId)?.duration || 30;
    const progressTime = duration * 1000; // Convert to milliseconds
    const updateInterval = 100; // Update every 100ms
    const totalUpdates = progressTime / updateInterval;
    let currentUpdate = 0;

    const interval = setInterval(() => {
      currentUpdate++;
      const progress = (currentUpdate / totalUpdates) * 100;
      
      setModuleProgress(prev => ({ ...prev, [moduleId]: Math.min(progress, 100) }));

      if (currentUpdate >= totalUpdates) {
        clearInterval(interval);
        if (moduleId !== 'final_assessment') {
          completeModule(moduleId, Math.floor(Math.random() * 20) + 80); // Random score 80-100
        }
      }
    }, updateInterval);
  };

  const progress = calculateProgress();
  const canComplete = progress.completedModules === progress.totalModules && progress.overallScore >= 80;

  const handleComplete = () => {
    if (canComplete) {
      onComplete({
        modules,
        progress,
        completedAt: new Date().toISOString(),
        certificateEarned: true
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Progress Overview */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
          <GraduationCap className="w-5 h-5 mr-2 text-yellow-500" />
          Training Progress Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{progress.completedModules}</div>
            <div className="text-sm text-gray-400">of {progress.totalModules} Modules</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(progress.completedModules / progress.totalModules) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{progress.completedDuration}</div>
            <div className="text-sm text-gray-400">of {progress.totalDuration} Minutes</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-400 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(progress.completedDuration / progress.totalDuration) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{Math.round(progress.overallScore)}%</div>
            <div className="text-sm text-gray-400">Average Score</div>
            <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress.overallScore}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`text-2xl font-bold ${canComplete ? 'text-green-400' : 'text-gray-400'}`}>
              {canComplete ? '✓' : '○'}
            </div>
            <div className="text-sm text-gray-400">Certification Ready</div>
            <div className="text-xs mt-1 text-gray-500">
              {canComplete ? 'Ready to complete' : 'Finish all modules (80%+ score)'}
            </div>
          </div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-yellow-500" />
          Training Modules
        </h3>

        {['Regulatory', 'Service', 'Security', 'Operations', 'Emergency', 'Legal', 'Assessment'].map(category => (
          <div key={category} className="bg-gray-800 p-6 rounded-lg">
            <h4 className="text-white font-medium mb-4 text-sm uppercase tracking-wide">
              {category}
            </h4>
            
            <div className="space-y-4">
              {modules
                .filter(module => module.category === category)
                .map(module => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    isActive={currentModule === module.id}
                    progress={moduleProgress[module.id] || 0}
                    onStart={() => startModule(module.id)}
                    onSimulate={() => simulateModuleProgress(module.id)}
                    quizAnswers={quizAnswers[module.id]}
                    onQuizAnswer={(questionId, answerIndex) => handleQuizAnswer(module.id, questionId, answerIndex)}
                    onSubmitQuiz={() => submitQuiz(module.id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certification Section */}
      {canComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 p-6 rounded-lg"
        >
          <h3 className="text-yellow-400 font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Training Certification Complete
          </h3>
          <p className="text-yellow-200 mb-4">
            Congratulations! You have successfully completed all required training modules with a passing score. 
            You are now ready to proceed with your driver onboarding.
          </p>
          <div className="flex items-center space-x-4 text-sm text-yellow-300">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>All modules completed</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>Average score: {Math.round(progress.overallScore)}%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{progress.completedDuration} minutes completed</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={!canComplete}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          canComplete
            ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
        }`}
      >
        {canComplete 
          ? 'Complete Training & Continue to Final Review' 
          : `Complete All Modules (${progress.completedModules}/${progress.totalModules})`
        }
      </button>
    </motion.div>
  );
}

// Module Card Component
interface ModuleCardProps {
  module: TrainingModule;
  isActive: boolean;
  progress: number;
  onStart: () => void;
  onSimulate: () => void;
  quizAnswers?: { [questionId: string]: number };
  onQuizAnswer: (questionId: string, answerIndex: number) => void;
  onSubmitQuiz: () => void;
}

function ModuleCard({ 
  module, 
  isActive, 
  progress, 
  onStart, 
  onSimulate,
  quizAnswers,
  onQuizAnswer,
  onSubmitQuiz
}: ModuleCardProps) {
  const getIcon = () => {
    switch (module.category) {
      case 'Regulatory': return Shield;
      case 'Service': return Users;
      case 'Security': return Shield;
      case 'Operations': return Car;
      case 'Emergency': return AlertTriangle;
      case 'Legal': return FileText;
      case 'Assessment': return Target;
      default: return BookOpen;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className={`border rounded-lg p-4 transition-colors ${
      module.completed ? 'border-green-500 bg-green-500/5' : 
      isActive ? 'border-yellow-500 bg-yellow-500/5' : 
      'border-gray-700 bg-gray-700/50'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            module.completed ? 'bg-green-600' :
            isActive ? 'bg-yellow-600' : 'bg-gray-600'
          }`}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>
          <div>
            <h5 className="text-white font-medium">{module.title}</h5>
            <p className="text-gray-400 text-sm">{module.description}</p>
            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
              <span>{module.duration} minutes</span>
              <span className="capitalize">{module.type}</span>
              {module.required && <span className="text-red-400">Required</span>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {module.completed && (
            <div className="text-green-400 text-sm font-medium">
              {module.score && `${Math.round(module.score)}%`}
            </div>
          )}
          {module.completed ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : isActive ? (
            <Clock className="w-5 h-5 text-yellow-500" />
          ) : (
            <button
              onClick={onStart}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
            >
              <Play className="w-3 h-3" />
              <span>Start</span>
            </button>
          )}
        </div>
      </div>

      {/* Module Content */}
      {isActive && !module.completed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 p-4 bg-gray-600 rounded-lg"
        >
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300">Progress</span>
              <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="text-gray-300 text-sm mb-4">
            {module.content}
          </div>

          {module.type === 'quiz' && module.questions ? (
            <div className="space-y-4">
              {module.questions.map(question => (
                <div key={question.id} className="p-3 bg-gray-700 rounded-lg">
                  <h6 className="text-white font-medium mb-3">{question.question}</h6>
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <label key={index} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`${module.id}_${question.id}`}
                          value={index}
                          checked={quizAnswers?.[question.id] === index}
                          onChange={() => onQuizAnswer(question.id, index)}
                          className="text-yellow-500"
                        />
                        <span className="text-gray-300 text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              
              <button
                onClick={onSubmitQuiz}
                disabled={!module.questions.every(q => quizAnswers?.[q.id] !== undefined)}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Submit Assessment
              </button>
            </div>
          ) : (
            <button
              onClick={onSimulate}
              disabled={progress > 0}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              {progress > 0 ? 'In Progress...' : 'Start Module'}
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}