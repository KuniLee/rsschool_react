import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'

class Main extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.Main)
  }
  render() {
    return (
      <div>
        <h1>Main page</h1>
      </div>
    )
  }
}

export default Main
