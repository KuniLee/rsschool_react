import React, { ComponentPropsWithoutRef, forwardRef } from 'react'

type MyCheckboxProps = ComponentPropsWithoutRef<'input'>

export const MyCheckbox = forwardRef<HTMLInputElement, MyCheckboxProps>(({ children, ...props }, ref) => {
  const id = `${props.type}-${children}`

  return (
    <div className="flex items-center relative mb-1">
      <input
        {...props}
        id={id}
        type="checkbox"
        ref={ref}
        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded"
      />
      <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
        {children}
      </label>
    </div>
  )
})

export default MyCheckbox
