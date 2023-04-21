import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeInfo } from '@/modules/Catalog'
import { APIResponse } from '../models'

interface CatalogState {
  page: number
  search: string
  cards: AnimeInfo[]
  error: string
  isLoading: boolean
  pageCount: number
}

const initialState: CatalogState = {
  page: 1,
  search: '',
  cards: [],
  error: '',
  isLoading: false,
  pageCount: 0,
}

export const fetchAnimeCards = createAsyncThunk<
  APIResponse<AnimeInfo>,
  { page: number; search: string },
  { rejectValue: string }
>('catalog/fetchAnimeCards', async ({ page, search }, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}&limit=12&page=${page}`)

    if (!response.ok) {
      return rejectWithValue(response.statusText)
    }

    return await response.json()
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Error')
  }
})

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeCards.fulfilled, (state, action) => {
        state.search = action.meta.arg.search
        state.cards = action.payload.data
        state.pageCount = action.payload.pagination.last_visible_page
        state.isLoading = false
        state.error = ''
        state.page = action.payload.pagination.current_page
      })
      .addCase(fetchAnimeCards.pending, (state) => {
        state.isLoading = true
        state.error = ''
      })
      .addCase(fetchAnimeCards.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Error'
      })
  },
})

//export const { setSearch } = catalogSlice.actions

export default catalogSlice.reducer
