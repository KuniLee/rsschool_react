import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'

describe('App', () => {
  it('full app rendering', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByPlaceholderText('Search something..')).toBeInTheDocument()
  })
  it('renders not fount if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-path-is-incorrect']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found')
  })
})
