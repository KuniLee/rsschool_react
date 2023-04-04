import React, { useCallback, useEffect, useState } from 'react'
import AnimeCard from './components/AnimeCard/AnimeCard'
import Search from './components/Search'
import { useFetching } from './hooks/useFetching'
import PostService from './api/CardService'
import { AnimeInfo } from '@/modules/Catalog/types'
import Loader from '@components/Loader/Loader'

const Catalog: React.FC = () => {
  const [search, setSearch] = useState(localStorage.searchInput || '')
  const [cards, setCards] = useState<AnimeInfo[]>([])

  const [fetchCards, isCardsLoading, cardsError] = useFetching(
    useCallback(async (search: string, limit: number, page: number) => {
      const response = await PostService.getAnimeWithSearch(search, limit, page)

      setCards(response.data.data)
      // setTotalPages(getPageCount(response.headers['x-total-count'] as number, limit as number))
    }, [])
  )

  useEffect(() => {
    fetchCards(search)
  }, [search, fetchCards])

  return (
    <>
      <Search onSearch={(value) => setSearch(value)} />
      {isCardsLoading ? (
        <Loader className="mx-auto my-4 h-12 w-12" />
      ) : (
        <div className="my-4 grid grid-cols-1 justify-items-center gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <AnimeCard key={card.mal_id} card={card} />
          ))}
        </div>
      )}
    </>
  )
}

export default Catalog
