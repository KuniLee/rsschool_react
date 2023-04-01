import axios, { AxiosResponse } from 'axios'
import { AnimeInfo } from '../types'

type APIResponse = {
  data: Array<AnimeInfo>
}

export default class PostService {
  static async getAnimeWithSearch(search: string, limit = 10, page = 1): Promise<AxiosResponse<APIResponse>> {
    return await axios.get('https://api.jikan.moe/v4/anime', {
      params: { limit, page: page, q: search },
    })
  }
}
