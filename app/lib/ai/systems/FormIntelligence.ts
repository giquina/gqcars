// Form Intelligence System for GQ Cars
// Provides smart form assistance, validation, auto-completion, and UX optimization

import { AISystemConfig } from '../AIOrchestrator'

export interface FormField {
  id: string
  name: string
  type: 'text' | 'email' | 'phone' | 'date' | 'time' | 'select' | 'textarea' | 'checkbox' | 'radio'
  value: any
  label: string
  placeholder?: string
  required: boolean
  validation: ValidationRule[]
  suggestions?: string[]
  metadata?: FieldMetadata
}

export interface FieldMetadata {
  priority: 'high' | 'medium' | 'low'
  category: string
  dependsOn?: string[]
  triggers?: string[]
  analytics: FieldAnalytics
}

export interface FieldAnalytics {
  completionRate: number
  errorRate: number
  abandonmentRate: number
  averageTime: number
  commonErrors: string[]
  suggestionAcceptanceRate: number
}

export interface ValidationRule {
  type: 'required' | 'email' | 'phone' | 'date' | 'time' | 'length' | 'pattern' | 'custom'
  message: string
  parameters?: any
  severity: 'error' | 'warning' | 'info'
}

export interface FormSession {
  id: string
  userId?: string
  formType: string
  fields: FormField[]
  currentStep: number
  totalSteps: number
  startTime: Date
  lastActivity: Date
  completionPercentage: number
  predictions: FormPrediction[]
  assistance: FormAssistance[]
  status: 'active' | 'completed' | 'abandoned' | 'error'
}

export interface FormPrediction {
  fieldId: string
  predictedValue: any
  confidence: number
  source: 'historical' | 'pattern' | 'context' | 'ai'
  reasoning: string
}

export interface FormAssistance {
  type: 'suggestion' | 'validation' | 'completion' | 'guidance' | 'error'
  fieldId?: string
  message: string
  action?: FormAction
  priority: 'high' | 'medium' | 'low'
  timestamp: Date
}

export interface FormAction {
  type: 'prefill' | 'validate' | 'navigate' | 'submit' | 'save'
  parameters: any
  description: string
}

export interface FormOptimization {
  fieldOrder: string[]
  conditionalFields: ConditionalField[]
  progressIndicators: ProgressIndicator[]
  validationTiming: ValidationTiming
  assistanceSettings: AssistanceSettings
}

export interface ConditionalField {
  fieldId: string
  condition: FieldCondition
  action: 'show' | 'hide' | 'require' | 'suggest'
}

export interface FieldCondition {
  dependentField: string
  operator: 'equals' | 'contains' | 'greater' | 'less' | 'not_equals'
  value: any
}

export interface ProgressIndicator {
  step: number
  label: string
  description: string
  estimatedTime: number
  required: boolean
}

export interface ValidationTiming {
  onBlur: boolean
  onSubmit: boolean
  realTime: boolean
  debounceMs: number
}

export interface AssistanceSettings {
  enablePredictions: boolean
  enableSuggestions: boolean
  enableAutoComplete: boolean
  enableGuidance: boolean
  assistanceLevel: 'minimal' | 'standard' | 'comprehensive'
}

export class FormIntelligence {
  private config: AISystemConfig
  private sessions: Map<string, FormSession> = new Map()
  private predictor: FormPredictor
  private validator: SmartValidator
  private optimizer: FormOptimizer
  private analytics: FormAnalytics

  constructor(config: AISystemConfig) {
    this.config = config
    this.predictor = new FormPredictor()
    this.validator = new SmartValidator()
    this.optimizer = new FormOptimizer()
    this.analytics = new FormAnalytics()
  }

  // Session Management
  async createSession(formType: string, userId?: string): Promise<FormSession> {
    const sessionId = this.generateSessionId()
    
    const session: FormSession = {
      id: sessionId,
      userId,
      formType,
      fields: await this.initializeFields(formType),
      currentStep: 1,
      totalSteps: await this.calculateTotalSteps(formType),
      startTime: new Date(),
      lastActivity: new Date(),
      completionPercentage: 0,
      predictions: [],
      assistance: [],
      status: 'active'
    }

    // Apply form optimization
    const optimization = await this.optimizer.optimize(session)
    session.fields = this.applyOptimization(session.fields, optimization)

    // Generate initial predictions
    session.predictions = await this.predictor.generatePredictions(session)

    this.sessions.set(sessionId, session)
    this.analytics.trackSessionStart(session)

    return session
  }

