import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'

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

const pageNames: Record<ERoutes, string> = {
  [ERoutes.Form]: 'Form',
  [ERoutes.About]: 'About Us',
  [ERoutes.Main]: 'Main Page',
  [ERoutes.Root]: '',
  [ERoutes.NotFound]: 'Not Found',
}

class Navigation extends Component<RouterProps> {
  render() {
    const { route } = this.props

    function getLinkClass(linkRoute: ERoutes) {
      return `${LinkClasses.base} ${
        linkRoute === route ? LinkClasses.active : LinkClasses.nonActive
      }`
    }

    return (
      <nav className="border-b-2 border-emerald-600">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            {pageNames[route as ERoutes]}
          </span>
          <div className="w-auto">
            <ul className="flex p-4 rounded-lg text-sm font-medium">
              {navbarLinks.map((link, idx) => (
                <li key={idx}>
                  <Link className={getLinkClass(link.route)} to={link.route}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation
