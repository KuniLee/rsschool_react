import React, { FC, KeyboardEventHandler, useEffect, useRef } from 'react'
import { ReactComponent as Logo } from '@assets/icons/search.svg'
import MyButton from '@/UI/MyButton'

type SearchProps = {
  onSearch: (value: string) => void
}

const Search: FC<SearchProps> = ({ onSearch }) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = ref.current

    if (input) input.value = localStorage.searchInput || ''

    return () => {
      localStorage.searchInput = input?.value || ''
    }
  }, [])

  const onKeyDown: KeyboardEventHandler = (ev) => {
    if (ev.key === 'Enter') onSearch(ref.current?.value || '')
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg">
        <div className="grid h-full w-12 place-items-center text-gray-300">
          <Logo className="h-6 w-6"></Logo>
        </div>
        <input
          onKeyDown={onKeyDown}
          ref={ref}
          className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
          type="text"
          placeholder="Search something.."
        />
        <MyButton className="h-full rounded-l-none" onClick={() => onSearch(ref.current?.value || '')}>
          Go
        </MyButton>
      </div>
    </div>
  )
}

export default Search
