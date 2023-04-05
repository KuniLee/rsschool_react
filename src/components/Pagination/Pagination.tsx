import { FC, useMemo } from 'react'
import { ReactComponent as DArrow } from './assets/doubleArrow.svg'
import { ReactComponent as Arrow } from './assets/arrow.svg'
import renderButtons from '@components/Pagination/helpers/renderButtons'

type PaginationProps = {
  page: number
  pageCount: number
}

const Pagination: FC<PaginationProps> = ({ page, pageCount }) => {
  const buttons = useMemo(() => {
    return renderButtons(page, pageCount)
  }, [pageCount, page])

  return (
    <div className="flex items-center text-gray-300">
      <span className="rounded p-2 hover:bg-blue-800">
        <DArrow />
      </span>
      <span className="rounded p-2 hover:bg-blue-800">
        <Arrow />
      </span>
      {buttons}
      <span className="rotate-180 rounded p-2 hover:bg-blue-800">
        <Arrow />
      </span>
      <span className="rotate-180 rounded p-2 hover:bg-blue-800">
        <DArrow />
      </span>
    </div>
  )
}

export default Pagination
