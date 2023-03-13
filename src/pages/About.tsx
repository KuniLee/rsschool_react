import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'

class About extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.About)
  }
  render() {
    return (
      <div>
        <h1>About Page</h1>
      </div>
    )
  }
}

export default About
