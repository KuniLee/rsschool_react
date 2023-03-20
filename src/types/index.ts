export enum ERoutes {
  About = 'about',
  Main = 'main',
  Root = '/',
  Form = 'form',
  NotFound = 'Not found',
}

export type RouterProps = {
  route: ERoutes | null
  setRoute: (route: ERoutes) => void
}

export interface ICard {
  id: number
  title: string
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
  country: string
  notifications: boolean
  sex: 'male' | 'female' | 'other'
  avatar: Blob
}
