import { vi, describe, it } from 'vitest'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserForm from './UserForm'
import React from 'react'
import { IUser } from '@/modules/UserForm/store/usersSlice'
import { renderWithProviders } from '@/utils/test-utils'

describe('UserForm', () => {
  it('Test render form', () => {
    renderWithProviders(<UserForm />)
    expect(screen.getByRole('textbox', { name: /firstname/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /surname/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/date of birth/i)).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create/i })).not.toBeDisabled()
  })

  it('Testing validation', async () => {
    const user = userEvent.setup()

    renderWithProviders(<UserForm />)
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

  it('Testing validation with the wrong image', async () => {
    const testImage = [new File(['hello'], 'hello.svg', { type: 'image/svg' })]

    renderWithProviders(<UserForm />)
    await userEvent.upload(screen.getByLabelText(/avatar/i), testImage, { applyAccept: false })
    await userEvent.click(screen.getByRole('button', { name: /Create/i }))
    expect(screen.getByText(/The file should be an image/i)).toBeInTheDocument()
  })
})

const mockedDispatch = vi.fn()

vi.mock('@/hooks/redux', () => ({
  useAppDispatch: () => mockedDispatch,
}))

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

    renderWithProviders(<UserForm />)
    await user.type(screen.getByRole('textbox', { name: /firstname/i }), testUser.firstName)
    await user.type(screen.getByRole('textbox', { name: /surname/i }), testUser.surName)
    fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } })
    await user.upload(screen.getByLabelText(/avatar/i), testImage)
    await user.selectOptions(screen.getByRole('combobox', { name: /country/i }), [testUser.country])
    await user.click(screen.getByLabelText(new RegExp(`^${testUser.sex}$`, 'i')))
    await user.click(screen.getByLabelText(/Agree with license/i))
    await user.click(screen.getByRole('button', { name: /Create/i }))
    await waitFor(() => {
      const argument = mockedDispatch.mock.calls[0][0].payload

      expect(argument).toEqual(testUser)
    })
  })
})
