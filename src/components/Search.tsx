import React, { ChangeEvent, Component } from 'react'
import { ReactComponent as Logo } from '@/assets/icons/search.svg'

type SearchState = {
  input: string
}

type SearchProps = Record<string, never>

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)
    this.state = {
      input: localStorage.searchInput,
    }
  }

  inputHandle = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: input },
    } = e
    this.setState({ input })
  }

  componentWillUnmount() {
    localStorage.searchInput = this.state.input
  }

  render() {
    const { input } = this.state
    return (
      <div className="max-w-md mx-auto">
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <Logo className="w-6 h-6"></Logo>
          </div>
          <input
            value={input}
            onChange={this.inputHandle}
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            placeholder="Search something.."
          />
        </div>
      </div>
    )
  }
}

export default Search