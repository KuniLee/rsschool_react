import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import usersReducer from '@/modules/UserForm/store/usersSlice'
import { jikanApi } from '@/modules/Catalog/store/jikan.api'

const rootReducer = combineReducers({
  users: usersReducer,
  [jikanApi.reducerPath]: jikanApi.reducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jikanApi.middleware),
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
