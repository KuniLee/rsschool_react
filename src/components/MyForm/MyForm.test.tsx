import { vi, describe, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyForm from '@components/MyForm/MyForm'

describe('MyForm', () => {
  it('Test render form', () => {
    render(<MyForm addUser={() => undefined} />)
    expect(screen.getByRole('textbox', { name: /firstname/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /surname/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).toBeDisabled()
  })
  it('Testing validation', async () => {
    const user = userEvent.setup()
    render(<MyForm addUser={() => undefined} />)
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), '1')
    await user.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.getAllByText(/Latin letters and numbers/i).length).toBe(2)
    expect(screen.getByText(/upload an image/i)).toBeInTheDocument()
    expect(screen.getByText(/set the date/i)).toBeInTheDocument()
    expect(screen.getByText(/Choose something/i)).toBeInTheDocument()
    expect(screen.getByText(/Choose one of the options/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).toBeDisabled()
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), 'TestName')
    await user.type(screen.getByRole('textbox', { name: /surname/i }), 'TestName')
    await user.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.queryByText(/Latin letters and numbers/i)).toBeNull()
  })
})

describe('User create', () => {
  it('User creating testing with image', async () => {
    const testUser = {
      name: 'Name',
      surname: 'Surname',
      date: new Date('2000-01-01'),
      sex: 'male',
      country: 'RU',
      notifications: false,
      avatar: 'data:image/png;base64,aGVsbG8=',
    }
    const testImage = [new File(['hello'], 'hello.png', { type: 'image/png' })]
    const user = userEvent.setup()
    const addUser = vi.fn()
    render(<MyForm addUser={addUser} />)
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), testUser.name)
    await user.type(screen.getByRole('textbox', { name: /surname/i }), testUser.surname)
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } })
    await userEvent.upload(screen.getByLabelText(/avatar/i), testImage)
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /country/i }), [testUser.country])
    await userEvent.click(screen.getByLabelText(new RegExp(`^${testUser.sex}$`, 'i')))
    await userEvent.click(screen.getByLabelText(/Agree with license/i))
    await user.click(screen.getByRole('button', { name: /Create/i }))
    await waitFor(() => {
      const argument = addUser.mock.calls[0][0]
      Reflect.deleteProperty(argument, 'id')
      expect(argument).toEqual(testUser)
    })
  })
})
