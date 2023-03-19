import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyInputProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
  eMessage: string
}

class MyInput extends Component<MyInputProps> {
  id = `${this.props.type}-${this.props.children}`

  render() {
    const { children, innerref, eMessage, ...props } = this.props
    return (
      <div className="relative pb-5">
        <label htmlFor={this.id} className="block mb-1 text-sm font-medium text-gray-900">
          {children}
        </label>
        <input
          id={this.id}
          className={`border text-sm rounded-lg block w-full p-2.5
          ${eMessage ? 'border-red-500 text-red-900 bg-red-50' : 'bg-gray-50 text-gray-900 focus:ring-green-500 focus:border-green-500 border-gray-300'}`}
          ref={innerref}
          {...props}
          autoComplete="off"
        />
        {eMessage && <p className="absolute bottom-0 text-sm text-red-600 dark:text-red-500">{eMessage}</p>}
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyInputProps, 'innerref'>>((props, ref) => <MyInput innerref={ref} {...props} />)
