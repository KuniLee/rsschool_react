import React from 'react'
import App from './App'
import './index.css'
import { StaticRouter } from 'react-router-dom/server'
import '@assets/fonts/Nunito-VariableFont_wght.ttf'
import '@assets/fonts/Nunito-Italic-VariableFont_wght.ttf'
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'

export async function render(url: string, opts: RenderToPipeableStreamOptions) {
  const store = setupStore()

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const pipe = renderToPipeableStream(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>,
    opts
  )

  return { pipe, store }
}
