import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserCard from './UserCard'

describe('Test UserCard Component:', () => {
  it('render card', function () {
    const testUser = {
      id: 1,
      firstName: 'Test Name',
      surName: 'Test Name',
      date: new Date('2000-01-01'),
      sex: 'other',
      country: 'FR',
      notifications: true,
      avatar: '',
    }
    render(<UserCard user={testUser} />)
    expect(screen.getByAltText(`avatar:${testUser.id}`)).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(testUser.firstName)
  })
})
