import { vi, describe, it } from 'vitest'
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

describe('User create', () => {
  it('User creating testing without image', async () => {
    const testUser = {
      name: 'Test Name',
      date: new Date('2000-01-01'),
      sex: 'other',
      country: 'FR',
      notifications: true,
      avatar: null,
    }
    const user = userEvent.setup()
    const addUser = vi.fn(() => {
      console.log(1221213)
    })
    render(<MyForm addUser={addUser} />)
    await user.type(screen.getByRole('textbox', { name: /name/i }), testUser.name)
    await user.type(screen.getByLabelText(/date of birth/i), '01012000')
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /country/i }), [testUser.country])
    await userEvent.click(screen.getByLabelText(new RegExp(testUser.sex, 'i')))
    await userEvent.click(screen.getByLabelText(/get notifications/i))
    await user.click(screen.getByRole('button', { name: /Create/i }))
    //eslint-disable-next-line testing-library/no-debugging-utils
    //expect(addUser).toHaveBeenCalled()

    // expect(screen.getByText(/Latin letters and numbers/i)).toBeInTheDocument()
    // expect(screen.getByText(/set the date/i)).toBeInTheDocument()
    // expect(screen.getByText(/Choose something/i)).toBeInTheDocument()
    // expect(screen.getByText(/Choose one of the options/i)).toBeInTheDocument()
    // expect(screen.getByRole('button', { name: /Create/i })).toBeDisabled()
    // await user.type(screen.getByRole('textbox', { name: /name/i }), 'TestName')
    // await user.click(screen.getByRole('button', { name: /Create/i }))
    // expect(screen.queryByText(/Latin letters and numbers/i)).toBeNull()
  })
})
