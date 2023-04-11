import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Genders } from '@/modules/UserForm/types'

export type FormData = {
  firstName: string
  surName: string
  avatar: FileList
  date: Date
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
