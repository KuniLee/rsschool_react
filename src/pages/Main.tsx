import React, { Component } from 'react'
import { ERoutes, ICard, RouterProps } from '@/types'
import Search from '@components/Search'
import Catalog from '@components/Catalog'

class Main extends Component<Pick<RouterProps, 'setRoute'>, { cards: Array<ICard> }> {
  state = {
    cards: [],
  }

  componentDidMount() {
    this.props.setRoute(ERoutes.Main)
    this.getProducts()
  }

  async getProducts() {
    const response = await fetch('https://fakestoreapi.com/products?limit=10')
    this.setState({ cards: await response.json() })
  }

  render() {
    const { cards } = this.state
    return (
      <div className="py-4">
        <Search />
        <Catalog cards={cards} />
      </div>
    )
  }
}

export default Main
