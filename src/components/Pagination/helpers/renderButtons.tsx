import { FC, ReactNode } from 'react'
import cx from 'classnames'

const PageBnt: FC<{ i?: number; active?: boolean; dots?: boolean }> = ({ i, active, dots }) => {
  return dots ? (
    <span className={cx('px-4 py-2')}>...</span>
  ) : (
    <span
      className={cx('rounded px-4 py-2', {
        'bg-blue-700': active,
        'cursor-pointer hover:bg-blue-800': !active,
      })}>
      {i}
    </span>
  )
}

const renderButtons = (page: number, pageCount: number) => {
  const arrButtons: ReactNode[] = []

  if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) {
      arrButtons.push(<PageBnt key={i} i={i} active={page === i} />)
    }
  } else {
    if (page <= 3) {
      for (let i = 1; i <= Math.min(pageCount, 4); i++) {
        arrButtons.push(<PageBnt key={i} i={i} active={page === i} />)
      }
      if (pageCount - page > 2) arrButtons.push(<PageBnt key={pageCount} dots />)
    } else if (pageCount - page <= 3) {
      arrButtons.push(<PageBnt key={0} dots />)
      for (let i = pageCount - 3; i <= pageCount; i++) arrButtons.push(<PageBnt key={i} i={i} active={page === i} />)
    } else {
      arrButtons.push(<PageBnt key={0} dots />)
      for (let i = page - 1; i <= page + 1; i++) arrButtons.push(<PageBnt key={i} i={i} active={page === i} />)
      arrButtons.push(<PageBnt key={pageCount} dots />)
    }
  }

  return arrButtons
}

export default renderButtons
