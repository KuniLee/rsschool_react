import { FC, useCallback, useMemo } from 'react'
import { ReactComponent as DArrow } from './assets/doubleArrow.svg'
import { ReactComponent as Arrow } from './assets/arrow.svg'
import renderButtons from '@components/Pagination/helpers/renderButtons'
import cx from 'classnames'

type PaginationProps = {
  page: number
  pageCount: number
  onChangePage: (value: number) => void
}

const Pagination: FC<PaginationProps> = ({ page, pageCount, onChangePage }) => {
  const memoOnChangePage = useCallback(onChangePage, [onChangePage])

  const buttons = useMemo(() => {
    return renderButtons(page, pageCount, memoOnChangePage)
  }, [pageCount, page, memoOnChangePage])

  return (
    <div className="flex items-center text-gray-300">
      <span
        onClick={() => onChangePage(1)}
        className={cx('cursor-pointer  rounded p-1 hover:bg-blue-800 md:p-2', { hidden: page === 1 })}>
        <DArrow />
      </span>
      <span
        onClick={() => onChangePage(page - 1)}
        className={cx('cursor-pointer rounded p-1 hover:bg-blue-800 md:p-2', { hidden: page === 1 })}>
        <Arrow />
      </span>
      {buttons}
      <span
        onClick={() => onChangePage(page + 1)}
        className={cx('rotate-180 cursor-pointer rounded  p-1 hover:bg-blue-800 md:p-2', {
          hidden: page === pageCount,
        })}>
        <Arrow />
      </span>
      <span
        onClick={() => onChangePage(pageCount)}
        className={cx('rotate-180 cursor-pointer rounded p-1 hover:bg-blue-800 md:p-2', {
          hidden: page === pageCount,
        })}>
        <DArrow />
      </span>
    </div>
  )
}

export default Pagination
