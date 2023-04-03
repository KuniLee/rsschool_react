import React, { FC, useState } from 'react'
import { AnimeInfo } from '../../types'
import Loader from '@components/Loader/Loader'

export type CardProps = {
  card: AnimeInfo
}

const AnimeCard: FC<CardProps> = ({ card: { title, images } }) => {
  const [loadingImg, setLoadingImg] = useState(true)

  return (
    <div
      data-testid="card"
      className="flex w-full max-w-sm flex-col rounded-lg border border-gray-200 bg-white p-5 shadow dark:border-gray-700 dark:bg-gray-800">
      <div className="h-[300px] w-full self-center overflow-hidden rounded-t-lg">
        {loadingImg && (
          <div className="flex h-full animate-pulse items-center justify-around bg-green-200">
            <Loader className="h-1/3" />
          </div>
        )}
        <img
          className={`mx-auto h-full bg-black object-contain ${loadingImg ? 'hidden' : 'block'}`}
          onLoad={() => {
            setLoadingImg(false)
          }}
          src={images.webp.image_url}
          alt="product image"
        />
      </div>
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    </div>
  )
}

export default AnimeCard
