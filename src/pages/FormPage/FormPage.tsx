import React, { FC, useState } from 'react'
import CreationForm, { IUser } from '@/modules/CreactionForm'
import UserCard from './components/Cards/UserCard'

const FormPage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const addUser = (user: IUser) => {
    setUsers((s) => [...s, user])
  }
  return (
    <>
      <CreationForm addUser={addUser} />
      <div className="my-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}

export default FormPage
