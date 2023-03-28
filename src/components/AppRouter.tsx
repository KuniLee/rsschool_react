import { Route, Routes } from 'react-router-dom'

import React, { FC } from 'react'
import { ERoutes, routes } from '@/router/routes'
import Layout from '@components/Layout'

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
