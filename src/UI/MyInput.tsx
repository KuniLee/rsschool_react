import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

type MyInputProps = ComponentPropsWithoutRef<'input'> & {
  eMessage?: string
}

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({ children, eMessage, ...props }, ref) => {
  const id = `${props.type}-${useId()}`

  return (
    <div className="relative pb-5">
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-900">
        {children}
      </label>
      <input
        id={id}
        className={`block w-full rounded-lg border p-2.5 text-sm
          ${
            eMessage
              ? 'border-red-500 bg-red-50 text-red-900'
              : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-green-500 focus:ring-green-500'
          }`}
        ref={ref}
        {...props}
        autoComplete="off"
      />
      {eMessage && <p className="absolute bottom-0 text-sm text-red-600 dark:text-red-500">{eMessage}</p>}
    </div>
  )
})

export default MyInput
