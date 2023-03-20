import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import Catalog from '@components/Catalog/Catalog'

describe('Test Card Component:', () => {
  it('render Catalog with no cards', function () {
    render(<Catalog cards={[]} />)
    expect(screen.queryByTestId('card')).toBeNull()
  })
  it('render Catalog with several cards', function () {
    const cards = [
      {
        image: 'link1',
        name: 'TestName1',
        rating: { rate: 4.3, count: 0 },
        id: 1,
        price: 500,
      },
      {
        image: 'link2',
        name: 'TestName2',
        rating: { rate: 4.2, count: 0 },
        id: 2,
        price: 600,
      },
      {
        image: 'link3',
        name: 'TestName3',
        rating: { rate: 4.1, count: 0 },
        id: 3,
        price: 700,
      },
    ]

    render(<Catalog cards={cards} />)
    expect(screen.queryAllByTestId('card').length).toBe(cards.length)
  })
})
