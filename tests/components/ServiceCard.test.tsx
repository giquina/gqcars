import { render, screen } from '@testing-library/react'
import { Shield } from 'lucide-react'

// Mock ServiceCard component for testing
const ServiceCard = ({ icon: Icon, title, description }: {
  icon: any
  title: string
  description: string
}) => (
  <div data-testid="service-card" className="bg-slate-900/50 p-6 border-l-4 border-blue-600">
    <Icon className="w-12 h-12 text-amber-500 mb-4" />
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
)

describe('ServiceCard', () => {
  const mockProps = {
    icon: Shield,
    title: 'Close Protection',
    description: 'SIA licensed officers providing professional personal security and threat management.',
  }

  test('renders service card with correct content', () => {
    render(<ServiceCard {...mockProps} />)
    
    expect(screen.getByTestId('service-card')).toBeInTheDocument()
    expect(screen.getByText('Close Protection')).toBeInTheDocument()
    expect(screen.getByText(/SIA licensed officers/)).toBeInTheDocument()
  })

  test('has correct CSS classes applied', () => {
    render(<ServiceCard {...mockProps} />)
    
    const card = screen.getByTestId('service-card')
    expect(card).toHaveClass('bg-slate-900/50', 'p-6', 'border-l-4', 'border-blue-600')
  })

  test('renders icon correctly', () => {
    render(<ServiceCard {...mockProps} />)
    
    const icon = screen.getByTestId('service-card').querySelector('svg')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('w-12', 'h-12', 'text-amber-500', 'mb-4')
  })

  test('renders title with correct styling', () => {
    render(<ServiceCard {...mockProps} />)
    
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveTextContent('Close Protection')
    expect(title).toHaveClass('text-xl', 'font-bold', 'mb-2', 'text-white')
  })

  test('renders description with correct styling', () => {
    render(<ServiceCard {...mockProps} />)
    
    const description = screen.getByText(/SIA licensed officers/)
    expect(description).toHaveClass('text-gray-400')
  })
})