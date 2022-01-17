import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App, store } from './App'

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
