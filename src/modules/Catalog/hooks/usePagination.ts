import { useCallback, useState } from 'react'
import { PaginationData } from '../api/CardService'

export const usePagination = (): [number, number, (pageData: PaginationData) => void] => {
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  function setPageData({ current_page, last_visible_page }: PaginationData) {
    setPage(current_page)
    setPageCount(last_visible_page)
  }

  const memoSetPage = useCallback((data: PaginationData) => {
    setPageData(data)
  }, [])

  return [page, pageCount, memoSetPage]
}
