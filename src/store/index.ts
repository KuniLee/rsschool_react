import * as toolkitRaw from '@reduxjs/toolkit'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const { combineReducers, configureStore } = ((toolkitRaw as never).default ?? toolkitRaw) as typeof toolkitRaw

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
