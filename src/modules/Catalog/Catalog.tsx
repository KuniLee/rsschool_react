import React, { FC, useState } from 'react'
import AnimeCard from './components/AnimeCard/AnimeCard'
import Search from './components/Search'
import Loader from '@components/Loader/Loader'
import Popup from '@components/Popup'
import AnimeDetails from './components/AnimeInfo/AnimeDetails'
import { AnimeInfo } from '@/modules/Catalog/models'
import Pagination from '@components/Pagination'
import Alert from '@/UI/Alert'
import { useGetAnimeSearchQuery } from './store/jikan.api'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setPage, setSearch } from './store/catalogSlice'

const Catalog: FC = () => {
  const dispatch = useAppDispatch()
  const { page, search } = useAppSelector((state) => state.catalog)

  const { cards, pageCount, isError, isFetching } = useGetAnimeSearchQuery([search, page], {
    selectFromResult: ({ data, ...props }) => ({
      cards: data?.data || [],
      pageCount: data?.pagination.last_visible_page || 0,
      ...props,
    }),
  })

  const [popup, setPopup] = useState(false)
  const [currentCard, setCurrentCard] = useState<AnimeInfo>()

  const changePage = (value: number) => {
    dispatch(setPage(value))
  }

  const openCard = (card: AnimeInfo) => {
    setCurrentCard(card)
    setPopup(true)
  }

  const makeNewSearch = (value: string) => {
    dispatch(setSearch(value))
  }

  return (
    <>
      <Popup onClose={() => setPopup(false)} open={popup}>
        {currentCard && <AnimeDetails card={currentCard} />}
      </Popup>
      <Search search={search} onSearch={makeNewSearch} />
      {isError ? (
        <Alert type="danger" data={{ title: 'Error', text: 'Server Error' }} />
      ) : isFetching ? (
        <Loader className="mx-auto my-4 h-12 w-12" />
      ) : (
        <>
          <div className="my-4 grid grid-cols-1 justify-items-center gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((card) => (
              <AnimeCard openCard={openCard} key={card.mal_id} card={card} />
            ))}
          </div>
          {cards.length ? <Pagination onChangePage={changePage} pageCount={pageCount} page={page} /> : <p>no cards</p>}
        </>
      )}
    </>
  )
}

export default Catalog
