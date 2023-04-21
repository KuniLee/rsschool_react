import React, { ComponentPropsWithoutRef, forwardRef, useId } from 'react'

type MyInputProps = Omit<ComponentPropsWithoutRef<'input'>, 'children'> & {
  eMessage?: string
  children: string
}

export const Input = forwardRef<HTMLInputElement, MyInputProps>(({ children, eMessage, ...props }, ref) => {
  const id = `${props.type}-${useId()}`

  return (
    <div className="relative pb-5">
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {children}
      </label>
      <input
        id={id}
        className={`block w-full rounded-lg border p-2.5 text-sm
          ${
            eMessage
              ? 'border-red-500 bg-red-50 text-red-900'
              : 'border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
          }`}
        ref={ref}
        {...props}
        autoComplete="off"
      />
      {eMessage && <p className="absolute bottom-0 text-sm text-red-600">{eMessage}</p>}
    </div>
  )
})

export default Input
