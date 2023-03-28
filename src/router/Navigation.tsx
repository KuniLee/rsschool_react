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
  base: 'block px-2 md:px-4 rounded p-0',
  active: 'bg-transparent text-green-700',
  nonActive: 'text-gray-700 p-0 hover:bg-transparent border-0 hover:text-green-700',
}

function getLinkClass({ isActive }: { isActive: boolean }) {
  return `${LinkClasses.base} ${isActive ? LinkClasses.active : LinkClasses.nonActive}`
}

const Navigation: FC = () => {
  const { pathname } = useLocation()
  return (
    <nav className="border-b-2 border-emerald-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <span className="self-center text-xl font-semibold whitespace-nowrap">{usePageTitle(pathname)}</span>
        <div className="w-auto">
          <ul className="flex p-4 rounded-lg text-sm font-medium">
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
