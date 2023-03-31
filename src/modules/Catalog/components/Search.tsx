import React, { FC, useEffect, useRef } from 'react'
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

  return (
    <div className="max-w-md mx-auto">
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <Logo className="w-6 h-6"></Logo>
        </div>
        <input
          ref={ref}
          className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
          type="text"
          placeholder="Search something.."
        />
      </div>
      <MyButton
        onClick={() => {
          onSearch(ref.current?.value || '')
        }}>
        Go
      </MyButton>
    </div>
  )
}

export default Search
