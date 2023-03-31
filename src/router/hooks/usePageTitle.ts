import { matchPath } from 'react-router-dom'
import { ERoutes } from '@/router/routes'

const pageNames: Record<ERoutes, string> = {
  [ERoutes.Form]: 'Form Page',
  [ERoutes.About]: 'About Us',
  [ERoutes.Main]: 'Main Page',
  [ERoutes.Root]: '',
}

export const usePageTitle = (pathname: string) => {
  const currentPageTitle = Object.keys(pageNames).find((key) => matchPath({ path: key }, pathname)) as ERoutes
  return currentPageTitle ? pageNames[currentPageTitle] : 'Not Found'
}
