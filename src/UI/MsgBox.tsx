import React, { Component, ReactNode } from 'react'

type MyRadioListProps = {
  eMessage?: string
  children: ReactNode
  title?: string
}

class MsgBox extends Component<MyRadioListProps> {
  render() {
    const { eMessage, children, title } = this.props

    return (
      <div className="pb-5">
        {title && <p className="mb-1 block text-sm font-medium">{title}</p>}
        <div className={eMessage && 'rounded border border-red-600'}>{children}</div>
        {eMessage && <p className="absolute text-sm text-red-600">{eMessage}</p>}
      </div>
    )
  }
}

export default MsgBox
