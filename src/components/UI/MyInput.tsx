import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyInputProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
}

class MyInput extends Component<MyInputProps> {
  id = `${this.props.type}-${this.props.children}`

  render() {
    const { children, innerref, ...props } = this.props
    return (
      <>
        <label htmlFor={this.id} className="block mb-1 text-sm font-medium text-gray-900">
          {children}
        </label>
        <input
          id={this.id}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 mb-1"
          ref={innerref}
          {...props}
        />
      </>
    )
  }
}

export default React.forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>((props, ref) => <MyInput innerref={ref} {...props} />)
