import { vi, describe, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyForm from '@components/MyForm/MyForm'
import { IUser } from '@/types'

describe('MyForm', () => {
  it('Test render form', () => {
    render(<MyForm addUser={() => undefined} />)
    expect(screen.getByRole('textbox', { name: /firstname/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /surname/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).not.toBeDisabled()
  })
  it('Testing validation', async () => {
    const user = userEvent.setup()
    render(<MyForm addUser={() => undefined} />)
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), '1')
    await user.type(screen.getByRole('textbox', { name: /surname/i }), '1')
    await user.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.getAllByText(/Latin letters and numbers/i).length).toBe(2)
    expect(screen.getByText(/upload an image/i)).toBeInTheDocument()
    expect(screen.getByText(/set the date/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Choose country/i).length).toBe(2)
    expect(screen.getByText(/Choose one of the options/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).not.toBeDisabled()
    await user.clear(screen.getByRole('textbox', { name: /firstname/i }))
    await user.clear(screen.getByRole('textbox', { name: /surname/i }))
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), 'TestName')
    await user.type(screen.getByRole('textbox', { name: /surname/i }), 'TestName')
    await user.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.queryByText(/Latin letters and numbers/i)).toBeNull()
  })
  // it('Testing validation with the wrong image', () => {
  //   render(<MyForm addUser={() => undefined} />)
  //   const testImage = [new File(['hello'], 'hello.dwg', { type: 'image/x-dwg' })]
  //   fireEvent.change(screen.getByLabelText(/avatar/i), { target: { files: [testImage] } })
  //   fireEvent.click(screen.getByRole('button', { name: /Create/i }))
  //   expect(screen.getByText(/The file should be an image/i)).toBeInTheDocument()
  // })
})

describe('User create', () => {
  it('User creating testing with image', async () => {
    const testUser: IUser = {
      id: 11111,
      firstName: 'Name',
      surName: 'Surname',
      date: new Date('2000-01-01'),
      sex: 'male',
      country: 'RU',
      notifications: false,
      avatar: 'data:image/png;base64,aGVsbG8=',
    }
    Date.now = vi.fn(() => testUser.id)
    const testImage = [new File(['hello'], 'hello.png', { type: 'image/png' })]
    const user = userEvent.setup()
    const addUser = vi.fn()
    render(<MyForm addUser={addUser} />)
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), testUser.firstName)
    await user.type(screen.getByRole('textbox', { name: /surname/i }), testUser.surName)
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } })
    await user.upload(screen.getByLabelText(/avatar/i), testImage)
    await user.selectOptions(screen.getByRole('combobox', { name: /country/i }), [testUser.country])
    await user.click(screen.getByLabelText(new RegExp(`^${testUser.sex}$`, 'i')))
    await user.click(screen.getByLabelText(/Agree with license/i))
    await user.click(screen.getByRole('button', { name: /Create/i }))
    await waitFor(() => {
      const argument = addUser.mock.calls[0][0]
      expect(argument).toEqual(testUser)
    })
  })
})
