import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CatalogState {
  page: number
  search: string
}

const initialState: CatalogState = {
  page: 1,
  search: '',
}

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
})

export const { setPage, setSearch } = catalogSlice.actions

export default catalogSlice.reducer
