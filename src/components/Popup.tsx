import React, { FC, MouseEventHandler, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import MyButton from '@components/UI/MyButton'

type PopupProps = {
  open: boolean
  msg: string
  onOk: MouseEventHandler
}

const Popup: FC<PopupProps> = ({ msg, onOk, open }) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  return (
    <CSSTransition
      timeout={500}
      nodeRef={nodeRef}
      in={open}
      classNames={{ enterActive: '!z-50 opacity-100', enterDone: '!z-50 opacity-100', exitActive: '!z-50' }}>
      <div
        ref={nodeRef}
        className={`transition-opacity duration-500 flex -z-10 fixed opacity-0 items-center justify-center top-0 left-0 right-0 w-screen h-screen backdrop-blur-sm`}>
        <div className="bg-green-100 p-4 rounded-lg border-4 border-green-600 max-w-[300px] flex flex-col justify-center">
          <p className="mb-2">{msg}</p>
          <MyButton
            onClick={(event) => {
              event.preventDefault()
              onOk(event)
            }}>
            Ок
          </MyButton>
        </div>
      </div>
    </CSSTransition>
  )
}

export default Popup
