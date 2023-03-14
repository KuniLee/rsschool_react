import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '@components/Card/Card'

describe('Test Card Component:', () => {
  it('should have title', function () {
    const product = {
      image: 'link',
      title: 'TestName',
      rating: { rate: 4.5, count: 0 },
      id: 1,
      price: 500,
    }
    render(<Card card={product} />)
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(product.title)
  })
})
