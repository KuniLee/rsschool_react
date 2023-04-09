import React, { ComponentPropsWithoutRef, forwardRef } from 'react'

type MyCheckboxProps = ComponentPropsWithoutRef<'input'>

export const Checkbox = forwardRef<HTMLInputElement, MyCheckboxProps>(({ children, ...props }, ref) => {
  const id = `${props.type}-${children}`

  return (
    <div className="relative mb-1 flex items-center">
      <input
        {...props}
        id={id}
        type="checkbox"
        ref={ref}
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium">
        {children}
      </label>
    </div>
  )
})

export default Checkbox
