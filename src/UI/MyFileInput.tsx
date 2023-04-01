import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyFileInputProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
  eMessage?: string
  desc: string
}

class MyFileInput extends Component<MyFileInputProps> {
  id = `file-${this.props.children}`

  render() {
    const { children, innerref, desc, eMessage, ...props } = this.props

    return (
      <div className="mb-1">
        <label htmlFor={this.id} className="block mb-1 text-sm font-medium text-gray-900">
          {children}
        </label>
        <input
          {...props}
          id={this.id}
          type="file"
          className={`block w-full text-sm border rounded-lg
          file:mr-4 file:py-2.5 file:px-2
      file:rounded-l-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-green-700
      hover:file:bg-violet-100
          ${
            eMessage
              ? 'border-red-500 text-red-900 bg-red-50'
              : 'bg-gray-50 text-gray-900 focus:ring-green-500 focus:border-green-500 border-gray-300'
          }`}
          ref={innerref}
        />
        {!eMessage ? (
          <p className="text-sm text-gray-500">{desc}</p>
        ) : (
          <p className="bottom-0 text-sm text-red-600 dark:text-red-500">{eMessage}</p>
        )}
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyFileInputProps, 'innerref'>>((props, ref) => (
  <MyFileInput innerref={ref} {...props} />
))
