import React, { Component } from 'react'
import { ERoutes, ICard, RouterProps } from '@/types'
import Search from '@components/Search'
import Catalog from '@components/Catalog'
import axios from 'axios'

class Main extends Component<Pick<RouterProps, 'setRoute'>, { cards: Array<ICard> }> {
  state = {
    cards: [],
  }

  componentDidMount() {
    this.props.setRoute(ERoutes.Main)
    this.getProducts()
  }

  async getProducts() {
    try {
      const response = await axios('https://fakestoreapi.com/products?limit=10')
      this.setState({ cards: await response.data })
    } catch (e) {
      console.log(e)
    }
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
