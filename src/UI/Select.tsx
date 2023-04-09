import React, { Component, ComponentPropsWithoutRef } from 'react'

type MySelectProps = ComponentPropsWithoutRef<'select'> & {
  innerref: React.ForwardedRef<HTMLSelectElement>
  options: Array<{ name: string; value: string }>
  eMessage?: string
  defaultName: string
}

class Select extends Component<MySelectProps> {
  id = `select-${this.props.defaultName}`

  render() {
    const { children, innerref, defaultName, eMessage, options, ...props } = this.props

    return (
      <div className="relative pb-5">
        {children && (
          <label htmlFor={this.id} className="mb-1 block text-sm font-medium">
            {children}
          </label>
        )}
        <select
          defaultValue="default"
          id={this.id}
          className={`block w-full rounded-lg border p-2.5 text-sm
          ${
            eMessage
              ? 'border-red-500 bg-red-50 text-red-900'
              : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }`}
          ref={innerref}
          {...props}>
          <option value="default" disabled>
            {defaultName}
          </option>
          {options.map((el) => (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
        {eMessage && <p className="absolute bottom-0 text-sm text-red-600">{eMessage}</p>}
      </div>
    )
  }
}

export default React.forwardRef<HTMLSelectElement, Omit<MySelectProps, 'innerref'>>((props, ref) => (
  <Select innerref={ref} {...props} />
))
