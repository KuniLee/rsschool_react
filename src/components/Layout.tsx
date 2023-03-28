import React, { FC } from 'react'
import Navigation from '@components/Navigation'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main data-testid="main" className="container">
        <Outlet />
      </main>
    </>
  )
}

export default Layout
