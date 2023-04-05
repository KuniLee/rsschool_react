import { FC } from 'react'
import { ReactComponent as DArrow } from './assets/doubleArrow.svg'
import { ReactComponent as Arrow } from './assets/arrow.svg'

type PaginationProps = {
  page: number
  countPage: number
}

const Pagination: FC<PaginationProps> = ({ page, countPage }) => {
  return (
    <div className="flex items-center text-gray-300">
      <span className="rounded p-2 hover:bg-blue-800">
        <DArrow />
      </span>
      <span className="rounded p-2 hover:bg-blue-800">
        <Arrow />
      </span>
      {/*<a href="#" className="rounded px-4 py-2 hover:bg-blue-800">*/}
      {/*  {' '}*/}
      {/*  1{' '}*/}
      {/*</a>*/}
      {/*<a href="#" className="rounded bg-blue-700 px-4 py-2 font-medium">*/}
      {/*  2*/}
      {/*</a>*/}
      {/*<a href="#" className="rounded px-4 py-2 hover:bg-blue-800">*/}
      {/*  {' '}*/}
      {/*  3{' '}*/}
      {/*</a>*/}
      {/*<span className="rounded px-4 py-2">...</span>*/}
      {/*<a href="#" className="rounded px-4 py-2 hover:bg-blue-800">*/}
      {/*  {' '}*/}
      {/*  9{' '}*/}
      {/*</a>*/}
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
