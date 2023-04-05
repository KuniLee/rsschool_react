import React, { useCallback, useEffect, useState } from 'react'
import AnimeCard from './components/AnimeCard/AnimeCard'
import Search from './components/Search'
import { useFetching } from './hooks/useFetching'
import PostService from './api/CardService'
import Loader from '@components/Loader/Loader'
import Popup from '@components/Popup'
import AnimeDetails from './components/AnimeInfo/AnimeDetails'
import { AnimeInfo } from '@/modules/Catalog/types'
import { usePagination } from '@components/Pagination'
import Pagination from '@components/Pagination'

const Catalog: React.FC = () => {
  const [search, setSearch] = useState(localStorage.searchInput || '')
  const [cards, setCards] = useState<AnimeInfo[]>([])
  const [popup, setPopup] = useState(false)
  const [currentCard, setCurrentCard] = useState<AnimeInfo>()
  const [page, pageCount, setPageData] = usePagination()

  const [fetchCards, isCardsLoading, cardsError] = useFetching(
    useCallback(
      async (search: string, limit: number, page: number) => {
        const response = await PostService.getAnimeWithSearch(search, limit, page)

        const cards = response.data.data
        const { current_page, last_visible_page } = response.data.pagination

        setCards(cards)
        setPageData(current_page, last_visible_page)
      },
      [setPageData]
    )
  )

  const openCard = (card: AnimeInfo) => {
    setCurrentCard(card)
    setPopup(true)
  }

  useEffect(() => {
    fetchCards(search)
  }, [search, fetchCards])

  return (
    <>
      <Popup onClose={() => setPopup(false)} open={popup}>
        {currentCard && <AnimeDetails card={currentCard} />}
      </Popup>
      <Search onSearch={(value) => setSearch(value)} />
      {isCardsLoading ? (
        <Loader className="mx-auto my-4 h-12 w-12" />
      ) : (
        <>
          <div className="my-4 grid grid-cols-1 justify-items-center gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((card) => (
              <AnimeCard openCard={openCard} key={card.mal_id} card={card} />
            ))}
          </div>
          {cards.length ? <Pagination pageCount={pageCount} page={page} /> : <p>no cards</p>}
        </>
      )}
    </>
  )
}

export default Catalog
