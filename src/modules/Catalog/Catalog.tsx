import React, { useEffect, useState } from 'react'
import Card from './components/ProductCard/Card'
import Search from './components/Search'
import { useFetching } from './hooks/useFetching'
import PostService from './api/CardService'

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
  const [cards] = useState<ICard[]>([])
  const [fetchCards, isCardsLoading, cardsError] = useFetching(async (search: string, limit: number, page: number) => {
    const response = await PostService.getAnimeWithSearch(search, limit, page)
    console.log(response.data.data.map((el) => el.title))
    // setPosts([...posts, ...response.data])
    // setTotalPages(getPageCount(response.headers['x-total-count'] as number, limit as number))
  })

  useEffect(() => {
    fetchCards('naruto')
  }, [])

  return (
    <>
      <Search
        onSearch={(value) => {
          console.log(value)
        }}
      />
      <div className="my-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
        {cards.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </div>
    </>
  )
}

export default Catalog
