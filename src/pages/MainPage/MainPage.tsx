import React, { useState } from 'react'
import Search from './components/Search'
import Catalog from '@/modules/Catalog'
import initCards from './constants/initCards'

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

const MainPage: React.FC = () => {
  const [cards] = useState<ICard[]>(initCards)
  return (
    <div className="py-4">
      <Search />
      <Catalog cards={cards} />
    </div>
  )
}
export default MainPage
