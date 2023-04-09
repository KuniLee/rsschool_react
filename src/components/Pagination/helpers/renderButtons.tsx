import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import cx from 'classnames'

type PageBntProps = ComponentPropsWithoutRef<'span'> & { i?: number; active?: boolean; dots?: boolean }

const PageBnt: FC<PageBntProps> = ({ i, active, dots, ...props }) => {
  return dots ? (
    <span className={cx('px-2 py-1 md:px-4 md:py-2')}>...</span>
  ) : (
    <span
      {...props}
      className={cx('rounded px-2 py-1 text-sm md:px-4 md:py-2 md:text-base', {
        'bg-blue-700': active,
        'cursor-pointer hover:bg-blue-800': !active,
      })}>
      {i}
    </span>
  )
}

const renderButtons = (page: number, pageCount: number, onChangePage: (value: number) => void) => {
  const arrButtons: ReactNode[] = []

  function renderBtn(i: number) {
    arrButtons.push(<PageBnt onClick={() => onChangePage(i)} key={i} i={i} active={page === i} />)
  }

  if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) renderBtn(i)
  } else if (page <= 3) {
    for (let i = 1; i <= Math.min(pageCount, 4); i++) renderBtn(i)
    if (pageCount - page > 2) arrButtons.push(<PageBnt key={pageCount} dots />)
  } else if (pageCount - page <= 3) {
    arrButtons.push(<PageBnt key={0} dots />)
    for (let i = pageCount - 3; i <= pageCount; i++) renderBtn(i)
  } else {
    arrButtons.push(<PageBnt key={0} dots />)
    for (let i = page - 1; i <= page + 1; i++) renderBtn(i)
    arrButtons.push(<PageBnt key={pageCount} dots />)
  }

  return arrButtons
}

export default renderButtons
