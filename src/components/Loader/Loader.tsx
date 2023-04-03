import React, { ComponentPropsWithoutRef, FC } from 'react'
import { ReactComponent as Spinner } from './assets/circles.svg'

const Loader: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div {...props}>
      <Spinner className="h-full w-full fill-green-700"></Spinner>
    </div>
  )
}

export default Loader
