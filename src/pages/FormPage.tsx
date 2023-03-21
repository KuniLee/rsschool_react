import React, { Component } from 'react'
import { ERoutes, IUser, RouterProps } from '@/types'
import MyForm from '@components/MyForm/MyForm'
import UserCard from '@components/Card/UserCard'

type FormPageState = {
  users: IUser[]
}

class FormPage extends Component<Pick<RouterProps, 'setRoute'>, FormPageState> {
  state: FormPageState = {
    users: [],
  }

  private addUser = (user: IUser) => {
    this.setState((s) => ({ ...s, users: [...s.users, user] }))
  }

  componentDidMount() {
    this.props.setRoute(ERoutes.Form)
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
