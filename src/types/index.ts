import type { FormData } from '@components/MyForm/MyForm'

export const genders = ['male', 'female', 'other']
export type Genders = (typeof genders)[number]

export interface ICard {
  id: number
  name: string
  description: string
  rating: {
    rate: number
    count: number
  }
  price: number
  image: string
}

export type IUser = Omit<FormData, 'avatar' | 'agreement'> & {
  avatar: string
  id: number
}
