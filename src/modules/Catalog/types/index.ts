export type AnimeInfo = {
  title: string
  title_english: string
  mal_id: number
  images: {
    jpg: AnimeImages
    webp: AnimeImages
  }
}

type AnimeImages = {
  image_url: string
  large_image_url: string
  small_image_url: string
}
