import React from 'react'
import UserCard from '../components/Cards/UserCard'
import { useAppSelector } from '@/hooks/redux'

const UserList = () => {
  const { users } = useAppSelector((state) => state.users)

  return (
    <div className="my-4 grid grid-cols-1 justify-items-center gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
