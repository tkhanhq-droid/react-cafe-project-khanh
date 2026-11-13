import { render, screen } from '@testing-library/react'
import OrderSummary from './OrderSummary'

describe('OrderSummary', () => {
  it('formats subtotal, discount and total', () => {
    render(<OrderSummary subtotal={10} discount={1.5} total={8.5} />)
    expect(screen.getByText('$10.00')).toBeInTheDocument()
    expect(screen.getByText('-$1.50')).toBeInTheDocument()
    expect(screen.getByText('$8.50')).toBeInTheDocument()
  })
})
