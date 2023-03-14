import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'

class NotFound extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.NotFound)
  }
  render() {
    return (
      <div>
        <h1 className="mx-auto mt-2 text-center text-4xl">Not Found</h1>
      </div>
    )
  }
}
export default NotFound
