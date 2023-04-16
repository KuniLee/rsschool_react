import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '@/App'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('should render app app', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByTestId('main')).toBeInTheDocument()
  })

  it('should not found if invalid path', () => {
    render(
      <MemoryRouter initialEntries={['/this-path-is-incorrect']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found')
  })

  it('should going to about page', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveClass('text-gray-200')
    await userEvent.click(screen.getByRole('link', { name: 'About Us' }))
    expect(screen.getByRole('link', { name: 'About Us' })).toHaveClass('text-blue-400')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/about/i)
  })

  it('should render main page', () => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/Search something../i)).toBeInTheDocument()
  })

  it('should render form page', () => {
    render(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
