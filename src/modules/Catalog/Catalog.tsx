import React, { useState } from 'react'
import Card from './components/ProductCard/Card'
import Search from '@/modules/Catalog/components/Search'
import initCards from '@/pages/MainPage/constants/initCards'

export interface ICard {
  id: number
  name: string
  description: string
  rating: {
    rate: number
    count: number
  }
  price: number
  image: string
  category: string
}

const Catalog: React.FC = () => {
  const [cards] = useState<ICard[]>(initCards)
  return (
    <>
      <Search />
      <div className="my-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
        {cards.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </div>
    </>
  )
}

export default Catalog
