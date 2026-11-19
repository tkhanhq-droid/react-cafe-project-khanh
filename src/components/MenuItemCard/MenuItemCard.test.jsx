import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import MenuItemCard from './MenuItemCard'

const item = {
  id: 1,
  name: 'Espresso',
  category: 'Coffee',
  price: 2.5,
  popular: true,
  soldOut: false,
  emoji: '☕',
  description: 'Short and strong.',
}

describe('MenuItemCard', () => {
  it('renders name, price and category', () => {
    render(<MenuItemCard item={item} onAddToCart={() => {}} onQuickAdd={() => {}} />)
    expect(screen.getByText('Espresso')).toBeInTheDocument()
    expect(screen.getByText('$2.50 · Coffee')).toBeInTheDocument()
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('calls onAddToCart and onQuickAdd with the item', async () => {
    const onAddToCart = vi.fn()
    const onQuickAdd = vi.fn()
    render(<MenuItemCard item={item} onAddToCart={onAddToCart} onQuickAdd={onQuickAdd} />)

    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    await userEvent.click(screen.getByRole('button', { name: '+2' }))

    expect(onAddToCart).toHaveBeenCalledWith(item)
    expect(onQuickAdd).toHaveBeenCalledWith(item)
  })

  it('toggles the description when the card is clicked', async () => {
    render(<MenuItemCard item={item} onAddToCart={() => {}} onQuickAdd={() => {}} />)
    expect(screen.getByText('Tap Card for details')).toBeInTheDocument()

    await userEvent.click(screen.getByText('Espresso'))
    expect(screen.getByText('Short and strong.')).toBeInTheDocument()
  })

  it('disables the buttons when sold out', () => {
    render(
      <MenuItemCard item={{ ...item, soldOut: true }} onAddToCart={() => {}} onQuickAdd={() => {}} />,
    )
    expect(screen.getByText('Sold Out')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: '+2' })).toBeDisabled()
  })
})