  async updateField(sessionId: string, fieldId: string, value: any): Promise<FormAssistance[]> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      throw new Error(`Session ${sessionId} not found`)
    }

    const field = session.fields.find(f => f.id === fieldId)
    if (!field) {
      throw new Error(`Field ${fieldId} not found`)
    }

    // Update field value
    const previousValue = field.value
    field.value = value
    session.lastActivity = new Date()

    // Track field interaction
    this.analytics.trackFieldInteraction(session, field, previousValue, value)

    // Validate field
    const validationResults = await this.validator.validateField(field, session)
    
    // Generate predictions for dependent fields
    const newPredictions = await this.predictor.generatePredictionsForField(session, fieldId, value)
    session.predictions = [...session.predictions.filter(p => p.fieldId !== fieldId), ...newPredictions]

    // Generate assistance
    const assistance = await this.generateAssistance(session, field, validationResults)
    session.assistance.push(...assistance)

    // Update completion percentage
    session.completionPercentage = this.calculateCompletionPercentage(session)

    // Check for form completion
    if (this.isFormComplete(session)) {
      session.status = 'completed'
      this.analytics.trackFormCompletion(session)
    }

    return assistance
  }

  async validateForm(sessionId: string): Promise<ValidationResult> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      throw new Error(`Session ${sessionId} not found`)
    }

    const validationResults = await this.validator.validateForm(session)
    
    // Generate comprehensive assistance for errors
    const assistance = await this.generateValidationAssistance(session, validationResults)
    session.assistance.push(...assistance)

    return {
      isValid: validationResults.every(r => r.isValid),
      fieldResults: validationResults,
      assistance,
      completionPercentage: session.completionPercentage
    }
  }

  async submitForm(sessionId: string): Promise<FormSubmissionResult> {
    const session = this.sessions.get(sessionId)
    if (!session) {
      throw new Error(`Session ${sessionId} not found`)
    }

    // Final validation
    const validation = await this.validateForm(sessionId)
    if (!validation.isValid) {
      return {
        success: false,
        errors: validation.fieldResults.filter(r => !r.isValid),
        assistance: validation.assistance
      }
    }

    // Process form submission
    const submissionData = this.prepareSubmissionData(session)
    
    try {
      // Submit to backend
      const result = await this.processSubmission(submissionData)
      
      session.status = 'completed'
      this.analytics.trackFormSubmission(session, true)

      return {
        success: true,
        data: result,
        sessionId: session.id
      }

    } catch (error) {
      this.analytics.trackFormSubmission(session, false)
      return {
        success: false,
        errors: [{ fieldId: '', message: 'Submission failed. Please try again.' }],
        assistance: [{
          type: 'error',
          message: 'There was an error submitting your form. Please check your connection and try again.',
          priority: 'high',
          timestamp: new Date()
        }]
      }
    }
  }

  // Smart Features
  async getSuggestions(sessionId: string, fieldId: string, query: string): Promise<string[]> {
    const session = this.sessions.get(sessionId)
    if (!session) return []

    const field = session.fields.find(f => f.id === fieldId)
    if (!field) return []

    return await this.predictor.getSuggestions(field, query, session)
  }

  async autoComplete(sessionId: string, fieldId: string): Promise<any> {
    const session = this.sessions.get(sessionId)
    if (!session) return null

    const prediction = session.predictions.find(p => p.fieldId === fieldId)
    if (!prediction || prediction.confidence < 0.8) return null

    return prediction.predictedValue
  }

  async getContextualHelp(sessionId: string, fieldId: string): Promise<FormAssistance[]> {
    const session = this.sessions.get(sessionId)
    if (!session) return []

    const field = session.fields.find(f => f.id === fieldId)
    if (!field) return []

    return await this.generateContextualHelp(session, field)
  }

  // Private Methods
  private async initializeFields(formType: string): Promise<FormField[]> {
    const fieldTemplates = await this.getFieldTemplates(formType)
    return fieldTemplates.map(template => ({
      ...template,
      value: null,
      suggestions: [],
      metadata: {
        ...template.metadata,
        analytics: {
          completionRate: 0,
          errorRate: 0,
          abandonmentRate: 0,
          averageTime: 0,
          commonErrors: [],
          suggestionAcceptanceRate: 0
        }
      }
    }))
  }

  private async getFieldTemplates(formType: string): Promise<Partial<FormField>[]> {
    const templates: Record<string, Partial<FormField>[]> = {
      'booking': [
        {
          id: 'service',
          name: 'service',
          type: 'select',
          label: 'Service Type',
          required: true,
          validation: [{ type: 'required', message: 'Please select a service', severity: 'error' }],
          metadata: { priority: 'high', category: 'service' }
        },
        {
          id: 'date',
          name: 'date',
          type: 'date',
          label: 'Service Date',
          required: true,
          validation: [
            { type: 'required', message: 'Please select a date', severity: 'error' },
            { type: 'date', message: 'Please select a future date', severity: 'error' }
          ],
          metadata: { priority: 'high', category: 'schedule' }
        },
        {
          id: 'time',
          name: 'time',
          type: 'time',
          label: 'Service Time',
          required: true,
          validation: [{ type: 'required', message: 'Please select a time', severity: 'error' }],
          metadata: { priority: 'high', category: 'schedule' }
        },
        {
          id: 'location',
          name: 'location',
          type: 'text',
          label: 'Service Location',
          required: true,
          validation: [{ type: 'required', message: 'Please enter a location', severity: 'error' }],
          metadata: { priority: 'high', category: 'location' }
        },
        {
          id: 'duration',
          name: 'duration',
          type: 'select',
          label: 'Duration',
          required: true,
          validation: [{ type: 'required', message: 'Please select duration', severity: 'error' }],
          metadata: { priority: 'medium', category: 'service' }
        },
        {
          id: 'name',
          name: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
          validation: [{ type: 'required', message: 'Please enter your name', severity: 'error' }],
          metadata: { priority: 'high', category: 'contact' }
        },
        {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          validation: [
            { type: 'required', message: 'Please enter your email', severity: 'error' },
            { type: 'email', message: 'Please enter a valid email', severity: 'error' }
          ],
          metadata: { priority: 'high', category: 'contact' }
        },
        {
          id: 'phone',
          name: 'phone',
          type: 'phone',
          label: 'Phone Number',
          required: true,
          validation: [
            { type: 'required', message: 'Please enter your phone number', severity: 'error' },
            { type: 'phone', message: 'Please enter a valid phone number', severity: 'error' }
          ],
          metadata: { priority: 'high', category: 'contact' }
        },
        {
          id: 'requirements',
          name: 'requirements',
          type: 'textarea',
          label: 'Special Requirements',
          required: false,
          validation: [],
          metadata: { priority: 'low', category: 'details' }
        }
      ]
    }

    return templates[formType] || []
  }

  private async calculateTotalSteps(formType: string): Promise<number> {
    // Calculate steps based on form complexity
    const stepMapping: Record<string, number> = {
      'booking': 3,
      'quote': 2,
      'contact': 1
    }
    return stepMapping[formType] || 1
  }

  private applyOptimization(fields: FormField[], optimization: FormOptimization): FormField[] {
    // Apply field ordering and conditional logic
    return optimization.fieldOrder
      .map(fieldId => fields.find(f => f.id === fieldId))
      .filter(Boolean) as FormField[]
  }

  private async generateAssistance(
    session: FormSession, 
    field: FormField, 
    validationResults: FieldValidationResult[]
  ): Promise<FormAssistance[]> {
    const assistance: FormAssistance[] = []

    // Add validation errors
    for (const result of validationResults.filter(r => !r.isValid)) {
      assistance.push({
        type: 'validation',
        fieldId: field.id,
        message: result.message,
        priority: result.severity === 'error' ? 'high' : 'medium',
        timestamp: new Date()
      })
    }

    // Add suggestions
    if (field.type === 'text' && field.value && field.value.length > 2) {
      const suggestions = await this.getSuggestions(session.id, field.id, field.value)
      if (suggestions.length > 0) {
        assistance.push({
          type: 'suggestion',
          fieldId: field.id,
          message: `Did you mean: ${suggestions.slice(0, 3).join(', ')}?`,
          priority: 'low',
          timestamp: new Date()
        })
      }
    }

    return assistance
  }

  private async generateContextualHelp(session: FormSession, field: FormField): Promise<FormAssistance[]> {
    const help: FormAssistance[] = []

    // Generate contextual help based on field type and user behavior
    if (field.type === 'date' && field.id === 'date') {
      help.push({
        type: 'guidance',
        fieldId: field.id,
        message: 'We recommend booking at least 4 hours in advance for optimal service availability.',
        priority: 'low',
        timestamp: new Date()
      })
    }

    if (field.type === 'phone') {
      help.push({
        type: 'guidance',
        fieldId: field.id,
        message: 'Please include country code if calling from outside the UK.',
        priority: 'low',
        timestamp: new Date()
      })
    }

    return help
  }

  private calculateCompletionPercentage(session: FormSession): number {
    const requiredFields = session.fields.filter(f => f.required)
    const completedFields = requiredFields.filter(f => f.value && f.value !== '')
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  private isFormComplete(session: FormSession): boolean {
    return session.completionPercentage === 100
  }

  private prepareSubmissionData(session: FormSession): any {
    const data: any = {}
    for (const field of session.fields) {
      if (field.value !== null && field.value !== '') {
        data[field.name] = field.value
      }
    }
    return data
  }

  private async processSubmission(data: any): Promise<any> {
    // Process form submission - integrate with backend
    return { success: true, id: `SUB${Date.now()}` }
  }

  private generateSessionId(): string {
    return `FS${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Supporting interfaces and classes
export interface ValidationResult {
  isValid: boolean
  fieldResults: FieldValidationResult[]
  assistance: FormAssistance[]
  completionPercentage: number
}

export interface FieldValidationResult {
  fieldId: string
  isValid: boolean
  message: string
  severity: 'error' | 'warning' | 'info'
}

export interface FormSubmissionResult {
  success: boolean
  data?: any
  sessionId?: string
  errors?: FieldValidationResult[]
  assistance?: FormAssistance[]
}

// Supporting classes
class FormPredictor {
  async generatePredictions(session: FormSession): Promise<FormPrediction[]> {
    // Generate initial predictions based on user profile and context
    return []
  }

  async generatePredictionsForField(session: FormSession, fieldId: string, value: any): Promise<FormPrediction[]> {
    // Generate predictions for related fields based on current input
    return []
  }

  async getSuggestions(field: FormField, query: string, session: FormSession): Promise<string[]> {
    // Generate suggestions based on query and context
    if (field.id === 'location') {
      return this.getLocationSuggestions(query)
    }
    return []
  }

  private getLocationSuggestions(query: string): string[] {
    const commonLocations = [
      'Heathrow Airport', 'Gatwick Airport', 'Stansted Airport', 'Luton Airport',
      'Central London', 'Watford', 'St Albans', 'Harrow', 'Uxbridge'
    ]
    return commonLocations.filter(loc => 
      loc.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
  }
}

class SmartValidator {
  async validateField(field: FormField, session: FormSession): Promise<FieldValidationResult[]> {
    const results: FieldValidationResult[] = []

    for (const rule of field.validation) {
      const result = await this.applyValidationRule(field, rule, session)
      if (result) {
        results.push(result)
      }
    }

    return results
  }

  async validateForm(session: FormSession): Promise<FieldValidationResult[]> {
    const allResults: FieldValidationResult[] = []

    for (const field of session.fields) {
      const fieldResults = await this.validateField(field, session)
      allResults.push(...fieldResults)
    }

    return allResults
  }

  private async applyValidationRule(
    field: FormField, 
    rule: ValidationRule, 
    session: FormSession
  ): Promise<FieldValidationResult | null> {
    switch (rule.type) {
      case 'required':
        if (!field.value || field.value === '') {
          return {
            fieldId: field.id,
            isValid: false,
            message: rule.message,
            severity: rule.severity
          }
        }
        break

      case 'email':
        if (field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          return {
            fieldId: field.id,
            isValid: false,
            message: rule.message,
            severity: rule.severity
          }
        }
        break

      case 'phone':
        if (field.value && !/^[\+]?[1-9][\d]{0,15}$/.test(field.value.replace(/\s/g, ''))) {
          return {
            fieldId: field.id,
            isValid: false,
            message: rule.message,
            severity: rule.severity
          }
        }
        break

      case 'date':
        if (field.value && new Date(field.value) <= new Date()) {
          return {
            fieldId: field.id,
            isValid: false,
            message: rule.message,
            severity: rule.severity
          }
        }
        break
    }

    return null
  }
}

class FormOptimizer {
  async optimize(session: FormSession): Promise<FormOptimization> {
    return {
      fieldOrder: session.fields.map(f => f.id),
      conditionalFields: [],
      progressIndicators: this.generateProgressIndicators(session),
      validationTiming: {
        onBlur: true,
        onSubmit: true,
        realTime: false,
        debounceMs: 300
      },
      assistanceSettings: {
        enablePredictions: true,
        enableSuggestions: true,
        enableAutoComplete: true,
        enableGuidance: true,
        assistanceLevel: 'standard'
      }
    }
  }

  private generateProgressIndicators(session: FormSession): ProgressIndicator[] {
    const indicators: ProgressIndicator[] = []
    
    for (let i = 1; i <= session.totalSteps; i++) {
      indicators.push({
        step: i,
        label: `Step ${i}`,
        description: this.getStepDescription(i, session.formType),
        estimatedTime: 2,
        required: true
      })
    }

    return indicators
  }

  private getStepDescription(step: number, formType: string): string {
    const descriptions: Record<string, Record<number, string>> = {
      'booking': {
        1: 'Service Selection',
        2: 'Schedule & Details',
        3: 'Contact Information'
      }
    }

    return descriptions[formType]?.[step] || `Step ${step}`
  }
}

class FormAnalytics {
  trackSessionStart(session: FormSession): void {
    console.log(`Form session started: ${session.id}`)
  }

  trackFieldInteraction(session: FormSession, field: FormField, previousValue: any, newValue: any): void {
    console.log(`Field ${field.id} updated in session ${session.id}`)
  }

  trackFormCompletion(session: FormSession): void {
    console.log(`Form completed: ${session.id}`)
  }

  trackFormSubmission(session: FormSession, success: boolean): void {
    console.log(`Form submission ${success ? 'succeeded' : 'failed'}: ${session.id}`)
  }
}

export default FormIntelligence