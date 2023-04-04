import { ComponentPropsWithoutRef, FC } from 'react'
import cx from 'classnames'

export const CloseBtn: FC<ComponentPropsWithoutRef<'button'>> = (props) => {
  return (
    <button
      type="button"
      {...props}
      className={cx(
        'inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500',
        props.className
      )}>
      <span className="sr-only"> Close menu </span>
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  )
}

export default CloseBtn
