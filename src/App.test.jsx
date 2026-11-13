import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

function cartPill() {
  return screen.getByText(/🛒 Cart/)
}

function addButtonFor(name) {
  const card = screen.getByText(name, { selector: '.item-name' }).closest('.menu-card')
  return within(card).getByRole('button', { name: 'Add' })
}

describe('App', () => {
  it('renders the full menu by default', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('.menu-card')).toHaveLength(8)
  })

  it('filters the menu by category', async () => {
    const { container } = render(<App />)
    await userEvent.click(screen.getByRole('button', { name: 'Tea' }))

    expect(container.querySelectorAll('.menu-card')).toHaveLength(2)
    expect(screen.getByText('Matcha Latte')).toBeInTheDocument()
    expect(screen.queryByText('Espresso')).not.toBeInTheDocument()
  })

  it('updates the cart count when adding items', async () => {
    render(<App />)
    expect(cartPill()).toHaveTextContent('Cart (0)')

    await userEvent.click(addButtonFor('Espresso'))
    await userEvent.click(addButtonFor('Espresso'))
    expect(cartPill()).toHaveTextContent('Cart (2)')
  })

  it('removes an item when its quantity drops to zero', async () => {
    render(<App />)
    await userEvent.click(addButtonFor('Croissant'))
    expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: '-' }))
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(cartPill()).toHaveTextContent('Cart (0)')
  })
})
