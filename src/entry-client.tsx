import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@assets/fonts/Nunito-VariableFont_wght.ttf'
import '@assets/fonts/Nunito-Italic-VariableFont_wght.ttf'
import { Provider } from 'react-redux'
import { RootState, setupStore } from '@/store'

const store = setupStore((window as typeof window & { __PRELOADED_STATE__: RootState }).__PRELOADED_STATE__)

Reflect.deleteProperty(window, '__PRELOADED_STATE__')

ReactDOM.hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
