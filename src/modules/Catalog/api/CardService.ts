import axios, { AxiosResponse } from 'axios'

export default class PostService {
  static async getAnimeWithSearch(
    search = 'naruto',
    limit = 10,
    page = 1
  ): Promise<
    AxiosResponse<{
      data: Array<{
        title: string
      }>
    }>
  > {
    return await axios.get('https://api.jikan.moe/v4/anime', {
      params: { limit, page: page, q: search, type: 'tv' },
    })
  }
}
