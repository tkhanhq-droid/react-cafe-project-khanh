import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Cart from './Cart'

const noop = () => {}

describe('Cart', () => {
  it('shows an empty message when the cart is empty', () => {
    render(<Cart cart={[]} onIncrease={noop} onDecrease={noop} onClear={noop} />)
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
  })

  it('renders a line per item with its line total', () => {
    const cart = [
      { id: 1, name: 'Espresso', price: 2.5, quantity: 2 },
      { id: 6, name: 'Croissant', price: 2.8, quantity: 1 },
    ]
    render(<Cart cart={cart} onIncrease={noop} onDecrease={noop} onClear={noop} />)
    expect(screen.getByText('Espresso')).toBeInTheDocument()
    expect(screen.getByText('$5.00')).toBeInTheDocument()
    expect(screen.getByText('Croissant')).toBeInTheDocument()
  })

  it('calls the handlers with the item id', async () => {
    const onIncrease = vi.fn()
    const onDecrease = vi.fn()
    const onClear = vi.fn()
    const cart = [{ id: 1, name: 'Espresso', price: 2.5, quantity: 1 }]
    render(<Cart cart={cart} onIncrease={onIncrease} onDecrease={onDecrease} onClear={onClear} />)

    await userEvent.click(screen.getByRole('button', { name: '+' }))
    await userEvent.click(screen.getByRole('button', { name: '-' }))
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }))

    expect(onIncrease).toHaveBeenCalledWith(1)
    expect(onDecrease).toHaveBeenCalledWith(1)
    expect(onClear).toHaveBeenCalled()
  })
})
