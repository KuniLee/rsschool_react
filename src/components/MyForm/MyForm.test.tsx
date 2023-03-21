import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyForm from '@components/MyForm/MyForm'

describe('MyForm', () => {
  it('Test render form', () => {
    render(<MyForm addUser={() => undefined} />)
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).toBeDisabled()
  })
  it('Testing validation', async () => {
    const user = userEvent.setup()
    render(<MyForm addUser={() => undefined} />)
    await user.type(screen.getByRole('textbox', { name: /name/i }), '1')
    await user.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.getByText(/Latin letters and numbers/i)).toBeInTheDocument()
    expect(screen.getByText(/set the date/i)).toBeInTheDocument()
    expect(screen.getByText(/Choose something/i)).toBeInTheDocument()
    expect(screen.getByText(/Choose one of the options/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).toBeDisabled()
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'TestName')
    await user.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.queryByText(/Latin letters and numbers/i)).toBeNull()
  })
})
