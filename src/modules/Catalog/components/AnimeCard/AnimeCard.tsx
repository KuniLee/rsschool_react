import React, { FC, useState } from 'react'
import { AnimeInfo } from '../../types'
import Loader from '@components/Loader/Loader'

export type CardProps = {
  card: AnimeInfo
}

const AnimeCard: FC<CardProps> = ({ card: { title, images } }) => {
  const [loadingImg, setLoadingImg] = useState(true)

  return (
    <div data-testid="card" className="flex w-full max-w-sm flex-col rounded-lg bg-gray-700 p-2 shadow">
      <div className="h-[300px] w-full self-center overflow-hidden rounded border border-gray-300">
        {loadingImg && (
          <div className="flex h-full animate-pulse items-center justify-around bg-blue-200">
            <Loader className="h-1/3" />
          </div>
        )}
        <img
          className={`mx-auto h-full object-contain ${loadingImg ? 'hidden' : 'block'}`}
          onLoad={() => {
            setLoadingImg(false)
          }}
          src={images.webp.image_url}
          alt="product image"
        />
      </div>
      <h5 className="mt-1 text-xl font-semibold tracking-tight">{title}</h5>
    </div>
  )
}

export default AnimeCard
