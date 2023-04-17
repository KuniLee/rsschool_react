import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './App'
import { StaticRouter } from 'react-router-dom/server'
import '@assets/fonts/Nunito-VariableFont_wght.ttf'
import '@assets/fonts/Nunito-Italic-VariableFont_wght.ttf'

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} basename={import.meta.env.BASE_URL}>
      <App />
    </StaticRouter>
  )
}
