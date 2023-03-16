import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'

class FormPage extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.Form)
  }
  render() {
    return (
      <div>
        <h1 className="mx-auto mt-2 text-center text-4xl">Form Page</h1>
      </div>
    )
  }
}

export default FormPage
