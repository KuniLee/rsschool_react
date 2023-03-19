import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyRadioProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
}

class MyRadio extends Component<MyRadioProps> {
  id = `radio-${this.props.children}`

  render() {
    const { children, innerref, ...props } = this.props
    return (
      <div className="flex items-center mb-1">
        <input type="radio" id={this.id} className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300" {...props} ref={innerref} />
        {children && (
          <label htmlFor={this.id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {children}
          </label>
        )}
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyRadioProps, 'innerref'>>((props, ref) => <MyRadio innerref={ref} {...props} />)
