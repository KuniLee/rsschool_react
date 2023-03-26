import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '@components/Cards/Card'

describe('Test Cards Component:', () => {
  it('render card', function () {
    const product = {
      image: 'link',
      name: 'TestName',
      description: '',
      rating: { rate: 4.5, count: 0 },
      id: 1,
      price: 500,
    }
    render(<Card card={product} />)
    expect(screen.getByAltText(/product image/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(product.name)
    expect(screen.getByText(new RegExp(`${product.rating.rate.toString()}`, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${product.price}`, 'i'))).toBeInTheDocument()
  })
})
