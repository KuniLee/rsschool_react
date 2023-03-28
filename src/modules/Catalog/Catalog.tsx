import React, { Component } from 'react'
import Card from './components/ProductCard/Card'
import type { ICard } from './components/ProductCard/Card'

export type CatalogProps = {
  cards: Array<ICard>
}

class Catalog extends Component<CatalogProps> {
  render() {
    const { cards } = this.props
    return (
      <div className="my-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
        {cards.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </div>
    )
  }
}

export default Catalog
