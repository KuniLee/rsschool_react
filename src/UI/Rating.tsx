import React, { Component, ComponentPropsWithoutRef } from 'react'

type RatingProps = ComponentPropsWithoutRef<'div'> & {
  rate: number
}

class Rating extends Component<RatingProps> {
  drawStars(rate: number) {
    const stars = []
    const roundedRate = Math.round(rate)
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          aria-hidden="true"
          className={`w-5 h-5 ${roundedRate >= i ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <title>star</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      )
    }
    return stars
  }

  render() {
    const { className } = this.props
    const { rate } = this.props
    return (
      <div className={'flex items-center' + ' ' + className}>
        {this.drawStars(rate)}
        <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
          {rate}
        </span>
      </div>
    )
  }
}

export default Rating
