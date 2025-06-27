import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingForm from '../BookingForm'
import { mockUser } from '../../../jest.setup'
import { trackBookingStarted, trackBookingCompleted } from '@/lib/analytics'

// Mock the analytics functions
jest.mock('@/lib/analytics')

describe('BookingForm', () => {
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders booking form with all required fields', () => {
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    // Check for essential form fields
    expect(screen.getByLabelText(/pickup location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/dropoff location/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/service type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/passenger count/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contact phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument()
  })

  test('tracks analytics when booking starts', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    const serviceSelect = screen.getByLabelText(/service type/i)
    await user.selectOptions(serviceSelect, 'Executive')
    
    expect(trackBookingStarted).toHaveBeenCalledWith('Executive')
  })

  test('validates required fields before submission', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    const submitButton = screen.getByRole('button', { name: /book now/i })
    await user.click(submitButton)
    
    // Should show validation errors for required fields
    await waitFor(() => {
      expect(screen.getByText(/pickup location is required/i)).toBeInTheDocument()
      expect(screen.getByText(/dropoff location is required/i)).toBeInTheDocument()
    })
  })

  test('calculates price estimates correctly', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    // Fill in pickup and dropoff
    await user.type(screen.getByLabelText(/pickup location/i), 'Heathrow Airport')
    await user.type(screen.getByLabelText(/dropoff location/i), 'Central London')
    
    // Select service type
    await user.selectOptions(screen.getByLabelText(/service type/i), 'Executive')
    
    // Should display price estimate
    await waitFor(() => {
      expect(screen.getByText(/estimated price/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    // Fill out all required fields
    await user.type(screen.getByLabelText(/pickup location/i), 'Heathrow Airport')
    await user.type(screen.getByLabelText(/dropoff location/i), 'Central London')
    await user.selectOptions(screen.getByLabelText(/service type/i), 'Standard')
    await user.type(screen.getByLabelText(/date/i), '2024-12-31')
    await user.type(screen.getByLabelText(/time/i), '10:00')
    await user.selectOptions(screen.getByLabelText(/passenger count/i), '2')
    await user.type(screen.getByLabelText(/contact phone/i), '+44 7700 900000')
    await user.type(screen.getByLabelText(/contact email/i), 'test@example.com')
    
    const submitButton = screen.getByRole('button', { name: /book now/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(trackBookingCompleted).toHaveBeenCalledWith({
        serviceType: 'Standard',
        pickupLocation: 'Heathrow Airport',
        dropoffLocation: 'Central London',
        totalPrice: expect.any(Number),
      })
      expect(mockOnSuccess).toHaveBeenCalled()
    })
  })

  test('handles form submission errors gracefully', async () => {
    const user = userEvent.setup()
    
    // Mock a submission error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    // Fill out minimum required fields
    await user.type(screen.getByLabelText(/pickup location/i), 'Test Location')
    await user.type(screen.getByLabelText(/dropoff location/i), 'Test Destination')
    
    // Submit form
    const submitButton = screen.getByRole('button', { name: /book now/i })
    await user.click(submitButton)
    
    // Should handle error gracefully
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /book now/i })).not.toBeDisabled()
    })
    
    consoleSpy.mockRestore()
  })

  test('pre-fills form when user is authenticated', () => {
    render(<BookingForm onSuccess={mockOnSuccess} user={mockUser} />)
    
    expect(screen.getByDisplayValue(mockUser.email)).toBeInTheDocument()
    expect(screen.getByDisplayValue(mockUser.phone)).toBeInTheDocument()
  })

  test('displays loading state during submission', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    // Fill minimum required fields
    await user.type(screen.getByLabelText(/pickup location/i), 'Test')
    await user.type(screen.getByLabelText(/dropoff location/i), 'Test')
    
    const submitButton = screen.getByRole('button', { name: /book now/i })
    await user.click(submitButton)
    
    // Should show loading state
    expect(screen.getByRole('button', { name: /booking.../i })).toBeInTheDocument()
  })

  test('validates email format', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    const emailInput = screen.getByLabelText(/contact email/i)
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: /book now/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument()
    })
  })

  test('validates phone number format', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSuccess={mockOnSuccess} />)
    
    const phoneInput = screen.getByLabelText(/contact phone/i)
    await user.type(phoneInput, 'invalid')
    
    const submitButton = screen.getByRole('button', { name: /book now/i })
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/invalid phone number/i)).toBeInTheDocument()
    })
  })
})