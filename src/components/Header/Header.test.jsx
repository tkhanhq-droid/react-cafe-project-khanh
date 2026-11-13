import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('shows the cafe name', () => {
    render(<Header cartCount={0} />)
    expect(screen.getByRole('heading', { name: /bean & leaf/i })).toBeInTheDocument()
  })

  it('shows the cart count', () => {
    render(<Header cartCount={3} />)
    expect(screen.getByText('🛒 Cart (3)')).toBeInTheDocument()
  })
})
