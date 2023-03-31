import React, { ComponentPropsWithoutRef, FC } from 'react'
import { ReactComponent as Spinner } from './assets/circles.svg'

const Loader: FC<ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div {...props}>
      <Spinner className="fill-green-700 w-full h-full"></Spinner>
    </div>
  )
}

export default Loader
