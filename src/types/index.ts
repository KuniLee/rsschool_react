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
