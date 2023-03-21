import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

import React, { Component } from 'react'
import Main from '@/pages/Main'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'
import { ERoutes } from '@/types'
import Navigation from '@components/Navigation'
import FormPage from '@/pages/FormPage'

type AppRouterState = {
  route: ERoutes | null
}

class AppRouter extends Component<unknown, AppRouterState> {
  state: AppRouterState = {
    route: null,
  }

  setRoute = (route: ERoutes) => {
    this.setState({ ...this.state, route })
  }

  render() {
    return (
      <Routes>
        <Route
          path={ERoutes.Root}
          element={
            <>
              <header>
                <Navigation setRoute={this.setRoute} route={this.state.route} />
              </header>
              <main data-testid="main" className="container">
                <Outlet />
              </main>
            </>
          }>
          <Route path={ERoutes.Main} element={<Main setRoute={this.setRoute} />} />
          <Route path={ERoutes.About} element={<About setRoute={this.setRoute} />} />
          <Route path={ERoutes.Form} element={<FormPage setRoute={this.setRoute} />} />
          <Route path={ERoutes.Root} element={<Navigate to={ERoutes.Form} replace={true} />} />
          <Route path="*" element={<NotFound setRoute={this.setRoute} />} />
        </Route>
      </Routes>
    )
  }
}

export default AppRouter
