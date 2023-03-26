import React, { Component } from 'react'
import { IUser } from '@/types'
import MyForm from '@components/MyForm/MyForm'
import UserCard from '@components/Cards/UserCard'

type FormPageState = {
  users: IUser[]
}

class FormPage extends Component<unknown, FormPageState> {
  state: FormPageState = {
    users: [],
  }

  private addUser = (user: IUser) => {
    this.setState((s) => ({ users: [...s.users, user] }))
  }

  render() {
    const { users } = this.state
    return (
      <>
        <MyForm addUser={this.addUser} />
        <div className="my-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </>
    )
  }
}

export default FormPage
