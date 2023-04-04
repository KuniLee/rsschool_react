import React, { FC, PropsWithChildren, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { createPortal } from 'react-dom'
import CloseBtn from '@/UI/CloseBtn'

type PopupProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
}>

const Popup: FC<PopupProps> = ({ children, onClose, open }) => {
  const nodeRef = useRef<HTMLDivElement>(null)

  return createPortal(
    <CSSTransition
      timeout={500}
      nodeRef={nodeRef}
      in={open}
      classNames={{ enterActive: '!z-50 opacity-100', enterDone: '!z-50 opacity-100', exitActive: '!z-50' }}>
      <div
        onClick={() => onClose()}
        ref={nodeRef}
        className={`fixed inset-0 -z-10 flex h-screen w-screen items-center justify-center opacity-0 
        backdrop-blur-sm transition-opacity duration-500`}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative box-border flex max-w-[300px] flex-col justify-center rounded-lg border-4 border-gray-200 bg-gray-600 p-4">
          {children}
          <CloseBtn onClick={() => onClose()} className={'absolute right-[-40px] top-[-40px]'} />
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default Popup
