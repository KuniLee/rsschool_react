import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyRadioProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
}

class Radio extends Component<MyRadioProps> {
  id = `radio-${this.props.children}`

  render() {
    const { children, innerref, ...props } = this.props

    return (
      <div className="mb-1 flex items-center">
        <input
          type="radio"
          id={this.id}
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
          ref={innerref}
          {...props}
        />
        {children && (
          <label htmlFor={this.id} className="ml-2 text-sm font-medium">
            {children}
          </label>
        )}
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyRadioProps, 'innerref'>>((props, ref) => (
  <Radio innerref={ref} {...props} />
))
