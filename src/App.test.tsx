import { describe, it } from 'vitest'
import { screen } from '@testing-library/react'
import App from '@/App'
import { MemoryRouter, BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '@/utils/test-utils'

describe('App', () => {
  it('should render app app', async () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByTestId('main')).toBeInTheDocument()
  })

  it('should not found if invalid path', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/this-path-is-incorrect']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Not Found')
  })

  it('should going to about page', async () => {
    renderWithProviders(
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
    renderWithProviders(
      <MemoryRouter initialEntries={['/main']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByPlaceholderText(/Search something../i)).toBeInTheDocument()
  })

  it('should render form page', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/form']}>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('form')).toBeInTheDocument()
  })
})
