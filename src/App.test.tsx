import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('full app rendering', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    expect(screen.getByTestId('main')).toBeInTheDocument()
  })
  it('renders not fount if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-path-is-incorrect']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found')
  })
  it('test going to about page', async () => {
    const user = userEvent.setup()

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveClass('text-gray-200')
    await user.click(screen.getByRole('link', { name: 'About Us' }))
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveClass('text-blue-400')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/about/i)
  })
  it('test render main page', () => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/Search something../i)).toBeInTheDocument()
  })
})
