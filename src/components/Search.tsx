import React, { Component } from 'react'
import { ReactComponent as Logo } from '@/assets/icons/search.svg'

class Search extends Component {
  render() {
    return (
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <Logo className="w-6 h-6"></Logo>
          </div>
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
      </div>
    )
  }
}

export default Search
