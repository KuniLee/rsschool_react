import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'
import usersReducer from '@/modules/UserForm/store/usersSlice'
import catalogReducer from '@/modules/Catalog/store/catalogSlice'

const rootReducer = combineReducers({
  users: usersReducer,
  catalog: catalogReducer,
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
