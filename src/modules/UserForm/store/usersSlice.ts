import * as toolkitRaw from '@reduxjs/toolkit'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const { createSlice } = ((toolkitRaw as never).default ?? toolkitRaw) as typeof toolkitRaw

import type { PayloadAction } from '@reduxjs/toolkit'
import { Genders } from '@/modules/UserForm/types'

export type FormData = {
  firstName: string
  surName: string
  avatar: FileList
  date: number
  country: string
  sex: Genders
  notifications: boolean
  agreement: boolean
}

export type IUser = Omit<FormData, 'avatar' | 'agreement'> & {
  avatar: string
  id: number
}

interface UsersState {
  users: IUser[]
}

const initialState: UsersState = {
  users: [],
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload)
    },
  },
})

export const { addUser } = usersSlice.actions

export default usersSlice.reducer
