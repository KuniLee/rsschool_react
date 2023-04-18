import React, { Component } from 'react'
import AppRouter from './router/AppRouter'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'

const store = setupStore()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}

export default App
