import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { APIResponse, AnimeInfo } from '../models'

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getAnimeSearch: build.query<APIResponse<AnimeInfo>, string>({
      query: (search) => ({
        url: 'anime',
        params: {
          q: search,
        },
      }),
    }),
  }),
})

export const { useGetAnimeSearchQuery } = jikanApi
