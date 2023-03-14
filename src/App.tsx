import React, { Component } from 'react'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1>Hello</h1>
        <AppRouter />
      </BrowserRouter>
    )
  }
}

export default App
