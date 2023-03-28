import { Route, Routes } from 'react-router-dom'

import React, { FC } from 'react'
import { ERoutes, routes } from './routes'
import Layout from './Layout'

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={ERoutes.Root} element={<Layout />}>
        {routes.map((route, idx) => (
          <Route path={route.path} key={idx} element={route.element} />
        ))}
      </Route>
    </Routes>
  )
}

export default AppRouter
