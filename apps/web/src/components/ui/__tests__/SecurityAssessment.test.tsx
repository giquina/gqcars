import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SecurityAssessment from '../SecurityAssessment'
import { trackAssessmentStarted, trackAssessmentCompleted } from '@/lib/analytics'

// Mock the analytics functions
jest.mock('@/lib/analytics')

describe('SecurityAssessment', () => {
  const mockOnComplete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders assessment with initial question', () => {
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    expect(screen.getByText(/security assessment/i)).toBeInTheDocument()
    expect(screen.getByText(/are you a public figure/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /never/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sometimes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /often/i })).toBeInTheDocument()
  })

  test('tracks analytics when assessment starts', () => {
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    expect(trackAssessmentStarted).toHaveBeenCalled()
  })

  test('progresses through all questions', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Answer first question
    await user.click(screen.getByRole('button', { name: /sometimes/i }))
    
    // Should progress to next question
    await waitFor(() => {
      expect(screen.getByText(/how often do you travel/i)).toBeInTheDocument()
    })
    
    // Answer second question
    await user.click(screen.getByRole('button', { name: /weekly/i }))
    
    // Should progress to third question
    await waitFor(() => {
      expect(screen.getByText(/security incidents/i)).toBeInTheDocument()
    })
  })

  test('shows progress indicator', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Should show progress (1 of 5)
    expect(screen.getByText(/1 of 5/i)).toBeInTheDocument()
    
    // Answer question and check progress updates
    await user.click(screen.getByRole('button', { name: /sometimes/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/2 of 5/i)).toBeInTheDocument()
    })
  })

  test('calculates correct threat levels', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Answer all questions to get a high risk score
    await user.click(screen.getByRole('button', { name: /often/i })) // Q1: public figure
    
    await waitFor(() => {
      expect(screen.getByText(/how often do you travel/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /daily/i })) // Q2: travel frequency
    
    await waitFor(() => {
      expect(screen.getByText(/security incidents/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /multiple/i })) // Q3: incidents
    
    await waitFor(() => {
      expect(screen.getByText(/sensitive locations/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /often/i })) // Q4: sensitive locations
    
    await waitFor(() => {
      expect(screen.getByText(/security awareness/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /low/i })) // Q5: awareness
    
    // Should complete assessment with high threat level
    await waitFor(() => {
      expect(trackAssessmentCompleted).toHaveBeenCalledWith(
        expect.stringMatching(/substantial|severe|critical/i),
        expect.any(Number)
      )
      expect(mockOnComplete).toHaveBeenCalled()
    })
  })

  test('calculates low threat level for low-risk answers', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Answer all questions with low-risk options
    const lowRiskAnswers = ['never', 'rarely', 'none', 'never', 'high']
    
    for (let i = 0; i < lowRiskAnswers.length; i++) {
      const button = screen.getByRole('button', { name: new RegExp(lowRiskAnswers[i], 'i') })
      await user.click(button)
      
      if (i < lowRiskAnswers.length - 1) {
        await waitFor(() => {
          // Wait for next question to appear
          expect(screen.getByText(new RegExp(`${i + 2} of 5`, 'i'))).toBeInTheDocument()
        })
      }
    }
    
    // Should complete with low threat level
    await waitFor(() => {
      expect(trackAssessmentCompleted).toHaveBeenCalledWith('Low', expect.any(Number))
      expect(mockOnComplete).toHaveBeenCalled()
    })
  })

  test('allows going back to previous questions', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Answer first question
    await user.click(screen.getByRole('button', { name: /sometimes/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/2 of 5/i)).toBeInTheDocument()
    })
    
    // Go back
    const backButton = screen.getByRole('button', { name: /back/i })
    await user.click(backButton)
    
    // Should be back to first question
    await waitFor(() => {
      expect(screen.getByText(/1 of 5/i)).toBeInTheDocument()
      expect(screen.getByText(/are you a public figure/i)).toBeInTheDocument()
    })
  })

  test('generates appropriate recommendations based on answers', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Answer questions to trigger specific recommendations
    await user.click(screen.getByRole('button', { name: /often/i })) // High-profile
    
    await waitFor(() => {
      expect(screen.getByText(/travel/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /weekly/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/incidents/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /one/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/sensitive/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /sometimes/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/awareness/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByRole('button', { name: /medium/i }))
    
    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith({
        threatLevel: expect.any(String),
        riskScore: expect.any(Number),
        answers: expect.any(Object),
        recommendations: expect.arrayContaining([expect.any(String)]),
      })
    })
  })

  test('shows loading state during submission', async () => {
    const user = userEvent.setup()
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Complete all questions quickly
    const answers = ['sometimes', 'weekly', 'none', 'never', 'high']
    
    for (const answer of answers) {
      const button = screen.getByRole('button', { name: new RegExp(answer, 'i') })
      await user.click(button)
      
      if (answer !== 'high') {
        await waitFor(() => {
          expect(screen.getByRole('button')).toBeInTheDocument()
        })
      }
    }
    
    // Should show loading state briefly
    await waitFor(() => {
      expect(screen.getByText(/analyzing/i)).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  test('maintains accessibility standards', () => {
    render(<SecurityAssessment onComplete={mockOnComplete} />)
    
    // Check for proper ARIA labels and roles
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    
    // Check that buttons are properly labeled
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
    })
  })
})