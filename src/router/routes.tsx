import React, { ReactNode } from 'react'
import About from '../pages/About'
import NotFound from '../pages/NotFound'
import { Navigate } from 'react-router-dom'
import MainPage from '@/pages/MainPage/MainPage'
import FormPage from '@/pages/FormPage/FormPage'

export enum ERoutes {
  About = 'about',
  Main = 'main',
  Root = '/',
  Form = 'form',
}

type Route = {
  path: string
  element: ReactNode
}

export const routes: Route[] = [
  { path: ERoutes.About, element: <About /> },
  { path: ERoutes.Main, element: <MainPage /> },
  { path: ERoutes.Form, element: <FormPage /> },
  { path: ERoutes.Root, element: <Navigate to={ERoutes.Form} replace={true} /> },
  { path: '*', element: <NotFound /> },
]
