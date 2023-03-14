import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'
import Search from '@components/Search'
import MyButton from '@components/UI/button/MyButton'

class Main extends Component<Pick<RouterProps, 'setRoute'>> {
  componentDidMount() {
    this.props.setRoute(ERoutes.Main)
  }

  render() {
    return (
      <div className="p-3">
        <Search />
        <MyButton>BTN</MyButton>
      </div>
    )
  }
}

export default Main
