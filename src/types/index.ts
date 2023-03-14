export enum ERoutes {
  About = 'about',
  Main = 'main',
  Root = '/',
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
