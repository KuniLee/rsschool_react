export enum ERoutes {
  About = 'about',
  Main = 'main',
  Root = '/',
  Form = 'form',
  NotFound = 'Not found',
}

export const genders = ['male', 'female', 'other']
export type Genders = (typeof genders)[number]

export type RouterProps = {
  route: ERoutes | null
  setRoute: (route: ERoutes) => void
}

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

export interface IUser {
  id: number
  name: string
  date: Date
  country: string
  notifications: boolean
  sex: Genders
  avatar: string | null
}
