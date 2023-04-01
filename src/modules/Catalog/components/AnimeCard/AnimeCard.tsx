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
      className="p-5 w-full flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full h-[300px] self-center rounded-t-lg overflow-hidden">
        {loadingImg && (
          <div className="flex items-center justify-around h-full bg-green-200 animate-pulse">
            <Loader className="h-1/3" />
          </div>
        )}
        <img
          className={`bg-black mx-auto h-full object-contain ${loadingImg ? 'hidden' : 'block'}`}
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
