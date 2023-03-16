import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'
import MyForm from '@components/MyForm'

class FormPage extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.Form)
  }

  render() {
    return <MyForm />
  }
}

export default FormPage
