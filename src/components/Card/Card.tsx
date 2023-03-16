import React, { Component } from 'react'
import Rating from '@components/UI/Rating'
import MyButton from '@components/UI/MyButton'
import { ICard } from '@/types'

export type CardProps = {
  card: ICard
}

class Card extends Component<CardProps> {
  render() {
    const {
      card: {
        image,
        title,
        rating: { rate },
        price,
      },
    } = this.props
    return (
      <div
        data-testid="card"
        className="p-5 w-full flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <img className="self-center max-h-[200px] rounded-t-lg" src={image} alt="product image" />
        <div className="">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <Rating rate={rate} className="my-2" />
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">${price}</span>
            <MyButton>Add to Cart</MyButton>
          </div>
        </div>
      </div>
    )
  }
}

export default Card
