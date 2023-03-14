import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'
import Search from '@components/Search'

class Main extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.Main)
  }

  render() {
    return (
      <div className="p-3">
        <Search />
      </div>
    )
  }
}

export default Main
