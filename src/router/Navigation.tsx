import { NavLink, useLocation } from 'react-router-dom'
import React, { FC } from 'react'
import { usePageTitle } from './hooks/usePageTitle'
import { ERoutes } from './routes'

const navbarLinks = [
  { name: 'Main', route: ERoutes.Main },
  { name: 'Form', route: ERoutes.Form },
  { name: 'About Us', route: ERoutes.About },
]

const LinkClasses = {
  base: 'block font-semibold text-lg px-2 md:px-4 rounded p-0',
  active: 'bg-transparent text-blue-400',
  nonActive: ' text-gray-200 p-0 hover:bg-transparent border-0 hover:text-blue-400',
}

function getLinkClass({ isActive }: { isActive: boolean }) {
  return `${LinkClasses.base} ${isActive ? LinkClasses.active : LinkClasses.nonActive}`
}

const Navigation: FC = () => {
  const { pathname } = useLocation()

  return (
    <nav className="border-b-2 border-blue-800">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <span className="self-center whitespace-nowrap text-xl font-semibold">{usePageTitle(pathname)}</span>
        <div className="w-auto">
          <ul className="flex rounded-lg p-4 text-sm font-medium">
            {navbarLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink className={getLinkClass} to={link.route}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
