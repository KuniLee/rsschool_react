export type AnimeInfo = {
  title: string
  aired: { string: string }
  title_english: string
  mal_id: number
  rating: string
  score: number
  synopsis: string
  images: {
    jpg: AnimeImages
    webp: AnimeImages
  }
  genres: Array<{ name: string; mal_id: number }>
}

type AnimeImages = {
  image_url: string
  large_image_url: string
  small_image_url: string
}

export type PaginationData = {
  current_page: number
  has_next_page: number
  items: { count: number; total: number; per_page: number }
  last_visible_page: number
}

export type APIResponse<T> = {
  pagination: PaginationData
  data: Array<T>
}
