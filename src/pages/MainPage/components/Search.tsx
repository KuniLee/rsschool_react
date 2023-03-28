import React, { FC, useEffect, useRef } from 'react'
import { ReactComponent as Logo } from '@assets/icons/search.svg'

type SearchProps = Record<string, never>

const Search: FC<SearchProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const input = inputRef.current
    if (input) input.value = localStorage.searchInput || ''
    return () => {
      localStorage.searchInput = input?.value || ''
    }
  }, [])

  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <Logo className="w-6 h-6"></Logo>
        </div>
        <input
          ref={inputRef}
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          placeholder="Search something.."
        />
      </div>
    </div>
  )
}

export default Search
