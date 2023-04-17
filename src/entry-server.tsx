import React from 'react'
import App from './App'
import './index.css'
import { StaticRouter } from 'react-router-dom/server'
import '@assets/fonts/Nunito-VariableFont_wght.ttf'
import '@assets/fonts/Nunito-Italic-VariableFont_wght.ttf'
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server'

export function render(url: string, opts: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
    opts
  )
}
