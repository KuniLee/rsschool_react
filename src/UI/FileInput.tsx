import React, { Component, ComponentPropsWithoutRef } from 'react'

type MyFileInputProps = ComponentPropsWithoutRef<'input'> & {
  innerref: React.ForwardedRef<HTMLInputElement>
  eMessage?: string
  desc: string
}

class FileInput extends Component<MyFileInputProps> {
  id = `file-${this.props.children}`

  render() {
    const { children, innerref, desc, eMessage, ...props } = this.props

    return (
      <div className="mb-1">
        <label htmlFor={this.id} className="mb-1 block text-sm font-medium">
          {children}
        </label>
        <input
          {...props}
          id={this.id}
          type="file"
          className={`block w-full rounded-lg border text-sm file:mr-4 file:rounded-l-lg file:border-0
      file:bg-violet-50 file:px-2 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700
      hover:file:bg-violet-100
          ${
            eMessage
              ? 'border-red-500 bg-red-50 text-red-900'
              : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }`}
          ref={innerref}
        />
        {!eMessage ? (
          <p className="text-sm text-gray-400">{desc}</p>
        ) : (
          <p className="bottom-0 text-sm text-red-600 dark:text-red-500">{eMessage}</p>
        )}
      </div>
    )
  }
}

export default React.forwardRef<HTMLInputElement, Omit<MyFileInputProps, 'innerref'>>((props, ref) => (
  <FileInput innerref={ref} {...props} />
))
