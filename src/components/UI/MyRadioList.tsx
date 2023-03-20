import React, { Component, ReactNode } from 'react'

type MyRadioListProps = {
  eMessage: string
  children: ReactNode
  title: string
}

class MyRadioList extends Component<MyRadioListProps> {
  render() {
    const { eMessage, children, title } = this.props
    return (
      <div className="pb-5">
        <p className="block mb-1 text-sm font-medium text-gray-900">{title}</p>
        <div className={eMessage && 'rounded border border-red-300'}>{children}</div>
        {eMessage && <p className="absolute text-sm text-red-600 dark:text-red-500">{eMessage}</p>}
      </div>
    )
  }
}

export default MyRadioList
