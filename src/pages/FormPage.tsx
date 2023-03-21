import React, { Component } from 'react'
import { ERoutes, IUser, RouterProps } from '@/types'
import MyForm from '@components/MyForm'

type FormPageState = {
  users: IUser[]
}

class FormPage extends Component<Pick<RouterProps, 'setRoute'>, FormPageState> {
  state = { users: [] }

  private addUser = (user: IUser) => {
    this.setState((s) => ({ ...s, users: [...s.users, user] }))
  }

  componentDidMount() {
    this.props.setRoute(ERoutes.Form)
  }

  render() {
    return <MyForm addUser={this.addUser} />
  }
}

export default FormPage
