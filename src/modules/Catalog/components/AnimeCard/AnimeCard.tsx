import React, { FC, useEffect, useRef, useState } from 'react'
import { AnimeInfo } from '../../models'
import Loader from '@components/Loader/Loader'

export type CardProps = {
  card: AnimeInfo
  openCard: (card: AnimeInfo) => void
}

const AnimeCard: FC<CardProps> = ({ card, openCard }) => {
  const [loadingImg, setLoadingImg] = useState(true)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (ref.current?.complete) setLoadingImg(false)
  }, [])

  return (
    <div
      data-testid="card"
      onClick={() => openCard(card)}
      className="flex w-full max-w-sm cursor-pointer flex-col rounded-lg bg-gray-700 p-2 shadow">
      <div className="h-[300px] w-full self-center overflow-hidden rounded border border-gray-300">
        {loadingImg && (
          <div className="flex h-full animate-pulse items-center justify-around bg-blue-200">
            <Loader className="h-1/3" />
          </div>
        )}
        <img
          ref={ref}
          className={`mx-auto h-full object-contain ${loadingImg ? 'hidden' : 'block'}`}
          onLoad={() => {
            setLoadingImg(false)
          }}
          src={card.images.webp.image_url}
          alt="product image"
        />
      </div>
      <h5 className="mt-1 text-xl font-semibold tracking-tight">{card.title}</h5>
    </div>
  )
}

export default AnimeCard
