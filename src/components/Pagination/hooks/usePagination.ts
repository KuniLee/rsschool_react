import { Dispatch, SetStateAction, useCallback, useState } from 'react'

export const usePagination = (): [
  number,
  number,
  Dispatch<SetStateAction<number>>,
  (currentPage: number, lastVisiblePage: number) => void
] => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  function setPageData(currentPage: number, lastVisiblePage: number) {
    setPage(currentPage)
    setPageCount(lastVisiblePage)
  }

  const memoSetPage = useCallback((currentPage: number, lastVisiblePage: number) => {
    setPageData(currentPage, lastVisiblePage)
  }, [])

  return [page, pageCount, setPage, memoSetPage]
}
