import React, { Component, ComponentPropsWithoutRef } from 'react'

type MySelectProps = ComponentPropsWithoutRef<'select'> & {
  innerref: React.ForwardedRef<HTMLSelectElement>
  options: Array<{ name: string; value: string }>
  eMessage: string
  defaultName: string
}

class MySelect extends Component<MySelectProps> {
  id = `select-${this.props.defaultName}`

  render() {
    const { children, innerref, defaultName, eMessage, options, ...props } = this.props
    return (
      <div className="relative pb-5 mb-2">
        {children && (
          <label htmlFor={this.id} className="block mb-1 text-sm font-medium text-gray-900">
            {children}
          </label>
        )}
        <select
          defaultValue="default"
          id={this.id}
          className={`border text-sm rounded-lg block w-full p-2.5
          ${eMessage ? 'border-red-500 text-red-900 bg-red-50' : 'bg-gray-50 text-gray-900 focus:ring-green-500 focus:border-green-500 border-gray-300'}`}
          ref={innerref}
          {...props}
        >
          <option value="default" disabled>
            {defaultName}
          </option>
          {options.map((el) => (
            <option key={el.value} value={el.value}>
              {el.name}
            </option>
          ))}
        </select>
        {eMessage && <p className="absolute bottom-0 text-sm text-red-600 dark:text-red-500">{eMessage}</p>}
      </div>
    )
  }
}

export default React.forwardRef<HTMLSelectElement, Omit<MySelectProps, 'innerref'>>((props, ref) => <MySelect innerref={ref} {...props} />)
