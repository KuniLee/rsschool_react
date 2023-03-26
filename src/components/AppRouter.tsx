import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import React, { Component } from 'react'
import Main from '@/pages/Main'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'
import { ERoutes } from '@/types'
import Navigation from '@components/Navigation'
import FormPage from '@/pages/FormPage'

class AppRouter extends Component<unknown> {
  render() {
    return (
      <Routes>
        <Route
          path={ERoutes.Root}
          element={
            <>
              <header>
                <Navigation />
              </header>
              <main data-testid="main" className="container">
                <Outlet />
              </main>
            </>
          }>
          <Route path={ERoutes.Main} element={<Main />} />
          <Route path={ERoutes.About} element={<About />} />
          <Route path={ERoutes.Form} element={<FormPage />} />
          <Route path={ERoutes.Root} element={<Navigate to={ERoutes.Form} replace={true} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    )
  }
}

export default AppRouter
