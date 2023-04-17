import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import '@assets/fonts/Nunito-VariableFont_wght.ttf'
import '@assets/fonts/Nunito-Italic-VariableFont_wght.ttf'

ReactDOM.hydrateRoot(
  document.getElementById('app') as HTMLElement,
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
