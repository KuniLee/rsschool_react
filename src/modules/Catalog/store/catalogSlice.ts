import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.page = 1
      state.search = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeCards.fulfilled, (state, action) => {
      state.cards = action.payload.data
      state.pageCount = action.payload.pagination.last_visible_page
      state.isLoading = false
      state.error = ''
    })
    builder.addCase(fetchAnimeCards.pending, (state) => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(fetchAnimeCards.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload || 'Error'
    })
  },
})

export const { setPage, setSearch } = catalogSlice.actions

export default catalogSlice.reducer
