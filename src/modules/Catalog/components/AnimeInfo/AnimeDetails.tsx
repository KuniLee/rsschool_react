import React, { FC } from 'react'
import { AnimeInfo } from '../../models'
import Rating from '@/UI/Rating'

type Props = {
  card: AnimeInfo
}

const AnimeDetails: FC<Props> = ({ card }) => {
  const { title, rating, score, synopsis } = card

  return (
    <div className="scr flex max-h-[85vh] max-w-[70vw] flex-col items-start gap-2 overflow-y-scroll md:flex-row xl:max-w-[1000px]">
      <img className="max-h-[200px] object-contain md:max-h-none" src={card.images.webp.image_url} alt="anime_Image" />
      <div className="w-full">
        <h4 className="mb-2 text-2xl">{title}</h4>
        <p>Release date: {card.aired.string}</p>
        <p className="flex flex-wrap">
          Genres:
          {card.genres.map(({ name, mal_id }) => (
            <span className="mx-0.5 rounded-lg border bg-blue-300 px-0.5 text-blue-900" key={mal_id}>
              {name}
            </span>
          ))}
        </p>
        <p>Rating: {rating}</p>
        <p className="flex">
          Score: <Rating className="ml-2" rate={score} />
        </p>
        <p className="mt-4 text-sm">Synopsis: {synopsis}</p>
      </div>
    </div>
  )
}

export default AnimeDetails
