import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyCheckboxProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
}

class MyCheckbox extends Component<MyCheckboxProps> {
  id = `${this.props.type}-${this.props.children}`

  render() {
    const { children, innerref, ...props } = this.props
    return (
      <div className="flex items-center relative mb-1">
        <input id={this.id} type="checkbox" ref={innerref} {...props} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded" />
        <label htmlFor={this.id} className="ml-2 text-sm font-medium text-gray-900">
          {children}
        </label>
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyCheckboxProps, 'innerref'>>((props, ref) => <MyCheckbox innerref={ref} {...props} />)
