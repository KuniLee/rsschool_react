import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { ERoutes, RouterProps } from '@/types'

const navbarLinks = [
  { name: 'Main', route: ERoutes.Main },
  { name: 'About Us', route: ERoutes.About },
]

class Navigation extends Component<RouterProps> {
  render() {
    return (
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            {this.props.route}
          </span>
          <div className="w-full md:w-auto">
            <ul
              className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row
            md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              {navbarLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white"
                    to={link.route}
                  >
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
