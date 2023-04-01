import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

type MyInputProps = ComponentPropsWithoutRef<'input'> & {
  eMessage?: string
}

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(({ children, eMessage, ...props }, ref) => {
  const id = `${props.type}-${useId()}`

  return (
    <div className="relative pb-5">
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900">
        {children}
      </label>
      <input
        id={id}
        className={`border text-sm rounded-lg block w-full p-2.5
          ${
            eMessage
              ? 'border-red-500 text-red-900 bg-red-50'
              : 'bg-gray-50 text-gray-900 focus:ring-green-500 focus:border-green-500 border-gray-300'
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
