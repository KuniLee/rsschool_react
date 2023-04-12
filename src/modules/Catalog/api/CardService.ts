import axios, { AxiosResponse } from 'axios'
import { AnimeInfo } from '../models'

export type PaginationData = {
  current_page: number
  has_next_page: number
  items: { count: number; total: number; per_page: number }
  last_visible_page: number
}

export type APIResponse = {
  pagination: PaginationData
  data: Array<AnimeInfo>
}

export default class PostService {
  static async getAnimeWithSearch(search: string, page = 1, limit = 12): Promise<AxiosResponse<APIResponse>> {
    return await axios.get('https://api.jikan.moe/v4/anime', {
      params: { limit, page: page, q: search === '' ? undefined : search },
    })
  }
}
