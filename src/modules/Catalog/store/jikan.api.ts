import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { buildCreateApi, coreModule, reactHooksModule } from '@reduxjs/toolkit/query/react'
import type { APIResponse, AnimeInfo } from '../models'

const createApi = buildCreateApi(coreModule(), reactHooksModule({ unstable__sideEffectsInRender: true }))

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (build) => ({
    getAnimeSearch: build.query<APIResponse<AnimeInfo>, [string, number]>({
      query: ([search, page]) => ({
        url: 'anime',
        params: {
          q: search,
          limit: 12,
          page,
        },
      }),
    }),
  }),
})

export const { useGetAnimeSearchQuery, util } = jikanApi
